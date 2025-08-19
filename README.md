On this branch and commit the build currently fails with:

```bash
error: {
  "message": "Failed to analyze Mastra application: ../bar/src/index.ts (3:7): Expected '{', got 'type' (Note that you need plugins to import files that are not JavaScript)",
  "details": {
    "message": "Failed to analyze Mastra application: ../bar/src/index.ts (3:7): Expected '{', got 'type' (Note that you need plugins to import files that are not JavaScript)",
    "domain": "DEPLOYER",
    "category": "SYSTEM",
    "details": {}
  },
  "code": "DEPLOYER_BUNDLER_ANALYZE_FAILED"
}
```