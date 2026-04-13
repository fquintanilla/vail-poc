import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "src/lib/types/contentstack.ts");

/** pnpm forwards extra args as `node …/contentstack-tsgen.mjs -- -a vail`; strip sentinel `--`. */
let forward = process.argv.slice(2);
while (forward[0] === "--") forward.shift();

const args = [
  "tsgen",
  "-o",
  outFile,
  "--no-doc",
  "--include-editable-tags",
  "--include-system-fields",
  ...forward,
];

const result = spawnSync("csdx", args, {
  cwd: root,
  env: process.env,
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
