import { terser } from "rollup-plugin-terser";
import ts from "rollup-plugin-ts";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import filesize from "rollup-plugin-filesize";

const SOURCE_DIR = ".";
const OUTPUT_DIR = "hacker-news-client";

export default function RollupConfig({ watch }) {
  const tsPlugin = ts({
    transpiler: "babel",
  });
  // JS modules for bundlers
  const modules = [
    {
      input: `${SOURCE_DIR}/lib/index.ts`,
      external: ["cross-fetch", "cross-fetch/polyfill"],
      output: {
        file: `${OUTPUT_DIR}/index.js`,
        format: "esm",
        sourcemap: true,
      },
      plugins: [
        tsPlugin,
        babel({
          exclude: "node_modules/**",
          babelHelpers: "bundled",
          presets: [["@babel/preset-env", { loose: true }]],
        }),
        copy({
          targets: [
            { src: `${SOURCE_DIR}/package.json`, dest: OUTPUT_DIR },
            { src: `${SOURCE_DIR}/README.md`, dest: OUTPUT_DIR },
            { src: "LICENSE", dest: OUTPUT_DIR },
          ],
          verbose: true,
        }),
      ],
    },
  ];

  // JS modules for <script type=module>
  const webModules = [
    {
      input: `${SOURCE_DIR}/lib/index.ts`,
      external: ["cross-fetch", "cross-fetch/polyfill"],
      output: {
        file: `${OUTPUT_DIR}/hacker-news-client.development.js`,
        format: "esm",
        sourcemap: true,
      },
      plugins: [
        tsPlugin,
        babel({ exclude: /node_modules/, babelHelpers: "bundled" }),
      ],
    },
    {
      input: `${SOURCE_DIR}/lib/index.ts`,
      external: ["cross-fetch", "cross-fetch/polyfill"],
      output: {
        file: `${OUTPUT_DIR}/hacker-news-client.production.min.js`,
        format: "esm",
        sourcemap: true,
      },
      plugins: [
        ts({ transpiler: "babel" }),
        babel({ exclude: "node_modules/**", babelHelpers: "bundled" }),
        terser({ ecma: 8, safari10: true }),
        filesize(),
      ],
    },
  ];

  // UMD modules for <script> tags and CommonJS (node)
  const globals = [
    {
      input: `${SOURCE_DIR}/lib/index.ts`,
      external: ["cross-fetch", "cross-fetch/polyfill"],
      output: {
        file: `${OUTPUT_DIR}/umd/hacker-news-client.development.js`,
        format: "umd",
        sourcemap: true,
        name: "HackerNewsClient",
      },
      plugins: [
        tsPlugin,
        babel({
          exclude: "node_modules/**",
          babelHelpers: "bundled",
          presets: [["@babel/preset-env", { loose: true }]],
        }),
        nodeResolve(),
        commonjs(),
      ],
    },
    {
      input: `${SOURCE_DIR}/lib/index.ts`,
      external: ["cross-fetch", "cross-fetch/polyfill"],
      output: {
        file: `${OUTPUT_DIR}/umd/hacker-news-client.production.min.js`,
        format: "umd",
        sourcemap: true,
        name: "HackerNewsClient",
      },
      plugins: [
        tsPlugin,
        babel({
          exclude: "node_modules/**",
          babelHelpers: "bundled",
          presets: [["@babel/preset-env", { loose: true }]],
        }),
        terser(),
        filesize(),
      ],
    },
  ];

  // Node entry points
  const node = [
    {
      input: `${SOURCE_DIR}/node-main.js`,
      external: ["cross-fetch", "cross-fetch/polyfill"],
      output: {
        file: `${OUTPUT_DIR}/main.js`,
        format: "cjs",
      },
      plugins: [],
    },
  ];

  return [...modules, ...webModules, ...globals, ...node];
}
