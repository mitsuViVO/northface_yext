## CSS

<<<<<<< HEAD

- Importing `.css` files injects their content into the page via a `<style>` tag with HMR support.

### `@import` Inlining and Rebasing

- Vite is pre-configured to support CSS `@import` inlining via `postcss-import`.
- Vite aliases are respected for CSS `@import`.
- All CSS `url()` references are automatically rebased to ensure correctness, even if imported files are in different directories.
- `@import` aliases and URL rebasing are also supported for Sass and Less files (see CSS Pre-processors).

### PostCSS

- If the project contains a valid PostCSS config (any format supported by `postcss-load-config`, e.g., `postcss.config.js`), it will be automatically applied to all imported CSS.
- CSS minification runs after PostCSS and uses the `build.cssTarget` option.

### CSS Modules

- Any CSS file ending with `.module.css` is considered a CSS module file.
- Importing such a file returns the corresponding module object.

  ```css
  /* example.module.css */
  .red {
    color: red;
  }
  ```

  ```javascript
  import classes from "./example.module.css";
  document.getElementById("foo").className = classes.red;
  ```

- CSS modules behavior can be configured via the `css.modules` option.
- If `css.modules.localsConvention` is set to enable camelCase locals (e.g., `localsConvention: 'camelCaseOnly'`), you can also use named imports:

  ```javascript
  // .apply-color -> applyColor
  import { applyColor } from "./example.module.css";
  document.getElementById("foo").className = applyColor;
  ```

### CSS Pre-processors

- Vite targets modern browsers, so using native CSS variables with PostCSS plugins that implement CSSWG drafts (e.g., `postcss-nesting`) and authoring plain, future-standards-compliant CSS is recommended.
- Vite provides built-in support for `.scss`, `.sass`, `.less`, `.styl`, and `.stylus` files.
- No Vite-specific plugins are needed, but the corresponding pre-processor must be installed:

  ```bash
  # .scss and .sass
  npm add -D sass-embedded # or sass

  # .less
  npm add -D less

  # .styl and .stylus
  npm add -D stylus
  ```

- Using Vue single-file components automatically enables `<style lang="sass">` etc.
- Vite improves `@import` resolving for Sass and Less, respecting Vite aliases.
- Relative `url()` references inside imported Sass/Less files in different directories are automatically rebased.
- `@import` alias and URL rebasing are not supported for Stylus due to its API constraints.
- CSS modules can be combined with pre-processors by prepending `.module` to the file extension (e.g., `style.module.scss`).

### Disabling CSS injection into the page

- The automatic injection of CSS can be turned off via the `?inline` query parameter.
- The processed CSS string is returned as the module's default export, but styles are not injected.

  ```javascript
  import "./foo.css"; // will be injected into the page
  import otherStyles from "./bar.css?inline"; // will not be injected
  ```

- **NOTE**: Default and named imports from CSS files (e.g., `import style from './foo.css'`) are removed since Vite 5. Use the `?inline` query instead.

### Lightning CSS

- Starting from Vite 4.4, there is experimental support for Lightning CSS.
- Enable it by adding `css.transformer: 'lightningcss'` to your config file and installing the `lightningcss` dependency:

  ```bash
  npm add -D lightningcss
  ```

- If enabled, CSS files are processed by Lightning CSS instead of PostCSS.
- Configure Lightning CSS options via the `css.lightningcss` config option.
- Configure CSS Modules using `css.lightningcss.cssModules` instead of `css.modules`.
- By default, Vite uses esbuild to minify CSS. Lightning CSS can be used as the CSS minifier with `build.cssMinify: 'lightningcss'`.
- **NOTE**: CSS Pre-processors are not supported when using Lightning CSS.

### Static Assets

- Importing a static asset returns the resolved public URL when served:

  ```javascript
  import imgUrl from "./img.png";
  document.getElementById("hero-img").src = imgUrl;
  ```

- Special queries modify how assets are loaded:

  ```javascript
  // Explicitly load assets as URL
  import assetAsURL from "./asset.js?url";

  // Load assets as strings
  import assetAsString from "./shader.glsl?raw";

  // Load Web Workers
  import Worker from "./worker.js?worker";

  // Web Workers inlined as base64 strings at build time
  import InlineWorker from "./worker.js?worker&inline";
  ```

- More details in [Static Asset Handling](https://vitejs.dev/guide/assets.html).

### JSON

- JSON files can be directly imported.
- Named imports are supported:

  ```javascript
  // import the entire object
  import json from "./example.json";
  // import a root field as named exports - helps with tree-shaking!
  import { field } from "./example.json";
  ```

### Glob Import

- Vite supports importing multiple modules from the file system via the `import.meta.glob` function:

  ```javascript
  const modules = import.meta.glob("./dir/*.js");
  ```

- The above is transformed into:

  ```javascript
  // code produced by vite
  const modules = {
    "./dir/foo.js": () => import("./dir/foo.js"),
    "./dir/bar.js": () => import("./dir/bar.js"),
  };
  ```

- Iterate over the keys of the `modules` object to access the corresponding modules:

  ```javascript
  for (const path in modules) {
    modules[path]().then((mod) => {
      console.log(path, mod);
    });
  }
  ```

- Matched files are lazy-loaded via dynamic import and split into separate chunks during build.
- To import all modules directly (e.g., for side-effects), pass `{ eager: true }`:

  ```javascript
  const modules = import.meta.glob("./dir/*.js", { eager: true });
  ```

- The above is transformed into:

  ```javascript
  // code produced by vite
  import * as __glob__0_0 from "./dir/foo.js";
  import * as __glob__0_1 from "./dir/bar.js";
  const modules = {
    "./dir/foo.js": __glob__0_0,
    "./dir/bar.js": __glob__0_1,
  };
  ```

### Multiple Patterns

- The first argument can be an array of globs:

  ```javascript
  const modules = import.meta.glob(["./dir/*.js", "./another/*.js"]);
  ```

### Negative Patterns

- Negative glob patterns (prefixed with `!`) are supported to exclude files:

  ```javascript
  const modules = import.meta.glob(["./dir/*.js", "!**/bar.js"]);

  // code produced by vite
  const modules = {
    "./dir/foo.js": () => import("./dir/foo.js"),
  };
  ```

### Named Imports

- Import specific parts of modules with the `import` option:

  ```javascript
  const modules = import.meta.glob("./dir/*.js", { import: "setup" });

  // code produced by vite
  const modules = {
    "./dir/foo.js": () => import("./dir/foo.js").then((m) => m.setup),
    "./dir/bar.js": () => import("./dir/bar.js").then((m) => m.setup),
  };
  ```

- Combined with `eager`, tree-shaking is enabled:

  ```javascript
  const modules = import.meta.glob("./dir/*.js", {
    import: "setup",
    eager: true,
  });

  // code produced by vite:
  import { setup as __glob__0_0 } from "./dir/foo.js";
  import { setup as __glob__0_1 } from "./dir/bar.js";
  const modules = {
    "./dir/foo.js": __glob__0_0,
    "./dir/bar.js": __glob__0_1,
  };
  ```

- Set `import` to `default` to import the default export:

  ```javascript
  const modules = import.meta.glob("./dir/*.js", {
    import: "default",
    eager: true,
  });

  // code produced by vite:
  import __glob__0_0 from "./dir/foo.js";
  import __glob__0_1 from "./dir/bar.js";
  const modules = {
    "./dir/foo.js": __glob__0_0,
    "./dir/bar.js": __glob__0_1,
  };
  ```

### Custom Queries

- Use the `query` option to provide queries to imports (e.g., for assets as strings or URLs):

  ```javascript
  const moduleStrings = import.meta.glob("./dir/*.svg", {
    query: "?raw",
    import: "default",
  });
  const moduleUrls = import.meta.glob("./dir/*.svg", {
    query: "?url",
    import: "default",
  });

  // code produced by vite:
  const moduleStrings = {
    "./dir/foo.svg": () => import("./dir/foo.js?raw").then((m) => m["default"]),
    "./dir/bar.svg": () => import("./dir/bar.js?raw").then((m) => m["default"]),
  };
  const moduleUrls = {
    "./dir/foo.svg": () => import("./dir/foo.js?url").then((m) => m["default"]),
    "./dir/bar.svg": () => import("./dir/bar.js?url").then((m) => m["default"]),
  };
  ```

- Provide custom queries for other plugins:

  ```javascript
  const modules = import.meta.glob("./dir/*.js", {
    query: { foo: "bar", bar: true },
  });
  ```

### Glob Import Caveats

- This is a Vite-only feature, not a web or ES standard.
- Glob patterns are treated like import specifiers: they must be relative (start with `./`), absolute (start with `/`, resolved relative to project root), or an alias path (see `resolve.alias` option).
- Glob matching is done via `tinyglobby`.
- All arguments in `import.meta.glob` must be literals. Variables or expressions are not allowed.

### Dynamic Import

- Vite supports dynamic import with variables:

  ```javascript
  const module = await import(`./dir/${file}.js`);
  ```

- Variables only represent file names one level deep. For more advanced usage, use the glob import feature.

### WebAssembly

- Pre-compiled `.wasm` files can be imported with `?init`.
- The default export is an initialization function that returns a Promise of the `WebAssembly.Instance`:

  ```javascript
  import init from "./example.wasm?init";

  init().then((instance) => {
    instance.exports.test();
  });
  ```

- The `init` function can take an `importObject` passed to `WebAssembly.instantiate`:

  ```javascript
  init({
    imports: {
      someFunc: () => {
        /* ... */
      },
    },
  }).then(() => {
    /* ... */
  });
  ```

- In production, `.wasm` files smaller than `assetInlineLimit` are inlined as base64 strings. Otherwise, they are treated as static assets.
- **NOTE**: The ES Module Integration Proposal for WebAssembly is not currently supported. Use `vite-plugin-wasm` or other community plugins.

### Accessing the WebAssembly Module

- To access the `Module` object, use an explicit URL import:

  ```javascript
  import wasmUrl from "foo.wasm?url";

  const main = async () => {
    const responsePromise = fetch(wasmUrl);
    const { module, instance } =
      await WebAssembly.instantiateStreaming(responsePromise);
    /* ... */
  };

  main();
  ```

### Fetching the module in Node.js

- In SSR, `fetch()` as part of the `?init` import may fail with `TypeError: Invalid URL`.
- Here's an alternative, assuming the project base is the current directory:

      ```javascript
      import wasmUrl from 'foo.wasm?url'
      import { readFile } from 'node:fs/promises'

      const main = async () => {
        const resolvedUrl = (await import('./test/boot.test.wasm?url')).default
        const buffer = await readFile('.' + resolvedUrl)
        const { instance } = await WebAssembly.instantiate(buffer, {
          /* ... */
        })
        /* ... */
      }

      main()
      ```

  =======

* Importing `.css` files injects their content into the page via a `<style>` tag with HMR support.

### `@import` Inlining and Rebasing

- Vite is pre-configured to support CSS `@import` inlining via `postcss-import`.
- Vite aliases are respected for CSS `@import`.
- All CSS `url()` references are automatically rebased to ensure correctness, even if imported files are in different directories.
- `@import` aliases and URL rebasing are also supported for Sass and Less files (see CSS Pre-processors).

### PostCSS

- If the project contains a valid PostCSS config (any format supported by `postcss-load-config`, e.g., `postcss.config.js`), it will be automatically applied to all imported CSS.
- CSS minification runs after PostCSS and uses the `build.cssTarget` option.

### CSS Modules

- Any CSS file ending with `.module.css` is considered a CSS module file.
- Importing such a file returns the corresponding module object.

  ```css
  /* example.module.css */
  .red {
    color: red;
  }
  ```

  ```javascript
  import classes from "./example.module.css";
  document.getElementById("foo").className = classes.red;
  ```

- CSS modules behavior can be configured via the `css.modules` option.
- If `css.modules.localsConvention` is set to enable camelCase locals (e.g., `localsConvention: 'camelCaseOnly'`), you can also use named imports:

  ```javascript
  // .apply-color -> applyColor
  import { applyColor } from "./example.module.css";
  document.getElementById("foo").className = applyColor;
  ```

### CSS Pre-processors

- Vite targets modern browsers, so using native CSS variables with PostCSS plugins that implement CSSWG drafts (e.g., `postcss-nesting`) and authoring plain, future-standards-compliant CSS is recommended.
- Vite provides built-in support for `.scss`, `.sass`, `.less`, `.styl`, and `.stylus` files.
- No Vite-specific plugins are needed, but the corresponding pre-processor must be installed:

  ```bash
  # .scss and .sass
  npm add -D sass-embedded # or sass

  # .less
  npm add -D less

  # .styl and .stylus
  npm add -D stylus
  ```

- Using Vue single-file components automatically enables `<style lang="sass">` etc.
- Vite improves `@import` resolving for Sass and Less, respecting Vite aliases.
- Relative `url()` references inside imported Sass/Less files in different directories are automatically rebased.
- `@import` alias and URL rebasing are not supported for Stylus due to its API constraints.
- CSS modules can be combined with pre-processors by prepending `.module` to the file extension (e.g., `style.module.scss`).

### Disabling CSS injection into the page

- The automatic injection of CSS can be turned off via the `?inline` query parameter.
- The processed CSS string is returned as the module's default export, but styles are not injected.

  ```javascript
  import "./foo.css"; // will be injected into the page
  import otherStyles from "./bar.css?inline"; // will not be injected
  ```

- **NOTE**: Default and named imports from CSS files (e.g., `import style from './foo.css'`) are removed since Vite 5. Use the `?inline` query instead.

### Lightning CSS

- Starting from Vite 4.4, there is experimental support for Lightning CSS.
- Enable it by adding `css.transformer: 'lightningcss'` to your config file and installing the `lightningcss` dependency:

  ```bash
  npm add -D lightningcss
  ```

- If enabled, CSS files are processed by Lightning CSS instead of PostCSS.
- Configure Lightning CSS options via the `css.lightningcss` config option.
- Configure CSS Modules using `css.lightningcss.cssModules` instead of `css.modules`.
- By default, Vite uses esbuild to minify CSS. Lightning CSS can be used as the CSS minifier with `build.cssMinify: 'lightningcss'`.
- **NOTE**: CSS Pre-processors are not supported when using Lightning CSS.

### Static Assets

- Importing a static asset returns the resolved public URL when served:

  ```javascript
  import imgUrl from "./img.png";
  document.getElementById("hero-img").src = imgUrl;
  ```

- Special queries modify how assets are loaded:

  ```javascript
  // Explicitly load assets as URL
  import assetAsURL from "./asset.js?url";

  // Load assets as strings
  import assetAsString from "./shader.glsl?raw";

  // Load Web Workers
  import Worker from "./worker.js?worker";

  // Web Workers inlined as base64 strings at build time
  import InlineWorker from "./worker.js?worker&inline";
  ```

- More details in [Static Asset Handling](https://vitejs.dev/guide/assets.html).

### JSON

- JSON files can be directly imported.
- Named imports are supported:

  ```javascript
  // import the entire object
  import json from "./example.json";
  // import a root field as named exports - helps with tree-shaking!
  import { field } from "./example.json";
  ```

### Glob Import

- Vite supports importing multiple modules from the file system via the `import.meta.glob` function:

  ```javascript
  const modules = import.meta.glob("./dir/*.js");
  ```

- The above is transformed into:

  ```javascript
  // code produced by vite
  const modules = {
    "./dir/foo.js": () => import("./dir/foo.js"),
    "./dir/bar.js": () => import("./dir/bar.js"),
  };
  ```

- Iterate over the keys of the `modules` object to access the corresponding modules:

  ```javascript
  for (const path in modules) {
    modules[path]().then((mod) => {
      console.log(path, mod);
    });
  }
  ```

- Matched files are lazy-loaded via dynamic import and split into separate chunks during build.
- To import all modules directly (e.g., for side-effects), pass `{ eager: true }`:

  ```javascript
  const modules = import.meta.glob("./dir/*.js", { eager: true });
  ```

- The above is transformed into:

  ```javascript
  // code produced by vite
  import * as __glob__0_0 from "./dir/foo.js";
  import * as __glob__0_1 from "./dir/bar.js";
  const modules = {
    "./dir/foo.js": __glob__0_0,
    "./dir/bar.js": __glob__0_1,
  };
  ```

### Multiple Patterns

- The first argument can be an array of globs:

  ```javascript
  const modules = import.meta.glob(["./dir/*.js", "./another/*.js"]);
  ```

### Negative Patterns

- Negative glob patterns (prefixed with `!`) are supported to exclude files:

  ```javascript
  const modules = import.meta.glob(["./dir/*.js", "!**/bar.js"]);

  // code produced by vite
  const modules = {
    "./dir/foo.js": () => import("./dir/foo.js"),
  };
  ```

### Named Imports

- Import specific parts of modules with the `import` option:

  ```javascript
  const modules = import.meta.glob("./dir/*.js", { import: "setup" });

  // code produced by vite
  const modules = {
    "./dir/foo.js": () => import("./dir/foo.js").then((m) => m.setup),
    "./dir/bar.js": () => import("./dir/bar.js").then((m) => m.setup),
  };
  ```

- Combined with `eager`, tree-shaking is enabled:

  ```javascript
  const modules = import.meta.glob("./dir/*.js", {
    import: "setup",
    eager: true,
  });

  // code produced by vite:
  import { setup as __glob__0_0 } from "./dir/foo.js";
  import { setup as __glob__0_1 } from "./dir/bar.js";
  const modules = {
    "./dir/foo.js": __glob__0_0,
    "./dir/bar.js": __glob__0_1,
  };
  ```

- Set `import` to `default` to import the default export:

  ```javascript
  const modules = import.meta.glob("./dir/*.js", {
    import: "default",
    eager: true,
  });

  // code produced by vite:
  import __glob__0_0 from "./dir/foo.js";
  import __glob__0_1 from "./dir/bar.js";
  const modules = {
    "./dir/foo.js": __glob__0_0,
    "./dir/bar.js": __glob__0_1,
  };
  ```

### Custom Queries

- Use the `query` option to provide queries to imports (e.g., for assets as strings or URLs):

  ```javascript
  const moduleStrings = import.meta.glob("./dir/*.svg", {
    query: "?raw",
    import: "default",
  });
  const moduleUrls = import.meta.glob("./dir/*.svg", {
    query: "?url",
    import: "default",
  });

  // code produced by vite:
  const moduleStrings = {
    "./dir/foo.svg": () => import("./dir/foo.js?raw").then((m) => m["default"]),
    "./dir/bar.svg": () => import("./dir/bar.js?raw").then((m) => m["default"]),
  };
  const moduleUrls = {
    "./dir/foo.svg": () => import("./dir/foo.js?url").then((m) => m["default"]),
    "./dir/bar.svg": () => import("./dir/bar.js?url").then((m) => m["default"]),
  };
  ```

- Provide custom queries for other plugins:

  ```javascript
  const modules = import.meta.glob("./dir/*.js", {
    query: { foo: "bar", bar: true },
  });
  ```

### Glob Import Caveats

- This is a Vite-only feature, not a web or ES standard.
- Glob patterns are treated like import specifiers: they must be relative (start with `./`), absolute (start with `/`, resolved relative to project root), or an alias path (see `resolve.alias` option).
- Glob matching is done via `tinyglobby`.
- All arguments in `import.meta.glob` must be literals. Variables or expressions are not allowed.

### Dynamic Import

- Vite supports dynamic import with variables:

  ```javascript
  const module = await import(`./dir/${file}.js`);
  ```

- Variables only represent file names one level deep. For more advanced usage, use the glob import feature.

### WebAssembly

- Pre-compiled `.wasm` files can be imported with `?init`.
- The default export is an initialization function that returns a Promise of the `WebAssembly.Instance`:

  ```javascript
  import init from "./example.wasm?init";

  init().then((instance) => {
    instance.exports.test();
  });
  ```

- The `init` function can take an `importObject` passed to `WebAssembly.instantiate`:

  ```javascript
  init({
    imports: {
      someFunc: () => {
        /* ... */
      },
    },
  }).then(() => {
    /* ... */
  });
  ```

- In production, `.wasm` files smaller than `assetInlineLimit` are inlined as base64 strings. Otherwise, they are treated as static assets.
- **NOTE**: The ES Module Integration Proposal for WebAssembly is not currently supported. Use `vite-plugin-wasm` or other community plugins.

### Accessing the WebAssembly Module

- To access the `Module` object, use an explicit URL import:

  ```javascript
  import wasmUrl from "foo.wasm?url";

  const main = async () => {
    const responsePromise = fetch(wasmUrl);
    const { module, instance } =
      await WebAssembly.instantiateStreaming(responsePromise);
    /* ... */
  };

  main();
  ```

### Fetching the module in Node.js

- In SSR, `fetch()` as part of the `?init` import may fail with `TypeError: Invalid URL`.
- Here's an alternative, assuming the project base is the current directory:

  ```javascript
  import wasmUrl from "foo.wasm?url";
  import { readFile } from "node:fs/promises";

  const main = async () => {
    const resolvedUrl = (await import("./test/boot.test.wasm?url")).default;
    const buffer = await readFile("." + resolvedUrl);
    const { instance } = await WebAssembly.instantiate(buffer, {
      /* ... */
    });
    /* ... */
  };

  main();
  ```

  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5

### Web Workers

#### Import with Constructors

<<<<<<< HEAD

- Web worker scripts can be imported using `new Worker()` and `new SharedWorker()`.
- This syntax is closer to standards and is the recommended way to create workers.

  ```javascript
  const worker = new Worker(new URL("./worker.js", import.meta.url));
  ```

- The worker constructor accepts options, including creating "module" workers:

  ```javascript
  const worker = new Worker(new URL("./worker.js", import.meta.url), {
    type: "module",
  });
  ```

- Worker detection only works if `new URL()` is used directly inside `new Worker()`.
- All options parameters must be static values (string literals).

#### Import with Query Suffixes

- Web worker scripts can be imported by appending `?worker` or `?sharedworker` to the import request.
- The default export is a custom worker constructor:

  ```javascript
  import MyWorker from "./worker?worker";

  const worker = new MyWorker();
  ```

- Worker scripts can use ESM import statements instead of `importScripts()`.
- During development, this relies on browser native support, but it is compiled away for production.
- By default, the worker script is emitted as a separate chunk in production.
- To inline the worker as base64 strings, add the `inline` query:

  ```javascript
  import MyWorker from "./worker?worker&inline";
  ```

- To retrieve the worker as a URL, add the `url` query:

  ```javascript
  import MyWorker from "./worker?worker&url";
  ```

- See [Worker Options](https://vitejs.dev/config/build-options.html#build-worker) for details on configuring worker bundling.

### Content Security Policy (CSP)

- To deploy CSP, certain directives or configs must be set due to Vite's internals.

#### `'nonce-{RANDOM}'`

- When `html.cspNonce` is set, Vite adds a `nonce` attribute with the specified value to `<script>`, `<style>`, `<link>` (for stylesheets and module preloading) tags.
- Vite injects a meta tag (`<meta property="csp-nonce" nonce="PLACEHOLDER" />`).
- The nonce value of a meta tag with `property="csp-nonce"` is used by Vite during dev and after build.
- **WARNING**: Replace the placeholder with a unique value for each request to prevent bypassing a resource's policy.

#### `data:`

- By default, Vite inlines small assets as data URIs during build.
- Allow `data:` for related directives (e.g., `img-src`, `font-src`) or disable it by setting `build.assetsInlineLimit: 0`.
- **WARNING**: Do not allow `data:` for `script-src`. It allows injection of arbitrary scripts.

### Build Optimizations

- Features below are automatically applied during build. No explicit configuration is needed unless you want to disable them.

#### CSS Code Splitting

- Vite automatically extracts CSS used by modules in an async chunk and generates a separate file.
- The CSS file is loaded via a `<link>` tag when the associated async chunk is loaded.
- The async chunk is evaluated after the CSS is loaded to avoid FOUC.
- To extract all CSS into a single file, disable CSS code splitting by setting `build.cssCodeSplit` to `false`.

#### Preload Directives Generation

- Vite automatically generates `<link rel="modulepreload">` directives for entry chunks and their direct imports in the built HTML.

#### Async Chunk Loading Optimization

- Rollup often generates "common" chunks (shared code).
- Combined with dynamic imports, a common scenario is:

  ```
  Entry
  async chunk A
  common chunk C
  async chunk B
  dynamic import
  direct import
  ```

- Without optimization, when async chunk A is imported, the browser requests and parses A before discovering it needs common chunk C, resulting in an extra network roundtrip:

  ```
  Entry ---> A ---> C
  ```

- Vite rewrites code-split dynamic import calls with a preload step, so when A is requested, C is fetched in parallel:

  ```
  Entry ---> (A + C)
  ```

- # Vite traces all direct imports to eliminate roundtrips regardless of import depth.

* Web worker scripts can be imported using `new Worker()` and `new SharedWorker()`.
* This syntax is closer to standards and is the recommended way to create workers.

  ```javascript
  const worker = new Worker(new URL("./worker.js", import.meta.url));
  ```

* The worker constructor accepts options, including creating "module" workers:

  ```javascript
  const worker = new Worker(new URL("./worker.js", import.meta.url), {
    type: "module",
  });
  ```

* Worker detection only works if `new URL()` is used directly inside `new Worker()`.
* All options parameters must be static values (string literals).

#### Import with Query Suffixes

- Web worker scripts can be imported by appending `?worker` or `?sharedworker` to the import request.
- The default export is a custom worker constructor:

  ```javascript
  import MyWorker from "./worker?worker";

  const worker = new MyWorker();
  ```

- Worker scripts can use ESM import statements instead of `importScripts()`.
- During development, this relies on browser native support, but it is compiled away for production.
- By default, the worker script is emitted as a separate chunk in production.
- To inline the worker as base64 strings, add the `inline` query:

  ```javascript
  import MyWorker from "./worker?worker&inline";
  ```

- To retrieve the worker as a URL, add the `url` query:

  ```javascript
  import MyWorker from "./worker?worker&url";
  ```

- See [Worker Options](https://vitejs.dev/config/build-options.html#build-worker) for details on configuring worker bundling.

### Content Security Policy (CSP)

- To deploy CSP, certain directives or configs must be set due to Vite's internals.

#### `'nonce-{RANDOM}'`

- When `html.cspNonce` is set, Vite adds a `nonce` attribute with the specified value to `<script>`, `<style>`, `<link>` (for stylesheets and module preloading) tags.
- Vite injects a meta tag (`<meta property="csp-nonce" nonce="PLACEHOLDER" />`).
- The nonce value of a meta tag with `property="csp-nonce"` is used by Vite during dev and after build.
- **WARNING**: Replace the placeholder with a unique value for each request to prevent bypassing a resource's policy.

#### `data:`

- By default, Vite inlines small assets as data URIs during build.
- Allow `data:` for related directives (e.g., `img-src`, `font-src`) or disable it by setting `build.assetsInlineLimit: 0`.
- **WARNING**: Do not allow `data:` for `script-src`. It allows injection of arbitrary scripts.

### Build Optimizations

- Features below are automatically applied during build. No explicit configuration is needed unless you want to disable them.

#### CSS Code Splitting

- Vite automatically extracts CSS used by modules in an async chunk and generates a separate file.
- The CSS file is loaded via a `<link>` tag when the associated async chunk is loaded.
- The async chunk is evaluated after the CSS is loaded to avoid FOUC.
- To extract all CSS into a single file, disable CSS code splitting by setting `build.cssCodeSplit` to `false`.

#### Preload Directives Generation

- Vite automatically generates `<link rel="modulepreload">` directives for entry chunks and their direct imports in the built HTML.

#### Async Chunk Loading Optimization

- Rollup often generates "common" chunks (shared code).
- Combined with dynamic imports, a common scenario is:

  ```
  Entry
  async chunk A
  common chunk C
  async chunk B
  dynamic import
  direct import
  ```

- Without optimization, when async chunk A is imported, the browser requests and parses A before discovering it needs common chunk C, resulting in an extra network roundtrip:

  ```
  Entry ---> A ---> C
  ```

- Vite rewrites code-split dynamic import calls with a preload step, so when A is requested, C is fetched in parallel:

  ```
  Entry ---> (A + C)
  ```

- Vite traces all direct imports to eliminate roundtrips regardless of import depth.
  > > > > > > > 63dca8d5539d2e868b14b5069e1529afc878a3b5
