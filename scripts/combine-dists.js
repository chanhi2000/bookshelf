// /bookshelf/scripts/combine-dists.js
import fs from "fs-extra";
import path from "path";

const rootDir = process.cwd();
const mainDocsDist = path.join(rootDir, "packages/main-docs/src/.vuepress/dist");
const archivedDocsDist = path.join(rootDir, "packages/archived-docs/src/.vuepress/dist");
const finalDist = path.join(rootDir, "dist");

async function combine() {
  console.log("Combining build outputs...");

  // 1. Clean previous final output
  await fs.remove(finalDist);

  // 2. Copy the main documentation build as the base
  if (await fs.pathExists(mainDocsDist)) {
    await fs.copy(mainDocsDist, finalDist);
    console.log("Copied main-docs.");
  } else {
    console.error("Main docs dist folder not found!");
    process.exit(1);
  }

  // 3. Create a subdirectory for the archived docs
  const archiveTargetPath = path.join(finalDist, "archive");
  
  // 4. Copy the archived documentation build into the subdirectory
  if (await fs.pathExists(archivedDocsDist)) {
    await fs.copy(archivedDocsDist, archiveTargetPath);
    console.log("Copied archived-docs into /archive/.");
  } else {
    console.error("Archived docs dist folder not found!");
    // This might not be a fatal error, depending on your setup
  }

  console.log("✅ Combination complete! Final output is in /dist.");
}

combine();