import type { Context } from "@oomol/types/oocana";

import { promises as fs } from "fs";
import { join, dirname } from "path";

type Inputs = {
  readonly binary: Buffer;
  readonly suffix: string | null;
  readonly file_path: string | null;
};

type Outputs = {
  readonly file_path: string;
};

export default async function (
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  let filePath = params.file_path;
  if (filePath === null) {
    filePath = join(context.sessionDir, context.jobId);
  }
  if (params.suffix !== null) {
    filePath = filePath + params.suffix;
  }
  const fileDirPath = dirname(filePath);
  try {
    await fs.mkdir(fileDirPath, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
  await fs.writeFile(filePath, params.binary);

  return { file_path: filePath };
};
