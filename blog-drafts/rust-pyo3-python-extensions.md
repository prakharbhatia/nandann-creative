# Your Python Is 100x Slower Than It Needs to Be — Here's How to Fix It With Rust and PyO3

> **Status:** Skeleton / Outline — content to be written
> **Target Audience:** Python developers, data engineers, ML engineers, backend developers comfortable with Python who want to learn Rust for performance
> **Tone:** Practical, code-heavy, benchmarks-first, no hype
> **Slug:** `rust-pyo3-python-extensions`
> **Category:** Engineering
> **Tags:** Rust, Python, PyO3, maturin, Performance, Extensions, NumPy, Free-threaded Python, Python 3.14, GIL
> **Est. Read Time:** 35–40 min
> **Sources Researched:** 35+ articles — pyo3.rs official guide, maturin.rs, InfoWorld, Medium, The New Stack, Python Speed, Towards Data Science, DEV Community, GitHub

---

## Introduction

_Hook: Polars, Ruff, Pydantic v2, Hugging Face tokenizers, orjson — all Python libraries, all written in Rust under the hood with PyO3. They didn't rewrite everything. They moved the 5% of code that was causing 95% of the slowdown. You can do the same: keep your Python as-is, write a targeted Rust extension that looks and feels like a normal Python module, and call it with `import my_extension`. This post shows you the complete path from profiling your Python to shipping a pip-installable wheel._

---

## Why PyO3, Why Now

### The Problem With Pure Python Performance

_CPU-bound code, GIL-constrained multithreading, AI/data workloads pushing hardware limits. The old options — Cython, ctypes, C extensions — all have serious ergonomics problems. Rust offers memory safety + C-level performance + modern tooling._

### What PyO3 Actually Is

_Rust bindings for the Python interpreter. Works in both directions: Python calling Rust extension modules (the main topic of this post), and Rust embedding Python. Producer adoption: Polars, Ruff, Pydantic v2, Hugging Face tokenizers, cryptography, fastembed, orjson._

### The 95/5 Rule: When to Use PyO3

_Keep 95% of your code in Python. Move only CPU-bound hot inner loops to Rust. Decision framework: CPU-bound computation ✅, I/O-bound code ❌, large algorithmic bodies ✅, small utility calls ❌. How to profile first with `py-spy` and `cProfile` before writing a single line of Rust._

### PyO3 vs. Cython vs. ctypes vs. cffi — Quick Comparison

_Performance: PyO3 and Cython roughly equivalent raw throughput (~12× over pure Python). Call overhead: PyO3 slightly higher per function call than Cython; Cython wins for small Python-heavy functions; Rust wins for compute-heavy or concurrent code. Safety: Rust eliminates entire memory bug classes that Cython/ctypes can't. ctypes: highest overhead (libffi cost). PyO3: best ergonomics, best safety, best for concurrent/parallel workloads._

---

## Part 1: Setting Up Your Environment

### Prerequisites

_Minimum Rust version: 1.83+. Install via `rustup`: `rustup toolchain install stable`. Python virtual environment (venv or uv). Installing maturin: `pip install maturin` or `uv add maturin`._

```bash
# Code example placeholder: full environment setup from scratch
# rustup, venv creation, pip install maturin, verify versions
```

### maturin vs. setuptools-rust

_maturin is zero-config and the recommended choice for new projects. setuptools-rust is for projects already using setuptools. This post uses maturin._

### Initializing a New Project

_`maturin new --bindings pyo3 my_extension`. What gets created: `Cargo.toml`, `pyproject.toml`, `src/lib.rs`. Show the default scaffolding and explain each file._

```bash
# Code example placeholder: maturin new command and tree output of generated project
```

### Project Structure Options

_Three layouts: pure Rust extension (simple), mixed Rust + Python package (use `module-name = "my_project._lib_name"` in pyproject.toml), src-layout for larger projects. Show directory trees for each._

```
# Code example placeholder: directory tree for a mixed Rust + Python project
```

---

## Part 2: Your First PyO3 Extension — From Zero to `import`

### The Core Macros

_`#[pymodule]`: declares the entry point — function name becomes the importable module name. `#[pyfunction]`: exposes a Rust function to Python. Return type must be `PyResult<T>` or a type implementing `IntoPyObject`._

### Writing and Exposing a Function

_Start with a real example: a string word-count function that would be called in a tight Python loop. Show the complete `src/lib.rs` from `#[pymodule]` to the function body._

```rust
// Code example placeholder: complete lib.rs with #[pymodule], #[pyfunction] for word_count,
// m.add_function(wrap_pyfunction!(word_count, m)?)
```

### Building and Importing with `maturin develop`

_`maturin develop` compiles and installs directly into the current virtualenv — no wheel, no pip, just immediate testing. Difference between `maturin develop` (fast iteration) and `maturin build` (distributable wheel). Show importing from Python._

```python
# Code example placeholder: import my_extension; result = my_extension.word_count("hello world")
```

### `maturin develop` vs `maturin develop --release`

_Debug builds: fast compile, slow runtime. Release builds: slow compile, fast runtime. Always benchmark with `--release`. Never ship debug wheels to PyPI._

---

## Part 3: Exposing Rust Structs as Python Classes

### `#[pyclass]` and `#[pymethods]`

_`#[pyclass]` on a Rust struct generates a Python type. `#[pymethods]` impl block attaches Python-callable methods, properties, class methods, and static methods. Show the full pattern with a practical example._

```rust
// Code example placeholder: #[pyclass] TextProcessor struct with fields,
// #[pymethods] with __new__, instance method, getter, setter, __repr__
```

### Constructor: `#[new]`

_The `#[new]` attribute on a method is called when Python does `MyClass()`. Show validation, error propagation, and returning `PyResult<Self>`._

```rust
// Code example placeholder: #[new] constructor with validation and PyValueError on bad input
```

### Properties, Class Methods, Static Methods

_`#[getter]` / `#[setter]` for properties. `#[classmethod]` for factory methods. `#[staticmethod]` for utilities. Show all three in one example._

```rust
// Code example placeholder: all three in one impl block
```

### Dunder / Magic Methods

_`__repr__`, `__str__`, `__len__`, `__hash__`, `__eq__`, `__lt__` (via `__richcmp__` and `CompareOp`), `__add__`, `__getitem__`, `__setitem__`, `__contains__`. Show which ones are just normal methods and which need special handling._

```rust
// Code example placeholder: __repr__, __len__, __richcmp__ in one #[pymethods] block
```

### Runtime Borrow Checking

_`#[pyclass]` uses interior mutability with runtime borrow checking (like `RefCell<T>`). What this means: you can't hold a `&mut self` reference across a Python call. Explain the borrow violation panic and how to design around it._

---

## Part 4: Type Conversions — Rust ↔ Python

### `IntoPyObject` and `FromPyObject` — The Modern API (v0.23+)

_`IntoPyObject`: converts Rust types to Python objects. `FromPyObject`: converts Python objects to Rust types. The `#[derive(IntoPyObject)]` and `#[derive(FromPyObject)]` macros auto-implement conversions for structs and enums. How structs map to dicts, tuples to tuples._

```rust
// Code example placeholder: #[derive(IntoPyObject, FromPyObject)] on a Config struct
// — shows a struct automatically converting to/from a Python dict
```

### Type Mapping Cheatsheet

_Complete table: `i64` ↔ `int`, `f64` ↔ `float`, `String`/`&str` ↔ `str`, `bool` ↔ `bool`, `Vec<T>` ↔ `list`, `HashMap<K,V>` ↔ `dict`, `Option<T>` ↔ `T or None`, `(A, B)` ↔ `tuple`, `HashSet<T>` ↔ `set`, `Vec<u8>` ↔ `bytes`._

### Using Python Types Directly in Rust

_`PyList`, `PyDict`, `PyTuple`, `PySet`, `PyBytes`, `PyMemoryView` — when to use them vs. converting to native Rust types. New in v0.28: `PyList::to_tuple()` and `PyTuple::to_list()` convenience methods._

```rust
// Code example placeholder: accepting a PyList, iterating, returning a PyDict
```

### Smart Pointers: `Bound<'py, T>` vs. `Py<T>` vs. `Borrowed<'a, 'py, T>`

_`Bound<'py, T>`: GIL-bound reference with a lifetime — the primary way to interact with Python objects. `Py<T>`: GIL-independent, stores a Python object without holding the GIL — analogous to `Arc<T>`, safe to send across threads. `Borrowed<'a, 'py, T>`: non-owning, avoids refcount bumps in hot paths. When to use each._

---

## Part 5: Error Handling — Raising Python Exceptions from Rust

### `PyResult<T>` and `PyErr`

_`PyResult<T>` is `Result<T, PyErr>`. Returning `Err(...)` raises a Python exception. The `?` operator propagates errors automatically._

```rust
// Code example placeholder: function returning PyResult<String> with ? propagation
```

### Built-in Python Exceptions

_`PyValueError`, `PyTypeError`, `PyIndexError`, `PyKeyError`, `PyRuntimeError`, `PyIOError` — all in `pyo3::exceptions`. Show creating and raising each._

```rust
// Code example placeholder: PyValueError::new_err("invalid input"), PyKeyError::new_err(key)
```

### Custom Exception Types

_`create_exception!` macro for defining new Python exception classes in Rust. `import_exception!` for using exceptions defined in Python packages. Show defining a custom exception and registering it in the module._

```rust
// Code example placeholder: create_exception!(my_module, MyCustomError, PyValueError)
// and adding it to the module with m.add("MyCustomError", ...)?
```

### Automatic Error Conversion with `From<MyError> for PyErr`

_Implement `From<MyRustError> for PyErr` and `?` automatically converts Rust errors to Python exceptions everywhere. The clean, production-scale pattern._

```rust
// Code example placeholder: AppError enum, impl From<AppError> for PyErr, usage with ?
```

---

## Part 6: The GIL, Parallelism, and Free-Threaded Python

### What the GIL Is and Why It Limits You

_The Global Interpreter Lock prevents true Python thread parallelism. PyO3 lets you release it while doing pure Rust work — this is where the parallelism gains come from._

### Releasing the GIL: `Python::allow_threads`

_Call `Python::allow_threads` to release the GIL temporarily so other Python threads can run while Rust executes. The rule: never access Python objects while the GIL is released._

```rust
// Code example placeholder: py.allow_threads(|| { /* pure Rust parallel work */ })
// wrapping a rayon parallel_iter inside allow_threads
```

### Combining with Rayon for Data Parallelism

_The deadlock pattern to avoid: never spawn threads that re-acquire the GIL while the parent holds it. Always wrap rayon usage in `Python::allow_threads`. Show a parallel word-count or data-processing example._

```rust
// Code example placeholder: rayon parallel_iter inside allow_threads for parallel processing
// benchmark: ~500 ops/sec parallel vs ~120 ops/sec sequential vs ~27 ops/sec Python
```

### Free-Threaded Python 3.14 — The GIL-Less Future

_PEP 703 accepted, experimental in 3.13, no longer experimental in 3.14 (PEP 779). Not the default build yet. Single-threaded overhead in 3.14 reduced to ~5–10% compared to GIL build. PyO3 supports free-threaded since v0.23._

### `#[pymodule(gil_used = false)]` — Opting Into Thread Safety

_Declares your module thread-safe: sets the `Py_MOD_GIL_NOT_USED` slot. Required for the module to run without the GIL in free-threaded Python. `#[pyclass]` now requires `Sync` in PyO3 0.23+ — the compiler enforces thread safety._

```rust
// Code example placeholder: #[pymodule(gil_used = false)] and what it means for pyclass types
```

### `#[pyclass(unsendable)]` — The Safety Escape Hatch

_For types that genuinely cannot be sent across threads. Access from another thread causes a runtime error instead of a compile error. When to use vs. fixing the underlying thread-safety issue._

### Testing Under Free-Threaded Python

_`PYTHON_GIL=0` env var or `-Xgil=0` flag. How to install the free-threaded Python build (`python3.14t`). Using ThreadSanitizer (`RUSTFLAGS="-Z sanitizer=thread"`) to detect data races._

```bash
# Code example placeholder: installing python3.14t, running tests with PYTHON_GIL=0
```

---

## Part 7: Iterators, Async, and Protocols

### Implementing Python Iterators in Rust

_The pattern: collection `#[pyclass]` returns `PyRef<IteratorStruct>` from `__iter__`; a separate iterator `#[pyclass]` implements `__next__` returning `Option<T>`._

```rust
// Code example placeholder: NumberRange #[pyclass] with __iter__ returning RangeIter,
// RangeIter #[pyclass] with __next__
```

### Context Managers: `__enter__` and `__exit__`

_Implementing `with my_obj:` support. Show a resource-managing struct with `__enter__` returning `self` and `__exit__` doing cleanup._

```rust
// Code example placeholder: FileHandler #[pyclass] with __enter__ and __exit__
```

### Async/Await Support (Experimental)

_`async fn` in `#[pyfunction]` and `#[pymethods]` via `experimental-async` feature. `pyo3-async-runtimes` crate bridges Python asyncio and Rust's tokio/async-std. `pyo3_async_runtimes::tokio::future_into_py` converts a Rust future to a Python-awaitable coroutine. Note: still experimental — pin carefully._

```rust
// Code example placeholder: async #[pyfunction] that fetches HTTP and returns to Python asyncio
```

---

## Part 8: Zero-Copy NumPy, Arrow, and Data Ecosystem

### Why Zero-Copy Matters for Data Workloads

_Converting large arrays to/from Python involves memory copies — for ML and data workloads this can dominate runtime. The goal: share the same memory buffer between Python and Rust with no copies._

### `rust-numpy`: Reading and Writing NumPy Arrays

_`PyReadonlyArray` for immutable zero-copy access. `PyReadwriteArray` for in-place mutation. Two allocation strategies: Rust-allocated memory transferred to Python (`IntoPyArray`), vs Python-heap allocated (`ToPyArray`). Combining with the `ndarray` crate for Rust-side array math._

```rust
// Code example placeholder: function accepting PyReadonlyArray2<f64>, running ndarray math,
// returning PyArray2<f64> — fully zero-copy
```

### `pyo3-arrow`: Zero-Copy Apache Arrow

_`pyo3-arrow` crate uses the Arrow C Data Interface for zero-copy FFI between PyArrow (Python) and the `arrow` Rust crate. Show passing a PyArrow Table to Rust and back._

```rust
// Code example placeholder: accepting a RecordBatch from PyArrow, transforming, returning
```

### `pyo3-polars`: Rust ↔ Polars DataFrames

_`PyDataFrame` and `PySeries` helper types. Show writing a custom Polars expression in Rust and calling it from Python._

```rust
// Code example placeholder: custom Polars expression implemented in Rust with pyo3-polars
```

### Notable Libraries Built on This Stack

_Polars, connector-x, datafusion-python, deltalake-python — briefly note what each does and why they chose Rust + PyO3._

---

## Part 9: Performance Benchmarks and Optimization

### Real Benchmarks — Setting Expectations

_Present actual benchmark results with context: word-count (parallel Rust 1.7–4.6ms vs Python 27ms+), 3D pipeline (24s Rust vs 317s Python = 13× speedup), computer vision (15 FPS → 120 FPS), embedding workload (71s vs 15+ minutes). What they have in common: CPU-bound, iterative, data-parallel._

### The Hidden Overhead: Call Boundary Cost

_Python-to-Rust type conversion at the call boundary is not free. Avoid calling tiny Rust functions in tight Python loops — batch work into one call instead. Show the anti-pattern and the fix._

```python
# Code example placeholder: bad (calling Rust in a Python loop) vs good (passing list to Rust)
```

### Optimization Techniques Inside PyO3

_Use `Borrowed<T>` instead of `Bound<T>` in hot paths to avoid refcount bumps. Cache repeated `getattr` calls. Use the `intern!` macro to intern Python strings and avoid repeated allocation. Avoid `py.eval_bound` in hot paths._

```rust
// Code example placeholder: intern! macro usage and Borrowed<T> in a tight inner loop
```

### Profiling Strategy

_Profile Python first with `py-spy` or `cProfile`. Identify the top 1–3 hot functions. Move only those to Rust. Verify improvement with benchmarks before publishing._

```bash
# Code example placeholder: py-spy record -o profile.svg -- python my_script.py
```

---

## Part 10: Building, Packaging, and Publishing to PyPI

### `maturin build` — Creating the Wheel

_`maturin build` produces a `.whl` in `target/wheels/`. `maturin build --release` for optimized wheels. Wheel naming conventions explained: `my_ext-1.0-cp312-cp312-manylinux_2_17_x86_64.whl`._

```bash
# Code example placeholder: maturin build --release output and the resulting wheel file
```

### manylinux Compliance — Why It Matters

_PyPI requires Linux wheels to be manylinux-compliant (uses old glibc so they run on any Linux). Rust 1.64+ requires at least glibc 2.17 → use manylinux2014. Two approaches: Docker manylinux containers, or Zig as a cross-compiler._

```bash
# Code example placeholder: maturin build --zig for manylinux compliance without Docker
```

### Stable ABI Wheels with `abi3`

_`abi3` Cargo feature + `abi3-py39` version feature = one wheel runs on all Python versions ≥ 3.9. Wheel name suffix: `cp39-abi3-...`. Trade-offs: can't use APIs added in newer Python versions; some PyO3 features unavailable._

```toml
# Code example placeholder: Cargo.toml pyo3 dependency with abi3-py39 feature
```

### Cross-Compilation with `maturin-action` on GitHub Actions

_`maturin generate-ci github` auto-generates a GitHub Actions workflow. `maturin-action` handles cross-compilation for Linux, macOS, Windows, ARM64. Show the complete generated workflow._

```yaml
# Code example placeholder: GitHub Actions workflow from maturin generate-ci github
```

### Publishing to PyPI

_`maturin publish` / `uv publish` / `twine upload`. Setting up PyPI API tokens. Full CI/CD workflow: build on all platforms → test → publish on tag._

### `pyproject.toml` Configuration Reference

_Key `[tool.maturin]` settings: `features`, `python-source`, `module-name`, `strip`, `profile`. Show a complete production `pyproject.toml`._

```toml
# Code example placeholder: complete pyproject.toml for a mixed Rust+Python project
```

---

## Part 11: Memory Management Deep Dive

### Rust Ownership vs. Python Reference Counting

_The fundamental tension: Rust's strict single-owner model vs. Python's shared mutable reference-counted objects. How PyO3 bridges them._

### `Py<T>` — GIL-Independent Storage

_Hold a Python object without requiring the GIL. Safe to store in structs, send across threads. Increment refcount on clone. Drop releases the refcount. Analogous to `Arc<T>`._

```rust
// Code example placeholder: storing a Py<PyDict> in a #[pyclass] struct, accessing it later
```

### Interior Mutability for `#[pyclass]`

_Runtime borrow checking prevents data races. The borrow violation panic: when it happens and how to redesign to avoid it. When to use `Arc<Mutex<Inner>>` inside a `#[pyclass]` instead._

```rust
// Code example placeholder: #[pyclass] with inner: Arc<Mutex<Data>> for thread-safe mutation
```

### Avoiding Memory Leaks

_Risks: holding `Py<T>` without dropping it, circular references between Rust and Python objects. How Python's cycle collector interacts with PyO3 objects. The `__traverse__` / `__clear__` protocol (`#[pyclass(gc)]`) for cycle-collecting PyO3 objects._

---

## Part 12: Debugging, Testing, and CI

### Testing Rust Code with `pyo3-testing`

_`#[pyo3test]` attribute macro: test PyO3-wrapped functions in Rust without building/installing the full extension. `with_py_raises!` macro for testing Python exception raising. Make `crate-type = ["rlib", "cdylib"]` in Cargo.toml to enable `cargo test`._

```rust
// Code example placeholder: #[pyo3test] test function using with_py_raises!
```

### Python-Level Integration Tests with pytest

_Run `maturin develop` then `pytest`. Show a pytest test file covering the Python API surface of a PyO3 extension._

```python
# Code example placeholder: pytest test module for a PyO3 extension
```

### Debugging with rust-gdb / rust-lldb

_Attach Rust debugger to a running Python process. Set breakpoints in Rust source. VS Code `launch.json` configuration for debugging through pytest._

```json
// Code example placeholder: VS Code launch.json for debugging PyO3 through pytest
```

### Generating Python Stub Files (`.pyi`) for IDE Support

_`pyo3-stub-gen` crate or manual stubs. Why `.pyi` files are needed: mypy, pyright, IDE autocomplete. Show a generated stub file for a `#[pyclass]`._

```python
# Code example placeholder: .pyi stub file for a #[pyclass] with methods and properties
```

### Thread Safety Testing with ThreadSanitizer

_`RUSTFLAGS="-Z sanitizer=thread"` — detects data races at runtime. Essential for free-threaded extension validation. Show how to run it in CI._

---

## Part 13: Real-World Patterns and Architecture

### The "Thin Wrapper" Pattern — Keep Rust Logic Reusable

_Core Rust crate has no PyO3 dependency. A separate `_bindings.rs` file (or sub-crate) adds the PyO3 layer. Keeps core logic reusable outside Python and testable with `cargo test` alone._

```
# Code example placeholder: workspace layout with core crate + pyo3-bindings crate
```

### Structuring Large Extensions with Submodules

_Multiple Rust modules exposed as Python submodules. Using `m.add_submodule()` in `#[pymodule]`. How Python sees the module hierarchy._

```rust
// Code example placeholder: adding submodules for text, math, io processing areas
```

### The Builder Pattern in PyO3

_Expose a Rust builder struct as a `#[pyclass]`. Chain setter methods from Python. Call `.build()` to produce the final result. Fluent Python API backed by Rust._

```rust
// Code example placeholder: QueryBuilder #[pyclass] with method chaining and .build()
```

### Logging from Rust Into Python's `logging` Module

_`pyo3-log` crate bridges Rust's `log` / `tracing` to Python's logging infrastructure. Show setup so Rust log messages appear in Python's log output at the correct level._

```rust
// Code example placeholder: pyo3_log::init() in #[pymodule] and log::info!() in Rust
```

---

## Part 14: PyO3 Version History and Migration

### What Changed in v0.21–v0.28

_Timeline of breaking changes: v0.21 introduced `Bound<'py, T>` (GIL-ref era ended), v0.22 partial lifetime separation, v0.23 full removal of GIL Refs + `IntoPyObject` trait + `Sync` requirement on `#[pyclass]` + free-threaded support, v0.24 no breaking changes, v0.28 `FromPyObject` reworked + `.downcast()` → `.cast()` + PEP 489 multi-phase init + Python 3.14 support._

### Migrating from v0.22 to v0.23

_The biggest migration: GIL Refs (`&'py PyAny`) are gone — replace with `Bound<'py, PyAny>`. `IntoPy` replaced by `IntoPyObject`. `#[pyclass]` must now implement `Sync` — add `#[pyclass(unsendable)]` if intentionally not thread-safe._

```rust
// Code example placeholder: before (GIL Refs era) vs after (Bound era) — same function
```

### Migrating from v0.23 to v0.28

_`FromPyObject` reworked — `#[derive(FromPyObject)]` still works, but manual impls change. `.downcast::<PyStr>()` → `.cast::<PyStr>()`. `PyList::as_slice()` return type changed._

---

## Part 15: The Future — Free-Threaded Python and Beyond

### Python 3.14 Free-Threaded Is Here (But Not Default)

_PEP 779 accepted: free-threading is no longer experimental in 3.14, but GIL build is still the default. The ecosystem is actively porting. PyO3 extensions opting in with `gil_used = false` will be favored in free-threaded deployments. Single-threaded overhead down to ~5–10%._

### `PEP 803 (abi3t)` — Stable ABI for Free-Threaded Wheels

_The free-threaded equivalent of abi3. Would let you ship one wheel that runs on all free-threaded Python versions ≥ a minimum. Under active discussion — track the PEP for status._

### The Growing Rustification of Python

_Trend: more core Python tooling (linters, formatters, package managers, data libraries) being rewritten in Rust with PyO3. The hybrid architecture model (Rust core + Python bindings) is becoming the dominant pattern for high-performance Python libraries. What this means for your team: learning PyO3 is increasingly a career-differentiating skill._

---

## Performance Summary: What to Expect

_Consolidated table: benchmark scenario → Python time → Rust+PyO3 time → speedup. Covers: word count, 3D processing, computer vision, embedding workloads. Includes notes on what type of work benefits most. Makes the post highly shareable._

---

## Frequently Asked Questions

_10–12 FAQs: "Do I need to know Rust well to use PyO3?", "Will this work with my existing Python package?", "Can I use PyO3 with numpy/pandas?", "What Python versions are supported?", "Is PyO3 stable enough for production?", "How do I handle Rust panics in Python?", "Can I debug Rust code from VS Code?", "What's the difference between PyO3 and pybind11?", "How do I add type hints for my extension?", "What about async Python support?"_

---

## Conclusion

_Summarize the three things that make PyO3 the right choice in 2026: memory safety at C performance, first-class free-threaded Python support, and the maturin toolchain making distribution trivial. Point to the profile-first strategy — don't rewrite anything without data. CTA: link to pyo3.rs official guide, link to related posts (Rust on AWS Lambda, Next.js 16.2)._

---

> **Writing Notes:**
> - Every code example should be a real, runnable `src/lib.rs` + `python_caller.py` pair
> - Include benchmark results as tables with actual numbers, not vague claims
> - Include a callout box highlighting free-threaded Python 3.14 status — this is the most searched current topic
> - `#[pyclass]` patterns (Part 3) and Zero-Copy NumPy (Part 8) will be the most-linked sections — make these especially strong
> - Aim for 7,000–9,000 words of actual content
> - All Rust code examples should be compilable with `pyo3 = "0.28"` in Cargo.toml
