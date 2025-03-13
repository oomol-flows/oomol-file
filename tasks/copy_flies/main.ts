import type { Context } from "@oomol/types/oocana";
import fs from "fs-extra";
import path from "path";

type Inputs = {
  source_files: string[];
  destination_folder: string | null;
};
type Outputs = {
  destination_folder: string;
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
  await copyFilesToDir(source_files, destination_folder); 
  return { destination_folder: destination_folder };
}

async function copyFilesToDir(sourceFiles: string[], destinationDir: string) {
  try {
    await fs.ensureDir(destinationDir);

    for (const sourceFile of sourceFiles) {
      const fileName = path.basename(sourceFile);
      const destinationFile = path.join(destinationDir, fileName);
      await fs.copy(sourceFile, destinationFile);
      console.log(`File ${fileName} copied successfully!`);
    }
  } catch (err) {
    console.error("Error copying files:", err);
    throw err;
  }
}
