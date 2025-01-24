import type { Context } from "@oomol/types/oocana";
import fs from "fs-extra"
import path from "path";

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
  let target_dir = destination_dir;
  
  if (target_dir === null) {
    target_dir = path.join(context.sessionDir, context.jobId);
  }
  try {
    await fs.copy(source_dir, target_dir);
    console.log('Folder copied successfully!');
  } catch (err) {
    console.error('Error copying folder:', err);
    throw err;
  }

  return { destination_dir: target_dir };
};
