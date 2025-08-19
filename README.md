## Local Dev

To use local packages, use pnpm overrides:

```json
{
  "pnpm": {
    "overrides": {
      "mastra": "link:../../work/mastra/packages/cli",
      "@mastra/core": "link:../../work/mastra/packages/core",
      "@mastra/libsql": "link:../../work/mastra/stores/libsql",
      "@mastra/memory": "link:../../work/mastra/packages/memory",
      "@mastra/loggers": "link:../../work/mastra/packages/loggers"
    }
  }
}
```

## WIP

On this branch and commit the build currently fails with:

NOTHING