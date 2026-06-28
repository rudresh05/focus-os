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
  // ─── PHASE 1 ──────────────────────────────────────────────────────────
  {
    id: 1,
    phase: "Phase 1 — Python Engineering",
    title: "Linux Command Clone",
    level: "Beginner",
    xp: 100,
    desc: "Recreate core Linux CLI commands in Python. Learn to navigate the filesystem, manipulate files, parse inputs, and handle errors.",
    concepts: ["CLI", "pathlib", "argparse", "Exceptions"],
    features: [
      "Implement basic commands: ls, pwd, cd, mkdir, rm",
      "Implement file utilities: cp, mv, cat",
      "Parse command line flags like -a and -i",
      "Handle missing paths and permissions errors"
    ],
    milestones: [
      "Setup argparse command routing",
      "Build file system utilities with pathlib",
      "Implement error boundaries for safe operations"
    ],
    libraries: [
      { name: "pathlib", desc: "Object-oriented filesystem paths" },
      { name: "argparse", desc: "Command-line argument parser" }
    ],
    aiPrompt: "You are my Python Mentor. I am building a Linux CLI clone. Guide me on setting up argparse and safely navigating folders using pathlib.",
    fileStructure: "cli_clone/\n├── main.py\n├── commands.py\n└── utils.py",
    architecture: "Command line input -> argparse -> pathlib calls -> terminal feedback",
    quiz: {
      q1: {
        question: "Which module is standard for parsing Python CLI options?",
        options: ["os", "sys", "argparse (Correct)", "shutil"],
        correct: 2
      },
      q2: {
        question: "How do you check if a Path object points to a directory?",
        options: ["path.is_dir() (Correct)", "path.type == 'dir'", "path.isDirectory()"],
        correct: 0
      }
    }
  },
  {
    id: 2,
    phase: "Phase 1 — Python Engineering",
    title: "File Indexer",
    level: "Beginner",
    xp: 100,
    desc: "Scan folders recursively, calculate MD5 content hashes, and index metadata in SQLite for rapid search.",
    concepts: ["Recursion", "SQLite", "Hashing", "Generators"],
    features: [
      "Recursive directory scan",
      "MD5 file content hashing for duplicates check",
      "Local relational storage with SQLite3",
      "Filename and checksum-based searching"
    ],
    milestones: [
      "Build recursive folder generator",
      "Calculate MD5 in chunks for memory safety",
      "Setup SQLite metadata table indexer"
    ],
    libraries: [
      { name: "sqlite3", desc: "Built-in serverless relational database" },
      { name: "hashlib", desc: "MD5/SHA cryptographic hashing" }
    ],
    aiPrompt: "You are my Data Storage Mentor. Help me design a SQLite schema and recursion loop for indexing folders and finding duplicate files.",
    fileStructure: "file_indexer/\n├── main.py\n├── indexer.py\n└── database.py",
    architecture: "Crawl Directory -> Hash Files -> Save Metadata to SQLite -> Perform Query Search",
    quiz: {
      q1: {
        question: "What does SQLite run as?",
        options: ["A background server daemon", "A serverless local file database (Correct)", "An in-memory cache only"],
        correct: 1
      },
      q2: {
        question: "Which hashlib method computes the final checksum bytes in hex?",
        options: ["hash.hex()", "hash.hexdigest() (Correct)", "hash.digest_hex()"],
        correct: 1
      }
    }
  },
  {
    id: 3,
    phase: "Phase 1 — Python Engineering",
    title: "Log Analyzer",
    level: "Beginner",
    xp: 100,
    desc: "Parse massive server logs line-by-line using generators to optimize memory, generating top-IP and status code reports.",
    concepts: ["Regex", "Generators", "Memory optimization", "Counter"],
    features: [
      "Lazy log file streaming",
      "Regex matching for IP and status extraction",
      "Aggregated hit counting and IP classification",
      "Generate markdown formatted analysis reports"
    ],
    milestones: [
      "Design access log regex pattern",
      "Implement line generator streaming",
      "Analyze statistics using collections.Counter"
    ],
    libraries: [
      { name: "re", desc: "Regular expression module" },
      { name: "collections", desc: "Counter class for fast counting" }
    ],
    aiPrompt: "You are my Python Mentor. Show me how to write a regex to parse nginx log files line-by-line using memory-safe generators.",
    fileStructure: "log_analyzer/\n├── main.py\n├── parser.py\n└── report.md",
    architecture: "Access Log Stream -> Line Generator -> Regex Matches -> Counter Aggregator -> Markdown File",
    quiz: {
      q1: {
        question: "Why use generators instead of readlines() for massive files?",
        options: ["To speed up CPU clock cycles", "To load only one line at a time in memory (Correct)", "To automatically run in multi-threaded mode"],
        correct: 1
      },
      q2: {
        question: "Which regex symbol matches one or more repetitions of a character?",
        options: ["*", "+ (Correct)", "?"],
        correct: 1
      }
    }
  },
  {
    id: 4,
    phase: "Phase 1 — Python Engineering",
    title: "FastAPI Starter",
    level: "Intermediate",
    xp: 200,
    desc: "Create an asynchronous REST API boilerplate using FastAPI, featuring SQLAlchemy async engine, Alembic migrations, and CORS middleware.",
    concepts: ["FastAPI", "SQLAlchemy", "Alembic", "AsyncIO"],
    features: [
      "Asynchronous request routing",
      "Relational mapping models with SQLAchemy 2.0",
      "Automatic DB migrations setup with Alembic",
      "API request body schema validation using Pydantic"
    ],
    milestones: [
      "Build basic FastAPI app container and healthcheck",
      "Wire up async engine database configuration",
      "Configure Alembic migrations environment"
    ],
    libraries: [
      { name: "fastapi", desc: "Asynchronous REST framework" },
      { name: "sqlalchemy", desc: "SQL Toolkit and Object Relational Mapper" }
    ],
    aiPrompt: "You are my FastAPI Mentor. Help me structure my project directory with Routers, Schemas, and SQLAlchemy async sessions.",
    fileStructure: "app/\n├── main.py\n├── api/\n├── db/\n└── models/",
    architecture: "Client -> FastAPI router -> Service -> Async SQLAlchemy DB Session",
    quiz: {
      q1: {
        question: "What is the default server implementation used to run FastAPI applications?",
        options: ["Gunicorn", "Uvicorn (Correct)", "WSGI"],
        correct: 1
      },
      q2: {
        question: "How does FastAPI perform automated response serialization?",
        options: ["Using raw JSON strings", "Using Pydantic schemas (Correct)", "Using Jinja2 templates"],
        correct: 1
      }
    }
  },
  {
    id: 5,
    phase: "Phase 1 — Python Engineering",
    title: "Authentication Service",
    level: "Intermediate",
    xp: 200,
    desc: "Implement user signup, login, password hashing, JWT tokens lifecycle, and OAuth social login hooks.",
    concepts: ["JWT", "OAuth", "Bcrypt", "Secure cookies"],
    features: [
      "Password hashing using Bcrypt",
      "Access and Refresh JWT tokens creation",
      "Role-based route authorization middleware",
      "SMTP verification email workflows"
    ],
    milestones: [
      "Develop registration and password hashing wrapper",
      "Implement JWT signing and validation mechanisms",
      "Configure OAuth2 login handlers"
    ],
    libraries: [
      { name: "passlib", desc: "Password hashing libraries compatibility" },
      { name: "pyjwt", desc: "JSON Web Token encoding and decoding" }
    ],
    aiPrompt: "You are my Security Mentor. Guide me on generating short-lived JWT access tokens and long-lived refresh tokens securely.",
    fileStructure: "auth_service/\n├── main.py\n├── auth.py\n├── models.py\n└── security.py",
    architecture: "User request -> Bcrypt checking -> Issue JWT Access & Refresh token -> Client cookies",
    quiz: {
      q1: {
        question: "Why should we use bcrypt instead of SHA-256 for password hashing?",
        options: ["Bcrypt is faster", "Bcrypt uses a salt and adaptive work factor to slow brute-force (Correct)", "Bcrypt compresses password length"],
        correct: 1
      },
      q2: {
        question: "Where are JWT access tokens typically sent for authorization?",
        options: ["In the URL parameters", "In the Authorization header as Bearer token (Correct)", "In the request body only"],
        correct: 1
      }
    }
  },
  {
    id: 6,
    phase: "Phase 1 — Python Engineering",
    title: "URL Shortener",
    level: "Intermediate",
    xp: 200,
    desc: "Construct a URL redirection service encoding database integers to Base62 handles, using Redis caching for high speed.",
    concepts: ["Redis", "Base62 Encoding", "Caching", "Rate Limiting"],
    features: [
      "Base62 translation helper utility",
      "Fast database redirection using Redis read-through caching",
      "FastAPI endpoints for shorten and redirect",
      "Redis sliding window rate limiter middleware"
    ],
    milestones: [
      "Create Base62 integer encoder",
      "Establish Redis connection pool and caching decorators",
      "Implement sliding window rate limiting filters"
    ],
    libraries: [
      { name: "redis", desc: "In-memory key-value data structure store client" },
      { name: "pydantic", desc: "Data validation model engine" }
    ],
    aiPrompt: "You are my Backend Performance Mentor. Explain Base62 encoding and how to write a Redis cache filter for redirect endpoints.",
    fileStructure: "url_shortener/\n├── main.py\n├── redis_cache.py\n└── utils.py",
    architecture: "HTTP redirect request -> Redis Cache check -> (Hit -> Redirect) -> (Miss -> DB query -> Cache fill -> Redirect)",
    quiz: {
      q1: {
        question: "Why is Base62 preferred over Base64 for URL shortening?",
        options: ["Base62 is faster", "Base62 omits '+' and '/' symbols which are reserved characters in URLs (Correct)", "Base62 is natively encrypted"],
        correct: 1
      },
      q2: {
        question: "What is a cache miss?",
        options: ["When the caching server goes offline", "When the requested key is not found in the cache (Correct)", "When the cache stores corrupted datasets"],
        correct: 1
      }
    }
  },
  {
    id: 7,
    phase: "Phase 1 — Python Engineering",
    title: "Async Web Crawler",
    level: "Intermediate",
    xp: 250,
    desc: "Crawl web domains concurrently using asyncio and aiohttp, respecting robots.txt and throttling requests.",
    concepts: ["asyncio", "aiohttp", "Queue", "Domain Throttling"],
    features: [
      "Concurrent request worker loops with asyncio",
      "HTTP requests using non-blocking aiohttp clients",
      "Link parsing and extraction using BeautifulSoup",
      "Robots.txt verification checks and crawler delay compliance"
    ],
    milestones: [
      "Build async fetch handler",
      "Create async CrawlQueue router",
      "Implement domain crawling restrictions"
    ],
    libraries: [
      { name: "aiohttp", desc: "Async HTTP client library" },
      { name: "beautifulsoup4", desc: "HTML parsing helper" }
    ],
    aiPrompt: "You are my Concurrency Mentor. Teach me how to use asyncio.Queue and aiohttp.ClientSession to build a robust async web crawler.",
    fileStructure: "crawler/\n├── main.py\n├── async_crawler.py\n└── parser.py",
    architecture: "CrawlQueue -> Worker Tasks -> Async HTTP Fetch -> HTML Parsing -> Save Data & Queue New Links",
    quiz: {
      q1: {
        question: "What is the primary benefit of asyncio in I/O bound web requests?",
        options: ["It executes code on multiple CPU cores", "It yields control during network waiting times, enabling concurrent execution (Correct)", "It compiles python code to binary"],
        correct: 1
      },
      q2: {
        question: "How do you pause execution asynchronously in a coroutine?",
        options: ["time.sleep()", "await asyncio.sleep() (Correct)", "loop.pause()"],
        correct: 1
      }
    }
  },
  {
    id: 8,
    phase: "Phase 1 — Python Engineering",
    title: "Mini Redis",
    level: "Intermediate",
    xp: 250,
    desc: "Build an in-memory key-value database server using raw TCP sockets, support basic SET, GET, DEL commands and TCP protocol.",
    concepts: ["Sockets", "TCP Protocol", "In-memory Storage", "Byte parsing"],
    features: [
      "TCP Server binding raw sockets",
      "Custom text/binary byte protocol parser",
      "Threaded or async socket handlers",
      "Key-value memory dictionary with TTL expirations"
    ],
    milestones: [
      "Bind socket listener and handle connection",
      "Define socket message bytes protocol",
      "Implement TTL background pruning sweepers"
    ],
    libraries: [
      { name: "socket", desc: "Low-level networking interface" },
      { name: "threading", desc: "Thread-based execution module" }
    ],
    aiPrompt: "You are my Networking Mentor. Guide me through binding TCP sockets and parsing bytes incoming from client connections.",
    fileStructure: "mini_redis/\n├── server.py\n├── protocol.py\n└── client.py",
    architecture: "Client TCP connection -> socket listener -> parse custom protocol -> modify memory dict -> TCP response",
    quiz: {
      q1: {
        question: "Which socket system call prepares the host port for incoming connections?",
        options: ["connect()", "listen() (Correct)", "send()"],
        correct: 1
      },
      q2: {
        question: "Why should TCP socket inputs be processed in a loop?",
        options: ["To prevent memory overflow", "Because TCP is a stream-oriented protocol and messages can arrive in fragments (Correct)", "To encrypt the socket connection"],
        correct: 1
      }
    }
  },
  {
    id: 9,
    phase: "Phase 1 — Python Engineering",
    title: "ETL Pipeline",
    level: "Intermediate",
    xp: 250,
    desc: "Build a complete ETL pipeline. Extract CSV data, perform cleaning transformations in Pandas, and load it into PostgreSQL in batches.",
    concepts: ["ETL", "Pandas", "SQLAlchemy", "Batch Ingestion"],
    features: [
      "Extract files from CSV and REST API endpoints",
      "Clean dataframes: handle NaN values, convert types",
      "Schema normalization operations",
      "High performance bulk insertion into PostgreSQL"
    ],
    milestones: [
      "Write data extract scripts",
      "Create pandas pipeline transformations",
      "Configure psycopg2 bulk inserts"
    ],
    libraries: [
      { name: "pandas", desc: "Data analysis and manipulation library" },
      { name: "psycopg2-binary", desc: "Postgres database driver" }
    ],
    aiPrompt: "You are my Data Engineer Mentor. Explain cleaning data using Pandas and utilizing bulk insertion techniques with SQLAlchemy.",
    fileStructure: "etl/\n├── main.py\n├── transform.py\n└── database.py",
    architecture: "Raw File/API -> Pandas transform -> SQLAlchemy bulk engine -> postgresql DWH",
    quiz: {
      q1: {
        question: "Which pandas function removes duplicate rows?",
        options: ["df.remove_duplicates()", "df.drop_duplicates() (Correct)", "df.clear_duplicates()"],
        correct: 1
      },
      q2: {
        question: "What is the primary benefit of bulk database insertions?",
        options: ["It bypasses relational constraints", "It reduces SQL connection roundtrips, raising speed by orders of magnitude (Correct)", "It formats output logs"],
        correct: 1
      }
    }
  },
  {
    id: 10,
    phase: "Phase 1 — Python Engineering",
    title: "Dockerized Backend",
    level: "Intermediate",
    xp: 250,
    desc: "Dockerize a FastAPI application with multi-stage builds, connecting to Postgres and Redis containers using Docker Compose.",
    concepts: ["Docker", "Containers", "Orchestration", "Docker Compose"],
    features: [
      "Multi-stage Dockerfile setup for python apps",
      "Configure dev vs production containers environments",
      "Setup docker-compose.yml coordinating web app, database, and cache",
      "Docker volumes mapping for live code reload"
    ],
    milestones: [
      "Write multi-stage Dockerfile",
      "Build docker-compose yaml configurations",
      "Verify container communications and database migrations"
    ],
    libraries: [
      { name: "docker", desc: "Container virtualization platform" }
    ],
    aiPrompt: "You are my DevOps Mentor. Walk me through configuring a multi-stage Dockerfile and a multi-container Docker Compose pipeline.",
    fileStructure: "project/\n├── app/\n├── Dockerfile\n└── docker-compose.yml",
    architecture: "Docker Compose -> Orchestrates Containers (FastAPI, Redis, PostgreSQL) -> Internals Bridge Network",
    quiz: {
      q1: {
        question: "What is the primary benefit of multi-stage Docker builds?",
        options: ["They run code faster", "They produce smaller final images by omitting build-time dependencies (Correct)", "They enable automatic cloud deployments"],
        correct: 1
      },
      q2: {
        question: "Which docker compose parameter mounts a local folder into a running container?",
        options: ["ports", "volumes (Correct)", "environment"],
        correct: 1
      }
    }
  },

  // ─── PHASE 2 ──────────────────────────────────────────────────────────
  {
    id: 11,
    phase: "Phase 2 — Data Engineering",
    title: "CSV Analytics Engine",
    level: "Intermediate",
    xp: 300,
    desc: "Create an interactive or script-based command line engine to ingest millions of CSV rows, filter, sort, group, and calculate stats using Pandas/NumPy.",
    concepts: ["Pandas", "NumPy", "Data Ingestion", "Aggregations"],
    features: [
      "Low-memory chunked CSV loading",
      "Column typing overrides and missing value calculations",
      "Dynamic group-by and pivot-table aggregations",
      "Calculated stats output via console tables or JSON sheets"
    ],
    milestones: [
      "Develop chunk-based CSV loader",
      "Implement aggregations logic filters",
      "Add pretty table printing utilities"
    ],
    libraries: [
      { name: "pandas", desc: "Data processing framework" },
      { name: "numpy", desc: "Matrix and vector math library" }
    ],
    aiPrompt: "You are my Data Engineer Mentor. Explain how to process a huge 10GB CSV file using chunksize in Pandas without running out of RAM.",
    fileStructure: "csv_engine/\n├── main.py\n└── analyzer.py",
    architecture: "Massive CSV -> Chunked Stream -> Pandas filtering/aggregation -> Output Stats",
    quiz: {
      q1: {
        question: "What parameter enables chunked loading in `pandas.read_csv`?",
        options: ["chunksize (Correct)", "limit", "iterator_mode"],
        correct: 0
      },
      q2: {
        question: "What is a main benefit of NumPy arrays over standard Python lists?",
        options: ["They support mixed types", "They offer contiguous memory allocation and vectorized operations (Correct)", "They are automatically saved to disk"],
        correct: 1
      }
    }
  },
  {
    id: 12,
    phase: "Phase 2 — Data Engineering",
    title: "SQL Query Engine",
    level: "Intermediate",
    xp: 300,
    desc: "Develop a basic SQL parser concepts tool that parses SELECT, FROM, WHERE clauses, and executes them on Python dictionaries.",
    concepts: ["AST Parsing", "SQL Grammar", "Data Filtering"],
    features: [
      "Regex-based or syntax-tree-based query parser",
      "Filter logic matching WHERE rules",
      "Execute join logic on multiple collections",
      "Return formatted list-of-dicts tabular output"
    ],
    milestones: [
      "Implement query string lexer",
      "Build basic WHERE clause filter evaluator",
      "Establish Join operations logic"
    ],
    libraries: [
      { name: "sqlparse", desc: "Non-validating SQL parser library for Python" }
    ],
    aiPrompt: "You are my Compiler Design Mentor. Help me write a query interpreter that parses simple SQL SELECT queries and runs them over in-memory list records.",
    fileStructure: "sql_engine/\n├── query_parser.py\n└── executor.py",
    architecture: "SQL Query Text -> Parse AST -> Filter & Select Python Dicts -> Return Results",
    quiz: {
      q1: {
        question: "What is abstract syntax tree (AST) parsing used for?",
        options: ["To format database tables", "To translate code strings into hierarchical object models (Correct)", "To compress text data"],
        correct: 1
      },
      q2: {
        question: "Which string processing tool is typically used to segment queries in parser lexers?",
        options: ["JSON", "Regular Expressions (Correct)", "Hashing functions"],
        correct: 1
      }
    }
  },
  {
    id: 13,
    phase: "Phase 2 — Data Engineering",
    title: "Data Warehouse ETL",
    level: "Intermediate",
    xp: 300,
    desc: "Design star schemas, build extraction jobs mapping operational DBs to Data Warehouses (OLAP), and execute transformations.",
    concepts: ["Star Schema", "OLAP vs OLTP", "Dimension Tables", "Upserts"],
    features: [
      "Create Dim/Fact PostgreSQL table structures",
      "Implement Incremental Data Load (CDC-like)",
      "Execute surrogate key generation transformations",
      "Build audit logs table to monitor ETL pipeline health"
    ],
    milestones: [
      "Design DWH database star schemas tables",
      "Write ETL load queries with UPSERT (ON CONFLICT)",
      "Add monitoring and error validation tables"
    ],
    libraries: [
      { name: "psycopg2", desc: "Postgres database connector" }
    ],
    aiPrompt: "You are my DWH Architect Mentor. Show me how to load transactional orders into database Fact and Dimension tables utilizing Star Schema patterns.",
    fileStructure: "dwh_etl/\n├── star_schema.sql\n└── load_dwh.py",
    architecture: "OLTP Database -> Incremental Extract -> Transform to Star Schema -> Load OLAP DWH",
    quiz: {
      q1: {
        question: "What table typically stores metrics and foreign keys in a Star Schema?",
        options: ["Dimension Table", "Fact Table (Correct)", "Index Table"],
        correct: 1
      },
      q2: {
        question: "What is the difference between OLTP and OLAP databases?",
        options: ["OLTP is for transactions (write-heavy); OLAP is for analytics (read-heavy) (Correct)", "OLTP is offline; OLAP is online", "They are identical in design"],
        correct: 0
      }
    }
  },
  {
    id: 14,
    phase: "Phase 2 — Data Engineering",
    title: "Airflow Pipeline",
    level: "Advanced",
    xp: 400,
    desc: "Build an Apache Airflow DAG scheduling complex multi-step data pipelines with task dependencies and error alerts.",
    concepts: ["DAGs", "Orchestration", "Task Dependencies", "Backfilling"],
    features: [
      "DAG definitions scheduling execution windows",
      "Integrate PythonOperators and BashOperators",
      "Task branching and failure callback handlers",
      "Store task states locally using Airflow metadata database connections"
    ],
    milestones: [
      "Install and run Airflow standalone instance",
      "Develop modular DAG python tasks",
      "Configure alert hooks on task failures"
    ],
    libraries: [
      { name: "apache-airflow", desc: "Workflow management platform orchestrator" }
    ],
    aiPrompt: "You are my Data Pipelines Mentor. Help me write an Airflow DAG featuring PythonOperators with task dependencies (e.g. task1 >> [task2, task3]).",
    fileStructure: "dags/\n├── etl_dag.py\n└── tasks/etl_helpers.py",
    architecture: "Airflow Scheduler -> Reads DAG -> Triggers Operators Tasks sequentially -> Execution feedback",
    quiz: {
      q1: {
        question: "What does DAG stand for in workflow management?",
        options: ["Data Aggregation Graph", "Directed Acyclic Graph (Correct)", "Distributed Array Group"],
        correct: 1
      },
      q2: {
        question: "How do you define execution orders between task1 and task2 in Airflow?",
        options: ["task1 >> task2 (Correct)", "task1.run_before(task2)", "task1 & task2"],
        correct: 0
      }
    }
  },
  {
    id: 15,
    phase: "Phase 2 — Data Engineering",
    title: "Kafka Streaming Pipeline",
    level: "Advanced",
    xp: 400,
    desc: "Create an event streaming pipeline using Apache Kafka. Write Python producers injecting telemetry and consumers aggregating metrics.",
    concepts: ["Event Streams", "Producers/Consumers", "Kafka Topics", "Serialization"],
    features: [
      "Async Kafka producer sending telemetry data metrics",
      "Kafka consumer group listening to topics partition",
      "Message serialization using JSON/Avro formats",
      "Calculate sliding aggregates (e.g. average load per minute)"
    ],
    milestones: [
      "Setup local Kafka broker using Docker Compose",
      "Code metric telemetry producer client",
      "Build message consumer processing sliding state aggregates"
    ],
    libraries: [
      { name: "confluent-kafka", desc: "High performance client for Apache Kafka" }
    ],
    aiPrompt: "You are my Streaming Architect Mentor. Explain how to write a Kafka consumer group in Python that reads JSON metrics and saves sliding aggregates.",
    fileStructure: "kafka_pipeline/\n├── docker-compose.yml\n├── producer.py\n└── consumer.py",
    architecture: "Telemetry Source -> Producer -> Kafka Topic -> Consumer Group -> Stateful Aggregate -> Storage",
    quiz: {
      q1: {
        question: "What is a key benefit of Kafka partitions?",
        options: ["They encrypt data records", "They enable parallel consumer scaling and load balancing (Correct)", "They compress log archives"],
        correct: 1
      },
      q2: {
        question: "Which Kafka client writes records into topics?",
        options: ["Consumer", "Broker", "Producer (Correct)"],
        correct: 2
      }
    }
  },

  // ─── PHASE 3 ──────────────────────────────────────────────────────────
  {
    id: 16,
    phase: "Phase 3 — Machine Learning",
    title: "Titanic Survival Prediction",
    level: "Intermediate",
    xp: 300,
    desc: "Clean the Titanic dataset, perform Exploratory Data Analysis, and build classification models predicting survival rates.",
    concepts: ["Classification", "EDA", "Data Cleaning", "Scikit-Learn"],
    features: [
      "Impute missing age/embarked variables in Pandas",
      "Conduct correlations mapping survival rates across classes",
      "Train Logistic Regression and Decision Tree classification algorithms",
      "Verify model outputs using Precision/Recall matrices"
    ],
    milestones: [
      "Wrangle null values in tabular features",
      "Encode categorical fields (sex, class, port)",
      "Train classification model and print classification report"
    ],
    libraries: [
      { name: "pandas", desc: "Data processing libraries" },
      { name: "scikit-learn", desc: "Machine Learning models and matrices" }
    ],
    aiPrompt: "You are my ML Classification Mentor. Show me how to preprocess categorical variables and evaluate classifiers on the Titanic dataset.",
    fileStructure: "titanic_ml/\n├── data/\n│   └── titanic.csv\n├── preprocess.py\n└── model.py",
    architecture: "Titanic CSV -> Feature preprocessing -> Classifiers (sklearn) -> Confusion matrix evaluations",
    quiz: {
      q1: {
        question: "What metric evaluates predictions when false positives are critical (e.g. spam detection)?",
        options: ["Recall", "Precision (Correct)", "Mean Absolute Error"],
        correct: 1
      },
      q2: {
        question: "Which encoder maps categories like 'male'/'female' to 0/1 integers?",
        options: ["OneHotEncoder (or LabelEncoder) (Correct)", "MinMaxScaler", "SimpleImputer"],
        correct: 0
      }
    }
  },
  {
    id: 17,
    phase: "Phase 3 — Machine Learning",
    title: "House Price Prediction",
    level: "Intermediate",
    xp: 300,
    desc: "Develop an end-to-end Machine Learning pipeline that cleans dataset metrics, engineers custom features, trains regression models to predict housing prices, and evaluates performance.",
    concepts: ["Feature Engineering", "Regression Models", "Data Validation", "Model Evaluation"],
    features: [
      "Load and preprocess housing datasets using NumPy and Pandas",
      "Conduct Exploratory Data Analysis (EDA) and visualize correlation matrices",
      "Feature engineering: encode categories, scale numerical values, handle missing features",
      "Train multiple regression models (Linear, Decision Trees, Random Forest) in Scikit-learn",
      "Evaluate models using metrics (MSE, RMSE, R-squared)"
    ],
    milestones: [
      "Perform initial EDA and remove extreme outlier records",
      "Build column transformers scaling numeric inputs and one-hot encoding categories",
      "Train baseline models and execute hyperparameter tuning using GridSearch",
      "Develop validation reports comparing model performance metrics"
    ],
    libraries: [
      { name: "scikit-learn", desc: "Machine learning library containing regression algorithms and preprocessing utilities." },
      { name: "numpy", desc: "Fundamental library for scientific computing and array operations." },
      { name: "matplotlib", desc: "Comprehensive library for creating static, animated, and interactive visualizations." }
    ],
    aiPrompt: "You are my Machine Learning Mentor. I am building the \"House Price Prediction\" project. Guide me on: 1. Performing feature engineering (one-hot encoding, feature scaling). 2. Training and evaluating Scikit-learn regressors. Suggest 3 key training goals.",
    fileStructure: "ml_house_prediction/\n├── main.py         # Training and evaluation runner\n├── data_loader.py  # Loading and cleaning datasets\n├── preprocessor.py # Scikit-learn transformers and scaling\n├── model.py        # Model training and hyperparameter search\n└── evaluate.py     # Graph outputs and metric calculations",
    architecture: "Raw Housing Data -> Preprocessing -> Split Train/Test -> Train Regressor -> Hyperparameter Tuning -> Model Evaluation",
    quiz: {
      q1: {
        question: "What does One-Hot Encoding achieve in machine learning preprocessing?",
        options: [
          "It scales numerical features to range from 0 to 1.",
          "It converts categorical variables into a binary matrix format. (Correct)",
          "It removes outlier records from the database."
        ],
        correct: 1
      },
      q2: {
        question: "What does an R-squared value of 0.85 imply about a regression model?",
        options: [
          "The model is correct 85% of the time.",
          "85% of the variance in the target variable is explained by the model's features. (Correct)",
          "The model has an 85% error rate."
        ],
        correct: 1
      }
    }
  },
  {
    id: 18,
    phase: "Phase 3 — Machine Learning",
    title: "Customer Churn Prediction",
    level: "Intermediate",
    xp: 300,
    desc: "Train classifiers to identify customers at risk of churn, focusing on feature importance analysis and model interpretation.",
    concepts: ["Feature engineering", "Classifiers", "Interpretability", "ROC AUC"],
    features: [
      "Construct customer activity tenure and usage features",
      "Train Random Forest and XGBoost classification models",
      "Analyze feature importance scores to map key churn drivers",
      "Plot ROC-AUC curves evaluating probability predictions accuracy"
    ],
    milestones: [
      "Process customer demographics and transaction matrices",
      "Tune model hyperparameters utilizing RandomSearchCV",
      "Export feature importances graphs using Matplotlib"
    ],
    libraries: [
      { name: "xgboost", desc: "Optimized distributed gradient boosting library" },
      { name: "matplotlib", desc: "Data visualization plots layout module" }
    ],
    aiPrompt: "You are my ML Mentor. Explain gradient boosting and how to extract feature importance scores from a trained Random Forest model.",
    fileStructure: "churn_prediction/\n├── preprocess.py\n├── train.py\n└── feature_importance.png",
    architecture: "Customer Records -> Preprocessing -> Train Classifier -> Evaluate Metrics -> Extract Feature Importance",
    quiz: {
      q1: {
        question: "What does a high ROC-AUC score (e.g. 0.90) indicate?",
        options: ["The model has high overfitting error", "The model has excellent capability to distinguish between positive and negative classes (Correct)", "The model requires more input features"],
        correct: 1
      },
      q2: {
        question: "Why are tree-based feature importances useful?",
        options: ["They decrease training runtime", "They help interpret which input features drive predictions the most (Correct)", "They compress database storage"],
        correct: 1
      }
    }
  },
  {
    id: 19,
    phase: "Phase 3 — Machine Learning",
    title: "Credit Card Fraud Detection",
    level: "Advanced",
    xp: 400,
    desc: "Identify fraudulent financial transactions using imbalanced dataset handling techniques like SMOTE and Precision-Recall evaluation.",
    concepts: ["Imbalanced datasets", "SMOTE", "Precision-Recall", "Isolation Forest"],
    features: [
      "Resample imbalanced training datasets using SMOTE",
      "Train classification anomalies model (Isolation Forest / XGBoost)",
      "Design custom thresholds to trade-off fraud recall vs precision",
      "Implement anomaly detection monitoring metrics logs"
    ],
    milestones: [
      "Conduct SMOTE oversampling on transaction data",
      "Train anomaly models detecting out-of-distribution fraud patterns",
      "Evaluate precision-recall curves to optimize decisions threshold"
    ],
    libraries: [
      { name: "imbalanced-learn", desc: "Oversampling and undersampling algorithms toolkit" },
      { name: "scikit-learn", desc: "Relational metrics and preprocessing modules" }
    ],
    aiPrompt: "You are my Security ML Mentor. Guide me on handling highly imbalanced datasets using SMOTE and analyzing precision-recall metrics.",
    fileStructure: "fraud_detector/\n├── main.py\n├── balance.py\n└── model_eval.py",
    architecture: "Fraud CSV -> SMOTE Balancing -> Train Anomaly Classifier -> PR Threshold Optimization",
    quiz: {
      q1: {
        question: "Why is accuracy a poor metric for highly imbalanced datasets (e.g., 99.9% normal transactions)?",
        options: ["It is computationally slow", "A dummy model predicting 'no fraud' always achieves 99.9% accuracy, hiding the fraud (Correct)", "It does not support floats"],
        correct: 1
      },
      q2: {
        question: "What does SMOTE do?",
        options: ["It drops outliers from the dataset", "It synthesizes new examples of the minority class to balance training data (Correct)", "It encrypts transaction records"],
        correct: 1
      }
    }
  },
  {
    id: 20,
    phase: "Phase 3 — Machine Learning",
    title: "Movie Recommendation System",
    level: "Advanced",
    xp: 400,
    desc: "Build collaborative filtering and content-based recommendation engines using matrix factorization or cosine similarity.",
    concepts: ["Collaborative filtering", "Cosine Similarity", "Matrix Factorization", "KNN"],
    features: [
      "User-item rating matrix generation",
      "Implement Cosine Similarity calculating metadata text matches",
      "Collaborative filtering model using Singular Value Decomposition (SVD)",
      "Create API serving top-K recommendations based on user history input"
    ],
    milestones: [
      "Build Sparse rating pivot matrices",
      "Implement Cosine content-matching search indexes",
      "Develop SVD matrix factorization matrix loops"
    ],
    libraries: [
      { name: "scipy", desc: "Scientific computing routines and sparse matrix operations" },
      { name: "scikit-learn", desc: "Cosine similarity and neighborhood algorithms" }
    ],
    aiPrompt: "You are my RecSys Mentor. Teach me collaborative filtering using SVD and content-based filtering with cosine similarity on metadata.",
    fileStructure: "recsys/\n├── content_filter.py\n├── svd_model.py\n└── api.py",
    architecture: "User Ratings Matrix -> Matrix Factorization / Cosine Similarity -> Top-K Nearest Neighbors -> Recommendations List",
    quiz: {
      q1: {
        question: "What recommendation problem refers to lack of ratings for new users or items?",
        options: ["Matrix sparseness", "Cold Start problem (Correct)", "Overfitting loop"],
        correct: 1
      },
      q2: {
        question: "What does cosine similarity measure between two vector embeddings?",
        options: ["The distance between their absolute lengths", "The angle between the vectors, indicating semantic similarity (Correct)", "Their sum product multiplication"],
        correct: 1
      }
    }
  },
  {
    id: 21,
    phase: "Phase 3 — Machine Learning",
    title: "Spam Email Classifier",
    level: "Advanced",
    xp: 400,
    desc: "Wrangle raw email strings, construct NLP feature vectors using TF-IDF, and classify incoming mail as spam or ham.",
    concepts: ["NLP", "TF-IDF", "Naive Bayes", "Text preprocessing"],
    features: [
      "Text normalization: HTML tag removal, tokenization, lemmatization",
      "TF-IDF vectorizer mapping word relevance frequencies",
      "Multinomial Naive Bayes classification model",
      "Predict output probabilities and save pipeline states"
    ],
    milestones: [
      "Write email preprocessor functions using regex",
      "Generate TF-IDF token matrices using Scikit-Learn",
      "Train and save Naive Bayes model parameters"
    ],
    libraries: [
      { name: "nltk", desc: "Natural Language Toolkit for tokenization/stopword lists" },
      { name: "scikit-learn", desc: "TF-IDF Vectorizer and MultinomialNB models" }
    ],
    aiPrompt: "You are my NLP Mentor. Guide me on cleaning email text files and vectorizing them using TF-IDF to feed a Naive Bayes classifier.",
    fileStructure: "spam_classifier/\n├── main.py\n├── pipeline.py\n└── model.pkl",
    architecture: "Raw Email Text -> Tokenize & Lemmatize -> TF-IDF matrix -> Naive Bayes Classifier -> Spam / Ham Label",
    quiz: {
      q1: {
        question: "What is TF-IDF designed to do?",
        options: ["Verify spelling in sentences", "Reflect how important a word is to a document relative to a corpus (Correct)", "Compress text files"],
        correct: 1
      },
      q2: {
        question: "Why is Naive Bayes popular for basic text classification?",
        options: ["It runs deep convolutional loops", "It assumes conditional independence and runs extremely fast on high-dimensional text vectors (Correct)", "It automatically parses grammar"],
        correct: 1
      }
    }
  },
  {
    id: 22,
    phase: "Phase 3 — Machine Learning",
    title: "Resume Classifier",
    level: "Advanced",
    xp: 400,
    desc: "Ingest PDF resumes, classify them into job categories using TF-IDF features and Support Vector Machines (SVM).",
    concepts: ["Text classification", "SVM", "PDF extraction", "Label encoding"],
    features: [
      "Parse text from PDF files using PyPDF2",
      "Multi-class text label preprocessors",
      "Train Support Vector Machine (Linear SVM) classification algorithms",
      "Report metrics: cross-validated F1 score for categories"
    ],
    milestones: [
      "Build pdf text loader client",
      "Implement categorical label encoders",
      "Train SVM models optimizing regularization parameters"
    ],
    libraries: [
      { name: "pypdf2", desc: "PDF files reader library" },
      { name: "scikit-learn", desc: "Support Vector Machines models" }
    ],
    aiPrompt: "You are my NLP Mentor. Explain how to parse text files from PDF resumes and run a multi-class SVM classifier in Scikit-Learn.",
    fileStructure: "resume_ml/\n├── main.py\n├── extractor.py\n└── svm_model.py",
    architecture: "PDF CV -> Text parsing -> TF-IDF vectorization -> Linear SVM Model -> Job Category (e.g. DevOps, Backend)",
    quiz: {
      q1: {
        question: "What metric is best for multi-class classifiers with unbalanced category samples?",
        options: ["Accuracy", "Macro-averaged F1 Score (Correct)", "Mean squared error"],
        correct: 1
      },
      q2: {
        question: "Which kernel is usually preferred for high-dimensional text classification using SVMs?",
        options: ["Radial Basis Function (RBF)", "Linear Kernel (Correct)", "Polynomial Kernel"],
        correct: 1
      }
    }
  },
  {
    id: 23,
    phase: "Phase 3 — Machine Learning",
    title: "Image Classification",
    level: "Advanced",
    xp: 450,
    desc: "Implement a Convolutional Neural Network (CNN) in PyTorch to classify image categories (like CIFAR-10) using data augmentations.",
    concepts: ["PyTorch CNN", "Convolutions", "DataLoader", "Augmentations"],
    features: [
      "Image normalization and torchvision transformations augmentations",
      "Define PyTorch CNN model inheriting nn.Module",
      "Training loop tracking CrossEntropyLoss over epochs",
      "Run evaluation steps mapping accuracy outputs on validation sets"
    ],
    milestones: [
      "Setup PyTorch Dataset loaders",
      "Write CNN structure containing Conv2d and MaxPool2d layers",
      "Design backpropagation loops"
    ],
    libraries: [
      { name: "torch", desc: "PyTorch Deep Learning engine framework" },
      { name: "torchvision", desc: "Image datasets and transforms toolkit" }
    ],
    aiPrompt: "You are my Computer Vision Mentor. Explain PyTorch Conv2D strides, padding, and building backpropagation loops for image classifiers.",
    fileStructure: "image_cnn/\n├── main.py\n├── network.py\n└── dataset.py",
    architecture: "Image Matrix -> Convolutions & MaxPool -> Flatten -> Dense Linear Layer -> Softmax Predictions",
    quiz: {
      q1: {
        question: "What does a MaxPool2D layer do?",
        options: ["Increases the number of channels", "Reduces spatial dimensions of features map, keeping key info and cutting parameters (Correct)", "Applies activation functions"],
        correct: 1
      },
      q2: {
        question: "Which function backpropagates loss gradients in PyTorch?",
        options: ["loss.backward() (Correct)", "optimizer.step()", "loss.zero_grad()"],
        correct: 0
      }
    }
  },
  {
    id: 24,
    phase: "Phase 3 — Machine Learning",
    title: "Object Detection",
    level: "Advanced",
    xp: 450,
    desc: "Load pretrained YOLO models, capture video frames, draw bounding boxes around target objects, and evaluate frame rates.",
    concepts: ["YOLO", "Computer Vision", "Bounding Boxes", "FPS Benchmarking"],
    features: [
      "Load pretrained YOLO weights from Ultralytics",
      "Ingest video feeds using OpenCV frames capture",
      "Map object class label bounding boxes to target areas",
      "Benchmarking processing FPS speeds across frames"
    ],
    milestones: [
      "Integrate Ultralytics YOLO models pipeline",
      "Setup OpenCV webcam video listener loop",
      "Render bounding box overlays and text classes label"
    ],
    libraries: [
      { name: "ultralytics", desc: "YOLO object detection API framework" },
      { name: "opencv-python", desc: "Image processing video capture client" }
    ],
    aiPrompt: "You are my Vision Mentor. Guide me on running YOLOv8 inferences on video frames and extracting coordinate arrays for bounding boxes.",
    fileStructure: "yolo_detector/\n├── main.py\n└── config.py",
    architecture: "Webcam Frame -> YOLO inference -> Parse Box Coordinates -> OpenCV draw overlay -> Output Display",
    quiz: {
      q1: {
        question: "What makes YOLO suited for real-time object detection?",
        options: ["It splits detection into multiple steps", "It makes bounding box and class predictions in a single pass of the network (Correct)", "It runs without a GPU"],
        correct: 1
      },
      q2: {
        question: "What does Non-Maximum Suppression (NMS) do in object detection?",
        options: ["Scales image contrast", "Eliminates redundant overlapping bounding boxes for the same object (Correct)", "Increases resolution"],
        correct: 1
      }
    }
  },
  {
    id: 25,
    phase: "Phase 3 — Machine Learning",
    title: "Time Series Forecasting",
    level: "Advanced",
    xp: 450,
    desc: "Forecast stock or weather indicators using statistical (Prophet) and deep learning (LSTM) sequential models.",
    concepts: ["LSTM/Prophet", "Seasonality", "Time Series", "Lag Features"],
    features: [
      "Create rolling lag features on time series datasets",
      "Fit statistical forecasting models with Meta Prophet",
      "Implement deep learning sequential LSTM models in PyTorch",
      "Compare model performances using MAE and MAPE indicators"
    ],
    milestones: [
      "Construct dataset timeseries structures and features",
      "Fit Prophet models measuring seasonality trends",
      "Build training loops for sequential PyTorch LSTM cells"
    ],
    libraries: [
      { name: "prophet", desc: "Meta's forecasting package for seasonality time-series" },
      { name: "torch", desc: "PyTorch deep learning network framework" }
    ],
    aiPrompt: "You are my Time Series Mentor. Explain building lag features and training PyTorch LSTM networks on historical stock prices data.",
    fileStructure: "ts_forecast/\n├── main.py\n├── prep.py\n└── lstm_net.py",
    architecture: "Historical Sequence -> Preprocess & Lag features -> Train Prophet/LSTM -> Predict Future Horizon",
    quiz: {
      q1: {
        question: "What time series characteristic refers to repeating patterns at fixed intervals (e.g. daily, weekly)?",
        options: ["Trend", "Seasonality (Correct)", "Noise"],
        correct: 1
      },
      q2: {
        question: "Why are LSTMs preferred over Standard RNNs for long time series sequences?",
        options: ["LSTMs are faster to train", "LSTMs use gates to mitigate the vanishing gradient problem, learning long-term dependencies (Correct)", "LSTMs don't require float matrices"],
        correct: 1
      }
    }
  },

  // ─── PHASE 4 ──────────────────────────────────────────────────────────
  {
    id: 26,
    phase: "Phase 4 — Deep Learning",
    title: "MNIST Digit Recognition",
    level: "Advanced",
    xp: 400,
    desc: "Construct a Multi-Layer Perceptron (MLP) from scratch in NumPy, writing the feedforward, backpropagation, and weight updates yourself.",
    concepts: ["Neural Networks", "Backpropagation", "Matrix Math", "Gradient Descent"],
    features: [
      "MNIST raw dataset byte loader",
      "Manual matrix weights initialization matching layers sizes",
      "Implement activation functions (Sigmoid, Relu, Softmax)",
      "Derive backpropagation gradient updates from scratch"
    ],
    milestones: [
      "Write NumPy feedforward vector loops",
      "Write backpropagation equations calculating hidden layer deltas",
      "Train model on digits and plot accuracy decay curves"
    ],
    libraries: [
      { name: "numpy", desc: "Fundamental array and matrix math library" }
    ],
    aiPrompt: "You are my Deep Learning Math Mentor. Help me write the matrix backpropagation equations from scratch in NumPy for a 3-layer neural network.",
    fileStructure: "mnist_scratch/\n├── main.py\n└── nn_numpy.py",
    architecture: "Image Vector (784) -> Hidden Weights Matrix -> Activation -> Output Layer -> CrossEntropy -> Backprop Update",
    quiz: {
      q1: {
        question: "What is the derivative of the Sigmoid activation function σ(x)?",
        options: ["σ(x)(1 - σ(x)) (Correct)", "1 - σ(x)", "σ(x)^2"],
        correct: 0
      },
      q2: {
        question: "What does backpropagation calculate?",
        options: ["The output predictions vector", "The gradients of the loss function with respect to weights and biases (Correct)", "The execution runtime limit"],
        correct: 1
      }
    }
  },
  {
    id: 27,
    phase: "Phase 4 — Deep Learning",
    title: "Face Recognition",
    level: "Advanced",
    xp: 400,
    desc: "Construct a face tracking pipeline using OpenCV Cascade Classifiers or pretrained face-recognition models, matching incoming frames against database targets.",
    concepts: ["OpenCV", "Facial Embeddings", "Cascades", "Metric Matching"],
    features: [
      "Detect facial boxes boundaries in frames using Haar Cascades",
      "Generate 128-dimensional facial embedding vectors",
      "L2 distance comparison logic identifying database match matches",
      "Webcam processing overlay rendering real-time matching indicators"
    ],
    milestones: [
      "Write face detector scripts using OpenCV",
      "Extract embeddings vectors using FaceRecognition/Dlib tools",
      "Build metric matches threshold comparator"
    ],
    libraries: [
      { name: "opencv-python", desc: "Computer vision image manipulations" },
      { name: "face-recognition", desc: "Pre-trained facial feature models wrapper" }
    ],
    aiPrompt: "You are my Vision Mentor. Guide me on running facial detection pipelines, compiling database embedding lists, and comparing target vectors.",
    fileStructure: "face_recognition/\n├── main.py\n├── faces_db/\n└── matcher.py",
    architecture: "Frame input -> Detect Face box -> Generate Face Embedding -> Compare L2 distance -> Overlay Match Label",
    quiz: {
      q1: {
        question: "What does a facial embedding vector represent?",
        options: ["A compressed ZIP file of the face", "A set of spatial features coordinates representing unique facial characteristics (Correct)", "The pixel density matrix of the eyes"],
        correct: 1
      },
      q2: {
        question: "Which distance metric is standard to compare embedding vectors?",
        options: ["Cosine Similarity or Euclidean (L2) Distance (Correct)", "Levenshtein distance", "Manhattan distance"],
        correct: 0
      }
    }
  },
  {
    id: 28,
    phase: "Phase 4 — Deep Learning",
    title: "Neural Style Transfer",
    level: "Advanced",
    xp: 450,
    desc: "Apply the artistic style of a target content painting to input photos using VGG-19 features maps loss optimization in PyTorch.",
    concepts: ["CNN", "VGG-19", "Style Loss", "Content Loss"],
    features: [
      "Load pretrained VGG-19 network and slice target feature layers",
      "Implement Content Loss measuring mean-squared distance of features",
      "Implement Style Loss using Gram Matrix differences of layers",
      "Optimizer loops updating target image pixels directly"
    ],
    milestones: [
      "Write Image preprocessor scaling tensors",
      "Implement Gram Matrix calculation equations",
      "Design loss optimization loops modifying inputs directly"
    ],
    libraries: [
      { name: "torch", desc: "PyTorch Deep Learning framework" },
      { name: "torchvision", desc: "Pretrained model hubs and image loaders" }
    ],
    aiPrompt: "You are my Generative AI Mentor. Guide me on extracting intermediate layers from VGG-19 and building Gram Matrices to compute Style Loss.",
    fileStructure: "style_transfer/\n├── main.py\n├── vgg_model.py\n└── utils.py",
    architecture: "Content/Style Input -> VGG19 Extraction -> Content Loss + Style Loss (Gram Matrix) -> Gradient Backprop -> Update Input Image Pixels",
    quiz: {
      q1: {
        question: "What does the Gram Matrix represent in Style Transfer?",
        options: ["The spatial coordinates of image contours", "The correlations between different feature channels, capturing texture and style (Correct)", "The compression ratio of the VGG layers"],
        correct: 1
      },
      q2: {
        question: "In Style Transfer, what is optimized?",
        options: ["The model weights of VGG-19", "The pixel values of the target generated image directly (Correct)", "The learning rate scheduling"],
        correct: 1
      }
    }
  },
  {
    id: 29,
    phase: "Phase 4 — Deep Learning",
    title: "Image Caption Generator",
    level: "Advanced",
    xp: 450,
    desc: "Build an encoder-decoder neural network merging CNN (image features extraction) with a Transformer (caption text generation).",
    concepts: ["CNN + Transformer", "Image Embeddings", "Sequence Models", "Attention"],
    features: [
      "Image features extractor using pretrained ResNet/ViT models",
      "Tokenize and embed text caption sequences",
      "Decoder Transformer taking image features and generating words",
      "Inferences using Beam Search or greedy decoding algorithms"
    ],
    milestones: [
      "Develop image feature extractor steps",
      "Write Transformer decoder model matching inputs shapes",
      "Design autoregressive validation prediction loops"
    ],
    libraries: [
      { name: "torch", desc: "PyTorch deep learning model compiler" },
      { name: "transformers", desc: "Tokenizers and model layer modules wrapper" }
    ],
    aiPrompt: "You are my Multimodal Mentor. Guide me through merging ResNet CNN output features with a Transformer decoder sequence loader.",
    fileStructure: "caption_generator/\n├── model.py\n├── dataset.py\n└── inference.py",
    architecture: "Image -> CNN Encoder -> Feature Vector -> Transformer Decoder -> Autoregressive Caption Generation",
    quiz: {
      q1: {
        question: "What is the role of the CNN in image captioning?",
        options: ["To predict the next word directly", "To act as an encoder extracting rich visual feature maps (Correct)", "To apply style formatting to text"],
        correct: 1
      },
      q2: {
        question: "Which decoding strategy tracks multiple top sequence candidates at each step for better text predictions?",
        options: ["Greedy Search", "Beam Search (Correct)", "Random Choice"],
        correct: 1
      }
    }
  },
  {
    id: 30,
    phase: "Phase 4 — Deep Learning",
    title: "Speech Recognition",
    level: "Advanced",
    xp: 450,
    desc: "Ingest microphone inputs, process audio wave files, and translate speech using OpenAI Whisper models locally.",
    concepts: ["Whisper", "Audio Ingestion", "Spectrograms", "Sequence Translation"],
    features: [
      "Local audio recording tools capturing stream arrays",
      "Audio preprocessing matching format structures (16kHz mono)",
      "Run OpenAI Whisper inferences locally",
      "Timestamp alignments mapping text chunks to audio durations"
    ],
    milestones: [
      "Build audio recorders using SoundDevice or pyaudio",
      "Integrate local Whisper model runners",
      "Write transcribers mapping outputs to files"
    ],
    libraries: [
      { name: "openai-whisper", desc: "Robust speech-to-text models locally runnable" },
      { name: "sounddevice", desc: "Microphone recording client for numpy arrays" }
    ],
    aiPrompt: "You are my Speech ML Mentor. Guide me on formatting audio signals to 16kHz mono arrays and running local Whisper model inferences.",
    fileStructure: "speech_transcriber/\n├── main.py\n└── transcriber.py",
    architecture: "Mic Input -> Numpy Audio Array -> Resample -> Whisper Model -> Token Decoder -> Text Transcript",
    quiz: {
      q1: {
        question: "What is the standard audio sample rate expected by Whisper models?",
        options: ["44.1 kHz", "16 kHz (Correct)", "8 kHz"],
        correct: 1
      },
      q2: {
        question: "What visual audio representation does Whisper convert raw waveforms to before processing?",
        options: ["Log-Mel Spectrogram (Correct)", "Fourier Phase Envelope", "Wavelet coefficients"],
        correct: 0
      }
    }
  },
  {
    id: 31,
    phase: "Phase 4 — Deep Learning",
    title: "Text Summarizer",
    level: "Advanced",
    xp: 450,
    desc: "Fine-tune pretrained sequence-to-sequence transformers (like BART or T5) to summarize long documents.",
    concepts: ["Transformers", "Seq2Seq Models", "Fine-tuning", "ROUGE Score"],
    features: [
      "Tokenize long documents using HuggingFace tokenizers",
      "Setup training datasets matching Seq2Seq formats",
      "Fine-tune T5/BART model using Trainer API",
      "Evaluate summaries generated using ROUGE validation metrics"
    ],
    milestones: [
      "Setup HuggingFace datasets transformers pipeline",
      "Configure Seq2SeqTrainer pipelines parameter setups",
      "Evaluate predictions output against target baseline summaries"
    ],
    libraries: [
      { name: "transformers", desc: "HuggingFace transformer model hub and training APIs" },
      { name: "evaluate", desc: "Metric scoring libraries including ROUGE" }
    ],
    aiPrompt: "You are my NLP Mentor. Walk me through configuring a HuggingFace Seq2SeqTrainer pipeline to fine-tune a T5 model for summary generation.",
    fileStructure: "summarizer/\n├── main.py\n├── train.py\n└── test_eval.py",
    architecture: "Long Document -> Tokenizer -> Seq2Seq Transformer (T5) -> Decoder Token Generation -> Summary Output",
    quiz: {
      q1: {
        question: "What metric is standard for evaluating text summarization models by comparing overlapping n-grams?",
        options: ["BLEU Score", "ROUGE Score (Correct)", "F1 Accuracy"],
        correct: 1
      },
      q2: {
        question: "Which model architecture is BART/T5?",
        options: ["Encoder-only", "Decoder-only", "Encoder-Decoder (Seq2Seq) (Correct)"],
        correct: 2
      }
    }
  },

  // ─── PHASE 5 ──────────────────────────────────────────────────────────
  {
    id: 32,
    phase: "Phase 5 — LLM Engineering",
    title: "AI PDF Chat",
    level: "Advanced",
    xp: 450,
    desc: "Build a document processing system using Vector Databases, Embeddings, and LLMs to talk directly to PDF files.",
    concepts: ["LangChain", "Vector Databases", "Embeddings", "RAG Pipeline", "Conversational Memory"],
    features: [
      "Extract and clean text feeds from multi-page PDF documents",
      "Split documents into semantically coherent text chunks",
      "Generate mathematical vector embeddings from parsed chunks",
      "Store vector definitions in ChromaDB for fast distance calculations",
      "Construct a conversation pipeline passing relevant chunks to LLMs"
    ],
    milestones: [
      "Install langchain modules and setup document parsers",
      "Write a text splitter using smart overlapping character counters",
      "Configure vector search databases locally on the host machine",
      "Assemble retrieval chains merging vector results with LLM questions"
    ],
    libraries: [
      { name: "langchain", desc: "Framework to glue together LLMs, vector search, and prompt pipelines." },
      { name: "pypdf", desc: "Parsing engine designed to extract text contents out of PDF files." },
      { name: "chromadb", desc: "In-memory AI vector embedding storage engine." }
    ],
    aiPrompt: "You are my AI Engineer Mentor. I am building the \"AI PDF Chat\" project. Explain: 1. Selecting the ideal text chunk sizes and overlap margins for RAG pipelines. 2. Setting up and querying local ChromaDB vector databases. Outline the general RAG request pattern and outline 3 debugging milestones.",
    fileStructure: "pdf_chat/\n├── app.py          # Streamlit user interface or console wrapper\n├── parser.py       # PDF document loading & recursive chunk splitter\n├── vectorstore.py  # Chroma DB vector client settings & storage loader\n└── chatbot.py      # LangChain model configuration, QA chain & memory loops",
    architecture: "Upload PDF -> Chunk text -> Calculate Embeddings -> Save to ChromaDB\nQuery -> Vector Search -> Retrieve Top Chunks -> Merge context with Prompt -> LLM response",
    quiz: {
      q1: {
        question: "What is the main purpose of splitting text into chunks before writing to vector databases?",
        options: [
          "To translate different languages to a single standard structure.",
          "To match LLM context limit bounds and preserve local context relationships. (Correct)",
          "To compress document file sizes."
        ],
        correct: 1
      },
      q2: {
        question: "In Generative AI, what does a vector embedding represent?",
        options: [
          "The file storage path on a hard drive.",
          "The semantic context and meaning of text represented as a set of coordinates in space. (Correct)",
          "A compressed ZIP package of the document text."
        ],
        correct: 1
      }
    }
  },
  {
    id: 33,
    phase: "Phase 5 — LLM Engineering",
    title: "AI Research Assistant",
    level: "Advanced",
    xp: 450,
    desc: "Retrieve academic research papers, index them in vector space, and summarize content with citations.",
    concepts: ["Search + RAG", "Citations", "arXiv API", "Multi-Query"],
    features: [
      "Fetch documents dynamically using arXiv REST API wrapper",
      "Chunk and index papers in Qdrant or Chroma VectorDB",
      "Implement Multi-Query expansion mapping multiple user perspectives",
      "Output summaries detailing sources and specific paragraph citations"
    ],
    milestones: [
      "Build arXiv search pipeline",
      "Setup Qdrant Vector store loader",
      "Implement multi-query parsing templates"
    ],
    libraries: [
      { name: "arxiv", desc: "Python wrapper around arXiv academic API" },
      { name: "qdrant-client", desc: "Qdrant vector engine database connector" }
    ],
    aiPrompt: "You are my RAG Mentor. Explain query expansion and how to return citations mapping chunk sources directly to answers.",
    fileStructure: "research_assistant/\n├── main.py\n├── arxiv_fetch.py\n└── rag_engine.py",
    architecture: "User Query -> Query Expansion -> arXiv API search -> Vector DB Index -> Context-enriched LLM summary",
    quiz: {
      q1: {
        question: "What does Query Expansion resolve in semantic searches?",
        options: ["Slow query execution runtimes", "Vocabulary mismatch by generating synonyms or multi-phrase query variants (Correct)", "Database storage costs"],
        correct: 1
      },
      q2: {
        question: "Why are citations important in Enterprise RAG systems?",
        options: ["They decrease the cost of API calls", "They build trust and let users audit model outputs for hallucinations (Correct)", "They compress embedding lengths"],
        correct: 1
      }
    }
  },
  {
    id: 34,
    phase: "Phase 5 — LLM Engineering",
    title: "AI Code Reviewer",
    level: "Advanced",
    xp: 450,
    desc: "Build a tool that reviews repository source code using LLMs, analyzes file changes, flags security issues, checks styling rules, and proposes improvements.",
    concepts: ["Git Integration", "Prompt Engineering", "Static Analysis", "Large Language Models"],
    features: [
      "Interface with git to scan changed files or branch differences",
      "Build structured prompts containing system rules and codebase context",
      "Review code changes for potential bugs, security holes, and code complexity",
      "Stream structured markdown code review responses back to the user",
      "Generate local report files highlighting code quality ratings"
    ],
    milestones: [
      "Build Python scripts invoking git commands to extract diff outputs",
      "Setup integration client connections to OpenAI or Google Gemini APIs",
      "Draft prompt templates specifying code review guidelines",
      "Parse LLM suggestions and display them in terminal or HTML output files"
    ],
    libraries: [
      { name: "google-genai", desc: "Official SDK to access Google Gemini models." },
      { name: "gitpython", desc: "Library used to interact with Git repositories." }
    ],
    aiPrompt: "You are my AI Code Review Mentor. I am building the \"AI Code Reviewer\". Explain: 1. Processing git diff outputs inside Python. 2. Engineering effective system prompts for code evaluation. Outline 3 initial development checkpoints.",
    fileStructure: "ai_code_reviewer/\n├── main.py         # Entry point and CLI runner\n├── git_client.py   # Extracts repository file diffs\n├── reviewer.py     # Connects to LLM and executes prompts\n└── reporter.py     # Generates output review files",
    architecture: "Git Repository -> Extract Diff -> Review Prompt Template -> LLM API -> Parse Recommendations -> Review Report",
    quiz: {
      q1: {
        question: "What Git command is run under GitPython to extract changes between the current staging index and last commit?",
        options: [
          "git clone",
          "git status",
          "git diff (Correct)"
        ],
        correct: 2
      },
      q2: {
        question: "Why should you use structured prompt schemas (like JSON response types) when interacting with LLMs in software pipelines?",
        options: [
          "To encrypt LLM answers.",
          "To ensure the output is in a predictable format that your code can reliably parse. (Correct)",
          "To speed up model generation time."
        ],
        correct: 1
      }
    }
  },
  {
    id: 35,
    phase: "Phase 5 — LLM Engineering",
    title: "RAG Search Engine",
    level: "Advanced",
    xp: 450,
    desc: "Build a search engine merging semantic vector lookups with keyword matching (BM25) using Reciprocal Rank Fusion (RRF).",
    concepts: ["Hybrid Search", "Vector DB", "BM25", "RRF"],
    features: [
      "Keyword matching indexed with BM25",
      "Vector embeddings search using local ChromaDB",
      "Merge ranking scores utilizing Reciprocal Rank Fusion (RRF) algorithms",
      "Execute LLM synthesis using the top-k fused results"
    ],
    milestones: [
      "Implement BM25 text indexer",
      "Configure Chroma vector matching pipeline",
      "Develop RRF mathematical rank combiner code"
    ],
    libraries: [
      { name: "rank_bm25", desc: "Pure python implementation of BM25 scoring algorithm" },
      { name: "chromadb", desc: "Local vector search database client" }
    ],
    aiPrompt: "You are my Search Systems Mentor. Explain Reciprocal Rank Fusion (RRF) and how to merge BM25 search rankings with semantic vector scores.",
    fileStructure: "search_engine/\n├── indexer.py\n├── search_fuser.py\n└── main.py",
    architecture: "User Query -> Parallel (BM25 Search & Vector Search) -> RRF Merger -> Top Fused Context -> LLM synthesis",
    quiz: {
      q1: {
        question: "What is Hybrid Search in RAG?",
        options: ["Running searches on multiple computers", "Combining traditional keyword matching (lexical) with vector embeddings (semantic) search (Correct)", "Searching both text and images simultaneously"],
        correct: 1
      },
      q2: {
        question: "What does Reciprocal Rank Fusion (RRF) resolve?",
        options: ["It encrypts database items", "It normalizes and combines ranking positions from different search systems without requiring score normalization (Correct)", "It speeds up network requests"],
        correct: 1
      }
    }
  },
  {
    id: 36,
    phase: "Phase 5 — LLM Engineering",
    title: "Multi-document QA",
    level: "Advanced",
    xp: 450,
    desc: "Design a QA pipeline querying multiple folders of documents, using parent-child retrieval or metadata filters.",
    concepts: ["Embeddings", "Parent-Child Retrieval", "Hierarchical Chunking", "Metadata filtering"],
    features: [
      "Hierarchical text chunking: split parent documents into child nodes",
      "Retrieve full parent chunks when matching smaller child vectors",
      "Dynamically filter metadata attributes inside Vector database queries",
      "Handle chat history context mappings across multi-document QA loops"
    ],
    milestones: [
      "Setup parent-child hierarchical chunk splitters",
      "Implement metadata filter arguments in queries",
      "Assemble RAG chains merging contextual histories"
    ],
    libraries: [
      { name: "langchain", desc: "RAG components orchestration framework" },
      { name: "qdrant-client", desc: "Qdrant vector engine database client" }
    ],
    aiPrompt: "You are my Advanced RAG Mentor. Teach me parent-child vector index setups where smaller chunk matches return broader parent texts to the LLM.",
    fileStructure: "multi_qa/\n├── chunkers.py\n├── retriever.py\n└── app.py",
    architecture: "User Query -> Match Child Chunk -> Retrieve Parent Chunk -> Build Prompt Context -> LLM Answer",
    quiz: {
      q1: {
        question: "What is a main advantage of Parent-Child retrieval?",
        options: ["It reduces vector embedding lengths", "It allows precise semantic matching on small sentences, while feeding larger context windows to LLMs (Correct)", "It runs without embedding models"],
        correct: 1
      },
      q2: {
        question: "What is metadata filtering in Vector Databases?",
        options: ["Adding tags to index files", "Restricting search results to records matching specific non-vector criteria (e.g. date, author) (Correct)", "Calculating compression coefficients"],
        correct: 1
      }
    }
  },
  {
    id: 37,
    phase: "Phase 5 — LLM Engineering",
    title: "SQL Agent",
    level: "Advanced",
    xp: 500,
    desc: "Build an LLM system translating natural language queries to SQL commands, executing them on SQLite, and returning summarized results.",
    concepts: ["NL -> SQL", "SQL Injection Protection", "Schema prompts", "Self-correction"],
    features: [
      "Dynamic database schema parsing and prompt construction",
      "Validate generated SQL syntax safely inside sandbox environments",
      "Self-correction loop rebuilding queries on SQL execution error exceptions",
      "Markdown formatting of output tables summaries"
    ],
    milestones: [
      "Write dynamic schema extractor utilities",
      "Configure LLM parser generating SQL text syntax",
      "Build recursive self-correcting error executors loops"
    ],
    libraries: [
      { name: "langchain", desc: "Agent runtimes and database connectors" },
      { name: "sqlite3", desc: "Local database engine" }
    ],
    aiPrompt: "You are my Agent Systems Mentor. Guide me on writing system prompts containing database schemas and implementing self-correction loops when SQL queries fail.",
    fileStructure: "sql_agent/\n├── agent.py\n├── schema_reader.py\n└── db_executor.py",
    architecture: "Natural Language -> Schema context -> LLM -> SQL syntax -> Run DB -> (Error -> Correct loop) -> Summarize output",
    quiz: {
      q1: {
        question: "How do you protect database SQL agents from destructive commands?",
        options: ["By encrypting query strings", "By using read-only database connections and limiting transaction scopes (Correct)", "By running queries faster"],
        correct: 1
      },
      q2: {
        question: "What is a self-correction loop in SQL agents?",
        options: ["Rebooting the database", "Feeding SQL error logs back to the LLM to rewrite and fix the query syntax (Correct)", "Compressing table index"],
        correct: 1
      }
    }
  },
  {
    id: 38,
    phase: "Phase 5 — LLM Engineering",
    title: "Vision Chatbot",
    level: "Advanced",
    xp: 500,
    desc: "Create an interactive chatbot accepting image file uploads and describing details, identifying anomalies using Multimodal models (Gemini/OpenAI Vision APIs).",
    concepts: ["Vision Models", "Multimodality", "Image base64 encoding"],
    features: [
      "Image ingestion pipelines encoding files to base64 formats",
      "Multimodal prompt templates merging text questions with images",
      "Stream vision models response feeds",
      "Chat history storage including text and image thumbnail references"
    ],
    milestones: [
      "Setup image base64 encoder client helper",
      "Configure API payload structure containing image blocks",
      "Build chat UI rendering output text feeds"
    ],
    libraries: [
      { name: "google-genai", desc: "Official SDK to access Gemini Multimodal models" },
      { name: "pillow", desc: "Image file loader and formatting tools" }
    ],
    aiPrompt: "You are my Vision AI Mentor. Explain how to format image bytes to base64 and structure API calls to Gemini Vision models.",
    fileStructure: "vision_bot/\n├── app.py\n├── encoder.py\n└── main.py",
    architecture: "User Image Upload -> Convert to base64 -> Package with User Text Prompt -> Multimodal LLM API -> Text Stream Response",
    quiz: {
      q1: {
        question: "What characterizes a Multimodal LLM?",
        options: ["It runs on multiple CPUs", "It accepts inputs from different formats (e.g. text, images, audio) (Correct)", "It translates text to binary code"],
        correct: 1
      },
      q2: {
        question: "Why encode image files to base64 strings when sending payloads?",
        options: ["To compress the image size", "To safely transmit binary image data within standard text JSON payloads (Correct)", "To encrypt images contents"],
        correct: 1
      }
    }
  },
  {
    id: 39,
    phase: "Phase 5 — LLM Engineering",
    title: "Voice Assistant",
    level: "Advanced",
    xp: 500,
    desc: "Develop a voice-to-voice interactive loop: record audio, transcribe with Whisper, query LLMs, and synthesize voice responses using Text-to-Speech (TTS).",
    concepts: ["Speech + LLM", "STT", "TTS", "Latency optimization"],
    features: [
      "Local audio streaming recorder",
      "Fast Speech-To-Text transcription mapping",
      "Concurrent streaming of LLM response inputs into Text-To-Speech (TTS) engines",
      "Audio playback handlers managing output buffers"
    ],
    milestones: [
      "Configure sounddevice audio input record queues",
      "Wire up Whisper STT and TTS API pipelines",
      "Optimize thread pipelines minimizing response lag times"
    ],
    libraries: [
      { name: "gtts", desc: "Google Text-to-Speech library or alternatives" },
      { name: "openai", desc: "API clients for Audio engines (Whisper/TTS)" }
    ],
    aiPrompt: "You are my Voice Systems Mentor. Explain latency optimization pipelines in voice loops where LLM text feeds stream directly into TTS queues.",
    fileStructure: "voice_assistant/\n├── main.py\n├── audio_utils.py\n└── chat_pipeline.py",
    architecture: "User Speech -> Audio Buffer -> STT (Whisper) -> Text Query -> LLM -> Text Stream -> TTS Engine -> Audio Playback",
    quiz: {
      q1: {
        question: "What is the primary bottleneck in building natural voice assistants?",
        options: ["Audio compression quality", "Latency (time lag) across STT -> LLM -> TTS pipeline stages (Correct)", "Database storage speed"],
        correct: 1
      },
      q2: {
        question: "What does TTS stand for?",
        options: ["Text to Speech (Correct)", "Token Transaction Speed", "Time to Start"],
        correct: 0
      }
    }
  },

  // ─── PHASE 6 ──────────────────────────────────────────────────────────
  {
    id: 40,
    phase: "Phase 6 — Agentic AI",
    title: "Research Agent",
    level: "Advanced",
    xp: 500,
    desc: "Build an autonomous agent implementing ReAct (Reasoning and Acting) patterns, utilizing Tavily search APIs to summarize web data.",
    concepts: ["ReAct pattern", "Web tools", "Tool Calling", "Search APIs"],
    features: [
      "Implement ReAct reasoning loop (Thought -> Action -> Observation)",
      "Dynamic tool execution: bind duckduckgo/tavily search functions",
      "Context retention: parse search payloads back into memory tokens",
      "Summarize output reports complete with references links"
    ],
    milestones: [
      "Design LLM prompt structures enforcing ReAct formats",
      "Build search tools execution wrappers",
      "Develop agent observation feedback loops"
    ],
    libraries: [
      { name: "langchain", desc: "Agent runtimes and tool binding utilities" },
      { name: "tavily-python", desc: "Tavily AI search engine API client" }
    ],
    aiPrompt: "You are my Agent Systems Mentor. Explain the ReAct prompt structure (Thought -> Action -> Observation) and how to write tool binding callbacks.",
    fileStructure: "research_agent/\n├── agent.py\n├── tools.py\n└── main.py",
    architecture: "User Goal -> LLM Thought -> Call Search Tool -> Parse Results -> LLM Reason -> Final Answer",
    quiz: {
      q1: {
        question: "What is the key loop pattern behind ReAct agents?",
        options: ["Recursive Descent parsing", "Thought, Action, and Observation iteration (Correct)", "Batch MapReduce execution"],
        correct: 1
      },
      q2: {
        question: "Why should agent tools return observations as structured text strings?",
        options: ["To encrypt search parameters", "So the LLM can read, parse, and incorporate the tool output into its next reasoning step (Correct)", "To decrease database storage size"],
        correct: 1
      }
    }
  },
  {
    id: 41,
    phase: "Phase 6 — Agentic AI",
    title: "Coding Agent",
    level: "Advanced",
    xp: 500,
    desc: "Develop an agent with tools to read, write, and lint files in local workspace repositories, editing bugs autonomously.",
    concepts: ["Repository reasoning", "File edits", "Linting tools", "Sandbox execution"],
    features: [
      "Tools: read_file, write_file, list_dir, run_lint",
      "AST checkers verifying code syntax validity before saving",
      "Self-correction loops running pytest scripts and parsing execution tracebacks",
      "Report summarizing code updates made"
    ],
    milestones: [
      "Write safe file manipulation tool methods",
      "Configure pytest execution runners",
      "Develop error traceback correction loops"
    ],
    libraries: [
      { name: "pytest", desc: "Test automation framework to run test suites" },
      { name: "ruff", desc: "Fast python linter and formatter" }
    ],
    aiPrompt: "You are my Agent Coding Mentor. Guide me on building file manipulation tool libraries and parsing terminal test outputs to let agents fix syntax bugs.",
    fileStructure: "coding_agent/\n├── agent.py\n├── tools.py\n└── executor.py",
    architecture: "Goal -> Load Code -> Find Bug -> Write Edit -> Run pytest -> (Fail -> Correct loop) -> Commit File",
    quiz: {
      q1: {
        question: "How do coding agents verify their code changes did not break current logic?",
        options: ["By running compile checks only", "By executing test suites (like pytest) and evaluating assertions (Correct)", "By re-rendering the UI"],
        correct: 1
      },
      q2: {
        question: "What is AST validation useful for in automated code generation?",
        options: ["Speeding up execution runtimes", "Checking if the generated code has valid syntax before saving it (Correct)", "Encrypting source files"],
        correct: 1
      }
    }
  },
  {
    id: 42,
    phase: "Phase 6 — Agentic AI",
    title: "Browser Agent",
    level: "Advanced",
    xp: 500,
    desc: "Build a browser assistant executing automation scripts (Playwright) to navigate pages, click buttons, extract content, and log in to mock services.",
    concepts: ["Browser automation", "DOM extraction", "Playwright", "Action space"],
    features: [
      "Headless browser controllers using Playwright",
      "Screen coordinate calculations or DOM selectors extraction mapping tools",
      "Execute actions: click, type, select, scroll",
      "Safety mechanisms preventing agents from leaving mock domains"
    ],
    milestones: [
      "Configure Playwright browser drivers",
      "Develop DOM mapping and elements selector builders",
      "Build action dispatch loops running commands"
    ],
    libraries: [
      { name: "playwright", desc: "Modern browser automation framework client" },
      { name: "beautifulsoup4", desc: "HTML parsing DOM parsing toolkit" }
    ],
    aiPrompt: "You are my Automation Mentor. Guide me through initializing Playwright browsers and structuring action loops to let agents fill text inputs.",
    fileStructure: "browser_agent/\n├── agent.py\n├── browser.py\n└── selectors.py",
    architecture: "Query -> Extract page DOM -> LLM selects element -> Playwright clicks -> Capture new state",
    quiz: {
      q1: {
        question: "What does DOM stand for in web pages?",
        options: ["Database Object Model", "Document Object Model (Correct)", "Digital Output Matrix"],
        correct: 1
      },
      q2: {
        question: "Why is Playwright preferred over basic requests library for browser agents?",
        options: ["Playwright is lighter", "Playwright runs a real browser engine, supporting JavaScript loading and user inputs simulation (Correct)", "Playwright auto-translates pages"],
        correct: 1
      }
    }
  },
  {
    id: 43,
    phase: "Phase 6 — Agentic AI",
    title: "Travel Planner Agent",
    level: "Advanced",
    xp: 500,
    desc: "Design an agent utilizing tool calling to fetch flights pricing (mock API), map accommodations, and compile optimized itineraries.",
    concepts: ["Tool calling", "API Integration", "Itinerary generation"],
    features: [
      "Define JSON schemas for travel lookup tools",
      "LLM native tool calling binding routing variables",
      "Constraint validation (e.g. travel times overlap checks)",
      "Itinerary compilation outputting structured PDF/JSON planners"
    ],
    milestones: [
      "Build mock travel database API providers",
      "Write JSON schemas tool definitions",
      "Design travel validators checking itinerary constraints"
    ],
    libraries: [
      { name: "pydantic", desc: "JSON schemas and data validation models" }
    ],
    aiPrompt: "You are my Agent Systems Mentor. Guide me on writing JSON schemas for function tools and matching LLM tool-calling responses to API executions.",
    fileStructure: "travel_agent/\n├── agent.py\n├── tools_db.py\n└── validators.py",
    architecture: "Request -> LLM Tool Call -> Fetch Mock Flights API -> Optimize Schedule -> Generate Itinerary",
    quiz: {
      q1: {
        question: "What does LLM Tool Calling return in the API response payload?",
        options: ["The raw search output", "The name of the function and arguments key-values to execute (Correct)", "An encrypted string"],
        correct: 1
      },
      q2: {
        question: "Why validate tool-calling inputs using schemas like Pydantic?",
        options: ["To speed up execution", "To guarantee the parameters match expectations and database types (Correct)", "To index search outputs"],
        correct: 1
      }
    }
  },
  {
    id: 44,
    phase: "Phase 6 — Agentic AI",
    title: "Financial Analysis Agent",
    level: "Advanced",
    xp: 500,
    desc: "Build an agent fetching financial stock details, reading PDF reports, and conducting quantitative analysis.",
    concepts: ["Reasoning", "Financial data", "PDF parsing", "Plotting"],
    features: [
      "Download stock trends metrics utilizing yfinance",
      "Extract earnings PDF data using PyPDF2 scripts",
      "Run math calculations analyzing ratios (PE, Debt-to-Equity)",
      "Render visual comparison graphs of stock trends"
    ],
    milestones: [
      "Wrangle financial metrics using yfinance",
      "Build earnings PDF data extractors",
      "Develop ratios calculator math tools"
    ],
    libraries: [
      { name: "yfinance", desc: "Yahoo Finance stock market downloader wrapper" },
      { name: "matplotlib", desc: "Data graphing module" }
    ],
    aiPrompt: "You are my Quant Mentor. Help me set up an agent pulling data using yfinance and running numpy trend math calculations.",
    fileStructure: "finance_agent/\n├── agent.py\n├── tools_finance.py\n└── plots.py",
    architecture: "Ticker -> Fetch yfinance stats -> Parse Earnings PDF -> Math calculations -> Plot report charts",
    quiz: {
      q1: {
        question: "What Python library is standard to fetch stock data feeds?",
        options: ["yfinance (Correct)", "requests_finance", "pandas_stocks"],
        correct: 0
      },
      q2: {
        question: "Why should agents execute numeric math calculations using python tool scripts instead of directly estimating results?",
        options: ["To save tokens", "Because LLMs are prone to arithmetic errors; running code guarantees mathematical correctness (Correct)", "To encrypt inputs"],
        correct: 1
      }
    }
  },
  {
    id: 45,
    phase: "Phase 6 — Agentic AI",
    title: "Meeting Assistant Agent",
    level: "Advanced",
    xp: 500,
    desc: "Develop an agent connecting to Google Calendar and Gmail mock interfaces to schedule meetings, read emails, and send confirmations.",
    concepts: ["Calendar + Email", "OAuth APIs", "Scheduling", "Email Parsing"],
    features: [
      "Mock Calendar CRUD tool (create, read, update, delete events)",
      "Email parsing filters detecting scheduling keyword inputs",
      "Time slot resolution checks avoiding overlapping events",
      "SMTP mail dispatch pipelines sending invitations links"
    ],
    milestones: [
      "Build mock Gmail/Calendar API routes handlers",
      "Setup slot booking validation logic checker",
      "Establish SMTP mail dispatch pipelines"
    ],
    libraries: [
      { name: "passlib", desc: "Security and token systems" }
    ],
    aiPrompt: "You are my API Integration Mentor. Teach me how to write slot availability check logic and hook calendar reservation APIs to agent runs.",
    fileStructure: "meeting_agent/\n├── main.py\n├── calendar_api.py\n└── email_api.py",
    architecture: "Incoming Email -> Parse scheduling query -> Check calendar slots -> Book Slot -> Send confirmation email",
    quiz: {
      q1: {
        question: "What issue must scheduling agents resolve when parsing raw times?",
        options: ["Audio frequency", "Timezone differences and slot overlaps (Correct)", "Memory paging sizes"],
        correct: 1
      },
      q2: {
        question: "Which API standard is used to interact with mail and calendar servers?",
        options: ["REST APIs (OAuth2) (Correct)", "Websockets only", "Binary socket streams"],
        correct: 0
      }
    }
  },
  {
    id: 46,
    phase: "Phase 6 — Agentic AI",
    title: "Multi-Agent Research Team",
    level: "Advanced",
    xp: 600,
    desc: "Build a multi-agent team coordinating roles: Researcher (search web), Editor (structures report), Reviewer (criticizes content).",
    concepts: ["Planner/Researcher/Reviewer", "State Graph", "Coordination", "Message Channels"],
    features: [
      "State Graph orchestration managing node states",
      "Distinct agent personas: Researcher, Editor, Critic",
      "Structured message channels sharing context logs",
      "Review loop iteration modifying outputs based on critiques"
    ],
    milestones: [
      "Configure LangGraph nodes and edge routes schema",
      "Develop Researcher/Critic agent prompts blueprints",
      "Assemble final reports compiling iteration loops"
    ],
    libraries: [
      { name: "langgraph", desc: "Multi-agent graph state orchestration framework" },
      { name: "google-genai", desc: "Google Gemini SDK interface" }
    ],
    aiPrompt: "You are my Multi-Agent Mentor. Explain State Graphs and how to route execution between Researcher, Editor, and Critic nodes in LangGraph.",
    fileStructure: "agent_team/\n├── graph.py\n├── agents.py\n└── state.py",
    architecture: "Query -> Researcher Node -> Editor Node -> Critic Node -> (Fail -> Re-route loop) -> Output Report",
    quiz: {
      q1: {
        question: "What coordinates state mapping inside LangGraph multi-agent systems?",
        options: ["A centralized SQL DB", "A shared Graph State dictionary passed through nodes and edges (Correct)", "Network socket channels"],
        correct: 1
      },
      q2: {
        question: "What is the primary role of the Critic node?",
        options: ["To download dataset files", "To audit draft reports and suggest fixes for inaccuracies or layout problems (Correct)", "To compile python code"],
        correct: 1
      }
    }
  },
  {
    id: 47,
    phase: "Phase 6 — Agentic AI",
    title: "Customer Support Agent",
    level: "Advanced",
    xp: 600,
    desc: "Develop a customer support agent featuring persistent SQL memory database, ticket management tools, and sentiment analysis.",
    concepts: ["Memory + RAG", "Sentiment analysis", "Ticket routing", "SQL Memory"],
    features: [
      "SQL persistent store mapping user profile and session states",
      "Sentiment analysis middleware routing tickets (e.g. angry users -> priority)",
      "Chroma vector database retrieving FAQ knowledge bases answers",
      "Ticket creation tracking systems"
    ],
    milestones: [
      "Establish SQL session memory tables",
      "Configure sentiment analyzer threshold rules",
      "Wire vector FAQ search databases"
    ],
    libraries: [
      { name: "chromadb", desc: "Vector search data cache client" },
      { name: "sqlite3", desc: "Local session states storage module" }
    ],
    aiPrompt: "You are my Support Systems Mentor. Guide me on structuring SQL state memory tables and using sentiment indicators to route support tickets.",
    fileStructure: "support_agent/\n├── agent.py\n├── memory.py\n└── faq_db.py",
    architecture: "Ticket input -> Sentiment analyzer -> (Angry -> Priority queue) -> SQL memory read -> Vector FAQ -> LLM response",
    quiz: {
      q1: {
        question: "Why are persistent session states crucial for customer support agents?",
        options: ["To increase API costs", "To remember user names and past queries across multiple turns (Correct)", "To format output text"],
        correct: 1
      },
      q2: {
        question: "How does sentiment analysis prioritize tickets?",
        options: ["By checking email lengths", "By classifying emotional keywords, prioritizing high-risk cases (Correct)", "By converting text to audio"],
        correct: 1
      }
    }
  },
  {
    id: 48,
    phase: "Phase 6 — Agentic AI",
    title: "Autonomous Coding Team",
    level: "Advanced",
    xp: 600,
    desc: "Orchestrate a multi-agent coding team: PM (analyzes tasks), Coder (writes scripts), QA (tests execution).",
    concepts: ["Multi-agent coding", "State graphs", "pytest integration", "Test automation"],
    features: [
      "Agent 1 (PM): breaks requirements into JSON checklist files",
      "Agent 2 (Coder): reads files and writes implementation scripts",
      "Agent 3 (QA): drafts pytest validations and runs sandboxed executors",
      "Re-execution loop feeding QA failures back to Coder agent"
    ],
    milestones: [
      "Design LangGraph nodes structure connecting Coder/QA roles",
      "Build sandboxed bash subprocess runners",
      "Implement feedback loops passing traceback logs"
    ],
    libraries: [
      { name: "langgraph", desc: "Graph state multi-agent workflow framework" },
      { name: "pytest", desc: "Automated test runs library" }
    ],
    aiPrompt: "You are my Software Architect Mentor. Guide me on orchestrating a Coder-QA loop where test tracebacks automatically route code fixes.",
    fileStructure: "dev_team/\n├── graph.py\n├── PM.py\n├── coder.py\n└── qa.py",
    architecture: "Requirements -> PM checklist -> Coder script -> QA Pytest run -> (Fail -> Coder loop) -> Pass -> Output Code",
    quiz: {
      q1: {
        question: "What is the primary benefit of separating Coder and QA roles in autonomous agent teams?",
        options: ["It reduces network token consumption", "It mimics professional QA cycles, preventing the coder agent from validating its own assumptions (Correct)", "It speeds up script compile times"],
        correct: 1
      },
      q2: {
        question: "Which component feeds error diagnostics back to Coder nodes on test failure?",
        options: ["The PM agent", "The Pytest runner stdout traceback logs (Correct)", "The SQL database"],
        correct: 1
      }
    }
  },
  {
    id: 49,
    phase: "Phase 6 — Agentic AI",
    title: "Personal AI Operating System",
    level: "Expert",
    xp: 1000,
    desc: "Develop a flagship Personal AI OS coordinating multi-agent loops, conversational memory, vector DWH RAG searches, tool calling, and monitoring.",
    concepts: ["Your flagship project", "System design", "Integration", "Monitoring", "Cloud deployment"],
    features: [
      "Consolidate agents, memory DBs, and vector stores",
      "Unified REST API gateway under FastAPI",
      "Sliding context memory storage systems logs",
      "System metrics monitoring dashboard (FastAPI + React)",
      "Multi-container deploy settings (Docker Compose)"
    ],
    milestones: [
      "Establish modular core layers mapping API endpoints",
      "Configure unified database connections and Redis brokers",
      "Dockerize container setups verifying production environments"
    ],
    libraries: [
      { name: "fastapi", desc: "Core API routing gateway web server" },
      { name: "celery", desc: "Async tasks scheduler queue executor" },
      { name: "redis", desc: "Caching layer broker client" }
    ],
    aiPrompt: "You are my Lead Architect. Guide me through unifying my agent tools, vector DBs, memory states, and monitoring metrics into a scalable FastAPI system.",
    fileStructure: "ai_os/\n├── app/\n│   ├── main.py\n│   ├── agents/\n│   ├── db/\n│   └── tasks/\n├── docker-compose.yml\n└── Dockerfile",
    architecture: "Request -> API Gateway -> Thread Pools / Tasks Queue -> Multi-Agent graph execution -> Persistent SQL/Vector DWH",
    quiz: {
      q1: {
        question: "What orchestrates background task offloading in enterprise AI applications?",
        options: ["A simple python script", "Distributed workers queue systems (like Celery + Redis) (Correct)", "Local storage files"],
        correct: 1
      },
      q2: {
        question: "Which container management system scales configurations locally?",
        options: ["Git", "Docker Compose (Correct)", "Pip environment managers"],
        correct: 1
      }
    }
  },

  // ─── PHASE 7 ──────────────────────────────────────────────────────────
  {
    id: 50,
    phase: "Phase 7 — MLOps",
    title: "Model Serving API",
    level: "Advanced",
    xp: 400,
    desc: "Package a trained machine learning model inside a production-ready FastAPI endpoint, with input validation (Pydantic) and performance monitoring.",
    concepts: ["FastAPI", "Model Serving", "Inference Latency", "Pydantic"],
    features: [
      "Load serialized model weights (.pkl/.joblib) on API startup",
      "FastAPI endpoint accepting model input schemas (Pydantic)",
      "Run inference and return JSON formatted predictions",
      "Measure and log request-to-response execution latency"
    ],
    milestones: [
      "Serialize scikit-learn models using Joblib",
      "Write Pydantic schemas validating features inputs",
      "Develop FastAPI endpoints serving classifications"
    ],
    libraries: [
      { name: "fastapi", desc: "Web server API framework" },
      { name: "joblib", desc: "Serialization package for NumPy/sklearn pipelines" }
    ],
    aiPrompt: "You are my MLOps Mentor. Explain loading model binaries on startup using FastAPI lifespan events and writing Pydantic validation schemas.",
    fileStructure: "serving_api/\n├── main.py\n├── model.joblib\n└── schemas.py",
    architecture: "JSON POST Request -> Pydantic validator -> Model Inference -> JSON response + latency metrics",
    quiz: {
      q1: {
        question: "Where should model binaries be loaded in a FastAPI application?",
        options: ["Within the request endpoint directly", "During startup event lifespans so it loads only once in memory (Correct)", "In the database schema config"],
        correct: 1
      },
      q2: {
        question: "What is the primary role of Joblib/Pickle in model deployment?",
        options: ["To speed up network pipelines", "To serialize and save trained ML objects into binary files for reuse (Correct)", "To validate data types"],
        correct: 1
      }
    }
  },
  {
    id: 51,
    phase: "Phase 7 — MLOps",
    title: "MLflow Integration",
    level: "Advanced",
    xp: 400,
    desc: "Configure MLflow to track parameters, datasets metrics, and serialize model artifact weights during training runs.",
    concepts: ["Experiment tracking", "MLflow", "Artifacts", "Hyperparameter tuning"],
    features: [
      "Initialize MLflow client tracking server runs",
      "Log model parameters (learning rate, depth) and performance metrics (accuracy, F1)",
      "Log visual training curves graphs artifacts",
      "Register final trained models in MLflow Model Registry"
    ],
    milestones: [
      "Setup local MLflow tracking server",
      "Write model training scripts containing mlflow.log_params() hooks",
      "Register model candidates inside registry directory"
    ],
    libraries: [
      { name: "mlflow", desc: "Platform for machine learning lifecycle experiment tracking" }
    ],
    aiPrompt: "You are my MLOps Mentor. Walk me through setting up MLflow runs tracking parameters, accuracy logs, and saving artifacts locally.",
    fileStructure: "mlflow_tracker/\n├── train.py\n└── mlflow_setup.sh",
    architecture: "Training Run -> MLflow log parameters/metrics -> Local Artifacts Store -> MLflow Tracking UI",
    quiz: {
      q1: {
        question: "What is the purpose of the MLflow Model Registry?",
        options: ["To query dataset coordinates", "To version-control, transitions stages, and manage ML models centrally (Correct)", "To format console logs"],
        correct: 1
      },
      q2: {
        question: "Which MLflow call stores numeric metrics during training epochs?",
        options: ["mlflow.log_param()", "mlflow.log_metric() (Correct)", "mlflow.save_number()"],
        correct: 1
      }
    }
  },
  {
    id: 52,
    phase: "Phase 7 — MLOps",
    title: "Feature Store Demo",
    level: "Advanced",
    xp: 400,
    desc: "Configure Feast local feature stores to manage data transformations, load features to Redis, and retrieve them for training.",
    concepts: ["Feature management", "Feast", "Feature Store", "Redis Online Store"],
    features: [
      "Define entity schemas and features views in Feast",
      "Feast materialize command moving offline file data to Redis online store",
      "Retrieve historical feature vectors for training dataset preparation",
      "Query low-latency online feature values from Redis during serving"
    ],
    milestones: [
      "Setup Feast definition files",
      "Run feature materialization tasks loading online storage",
      "Execute query scripts fetching features lists"
    ],
    libraries: [
      { name: "feast", desc: "Open-source feature store framework client" },
      { name: "redis", desc: "In-memory database client" }
    ],
    aiPrompt: "You are my Data Ops Mentor. Teach me defining feature views in Feast and materializing datasets to Redis online stores for real-time model queries.",
    fileStructure: "feature_store/\n├── feature_store.yaml\n├── features.py\n└── test_query.py",
    architecture: "Raw Tables -> Feast Offline Store -> Materialize -> Redis Online Store -> Low-latency inference lookup",
    quiz: {
      q1: {
        question: "What is a main problem solved by Feature Stores like Feast?",
        options: ["Slow SQL query compilation", "Feature consistency and training-serving skew by unifying feature definitions (Correct)", "Database replication lag"],
        correct: 1
      },
      q2: {
        question: "What does feature materialization do in Feast?",
        options: ["It compresses data columns", "It exports features to the low-latency online database (e.g. Redis) for real-time serving (Correct)", "It trains ML models"],
        correct: 1
      }
    }
  },
  {
    id: 53,
    phase: "Phase 7 — MLOps",
    title: "Docker for ML",
    level: "Advanced",
    xp: 400,
    desc: "Build optimized Docker containers packaging deep learning models, handling large file weights and environment libraries.",
    concepts: ["Containers", "Docker", "Image size optimization", "Build caching"],
    features: [
      "Optimize requirements imports caching Docker layers",
      "Docker ignore configurations filtering model weights downloads",
      "Write multi-stage Dockerfiles separating python build environments",
      "Local container verification scripts verifying APIs runtimes"
    ],
    milestones: [
      "Write model serving Dockerfile blueprints",
      "Design multi-stage compiler dependencies layers",
      "Run container builds measuring output image sizes"
    ],
    libraries: [
      { name: "docker", desc: "Container virtualization platform client" }
    ],
    aiPrompt: "You are my DevOps Mentor. Explain Docker layer caching optimizations and multi-stage build patterns to packaging model binaries securely.",
    fileStructure: "ml_docker/\n├── Dockerfile\n├── .dockerignore\n└── main.py",
    architecture: "Source code + Model binary -> Dockerfile compiler -> Optimized Container Image -> Docker Runtime API",
    quiz: {
      q1: {
        question: "Why should deep learning docker files utilize multi-stage build patterns?",
        options: ["To speed up execution rtimes", "To compile heavy library dependencies in build stages, leaving final images lightweight and clean (Correct)", "To encrypt network channels"],
        correct: 1
      },
      q2: {
        question: "Why add large model weight files to `.dockerignore` during container compilation?",
        options: ["To compress final images sizes", "To prevent long local file transfer times to the Docker daemon, fetching them instead via mounted volumes or CDNs (Correct)", "To format output text"],
        correct: 1
      }
    }
  },
  {
    id: 54,
    phase: "Phase 7 — MLOps",
    title: "Kubernetes Basics",
    level: "Advanced",
    xp: 500,
    desc: "Deploy a Model Serving API onto a local Kubernetes cluster (Minikube), using Deployments, Services, and Horizontal Pod Autoscaling (HPA).",
    concepts: ["Scaling", "Kubernetes", "Deployments", "Autoscaling"],
    features: [
      "Write Kubernetes YAML Deployment files specifying replicas configurations",
      "Create Service configurations (NodePort/ClusterIP) routing network streams",
      "Setup Horizontal Pod Autoscaler (HPA) triggers scaling replicas based on CPU usage",
      "Run Minikube locally to verify cluster deployments"
    ],
    milestones: [
      "Write Deployment and Service yaml configurations",
      "Start Minikube and deploy cluster components",
      "Stress test endpoints verifying autoscaler actions"
    ],
    libraries: [
      { name: "kubernetes", desc: "Kubernetes client libraries" }
    ],
    aiPrompt: "You are my Cloud Ops Mentor. Show me how to write Kubernetes Deployment manifests specifying CPU limits and configuring Horizontal Pod Autoscalers.",
    fileStructure: "k8s/\n├── deployment.yaml\n├── service.yaml\n└── hpa.yaml",
    architecture: "Ingress Router -> Kubernetes Service -> Load Balance across Pods (HPA scales replica counts based on load)",
    quiz: {
      q1: {
        question: "What is a Pod in Kubernetes?",
        options: ["A database index node", "The smallest deployable unit in Kubernetes, hosting one or more containers (Correct)", "A network switch"],
        correct: 1
      },
      q2: {
        question: "How does the Horizontal Pod Autoscaler (HPA) scale resources?",
        options: ["By allocating more RAM to the server", "By dynamically increasing or decreasing the number of running Pod replicas based on metrics like CPU usage (Correct)", "By rebooting nodes"],
        correct: 1
      }
    }
  },
  {
    id: 55,
    phase: "Phase 7 — MLOps",
    title: "CI/CD Pipeline",
    level: "Advanced",
    xp: 500,
    desc: "Configure a GitHub Actions workflow that executes pytest suites, runs lint checks, compiles Docker images, and pushes to a container registry on commit.",
    concepts: ["Automation", "CI/CD", "GitHub Actions", "Tests Gates"],
    features: [
      "Write GitHub Actions workflow YAML configuration file (.github/workflows)",
      "Configure steps checking code styling and running pytest suites",
      "Setup automated Docker login and container compilation tasks",
      "Secrets storage variables configurations (e.g. registry passwords)"
    ],
    milestones: [
      "Write YAML workflow actions triggers configurations",
      "Setup test environments containing lint rules checkers",
      "Configure Docker registry pushing steps"
    ],
    libraries: [
      { name: "pytest", desc: "Testing framework" }
    ],
    aiPrompt: "You are my CI/CD Mentor. Show me how to configure a GitHub Actions workflow YAML that triggers on push, runs pytest, and compiles Docker images.",
    fileStructure: ".github/workflows/\n└── main_ci.yml",
    architecture: "Git Commit push -> GitHub Action Runner -> Run Lint & Tests -> (Pass) -> Build Docker image -> Push to Registry",
    quiz: {
      q1: {
        question: "What is the difference between Continuous Integration (CI) and Continuous Deployment (CD)?",
        options: ["CI is for databases; CD is for code files", "CI automates testing and building; CD automates deploying validated code to environments (Correct)", "They are synonyms"],
        correct: 1
      },
      q2: {
        question: "Where are sensitive API tokens stored securely when executing GitHub workflows?",
        options: ["Hardcoded in YAML configs", "In GitHub Repository Secrets (Correct)", "In the git commit logs"],
        correct: 1
      }
    }
  },
  {
    id: 56,
    phase: "Phase 7 — MLOps",
    title: "Monitoring",
    level: "Advanced",
    xp: 500,
    desc: "Build a monitoring dashboard tracking API error rates and inference latency using Prometheus metrics and Grafana charts.",
    concepts: ["Prometheus/Grafana", "Metrics", "Alerting", "Dashboard design"],
    features: [
      "Instrument FastAPI routes with Prometheus metrics exporters",
      "Setup Prometheus scrapers pulling logs data streams",
      "Design Grafana dashboards visualizing request count and latency distributions",
      "Configure email or Slack alerting threshold rules triggers"
    ],
    milestones: [
      "Setup Prometheus export hooks in FastAPI",
      "Build local Prometheus/Grafana service containers config",
      "Design target performance dashboard plots layout"
    ],
    libraries: [
      { name: "prometheus-client", desc: "Python metrics tracking library exporter" }
    ],
    aiPrompt: "You are my Monitoring Mentor. Show me how to export custom latency histograms in FastAPI and configure Grafana queries to show request rates.",
    fileStructure: "monitoring/\n├── prometheus.yml\n├── docker-compose.yml\n└── main.py",
    architecture: "Client requests -> FastAPI Prometheus exporter -> Scraped by Prometheus -> Rendered on Grafana Dashboard",
    quiz: {
      q1: {
        question: "What does Prometheus do in monitoring stacks?",
        options: ["It stores video logs", "It scrapes and stores time-series numerical metrics exported by systems (Correct)", "It runs automated code checks"],
        correct: 1
      },
      q2: {
        question: "Why monitor latency distribution percentiles (e.g. p99) instead of just average latency?",
        options: [" p99 is easier to calculate", "Averages hide worst-case slow response rates; p99 reflects latency bounds for the slowest 1% of users (Correct)", "p99 is always zero"],
        correct: 1
      }
    }
  },
  {
    id: 57,
    phase: "Phase 7 — MLOps",
    title: "A/B Testing",
    level: "Advanced",
    xp: 500,
    desc: "Implement a routing middleware partitioning model traffic between two model version models (A/B testing), logging decision parameters.",
    concepts: ["Model evaluation", "A/B Testing", "Traffic Splitting", "Analytics"],
    features: [
      "Inference router splitting client traffic (e.g. 90% version A / 10% version B)",
      "Hash-based user routing guaranteeing sticky user sessions allocations",
      "Log performance metrics alongside the model version identifier",
      "Statistical evaluation utilities calculating conversion significance levels"
    ],
    milestones: [
      "Write traffic partitioning middleware route logic",
      "Configure logs storing identifiers fields",
      "Develop statistical evaluator check scripts"
    ],
    libraries: [
      { name: "scipy", desc: "Statistical computations and significance check routines" }
    ],
    aiPrompt: "You are my Experimentation Mentor. Teach me sticky user partitioning techniques and running t-tests on logged conversion results.",
    fileStructure: "ab_tester/\n├── router.py\n├── logger.py\n└── evaluator.py",
    architecture: "Request -> Router Middleware -> Sticky User Hash -> Model A or B -> Log Prediction + User Feedback -> Run T-Test",
    quiz: {
      q1: {
        question: "What is sticky user routing in A/B testing?",
        options: ["Routing all users to the faster model version", "Ensuring a specific user always gets routed to the exact same model version across sessions (Correct)", "Mapping cookies to hard drives"],
        correct: 1
      },
      q2: {
        question: "Why run statistical hypothesis tests (e.g. t-test) on A/B test results?",
        options: ["To speed up database connections", "To prove that observed changes in performance are statistically significant rather than random chance (Correct)", "To compress models sizes"],
        correct: 1
      }
    }
  }
];
