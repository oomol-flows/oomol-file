import type { Context } from "@oomol/types/oocana";
import fs from "fs-extra";
import path from "path";

type Inputs = {
  source_files: string[];
  destination_folder: string | null;
};
type Outputs = {
  destination_files: string[];
};

export default async function (
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const { source_files } = params;
  let { destination_folder } = params;
  if (destination_folder === null) {
    destination_folder = context.sessionDir;
  }
  const destinationFiles = await copyFilesToDir(source_files, destination_folder); 
  return { destination_files: destinationFiles };
}

async function copyFilesToDir(sourceFiles: string[], destinationDir: string) {
  try {
    await fs.ensureDir(destinationDir);
    const destinationFiles: string[] = [];

    for (const sourceFile of sourceFiles) {
      const fileName = path.basename(sourceFile);
      const destinationFile = path.join(destinationDir, fileName);
      await fs.copy(sourceFile, destinationFile);
      destinationFiles.push(destinationFile);
      console.log(`File ${fileName} copied successfully!`);
    }
    return destinationFiles;
  } catch (err) {
    console.error("Error copying files:", err);
    throw err;
  }
}