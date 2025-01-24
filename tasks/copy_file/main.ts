import type { Context } from "@oomol/types/oocana";
import fs from "fs-extra";

type Inputs = {
  source_file: string;
  destination_dir: string | null;
}
type Outputs = {
  destination_dir: string;
}

export default async function(
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const {source_file, destination_dir} = params;
  const target_dir = destination_dir === null ? context.sessionDir : destination_dir;
  await copyFileToDir(source_file, destination_dir);

  return { destination_dir: target_dir };
};

async function copyFileToDir(sourceFile: string, destinationDir: string) {
  try {
    await fs.ensureDir(destinationDir);

    const fileName = sourceFile.split('/').pop();

    const destinationFile = `${destinationDir}/${fileName}`;

    await fs.copy(sourceFile, destinationFile);
    console.log('File copied successfully!');
  } catch (err) {
    console.error('Error copying file:', err);
    throw err;
  }
}