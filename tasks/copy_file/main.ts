import type { Context } from "@oomol/types/oocana";
import fs from "fs-extra";
import path from "path";

type Inputs = {
  source_file: string;
  destination_folder: string | null;
};
type Outputs = {
  destination_folder: string;
};

export default async function (
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const { source_file } = params;
  let { destination_folder } = params;
  if (destination_folder === null) {
    destination_folder = context.sessionDir;
  }
  await copyFileToDir(source_file, destination_folder);
  return { destination_folder };
}

async function copyFileToDir(sourceFile: string, destinationDir: string) {
  try {
    await fs.ensureDir(destinationDir);

    const fileName = path.basename(sourceFile);
    const destinationFile = path.join(destinationDir, fileName);

    if (path.resolve(sourceFile) === path.resolve(destinationFile)) {
      console.warn(`Source and destination are the same: ${sourceFile}. Skipping copy.`);
      return;
    }

    await fs.copy(sourceFile, destinationFile);
    console.log(`File ${fileName} copied successfully!`);
  } catch (err) {
    console.error("Error copying file:", err);
    throw err;
  }
}