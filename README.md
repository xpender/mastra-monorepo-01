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

```sh
$ pnpm build

INFO [2025-08-20 16:54:54.936 +0200] (Mastra CLI): Installing dependencies
Progress: resolved 1, reused 0, downloaded 0, added 0
INFO [2025-08-20 16:54:55.155 +0200] (Mastra CLI): Progress: resolved 1, reused 0, downloaded 0, added 0
Progress: resolved 14, reused 0, downloaded 13, added 0
INFO [2025-08-20 16:54:56.156 +0200] (Mastra CLI): Progress: resolved 14, reused 0, downloaded 13, added 0
ERR_PNPM_FETCH_404  GET https://registry.npmjs.org/@monorepo%2Fbar: Not Found - 404

This error happened while installing a direct dependency of /Users/xxx/Projects/mastra-monorepo-01/packages/foo/.mastra/output

@monorepo/bar is not in the npm registry, or you have no permission to fetch it.

No authorization header was set for the request.
INFO [2025-08-20 16:54:56.253 +0200] (Mastra CLI): ERR_PNPM_FETCH_404  GET https://registry.npmjs.org/@monorepo%2Fbar: Not Found - 404

This error happened while installing a direct dependency of /Users/xxx/Projects/mastra-monorepo-01/packages/foo/.mastra/output

@monorepo/bar is not in the npm registry, or you have no permission to fetch it.

No authorization header was set for the request.
ERROR [2025-08-20 16:54:56.283 +0200] (Mastra CLI): Mastra Build failed
    error: {
      "message": "Failed during bundler bundle stage: Process exited with code 1",
      "details": {
        "message": "Failed during bundler bundle stage: Process exited with code 1",
        "domain": "DEPLOYER",
        "category": "SYSTEM",
        "details": {}
      },
      "code": "DEPLOYER_BUNDLER_BUNDLE_STAGE_FAILED"
    }
```

Explanation:

* To match our monorepo setup, as we are using transpiled packages/libraries, the `@monorepo/bar` package is getting transpiled with `tsc`, means `@monorepo/foo` is consuming JS files.

* In the `@monorepo/bar` we have two dependencies `@huggingface/transformers` and `@mongodb-js/zstd`, both of them or their inherited dependencies contain binary, so they should not be bundled

* In `./packages/foo/src/mastra/index.ts` they are defined as `externals: ["@mongodb-js/zstd", "@huggingface/transformers"],`

* In `./packages/foo/.mastra/output/package.json` output we still have then a line `"@monorepo/bar": "latest",` which causes the fetch of the package via NPM

* Additionally, `./packages/foo/.mastra/output/package.json` we have `"@huggingface/transformers": "latest",` - latest is wrong, it should be `"@huggingface/transformers": "^3.7.2",`
    * For `"@mongodb-js/zstd": "2.0.1",` it's correct

* From my testing: It looks like this doesn't happen when we just have one package in externals and also not use it in code.
    * To reproduce this, just remove/comment the line `void (await myCompress("just a test"));` in `packages/foo/src/mastra/tools/weather-tool.ts` - building works again