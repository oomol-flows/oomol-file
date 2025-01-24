import type { Context } from "@oomol/types/oocana";
import fs from "fs-extra";
import path from "path";

type Inputs = {
  source_files: string[];
  destination_dir: string | null;
};
type Outputs = {
  destination_dir: string;
};

export default async function (
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const { source_files, destination_dir } = params;
  const target_dir = destination_dir === null ? context.sessionDir : destination_dir;
  await copyFilesToDir(source_files, target_dir); 

  return { destination_dir: target_dir };
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
