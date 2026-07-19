export interface Library {
  name: string;
  desc: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface PythonProject {
  id: number;
  phase: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  xp: number;
  desc: string;
  concepts: string[];
  features: string[];
  milestones: string[];
  libraries: Library[];
  aiPrompt: string;
  fileStructure: string;
  architecture: string;
  quiz: {
    q1: QuizQuestion;
    q2: QuizQuestion;
  };
}

export const pythonProjects: PythonProject[] = [
  {
    "id": 1,
    "phase": "Phase 1 — Python Engineering",
    "title": "File Indexer",
    "level": "Beginner",
    "xp": 100,
    "desc": "Build a high-performance local File Indexer using Python's pathlib module. Create a custom indexer that parses files recursively, handles permission errors gracefully, and stores metadata (size, extension, modification time) in an optimized JSON storage for rapid search querying.",
    "concepts": [
      "pathlib.Path",
      "Generators & yield",
      "Exception Handling",
      "JSON Serialization"
    ],
    "features": [
      "Traverse files and subdirectories recursively using pathlib.rglob.",
      "Extract and parse metadata like file size, extension, and modification time.",
      "Store indices in memory and support serialization to/from local JSON database.",
      "Filter indexing based on file patterns, exclusions, and extension lists.",
      "Gracefully handle permission errors and missing paths without crashing the scanner."
    ],
    "milestones": [
      "Initialize workspace and implement directory scanner using pathlib.",
      "Create file metadata parser module with robust edge-case handling.",
      "Build memory indexing cache and write serialization logic to local storage.",
      "Implement search querying engine supporting keyword matching and filter parameters.",
      "Write pytest tests verifying path scanning robustness and query filters."
    ],
    "libraries": [
      {
        "name": "pathlib",
        "desc": "Object-oriented filesystem paths utility."
      },
      {
        "name": "fnmatch",
        "desc": "Unix filename pattern matching utility."
      }
    ],
    "aiPrompt": "Help me implement a robust local File Indexer in Python. Explain how to scan files recursively using pathlib while handling access errors without crashing, and how to build a search interface.",
    "fileStructure": "file_indexer/\n├── main.py\n├── core/\n│   ├── scanner.py\n│   └── storage.py\n└── tests/\n    └── test_indexer.py",
    "architecture": "Directory Input -> Recursive Path Scanner -> Metadata Extractor -> Cache Storage -> Search Query Filter",
    "quiz": {
      "q1": {
        "question": "Which pathlib method is best suited for recursive file searching using patterns?",
        "options": [
          "path.glob()",
          "path.rglob() (Correct)",
          "path.iterdir()"
        ],
        "correct": 1
      },
      "q2": {
        "question": "How should permission errors during traversal be handled?",
        "options": [
          "Let the program crash",
          "Catch PermissionError and log/skip (Correct)",
          "Restart the scan"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 2,
    "phase": "Phase 1 — Python Engineering",
    "title": "FastAPI Starter",
    "level": "Beginner",
    "xp": 100,
    "desc": "Build a production-ready REST API starter template using FastAPI. Learn to structure your endpoints, define robust request/response models using Pydantic, leverage dependency injection, and handle validation errors elegantly.",
    "concepts": [
      "RESTful API design",
      "Pydantic Validation",
      "Dependency Injection",
      "Structured Exceptions"
    ],
    "features": [
      "Define standard CRUD endpoints with proper HTTP status codes.",
      "Validate query parameters, path variables, and body inputs with Pydantic.",
      "Implement dependency injection for shared resources like config and database sessions.",
      "Create custom exception handlers mapping validation errors to clean JSON responses.",
      "Generate auto-documentation pages (Swagger UI / ReDoc)."
    ],
    "milestones": [
      "Initialize FastAPI application and configure the development uvicorn server.",
      "Design data models and request schemas using Pydantic.",
      "Build router endpoints with query parameters and path verification.",
      "Implement custom middleware and exception handling filters.",
      "Write endpoint integration tests using TestClient and pytest."
    ],
    "libraries": [
      {
        "name": "fastapi",
        "desc": "Modern, fast (high-performance) web framework."
      },
      {
        "name": "pydantic",
        "desc": "Data validation and settings management using python type annotations."
      }
    ],
    "aiPrompt": "Guide me through building a FastAPI starter. Show me how to structure endpoints, validate requests with Pydantic, use dependencies, and write integration tests.",
    "fileStructure": "fastapi_starter/\n├── app/\n│   ├── main.py\n│   ├── schemas.py\n│   ├── routes/\n│   │   └── items.py\n│   └── dependencies.py\n└── tests/\n    └── test_api.py",
    "architecture": "Client Request -> FastAPI Router -> Pydantic Validation -> Dependency Injection -> Endpoint Controller -> JSON Response",
    "quiz": {
      "q1": {
        "question": "How does FastAPI generate automatic Swagger documentation?",
        "options": [
          "By parsing Pydantic schemas and Python type hints (Correct)",
          "By manually reading source comments",
          "By connecting to an external docs registry"
        ],
        "correct": 0
      },
      "q2": {
        "question": "What is the primary benefit of FastAPI's Dependency Injection system?",
        "options": [
          "It compiles code to binary files",
          "It allows reusing database sessions, security checks, and logic parameters (Correct)",
          "It replaces the Python interpreter"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 3,
    "phase": "Phase 1 — Python Engineering",
    "title": "Authentication Service",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Design and build a secure authentication API service using JWT, Bcrypt, and OAuth2 standard patterns. Implement password salting/hashing, user register/login pathways, JWT token generation, verification, and expiration controls.",
    "concepts": [
      "JWT (JSON Web Tokens)",
      "Bcrypt Hashing",
      "OAuth2 Scopes",
      "Token Lifecycle"
    ],
    "features": [
      "Hash passwords securely using Bcrypt salting strategies.",
      "Create JWT authentication tokens containing claims and expiration timestamps.",
      "Implement route protection middleware verifying bearer tokens in HTTP headers.",
      "Support token validation, revocation, and basic blacklisting.",
      "Implement sign-up, login, and secure user profile routing."
    ],
    "milestones": [
      "Configure cryptographically secure password salting and hashing classes.",
      "Build login and registration routes with schema validations.",
      "Implement JWT signing, decoding, and custom verification middleware.",
      "Secure FastAPI endpoint logic using OAuth2PasswordBearer flows.",
      "Create pytest files validating auth scopes, token expiry, and incorrect passwords."
    ],
    "libraries": [
      {
        "name": "passlib",
        "desc": "Password hashing library supporting Bcrypt algorithms."
      },
      {
        "name": "pyjwt",
        "desc": "JSON Web Token implementation in Python."
      }
    ],
    "aiPrompt": "Help me implement a robust Auth Service. Explain password hashing with Bcrypt, JWT token creation/verification, and how to restrict FastAPI routes to logged-in users.",
    "fileStructure": "auth_service/\n├── app/\n│   ├── main.py\n│   ├── auth_utils.py\n│   ├── database.py\n│   └── routes/\n│       └── auth.py\n└── tests/\n    └── test_auth.py",
    "architecture": "Client Credentials -> Hashing Check -> Token Generator -> JWT -> Authorization Middleware -> Protected Route Access",
    "quiz": {
      "q1": {
        "question": "Why is it important to hash passwords with salt using Bcrypt?",
        "options": [
          "To speed up database lookup times",
          "To prevent rainbow table attacks by ensuring identical passwords have unique hashes (Correct)",
          "To compress the password length"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Where should the JWT token signature verification happen?",
        "options": [
          "Exclusively on the client side",
          "On the server side during middleware verification of the Bearer token (Correct)",
          "Inside the user's web browser cookies"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 4,
    "phase": "Phase 1 — Python Engineering",
    "title": "Async Web Crawler",
    "level": "Advanced",
    "xp": 300,
    "desc": "Develop a fast, concurrent web crawler using Python's asyncio and aiohttp. Implement asynchronous page fetching, parsing links with BeautifulSoup, domain-level rate limiting, depth-restricted scanning, and robust connection error recovery.",
    "concepts": [
      "asyncio Event Loop",
      "Non-blocking I/O",
      "HTML Parsing",
      "Rate Limiting"
    ],
    "features": [
      "Fetch web pages concurrently using non-blocking aiohttp ClientSessions.",
      "Parse and extract relative/absolute anchor URLs using BeautifulSoup.",
      "Enforce maximum traversal depth and handle redirect loops.",
      "Implement host-based rate limiting and concurrent request semaphore controls.",
      "Track visited URLs dynamically to prevent redundant indexing loops."
    ],
    "milestones": [
      "Initialize async framework and set up aiohttp connection clients.",
      "Implement async queue manager coordinating tasks and crawl queues.",
      "Create parsing utility to extract valid web links and document metadata.",
      "Apply semaphores to cap maximum concurrent HTTP connections.",
      "Write async test suites mocking network responses with aresponses."
    ],
    "libraries": [
      {
        "name": "aiohttp",
        "desc": "Asynchronous HTTP client/server framework."
      },
      {
        "name": "beautifulsoup4",
        "desc": "Screen-scraping library for extracting data from HTML."
      }
    ],
    "aiPrompt": "Explain how to build an async crawler using asyncio and aiohttp. Detail queue management, handling connection timeouts, and implementing rate limits per domain.",
    "fileStructure": "async_crawler/\n├── crawler.py\n├── queue_mgr.py\n├── parser.py\n└── tests/\n    └── test_crawler.py",
    "architecture": "Async Queue -> Semaphore Guard -> aiohttp Requester -> HTML Parser -> Link Deduplicator -> Queue Appender",
    "quiz": {
      "q1": {
        "question": "Which asyncio construct is best suited to limit concurrent network tasks?",
        "options": [
          "asyncio.Semaphore (Correct)",
          "asyncio.Event",
          "asyncio.Lock"
        ],
        "correct": 0
      },
      "q2": {
        "question": "Why is aiohttp preferred over requests for large scale scraping?",
        "options": [
          "It executes JavaScript natively",
          "It uses non-blocking HTTP requests, allowing one thread to handle thousands of concurrent queries (Correct)",
          "It automatically bypasses CAPTCHAs"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 5,
    "phase": "Phase 1 — Python Engineering",
    "title": "Mini Redis",
    "level": "Expert",
    "xp": 400,
    "desc": "Write a lightweight, concurrent TCP socket server that implements a subset of the Redis database. Design a custom byte parser for the Redis Serialization Protocol (RESP), support fundamental commands (GET, SET, DEL, EXPIRE), and manage multi-client concurrency using Python selectors.",
    "concepts": [
      "Socket Programming",
      "RESP Protocol Parsing",
      "Event-driven I/O selectors",
      "In-memory storage & TTL"
    ],
    "features": [
      "Create a raw TCP socket server handling multiple concurrent client channels.",
      "Parse incoming network bytes according to Redis RESP protocol formatting.",
      "Implement key-value commands: GET, SET, DEL, and EXPIRE with millisecond TTL.",
      "Support data types: Simple Strings, Bulk Strings, Integers, and Errors.",
      "Enforce passive/active memory eviction routines for expired database keys."
    ],
    "milestones": [
      "Implement network socket startup, listener setups, and basic read/write selectors.",
      "Build byte parser classes decoding bulk strings and arrays of RESP format.",
      "Develop in-memory database storage core mapping keys to values and TTL attributes.",
      "Write connection loop dispatcher parsing commands and routing responses.",
      "Create client-side test automation validating protocol compatibility."
    ],
    "libraries": [
      {
        "name": "socket",
        "desc": "Low-level networking interface."
      },
      {
        "name": "selectors",
        "desc": "High-level I/O multiplexing selector utilities."
      }
    ],
    "aiPrompt": "Help me build a Mini Redis socket server. Teach me how the RESP protocol parses arrays/bulk strings, how selectors handle client concurrency, and how expired keys are deleted.",
    "fileStructure": "mini_redis/\n├── server.py\n├── protocol.py\n├── storage.py\n└── tests/\n    └── test_server.py",
    "architecture": "Client Connection -> Selectors Event Loop -> Socket Read -> RESP Parser -> Storage Command Engine -> RESP Encoder -> Socket Write",
    "quiz": {
      "q1": {
        "question": "How is network data framed in the Redis Serialization Protocol (RESP)?",
        "options": [
          "Using XML schemas",
          "Using prefixes like '+' for strings, '$' for bulk data, and ending with '\\r\\n' (Correct)",
          "Using flat binary buffers without dividers"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What role does python's selectors module play in Mini Redis?",
        "options": [
          "It compresses memory schemas",
          "It multiplexes socket events, letting a single thread monitor multiple read/write buffers (Correct)",
          "It compiles python classes to machine code"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 6,
    "phase": "Phase 1 — Python Engineering",
    "title": "Dockerized Backend",
    "level": "Beginner",
    "xp": 100,
    "desc": "Containerize a python web application using Docker and Docker Compose. Learn multi-stage build optimizations, configuring isolated virtual networks, container environment variables, and binding volumes for live development reloading.",
    "concepts": [
      "Multi-stage Dockerfiles",
      "Docker Compose orchestration",
      "Volume Mounts",
      "Isolated Networks"
    ],
    "features": [
      "Write multi-stage Dockerfiles separating build dependencies from runtime environments.",
      "Configure docker-compose.yml to run backend services alongside databases.",
      "Manage sensitive environment variables securely using external .env configurations.",
      "Implement local bind-mounting to enable immediate hot-reloading during editing.",
      "Configure container healthchecks to monitor application statuses."
    ],
    "milestones": [
      "Write optimized, multi-stage Dockerfile using Alpine or slim Python baselines.",
      "Design docker-compose templates linking web containers with database instances.",
      "Configure local environment bindings and external host volumes.",
      "Build networking profiles separating internal services from public ports.",
      "Test build speeds, image sizes, and container initialization parameters."
    ],
    "libraries": [
      {
        "name": "dockerfile",
        "desc": "Standard specification for compiling containers."
      },
      {
        "name": "docker-compose",
        "desc": "Multi-container orchestration engine."
      }
    ],
    "aiPrompt": "Guide me through containerizing my application. Show me a multi-stage Dockerfile, docker-compose configuration with DB dependency, volumes, and healthchecks.",
    "fileStructure": "dockerized_backend/\n├── app/\n│   └── main.py\n├── Dockerfile\n├── docker-compose.yml\n├── .env.example\n└── requirements.txt",
    "architecture": "Host Docker Engine -> Docker Compose -> Virtual Network -> Configured Containers -> Volume Mount & Port Bind",
    "quiz": {
      "q1": {
        "question": "What is a major advantage of using multi-stage Docker builds?",
        "options": [
          "It reduces final image sizes by leaving compilation tools out of the execution layer (Correct)",
          "It speeds up execution speeds by 500%",
          "It eliminates the need for requirements.txt"
        ],
        "correct": 0
      },
      "q2": {
        "question": "What does a docker bind mount do during development?",
        "options": [
          "It compiles application code into static libraries",
          "It links a host directory to a container path, enabling local code changes to reflect immediately (Correct)",
          "It establishes an encrypted network tunnel"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 7,
    "phase": "Phase 2 — Data Engineering",
    "title": "CSV Analytics Engine",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Build an analytical parsing engine that processes multi-gigabyte CSV files using Pandas chunking. Handle missing values, parse dates dynamically, execute complex aggregations, filter metrics, and export summarized reports to parquet formats.",
    "concepts": [
      "Pandas Chunking",
      "Memory Optimization",
      "Data Aggregations",
      "Parquet Storage Format"
    ],
    "features": [
      "Process large CSV files in chunks to maintain low memory footprints.",
      "Handle missing values using median filling or context-driven dropping.",
      "Perform grouping, pivot tables, and rolling aggregations on selected columns.",
      "Detect and log schema anomalies or parsing failures.",
      "Write data partitions to optimized, columnar Parquet files."
    ],
    "milestones": [
      "Implement CSV parser core with dynamic chunk size configurations.",
      "Build data cleaning pipeline converting schemas, handling NaN metrics, and parsing dates.",
      "Create analytical aggregator mapping statistical functions onto groups.",
      "Configure Parquet writer partitions mapping keys to output directories.",
      "Validate processing speeds and peak memory limits using memory-profiler."
    ],
    "libraries": [
      {
        "name": "pandas",
        "desc": "High-performance data manipulation and analysis tool."
      },
      {
        "name": "pyarrow",
        "desc": "Python bindings for Apache Arrow, enabling parquet export."
      }
    ],
    "aiPrompt": "Help me write a CSV Analytics Engine using Pandas. Teach me to load data in chunks, clean missing values, aggregate groups, and output parquet datasets.",
    "fileStructure": "csv_analytics/\n├── engine.py\n├── aggregations.py\n├── config.py\n└── tests/\n    └── test_analytics.py",
    "architecture": "CSV Input -> Pandas Chunk Reader -> Cleaning Middleware -> Aggregation Processor -> Parquet Export",
    "quiz": {
      "q1": {
        "question": "Why should we use chunksize when loading huge CSV files in pandas?",
        "options": [
          "To translate the data to SQL queries",
          "To read file subsets iteratively, keeping memory consumption low and constant (Correct)",
          "To automatically compress files"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What is the benefit of storing structured datasets in Parquet over CSV?",
        "options": [
          "Parquet is human-readable in plain text editors",
          "Parquet uses columnar storage and compression, providing faster queries and smaller sizes (Correct)",
          "Parquet supports CSS formatting"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 8,
    "phase": "Phase 2 — Data Engineering",
    "title": "Airflow Pipeline",
    "level": "Advanced",
    "xp": 300,
    "desc": "Design and build a robust ETL workflow orchestrated by Apache Airflow. Create Directed Acyclic Graphs (DAGs) implementing task dependencies, custom PythonOperators, database connections, task retries, and slack error notifications.",
    "concepts": [
      "Airflow DAGs",
      "PythonOperators",
      "Task Dependencies",
      "XCom Data Passing"
    ],
    "features": [
      "Define modular data pipelines with strict Directed Acyclic Graph (DAG) structures.",
      "Execute tasks dynamically using Custom Airflow Operators and hooks.",
      "Pass lightweight metadata parameters between tasks using XCom variables.",
      "Implement robust failure behaviors with auto-retries, backoffs, and callback alerts.",
      "Integrate database hook bindings to interface with storage layers."
    ],
    "milestones": [
      "Set up local Airflow environments using docker containers or pip installations.",
      "Create DAG profiles specifying execution intervals and configuration defaults.",
      "Write pipeline tasks executing data extraction, translation, and loader operations.",
      "Implement hook bindings loading processed indicators to postgres targets.",
      "Verify task orchestration, dependency flows, and log collection in UI panels."
    ],
    "libraries": [
      {
        "name": "apache-airflow",
        "desc": "Programmatically author, schedule and monitor workflows."
      },
      {
        "name": "psycopg2-binary",
        "desc": "PostgreSQL database adapter for Python."
      }
    ],
    "aiPrompt": "Guide me through building an Apache Airflow ETL pipeline. Explain DAG syntax, PythonOperators, XCom mechanics, custom hooks, and handling task failures.",
    "fileStructure": "airflow_pipeline/\n├── dags/\n│   ├── etl_dag.py\n│   └── tasks/\n│       ├── extract.py\n│       ├── transform.py\n│       └── load.py\n└── config/airflow.cfg",
    "architecture": "Scheduler -> DAG Trigger -> Extract Task -> Transform Task (via XCom) -> Load Task -> Target Database",
    "quiz": {
      "q1": {
        "question": "What is a DAG in the context of Apache Airflow?",
        "options": [
          "A compilation tool for database indexes",
          "A Directed Acyclic Graph outlining task execution order without cycles (Correct)",
          "A format for structuring tabular variables"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What is the primary mechanism for sharing small metadata variables between Airflow tasks?",
        "options": [
          "XComs (Cross-Communications) (Correct)",
          "Global module variables",
          "Writing temporary text logs"
        ],
        "correct": 0
      }
    }
  },
  {
    "id": 9,
    "phase": "Phase 2 — Data Engineering",
    "title": "Kafka Streaming Pipeline",
    "level": "Expert",
    "xp": 400,
    "desc": "Build a real-time data streaming pipeline using Apache Kafka. Write robust Python producers publishing transaction logs, configure consumer groups distributing message reads, process events on-the-fly, and handle partition balances and offset commits.",
    "concepts": [
      "Pub/Sub Architecture",
      "Kafka Producer/Consumer",
      "Consumer Groups",
      "Message Offsets"
    ],
    "features": [
      "Establish high-throughput network connections to Kafka brokers.",
      "Write multi-threaded producers writing serialized JSON events into topics.",
      "Create consumer groups distributing message consumption across partitions.",
      "Implement manual offset commits to guarantee exactly-once/at-least-once deliveries.",
      "Process event streams on-the-fly (filtering, aggregating metrics, and routing)."
    ],
    "milestones": [
      "Configure local Kafka instances with Zookeeper via docker setups.",
      "Write event generator producer classes streaming simulated metrics.",
      "Build consumer applications reading data batches and updating terminal dashboards.",
      "Handle partition rebalancing callbacks and commit offsets manually.",
      "Stress test message throughput limits, backpressures, and fault recoveries."
    ],
    "libraries": [
      {
        "name": "confluent-kafka",
        "desc": "Ultralight, high-performance client library based on librdkafka."
      },
      {
        "name": "json",
        "desc": "Standard encoder/decoder for streaming packets."
      }
    ],
    "aiPrompt": "Explain how to build a Kafka streaming pipeline in Python. Detail Producer configurations, Consumer Group structures, managing partitions, and manual offset commits.",
    "fileStructure": "kafka_streaming/\n├── producer.py\n├── consumer.py\n├── config.py\n└── tests/\n    └── test_streaming.py",
    "architecture": "Data Generator -> Confluent Producer -> Kafka Topic Partitions -> Consumer Groups -> Stream Processor -> DB Loader",
    "quiz": {
      "q1": {
        "question": "How do consumer groups scale consumption in Apache Kafka?",
        "options": [
          "By letting multiple consumer processes read from different topic partitions concurrently (Correct)",
          "By copying topic data into host memory",
          "By compiling Python variables to bytes"
        ],
        "correct": 0
      },
      "q2": {
        "question": "Why is committing offsets manually in consumers crucial for ML pipelines?",
        "options": [
          "It decreases message delivery speed",
          "It gives control over when messages are marked processed, preventing data loss during processing errors (Correct)",
          "It translates data packets to JSON schemas"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 10,
    "phase": "Phase 3 — Machine Learning",
    "title": "Titanic Survival Prediction",
    "level": "Beginner",
    "xp": 100,
    "desc": "Build a machine learning classification model predicting passenger survival on the Titanic. Learn feature engineering (handling missing data, encoding categories, scaling values), training Scikit-Learn models, and evaluation metric parsing.",
    "concepts": [
      "Classification Basics",
      "Feature Engineering",
      "Hyperparameter Tuning",
      "Confusion Matrices"
    ],
    "features": [
      "Analyze dataset distributions using Pandas and Seaborn visuals.",
      "Impute missing age/fare variables using context-driven techniques.",
      "Encode categorical fields (sex, cabin locations) using one-hot/label methods.",
      "Train classification estimators (Logistic Regression, Random Forests, XGBoost).",
      "Evaluate models using accuracy, precision, recall, and ROC-AUC metrics."
    ],
    "milestones": [
      "Load Titanic data and run comprehensive exploratory analysis (EDA).",
      "Design preprocessing pipelines using Scikit-Learn ColumnTransformers.",
      "Train baseline classifiers and tune parameters via GridSearchCV.",
      "Analyze model confusion matrices and feature importance rankings.",
      "Write prediction validation scripts and export trained models as pickles."
    ],
    "libraries": [
      {
        "name": "scikit-learn",
        "desc": "Machine learning libraries for classification, regression, and clustering."
      },
      {
        "name": "seaborn",
        "desc": "Statistical data visualization library based on matplotlib."
      }
    ],
    "aiPrompt": "Guide me through Titanic survival prediction using scikit-learn. Show EDA, preprocessing with ColumnTransformer, tuning a RandomForestClassifier, and explaining metrics.",
    "fileStructure": "titanic_ml/\n├── eda.ipynb\n├── train.py\n├── pipeline.py\n└── models/\n    └── classifier.pkl",
    "architecture": "Raw CSV Data -> Pandas Loader -> Clean & Transform -> Model Trainer -> Grid Search -> Evaluation Report",
    "quiz": {
      "q1": {
        "question": "What is the purpose of One-Hot Encoding in feature engineering?",
        "options": [
          "To normalize numerical scale ranges",
          "To convert categorical text variables into binary column vectors for model ingestion (Correct)",
          "To clean NaN metrics"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Which metric evaluates classification models when fraud/survival targets are moderately unbalanced?",
        "options": [
          "Accuracy",
          "Precision-Recall and Area Under ROC Curve (ROC-AUC) (Correct)",
          "Mean Squared Error (MSE)"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 11,
    "phase": "Phase 3 — Machine Learning",
    "title": "House Price Prediction",
    "level": "Beginner",
    "xp": 100,
    "desc": "Build a regression model to estimate house values using structured datasets. Implement target transformations, regularized linear algorithms (Ridge, Lasso), ensemble methods, feature selections, and validate errors using mean absolute error (MAE).",
    "concepts": [
      "Regression Analysis",
      "L1/L2 Regularization",
      "Target Transformation",
      "Evaluation Metrics"
    ],
    "features": [
      "Preprocess continuous and categorical columns containing skewness.",
      "Perform log transformations on heavily skewed target variables.",
      "Compare Lasso (L1) and Ridge (L2) coefficients to drop uninformative features.",
      "Train gradient boosted estimators (LightGBM, Random Forests).",
      "Evaluate pricing projections using MAE, RMSE, and R-squared scales."
    ],
    "milestones": [
      "Load datasets, clean Null cells, and run descriptive correlation mapping.",
      "Scale features using StandardScaler and map targets using Log1p formulas.",
      "Train Ridge/Lasso models and plot coefficient shrinkage patterns.",
      "Build ensemble regressors using Stacking or Voting techniques.",
      "Write prediction pipelines testing outputs against validation slices."
    ],
    "libraries": [
      {
        "name": "scikit-learn",
        "desc": "Regularized models, pipelines, and evaluation metrics."
      },
      {
        "name": "lightgbm",
        "desc": "Fast, distributed, high-performance gradient boosting framework."
      }
    ],
    "aiPrompt": "Explain how to build a house price predictor. Detail regression preprocessing, scaling inputs, regularizing coefficients, using LightGBM, and evaluating with RMSE.",
    "fileStructure": "house_pricing/\n├── data_loader.py\n├── preprocess.py\n├── train_regressor.py\n└── tests/\n    └── test_regressor.py",
    "architecture": "Tabular Data -> Scale & Transform -> Ridge/Lasso Feature Drop -> LightGBM Regressor -> Exponential Inverse Target -> MAE Output",
    "quiz": {
      "q1": {
        "question": "What is the primary difference between L1 (Lasso) and L2 (Ridge) regularization?",
        "options": [
          "L1 regularizes target values, L2 regularizes features",
          "L1 shrinks coefficients to exactly zero (feature selection), L2 shrinks them near zero (Correct)",
          "L2 only works on classification models"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Why is log transformation applied to home prices in regression tasks?",
        "options": [
          "To speed up training loops",
          "To stabilize variance and make target distributions normal, reducing large-outlier influence (Correct)",
          "To convert numbers to strings"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 12,
    "phase": "Phase 3 — Machine Learning",
    "title": "Credit Card Fraud Detection",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Tackle heavily imbalanced dataset challenges by designing a credit card fraud detection system. Master handling skewed classes using SMOTE, adjusting classification decision thresholds, analyzing F1-scores, and tuning Isolation Forests for anomaly detection.",
    "concepts": [
      "Imbalanced Class Handling",
      "SMOTE Resampling",
      "Threshold Calibration",
      "Anomaly Detection"
    ],
    "features": [
      "Analyze PCA-transformed transaction matrices showing imbalanced classes (e.g. 0.17% fraud).",
      "Synthesize minority class metrics using SMOTE or adjust model class weight factors.",
      "Plot Precision-Recall curves and locate operational decision thresholds.",
      "Build anomaly detectors using Isolation Forests and Local Outlier Factors.",
      "Compare model metrics using F1-score, Average Precision, and ROC-AUC."
    ],
    "milestones": [
      "Load transaction records and establish stratified train/test partitions.",
      "Implement class balancing logic (SMOTE, undersampling, weight scaling).",
      "Train Random Forest and XGBoost estimators targeting fraud classes.",
      "Run classification threshold sweeps mapping values to cost-benefit tables.",
      "Validate detections using out-of-time datasets to model real-world decay."
    ],
    "libraries": [
      {
        "name": "imbalanced-learn",
        "desc": "Package offering various resampling techniques (like SMOTE) for imbalanced data."
      },
      {
        "name": "xgboost",
        "desc": "Optimized distributed gradient boosting library."
      }
    ],
    "aiPrompt": "Guide me through fraud detection with imbalanced data. Show how to use SMOTE, tune classification thresholds, and use Precision-Recall curves instead of Accuracy.",
    "fileStructure": "fraud_detector/\n├── balance_data.py\n├── train_classifier.py\n├── evaluate_thresholds.py\n└── config.json",
    "architecture": "Skewed Transactions -> Stratified Split -> SMOTE Balancer -> XGBoost Trainer -> Precision-Recall Analyzer -> Operational Threshold Config",
    "quiz": {
      "q1": {
        "question": "Why is accuracy a misleading metric for credit card fraud detection?",
        "options": [
          "It is slow to calculate",
          "If 99.9% of transactions are legitimate, a model predicting 'no fraud' achieves 99.9% accuracy but catches 0% fraud (Correct)",
          "It only works on linear algorithms"
        ],
        "correct": 1
      },
      "q2": {
        "question": "How does SMOTE (Synthetic Minority Over-sampling Technique) function?",
        "options": [
          "It duplicates minority class rows",
          "It interpolates synthetically between existing minority classes and their nearest neighbors (Correct)",
          "It runs gradient descent"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 13,
    "phase": "Phase 3 — Machine Learning",
    "title": "Movie Recommendation System",
    "level": "Advanced",
    "xp": 300,
    "desc": "Build a movie recommendation system combining multiple techniques. Implement Collaborative Filtering, Content-Based Filtering with TF-IDF vectorizers, and Collaborative Matrix Factorization using Singular Value Decomposition (SVD).",
    "concepts": [
      "Collaborative Filtering",
      "Cosine Similarity",
      "Matrix Factorization (SVD)",
      "TF-IDF Vectorization"
    ],
    "features": [
      "Analyze user ratings and movie metadata to build sparse interaction matrices.",
      "Build Content-Based models processing movie descriptions using TF-IDF and Cosine Similarity.",
      "Implement Collaborative SVD matrix factorization predicting missing user ratings.",
      "Develop hybrid recommendations combining content-based features and SVD scores.",
      "Evaluate precision-at-K metrics on recommendation listings."
    ],
    "milestones": [
      "Load MovieLens datasets and clean movie genre/description strings.",
      "Implement user-item sparse matrix structures mapping indexes.",
      "Build TF-IDF search filters calculating similarities on textual attributes.",
      "Train SVD estimators tuning user/item bias terms.",
      "Write recommendation routers returning top-K film suggestions for users."
    ],
    "libraries": [
      {
        "name": "scipy",
        "desc": "Scientific computing library containing sparse matrix modules."
      },
      {
        "name": "scikit-surprise",
        "desc": "Python scikit library for building and analyzing recommender systems."
      }
    ],
    "aiPrompt": "Teach me to build a Movie Recommender. Explain collaborative filtering, SVD matrix factorization, TF-IDF content filters, and calculating precision-at-K.",
    "fileStructure": "movie_recommender/\n├── loader.py\n├── content_filter.py\n├── collaborative_svd.py\n└── tests/\n    └── test_recs.py",
    "architecture": "User Ratings -> Sparse Matrix -> SVD Factorization / TF-IDF Features -> Hybrid Ranker -> Top-K Predictions",
    "quiz": {
      "q1": {
        "question": "What does Matrix Factorization do in collaborative filtering systems?",
        "options": [
          "It normalizes continuous variables",
          "It decomposes user-item interactions into lower-dimensional latent factor matrices representing preferences (Correct)",
          "It clusters files recursively"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What is the primary drawback of purely Collaborative Filtering models?",
        "options": [
          "The 'Cold Start' problem: they cannot recommend items with zero user ratings (Correct)",
          "They require deep neural networks",
          "They cannot use string variables"
        ],
        "correct": 0
      }
    }
  },
  {
    "id": 14,
    "phase": "Phase 3 — Machine Learning",
    "title": "Time Series Forecasting",
    "level": "Expert",
    "xp": 400,
    "desc": "Build a forecasting engine predicting future trends in sequential data. Implement rolling average features, check stationarity using ADF tests, build classical ARIMA models, and design a Prophet forecasting pipeline with seasonality.",
    "concepts": [
      "Stationarity & ADF Test",
      "ARIMA/SARIMAX",
      "Prophet forecasting",
      "Backtesting & Walk-forward validation"
    ],
    "features": [
      "Decompose time-series data into Trend, Seasonality, and Residual outputs.",
      "Run Augmented Dickey-Fuller (ADF) checks and apply differencing to achieve stationarity.",
      "Configure ARIMA/SARIMAX auto-regressive integrations tuning parameters.",
      "Train Prophet models incorporating holidays, custom season variables, and growth limits.",
      "Run walk-forward validation calculating MASE and MAPE forecast errors."
    ],
    "milestones": [
      "Load sales or energy load parameters indexing timestamps appropriately.",
      "Perform seasonal decomposition and document statistical stationarity tests.",
      "Implement baseline ARIMA/SARIMAX predictions analyzing ACF/PACF graphs.",
      "Train Prophet models predicting horizons with confidence interval envelopes.",
      "Write time-series cross-validation splits validating models without lookahead bias."
    ],
    "libraries": [
      {
        "name": "statsmodels",
        "desc": "Statistical computations, models (ARIMA), and test metrics."
      },
      {
        "name": "prophet",
        "desc": "Forecasting tool for time series data based on additive models."
      }
    ],
    "aiPrompt": "Guide me through Time Series Forecasting. Show how to make data stationary, analyze ACF/PACF plots, train SARIMAX and Prophet, and run cross-validation.",
    "fileStructure": "time_series/\n├── load_data.py\n├── stats_models.py\n├── prophet_pipeline.py\n└── tests/\n    └── test_forecaster.py",
    "architecture": "Raw Series -> ADF Test & Diff -> Decompose (Trend/Season) -> Prophet Model -> Walk-forward Backtest -> MAPE Score",
    "quiz": {
      "q1": {
        "question": "Why is 'stationarity' required for classical time series forecasting models?",
        "options": [
          "It speeds up computation times",
          "It ensures the series properties (mean, variance) remain constant over time, making statistical assumptions valid (Correct)",
          "It removes negative values"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What is the correct way to validate a time series forecasting model?",
        "options": [
          "Standard random K-Fold cross validation",
          "Walk-forward / time-series split validation to prevent future leakage (Correct)",
          "Evaluating only training errors"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 15,
    "phase": "Phase 4 — Deep Learning",
    "title": "MNIST Digit Recognition",
    "level": "Beginner",
    "xp": 100,
    "desc": "Build a feedforward and convolutional neural network from scratch using PyTorch to recognize handwritten digits. Write Custom PyTorch Datasets, define backpropagation pathways, structure training loops, and visualize feature filters.",
    "concepts": [
      "Neural Net Architecture",
      "Backpropagation & Gradients",
      "Cross-Entropy Loss",
      "PyTorch DataLoader"
    ],
    "features": [
      "Write multi-layer perceptron (MLP) architectures and simple CNNs in PyTorch.",
      "Implement custom forward pass functions using ReLU and Softmax layers.",
      "Write training loops managing batches, gradients, optimizers, and loss steps.",
      "Monitor validation parameters during training to prevent overfitting.",
      "Plot confusion matrices showing digit recognition mistakes."
    ],
    "milestones": [
      "Load MNIST datasets configuring torch transformation vectors.",
      "Build custom MLP model classes extending torch.nn.Module.",
      "Write training loops running backpropagation and Adam parameter updates.",
      "Refactor network to include Convolutional, MaxPool, and Dropout layers.",
      "Run evaluation checks saving model weights to .pth files."
    ],
    "libraries": [
      {
        "name": "torch",
        "desc": "Tensors and Dynamic neural networks in Python."
      },
      {
        "name": "torchvision",
        "desc": "Datasets, transforms and models for computer vision."
      }
    ],
    "aiPrompt": "Help me build an MNIST digit classifier in PyTorch. Show PyTorch Module setups, training loop logic, backpropagation, and transitioning from MLP to CNN.",
    "fileStructure": "mnist_dl/\n├── model.py\n├── train.py\n├── dataset.py\n└── tests/\n    └── test_model.py",
    "architecture": "Digit Image -> Conv2D -> ReLU -> MaxPool2D -> Linear -> Softmax -> Cross-Entropy -> SGD Backpropagation",
    "quiz": {
      "q1": {
        "question": "What does calling 'optimizer.zero_grad()' do inside a PyTorch training loop?",
        "options": [
          "It sets all weights to zero",
          "It clears historical gradient metrics from previous steps to avoid accumulation (Correct)",
          "It resets the model loss"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Which loss function is appropriate for training multi-class image classification networks?",
        "options": [
          "Mean Squared Error (MSE)",
          "Cross-Entropy Loss (Correct)",
          "Huber Loss"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 16,
    "phase": "Phase 4 — Deep Learning",
    "title": "Neural Style Transfer",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Implement Leon Gatys' classic Neural Style Transfer algorithm using a pretrained VGG19 network. Extract style features using Gram matrices, compute content/style loss components, and optimize pixels directly to blend target structures.",
    "concepts": [
      "VGG19 Feature Extraction",
      "Gram Matrix Representing Style",
      "Content vs. Style Losses",
      "Image Optimization Hooks"
    ],
    "features": [
      "Load pretrained VGG19 networks disabling parameter updates (frozen weights).",
      "Extract intermediate network activations representing content and style templates.",
      "Compute Style representations using cross-channel Gram Matrices.",
      "Implement loss components balancing content fidelity and style textures.",
      "Optimize input images iteratively using L-BFGS or Adam gradients."
    ],
    "milestones": [
      "Load content and style inputs preprocessing sizes to match VGG specifications.",
      "Register feature extractor hooks targeting VGG layer activations.",
      "Build Gram Matrix calculation modules using tensor dot products.",
      "Write training functions updating pixel weights directly rather than model weights.",
      "Plot optimization iterations showing target content blending style patterns."
    ],
    "libraries": [
      {
        "name": "torch",
        "desc": "Gradient computation and optimization hooks."
      },
      {
        "name": "torchvision.models",
        "desc": "Pre-trained vision models including VGG19."
      }
    ],
    "aiPrompt": "Explain VGG19 Neural Style Transfer. Show me how style is calculated using Gram matrices, what content loss represents, and how to write the pixel-update loop.",
    "fileStructure": "style_transfer/\n├── transfer.py\n├── loss.py\n├── config.py\n└── outputs/\n    └── stylized.png",
    "architecture": "Content Image + Style Image -> Pretrained VGG19 -> Content/Style Activation Extraction -> Gram Matrices -> Total Loss -> Pixel Gradient Optimizer -> Output Style Image",
    "quiz": {
      "q1": {
        "question": "How is 'style' captured mathematically in Gatys' Neural Style Transfer?",
        "options": [
          "By measuring the coordinates of lines",
          "By calculating the correlation of feature maps across channels using Gram Matrices (Correct)",
          "By evaluating pixel brightness values"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What is optimized during the training loop of Neural Style Transfer?",
        "options": [
          "The weights of the VGG19 model",
          "The pixels of the generated output image directly (Correct)",
          "The learning rate schedules"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 17,
    "phase": "Phase 4 — Deep Learning",
    "title": "Image Caption Generator",
    "level": "Advanced",
    "xp": 300,
    "desc": "Build a multimodal image caption generator combining computer vision and NLP. Build a CNN encoder (using pretrained ResNet) to extract image feature vectors, feed them into an LSTM/RNN decoder, apply word tokenizations, and train the model using teacher forcing.",
    "concepts": [
      "Multimodal CNN Encoder",
      "LSTM/RNN Sequence Decoders",
      "Vocabulary Tokenization",
      "Teacher Forcing"
    ],
    "features": [
      "Extract semantic image descriptors using pre-trained ResNet CNN headers.",
      "Project vision vectors into decoder dimensions using projection layers.",
      "Build vocabulary mappings translating caption strings into token lists.",
      "Design LSTM decoders generating word sequences autoregressively.",
      "Train model using teacher forcing inputs optimizing cross-entropy indices."
    ],
    "milestones": [
      "Build custom datasets loading images and tokenized caption sequences.",
      "Configure CNN Encoder using frozen ResNet50 models outputting embeddings.",
      "Implement LSTM Decoder incorporating Embedding and Projection layers.",
      "Write training loops passing vision states and running token predictions.",
      "Write inference functions generating descriptions from unseen photos using greedy search."
    ],
    "libraries": [
      {
        "name": "torch",
        "desc": "Deep learning primitives, CNNs and RNNs."
      },
      {
        "name": "nltk",
        "desc": "Natural Language Toolkit for caption tokenization."
      }
    ],
    "aiPrompt": "Explain how to build an Image Caption Generator combining ResNet and LSTM. Detail vocab mapping, CNN-LSTM interfacing, and decoder sequences.",
    "fileStructure": "caption_generator/\n├── dataset.py\n├── encoder.py\n├── decoder.py\n├── train.py\n└── predict.py",
    "architecture": "Raw Image -> ResNet50 -> Feature Vector -> Projection Layer -> LSTM Decoder Input -> Word Tokens Generator",
    "quiz": {
      "q1": {
        "question": "What role does the CNN play in an Image Caption Generator?",
        "options": [
          "It parses the caption syntax",
          "It acts as an encoder, extracting high-level visual feature vectors from the image (Correct)",
          "It speeds up file IO operations"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Why is 'Teacher Forcing' used when training the RNN sequence decoder?",
        "options": [
          "It forces the model to run on GPUs",
          "It inputs true previous words instead of model predictions, accelerating decoder convergence (Correct)",
          "It limits vocabulary sizes"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 18,
    "phase": "Phase 5 — Computer Vision",
    "title": "OCR System",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Build an Optical Character Recognition (OCR) system using Tesseract and OpenCV. Implement image preprocessing (thresholding, noise removal, dilation), detect bounding boxes around textual regions, and convert pixel details to clean strings.",
    "concepts": [
      "OCR Engine Integration",
      "OpenCV Preprocessing",
      "Image Thresholding",
      "Bounding Box Delineation"
    ],
    "features": [
      "Preprocess source documents using grayscale filters and adaptive thresholding.",
      "Apply dilation and erosion morphology steps to isolate characters.",
      "Detect structured text boundaries and extract layout region boxes.",
      "Configure Tesseract engine flags to read numbers, characters, or specific languages.",
      "Extract textual streams from images and write parser results to documents."
    ],
    "milestones": [
      "Set up OpenCV scripts loading image parameters and converting pixel formats.",
      "Build binarization filters using Otsu's adaptive thresholding.",
      "Implement bounding box contour scanners mapping target coordinates.",
      "Integrate pytesseract binding wrappers translating regions into text blocks.",
      "Test OCR accuracy rates on scanned receipts, invoices, and handwritings."
    ],
    "libraries": [
      {
        "name": "opencv-python",
        "desc": "Computer vision and image processing operations."
      },
      {
        "name": "pytesseract",
        "desc": "Python wrapper for Google's Tesseract-OCR Engine."
      }
    ],
    "aiPrompt": "Explain how to build an OCR system. Detail OpenCV preprocessing pipelines (adaptive thresholding, binarization) and running PyTesseract to extract bounding boxes.",
    "fileStructure": "ocr_system/\n├── preprocess.py\n├── ocr_engine.py\n├── extract.py\n└── tests/\n    └── test_ocr.py",
    "architecture": "Source Image -> Grayscale -> Adaptive Threshold -> Contour Detection -> Region Cropping -> Tesseract Engine -> String Output",
    "quiz": {
      "q1": {
        "question": "Why is binarization (converting to strict black/white) critical before running OCR engines?",
        "options": [
          "To colorize text labels",
          "To separate text characters cleanly from background patterns, reducing recognition errors (Correct)",
          "To compress image memory requirements"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What does Otsu's thresholding method do?",
        "options": [
          "It automatically calculates the optimal threshold value from image histogram variances (Correct)",
          "It resizes images using interpolations",
          "It maps pixels to vectors"
        ],
        "correct": 0
      }
    }
  },
  {
    "id": 19,
    "phase": "Phase 5 — Computer Vision",
    "title": "Image Segmentation",
    "level": "Advanced",
    "xp": 300,
    "desc": "Implement pixel-level classification by building an Image Segmentation pipeline in PyTorch. Design a convolutional autoencoder / U-Net structure, calculate Dice/IoU loss functions, preprocess image mask boundaries, and segment objects in real-time.",
    "concepts": [
      "Semantic Segmentation",
      "U-Net Autoencoder",
      "Intersection over Union (IoU)",
      "Transposed Convolutions"
    ],
    "features": [
      "Process input images and training labels (pixel classification masks).",
      "Build encoder paths compressing resolution while capturing contextual feature states.",
      "Implement decoder paths upsampling dimensions using Transposed Convolutions.",
      "Construct skip connections linking encoder activations directly to decoders.",
      "Compute model loss metrics using Dice Coefficient and Binary Cross-Entropy."
    ],
    "milestones": [
      "Build custom PyTorch dataset modules handling image and segmentation mask scaling.",
      "Code the U-Net architecture detailing contracting, expanding, and skip components.",
      "Write training pipelines optimizing Dice and IoU metrics.",
      "Plot prediction segments overlaying target masks onto original photos.",
      "Test segmentation boundaries on medical datasets or road visual streams."
    ],
    "libraries": [
      {
        "name": "torch",
        "desc": "PyTorch deep learning framework for convolutional networks."
      },
      {
        "name": "albumentations",
        "desc": "Fast and flexible image augmentation library for vision models."
      }
    ],
    "aiPrompt": "Explain U-Net image segmentation. Detail Encoder/Decoder modules, skip connection utilities, Transposed Convolutions, and Dice Loss implementations.",
    "fileStructure": "segmentation/\n├── dataset.py\n├── unet_model.py\n├── train.py\n└── evaluate.py",
    "architecture": "Image Pixel -> Encoder Blocks -> Latent Vector -> Transposed Conv Upsample (with Skip Concat) -> Sigmoid Map -> Dice Loss Evaluation",
    "quiz": {
      "q1": {
        "question": "What is the primary function of skip connections in U-Net models?",
        "options": [
          "To bypass training steps",
          "To transfer high-resolution spatial details directly from encoder layers to decoder layers (Correct)",
          "To scale learning rates"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Which evaluation metric measures the pixel overlap area between predicted and true masks?",
        "options": [
          "Mean Squared Error (MSE)",
          "Intersection over Union (IoU) / Jaccard Index (Correct)",
          "Perplexity"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 20,
    "phase": "Phase 6 — NLP",
    "title": "Sentiment Analysis",
    "level": "Beginner",
    "xp": 100,
    "desc": "Build a sentiment classification model predicting text polarity (positive vs. negative). Learn natural language processing fundamentals (stopword removal, tokenization, lemmatization), represent text using TF-IDF and word embeddings, and train classification estimators.",
    "concepts": [
      "Text Preprocessing",
      "Tokenization & Lemmatization",
      "TF-IDF Representation",
      "Word Embeddings"
    ],
    "features": [
      "Clean textual datasets by filtering tags, symbols, and common stop words.",
      "Tokenize paragraphs and reduce words to dictionary forms using NLTK/SpaCy.",
      "Build TF-IDF feature matrices mapping word statistics across corpuses.",
      "Train classifiers (Naive Bayes, Logistic Regression, Linear SVMs) to categorize sentiment.",
      "Test classifications on real product reviews or custom text strings."
    ],
    "milestones": [
      "Load text databases and perform Exploratory Text Analysis (character distribution, word clouds).",
      "Implement cleaning functions executing lemmatization routines.",
      "Construct Scikit-Learn TF-IDF vectorization blocks.",
      "Train Naive Bayes classifiers and plot ROC curves on test slices.",
      "Validate predictions on live review API requests."
    ],
    "libraries": [
      {
        "name": "nltk",
        "desc": "Natural Language Toolkit for cleaning, tokenizing, and lemmatizing."
      },
      {
        "name": "scikit-learn",
        "desc": "Machine learning libraries, TF-IDF vectorizers, and metrics."
      }
    ],
    "aiPrompt": "Explain Sentiment Analysis in NLP. Show text preprocessing (lemmatization), building a TF-IDF matrix, training a Naive Bayes model, and calculating F1 metrics.",
    "fileStructure": "sentiment_analysis/\n├── preprocess.py\n├── train_classifier.py\n├── vectorizer.py\n└── tests/\n    └── test_sentiment.py",
    "architecture": "Raw Text -> Tokenizer -> Lemmatizer -> TF-IDF Vectorizer -> Naive Bayes Classifier -> Sentiment Label",
    "quiz": {
      "q1": {
        "question": "What does Lemmatization do to a word token?",
        "options": [
          "It hashes the word into a binary array",
          "It reduces a word to its base dictionary form (e.g. 'running' to 'run') considering context (Correct)",
          "It capitalizes every letter"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Why is Multinomial Naive Bayes commonly used for text classification?",
        "options": [
          "It uses deep neural structures",
          "It is fast and models word frequency counts effectively based on probability scores (Correct)",
          "It calculates word vectors natively"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 21,
    "phase": "Phase 6 — NLP",
    "title": "Named Entity Recognition",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Build a Named Entity Recognition (NER) tagger extracting key entities (Persons, Organizations, Locations) from raw text. Train a custom NER model using SpaCy's transition-based architectures, write training annotations, and evaluate tagging recalls.",
    "concepts": [
      "NER Tagging (Person/Org/Loc)",
      "Token Classification",
      "SpaCy Pipelines",
      "IOB2 Annotation Formatting"
    ],
    "features": [
      "Locate and highlight entities within raw paragraphs using SpaCy.",
      "Prepare custom corpus files using the IOB2 annotation specification.",
      "Train transition-based parser weights using custom training examples.",
      "Add custom entities (like products, codes) to standard pretrained NER models.",
      "Extract entities from web scrapers and map records to databases."
    ],
    "milestones": [
      "Load textual dataset and convert training inputs to SpaCy DocBin formats.",
      "Initialize blank pipeline models specifying training parameters.",
      "Run optimization epochs updating token classification weights.",
      "Build entity extraction scripts formatting records into tables.",
      "Write test scripts checking recognition metrics (Precision, Recall, F1)."
    ],
    "libraries": [
      {
        "name": "spacy",
        "desc": "Industrial-strength Natural Language Processing in Python."
      },
      {
        "name": "pandas",
        "desc": "Tabular mapping of extracted entities."
      }
    ],
    "aiPrompt": "Help me build a Named Entity Recognition system. Explain training a custom SpaCy NER model, token tag structures, and scoring entity extraction F1-scores.",
    "fileStructure": "ner_tagger/\n├── prepare_data.py\n├── train_ner.py\n├── extract_entities.py\n└── data/\n    └── config.cfg",
    "architecture": "Text string -> SpaCy Tokenizer -> NER Pipe -> Transition Parser -> IOB2 Entity Tag Array",
    "quiz": {
      "q1": {
        "question": "What does the 'B-' prefix indicate in IOB2 tagging layouts?",
        "options": [
          "Binary entity classification",
          "The Beginning of a multi-word entity token sequence (Correct)",
          "Background noise words"
        ],
        "correct": 1
      },
      "q2": {
        "question": "How does SpaCy process entity tag updates during custom training?",
        "options": [
          "By compiling regular expressions",
          "By updating the transition-based parser weights using stochastic gradient descent updates (Correct)",
          "By matching text against static dictionary lists"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 22,
    "phase": "Phase 6 — NLP",
    "title": "Machine Translation",
    "level": "Advanced",
    "xp": 300,
    "desc": "Build an English-to-French machine translation system in PyTorch. Implement a sequence-to-sequence (Seq2Seq) neural architecture, build Encoder-Decoder LSTMs, write a custom Bahdanau Additive Attention layer, and evaluate translation outputs using BLEU scores.",
    "concepts": [
      "Seq2Seq Architectures",
      "Encoder-Decoder LSTMs",
      "Additive/Dot-product Attention",
      "BLEU Evaluation Metric"
    ],
    "features": [
      "Load parallel text files encoding sentence pairs.",
      "Build Encoder networks summarizing input syntax into context representations.",
      "Write Attention layers aligning decoder generation steps with encoder states.",
      "Construct Decoder networks generating translated words sequentially.",
      "Measure output translation accuracy using Bilingual Evaluation Understudy (BLEU) scores."
    ],
    "milestones": [
      "Construct bilingual vocabulary tokenizers mapping English and French mappings.",
      "Build PyTorch Seq2Seq models detailing Encoder LSTM and Attention layers.",
      "Write custom Decoder components executing attention weights on inputs.",
      "Implement training loops utilizing teacher forcing operations.",
      "Translate validation sentences and calculate BLEU scores using NLTK."
    ],
    "libraries": [
      {
        "name": "torch",
        "desc": "Seq2Seq neural modules and attention calculations."
      },
      {
        "name": "nltk",
        "desc": "BLEU score calculation utility modules."
      }
    ],
    "aiPrompt": "Explain how to build a Seq2Seq Machine Translation model in PyTorch. Detail how Bahdanau Attention is computed and how BLEU scores are calculated.",
    "fileStructure": "translation_seq2seq/\n├── vocab.py\n├── encoder.py\n├── decoder.py\n├── attention.py\n├── train.py\n└── evaluate.py",
    "architecture": "English Sentence -> LSTM Encoder -> Attention Alignment -> LSTM Decoder -> Softmax Word Selection -> French Sentence Output",
    "quiz": {
      "q1": {
        "question": "What limitation of basic Encoder-Decoder networks does the Attention mechanism solve?",
        "options": [
          "It reduces training data needs",
          "It prevents information bottlenecks by letting the decoder access all historical encoder states dynamically (Correct)",
          "It eliminates the need for LSTMs"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What does a BLEU score of 1.0 indicate?",
        "options": [
          "Zero translation match",
          "An exact, perfect token-level overlap with the reference translations (Correct)",
          "A compilation failure"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 23,
    "phase": "Phase 6 — NLP",
    "title": "Question Answering",
    "level": "Expert",
    "xp": 400,
    "desc": "Implement a Question Answering system using Hugging Face Transformers. Fine-tune a pre-trained BERT/DistilBERT model on the Stanford Question Answering Dataset (SQuAD) to extract answer spans from contexts, and deploy the inference pipeline.",
    "concepts": [
      "Extractive QA",
      "BERT Token Embeddings",
      "Token Span Classification",
      "Hugging Face Trainer API"
    ],
    "features": [
      "Tokenize question and context inputs into combined BERT format sequence tokens.",
      "Predict answer start and end index spans from paragraphs.",
      "Fine-tune pre-trained DistilBERT weights using supervised training loops.",
      "Clean up sub-word outputs (WordPiece tokens) to return human-readable answers.",
      "Implement inference pipelines taking user question/context strings directly."
    ],
    "milestones": [
      "Load SQuAD datasets via Hugging Face and examine token alignments.",
      "Tokenize inputs using AutoTokenizer, aligning start/end characters to token indexes.",
      "Load AutoModelForQuestionAnswering and configure training hyperparameters.",
      "Train model weights using Hugging Face Trainer or custom PyTorch epochs.",
      "Build interactive QA scripts executing predictions on new document paragraphs."
    ],
    "libraries": [
      {
        "name": "transformers",
        "desc": "Hugging Face library offering pretrained models and tokenizers."
      },
      {
        "name": "datasets",
        "desc": "Hugging Face library for sharing and loading datasets (like SQuAD)."
      }
    ],
    "aiPrompt": "Explain how to fine-tune DistilBERT for question answering on SQuAD. Detail token alignment, predicting start/end spans, and inference execution.",
    "fileStructure": "qa_system/\n├── data_prep.py\n├── train_qa.py\n├── pipeline.py\n└── tests/\n    └── test_qa.py",
    "architecture": "Question + Context -> BERT Tokenizer -> DistilBERT Layer -> Start/End Token Logit Classification -> Span Extractor -> Answer Text",
    "quiz": {
      "q1": {
        "question": "How does BERT determine the answer to a question in extractive QA?",
        "options": [
          "By generating new text tokens",
          "By classifying two logits per token representing the start and end boundary indices in the context (Correct)",
          "By looking up keywords in a dictionary"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What is the purpose of tokenizers in Hugging Face QA pipelines?",
        "options": [
          "To translate sentences into SQL queries",
          "To segment text into sub-words (like WordPiece) and output token IDs, masks, and segment classifications (Correct)",
          "To run database migrations"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 24,
    "phase": "Phase 7 — Reinforcement Learning",
    "title": "CartPole Agent",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Build a classic Reinforcement Learning agent solving the CartPole environment. Implement tabular Q-Learning and a Deep Q-Network (DQN) in PyTorch, design experience replay buffers, manage exploration/exploitation trade-offs with epsilon-greedy policies, and target network synchronizations.",
    "concepts": [
      "Q-Learning & DQN",
      "Experience Replay Buffers",
      "Epsilon-greedy Exploration",
      "Temporal Difference (TD) Target"
    ],
    "features": [
      "Interface with classic OpenAI Gym/Gymnasium physics environments.",
      "Design Q-Network model estimators mapping physical states to action values.",
      "Implement replay buffers store transition tuples to stabilize neural training.",
      "Write Epsilon-greedy schedules decaying exploration rates over training runs.",
      "Synchronize target networks periodically to calculate stable TD targets."
    ],
    "milestones": [
      "Configure Gym environment settings and verify random action baselines.",
      "Build PyTorch neural networks estimating state-action valuations.",
      "Implement Experience Replay classes tracking state-action-reward histories.",
      "Write agent step loop updating weights based on Bellman loss targets.",
      "Train agent until it reaches maximum reward thresholds (balancing pole stably)."
    ],
    "libraries": [
      {
        "name": "gymnasium",
        "desc": "Standard API for reinforcement learning environments (formerly Gym)."
      },
      {
        "name": "torch",
        "desc": "Neural optimization framework for DQN calculations."
      }
    ],
    "aiPrompt": "Guide me through building a DQN agent for CartPole. Explain state spaces, action selections (epsilon-greedy), replay buffers, and computing Bellman target loss.",
    "fileStructure": "cartpole_dqn/\n├── agent.py\n├── model.py\n├── replay_buffer.py\n└── train.py",
    "architecture": "Gym Environment State -> DQN Network -> Epsilon-Greedy Selector -> Action Execute -> Replay Buffer -> Bellman Loss Weights Update",
    "quiz": {
      "q1": {
        "question": "Why is an Experience Replay Buffer critical when training Deep Q-Networks (DQN)?",
        "options": [
          "It compresses environment physics",
          "It breaks temporal correlations in consecutive agent frames, ensuring independent and identically distributed data (Correct)",
          "It displays gameplay graphics"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What role does the Target Network play in DQNs?",
        "options": [
          "It tracks input states",
          "It calculates target Q-values using stable, frozen parameters, preventing value feedback divergence (Correct)",
          "It manages player logs"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 25,
    "phase": "Phase 7 — Reinforcement Learning",
    "title": "Snake AI",
    "level": "Advanced",
    "xp": 300,
    "desc": "Build a custom reinforcement learning environment and agent that learns to play Snake. Develop custom state spaces representing directions, obstacles, and food locations; design specific reward functions; and train agents using Policy Gradient models.",
    "concepts": [
      "Custom Gym Environments",
      "Reward Shaping",
      "State Space Representation",
      "Policy Gradient Methods"
    ],
    "features": [
      "Build a custom game environment conforming to standard Gymnasium interfaces.",
      "Represent environment details as binary vectors indicating immediate collisions and food vectors.",
      "Apply reward shaping (rewards for eating, penalties for dying/spinning).",
      "Train agents using Policy Gradient architectures (REINFORCE or Actor-Critic).",
      "Plot game scores and steps to evaluate model progress."
    ],
    "milestones": [
      "Write custom Snake game engine detailing physics, ticks, and state buffers.",
      "Wrap game loops inside subclassed gymnasium.Env frameworks.",
      "Design input representations mapping relative distances to walls and targets.",
      "Train agents using Policy networks updating probability distributions.",
      "Analyze training curves showing progressive path selections."
    ],
    "libraries": [
      {
        "name": "pygame",
        "desc": "Game library used to build custom environments and render graphics."
      },
      {
        "name": "torch",
        "desc": "Dynamic neural networks optimizing policy gradients."
      }
    ],
    "aiPrompt": "Help me build a Snake AI environment and policy gradient agent. Teach me reward shaping, representing states, and updating policies with REINFORCE.",
    "fileStructure": "snake_rl/\n├── snake_env.py\n├── policy_agent.py\n├── play.py\n└── tests/\n    └── test_env.py",
    "architecture": "Snake State Map -> Policy Network -> Action Probability -> Step Selection -> Custom Environment -> Reward & Next State -> Policy Loss Backpropagation",
    "quiz": {
      "q1": {
        "question": "What is 'Reward Shaping' in reinforcement learning context?",
        "options": [
          "Resizing graphical game windows",
          "Designing intermediate feedback rewards to guide agents toward final goals (Correct)",
          "Manually updating network weights"
        ],
        "correct": 1
      },
      "q2": {
        "question": "How do Policy Gradient methods differ from Q-learning?",
        "options": [
          "They approximate policy probabilities directly instead of learning action values (Correct)",
          "They only run on simple environments",
          "They bypass neural networks entirely"
        ],
        "correct": 0
      }
    }
  },
  {
    "id": 26,
    "phase": "Phase 8 — LLM Engineering",
    "title": "AI PDF Chat",
    "level": "Beginner",
    "xp": 100,
    "desc": "Design and build a local PDF Chat application utilizing Retrieval-Augmented Generation (RAG). Learn to extract layout structures from PDF files, divide text blocks into overlapping chunks, generate token embeddings, index chunks locally, and construct context prompts for LLM integrations.",
    "concepts": [
      "RAG Architecture",
      "PDF Layout Extraction",
      "Text Chunking & Overlap",
      "Context Window Prompting"
    ],
    "features": [
      "Extract textual streams from uploaded multi-page PDF documents.",
      "Segment long papers into overlapping text chunks to preserve local context.",
      "Connect to Hugging Face or OpenAI APIs to generate query and block embeddings.",
      "Perform cosine searches returning context segments related to queries.",
      "Assemble prompts formatting context paragraphs alongside user questions for LLM completion."
    ],
    "milestones": [
      "Build python scripts parsing PDF layers using PyPDF2 or pdfplumber.",
      "Implement chunking loops managing character limits and overlapping tokens.",
      "Connect embeddings generation hooks targeting text vectors.",
      "Write context assembler functions filtering top matches.",
      "Connect an LLM API generating structured summary text answers."
    ],
    "libraries": [
      {
        "name": "pypdf",
        "desc": "Pure-python PDF library capable of extracting document text."
      },
      {
        "name": "langchain",
        "desc": "Framework for developing applications powered by language models."
      }
    ],
    "aiPrompt": "Explain how to build an AI PDF Chat. Detail document parsing, chunking with overlap, similarity ranking, prompt structure, and LLM orchestration.",
    "fileStructure": "pdf_chat/\n├── parser.py\n├── chunker.py\n├── prompt_engine.py\n├── app.py\n└── requirements.txt",
    "architecture": "PDF -> PyPDF Parser -> Text Chunking (with overlap) -> Similarity Ranking -> Context Prompt -> LLM API -> Chat Answer",
    "quiz": {
      "q1": {
        "question": "Why is 'chunk overlap' used when splitting documents for RAG systems?",
        "options": [
          "To speed up vector generation",
          "To ensure semantic context at split boundaries is preserved and not severed (Correct)",
          "To validate file extensions"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What is the primary function of Retrieval-Augmented Generation (RAG)?",
        "options": [
          "It trains new foundation language models from scratch",
          "It retrieves relevant document facts to ground LLM prompts, preventing hallucinations (Correct)",
          "It compresses database schemas"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 27,
    "phase": "Phase 8 — LLM Engineering",
    "title": "RAG Search Engine",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Build a search engine scaling vector retrievals. Integrate a dedicated vector database (like Chroma or FAISS), implement document updates and index structures, write semantic queries, and implement cross-encoder re-ranking algorithms.",
    "concepts": [
      "Vector Databases (Chroma/FAISS)",
      "Index Architectures",
      "Semantic Similarity",
      "Cross-Encoder Re-ranking"
    ],
    "features": [
      "Index document corpuses within vector storage databases.",
      "Generate embeddings for new entries and run database updates.",
      "Run semantic similarity queries looking up top-K related records.",
      "Apply Cross-Encoder re-rankers scoring retrieved items to optimize relevance.",
      "Expose search APIs returning matching passages and metadata tags."
    ],
    "milestones": [
      "Configure vector database storage (ChromaDB/FAISS) inside the project layout.",
      "Write document loaders parsing web files and indexing paragraph embeddings.",
      "Implement similarity search pipelines querying vector coordinates.",
      "Integrate SentenceTransformers Cross-Encoder models re-evaluating matches.",
      "Test search latencies, retrieval precision, and recall parameters."
    ],
    "libraries": [
      {
        "name": "chromadb",
        "desc": "Open-source AI-native vector database system."
      },
      {
        "name": "sentence-transformers",
        "desc": "Python framework for state-of-the-art sentence, text and image embeddings."
      }
    ],
    "aiPrompt": "Guide me through building a RAG Search Engine. Explain vector database integration, search indexing, metadata queries, and cross-encoder re-ranking.",
    "fileStructure": "rag_search/\n├── db_client.py\n├── indexer.py\n├── search_api.py\n├── reranker.py\n└── config.py",
    "architecture": "Query -> Embedding Generator -> Vector DB Lookup (Top-K) -> Cross-Encoder Re-ranker -> Sorted Search Results",
    "quiz": {
      "q1": {
        "question": "What does a Cross-Encoder do in a search retrieval pipeline?",
        "options": [
          "It translates text to foreign languages",
          "It analyzes query-document pairs simultaneously, outputting highly accurate similarity scores to re-rank inputs (Correct)",
          "It splits files into chunks"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Why are vector databases preferred over SQL databases for semantic search?",
        "options": [
          "They support HTML files",
          "They are optimized for high-dimensional nearest-neighbor vector scans (Correct)",
          "They execute Javascript rules"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 28,
    "phase": "Phase 8 — LLM Engineering",
    "title": "SQL Agent",
    "level": "Advanced",
    "xp": 300,
    "desc": "Build an LLM Agent capable of querying relational databases in natural language. Implement dynamic prompt configurations supplying database schemas, design tool-calling routines parsing SQL output, build execution safety sandboxes, and compile diagnostic chains.",
    "concepts": [
      "LLM Tool-calling",
      "Dynamic Prompt Engineering",
      "SQL Generation & Execution",
      "Safety Sandboxing"
    ],
    "features": [
      "Supply LLMs with database table structures and schemas dynamically.",
      "Generate valid SQL queries from user questions (Text-to-SQL).",
      "Parse and execute model SQL commands against relational databases.",
      "Implement safety sandboxing (e.g. read-only connections, query limits).",
      "Return natural language responses summarizing tabular database outputs."
    ],
    "milestones": [
      "Set up target SQL databases (SQLite/Postgres) loaded with sample tables.",
      "Write dynamic system prompt builders assembling database schema instructions.",
      "Implement LLM tool-calling hooks parsing generated code strings.",
      "Build execution sandboxes preventing destructive write transactions.",
      "Verify query performance, error-recovery loops, and database responses."
    ],
    "libraries": [
      {
        "name": "sqlalchemy",
        "desc": "SQL toolkit and Object Relational Mapper for Python."
      },
      {
        "name": "openai",
        "desc": "Official library accessing OpenAI api engines."
      }
    ],
    "aiPrompt": "Explain how to build a SQL Agent. Show me how schemas are formatted into prompts, how tool-calling functions handle errors, and how to restrict queries to read-only.",
    "fileStructure": "sql_agent/\n├── agent.py\n├── sandbox.py\n├── schema_helper.py\n└── tests/\n    └── test_agent.py",
    "architecture": "User Question -> Schema Assembly -> LLM Plan -> Generated SQL -> Read-Only Sandbox -> Query Results -> LLM Summary -> Final Response",
    "quiz": {
      "q1": {
        "question": "How does a SQL Agent prevent executing malicious commands like 'DROP TABLE'?",
        "options": [
          "By parsing words manually",
          "By wrapping execution inside a read-only database transaction sandbox with restricted user privileges (Correct)",
          "By shutting down the server"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What is the function of tool-calling in SQL Agents?",
        "options": [
          "It connects models to CSS packages",
          "It enables the LLM to request database execution, receiving raw rows to formulate responses (Correct)",
          "It translates python syntax"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 29,
    "phase": "Phase 8 — LLM Engineering",
    "title": "Vision Chatbot",
    "level": "Expert",
    "xp": 400,
    "desc": "Build a multimodal chatbot integrating visual and text inference. Code pipelines processing images (scaling, encoding to base64, structuring API payloads), manage multi-turn history records containing mixed content types, and prompt systems to analyze visual details.",
    "concepts": [
      "Multimodal Inference API",
      "Image Encoding & Payloads",
      "Mixed-content Chat History",
      "System Prompting Strategies"
    ],
    "features": [
      "Accept, resize, and convert images into base64 payloads.",
      "Construct request structures containing mixed text and image keys.",
      "Handle multi-turn conversations remembering image interactions.",
      "Prompt models to run visual analyses (object localization, OCR, document reading).",
      "Build user interfaces displaying visual history and responses."
    ],
    "milestones": [
      "Write processing utilities formatting images to standard formats using Pillow.",
      "Implement base64 encoding pipelines converting files to string vectors.",
      "Build chat manager storing historical text-image token schemas.",
      "Integrate OpenAI/Claude vision APIs executing concurrent analysis queries.",
      "Write validation tests verifying payload structures and response times."
    ],
    "libraries": [
      {
        "name": "pillow",
        "desc": "Python Imaging Library supporting image loading and transformations."
      },
      {
        "name": "fastapi",
        "desc": "Web interface exposing chat endpoints."
      }
    ],
    "aiPrompt": "Explain how to interface with Multimodal LLM APIs. Detail image compression, base64 payload structure, and maintaining mixed-content chat histories.",
    "fileStructure": "vision_chatbot/\n├── app/\n│   ├── main.py\n│   ├── image_utils.py\n│   └── chat_history.py\n└── tests/\n    └── test_chatbot.py",
    "architecture": "User Image + Text -> Pillow Compressor -> Base64 Encoder -> API Payload -> Multimodal LLM -> Text Response",
    "quiz": {
      "q1": {
        "question": "How are images passed to cloud LLM vision APIs like GPT-4o?",
        "options": [
          "As compiled numpy arrays",
          "As base64-encoded strings or URL references inside structured JSON message payloads (Correct)",
          "As raw binary packages"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Why should images be resized before API transmission?",
        "options": [
          "To change image aspect ratios",
          "To reduce payload sizes, minimize token costs, and accelerate network response latencies (Correct)",
          "To improve text accuracy"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 30,
    "phase": "Phase 9 — Agentic AI",
    "title": "Research Agent",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Build an autonomous Research Agent implementing the ReAct (Reasoning and Acting) loop. Design loops coordinate thought processes, let agents execute Google Search or Wikipedia APIs, extract page summaries, self-correct errors, and build answers.",
    "concepts": [
      "ReAct Execution Loop",
      "API Search Tools",
      "Thought/Action/Observation",
      "Self-Correction Loops"
    ],
    "features": [
      "Implement the ReAct loop: Thought -> Action -> Observation -> Thought.",
      "Register search tools fetching data from Wikipedia or web APIs.",
      "Parse and summarize page contents returning context snippets.",
      "Handle tool execution errors letting agents correct query inputs.",
      "Output finalized reports summarizing factual observations."
    ],
    "milestones": [
      "Write agent runner orchestration parsing loops.",
      "Build search tools querying Wikipedia API endpoints.",
      "Create prompt guidelines forcing agents to follow ReAct specifications.",
      "Implement token-limit safety checks preventing infinite execution loops.",
      "Test agent capabilities answering complex questions requiring multi-hop reasoning."
    ],
    "libraries": [
      {
        "name": "wikipedia",
        "desc": "Python library to query and extract data from Wikipedia."
      },
      {
        "name": "langchain-core",
        "desc": "Basic abstractions for agent frameworks and tools."
      }
    ],
    "aiPrompt": "Help me build a ReAct Research Agent. Show how the execution loop parses Thought/Action outputs, handles tool observations, and outputs final answers.",
    "fileStructure": "research_agent/\n├── agent.py\n├── tools.py\n├── prompt.py\n└── tests/\n    └── test_agent.py",
    "architecture": "User Goal -> ReAct Engine -> Thought -> Action -> Web Search Tool -> Observation -> Thought -> Final Report",
    "quiz": {
      "q1": {
        "question": "What does the ReAct framework combine in LLM agent designs?",
        "options": [
          "Recursion and Activation",
          "Reasoning (Thought generation) and Acting (Tool execution) (Correct)",
          "Retrieval and Compiling"
        ],
        "correct": 1
      },
      "q2": {
        "question": "How does a ReAct agent determine it has reached the goal?",
        "options": [
          "When its timer expires",
          "When it outputs a special stop token or indicates a 'Final Answer' thought action (Correct)",
          "By crashing the loop"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 31,
    "phase": "Phase 9 — Agentic AI",
    "title": "Browser Agent",
    "level": "Advanced",
    "xp": 300,
    "desc": "Build an autonomous Browser Agent utilizing Playwright to navigate websites. Code tools scanning DOM nodes, compile interactive actions (click, fill, scroll), construct vision loops taking screenshots, and plan browse strategies.",
    "concepts": [
      "Playwright Automation",
      "DOM Parsing & Cleaning",
      "Action Execution Mapping",
      "Vision-based Verification"
    ],
    "features": [
      "Initialize headless/headful browser sessions using Playwright.",
      "Scan and extract simplified DOM hierarchies locating interactive nodes.",
      "Execute interface events: clicking inputs, filling text, and scrolling.",
      "Capture browser screenshots verifying page state changes.",
      "Implement step planning engines coordinating multiple page views."
    ],
    "milestones": [
      "Configure Playwright drivers within the project environment.",
      "Write DOM parsers scrubbing script nodes and formatting clickable tags.",
      "Build action controllers executing agent requests (e.g. click('#login')).",
      "Implement screenshot feedback loops passing graphics to vision APIs.",
      "Test browser agents searching items, logging in, or saving files."
    ],
    "libraries": [
      {
        "name": "playwright",
        "desc": "Web testing and automation library for Chromium, Firefox and WebKit."
      },
      {
        "name": "beautifulsoup4",
        "desc": "Clean up raw HTML templates."
      }
    ],
    "aiPrompt": "Explain how to build a Browser Agent. Show Playwright setups, DOM parser loops, executing click/type actions, and screenshot feedback loops.",
    "fileStructure": "browser_agent/\n├── agent.py\n├── browser.py\n├── dom_cleaner.py\n└── tests/\n    └── test_browser.py",
    "architecture": "Goal -> Agent Planner -> Clean DOM Scan -> Click/Type Action -> Playwright Driver -> Web Page Update -> Screenshot verification",
    "quiz": {
      "q1": {
        "question": "Why is it important to clean raw HTML before passing it to Browser Agents?",
        "options": [
          "To speed up browser renders",
          "To reduce prompt sizes by removing scripts and styling, keeping semantic elements readable (Correct)",
          "To convert pages to PDF format"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Which tool executes web actions in our Browser Agent?",
        "options": [
          "Flask",
          "Playwright (Correct)",
          "SQLite"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 32,
    "phase": "Phase 9 — Agentic AI",
    "title": "Multi-Agent Research Team",
    "level": "Advanced",
    "xp": 300,
    "desc": "Build a collaborative Multi-Agent Research Team. Implement distinct agent roles (Researcher, Writer, Critic), construct message brokers coordinating communications, define debate protocols, and manage state routers.",
    "concepts": [
      "Agent Role Definitions",
      "Communication Brokers",
      "Debate/Critic Protocols",
      "State Machines & Routing"
    ],
    "features": [
      "Define agent personas containing unique system prompt profiles.",
      "Coordinate messages across agents using a centralized state broker.",
      "Implement critic loops where Writers receive edit recommendations.",
      "Build branch networks routing tasks dynamically based on content.",
      "Export collaborative transcripts tracking team progress."
    ],
    "milestones": [
      "Write modular agent wrappers containing specific role prompts.",
      "Configure state engines mapping workflows and task handoffs.",
      "Implement critic loops where Writers adjust text based on observations.",
      "Create message histories coordinating team data exchanges.",
      "Test team capabilities researching topics, compiling summaries, and correcting drafts."
    ],
    "libraries": [
      {
        "name": "langgraph",
        "desc": "Library for building stateful, multi-actor applications with LLMs."
      },
      {
        "name": "pydantic",
        "desc": "Format shared state data templates."
      }
    ],
    "aiPrompt": "Guide me through building a Multi-Agent Research Team. Explain role partitioning, designing state nodes, routing decisions, and critic feedback loop implementations.",
    "fileStructure": "multi_agent_team/\n├── state.py\n├── agents/\n│   ├── researcher.py\n│   ├── writer.py\n│   └── critic.py\n├── graph.py\n└── app.py",
    "architecture": "User Request -> Researcher Agent -> Raw Data -> Writer Agent -> Draft -> Critic Agent -> Feedback Loops -> Writer Refine -> Final Output",
    "quiz": {
      "q1": {
        "question": "What is the primary benefit of dividing complex tasks among multiple specialized agents?",
        "options": [
          "It reduces token execution counts",
          "It improves output quality by confining agents to distinct, optimized personas and system prompts (Correct)",
          "It compiles code faster"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What role does LangGraph play in multi-agent orchestration?",
        "options": [
          "It displays charting visuals",
          "It represents workflows as state machines (graphs), mapping agents to nodes and transitions to edges (Correct)",
          "It acts as database storage"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 33,
    "phase": "Phase 9 — Agentic AI",
    "title": "Personal AI Operating System",
    "level": "Expert",
    "xp": 500,
    "desc": "Build a terminal-based capstone project: a Personal AI Operating System. Implement dynamic tool registration engines, build system files parser tools, coordinate vector memory databases, and compile safety boundaries around local executions.",
    "concepts": [
      "Dynamic Tool Registry",
      "System Files Parsing",
      "Vector Memory Indexing",
      "Safety Boundary Execution"
    ],
    "features": [
      "Build a terminal client taking commands and routing tasks.",
      "Register local scripts as tools (file editors, web searchers, system commands).",
      "Manage persistent history records inside local vector storage databases.",
      "Create safety limits prompt sandboxes checking command parameters.",
      "Expose voice-synthesis options reading results aloud."
    ],
    "milestones": [
      "Create project layouts with boot loops and config managers.",
      "Build tool registries loading classes and exposing JSON tool signatures.",
      "Integrate vector memory cache databases storing chat highlights.",
      "Implement command validation interceptors preventing dangerous system calls.",
      "Run integration scripts performing complex tasks (e.g. download list, process rows, edit files)."
    ],
    "libraries": [
      {
        "name": "click",
        "desc": "Python package for creating beautiful command line interfaces."
      },
      {
        "name": "chromadb",
        "desc": "Vector database for storing OS memory context."
      }
    ],
    "aiPrompt": "Guide me through building a Personal AI Operating System. Show me how to implement dynamic tool loading, manage session memory, and build command safety interceptors.",
    "fileStructure": "personal_ai_os/\n├── main.py\n├── core/\n│   ├── registry.py\n│   ├── memory.py\n│   └── sandbox.py\n└── tools/\n    ├── fs_tools.py\n    └── net_tools.py",
    "architecture": "Terminal Shell Input -> Safety Interceptor -> AI OS Core -> Tool Registry -> Script execution / Vector Memory -> Shell Output",
    "quiz": {
      "q1": {
        "question": "What is a major design requirement for AI agents interacting with local filesystems?",
        "options": [
          "Compressing host directories",
          "Strict sandboxing and parameters validation preventing recursive deletions or data leaks (Correct)",
          "Converting code to assembly"
        ],
        "correct": 1
      },
      "q2": {
        "question": "How does vector memory improve long-term agent interactions?",
        "options": [
          "It increases network bandwidths",
          "It searches and retrieves key context blocks from past days, overriding static window limitations (Correct)",
          "It overrides python syntax rules"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 34,
    "phase": "Phase 10 — Generative AI",
    "title": "AI Tutor",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Build an interactive AI Tutor application. Implement syllabus generators compiling custom study tracks based on user levels, coordinate quiz evaluation chains scoring student answers, and prompt explanations.",
    "concepts": [
      "Structured Syllabus Generator",
      "Interactive Quiz Chains",
      "Feynman Explanation Prompts",
      "Dynamic Level Adjusters"
    ],
    "features": [
      "Generate structured markdown learning paths answering user requests.",
      "Create interactive quiz loops examining topic masteries.",
      "Implement Feynman Technique prompts simplifying explanations.",
      "Adjust tutorial depths dynamically matching student responses.",
      "Track student scores exporting progress cards."
    ],
    "milestones": [
      "Define Pydantic schema parameters outlining learning profiles.",
      "Build dynamic prompt systems generating custom study plans.",
      "Create quiz generation pipelines writing questions and validation keys.",
      "Implement user response check engines returning tips.",
      "Expose web routes using FastAPI running tutor sessions."
    ],
    "libraries": [
      {
        "name": "pydantic",
        "desc": "Schema validators defining quiz and syllabus shapes."
      },
      {
        "name": "jinja2",
        "desc": "Template rendering library for dynamic prompt structures."
      }
    ],
    "aiPrompt": "Help me build an AI Tutor API. Explain structured syllabus generation with Pydantic, dynamic quiz generation, and implementing Feynman technique prompt filters.",
    "fileStructure": "ai_tutor/\n├── main.py\n├── prompts.py\n├── schemas.py\n└── tests/\n    └── test_tutor.py",
    "architecture": "Student Goal -> Syllabus Generator -> Curriculum -> Quiz Engine -> Student Answer -> Evaluator Chain -> Feedback & Depth Adjuster",
    "quiz": {
      "q1": {
        "question": "What is the key benefit of utilizing Pydantic's BaseModel in LLM generators?",
        "options": [
          "It speeds up network latency",
          "It guarantees the model output conforms to strict JSON structures for easy parsing (Correct)",
          "It replaces the compiler"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What does a Feynman Technique prompt require the LLM to do?",
        "options": [
          "Translate paragraphs to Latin",
          "Explain complex technical topics using simple, accessible language and analogies (Correct)",
          "Write multi-threaded code"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 35,
    "phase": "Phase 10 — Generative AI",
    "title": "AI Workflow Builder",
    "level": "Advanced",
    "xp": 300,
    "desc": "Build an AI Workflow Builder generating executable automation scripts. Build graph orchestration models representing steps, create template compilers converting instructions to python functions, and sandbox execution test loops.",
    "concepts": [
      "Workflow Orchestration",
      "Code Generation Pipelines",
      "Structured Task Models",
      "Compilation Sandboxing"
    ],
    "features": [
      "Translate natural workflow goals into step-by-step nodes.",
      "Compile code blocks containing actions (API requests, data changes).",
      "Assemble variables mapping outputs between steps.",
      "Run generated tasks inside local sandbox environments.",
      "Export workflow logs highlighting error locations."
    ],
    "milestones": [
      "Define task graph models using Pydantic templates.",
      "Build compiler prompts converting goals to executable code snippets.",
      "Write execution sandbox hooks running scripts securely.",
      "Implement variable binding channels forwarding outputs.",
      "Verify workflow execution using simulated target integrations."
    ],
    "libraries": [
      {
        "name": "pydantic",
        "desc": "Data models enforcing workflow node definitions."
      },
      {
        "name": "asteval",
        "desc": "Safe evaluator of Python expressions using AST representation."
      }
    ],
    "aiPrompt": "Explain how to build an AI Workflow Builder. Show dynamic graph mapping, parsing goals to code, variables routing, and sandbox execution configurations.",
    "fileStructure": "workflow_builder/\n├── main.py\n├── graph.py\n├── compiler.py\n├── sandbox.py\n└── tests/\n    └── test_workflow.py",
    "architecture": "Prompt Goal -> Graph Planner -> Steps Array -> Code Compiler -> safe AST Evaluator -> Output parameters",
    "quiz": {
      "q1": {
        "question": "Why is running code generated by AI models risky?",
        "options": [
          "It is slower than compiled code",
          "It can contain bugs or execute destructive system actions if un-sandboxed (Correct)",
          "It requires extra CSS files"
        ],
        "correct": 1
      },
      "q2": {
        "question": "How does asteval help mitigate execution risks?",
        "options": [
          "It compiles code to binary files",
          "It runs a safe Python subset using Abstract Syntax Trees, blocking OS system import calls (Correct)",
          "It encrypts inputs"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 36,
    "phase": "Phase 11 — MLOps",
    "title": "Model Serving API",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Build an enterprise model serving backend using FastAPI. Configure request batching, model prediction warmups, multi-worker thread pools, logging latency, and exporting API metrics.",
    "concepts": [
      "Model Inference APIs",
      "Dynamic Request Batching",
      "Model Warmups",
      "Worker Concurrency"
    ],
    "features": [
      "Expose prediction endpoints loading model files during initialization.",
      "Batch inference requests dynamically to optimize CPU/GPU utilization.",
      "Run startup warmups to eliminate initial latency spikes.",
      "Log request latencies, input sizes, and prediction distributions.",
      "Export metrics schemas monitoring server health."
    ],
    "milestones": [
      "Write FastAPI servers loading PyTorch/Scikit-Learn model weights.",
      "Implement background query queuing pools for batching.",
      "Create warmup scripts calling the network with test inputs.",
      "Configure gunicorn/uvicorn setups allocating worker threads.",
      "Benchmark throughput limits and prediction latencies."
    ],
    "libraries": [
      {
        "name": "fastapi",
        "desc": "Web serving framework."
      },
      {
        "name": "gunicorn",
        "desc": "WSGI HTTP server for UNIX environments."
      }
    ],
    "aiPrompt": "Guide me through building a Model Serving API. Explain how to load models once at startup, implement batching, and handle worker threads.",
    "fileStructure": "model_server/\n├── app/\n│   ├── main.py\n│   ├── predictor.py\n│   └── config.py\n└── benchmarks/\n    └── load_test.py",
    "architecture": "Incoming Request -> Web Worker -> Batch Queue -> Model Batch Inference -> Worker Response -> Latency Log",
    "quiz": {
      "q1": {
        "question": "Why should models be loaded at server startup rather than inside the endpoint route?",
        "options": [
          "To secure model weight files",
          "Loading model weights takes seconds; loading once at startup avoids massive API latency spikes on every request (Correct)",
          "To clean up cache allocations"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What does request batching optimize during model serving?",
        "options": [
          "It reduces network transmission costs",
          "It processes multiple queries in a single matrix operation, boosting hardware efficiency (Correct)",
          "It formats outputs to JSON"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 37,
    "phase": "Phase 11 — MLOps",
    "title": "MLflow Integration",
    "level": "Advanced",
    "xp": 300,
    "desc": "Build an experiment tracking engine integrating MLflow. Learn to log metrics, track hyperparameter iterations, register artifact files, tag runs, and query models using registry APIs.",
    "concepts": [
      "Experiment Tracking",
      "Parameters Logging",
      "Artifact Archiving",
      "Model Registry APIs"
    ],
    "features": [
      "Log parameter iterations dynamically during training.",
      "Save training metrics (loss, validation curves) across epochs.",
      "Archive artifacts (datasets, configuration files, visual plots).",
      "Register finalized model binaries with tag states (Staging, Production).",
      "Query registry APIs to retrieve active model versions."
    ],
    "milestones": [
      "Set up MLflow local tracking servers linking file registries.",
      "Write training scripts logging weights, runs, and validation curves.",
      "Implement model registration pipelines tracking metrics.",
      "Deploy artifact targets saving confusion matrix png files.",
      "Build model lookup classes querying the MLflow client."
    ],
    "libraries": [
      {
        "name": "mlflow",
        "desc": "Platform to manage the ML lifecycle including experimentation, reproducibility, and deployment."
      },
      {
        "name": "scikit-learn",
        "desc": "Generate classification metrics for log updates."
      }
    ],
    "aiPrompt": "Explain MLflow experiment tracking. Show how to initialize a run, log hyperparameters, upload artifacts, and manage the model registry.",
    "fileStructure": "mlflow_tracking/\n├── train.py\n├── registry_client.py\n├── config.json\n└── requirements.txt",
    "architecture": "Training run -> MLflow Logger -> Parameters & Metrics -> Model Registry -> Artifact Store",
    "quiz": {
      "q1": {
        "question": "What is the primary purpose of MLflow Tracking?",
        "options": [
          "To build UI dashboards",
          "To log parameters, code versions, metrics, and output files for model reproducibility (Correct)",
          "To compile database indexing rules"
        ],
        "correct": 1
      },
      "q2": {
        "question": "How does the MLflow Model Registry help transition models?",
        "options": [
          "It automatically trains models",
          "It manages version states, tagging files as Staging, Production, or Archived (Correct)",
          "It compiles code"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 38,
    "phase": "Phase 11 — MLOps",
    "title": "Drift Detection",
    "level": "Advanced",
    "xp": 300,
    "desc": "Implement a statistical Drift Detection engine monitoring production data. Calculate Population Stability Index (PSI) and Kolmogorov-Smirnov (KS) tests comparing distribution shifts, and configure alerting metrics.",
    "concepts": [
      "Data Drift Detection",
      "Population Stability Index (PSI)",
      "Kolmogorov-Smirnov (KS) test",
      "Alert Configuration Systems"
    ],
    "features": [
      "Monitor incoming production data arrays comparing parameters to baselines.",
      "Calculate feature distribution shifts using Kolmogorov-Smirnov tests.",
      "Compute Population Stability Index (PSI) measuring dataset variations.",
      "Expose anomaly endpoints indicating model input drifts.",
      "Compile alerting hooks triggering model retraining loops."
    ],
    "milestones": [
      "Write data drift calculations implementing PSI algorithms.",
      "Implement KS test checks on numerical arrays using SciPy.",
      "Create reference data metrics representing baseline training sets.",
      "Build serving pipeline filters tagging high-drift queries.",
      "Verify system alerts and logging alerts."
    ],
    "libraries": [
      {
        "name": "scipy",
        "desc": "Scientific computations offering statistical tests (KS test)."
      },
      {
        "name": "numpy",
        "desc": "Array math and vector calculation utilities."
      }
    ],
    "aiPrompt": "Teach me Drift Detection. Explain Kolmogorov-Smirnov tests, calculating Population Stability Index (PSI), and alerting when distributions shift.",
    "fileStructure": "drift_detector/\n├── detector.py\n├── stats_helper.py\n├── config.py\n└── tests/\n    └── test_drift.py",
    "architecture": "Production Data -> Feature Extractor -> KS-Test & PSI calculations -> Alert Interceptor -> MLflow/Retrain Trigger",
    "quiz": {
      "q1": {
        "question": "What does a high Kolmogorov-Smirnov (KS) test statistic indicate?",
        "options": [
          "A faster request speed",
          "The production data distribution has significantly shifted from the training baseline (Correct)",
          "An index compilation error"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Which Population Stability Index (PSI) value threshold indicates significant feature drift?",
        "options": [
          "PSI < 0.1",
          "PSI > 0.2 (Correct)",
          "PSI = 0"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 39,
    "phase": "Phase 11 — MLOps",
    "title": "Monitoring Dashboard",
    "level": "Expert",
    "xp": 400,
    "desc": "Build a real-time Monitoring Dashboard for machine learning models. Expose model latency, prediction anomalies, request volumes, and system resource tracking using Prometheus metrics and Grafana visualizations.",
    "concepts": [
      "Prometheus Instrumentation",
      "Grafana Dashboards",
      "Metric Classifications (Counter/Gauge)",
      "Alert Manager Hooks"
    ],
    "features": [
      "Expose standard `/metrics` endpoints compatible with Prometheus.",
      "Track total requests and errors using Prometheus Counters.",
      "Monitor response latency and prediction distributions using Gauges.",
      "Integrate system resource logging (CPU, Memory, Disk).",
      "Build custom Grafana dashboard JSON configurations."
    ],
    "milestones": [
      "Install prometheus-client configurations inside the FastAPI service layout.",
      "Create API endpoints tracking model queries and response status codes.",
      "Register Gauges tracking prediction classifications and average latencies.",
      "Write configuration templates loading dashboard formats.",
      "Test endpoint query logging during simulated request loads."
    ],
    "libraries": [
      {
        "name": "prometheus-client",
        "desc": "Official Prometheus instrumentation library for Python."
      },
      {
        "name": "psutil",
        "desc": "Cross-platform library for retrieving information on running processes and system utilization."
      }
    ],
    "aiPrompt": "Explain how to build a model monitoring dashboard. Show Prometheus instrumentation, exporting metrics, and structuring Grafana displays.",
    "fileStructure": "model_monitor/\n├── app/\n│   ├── main.py\n│   ├── metrics.py\n│   └── monitor.py\n└── grafana/dashboard.json",
    "architecture": "API Request -> Prometheus Exporter -> Prometheus Server Scrape -> Grafana Dashboard Visuals",
    "quiz": {
      "q1": {
        "question": "What is the difference between Counter and Gauge metrics in Prometheus?",
        "options": [
          "Counters only track data sizes, Gauges track time",
          "Counters only increase (e.g. total requests); Gauges can go up and down (e.g. system memory, latency) (Correct)",
          "Gauges are not supported in Python"
        ],
        "correct": 1
      },
      "q2": {
        "question": "How does Prometheus collect metrics from a model serving endpoint?",
        "options": [
          "By writing files locally",
          "By periodically scraping a standard HTTP /metrics endpoint exposed by the server (Correct)",
          "By connecting to SQL logs"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 40,
    "phase": "Phase 12 — Distributed Systems",
    "title": "Distributed Cache",
    "level": "Advanced",
    "xp": 300,
    "desc": "Build a light Distributed Cache system. Implement a Consistent Hashing ring distributing keys across virtual nodes, code cache evictions, build node network heartbeats, and write client socket synchronization layers.",
    "concepts": [
      "Consistent Hashing",
      "Virtual Node Replication",
      "Cache Evictions (LRU)",
      "Socket Synchronization"
    ],
    "features": [
      "Distribute data keys across multiple cache server nodes.",
      "Implement Consistent Hashing rings balancing loads.",
      "Build virtual node representations optimizing key spreads.",
      "Manage node failures dynamically adjusting hashing rings.",
      "Sync records over simple network sockets."
    ],
    "milestones": [
      "Write consistent hashing rings mapping servers to positions.",
      "Build server nodes running local cache routines.",
      "Implement heartbeat checkers tracking node statuses.",
      "Configure client request routing layers mapping keys to nodes.",
      "Test database setups under simulated node failures."
    ],
    "libraries": [
      {
        "name": "hashlib",
        "desc": "Cryptographic hashing functions used to compute ring coordinates."
      },
      {
        "name": "socket",
        "desc": "Communicate between distributed caching nodes."
      }
    ],
    "aiPrompt": "Explain Consistent Hashing. Guide me through building a distributed cache with node rings, handling virtual nodes, and socket synchronization.",
    "fileStructure": "distributed_cache/\n├── ring.py\n├── node.py\n├── client.py\n└── tests/\n    └── test_cache.py",
    "architecture": "Key -> Consistent Hash Ring -> Target Node lookup -> Socket connection -> Read/Write Cache -> Sync updates",
    "quiz": {
      "q1": {
        "question": "What problem does Consistent Hashing solve in distributed caches?",
        "options": [
          "It speeds up network protocols",
          "It minimizes key redistributions when servers are added or removed from the cluster (Correct)",
          "It overrides socket structures"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What are virtual nodes in hash rings?",
        "options": [
          "Simulated emulator systems",
          "Multiple positions assigned to a single physical server on the ring, ensuring balanced load distribution (Correct)",
          "Mock database connections"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 41,
    "phase": "Phase 12 — Distributed Systems",
    "title": "Message Queue",
    "level": "Expert",
    "xp": 400,
    "desc": "Build a lightweight Distributed Message Queue from scratch. Design a Pub/Sub topic architecture, build write-ahead logs (WAL) for disk persistence, implement consumer acknowledgments tracking offsets, and enforce TCP routing logic.",
    "concepts": [
      "Pub/Sub Broker Engine",
      "Write-Ahead Logs (WAL)",
      "Consumer Acknowledgments",
      "TCP Message Framing"
    ],
    "features": [
      "Route messages from publishers into specific broker topics.",
      "Write payloads into binary Write-Ahead Logs ensuring persistence.",
      "Track client acknowledgments updating current partition indices.",
      "Support multiple consumer subscriptions reading topic ranges.",
      "Enforce network connections using custom framing schemas."
    ],
    "milestones": [
      "Write binary log files persistence tools (Write-Ahead Logs).",
      "Build socket routing engines coordinating client connections.",
      "Implement publisher pipelines writing string updates.",
      "Configure subscription handlers managing consumer states.",
      "Test throughput speeds, message persistence, and consumer balances."
    ],
    "libraries": [
      {
        "name": "struct",
        "desc": "Interpret bytes as packed binary data structures."
      },
      {
        "name": "socket",
        "desc": "TCP broker communication sockets."
      }
    ],
    "aiPrompt": "Explain building a Message Queue. Show how Write-Ahead Logs are constructed, how structural binary headers route network payloads, and how consumers acknowledge offsets.",
    "fileStructure": "message_queue/\n├── broker.py\n├── wal.py\n├── consumer.py\n└── tests/\n    └── test_queue.py",
    "architecture": "Publisher -> TCP Frame -> Broker Engine -> Write-Ahead Log -> Consumer Queue -> Acknowledgment Offset Save",
    "quiz": {
      "q1": {
        "question": "What is the purpose of a Write-Ahead Log (WAL) in database/queue architectures?",
        "options": [
          "It validates schemas",
          "It appends updates to disk sequentially before applying changes, securing data persistence (Correct)",
          "It formats prints"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Why is the Python 'struct' module useful in socket programming?",
        "options": [
          "It compresses text styles",
          "It packs Python values into binary format structures for consistent TCP message framing (Correct)",
          "It compiles code"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 42,
    "phase": "Phase 13 — System Design",
    "title": "ChatGPT Clone",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Design and build a complete web ChatGPT Clone. Implement Server-Sent Events (SSE) streaming responses from LLM APIs, manage conversation histories inside relational databases, and build interactive frontends.",
    "concepts": [
      "Server-Sent Events (SSE)",
      "Database Session History",
      "FastAPI Stream Responses",
      "Token Counting Logics"
    ],
    "features": [
      "Stream model responses word-by-word using Server-Sent Events.",
      "Save and list conversation history indices in SQLite databases.",
      "Expose clean chat APIs taking text parameters.",
      "Implement request parsing filters limiting input sizes.",
      "Design web frontends managing stream updates."
    ],
    "milestones": [
      "Expose FastAPI server layout structures.",
      "Write database models mapping users, sessions, and messages.",
      "Implement streaming generators yielding SSE data streams.",
      "Build simple web interfaces rendering markdown streams.",
      "Verify chat concurrency, database sessions, and latency metrics."
    ],
    "libraries": [
      {
        "name": "fastapi",
        "desc": "Web APIs exposing streaming routes."
      },
      {
        "name": "sqlmodel",
        "desc": "SQL databases mapper framework."
      }
    ],
    "aiPrompt": "Guide me through building a ChatGPT Clone. Explain SSE streaming endpoint configurations, database session storage, and how the frontend renders stream tokens.",
    "fileStructure": "chatgpt_clone/\n├── app/\n│   ├── main.py\n│   ├── models.py\n│   └── database.py\n├── static/\n│   └── index.html\n└── requirements.txt",
    "architecture": "User Input -> FastAPI -> SQLModel History Fetch -> OpenAI API Stream -> Server-Sent Events -> Browser Render",
    "quiz": {
      "q1": {
        "question": "Which technology allows the server to stream text answers incrementally over a single connection?",
        "options": [
          "WebSockets only",
          "Server-Sent Events (SSE) / EventSource API (Correct)",
          "REST polling intervals"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Why is storing chat history critical for multi-turn LLM completions?",
        "options": [
          "Models have zero internal memory; the server must provide past messages on every request for context (Correct)",
          "It decreases model parameters",
          "It compiles code"
        ],
        "correct": 0
      }
    }
  },
  {
    "id": 43,
    "phase": "Phase 13 — System Design",
    "title": "Netflix Recommendation Backend",
    "level": "Expert",
    "xp": 400,
    "desc": "Design a high-scale recommendation backend modeling Netflix's architecture. Build candidate generation layers using vector databases, implement feature fetch APIs caching metadata, and construct scoring systems.",
    "concepts": [
      "Two-Stage Recommendations",
      "Candidate Generators",
      "Feature Caching (Redis)",
      "Model Ranker Inference"
    ],
    "features": [
      "Generate candidate sets of movies matching user profiles.",
      "Cache metadata records in Redis indexes.",
      "Rank movie candidates using scoring models.",
      "Support partition scales distributing catalog searches.",
      "Expose recommendation routes."
    ],
    "milestones": [
      "Set up database indexing models.",
      "Build candidate generator matching profiles using FAISS.",
      "Implement metadata lookup helpers routing queries to Redis.",
      "Write model ranker endpoints scoring candidates.",
      "Benchmark retrieval speeds, partition loads, and API latencies."
    ],
    "libraries": [
      {
        "name": "redis",
        "desc": "In-memory database server interface."
      },
      {
        "name": "faiss-cpu",
        "desc": "Library for efficient similarity search and clustering of dense vectors."
      }
    ],
    "aiPrompt": "Explain designing a recommendation backend. Detail candidate generation, feature lookups in Redis, scoring architecture, and how to scale catalog lookups.",
    "fileStructure": "recommender_backend/\n├── app/\n│   ├── main.py\n│   ├── candidates.py\n│   └── ranker.py\n├── config.py\n└── tests/\n    └── test_recommend.py",
    "architecture": "User ID -> Candidate Retrieval (FAISS) -> Feature Enrichment (Redis) -> Ranking Model Scoring -> Ranked Video List Output",
    "quiz": {
      "q1": {
        "question": "What are the two main stages of modern scale recommendation systems?",
        "options": [
          "Formatting and Printing",
          "Candidate Generation (Retrieval) and Ranking (Scoring) (Correct)",
          "Compiling and Indexing"
        ],
        "correct": 1
      },
      "q2": {
        "question": "Why is Redis used in the recommendation pipeline?",
        "options": [
          "To serve HTML files",
          "To fetch user/movie feature metadata in milliseconds to enrich ranking model inputs (Correct)",
          "To compile Python classes"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 44,
    "phase": "Phase 14 — Research Reproduction",
    "title": "Attention Mechanism",
    "level": "Intermediate",
    "xp": 200,
    "desc": "Reproduce the Scaled Dot-Product Attention mechanism from the 'Attention Is All You Need' paper. Write tensor math computations in PyTorch, implement Query/Key/Value transformations, apply causal masks, and plot matrix heatmaps.",
    "concepts": [
      "Scaled Dot-Product Attention",
      "Query/Key/Value Tensors",
      "Softmax Normalization",
      "Causal Masking matrices"
    ],
    "features": [
      "Compute Scaled Dot-Product values: Softmax(QK^T / sqrt(d_k))V.",
      "Apply attention masks hiding future sequence indexes.",
      "Calculate matrix dimensions dynamically.",
      "Expose weights metrics mapping alignment coefficients.",
      "Plot attention heatmaps visually."
    ],
    "milestones": [
      "Write PyTorch modules taking Query, Key, and Value tensors.",
      "Implement scaling divisions based on vector dimensions.",
      "Build causal mask matrices masking sequence paths.",
      "Write test pipelines checking outputs and shapes.",
      "Create visualization files rendering attention distributions."
    ],
    "libraries": [
      {
        "name": "torch",
        "desc": "Tensor computations and matrix algebra."
      },
      {
        "name": "matplotlib",
        "desc": "Plotting library for generating attention heatmaps."
      }
    ],
    "aiPrompt": "Explain the math behind Scaled Dot-Product Attention. Show PyTorch implementations mapping Q, K, V tensors, scaling vectors, masks, and mapping outputs.",
    "fileStructure": "attention_layer/\n├── attention.py\n├── visualize.py\n├── config.py\n└── tests/\n    └── test_attention.py",
    "architecture": "Query, Key, Value Tensors -> Q @ K.T -> Scaling (/ sqrt(d_k)) -> Softmax -> Softmax @ V -> Output Tensor",
    "quiz": {
      "q1": {
        "question": "Why is the dot-product scaled by the square root of the key dimension (d_k) in Transformer attention?",
        "options": [
          "To shrink memory sizes",
          "To prevent dot-products from growing extremely large, pushing Softmax gradients into flat, non-learning zones (Correct)",
          "To encrypt inputs"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What does a causal mask block?",
        "options": [
          "It blocks syntax errors",
          "It prevents the model from attending to subsequent tokens (future information) during auto-regressive prediction (Correct)",
          "It blocks external APIs"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 45,
    "phase": "Phase 14 — Research Reproduction",
    "title": "Transformer from Scratch",
    "level": "Expert",
    "xp": 500,
    "desc": "Build a complete Transformer network from scratch in PyTorch. Implement Multi-Head Attention, Position-Wise Feed-Forward networks, Layer Normalizations, Sinusoidal Positional encodings, and Encoder-Decoder architectures.",
    "concepts": [
      "Multi-Head Attention",
      "Positional Encoding (Sinusoidal)",
      "Layer Normalization (LayerNorm)",
      "Encoder/Decoder stacking"
    ],
    "features": [
      "Coordinate multiple attention head projections in parallel layers.",
      "Compute Sinusoidal Positional Encoding tensors mapping sequences.",
      "Implement residual connections adding input features to outputs.",
      "Code Layer Normalization equations stabilizing gradient ranges.",
      "Design Encoder-Decoder networks processing inputs."
    ],
    "milestones": [
      "Implement Positional Encoding math modules.",
      "Build Multi-Head Attention modules dividing projection states.",
      "Configure feed-forward blocks containing linear transformations.",
      "Stack Encoder and Decoder blocks compiling parameters.",
      "Run translation training validation loops on small corpuses."
    ],
    "libraries": [
      {
        "name": "torch",
        "desc": "PyTorch tensor operations, parameter updates, and neural layers."
      },
      {
        "name": "numpy",
        "desc": "Positional sinusoidal matrix calculations."
      }
    ],
    "aiPrompt": "Guide me through building a complete Transformer from scratch. Explain Multi-Head Attention, sinusoidal positional encodings, LayerNorm, and stacking the encoder/decoder blocks.",
    "fileStructure": "transformer_scratch/\n├── model.py\n├── layers.py\n├── train.py\n└── tests/\n    └── test_transformer.py",
    "architecture": "Source tokens -> Positional Embedding -> Encoder Blocks -> Latent Context -> Decoder Blocks -> Softmax Projection",
    "quiz": {
      "q1": {
        "question": "Why are positional encodings required in Transformer networks?",
        "options": [
          "To index database keys",
          "Because attention operations process all tokens simultaneously, lacking inherent sequence position context (Correct)",
          "To normalize weights"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What is the role of Layer Normalization in Transformers?",
        "options": [
          "It scales image pixels",
          "It normalizes activations across features within a single batch, stabilizing model training (Correct)",
          "It compiles code"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 46,
    "phase": "Phase 14 — Research Reproduction",
    "title": "Mini GPT Decoder",
    "level": "Expert",
    "xp": 500,
    "desc": "Build an autoregressive Mini GPT Decoder model. Implement causal multi-head attention layers, training data pipelines handling context block shifts, temperature-scaled sampling engines, and optimize weights.",
    "concepts": [
      "Autoregressive Decoders",
      "Causal Multi-Head Attention",
      "Temperature/Top-K Sampling",
      "Cross-Entropy Language Modeling"
    ],
    "features": [
      "Build autoregressive transformer decoder blocks.",
      "Implement causal masking vectors enforcing sequence properties.",
      "Write sampling engines filtering distributions using Temperature/Top-K values.",
      "Configure text pipelines loading token sequences.",
      "Optimize model parameters using target cross-entropy loss."
    ],
    "milestones": [
      "Implement decoder layer modules linking attention layers.",
      "Write data loading pipelines returning shifted character blocks.",
      "Build training loops calculating cross-entropy loss weights.",
      "Implement text generation loops calling sampling rules.",
      "Train model on small literary works generating novel text sentences."
    ],
    "libraries": [
      {
        "name": "torch",
        "desc": "PyTorch tensor operations, parameter updates, and neural layers."
      },
      {
        "name": "tiktoken",
        "desc": "Fast BPE tokeniser for use with OpenAI's models."
      }
    ],
    "aiPrompt": "Explain how to build a Mini GPT Decoder. Detail causal attention configurations, shifting inputs/targets, temperature-scaled sampling, and writing training loops.",
    "fileStructure": "mini_gpt/\n├── model.py\n├── dataset.py\n├── generate.py\n└── train.py",
    "architecture": "Tokens -> Embedding -> Causal Decoder Blocks -> Linear Projection -> Logits -> Temperature/Top-K -> Next Token Output",
    "quiz": {
      "q1": {
        "question": "How is the target sequence configured in autoregressive language modeling?",
        "options": [
          "It is identical to the input sequence",
          "It is shifted by one token to the right, predicting the next token at each step (Correct)",
          "It is reversed"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What does a lower temperature value (e.g. 0.2) do during token sampling?",
        "options": [
          "It increases token limits",
          "It flattens probability distributions, making generated text more deterministic and repetitive (Correct)",
          "It speeds up compilation"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 47,
    "phase": "Phase 14 — Research Reproduction",
    "title": "ResNet",
    "level": "Advanced",
    "xp": 300,
    "desc": "Reproduce the classic ResNet (Residual Networks) architecture in PyTorch. Implement residual blocks containing shortcut/skip connections, handle dimension projection mismatching, stack deep layers, and train models on CIFAR10.",
    "concepts": [
      "Residual Skip Connections",
      "Identity mapping",
      "Projection blocks",
      "Gradient bottleneck mitigation"
    ],
    "features": [
      "Build custom residual blocks adding input values to outputs.",
      "Implement 1x1 convolutions matching channels during downsamplings.",
      "Stack convolutional networks generating deep architectures.",
      "Apply Batch Normalization steps optimizing convergence speeds.",
      "Train networks classifying datasets."
    ],
    "milestones": [
      "Build basic residual block modules in PyTorch.",
      "Implement Projection blocks scaling input channel dimension sizes.",
      "Assemble complete ResNet-18/ResNet-34 class networks.",
      "Write training loops running updates on CIFAR10.",
      "Analyze accuracy outcomes."
    ],
    "libraries": [
      {
        "name": "torch",
        "desc": "PyTorch deep learning framework for convolutional networks."
      },
      {
        "name": "torchvision.datasets",
        "desc": "CIFAR10 data libraries."
      }
    ],
    "aiPrompt": "Guide me through building ResNet. Explain residual block structures, identity vs projection mappings, batch normalization, and training on CIFAR10.",
    "fileStructure": "resnet_scratch/\n├── model.py\n├── train.py\n├── dataset.py\n└── tests/\n    └── test_resnet.py",
    "architecture": "Input Image -> Conv2D -> BatchNormalizer -> Residual Blocks (Skip Addition) -> Global Average Pool -> Linear Output",
    "quiz": {
      "q1": {
        "question": "What primary problem does the ResNet shortcut connection solve?",
        "options": [
          "It increases input resolution",
          "It mitigates vanishing/exploding gradients in extremely deep networks by letting gradients backpropagate directly through identity mappings (Correct)",
          "It eliminates the need for activation functions"
        ],
        "correct": 1
      },
      "q2": {
        "question": "When is a 1x1 convolution shortcut required in a residual block?",
        "options": [
          "When the block input and output dimensions mismatch in channel size or spatial resolution (Correct)",
          "On every layer of the network",
          "Only on the final linear layer"
        ],
        "correct": 0
      }
    }
  },
  {
    "id": 48,
    "phase": "Phase 14 — Research Reproduction",
    "title": "Vision Transformer",
    "level": "Expert",
    "xp": 500,
    "desc": "Implement a Vision Transformer (ViT) model from scratch. Split source images into patches, project patches into dense embed dimensions, add class tokens and positional vectors, and pass them to standard Transformer encoders.",
    "concepts": [
      "Image Patch Embeddings",
      "Class (CLS) Tokens",
      "Positional Embeddings",
      "Self-Attention over Patches"
    ],
    "features": [
      "Convert images into arrays of distinct grid patches.",
      "Project flat patch vectors into embed dimensions using Linear layers.",
      "Prepend learnable Class (CLS) tokens tracking output representations.",
      "Implement Positional Embeddings adding layout data to patches.",
      "Pass patch sequences through Transformer Encoders for classification."
    ],
    "milestones": [
      "Write patch extractor layers using Convolutional operations.",
      "Build embed layers appending CLS tokens and position vectors.",
      "Construct Transformer Encoder blocks parsing patches.",
      "Implement classification headers yielding final metrics.",
      "Test vision classification metrics on datasets."
    ],
    "libraries": [
      {
        "name": "torch",
        "desc": "PyTorch tensor operations, parameter updates, and neural layers."
      },
      {
        "name": "einops",
        "desc": "Flexible and powerful tensor operations library for reshaping."
      }
    ],
    "aiPrompt": "Explain Vision Transformer (ViT) architectures. Show how images divide into patch sequences, how positional vectors are added, and how Transformer Encoders process outputs.",
    "fileStructure": "vit_scratch/\n├── vit.py\n├── patch.py\n├── train.py\n└── tests/\n    └── test_vit.py",
    "architecture": "Image -> Patch Splitting -> Patch Projection Embed -> CLS token prepend -> Position vectors add -> Transformer Encoder -> MLP Head -> Classification Output",
    "quiz": {
      "q1": {
        "question": "How are spatial image coordinates represented in Vision Transformers (ViT)?",
        "options": [
          "Using pixel coordinates",
          "By adding learnable Positional Embedding vectors to the projected patch embeddings (Correct)",
          "Using external databases"
        ],
        "correct": 1
      },
      "q2": {
        "question": "What is the CLS token in ViTs?",
        "options": [
          "A token indicating compile steps",
          "A learnable vector prepended to the patch sequence that aggregates global image context for final classification (Correct)",
          "An index divider"
        ],
        "correct": 1
      }
    }
  },
  {
    "id": 49,
    "phase": "Phase 14 — Research Reproduction",
    "title": "U-Net",
    "level": "Advanced",
    "xp": 300,
    "desc": "Build a classic U-Net semantic image segmentation architecture. Code contracting paths compressing spatial features, design expanding paths upsampling maps, implement skip connection concatenations, and evaluate predictions.",
    "concepts": [
      "U-Net Contracting Path",
      "Expanding Upsampling Path",
      "Skip Concatenations",
      "Pixel-level Classifications"
    ],
    "features": [
      "Design contracting pathways extracting vision features.",
      "Implement expanding pathways upsampling resolution using transpose convolutions.",
      "Write skip connections concatenating encoder channels onto decoders.",
      "Configure output maps classifying pixels.",
      "Train networks resolving target boundaries."
    ],
    "milestones": [
      "Create contracting block components using Conv2D and MaxPool layers.",
      "Build expanding block components using ConvTranspose2D tools.",
      "Write skip connection layers concatenating features.",
      "Construct complete U-Net class networks parsing outputs.",
      "Run segmentation metrics checks."
    ],
    "libraries": [
      {
        "name": "torch",
        "desc": "PyTorch deep learning framework for convolutional networks."
      },
      {
        "name": "torchvision.transforms",
        "desc": "Resize and align vision inputs."
      }
    ],
    "aiPrompt": "Explain U-Net segmentation. Show contracting downsampling, expanding upsampling, skip layer concatenations, and writing custom Dice/BCE loss calculations.",
    "fileStructure": "unet_scratch/\n├── model.py\n├── train.py\n├── loader.py\n└── tests/\n    └── test_unet.py",
    "architecture": "Input Image -> Contracting Encoder -> Latent Layer -> Expanding Decoder (with skip concatenation) -> 1x1 Conv output -> Sigmoid Map -> Segmented Output",
    "quiz": {
      "q1": {
        "question": "What is the benefit of the U-Net architecture for medical image segmentation?",
        "options": [
          "It does not require training metrics",
          "It uses skip connections to preserve high-resolution local features, allowing precise boundary localization (Correct)",
          "It is faster than standard networks"
        ],
        "correct": 1
      },
      "q2": {
        "question": "How are features joined across contracting and expanding paths in U-Net?",
        "options": [
          "By multiplying values",
          "By concatenating the encoder activation tensor along the channel dimension of the corresponding decoder tensor (Correct)",
          "By running standard additions"
        ],
        "correct": 1
      }
    }
  }
];
