import type { Context } from "@oomol/types/oocana";
import fs from "fs-extra";
import path from "path";

type Inputs = {
  source_file: string;
  destination_dir: string | null;
};
type Outputs = {
  destination_dir: string;
};

export default async function (
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const { source_file, destination_dir } = params;
  const target_dir = destination_dir === null ? context.sessionDir : destination_dir;
  await copyFileToDir(source_file, target_dir);

  return { destination_dir: target_dir };
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