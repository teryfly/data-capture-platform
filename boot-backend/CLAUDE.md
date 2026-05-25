# boot-backend

Spring Boot REST API for data quality supervision — admin, ETL orchestration, and rule management.

## Architecture

Request flow: Controller → Service (interface in `service/`, impl in `service/impl/`) → Dao (mapper interface in `dao/`) → MyBatis XML (`resources/mybatis-mappers/*.xml`) → SQL Server.

The `ktrtree/` sub-domain mirrors this four-layer structure independently within its own package.

## Key Packages

| Package | Purpose |
|---|---|
| `base/controller/` | `BaseController` — request helpers, pagination wrapping, file streaming |
| `base/warpper/` | `BaseControllerWarpper` — post-query map decoration (add computed fields to result rows) |
| `tips/` | `SuccessTip` / `ErrorTip` — uniform JSON response envelopes |
| `advice/` | `ExceptionHandlerAdvice` (global `@ControllerAdvice`), `LogAdvice` (AOP method logging) |
| `ktrtree/` | Self-contained Kettle/Pentaho tree sub-domain: `KettleXMLController`, `TreeController`, own mapper + service |
| `job/` | `SpringBeanJob` — Quartz job that delegates to Spring-managed service beans |
| `support/` | `HttpKit` (static request/response accessor), `WafKit` / `WafRequestWrapper` (XSS filtering) |
| `page/` | `PageFactory`, `PageInfoBT` — adapts MyBatis-Plus `Page<T>` to Bootstrap Table pagination shape |

## Entry Point & Config Files

- Entry point: `HospitalSuperviseServerApplication.java` (`@SpringBootApplication`, no custom scan needed)
- `resources/application.yml` — datasource, Redis, mail, file upload path (`files.path`), MyBatis aliases
- `resources/bootstrap.yml` — early Spring context config (loaded before `application.yml`)
- `resources/quartz.properties` — Quartz thread pool and job store settings
- `resources/ehcache.xml` — EhCache region config (used by Shiro session cache)
- `resources/logback-admin.xml` — logging config; referenced by `logging.config` in `application.yml`

## Conventions Specific to This Module

- **Typo is intentional**: the package and class name is `warpper` (not `wrapper`) throughout — `base/warpper/`, `BaseControllerWarpper`, `RuleWarpper`. Match this spelling when adding new wrapper classes.
- **`warpObject()`** in `BaseController` is the standard way to decorate query results; subclass `BaseControllerWarpper` and override `warpTheMap(Map<String,Object>)`.
- **`packForBT(Page<T>)`** in `BaseController` converts MyBatis-Plus pages to the Bootstrap Table-compatible `PageInfoBT` shape — use it in every paginated endpoint.
- **File download encoding**: `renderFile()` in `BaseController` re-encodes filenames from GB2312 to ISO-8859-1 for HTTP headers; don't bypass this for Chinese filenames.
- **`files.path`** defaults to `d:/files` (Windows dev path) via `${file-path:d:/files}` — override with `-Dfile-path=` on Linux deployments.
- **`ktrtree` mappers** use `KettleXMLMapper.xml` and `TreeMapper.xml`; keep Kettle-related SQL in those files, not in the shared mapper set.

## Gotchas Specific to This App

- `bootstrap.yml` is loaded before `application.yml`; misconfiguring it can prevent datasource beans from initializing entirely.
- Quartz jobs run via `SpringBeanJob`, which looks up beans by name at runtime — renaming a service bean breaks scheduled jobs silently.
- `WafRequestWrapper` wraps every request for XSS stripping; if a field legitimately needs raw HTML (e.g., rich-text rules), the WAF filter must be bypassed for that parameter.
- Mail config in `application.yml` has blank `username`/`password` — mail features will fail at runtime unless these are set externally.
