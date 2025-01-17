import { execSync } from "child_process";

function parseGitCommitDate(gitCommitDate) {
  return new Date(gitCommitDate);
}

function formatDate(date) {
  return date.toUTCString();
}

export function getBuildInfo() {
  const gitBranch = execSync("git rev-parse --abbrev-ref HEAD", {
    encoding: "utf-8",
  }).trim();
  const gitCommitHash = execSync("git rev-parse HEAD", {
    encoding: "utf-8",
  }).trim();
  const gitCommitTag = execSync("git tag --points-at HEAD", {
    encoding: "utf-8",
  }).trim();

  const gitCommitDate = execSync("git show -s --format=%ci HEAD", {
    encoding: "utf-8",
  }).trim();
  const gitCommitDateParsed = parseGitCommitDate(gitCommitDate);
  const gitCommitDateFormatted = formatDate(gitCommitDateParsed);

  const buildDate = formatDate(new Date());

  const env = {
    GIT_BRANCH: (() => gitBranch)(),
    GIT_COMMIT_HASH: (() => gitCommitHash.slice(0, 7))(),
    GIT_COMMIT_TAG: (() => gitCommitTag)(),
    GIT_COMMIT_DATE: (() => gitCommitDateFormatted)(),
    BUILD_DATE: buildDate,
  };

  return env;
}

export function getBuildMetadata() {
  return {
    env: process.env.BUILD_ENV || process.env.GIT_BRANCH,
    "last-update": [
      process.env.GIT_COMMIT_DATE,
      process.env.GIT_COMMIT_TAG,
      process.env.GIT_COMMIT_HASH,
    ]
      .filter(Boolean)
      .join(" - "),
    "last-build ": process.env.BUILD_DATE,
  };
}
