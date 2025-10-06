// scripts/combine-dists.js
import fs from "fs-extra";
import path from "path";

// --- Configuration ---
// Define the paths to your different project source directories.
// This makes it easy to add more projects later.
const rootDir = process.cwd();
const finalDist = path.join(rootDir, "dist");

const mainProject = {
  name: 'main-docs',
  // Path to the source directory containing '.vuepress'
  distPath: path.join(rootDir, 'src/.vuepress/dist')
};

const subProjects = [
  {
    name: 'freecodecamp-org',
    // Path to the source directory containing '.vuepress'
    distPath: path.join(rootDir, 'docs/freecodecamp-org/src/.vuepress/dist'),
    // The name of the sub-directory it will live in within the final output
    targetSubdir: 'fcc'
  },
  // You can add more sub-projects here in the future
  // {
  //   name: 'archived-docs',
  //   distPath: path.join(rootDir, 'packages/archived-docs/src/.vuepress/dist'),
  //   targetSubdir: 'archive'
  // }
];

// --- Main Execution ---
async function combine() {
  console.log("🚀 Starting build combination process...");

  // 1. Clean previous final output to ensure a fresh build
  await fs.remove(finalDist);
  console.log("🧹 Cleaned previous final /dist directory.");

  // 2. Copy the main project's entire dist folder as the base
  if (await fs.pathExists(mainProject.distPath)) {
    await fs.copy(mainProject.distPath, finalDist);
    console.log(`✅ Copied base project '${mainProject.name}' to /dist.`);
  } else {
    console.error(`❌ Dist folder for main project '${mainProject.name}' not found! Build cannot continue.`);
    process.exit(1);
  }

  // 3. Process each sub-project
  for (const project of subProjects) {
    console.log(`\nProcessing sub-project: '${project.name}'...`);
    
    if (!(await fs.pathExists(project.distPath))) {
      console.warn(`⚠️ Dist folder for '${project.name}' not found. Skipping.`);
      continue;
    }

    const assetsSourcePath = path.join(project.distPath, 'assets');
    const assetsTargetPath = path.join(finalDist, 'assets');

    // 3a. MERGE the 'assets' directory from the sub-project into the root /dist/assets
    if (await fs.pathExists(assetsSourcePath)) {
      await fs.copy(assetsSourcePath, assetsTargetPath, { overwrite: true });
      console.log(`- Merged 'assets' from '${project.name}' into /dist/assets.`);
    }

    // 3b. COPY everything ELSE from the sub-project's dist into its target subdirectory
    // We use a filter to EXCLUDE the 'assets' folder from this copy operation,
    // as we have already handled it.
    const filterFunc = (src) => {
      // Return 'false' to skip copying the 'assets' directory itself.
      // All other files and directories will return 'true'.
      return src !== assetsSourcePath;
    };
    
    const targetPath = path.join(finalDist, project.targetSubdir);
    await fs.copy(project.distPath, targetPath, { filter: filterFunc });
    console.log(`- Copied other content from '${project.name}' to '/${project.targetSubdir}/'.`);
  }

  console.log("\n🎉 Combination complete! Final output is in /dist.");
}

// Run the function
combine();