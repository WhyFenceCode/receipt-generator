import { execFile } from "child_process";
import { promisify } from "util";
import simpleGit from "simple-git";
import tmp from "tmp";
import fs from "fs";
import path from "path";

const execFileAsync = promisify(execFile);

async function runCloc(dir) {
  const { stdout } = await execFileAsync("npx", ["cloc", dir, "--json"], {
    maxBuffer: 1024 * 1024 * 10
  });
  return JSON.parse(stdout);
}

async function cloneRepo(repoUrl) {
  const tmpDir = tmp.dirSync({ unsafeCleanup: true });
  const git = simpleGit();
  await git.clone(repoUrl, tmpDir.name);
  return tmpDir;
}

export function simplifyClocOutput(clocJson) {
  const temp = [];

  for (const [lang, stats] of Object.entries(clocJson)) {
    if (lang === "header" || lang === "SUM") continue;

    if (typeof stats === "object" && "code" in stats && "comment" in stats) {
      temp.push([lang, stats.code + stats.comment]);
    }
  }

  temp.sort((a, b) => b[1] - a[1]);

  return Object.fromEntries(temp);
}


export async function countLinesByLanguage(repoUrl) {
  const tmpDir = await cloneRepo(repoUrl);
  const raw = await runCloc(tmpDir.name);

  tmpDir.removeCallback();

  return simplifyClocOutput(raw);
}

function countLinesInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  return content.split("\n").length;
}

function countLinesRecursively(dir) {
  let total = 0;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.name === ".git" || entry.name === "node_modules") continue;

    if (entry.isDirectory()) {
      total += countLinesRecursively(fullPath);
    } else if (entry.isFile()) {
      total += countLinesInFile(fullPath);
    }
  }
  return total;
}

export async function countTotalLines(repoUrl) {
  const tmpDir = await cloneRepo(repoUrl);

  const total = countLinesRecursively(tmpDir.name);

  tmpDir.removeCallback();
  return total;
}