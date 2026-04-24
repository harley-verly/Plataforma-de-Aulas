import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");

const sequences = {
  "build:packages": [
    {
      kind: "node",
      script: "node_modules/typescript/bin/tsc",
      args: ["-p", "packages/contracts/tsconfig.json"]
    },
    {
      kind: "node",
      script: "node_modules/typescript/bin/tsc",
      args: ["-p", "packages/config/tsconfig.json"]
    },
    {
      kind: "node",
      script: "node_modules/typescript/bin/tsc",
      args: ["-p", "packages/ui/tsconfig.json"]
    }
  ],
  typecheck: [
    {
      kind: "sequence",
      sequence: "build:packages"
    },
    {
      kind: "node",
      script: "node_modules/typescript/bin/tsc",
      args: ["-p", "apps/api/tsconfig.json", "--noEmit"]
    },
    {
      kind: "node",
      script: "node_modules/typescript/bin/tsc",
      args: ["-p", "apps/web/tsconfig.app.json", "--noEmit"]
    }
  ],
  build: [
    {
      kind: "sequence",
      sequence: "build:packages"
    },
    {
      kind: "node",
      script: "node_modules/typescript/bin/tsc",
      args: ["-p", "apps/api/tsconfig.build.json"]
    },
    {
      kind: "node",
      script: "apps/web/node_modules/vite/bin/vite.js",
      args: ["build"],
      cwd: "apps/web"
    }
  ]
};

const sequenceName = process.argv[2];
const sequence = sequenceName ? sequences[sequenceName] : undefined;

if (!sequenceName || !sequence) {
  console.error("Uso: node scripts/run-workspace-sequence.mjs <build:packages|typecheck|build>");
  process.exit(1);
}

function runNodeTask(task) {
  const scriptPath = resolve(repoRoot, task.script);
  const cwd = task.cwd ? resolve(repoRoot, task.cwd) : repoRoot;
  const env = { ...process.env };

  for (const key of Object.keys(env)) {
    if (key.startsWith("npm_") || key.startsWith("pnpm_")) {
      delete env[key];
    }
  }

  env.INIT_CWD = cwd;
  const result = spawnSync(process.execPath, [scriptPath, ...task.args], {
    stdio: "inherit",
    cwd,
    env,
    shell: false
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if ((result.status ?? 1) !== 0) {
    process.exit(result.status ?? 1);
  }
}

function runSequence(name) {
  const tasks = sequences[name];

  for (const task of tasks) {
    if (task.kind === "sequence") {
      runSequence(task.sequence);
      continue;
    }

    runNodeTask(task);
  }
}

runSequence(sequenceName);
