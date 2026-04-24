import { spawnSync } from "node:child_process";

// Reuse the active package manager executable so nested workspace scripts
// keep working on both Windows and Linux without relying on global PATH setup.
const forwardedArgs = process.argv.slice(2);
const npmExecPath = process.env.npm_execpath;
const looksLikeNodeScript = npmExecPath ? /\.(?:c?js|mjs)$/i.test(npmExecPath) : false;

const command = npmExecPath
  ? looksLikeNodeScript
    ? process.execPath
    : npmExecPath
  : process.platform === "win32"
    ? "pnpm.cmd"
    : "pnpm";

const args = npmExecPath
  ? looksLikeNodeScript
    ? [npmExecPath, ...forwardedArgs]
    : forwardedArgs
  : forwardedArgs;

const result = spawnSync(command, args, {
  stdio: "inherit",
  env: process.env,
  shell: false,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
