On this branch and commit the build currently fails with:

```bash
error: {
  "message": "Failed to analyze Mastra application: No \"exports\" main defined in /Users/lejoe/code/playground/mastra-monorepo-01/packages/foo/node_modules/@monorepo/bar/package.json",
  "details": {
    "message": "Failed to analyze Mastra application: No \"exports\" main defined in /Users/lejoe/code/playground/mastra-monorepo-01/packages/foo/node_modules/@monorepo/bar/package.json",
    "domain": "DEPLOYER",
    "category": "SYSTEM",
    "details": {}
  },
  "code": "DEPLOYER_BUNDLER_ANALYZE_FAILED"
}
```