---
title: "Rust on AWS Lambda: The Production Guide to Cold Starts, cargo-lambda, and Managed Instances"
slug: "rust-aws-lambda-production-guide"
date: "2026-03-19"
category: "Rust"
tags:
  - Rust
  - AWS Lambda
  - cargo-lambda
  - serverless
  - cold starts
  - Lambda Managed Instances
  - AWS
  - Rust serverless
keywords:
  - Rust AWS Lambda tutorial
  - cargo-lambda deploy
  - Rust Lambda cold start
  - AWS Lambda Rust runtime
  - Lambda Managed Instances Rust
  - Rust serverless production
  - Rust Lambda performance benchmark
  - aws_lambda_events crate
metaDescription: "Rust on AWS Lambda went GA in November 2025. This guide covers cargo-lambda, cold start benchmarks (16ms), ARM64 vs x86_64, Lambda Managed Instances, and everything you need to ship Rust functions to production."
readTime: "28 min"
author: "nandann"
featured: true
---

AWS officially declared Rust support for Lambda generally available in November 2025. In March 2026, Lambda Managed Instances added Rust support, meaning you can now run high-concurrency Rust handlers on persistent EC2-backed environments with Compute Savings Plans. Cold starts of 16ms. Memory footprints under 128 MB where Python needs 512 MB. A 3x cost reduction versus Python at scale. This guide covers everything from your first handler to multi-threaded Lambda Managed Instances in production, with real benchmark numbers, real CI/CD pipelines, and real deployment code.

## Why Rust on Lambda Matters Now

### Cold Start Benchmarks (2026)

The headline numbers come from the lambda-perf project (maxday.github.io/lambda-perf), which runs daily benchmarks across all Lambda runtimes. Here are the current figures for a minimal function on ARM64 with 512 MB memory:

| Runtime | Cold Start (P50) | Cold Start (P99) |
|---|---|---|
| Rust (provided.al2023) | 16ms | 22ms |
| Go (provided.al2023) | 38ms | 52ms |
| Node.js 22 | 148ms | 210ms |
| Python 3.13 | 171ms | 325ms |
| Java 21 (GraalVM) | 194ms | 280ms |
| Java 21 (JVM) | 698ms | 1100ms |

That 16ms is not a typo and not a cherry-picked run. Rust functions on `provided.al2023` consistently land in the 12-22ms range for P50/P99. Node.js and Python are an order of magnitude slower on cold starts, and Java with the JVM is 40-70x slower.

Cold starts matter for any function that is not always warm: infrequently called internal tools, event-driven pipelines with bursty traffic, and user-facing API endpoints where spiky load means some requests hit cold containers. Even with Provisioned Concurrency, cold starts affect your scale-out speed.

### Cost: The Multiplicative Effect

Lambda billing is `memory_MB × duration_seconds / 1024 × price_per_GB_second`. ARM64 (Graviton) is 20% cheaper per GB-second than x86_64.

Concrete comparison for a function processing 10 million requests per month:

| Runtime | Memory | Avg Duration | Monthly Cost (ARM64) |
|---|---|---|---|
| Python 3.13 | 512 MB | 185ms | ~$18.40 |
| Node.js 22 | 256 MB | 120ms | ~$7.90 |
| Rust | 128 MB | 14ms | ~$0.59 |

Rust's advantage is multiplicative: the binary uses less memory AND runs faster AND gets the ARM64 discount. For high-volume functions, the difference becomes substantial. The engineering investment to write the function in Rust pays for itself quickly when your Lambda bill is in the hundreds per month.

### Why Rust's Latency Distribution Is Different

The more interesting advantage is not average latency but latency variance. Garbage-collected runtimes (Python, Node.js, Java) have GC pauses that create P99 spikes. A Python function with P50 of 30ms may have a P99 of 150ms due to GC pauses, reference counting overhead, and interpreter scheduling. Rust has none of those. No GC means no GC pauses. The P99 for a Rust Lambda is typically within 2-3x of the P50. For user-facing APIs, this matters more than raw average speed.

## Part 1: How Rust Runs on Lambda

### The `bootstrap` Binary

Lambda's `provided.al2023` runtime looks for a file named `bootstrap` in the deployment zip. That is your entire function. The `lambda_runtime` crate compiles into that binary. No separate interpreter process. No package scanning on startup. The binary starts, registers with the Lambda Runtime API, and waits for invocations.

The runtime API is a simple HTTP polling loop: `GET /2018-06-01/runtime/invocation/next` blocks until an invocation arrives, your handler runs, and then you `POST /2018-06-01/runtime/invocation/{requestId}/response` with the result. The `lambda_runtime` crate handles all of this. You just write a function.

### `provided.al2023` vs `provided.al2`

Always use `provided.al2023`. It ships a newer GLIBC (2.34 vs 2.26), has a smaller OS footprint (approximately 40 MB vs 109 MB), and gets automatic security patches. The `provided.al2` runtime is the legacy option. The only reason to use it is if a C library in your dependency tree requires GLIBC < 2.34, which is rare in practice.

### The Lambda Runtime API Loop

The `run()` function from `lambda_runtime` is a loop that:

1. Polls for the next invocation
2. Deserializes the JSON body into your event type `T`
3. Builds a `LambdaEvent<T>` with the payload and a `Context` struct
4. Calls your handler
5. Serializes the result and POSTs it back
6. Goes back to step 1

The `Context` struct contains: `request_id`, `invoked_function_arn`, `deadline_in_millis`, `xray_trace_id`, `client_context`, and `identity`. You will use `request_id` constantly for logging.

## Part 2: The Crate Ecosystem

### Core Crates

Before writing code, here is the map of what you will use:

- `lambda_runtime` (version 0.14+): the core runtime, `run()`, `run_concurrent()`, `LambdaEvent<T>`, `Context`
- `lambda_http` (version 0.14+): wraps API Gateway v1/v2, ALB, and Function URL events into standard `http::Request`/`http::Response`
- `aws_lambda_events` (version 0.15+): strongly-typed structs for every AWS event source
- `lambda_extension` (version 0.14+): for writing Lambda Extensions
- `aws-sdk-*`: the official AWS SDK, one crate per service
- `aws-config` (version 1.5+): handles credential loading and region detection

All of these are published under the `awslabs` GitHub organization and are part of the `aws-lambda-rust-runtime` project that reached GA in November 2025.

### `lambda_http` for HTTP APIs

The `lambda_http` crate is the right choice for any function triggered by API Gateway or a Lambda Function URL. It normalizes the event format so you get a standard `http::Request` regardless of whether the trigger is API Gateway v1 REST, API Gateway v2 HTTP, or a Function URL. It works directly with Axum, which means you can write a regular Axum app and pass it to `lambda_http::run()`.

### `aws_lambda_events` for Typed Event Structs

Instead of parsing raw JSON, use the strongly-typed structs from `aws_lambda_events`. Every AWS event source has a corresponding type: `SqsEvent`, `S3Event`, `DynamodbEvent`, `KinesisEvent`, `SnsEvent`, `EventBridgeEvent`. Using these is safer and eliminates a whole class of runtime errors from unexpected JSON structure.

## Part 3: cargo-lambda

### What It Is

`cargo-lambda` is a Cargo subcommand extension. It handles cross-compilation, local Lambda emulation, and deployment without Docker. AWS officially recommends it. You do not need to set up a Docker-based build pipeline or install `cross` manually.

### Installation

```bash
# macOS (Homebrew)
brew tap cargo-lambda/cargo-lambda
brew install cargo-lambda

# Linux / any platform (pip)
pip install cargo-lambda

# Verify
cargo lambda --version
# cargo-lambda 1.6.0
```

On Apple Silicon, `cargo-lambda` cross-compiles to `aarch64-unknown-linux-gnu` without any additional setup. It handles the musl/gnu toolchain installation automatically on first use.

### Scaffolding a New Project

```bash
cargo lambda new my-function
# Interactive prompts:
# > What type of event will trigger your function?
#   HTTP (API Gateway, ALB, Function URL)
#   SQS
#   EventBridge / CloudWatch Events
#   S3
#   SNS
#   Custom event
```

The generated project structure:

```
my-function/
  Cargo.toml
  src/
    main.rs
```

The generated `Cargo.toml` for an HTTP function:

```toml
[package]
name = "my-function"
version = "0.1.0"
edition = "2021"

[[bin]]
name = "bootstrap"
path = "src/main.rs"

[dependencies]
lambda_http = "0.14"
tokio = { version = "1", features = ["macros"] }
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }
serde = { version = "1", features = ["derive"] }
```

### Building

```bash
# Build for ARM64 (recommended)
cargo lambda build --release --arm64

# Build for x86_64
cargo lambda build --release

# Output location:
# target/lambda/my-function/bootstrap
```

The `--release` flag applies optimizations. The output is a zip-ready binary at `target/lambda/<function-name>/bootstrap`. No manual zipping needed for `cargo lambda deploy`.

### Local Development

```bash
# Start the local emulator with environment variables
cargo lambda watch --env-var DATABASE_URL=postgres://localhost/dev \
                   --env-var LOG_LEVEL=debug

# In another terminal, invoke the local function
cargo lambda invoke my-function \
  --data-ascii '{"name": "alice"}'

# Use a built-in event fixture (API Gateway, SQS, S3, etc.)
cargo lambda invoke my-function \
  --data-example apigw-request

# Invoke a deployed remote function
cargo lambda invoke my-function \
  --remote \
  --data-ascii '{"name": "alice"}'
```

`cargo lambda watch` emulates the Lambda control plane at `http://127.0.0.1:9000`. It rebuilds on file save. Lambda Function URLs are emulated at `/lambda-url/<function-name>/`.

### Deploying

```bash
cargo lambda deploy

# Output:
# 🔍 My-function not found, creating new Lambda function
# ✅ Function ARN: arn:aws:lambda:us-east-1:123456789:function:my-function
# ⚡ Architecture: arm64
# 📦 Code size: 1.8 MB
```

`cargo lambda deploy` reads the ELF binary header to auto-detect the target architecture and sets the Lambda `Architecture` field accordingly. No manual configuration needed. On first deploy it creates an IAM execution role automatically. For production, you will want to provide your own IAM role.

### Workspace Configuration for Multiple Functions

When you have multiple Lambda functions sharing library code, use a Cargo workspace with per-binary Lambda configuration:

```toml
# Root Cargo.toml
[workspace]
members = [
  "functions/api-handler",
  "functions/sqs-processor",
  "functions/scheduled-job",
  "shared/common",
]

# functions/api-handler/Cargo.toml
[package.metadata.lambda.deploy]
memory = 256
timeout = 30
env = [
  { key = "LOG_LEVEL", value = "info" },
]
iam_role = "arn:aws:iam::123456789:role/my-lambda-role"

# functions/sqs-processor/Cargo.toml
[package.metadata.lambda.deploy]
memory = 128
timeout = 300
```

Build and deploy all functions from the workspace root:

```bash
cargo lambda build --release --arm64
cargo lambda deploy --function-name api-handler
cargo lambda deploy --function-name sqs-processor
```

## Part 4: Your First Real Handler

Here is a complete minimal handler with proper structure:

```toml
# Cargo.toml
[dependencies]
lambda_runtime = "0.14"
tokio = { version = "1", features = ["macros"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter", "fmt"] }
```

```rust
use lambda_runtime::{run, service_fn, Error, LambdaEvent};
use serde::{Deserialize, Serialize};
use tracing::info;

#[derive(Deserialize)]
struct Request {
    name: String,
    operation: String,
}

#[derive(Serialize)]
struct Response {
    message: String,
    request_id: String,
    processed: bool,
}

async fn function_handler(event: LambdaEvent<Request>) -> Result<Response, Error> {
    let (payload, ctx) = event.into_parts();

    if payload.name.is_empty() {
        return Err("name field cannot be empty".into());
    }

    info!(
        request_id = %ctx.request_id,
        operation = %payload.operation,
        "Processing request"
    );

    Ok(Response {
        message: format!("Processed {} for {}", payload.operation, payload.name),
        request_id: ctx.request_id,
        processed: true,
    })
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::from_default_env()
                .add_directive("my_function=info".parse()?)
        )
        .json()
        .init();

    run(service_fn(function_handler)).await
}
```

Deploy and test the full cycle:

```bash
cargo lambda build --release --arm64
cargo lambda deploy --function-name my-function
cargo lambda invoke my-function \
  --remote \
  --data-ascii '{"name": "alice", "operation": "transform"}'

# Response:
# {
#   "message": "Processed transform for alice",
#   "request_id": "abc123-...",
#   "processed": true
# }
```

## Part 5: ARM64 vs x86_64

### Performance and Cost

ARM64 (AWS Graviton3) is 20% cheaper per GB-second than x86_64. For Rust functions specifically, ARM64 also runs 13-24% faster on the same workload due to Graviton's better memory bandwidth and instruction throughput for the kinds of operations Rust-compiled code tends to do.

For CPU-bound tasks like SHA-256 hashing, the advantage is larger. With the `sha2` crate's `asm` feature enabled, ARM64 uses NEON/SVE instructions that are significantly faster than the x86_64 implementation:

```toml
[dependencies]
sha2 = { version = "0.10", features = ["asm"] }
```

The `asm` feature automatically uses the best available instruction set for the target architecture. On ARM64 this means NEON/SVE. On x86_64 this means SSE/AVX. But Graviton's execution units handle these operations more efficiently for the types of workloads that show up in Lambda.

### When to Use x86_64

Use x86_64 when:

- A C library in your dependency tree does not have an ARM64 build (check with `cargo tree` and look for `-sys` crates)
- You are using inline assembly with x86-specific SIMD intrinsics (`_mm256_*`, `_mm512_*`)
- A dependency uses `unsafe` C FFI bindings that only ship x86_64 `.so` files

For most Rust Lambda functions, ARM64 is the better choice with no downsides.

### Cross-Compilation Is Transparent

```bash
# From macOS Intel, macOS ARM64, or Linux x86_64:
cargo lambda build --release --arm64
# Just works. cargo-lambda installs the target toolchain on first use.
```

`cargo lambda deploy` reads the ELF binary header and sets the Lambda `Architecture` field automatically. You cannot accidentally deploy an x86 binary to an ARM64 function configuration.

## Part 6: Binary Size and Build Optimization

### Default Binary Size

A typical Rust Lambda handler compiles to approximately 1.7-2.5 MB uncompressed and 0.8-1.2 MB gzipped. Compare this to a minimal Node.js Lambda with a few npm packages at 50+ MB, or a Go binary at 5-8 MB.

Smaller binaries mean faster deployment uploads and faster cold start initialization (Lambda has to extract the zip before starting your binary).

### Release Profile Optimization

Add this to your `Cargo.toml` for Lambda production builds:

```toml
[profile.release]
opt-level = "z"       # Optimize for size (use 3 for CPU-bound functions)
lto = true            # Link-time optimization reduces binary size significantly
codegen-units = 1     # Single codegen unit for better optimization
panic = "abort"       # Smaller binary, no unwinding overhead
strip = true          # Remove debug symbols (saves 1-2 MB typically)
```

`cargo-lambda` automatically applies `strip = true` and `panic = "abort"` when you use `--release`. Adding `lto = true` and `codegen-units = 1` manually reduces binary size by an additional 15-30% on most projects.

The `opt-level = "z"` flag optimizes for size rather than speed. For I/O-bound functions (most Lambda functions), this is the right choice. For CPU-bound functions doing heavy numeric computation, use `opt-level = 3` instead and benchmark both.

## Part 7: Cold Start Deep Dive

### What Happens During a Cold Start

When Lambda starts a new execution environment, four things happen in sequence:

1. Lambda downloads and extracts your deployment zip (fast for Rust: 0.8 MB takes under 10ms)
2. Lambda starts the `bootstrap` OS process
3. Your `main()` function runs, initializing your runtime state
4. The first invocation arrives and your handler executes

The `Init Duration` field in the CloudWatch REPORT log measures steps 2 through 4. For Rust, this is typically 12-22ms. For Node.js, it is 100-400ms because Node.js has to start V8, load the runtime, scan `node_modules`, and evaluate your module tree.

### Initialization Patterns

What you put in `main()` runs on every cold start. Keep it fast but do not defer necessary work:

```toml
[dependencies]
lambda_runtime = "0.14"
aws-config = "1.5"
aws-sdk-dynamodb = "1.55"
tokio = { version = "1", features = ["macros", "sync"] }
tokio-postgres = "0.7"
```

```rust
use aws_config::BehaviorVersion;
use aws_sdk_dynamodb::Client as DynamoClient;
use lambda_runtime::{run, service_fn, Error, LambdaEvent};
use serde_json::Value;
use tokio::sync::OnceCell;

// SDK clients are cheap to initialize (no network calls in the constructor)
// Initialize them in main() so they are reused across invocations
static DYNAMO: OnceCell<DynamoClient> = OnceCell::const_new();

async fn get_dynamo() -> &'static DynamoClient {
    DYNAMO.get_or_init(|| async {
        let config = aws_config::load_defaults(BehaviorVersion::latest()).await;
        DynamoClient::new(&config)
    }).await
}

async fn handler(event: LambdaEvent<Value>) -> Result<Value, Error> {
    let client = get_dynamo().await;
    // use client...
    Ok(serde_json::json!({"status": "ok"}))
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    // Initialize the DynamoDB client during cold start
    // Subsequent invocations reuse the same client
    let config = aws_config::load_defaults(BehaviorVersion::latest()).await;
    DYNAMO.set(DynamoClient::new(&config)).ok();

    run(service_fn(handler)).await
}
```

SDK client initialization is fast (no network calls in the constructor) so initializing in `main()` adds minimal cold start time and pays off immediately by reusing the client across warm invocations.

For database connections, use `OnceCell` with lazy initialization since the connection itself involves a network round-trip.

### Reading the REPORT Log

Every Lambda invocation ends with a REPORT log line in CloudWatch:

```
REPORT RequestId: abc123  Duration: 14.23 ms  Billed Duration: 15 ms
Memory Size: 128 MB  Max Memory Used: 42 MB  Init Duration: 18.45 ms
```

The `Init Duration` field only appears on cold starts. Use this CloudWatch Logs Insights query to analyze your cold start distribution:

```sql
filter @type = "REPORT"
| parse @message "Init Duration: @initDuration ms"
| filter ispresent(@initDuration)
| stats count() as coldStarts,
        avg(@initDuration) as avgInitMs,
        pct(@initDuration, 95) as p95InitMs,
        pct(@initDuration, 99) as p99InitMs
| sort by coldStarts desc
```

### When You Actually Need Provisioned Concurrency

Rust cold starts are fast enough that Provisioned Concurrency is rarely necessary. The exception is a strict P99 SLA below 20ms where even the first request to a brand-new execution environment must be under that threshold. SnapStart is not available for `provided.al2023`, but Rust does not need it.

## Part 8: Lambda Managed Instances

Lambda Managed Instances (LMI) reached general availability in March 2026 with Rust support. This is the most significant architectural change to Lambda in years, and Rust is unusually well-suited for it.

### What LMI Is

Standard Lambda runs one request per execution environment. LMI runs your function on customer-owned EC2 instances managed by Lambda, where one execution environment handles multiple simultaneous requests. You get persistent warm instances with no cold starts, access to Graviton4 and latest x86 CPUs, and billing by instance-hour rather than per-request. Compute Savings Plans apply, bringing costs down by up to 72% versus on-demand Lambda pricing for steady-state workloads.

### Why Rust Fits LMI Perfectly

Standard Python and Node.js Lambda functions cannot safely handle concurrent requests in a single process because their standard library functions are not thread-safe and they have a Global Interpreter Lock (Python) or single-threaded event loop assumptions. Rust's ownership model and the Tokio async runtime are designed exactly for this: thousands of concurrent async tasks on a small thread pool with compile-time safety guarantees.

### Enabling LMI Concurrency

Add the `tokio` feature to `lambda_runtime` and switch from `run()` to `run_concurrent()`:

```toml
[dependencies]
lambda_runtime = { version = "0.14", features = ["tokio"] }
tokio = { version = "1", features = ["macros", "rt-multi-thread"] }
aws-sdk-dynamodb = "1.55"
aws-config = "1.5"
```

```rust
use aws_config::BehaviorVersion;
use aws_sdk_dynamodb::Client as DynamoClient;
use lambda_runtime::{run_concurrent, service_fn, Error, LambdaEvent};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::RwLock;
use tracing::{info, instrument};

#[derive(Clone)]
struct AppState {
    dynamo: DynamoClient,
    // In-memory cache shared across concurrent requests
    cache: Arc<RwLock<std::collections::HashMap<String, String>>>,
}

#[derive(Deserialize)]
struct Request {
    user_id: String,
}

#[derive(Serialize)]
struct Response {
    user_id: String,
    data: String,
}

#[instrument(skip(state), fields(user_id = %event.payload.user_id))]
async fn handler(
    state: Arc<AppState>,
    event: LambdaEvent<Request>,
) -> Result<Response, Error> {
    let user_id = event.payload.user_id.clone();
    let request_id = event.context.request_id.clone();

    info!(request_id = %request_id, "Processing request");

    // Check cache first (read lock, non-exclusive)
    {
        let cache = state.cache.read().await;
        if let Some(data) = cache.get(&user_id) {
            return Ok(Response {
                user_id,
                data: data.clone(),
            });
        }
    }

    // Cache miss: query DynamoDB
    let result = state.dynamo
        .get_item()
        .table_name("users")
        .key("user_id", aws_sdk_dynamodb::types::AttributeValue::S(user_id.clone()))
        .send()
        .await?;

    let data = result.item()
        .and_then(|i| i.get("data"))
        .and_then(|v| v.as_s().ok())
        .cloned()
        .unwrap_or_default();

    // Update cache (write lock)
    {
        let mut cache = state.cache.write().await;
        cache.insert(user_id.clone(), data.clone());
    }

    Ok(Response { user_id, data })
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt().json().init();

    let config = aws_config::load_defaults(BehaviorVersion::latest()).await;
    let state = Arc::new(AppState {
        dynamo: DynamoClient::new(&config),
        cache: Arc::new(RwLock::new(std::collections::HashMap::new())),
    });

    run_concurrent(service_fn(move |event| {
        let state = Arc::clone(&state);
        async move { handler(state, event).await }
    }))
    .await
}
```

The `Arc<AppState>` pattern is idiomatic: the state is initialized once and cloned cheaply (just an atomic reference count increment) for each concurrent request. The `DynamoClient` is already concurrency-safe so no additional wrapping is needed.

### Graceful Shutdown

LMI instances receive a SIGTERM when Lambda wants to scale in. Handle it to drain in-flight requests:

```rust
use lambda_runtime::Runtime;
use tokio::signal::unix::{signal, SignalKind};

#[tokio::main]
async fn main() -> Result<(), Error> {
    // ... state initialization ...

    let runtime = Runtime::new(service_fn(move |event| {
        // ... handler ...
    }));

    tokio::select! {
        result = runtime.run_concurrent() => result?,
        _ = async {
            let mut sigterm = signal(SignalKind::terminate()).unwrap();
            sigterm.recv().await;
            tracing::info!("SIGTERM received, draining in-flight requests");
        } => {}
    }

    Ok(())
}
```

### LMI vs Standard Lambda Decision Guide

Use LMI when:
- Traffic is steady-state with predictable volume (LMI does not scale to zero)
- You need connection pooling (database connections, gRPC channels) that are expensive to re-establish
- Function concurrency is consistently high (LMI becomes cost-effective above roughly 20 requests per second sustained)
- You need persistent in-memory caching across requests

Use standard Lambda when:
- Traffic is spiky or unpredictable (LMI takes up to 5 minutes to double instance capacity)
- Scale-to-zero behavior is important (LMI bills per instance-hour even at zero requests)
- Functions are infrequently called (LMI's per-hour billing is inefficient for low-volume functions)

## Part 9: HTTP APIs with Axum

The `lambda_http` crate integrates with Axum directly. Write a regular Axum app and pass the router to `lambda_http::run()`.

```toml
[dependencies]
lambda_http = "0.14"
axum = "0.7"
tower-http = { version = "0.5", features = ["trace", "cors", "compression-gzip"] }
tokio = { version = "1", features = ["macros"] }
serde = { version = "1", features = ["derive"] }
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }
```

```rust
use axum::{
    extract::Path,
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use lambda_http::{run, Error};
use serde::{Deserialize, Serialize};
use tower_http::{cors::CorsLayer, trace::TraceLayer};

#[derive(Serialize)]
struct HealthResponse {
    status: String,
}

#[derive(Deserialize)]
struct CreateItemRequest {
    name: String,
    value: String,
}

#[derive(Serialize)]
struct CreateItemResponse {
    id: String,
    name: String,
}

async fn health_handler() -> impl IntoResponse {
    Json(HealthResponse {
        status: "healthy".to_string(),
    })
}

async fn get_item_handler(Path(id): Path<String>) -> impl IntoResponse {
    if id.is_empty() {
        return (StatusCode::BAD_REQUEST, Json(serde_json::json!({"error": "id required"}))).into_response();
    }
    Json(serde_json::json!({"id": id, "found": true})).into_response()
}

async fn create_item_handler(
    Json(body): Json<CreateItemRequest>,
) -> impl IntoResponse {
    let id = uuid::Uuid::new_v4().to_string();
    (
        StatusCode::CREATED,
        Json(CreateItemResponse {
            id,
            name: body.name,
        }),
    )
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .json()
        .init();

    let app = Router::new()
        .route("/health", get(health_handler))
        .route("/items/:id", get(get_item_handler))
        .route("/items", post(create_item_handler))
        .layer(TraceLayer::new_for_http())
        .layer(CorsLayer::permissive());

    run(app).await
}
```

This compiles for both local development (`axum::serve`) and Lambda (`lambda_http::run`) with a feature flag. The same Router handles API Gateway v1, API Gateway v2, ALB, and Function URL events without any changes.

## Part 10: Event Source Integrations

### SQS with Partial Batch Failure

The most important pattern for SQS handlers is partial batch failure reporting. If you return an error, Lambda re-drives the entire batch. Return an `SqsBatchResponse` to report exactly which messages failed.

```toml
[dependencies]
lambda_runtime = "0.14"
aws_lambda_events = { version = "0.15", features = ["sqs"] }
tokio = { version = "1", features = ["macros"] }
futures = "0.3"
```

```rust
use aws_lambda_events::event::sqs::{SqsBatchResponse, SqsEvent, SqsJobProps};
use lambda_runtime::{run, service_fn, Error, LambdaEvent};
use futures::future::join_all;
use tracing::{error, info};

async fn process_record(record: &aws_lambda_events::event::sqs::SqsMessage) -> Result<(), String> {
    let body = record.body.as_deref().unwrap_or("");
    info!(message_id = ?record.message_id, "Processing SQS message");

    // Your processing logic here
    if body.contains("invalid") {
        return Err(format!("Invalid message: {}", body));
    }

    Ok(())
}

async fn handler(event: LambdaEvent<SqsEvent>) -> Result<SqsBatchResponse, Error> {
    let records = event.payload.records;

    let results = join_all(
        records.iter().map(|record| async move {
            match process_record(record).await {
                Ok(()) => None,
                Err(e) => {
                    error!(
                        message_id = ?record.message_id,
                        error = %e,
                        "Failed to process message"
                    );
                    record.message_id.clone().map(|id| SqsJobProps { item_identifier: id })
                }
            }
        })
    ).await;

    let item_failures: Vec<SqsJobProps> = results.into_iter().flatten().collect();
    info!(failed_count = item_failures.len(), "Batch complete");

    Ok(SqsBatchResponse { batch_item_failures: item_failures })
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt().json().init();
    run(service_fn(handler)).await
}
```

Enable `ReportBatchItemFailures` in your Lambda event source mapping configuration to activate this behavior.

### S3 Events

```toml
[dependencies]
aws_lambda_events = { version = "0.15", features = ["s3"] }
aws-sdk-s3 = "1.65"
```

```rust
use aws_lambda_events::event::s3::S3Event;
use lambda_runtime::{run, service_fn, Error, LambdaEvent};
use aws_sdk_s3::Client as S3Client;
use aws_config::BehaviorVersion;

async fn handler(event: LambdaEvent<S3Event>) -> Result<(), Error> {
    let config = aws_config::load_defaults(BehaviorVersion::latest()).await;
    let s3 = S3Client::new(&config);

    for record in &event.payload.records {
        let bucket = record.s3.bucket.name.as_deref().unwrap_or("");
        let key = record.s3.object.key.as_deref().unwrap_or("");

        let object = s3.get_object()
            .bucket(bucket)
            .key(key)
            .send()
            .await?;

        let bytes = object.body.collect().await?.into_bytes();
        tracing::info!(bucket = bucket, key = key, bytes = bytes.len(), "Processed S3 object");

        // Process bytes, then upload result to another bucket
    }

    Ok(())
}
```

Move the `S3Client` initialization to `main()` for production use to avoid re-initializing on every invocation.

### EventBridge Scheduled Jobs

```rust
use aws_lambda_events::event::cloudwatch_events::CloudWatchEvent;
use lambda_runtime::{run, service_fn, Error, LambdaEvent};
use serde_json::Value;

async fn handler(event: LambdaEvent<CloudWatchEvent<Value>>) -> Result<(), Error> {
    tracing::info!(
        source = ?event.payload.source,
        detail_type = ?event.payload.detail_type,
        "Scheduled job triggered"
    );

    // Nightly cleanup, batch processing, etc.
    run_cleanup_job().await?;

    Ok(())
}

async fn run_cleanup_job() -> Result<(), Error> {
    tracing::info!("Running cleanup job");
    // ... cleanup logic ...
    Ok(())
}
```

## Part 11: AWS SDK for Rust

The official AWS SDK for Rust uses async/await throughout and is concurrency-safe by design. All clients implement `Clone` and are cheap to clone (they share the underlying HTTP connection pool via `Arc`).

```toml
[dependencies]
aws-config = "1.5"
aws-sdk-dynamodb = "1.55"
aws-sdk-s3 = "1.65"
aws-sdk-secretsmanager = "1.50"
```

```rust
use aws_config::BehaviorVersion;
use aws_sdk_dynamodb::{
    types::AttributeValue,
    Client as DynamoClient,
};

async fn get_item(client: &DynamoClient, id: &str) -> Result<Option<String>, aws_sdk_dynamodb::Error> {
    let result = client
        .get_item()
        .table_name("my-table")
        .key("id", AttributeValue::S(id.to_string()))
        .send()
        .await?;

    Ok(result
        .item()
        .and_then(|item| item.get("data"))
        .and_then(|v| v.as_s().ok())
        .cloned())
}

async fn put_item(client: &DynamoClient, id: &str, data: &str) -> Result<(), aws_sdk_dynamodb::Error> {
    client
        .put_item()
        .table_name("my-table")
        .item("id", AttributeValue::S(id.to_string()))
        .item("data", AttributeValue::S(data.to_string()))
        .item("ttl", AttributeValue::N(
            (std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_secs() + 86400)
                .to_string()
        ))
        .send()
        .await?;

    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), lambda_runtime::Error> {
    let aws_config = aws_config::load_defaults(BehaviorVersion::latest()).await;
    let dynamo = DynamoClient::new(&aws_config);

    // dynamo is cloneable and thread-safe — pass it by clone or Arc to your handler
    lambda_runtime::run(lambda_runtime::service_fn(move |event| {
        let client = dynamo.clone();
        async move {
            // use client in handler
            let _ = get_item(&client, "test").await;
            Ok::<serde_json::Value, lambda_runtime::Error>(serde_json::json!({}))
        }
    }))
    .await
}
```

The `aws-config` crate handles credential loading automatically in this order: environment variables, `~/.aws/credentials`, EC2 instance profile, Lambda execution role. You do not configure credentials manually in Lambda.

## Part 12: Error Handling Patterns

### Typed Errors with thiserror

For library code and functions with distinct failure modes, use `thiserror`:

```toml
[dependencies]
thiserror = "1"
anyhow = "1"
```

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("item not found: {id}")]
    NotFound { id: String },

    #[error("validation error: {field} - {message}")]
    ValidationError { field: String, message: String },

    #[error("database error: {0}")]
    DatabaseError(#[from] aws_sdk_dynamodb::Error),

    #[error("downstream service error: {status} - {body}")]
    DownstreamError { status: u16, body: String },
}

async fn find_item(client: &aws_sdk_dynamodb::Client, id: &str) -> Result<String, AppError> {
    if id.is_empty() {
        return Err(AppError::ValidationError {
            field: "id".to_string(),
            message: "cannot be empty".to_string(),
        });
    }

    let result = client
        .get_item()
        .table_name("items")
        .key("id", aws_sdk_dynamodb::types::AttributeValue::S(id.to_string()))
        .send()
        .await?; // DatabaseError via #[from]

    result
        .item()
        .and_then(|i| i.get("data"))
        .and_then(|v| v.as_s().ok())
        .cloned()
        .ok_or_else(|| AppError::NotFound { id: id.to_string() })
}
```

For Lambda handlers, convert `AppError` to Lambda's `Error` type (which is `Box<dyn std::error::Error + Send + Sync>`) via the `From` trait or by using `anyhow`. Lambda serializes the error's `Display` output to the response, so make your error messages descriptive and structured.

### When to Use anyhow

Use `anyhow` for application-level handlers where you do not need callers to match on error variants:

```rust
use anyhow::{anyhow, Context, Result};

async fn handler(event: LambdaEvent<Request>) -> Result<Response, lambda_runtime::Error> {
    let data = fetch_data(&event.payload.id)
        .await
        .context("failed to fetch item from DynamoDB")?;

    let processed = process_data(data)
        .context("data processing failed")?;

    Ok(Response { result: processed })
}
```

The `context()` method from `anyhow` adds context to error messages without losing the original error. The error chain shows up in CloudWatch as a structured message.

## Part 13: Observability

### Structured Logging

Every Lambda function should emit JSON-structured logs. CloudWatch Logs Insights can then query fields directly.

```rust
use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

fn init_tracing() {
    tracing_subscriber::registry()
        .with(EnvFilter::from_default_env())
        .with(fmt::layer().json())
        .init();
}

async fn handler(event: LambdaEvent<Request>) -> Result<Response, Error> {
    let request_id = event.context.request_id.clone();

    // Create a span with request_id so all child logs include it
    let span = tracing::info_span!("handler", request_id = %request_id);
    let _guard = span.enter();

    tracing::info!(
        user_id = %event.payload.user_id,
        operation = "fetch",
        "Starting operation"
    );

    // ... handler logic ...

    tracing::info!(duration_ms = 14, "Operation complete");

    Ok(Response { /* ... */ })
}
```

With JSON logging, CloudWatch Logs Insights queries become straightforward:

```sql
filter @message like /handler/
| parse @message '{"timestamp":"*","level":"*","message":"*","request_id":"*"' as ts, level, msg, reqId
| filter level = "ERROR"
| stats count() by reqId
| sort count desc
```

### OpenTelemetry and X-Ray

The AWS X-Ray SDK for Rust is not the recommended path in 2026. Use the ADOT (AWS Distro for OpenTelemetry) Lambda Layer instead. Add the `AWSOpenTelemetryDistro` Lambda Layer ARN to your function, set the `OTEL_SERVICE_NAME` and `OTEL_TRACES_SAMPLER` environment variables, and your Rust function automatically ships traces to X-Ray via the OTLP exporter without any code changes.

For latency-sensitive functions where even the ADOT flush overhead is too much, use `lambda-otel-lite`:

```toml
[dependencies]
lambda-otel-lite = "0.10"
opentelemetry = "0.25"
```

```rust
use lambda_otel_lite::{init_telemetry, TelemetryConfig};
use opentelemetry::trace::Tracer;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let (tracer_provider, completion_handler) = init_telemetry(
        TelemetryConfig::builder()
            .with_service_name("my-function")
            .build()
    ).await?;

    lambda_runtime::run(service_fn(|event| async move {
        let tracer = tracer_provider.tracer("my-function");
        let span = tracer.start("handle_request");
        // ... handler logic ...
        drop(span);
        Ok::<_, Error>(serde_json::json!({}))
    })).await?;

    completion_handler.shutdown().await;
    Ok(())
}
```

## Part 14: CI/CD with GitHub Actions

### Complete Workflow

```yaml
name: Deploy Lambda

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  id-token: write  # Required for OIDC authentication
  contents: read

env:
  RUST_VERSION: "1.83"
  FUNCTION_NAME: "my-function"
  AWS_REGION: "us-east-1"

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable
        with:
          toolchain: ${{ env.RUST_VERSION }}

      - name: Cache cargo registry and build artifacts
        uses: actions/cache@v4
        with:
          path: |
            ~/.cargo/registry
            ~/.cargo/index
            target/
          key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}
          restore-keys: |
            ${{ runner.os }}-cargo-

      - name: Run tests
        run: cargo test --all

      - name: Run cargo audit
        run: |
          cargo install cargo-audit --locked
          cargo audit

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable
        with:
          toolchain: ${{ env.RUST_VERSION }}

      - name: Cache cargo registry and build artifacts
        uses: actions/cache@v4
        with:
          path: |
            ~/.cargo/registry
            ~/.cargo/index
            target/
          key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}

      - name: Install cargo-lambda
        run: pip install cargo-lambda

      - name: Build for ARM64
        run: cargo lambda build --release --arm64

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/github-actions-deploy
          aws-region: ${{ env.AWS_REGION }}

      - name: Deploy to Lambda
        run: |
          cargo lambda deploy \
            --function-name ${{ env.FUNCTION_NAME }} \
            --iam-role arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/lambda-execution-role

      - name: Smoke test
        run: |
          cargo lambda invoke ${{ env.FUNCTION_NAME }} \
            --remote \
            --data-ascii '{"test": true}'
```

The OIDC authentication approach (`id-token: write` permission + `aws-actions/configure-aws-credentials`) eliminates the need for long-lived AWS access keys in GitHub Secrets.

### Caching Strategy

The cache key `hashFiles('**/Cargo.lock')` means the cache is invalidated only when dependencies change. For a project with a stable dependency set, second+ CI runs are 30-40% faster because the cargo registry and compiled dependencies are restored from cache. Add `sccache` for distributed compilation caching across matrix jobs.

## Part 15: Cost Comparison

### Real Numbers at Scale

Based on AWS Lambda pricing for ARM64 in us-east-1 as of Q1 2026 ($0.0000133334 per GB-second, $0.20 per 1M requests):

| Runtime | Memory | Avg Duration | 10M req/month compute | 10M req/month requests | Total |
|---|---|---|---|---|---|
| Python 3.13 | 512 MB | 185ms | $12.60 | $2.00 | $14.60 |
| Node.js 22 | 256 MB | 120ms | $4.10 | $2.00 | $6.10 |
| Go | 128 MB | 35ms | $0.30 | $2.00 | $2.30 |
| Rust | 128 MB | 14ms | $0.12 | $2.00 | $2.12 |

At 10M requests/month, Rust costs essentially the same as Go but is 3x cheaper than Node.js and 7x cheaper than Python. At 100M requests/month, the compute difference between Rust and Python is $106 versus $1.20 per month.

The engineering investment to write a function in Rust (perhaps 2-4 extra hours for a developer already familiar with Rust) pays off at roughly 5-20M requests/month depending on the runtime being replaced.

### LMI Cost Model

For a steady-state workload handling 50 requests per second continuously:

- Standard Lambda (Rust, ARM64, 128 MB): 50 req/s × 14ms × 86,400s/day = 60,480 GB-seconds/day = ~$0.80/day
- LMI (1x m7g.medium instance, Compute Savings Plan 1-year): approximately $0.30/day

At sustained load, LMI with a Savings Plan is approximately 60% cheaper than standard Lambda. The break-even point where LMI becomes cost-effective versus standard Lambda is roughly 20-30 requests per second sustained.

## Part 16: Migration from Node.js and Python

### When to Migrate

Migration to Rust makes sense when:

- Cold start latency is affecting user-facing P99 SLA
- Lambda costs are significant ($500+/month) and the function is CPU or memory bound
- You need connection pooling or persistent in-memory state (LMI use case)
- The function does CPU-intensive work: parsing, encoding, hashing, compression
- You are writing a Lambda Extension and want to minimize overhead on every customer function

Migration does not make sense when:
- The function is pure I/O-bound with a single downstream call and takes 10ms anyway
- Your team has no Rust experience and the function is not performance-critical
- The function's logic changes frequently (Rust's compilation time slows iteration)

### The Incremental Approach

You do not need to rewrite everything at once. Lambda functions are independently deployed. The recommended order:

1. Start with Lambda Extensions (highest ROI, standalone rewrite, does not require touching your main functions)
2. Migrate CPU-bound or high-cost functions next (image processing, data transformation, report generation)
3. Evaluate LMI for steady-state high-volume functions
4. Leave infrequently called internal tools in their original language

Your Python and Rust Lambda functions coexist without any coordination. They are separate deployments. You can route traffic to them independently via API Gateway or weighted aliases.

### What the Rewrite Actually Looks Like

A Python Lambda handler:

```python
def handler(event, context):
    name = event.get('name', '')
    if not name:
        raise ValueError("name is required")
    return {'message': f'Hello, {name}!', 'requestId': context.aws_request_id}
```

The equivalent Rust handler:

```rust
use lambda_runtime::{run, service_fn, Error, LambdaEvent};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct Request { name: String }

#[derive(Serialize)]
struct Response { message: String, request_id: String }

async fn handler(event: LambdaEvent<Request>) -> Result<Response, Error> {
    if event.payload.name.is_empty() {
        return Err("name is required".into());
    }
    Ok(Response {
        message: format!("Hello, {}!", event.payload.name),
        request_id: event.context.request_id,
    })
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(service_fn(handler)).await
}
```

The Rust version is more verbose up front but adds compile-time type checking, automatic serialization, and runs 10-15x faster.

## Part 17: IaC Integration

### AWS SAM

```yaml
# template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  MyFunction:
    Type: AWS::Serverless::Function
    Metadata:
      BuildMethod: rust-cargolambda
      BuildProperties:
        Binary: my-function
    Properties:
      FunctionName: my-function
      CodeUri: ./
      Handler: bootstrap
      Runtime: provided.al2023
      Architectures:
        - arm64
      MemorySize: 128
      Timeout: 30
      Environment:
        Variables:
          RUST_LOG: info
      Events:
        ApiEvent:
          Type: HttpApi
          Properties:
            Path: /items/{id}
            Method: GET
```

SAM builds using cargo-lambda under the hood. Run `sam build && sam deploy`.

### AWS CDK

```typescript
import { Stack } from 'aws-cdk-lib';
import { RustFunction } from 'cargo-lambda-cdk';
import * as apigateway from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

export class MyStack extends Stack {
  constructor(scope: any, id: string) {
    super(scope, id);

    const fn = new RustFunction(this, 'MyFunction', {
      functionName: 'my-function',
      manifestPath: 'Cargo.toml',
      architecture: 'arm64',
      memorySize: 128,
      timeout: cdk.Duration.seconds(30),
      environment: {
        RUST_LOG: 'info',
        TABLE_NAME: 'my-table',
      },
    });

    const api = new apigateway.HttpApi(this, 'Api');
    api.addRoutes({
      path: '/items/{id}',
      methods: [apigateway.HttpMethod.GET],
      integration: new HttpLambdaIntegration('ItemIntegration', fn),
    });
  }
}
```

`cargo-lambda-cdk` builds and packages the Rust binary during `cdk synth`. The construct handles cross-compilation automatically.

### Terraform

```hcl
resource "null_resource" "build_lambda" {
  triggers = {
    src_hash = sha256(join("", [for f in fileset("src", "**/*.rs") : filesha256("src/${f}")]))
  }

  provisioner "local-exec" {
    command = "cargo lambda build --release --arm64"
  }
}

data "archive_file" "lambda_zip" {
  depends_on  = [null_resource.build_lambda]
  type        = "zip"
  source_file = "${path.module}/target/lambda/my-function/bootstrap"
  output_path = "${path.module}/target/lambda/my-function.zip"
}

resource "aws_lambda_function" "my_function" {
  depends_on       = [null_resource.build_lambda]
  function_name    = "my-function"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  handler          = "bootstrap"
  runtime          = "provided.al2023"
  architectures    = ["arm64"]
  memory_size      = 128
  timeout          = 30
  role             = aws_iam_role.lambda_role.arn

  environment {
    variables = {
      RUST_LOG = "info"
    }
  }
}
```

## Part 18: Security Best Practices

### Never Put Secrets in Environment Variables

Environment variables are visible in the Lambda console, CloudFormation events, and deployment logs. Use Secrets Manager and fetch at init time:

```rust
use aws_sdk_secretsmanager::Client as SecretsClient;
use tokio::sync::OnceCell;

static DB_PASSWORD: OnceCell<String> = OnceCell::const_new();

async fn get_db_password() -> &'static str {
    DB_PASSWORD.get_or_init(|| async {
        let config = aws_config::load_defaults(aws_config::BehaviorVersion::latest()).await;
        let client = SecretsClient::new(&config);

        client
            .get_secret_value()
            .secret_id("prod/my-function/db-password")
            .send()
            .await
            .expect("failed to fetch secret")
            .secret_string()
            .expect("secret has no string value")
            .to_string()
    }).await
}
```

The `OnceCell` ensures the secret is fetched once per cold start and reused across warm invocations. You pay one Secrets Manager API call per cold start, which is negligible.

### Dependency Auditing

```bash
# Install cargo-audit
cargo install cargo-audit --locked

# Audit your dependency tree against the RustSec advisory database
cargo audit

# Example output:
# Crate:         openssl
# Version:       0.10.55
# Advisory:      RUSTSEC-2023-0044
# Severity:      high (8.1)
# Fix:           Upgrade to >= 0.10.57

# Add to CI to fail builds on high-severity advisories
cargo audit --deny warnings
```

Run `cargo audit` in CI on every push. Most advisories have a fixed version available. Update the dependency with `cargo update -p <crate>` or by bumping the version in `Cargo.toml`.

### IAM Least Privilege

Each Lambda function gets its own IAM execution role with only the permissions it needs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:123456789:table/my-table"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

Do not use the `AdministratorAccess` managed policy on Lambda execution roles. It is a significant blast radius if the function is ever exploited or if a dependency has a supply-chain vulnerability.

## Frequently Asked Questions

**Do I need Rust experience to start?**

You need basic Rust familiarity: ownership, borrowing, `async/await`, and `Result<T, E>` error handling. If you can read the Rust book and understand the first 10 chapters, you can write Lambda functions. The `cargo-lambda` toolchain removes the infrastructure complexity. Start with a simple event transformation function before building anything with database access or concurrency.

**How do I handle database connection pooling?**

With standard Lambda, use a connection pooler like RDS Proxy to avoid exhausting your database's connection limit. Each execution environment holds one connection. With LMI, you can use `sqlx::Pool` or `deadpool` directly in your function, initializing the pool in `main()` and reusing it across concurrent requests on the same instance.

**Can I use my existing Python Lambda alongside a Rust one?**

Yes. Lambda functions are independently deployed and invoke each other via the Lambda API or SNS/SQS. There is no coordination required between runtimes. You can route traffic to each independently via API Gateway weighted routes or Lambda aliases.

**Is cargo-lambda production-safe?**

Yes. It reached 1.0 stable and is the officially recommended build tool in the AWS Rust Lambda documentation. Datadog, AWS, and multiple other companies use it in production CI pipelines. The deployment functionality wraps the AWS Lambda API directly and does not introduce any abstraction layer that could fail in unexpected ways.

**What is the best memory size for Rust Lambda functions?**

Start at 128 MB. Rust functions typically use 20-50 MB of actual memory. For I/O-bound functions (most API handlers, SQS processors), 128 MB is sufficient. For CPU-bound functions, increase memory to get more vCPUs: 1769 MB gives you one full vCPU, 3538 MB gives two, up to 10240 MB for six vCPUs. Use AWS Lambda Power Tuning to find the optimal memory configuration for CPU-bound functions.

**How do I debug a panic in production?**

A panic in a Rust Lambda function causes the binary to exit via `abort()` (with `panic = "abort"` in the release profile). Lambda sees this as a function error. The panic message appears in CloudWatch Logs. To get a stack trace in production, temporarily remove `panic = "abort"` from the release profile and redeploy. Add structured logging with `tracing` throughout your critical paths so you can reconstruct what happened without needing a stack trace.

**Does Rust Lambda support Lambda SnapStart?**

No. SnapStart is only available for the `java21` managed runtime. Rust does not need it. SnapStart solves JVM startup time (700ms+). Rust cold starts are 16ms without any caching mechanism.

**How do I share code between Lambda functions?**

Use a Cargo workspace. Put shared types, utilities, and database client wrappers in a `shared/` crate within the workspace. Each Lambda function depends on the shared crate via a path dependency. This gives you type safety across function boundaries and a single build cache.

## Conclusion

Rust on Lambda went from experimental to production-ready with two milestones: GA support in November 2025 with an SLA, and Lambda Managed Instances with Rust support in March 2026. The 16ms cold start is not just a benchmark number. It translates directly to user-facing latency improvements and infrastructure cost reductions that compound at scale.

The practical path for teams evaluating Rust on Lambda:

Start with Lambda Extensions. If you run a Datadog, Dynatrace, or custom telemetry extension alongside your functions, rewriting it in Rust reduces the cold start overhead it adds to every single one of your functions, regardless of what language they are in. This is the highest-ROI, lowest-risk entry point.

Then migrate CPU-bound functions. Anything that does meaningful computation, transformation, parsing, or encoding will see immediate speed and cost improvements.

Then evaluate LMI for steady-state workloads. If you have functions handling sustained traffic with a predictable baseline, LMI plus Compute Savings Plans produces the lowest possible Lambda cost.

Key resources for getting started:

- `aws-lambda-rust-runtime` on GitHub: the official runtime, `lambda_http`, `lambda_events`, and `lambda_extension` crates
- `cargo-lambda` docs at cargo-lambda.info: complete reference for build, watch, and deploy commands
- lambda-perf at maxday.github.io/lambda-perf: daily updated cold start benchmarks across all runtimes
- AWS Compute Blog: Rust-specific posts covering LMI patterns and production case studies
