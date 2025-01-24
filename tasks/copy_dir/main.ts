import type { Context } from "@oomol/types/oocana";
import fs from "fs-extra"

type Inputs = {
  source_dir: string;
  destination_dir: string | null;
}
type Outputs = {
  destination_dir: string;
}

export default async function (
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const { source_dir, destination_dir } = params;

  const target_dir = destination_dir === null ? context.sessionDir : destination_dir;
  try {
    await fs.copy(source_dir, target_dir);
    console.log('Folder copied successfully!');
  } catch (err) {
    console.error('Error copying folder:', err);
    throw err;
  }

  return { destination_dir: target_dir };
};
