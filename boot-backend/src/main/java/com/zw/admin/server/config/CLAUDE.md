# config/ — Spring Boot wiring for security, MVC, scheduling, and infrastructure

## Non-Obvious Class Details

**ShiroConfig**
- `SecurityManager` depends on `EhCacheManager` (from `EhCacheConfig`) — both must be present even though auth is disabled; removing `EhCacheConfig` breaks context startup.
- `DefaultAdvisorAutoProxyCreator` is `@DependsOn("lifecycleBeanPostProcessor")` — Shiro annotation support (`@RequiresRoles`, `@RequiresPermissions`) silently stops working if that ordering breaks.
- `authc` filter slot is overridden with `RestfulFilter` (returns JSON 401 instead of redirect); `logout` slot uses `LogoutFilter` redirecting to `/login.html`. These custom filters remain wired even while all routes are `anon`.
- Password hashing: MD5, iteration count from `UserConstants.HASH_ITERATIONS` — must match how passwords are stored; changing the count invalidates all existing hashes.

**WebMvcConfig**
- CORS is open (`allowedMethods("*")`, all origins) — intentional for dev; tighten before any production exposure.
- `PageTableArgumentResolver` auto-binds DataTables request params to a pagination object; controllers rely on it implicitly — removing it breaks all paginated endpoints silently (no compile error).
- `/files/**` is served from the path in `${files.path}` (application.yml) outside the classpath; this property must exist or context startup fails with `@Value` injection error.

**JobConfig**
- `SchedulerFactoryBean` is intentionally minimal: DataSource wiring, `quartz.properties`, `overwriteExistingJobs`, and startup delay are all commented out. The scheduler runs in-memory with no persistence — jobs do not survive restarts.
- The constant `KEY = "applicationContextSchedulerContextKey"` is defined here but the `setApplicationContextSchedulerContextKey` call is commented out, so jobs cannot retrieve the `ApplicationContext` via the scheduler context. Any job that needs Spring beans must obtain them another way (e.g., `ApplicationContextAware`).

## Config Dependency Map

```
EhCacheConfig ──► ShiroConfig (SecurityManager, MyShiroRealm)
MyShiroRealm  ──► HashedCredentialsMatcher (MD5 + HASH_ITERATIONS)
WebMvcConfig  ──► PageTableArgumentResolver, files.path property
JobConfig     ──► DataSource (injected but currently unused/commented)
```

## Gotchas

- Removing `EhCacheConfig` or its bean crashes startup even though auth is off — Shiro still wires the cache manager eagerly.
- Re-enabling `authc` on `/**` (ShiroConfig line 45–46) will lock out all API clients immediately; the login flow must be verified end-to-end first.
- `AsycTaskExecutorConfig` configures the thread pool backing `@Async` — if its bean name conflicts with Spring Boot's auto-configured executor, async methods may silently use the wrong pool.
