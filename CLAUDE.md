# datacenter-vz

Data quality supervision platform integrating Pentaho ETL pipelines with a Spring Boot admin backend.

## Structure

```
boot-backend/          Spring Boot REST API application (Java 8, Maven)
boot-backend/文档和sql/ Database init SQL and config reference files
```

## Commands

```bash
# Build & run (from boot-backend/)
mvn spring-boot:run

# Package JAR
mvn clean package -DskipTests

# Initialize DB
# Run boot-backend/文档和sql/db/boot_backend.sql against SQL Server
```

## Tech Stack

- Spring Boot 2.0.4 · Java 8
- SQL Server (`VzDataQuality` DB, port 1433) — README says MySQL but config uses SQL Server
- MyBatis-Plus 2.1.8 with XML mappers in `src/main/resources/mybatis-mappers/`
- Apache Shiro 1.4.0 (auth disabled — all routes set to `anon`, see `config/ShiroConfig.java`)
- Redis (token store, port 6379) + EhCache (Shiro session cache)
- Quartz scheduler for ETL task execution
- Swagger 2.8.0 at `/swagger-ui.html`
- App runs on port **8010** (not default 8080)

## Conventions

- REST responses use `SuccessTip` / `ErrorTip` wrappers (not standard Spring `ResponseEntity`)
- Controllers extend `BaseController` for shared utilities
- Dual token manager implementations: `EhCacheTokenManager` and `RedisTokenManager`
- Kettle/Pentaho ETL objects are managed in the `ktrtree` sub-domain package

## External Dependencies

**CRITICAL:** This app depends on external services. All must be running for full functionality:

- **Pentaho Server** — receives ETL transformations via `/pentaho/importFolderAndFile` API
  - Configured via `external.pentaho.url` in `application.yml` (default: `http://192.168.120.95:8085`)
  - Credentials via `external.pentaho.username` and `external.pentaho.password`
  - Can be overridden with `PENTAHO_URL`, `PENTAHO_USERNAME`, `PENTAHO_PASSWORD` environment variables
- **FHIR Center** — organization/mechanism list (`/global/base/mechanismList`)
  - Configured via `external.fhir.host` in `application.yml` (default: `app.fhir.center:8011`)
  - Can be overridden with `FHIR_HOST` environment variable
- **SQL Server** — `VzDataQuality` database
  - Configured via `spring.datasource.url` in `application.yml` (default: `192.168.120.231:1433`)
  - Can be overridden with `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD` environment variables

All external dependencies are now externalized via environment variables with sensible defaults in `application.yml`.

## Gotchas

- Auth interceptor is commented out (`ShiroConfig` line 46): all endpoints are currently public
- Credentials in `application.yml` are hardcoded (dev defaults); do not commit real credentials
- Pentaho and FHIR API calls are **frontend-only** (AJAX); backend has no HTTP client library
- `文档和sql/` directory name contains Chinese characters — some tools may have path issues
