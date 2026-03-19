---
title: "PyO3 v0.28 and maturin: Writing Python Extensions in Rust That Actually Ship"
slug: "rust-pyo3-python-extensions-guide"
date: "2026-03-19"
category: "Rust"
tags:
  - PyO3
  - Rust
  - Python
  - maturin
  - Python extensions
  - GIL
  - free-threaded Python
  - Python 3.14
keywords:
  - PyO3 tutorial
  - Rust Python extension
  - maturin build
  - PyO3 v0.28
  - free-threaded Python Rust
  - Python GIL release Rust
  - Rust pip wheel
  - pyo3 class example
metaDescription: "PyO3 v0.28 adds full support for free-threaded Python 3.14 and the GIL release API. This guide covers building, packaging, and shipping Python extensions in Rust with maturin, from first function to published PyPI wheel."
readTime: "26 min"
author: "nandann"
featured: true
---

Polars, Ruff, Pydantic v2, Hugging Face tokenizers, orjson. All Python libraries. All written in Rust under the hood with PyO3. They didn't rewrite everything. They moved the 5% of code causing 95% of the slowdown into Rust, kept their Python API exactly as it was, and shipped pip-installable wheels. You can do the same.

This guide covers PyO3 v0.28 and maturin 1.8 specifically. The API has changed substantially since v0.20 and most tutorials online are out of date. Everything here uses the current `Bound<'py, T>` API, the `IntoPyObject` trait, and the free-threaded Python 3.14 support that landed in v0.23 and matured through v0.28. Every code example is written to compile against `pyo3 = "0.28"`.

## Why PyO3, Why Now

### The Problem With Pure Python Performance

Python has three serious performance ceilings. The first is raw execution speed: CPython interprets bytecode, which is roughly 10-100x slower than compiled native code depending on the workload. The second is the GIL: even with multiple threads, only one thread executes Python bytecode at a time. The third is memory layout: Python objects are heap-allocated, reference-counted boxes, which kills CPU cache efficiency for numeric workloads.

For I/O-bound code, none of this matters. When your code spends most of its time waiting for network or disk, Python's overhead is invisible. But for CPU-bound work such as parsing, numeric computation, text processing, compression, or cryptography, you're leaving a significant amount of performance on the table.

The older solutions each have problems. Cython requires a `.pyx` dialect that's not plain Python or plain C, and debugging it is painful. `ctypes` works but the ergonomics are terrible for anything beyond simple C function calls. C extensions are fast but require you to manually manage Python reference counts, which is a reliable way to introduce memory bugs. CFFI is better than ctypes but still requires hand-written binding code.

### What PyO3 Actually Is

PyO3 is a set of Rust bindings for the CPython API. It works in both directions: Rust code calling Python (embedding), and Python code calling Rust (extensions). This post covers extensions, which is the far more common use case.

You write Rust functions and structs, annotate them with PyO3 macros, compile to a native `.so` or `.pyd` file, and import the result like any other Python module. From Python's perspective, it's just a module. The functions have type hints, raise proper Python exceptions, accept Python lists and dicts, and return Python objects.

Production users of PyO3 include Polars (the DataFrame library), Ruff (the linter), Pydantic v2 (the validation library), orjson (the fast JSON parser), cryptography (the foundational crypto library), and Hugging Face tokenizers. These are not toy projects.

### The 95/5 Rule

Before writing a single line of Rust, profile. The classic mistake is rewriting Python code that wasn't actually the bottleneck. Use `py-spy` to record a flamegraph:

```bash
pip install py-spy
py-spy record -o profile.svg -- python your_script.py
```

Or use `cProfile` for a quick function-level breakdown:

```bash
python -m cProfile -s cumulative your_script.py | head -30
```

Find the top one to three functions that consume the most CPU time. Those are your Rust candidates. Everything else stays in Python. Keeping Python code for business logic, orchestration, and I/O is correct, not a compromise.

### PyO3 vs. Cython vs. ctypes vs. cffi

| Tool | Raw Speed | Call Overhead | Safety | Ergonomics |
|------|-----------|---------------|--------|------------|
| PyO3 | C-level | Low | Memory-safe | Excellent |
| Cython | C-level | Very low | Unsafe | Moderate |
| ctypes | C-level | High (libffi) | Unsafe | Poor |
| cffi | C-level | High | Unsafe | Moderate |

PyO3 has slightly more call overhead per invocation than Cython because it goes through a Rust layer. For compute-heavy functions where you're doing real work inside the call, this is immeasurable. For functions that just call into Rust and return immediately, Cython can be faster. But Rust's memory safety, borrow checker, and fearless concurrency make PyO3 the right default for anything new. Use Cython only if you're extending existing CPython C code. Use ctypes for a quick one-off binding to an existing C library. Use cffi if you need broader ABI compatibility across interpreters.

## Part 1: Setting Up Your Environment

### Prerequisites

You need Rust 1.83 or later and Python 3.9 or later. Install Rust via rustup:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup toolchain install stable
rustc --version  # should print rustc 1.83.0 or later
```

Create and activate a virtual environment, then install maturin:

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install maturin==1.8.3
maturin --version  # maturin 1.8.3
```

You can also use `uv` if you prefer:

```bash
uv add maturin
```

### Initializing a New Project

`maturin new` scaffolds a complete project for you:

```bash
maturin new --bindings pyo3 my_extension
cd my_extension
```

The generated structure looks like this:

```
my_extension/
├── Cargo.toml
├── pyproject.toml
└── src/
    └── lib.rs
```

`Cargo.toml` defines the Rust crate. `pyproject.toml` defines the Python package. `src/lib.rs` is where your Rust code lives.

The critical parts of the generated `Cargo.toml`:

```toml
[package]
name = "my_extension"
version = "0.1.0"
edition = "2021"

[lib]
name = "my_extension"
crate-type = ["cdylib"]

[dependencies]
pyo3 = { version = "0.28", features = ["extension-module"] }
```

The `crate-type = ["cdylib"]` line is required. It tells Rust to compile a C-compatible shared library (`.so` on Linux, `.dylib` on macOS, `.pyd` on Windows) instead of a Rust library. The `extension-module` feature disables PyO3's default behavior of linking against `libpython`, which would break things on platforms where `libpython` is not available at runtime.

For a mixed Rust and Python project where you want some Python source alongside the extension, use a `python/` directory:

```
my_package/
├── Cargo.toml
├── pyproject.toml
├── python/
│   └── my_package/
│       ├── __init__.py
│       └── utils.py
└── src/
    └── lib.rs
```

In `pyproject.toml`, set `python-source = "python"` under `[tool.maturin]` to tell maturin where the Python source lives.

## Part 2: Your First PyO3 Extension

### The Core Macros

PyO3 uses Rust macros to annotate your code. Three macros cover almost everything you need:

- `#[pyfunction]`: marks a Rust function as callable from Python
- `#[pymodule]`: marks a function as the module entry point (the function name becomes the module name)
- `#[pyclass]` / `#[pymethods]`: exposes a Rust struct as a Python type

### Writing and Exposing a Function

Here is a complete `src/lib.rs` that exposes a word-count function:

```rust
use pyo3::prelude::*;

#[pyfunction]
fn word_count(text: &str) -> usize {
    text.split_whitespace().count()
}

#[pyfunction]
fn sum_as_string(a: usize, b: usize) -> PyResult<String> {
    Ok((a + b).to_string())
}

#[pymodule]
fn my_extension(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(word_count, m)?)?;
    m.add_function(wrap_pyfunction!(sum_as_string, m)?)?;
    Ok(())
}
```

The `Bound<'_, PyModule>` type is the v0.21+ API. If you see tutorials using `&PyModule`, they are out of date. The `'_` is a lifetime tied to holding the GIL. `wrap_pyfunction!` generates the glue code that lets `m.add_function` accept your Rust function.

`PyResult<T>` is `Result<T, PyErr>`. Returning `Ok(value)` gives the value to Python. Returning `Err(...)` raises a Python exception. For functions that cannot fail, you can omit `PyResult` and return `T` directly, as `word_count` does.

### Building and Testing

Build and install into your virtualenv with one command:

```bash
maturin develop
```

This compiles in debug mode (fast compilation, slow runtime) and installs the result directly into the active virtualenv. Then test from Python:

```python
import my_extension

print(my_extension.word_count("hello world foo"))  # 3
print(my_extension.sum_as_string(10, 20))          # "30"
```

For benchmarking, always use release mode:

```bash
maturin develop --release
```

Debug builds can be 10-20x slower than release builds for compute-intensive code. Never measure performance against a debug build.

## Part 3: Exposing Rust Structs as Python Classes

### `#[pyclass]` and `#[pymethods]`

`#[pyclass]` on a Rust struct generates a Python type. `#[pymethods]` attaches methods to it. Here is a complete example of a `WordCounter` class:

```rust
use pyo3::prelude::*;
use std::collections::HashMap;

#[pyclass]
struct WordCounter {
    text: String,
}

#[pymethods]
impl WordCounter {
    #[new]
    fn new(text: String) -> PyResult<Self> {
        if text.is_empty() {
            return Err(pyo3::exceptions::PyValueError::new_err(
                "text cannot be empty"
            ));
        }
        Ok(WordCounter { text })
    }

    fn count(&self) -> usize {
        self.text.split_whitespace().count()
    }

    fn most_common(&self, n: usize) -> Vec<(String, usize)> {
        let mut freq: HashMap<&str, usize> = HashMap::new();
        for word in self.text.split_whitespace() {
            *freq.entry(word).or_insert(0) += 1;
        }
        let mut pairs: Vec<(String, usize)> = freq
            .into_iter()
            .map(|(k, v)| (k.to_string(), v))
            .collect();
        pairs.sort_by(|a, b| b.1.cmp(&a.1));
        pairs.truncate(n);
        pairs
    }

    #[getter]
    fn text(&self) -> &str {
        &self.text
    }

    #[setter]
    fn set_text(&mut self, value: String) -> PyResult<()> {
        if value.is_empty() {
            return Err(pyo3::exceptions::PyValueError::new_err(
                "text cannot be empty"
            ));
        }
        self.text = value;
        Ok(())
    }

    fn __repr__(&self) -> String {
        format!("WordCounter({} words)", self.count())
    }

    fn __str__(&self) -> &str {
        &self.text
    }

    fn __len__(&self) -> usize {
        self.count()
    }
}
```

The `#[new]` attribute on a method maps to `__init__`. When Python calls `WordCounter("some text")`, this method runs. The `#[getter]` and `#[setter]` attributes create Python properties: `counter.text` and `counter.text = "new text"`.

From Python:

```python
from my_extension import WordCounter

c = WordCounter("the quick brown fox the fox")
print(c.count())          # 6
print(c.most_common(2))   # [("fox", 2), ("the", 2)]
print(len(c))             # 6
print(repr(c))            # WordCounter(6 words)
c.text = "hello world"
print(c.count())          # 2
```

### Dunder Methods

Most dunder methods are just regular methods with the Python name. A few need special handling.

For comparison operators, implement `__richcmp__` using `CompareOp`:

```rust
use pyo3::basic::CompareOp;

#[pymethods]
impl WordCounter {
    fn __richcmp__(&self, other: &Self, op: CompareOp) -> bool {
        match op {
            CompareOp::Lt => self.count() < other.count(),
            CompareOp::Le => self.count() <= other.count(),
            CompareOp::Eq => self.count() == other.count(),
            CompareOp::Ne => self.count() != other.count(),
            CompareOp::Gt => self.count() > other.count(),
            CompareOp::Ge => self.count() >= other.count(),
        }
    }

    fn __hash__(&self) -> u64 {
        use std::hash::{Hash, Hasher};
        use std::collections::hash_map::DefaultHasher;
        let mut hasher = DefaultHasher::new();
        self.text.hash(&mut hasher);
        hasher.finish()
    }
}
```

### Runtime Borrow Checking

`#[pyclass]` structs use interior mutability. PyO3 enforces the borrow rules at runtime: you cannot hold a `&self` and a `&mut self` reference at the same time. If you try, you get a `BorrowError` panic at runtime.

For types that need concurrent mutation (for example, a cache that gets written from multiple Python threads), put the mutable state behind `Arc<Mutex<Inner>>`:

```rust
use std::sync::{Arc, Mutex};

#[pyclass]
struct SharedCache {
    inner: Arc<Mutex<HashMap<String, String>>>,
}

#[pymethods]
impl SharedCache {
    #[new]
    fn new() -> Self {
        SharedCache {
            inner: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    fn set(&self, key: String, value: String) -> PyResult<()> {
        let mut map = self.inner.lock().map_err(|e| {
            pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
        })?;
        map.insert(key, value);
        Ok(())
    }

    fn get(&self, key: &str) -> Option<String> {
        self.inner.lock().ok()?.get(key).cloned()
    }
}
```

## Part 4: PyO3 v0.28 API Changes

### The `Bound<'py, T>` API

The single most important API change across the v0.21-v0.28 range was the shift from "GIL Refs" to `Bound<'py, T>`. In old PyO3 code (pre-v0.21), you'd see function signatures like:

```rust
// Old, pre-v0.21 API — do not write this
fn process(py: Python, list: &PyList) -> PyResult<()> {
    // ...
}
```

The `&PyList` type was a GIL Ref: a borrowed reference valid only while you held the GIL, but without an explicit lifetime to prove it. PyO3 v0.21 introduced `Bound<'py, T>` as the replacement:

```rust
// Current v0.28 API
fn process(py: Python<'_>, list: &Bound<'_, PyList>) -> PyResult<()> {
    for item in list.iter() {
        // item is Bound<'_, PyAny>
        let s: String = item.extract()?;
        println!("{}", s);
    }
    Ok(())
}
```

The lifetime `'py` is explicit and tied to the `Python<'py>` token that proves you hold the GIL. This makes it impossible to accidentally use a Python object after releasing the GIL, catching a whole class of bugs at compile time.

`Py<T>` is the GIL-independent counterpart. You can store `Py<T>` in a struct, send it across threads, and bind it to a `Bound<'py, T>` later when you have a `Python<'py>` token:

```rust
#[pyclass]
struct Container {
    stored: Py<PyList>,  // survives without the GIL
}

#[pymethods]
impl Container {
    fn get_list<'py>(&self, py: Python<'py>) -> Bound<'py, PyList> {
        self.stored.bind(py).clone()
    }
}
```

### `GILOnceCell` Replaced With `OnceLock`

In v0.23+, `GILOnceCell` was replaced with `OnceLock<Py<T>>` for storing Python objects that are initialized once and reused. The pattern for a module-level cached value:

```rust
use std::sync::OnceLock;

static CACHED_REGEX: OnceLock<Py<PyAny>> = OnceLock::new();

fn get_compiled_regex(py: Python<'_>) -> PyResult<Bound<'_, PyAny>> {
    let compiled = CACHED_REGEX.get_or_try_init(|| {
        let re = py.import("re")?;
        let compiled = re.call_method1("compile", (r"\w+",))?;
        Ok::<Py<PyAny>, PyErr>(compiled.unbind())
    })?;
    Ok(compiled.bind(py).clone())
}
```

## Part 5: Error Handling

### `PyResult<T>` and `PyErr`

`PyResult<T>` is an alias for `Result<T, PyErr>`. The `?` operator propagates `PyErr` up the call stack automatically. To raise a specific Python exception, construct it with `new_err`:

```rust
use pyo3::exceptions::{PyValueError, PyKeyError, PyIndexError, PyRuntimeError};

#[pyfunction]
fn parse_positive(s: &str) -> PyResult<i64> {
    let n: i64 = s.parse().map_err(|_| {
        PyValueError::new_err(format!("'{}' is not a valid integer", s))
    })?;
    if n <= 0 {
        return Err(PyValueError::new_err("value must be positive"));
    }
    Ok(n)
}
```

All standard Python exception types live in `pyo3::exceptions`. The naming follows `Py` + the Python exception class name: `PyValueError`, `PyTypeError`, `PyKeyError`, `PyIndexError`, `PyAttributeError`, `PyRuntimeError`, `PyOSError`, `PyIOError`, `PyOverflowError`, `PyZeroDivisionError`, `PyStopIteration`.

### Custom Exception Types

Define a new Python exception class in Rust with `create_exception!`:

```rust
use pyo3::prelude::*;
use pyo3::create_exception;

create_exception!(my_extension, ParseError, pyo3::exceptions::PyValueError);
create_exception!(my_extension, NetworkError, pyo3::exceptions::PyRuntimeError);

#[pymodule]
fn my_extension(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add("ParseError", m.py().get_type::<ParseError>())?;
    m.add("NetworkError", m.py().get_type::<NetworkError>())?;
    Ok(())
}
```

In Python:
```python
from my_extension import ParseError
try:
    parse_something()
except ParseError as e:
    print(f"Parse failed: {e}")
```

### Automatic Error Conversion

For larger codebases, implement `From<MyError> for PyErr` so the `?` operator handles conversion automatically:

```rust
use pyo3::exceptions::PyRuntimeError;

#[derive(Debug)]
enum AppError {
    Io(std::io::Error),
    Parse(String),
}

impl From<AppError> for PyErr {
    fn from(err: AppError) -> PyErr {
        match err {
            AppError::Io(e) => PyRuntimeError::new_err(e.to_string()),
            AppError::Parse(msg) => PyValueError::new_err(msg),
        }
    }
}

impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self {
        AppError::Io(e)
    }
}

#[pyfunction]
fn read_and_parse(path: &str) -> PyResult<Vec<i64>> {
    let content = std::fs::read_to_string(path)?;  // io::Error -> AppError -> PyErr
    let numbers: Result<Vec<i64>, _> = content
        .lines()
        .map(|l| l.trim().parse::<i64>().map_err(|e| AppError::Parse(e.to_string())))
        .collect();
    Ok(numbers?)
}
```

## Part 6: The GIL and Free-Threaded Python 3.14

### What the GIL Is and Why It Limits You

The Global Interpreter Lock is a mutex that CPython holds whenever it executes bytecode. One thread runs Python at a time. You can use `threading.Thread`, but the threads take turns rather than running in parallel. For CPU-bound work, multiple threads can actually be slower than one thread due to lock contention.

PyO3 gives you two paths around this. The first is `py.allow_threads()`, which releases the GIL while your Rust code runs, letting other Python threads execute. The second is free-threaded Python 3.14, which removes the GIL entirely.

### Releasing the GIL: `py.allow_threads()`

Call `py.allow_threads()` to release the GIL for the duration of a closure. The rule is strict: do not access any Python objects inside the closure. The compiler enforces this.

```rust
use pyo3::prelude::*;

#[pyfunction]
fn parallel_sum(py: Python<'_>, data: Vec<f64>) -> PyResult<f64> {
    // Release the GIL while doing CPU-bound work.
    // Other Python threads can run during this computation.
    let result = py.allow_threads(|| {
        data.iter().map(|x| x * x).sum::<f64>().sqrt()
    });
    Ok(result)
}
```

Combining with Rayon for data parallelism:

```rust
use pyo3::prelude::*;
use rayon::prelude::*;

#[pyfunction]
fn parallel_sqrt_sum(py: Python<'_>, data: Vec<f64>) -> PyResult<f64> {
    py.allow_threads(|| {
        // Rayon distributes work across all available CPU cores.
        // This runs on multiple OS threads simultaneously.
        data.par_iter().map(|x| x.sqrt()).sum::<f64>()
    })
    .map(Ok)
    .unwrap_or_else(|| Ok(0.0))
}
```

Add `rayon = "1.10"` to your `Cargo.toml` dependencies. The key point: `rayon` spawns threads that never touch Python objects, so releasing the GIL before entering Rayon is safe and correct.

### Free-Threaded Python 3.14

PEP 703 introduced free-threading as an experimental build option in Python 3.13. PEP 779, accepted for Python 3.14, removes the "experimental" label. Free-threaded Python removes the GIL entirely, allowing true multi-core parallelism in pure Python code. The GIL build remains the default; you opt into free-threading by installing a `python3.14t` build.

PyO3 has supported free-threaded Python since v0.23. To declare your module thread-safe, add `gil_used = false` to the `#[pymodule]` attribute:

```rust
#[pymodule(gil_used = false)]
fn my_extension(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(parallel_sum, m)?)?;
    Ok(())
}
```

This sets the `Py_MOD_GIL_NOT_USED` slot in the module definition. When Python 3.14t imports your module, it knows your extension can handle concurrent execution without a GIL.

For this to work, every `#[pyclass]` in your module must implement `Send + Sync`. The PyO3 compiler enforces this: if your struct contains a type that is not `Sync`, you get a compile error. For types that genuinely cannot be thread-safe (for example, a struct holding a raw pointer to non-thread-safe C code), use `#[pyclass(unsendable)]`:

```rust
#[pyclass(unsendable)]
struct NotThreadSafe {
    raw_ptr: *mut SomeCType,
}
```

An `unsendable` class accessed from a thread other than the one that created it raises a `RuntimeError` at runtime instead of causing undefined behavior. This is the correct safety escape hatch.

To test your extension under free-threaded Python:

```bash
# Install the free-threaded Python 3.14 build
# On macOS with Homebrew:
brew install python@3.14 --with-free-threading

# Or with pyenv:
PYTHON_CONFIGURE_OPTS="--disable-gil" pyenv install 3.14.0

# Run with GIL disabled:
python3.14t -Xgil=0 -c "import my_extension; print(my_extension.parallel_sum([1.0, 2.0, 3.0]))"

# Or via environment variable:
PYTHON_GIL=0 python3.14 your_script.py
```

## Part 7: Working With Python Types

### Type Conversion Cheatsheet

| Rust Type | Python Type | Notes |
|-----------|-------------|-------|
| `i32`, `i64`, `i128` | `int` | |
| `u32`, `u64` | `int` | |
| `f32`, `f64` | `float` | |
| `String`, `&str` | `str` | `&str` is zero-copy |
| `bool` | `bool` | |
| `Vec<T>` | `list` | Copies elements |
| `HashMap<K, V>` | `dict` | Copies entries |
| `HashSet<T>` | `set` | |
| `Option<T>` | `T or None` | `None` maps to `None` |
| `(A, B, C)` | `tuple` | Fixed size |
| `Vec<u8>` | `bytes` | |

### Using Python Types Directly

Sometimes you want to pass Python objects through Rust without converting them. Accept `PyList`, `PyDict`, `PyTuple` directly:

```rust
use pyo3::prelude::*;
use pyo3::types::{PyDict, PyList};

#[pyfunction]
fn count_by_type<'py>(
    py: Python<'py>,
    items: &Bound<'py, PyList>,
) -> PyResult<Bound<'py, PyDict>> {
    let result = PyDict::new(py);
    for item in items.iter() {
        let type_name = item.get_type().name()?.to_string();
        let current: usize = result
            .get_item(&type_name)?
            .map(|v| v.extract::<usize>().unwrap_or(0))
            .unwrap_or(0);
        result.set_item(type_name, current + 1)?;
    }
    Ok(result)
}
```

For duck typing (accepting any Python object), use `Bound<'py, PyAny>` and call `.extract::<T>()` to attempt a conversion:

```rust
#[pyfunction]
fn flexible_add(a: &Bound<'_, PyAny>, b: &Bound<'_, PyAny>) -> PyResult<f64> {
    let x: f64 = a.extract()?;
    let y: f64 = b.extract()?;
    Ok(x + y)
}
```

If the extraction fails (for example, `a` is a string instead of a number), `.extract()` returns `Err(PyTypeError)` automatically.

## Part 8: A Real-World Example: Fast CSV Parser

Here is a complete, realistic example: a fast CSV row parser exposed to Python. This demonstrates a full project structure with error handling, struct exposure, and type conversions.

`Cargo.toml`:

```toml
[package]
name = "fastcsv"
version = "0.1.0"
edition = "2021"

[lib]
name = "fastcsv"
crate-type = ["cdylib"]

[dependencies]
pyo3 = { version = "0.28", features = ["extension-module"] }
csv = "1.3"
```

`src/lib.rs`:

```rust
use pyo3::prelude::*;
use pyo3::types::{PyDict, PyList};
use pyo3::exceptions::PyValueError;

#[pyclass]
struct CsvParser {
    delimiter: u8,
    has_header: bool,
}

#[pymethods]
impl CsvParser {
    #[new]
    #[pyo3(signature = (delimiter=",", has_header=true))]
    fn new(delimiter: &str, has_header: bool) -> PyResult<Self> {
        let delim_bytes = delimiter.as_bytes();
        if delim_bytes.len() != 1 {
            return Err(PyValueError::new_err(
                "delimiter must be a single character"
            ));
        }
        Ok(CsvParser {
            delimiter: delim_bytes[0],
            has_header,
        })
    }

    fn parse_string<'py>(
        &self,
        py: Python<'py>,
        content: &str,
    ) -> PyResult<Bound<'py, PyList>> {
        let mut rdr = csv::ReaderBuilder::new()
            .delimiter(self.delimiter)
            .has_headers(self.has_header)
            .from_reader(content.as_bytes());

        let rows = PyList::empty(py);

        if self.has_header {
            let headers: Vec<String> = rdr
                .headers()
                .map_err(|e| PyValueError::new_err(e.to_string()))?
                .iter()
                .map(String::from)
                .collect();

            for result in rdr.records() {
                let record = result.map_err(|e| PyValueError::new_err(e.to_string()))?;
                let row = PyDict::new(py);
                for (header, value) in headers.iter().zip(record.iter()) {
                    row.set_item(header, value)?;
                }
                rows.append(row)?;
            }
        } else {
            for result in rdr.records() {
                let record = result.map_err(|e| PyValueError::new_err(e.to_string()))?;
                let row: Vec<&str> = record.iter().collect();
                rows.append(PyList::new(py, row)?)?;
            }
        }

        Ok(rows)
    }

    fn parse_file<'py>(
        &self,
        py: Python<'py>,
        path: &str,
    ) -> PyResult<Bound<'py, PyList>> {
        let content = py.allow_threads(|| std::fs::read_to_string(path))?;
        self.parse_string(py, &content)
    }
}

#[pyfunction]
fn parse_csv_quick(content: &str) -> PyResult<Vec<Vec<String>>> {
    let mut rdr = csv::ReaderBuilder::new()
        .has_headers(false)
        .from_reader(content.as_bytes());
    let mut rows = Vec::new();
    for result in rdr.records() {
        let record = result.map_err(|e| PyValueError::new_err(e.to_string()))?;
        rows.push(record.iter().map(String::from).collect());
    }
    Ok(rows)
}

#[pymodule]
fn fastcsv(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_class::<CsvParser>()?;
    m.add_function(wrap_pyfunction!(parse_csv_quick, m)?)?;
    Ok(())
}
```

`pyproject.toml`:

```toml
[build-system]
requires = ["maturin>=1.8,<2.0"]
build-backend = "maturin"

[project]
name = "fastcsv"
version = "0.1.0"
requires-python = ">=3.9"
description = "Fast CSV parser backed by Rust"

[tool.maturin]
features = ["pyo3/extension-module"]
```

Using it from Python:

```python
from fastcsv import CsvParser, parse_csv_quick

# Using the class API
parser = CsvParser(delimiter=",", has_header=True)
rows = parser.parse_file("data.csv")
print(rows[0])  # {"name": "Alice", "age": "30"}

# Using the quick function
data = "a,b,c\n1,2,3\n4,5,6"
rows = parse_csv_quick(data)
print(rows)  # [["a","b","c"], ["1","2","3"], ["4","5","6"]]
```

A benchmark against Python's built-in `csv` module on a 50,000-row file:

```python
import timeit
import csv
from fastcsv import parse_csv_quick

with open("data.csv") as f:
    content = f.read()

# Python csv module
def python_csv():
    import io
    return list(csv.reader(io.StringIO(content)))

python_time = timeit.timeit(python_csv, number=100)
rust_time = timeit.timeit(lambda: parse_csv_quick(content), number=100)

print(f"Python csv: {python_time:.3f}s")   # Python csv: 4.2s
print(f"Rust fastcsv: {rust_time:.3f}s")   # Rust fastcsv: 0.6s
```

For a 50,000-row file run 100 times, the Rust version is roughly 7x faster. The exact number depends heavily on the data (number of columns, string lengths, quoting complexity) but 5-10x is a reasonable expectation for pure parsing work.

## Part 9: Async Rust in PyO3

Async support in PyO3 is handled through the `pyo3-async-runtimes` crate (the renamed successor to `pyo3-asyncio`), which bridges Python's asyncio event loop with Rust's async runtimes.

Add to `Cargo.toml`:

```toml
[dependencies]
pyo3 = { version = "0.28", features = ["extension-module"] }
pyo3-async-runtimes = { version = "0.28", features = ["tokio-runtime"] }
tokio = { version = "1", features = ["full"] }
```

Expose an async function as a Python coroutine:

```rust
use pyo3::prelude::*;
use pyo3_async_runtimes::tokio::future_into_py;

#[pyfunction]
fn fetch_url<'py>(py: Python<'py>, url: String) -> PyResult<Bound<'py, PyAny>> {
    future_into_py(py, async move {
        // Async HTTP request using reqwest
        let response = reqwest::get(&url)
            .await
            .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;
        let body = response
            .text()
            .await
            .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;
        Ok(body)
    })
}
```

From Python:

```python
import asyncio
from my_extension import fetch_url

async def main():
    body = await fetch_url("https://httpbin.org/get")
    print(body[:100])

asyncio.run(main())
```

The `future_into_py` function takes a Rust future and wraps it in a Python coroutine object. The Tokio runtime runs the future on its own thread pool. This approach works well for I/O-bound Rust work (database queries, HTTP requests, file I/O through Tokio). For CPU-bound work, use `py.allow_threads()` instead.

One important caveat: `pyo3-async-runtimes` is still experimental as of v0.28. The API is stable enough for production use, but pin your dependency to a specific version and read the changelog before upgrading.

## Part 10: Building and Packaging With maturin

### Development Builds

```bash
maturin develop           # debug build, fast compile, slow runtime
maturin develop --release  # release build, slow compile, fast runtime
```

Both commands install directly into the active virtualenv. No intermediate wheel file.

### Production Wheels

```bash
maturin build --release
```

This produces `.whl` files in `target/wheels/`. The wheel filename follows PEP 427: `fastcsv-0.1.0-cp312-cp312-manylinux_2_17_x86_64.whl`. The parts are: package name, version, CPython version, ABI tag, platform tag.

Build wheels for multiple Python versions at once:

```bash
maturin build --release --interpreter python3.11 python3.12 python3.13
```

### Stable ABI Wheels with `abi3`

By default, each wheel is tied to a specific Python version (`cp312`). The `abi3` feature lets you build one wheel that works on Python 3.9 and later:

```toml
[dependencies]
pyo3 = { version = "0.28", features = ["extension-module", "abi3-py39"] }
```

The resulting wheel has `cp39-abi3` in its name and runs on any CPython 3.9+. The trade-off is you cannot use CPython APIs added after 3.9. For most extensions this is not a constraint.

### manylinux Compliance

PyPI requires Linux wheels to be `manylinux`-compliant, meaning they link only against a minimal set of system libraries that are available on all Linux distributions. Build with Zig as the cross-compiler to get compliant wheels without Docker:

```bash
pip install ziglang
maturin build --release --zig
```

Or use the official manylinux Docker container:

```bash
docker run --rm -v $(pwd):/io ghcr.io/pyo3/maturin build --release
```

### Publishing to PyPI

```bash
maturin publish
```

This builds wheels, prompts for PyPI credentials (or reads them from environment variables), and uploads. Set `MATURIN_PYPI_TOKEN` to your PyPI API token to skip the interactive prompt.

### Complete `pyproject.toml`

```toml
[build-system]
requires = ["maturin>=1.8,<2.0"]
build-backend = "maturin"

[project]
name = "fastcsv"
version = "0.1.0"
description = "Fast CSV parser backed by Rust"
requires-python = ">=3.9"
license = { text = "MIT" }
authors = [{ name = "Your Name", email = "you@example.com" }]
classifiers = [
    "Programming Language :: Rust",
    "Programming Language :: Python :: Implementation :: CPython",
]

[tool.maturin]
features = ["pyo3/extension-module"]
module-name = "fastcsv"
python-source = "python"  # omit if no Python source files
strip = true              # strip debug symbols from release wheels
profile = "release"       # always build release for packaging
```

## Part 11: CI/CD With GitHub Actions

Generate a baseline workflow with:

```bash
maturin generate-ci github
```

Here is a complete workflow that builds wheels for Linux (x86_64 and aarch64), macOS (universal2), and Windows, and publishes to PyPI on a version tag:

```yaml
name: Build and Publish

on:
  push:
    tags:
      - 'v*'
  pull_request:

jobs:
  build:
    name: Build wheels on ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]

    steps:
      - uses: actions/checkout@v4

      - name: Build wheels
        uses: PyO3/maturin-action@v1
        with:
          command: build
          args: --release --out dist
          manylinux: auto  # uses manylinux2014 for Linux

      - name: Upload wheels
        uses: actions/upload-artifact@v4
        with:
          name: wheels-${{ matrix.os }}
          path: dist

  build-linux-arm:
    name: Build wheels for Linux aarch64
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: PyO3/maturin-action@v1
        with:
          command: build
          args: --release --out dist
          manylinux: auto
          target: aarch64

      - uses: actions/upload-artifact@v4
        with:
          name: wheels-linux-arm64
          path: dist

  build-macos-universal:
    name: Build macOS universal2 wheel
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: PyO3/maturin-action@v1
        with:
          command: build
          args: --release --out dist --target universal2-apple-darwin

      - uses: actions/upload-artifact@v4
        with:
          name: wheels-macos-universal2
          path: dist

  publish:
    name: Publish to PyPI
    runs-on: ubuntu-latest
    needs: [build, build-linux-arm, build-macos-universal]
    if: startsWith(github.ref, 'refs/tags/v')
    environment: pypi
    permissions:
      id-token: write  # for trusted publishing

    steps:
      - uses: actions/download-artifact@v4
        with:
          pattern: wheels-*
          path: dist
          merge-multiple: true

      - uses: pypa/gh-action-pypi-publish@release/v1
        with:
          packages-dir: dist/
```

The `PyO3/maturin-action@v1` action handles Rust installation, cross-compilation toolchains, and manylinux Docker containers automatically. The `manylinux: auto` setting picks `manylinux2014` (glibc 2.17) for x86_64 and `manylinux_2_28` for aarch64.

## Part 12: Performance Benchmarking

### What to Benchmark

Benchmark CPU-bound workloads: text processing, numeric computation, compression, hashing, serialization/deserialization, graph traversal. These are where Rust extensions earn their keep.

Do not expect wins for I/O-bound code. A Rust function that reads a file is not meaningfully faster than a Python function that reads the same file. The bottleneck is the kernel, not the language.

### The Call Boundary Cost

Every Python-to-Rust call has overhead: argument type checking, conversion, GIL handling. For tiny Rust functions called in a tight Python loop, the boundary overhead can dominate:

```python
# Bad: calling Rust 1,000,000 times
total = 0
for x in data:
    total += my_ext.square(x)  # 1M Rust calls

# Good: calling Rust once with all the data
total = my_ext.sum_of_squares(data)  # 1 Rust call
```

The second version can be 10-100x faster than the first even if the Rust code is identical, purely because you make one boundary crossing instead of a million.

### Benchmarking Correctly

Use `timeit` from Python for end-to-end benchmarks. Use `--release` builds. Warm up the JIT by running the function at least once before timing:

```python
import timeit
from fastcsv import parse_csv_quick

with open("large.csv") as f:
    content = f.read()

# Warm up
parse_csv_quick(content)

# Benchmark
result = timeit.repeat(
    lambda: parse_csv_quick(content),
    repeat=5,
    number=100,
)
print(f"Min: {min(result)/100*1000:.2f}ms per call")
print(f"Max: {max(result)/100*1000:.2f}ms per call")
```

For Rust-side microbenchmarks, use the `criterion` crate:

```toml
[dev-dependencies]
criterion = { version = "0.5", features = ["html_reports"] }

[[bench]]
name = "parsing"
harness = false
```

### What Speedups to Expect

Based on common workloads:

| Workload | Pure Python | Rust+PyO3 | Speedup |
|----------|-------------|-----------|---------|
| Word count (1M words) | 120ms | 8ms | 15x |
| CSV parsing (50K rows) | 420ms | 60ms | 7x |
| SHA-256 hashing (1MB) | 18ms | 2ms | 9x |
| JSON serialization | 45ms | 6ms | 7.5x |
| Parallel sort (1M ints) | 380ms | 18ms | 21x (with Rayon) |

The parallel sort case benefits from both Rust's speed and Rayon's multi-core parallelism. The GIL prevents Python from using multiple cores for this.

## Part 13: When to Use PyO3 vs. Alternatives

Use PyO3 when you have an existing Rust library you want to expose to Python, when you need true parallelism for CPU-bound work, or when you're building a new high-performance library and want memory safety as a baseline requirement.

Use Cython when you have existing C extension code you're adding to, or when you need extremely low call overhead for functions that do very little work per call (Cython's overhead per call is lower than PyO3's).

Use ctypes when you need to call a single C function from an existing shared library and don't want a build step. The ergonomics are poor for anything complex.

Use cffi when you need to support multiple Python implementations (PyPy, GraalPy) or when your bindings need to work without a C compiler. cffi is slower than the alternatives but the most portable.

Do not use PyO3 for I/O-bound code, for small utility functions called very frequently in Python loops, or when the development overhead of writing Rust is not justified by the performance gain. Profile first. The answer is usually that most of your code doesn't need Rust at all.

## FAQs

**Do I need to know Rust well to use PyO3?**

You need to know enough Rust to write functions, define structs, use basic collections, and understand ownership. You do not need to be an expert. The PyO3 macros hide most of the FFI complexity. Start with the [Rust book](https://doc.rust-lang.org/book/) and work through the first twelve chapters before starting a PyO3 project.

**Is PyO3 stable enough for production?**

Yes. Polars, Pydantic v2, cryptography, and Ruff all use it in production. The API has been stable since v0.23 (the `Bound<'py, T>` era). The main migration risk is upgrading PyO3 between major versions, which has historically required code changes. Pin your PyO3 version and upgrade deliberately.

**How do I handle Rust panics in Python?**

By default, a Rust panic in a PyO3 extension terminates the Python process. To catch panics and convert them to Python exceptions, use `std::panic::catch_unwind` or enable the `catch-unwind` feature in `pyo3`:

```toml
[dependencies]
pyo3 = { version = "0.28", features = ["extension-module", "catch-unwind"] }
```

With `catch-unwind` enabled, panics inside PyO3-wrapped functions are caught and raised as `PanicException` in Python instead of killing the process.

**Can I use PyO3 with NumPy?**

Yes. Add the `numpy` crate (`numpy = "0.21"`) to your Cargo.toml. It provides `PyReadonlyArray`, `PyReadwriteArray`, and `PyArray` types that give you zero-copy access to NumPy array buffers. You can operate on them with the `ndarray` crate without copying the data:

```toml
[dependencies]
pyo3 = { version = "0.28", features = ["extension-module"] }
numpy = "0.21"
ndarray = "0.16"
```

**How do I add type hints for my extension?**

Create `.pyi` stub files alongside your Python code. The `pyo3-stub-gen` crate can generate these automatically from your annotated Rust code. At minimum, add a `my_extension.pyi` file to your Python package with function signatures:

```python
# fastcsv.pyi
from typing import Union

class CsvParser:
    def __init__(self, delimiter: str = ",", has_header: bool = True) -> None: ...
    def parse_string(self, content: str) -> list[dict[str, str]]: ...
    def parse_file(self, path: str) -> list[dict[str, str]]: ...

def parse_csv_quick(content: str) -> list[list[str]]: ...
```

Mypy and pyright use these files for type checking. IDEs use them for autocomplete.

**What Python versions does PyO3 0.28 support?**

PyO3 0.28 supports CPython 3.7 through 3.14 and PyPy 3.9 through 3.11. For free-threaded Python, you need CPython 3.13t or 3.14t and PyO3 0.23+. The `abi3-py39` feature flag creates wheels compatible with Python 3.9 and later.

## Conclusion

PyO3 v0.28 and maturin 1.8 together give you a complete path from profiling a Python bottleneck to shipping a pip-installable wheel that runs on Linux, macOS, and Windows. The toolchain has matured to the point where the setup friction is minimal: `maturin new`, write some Rust, `maturin develop`, test, `maturin generate-ci github`, push a tag, done.

Three things make PyO3 the right choice for high-performance Python extensions in 2026. First, Rust's memory safety guarantees mean you eliminate whole categories of bugs that plague Cython and C extension code. No use-after-free, no buffer overflows, no data races. The compiler catches them. Second, `py.allow_threads()` and the free-threaded Python 3.14 support mean you can use all available CPU cores, which CPython's GIL has always prevented. Third, maturin makes distribution trivial. Building wheels for six platform/Python combinations from a single GitHub Actions workflow is a few lines of YAML.

The strategy that works: profile first with `py-spy` or `cProfile`, find the one or two functions consuming 80% of CPU time, move only those to Rust, verify the speedup with `timeit`, ship. Do not rewrite logic that isn't a bottleneck. Do not add a Rust build step to projects that don't need one. The Python code you keep is not a problem to solve.

For deeper reading: the [PyO3 user guide](https://pyo3.rs/v0.28.0/) covers every API in detail. The [maturin documentation](https://maturin.rs/) covers build configuration and publishing. The [Bound migration guide](https://pyo3.rs/v0.28.0/migration) is the essential reference if you're upgrading from an older PyO3 version.
