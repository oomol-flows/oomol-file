import type { Context } from "@oomol/types/oocana";
import fs from "fs-extra"
import path from "path";

type Inputs = {
  source_folder: string;
  destination_folder: string | null;
}
type Outputs = {
  destination_folder: string;
}

export default async function (
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const { source_folder } = params;
  let { destination_folder } = params;
  
  if (destination_folder === null) {
    destination_folder = path.join(context.sessionDir, context.jobId);
  }
  try {
    await fs.copy(source_folder, destination_folder);
    console.log('Folder copied successfully!');
  } catch (err) {
    console.error('Error copying folder:', err);
    throw err;
  }

  return { destination_folder };
};
