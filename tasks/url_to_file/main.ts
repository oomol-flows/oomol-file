import type { Context } from "@oomol/types/oocana";

import path from "path";
import fs from "fs/promises";
import download from "~/shared/downloader";

type Inputs = {
  readonly url: string;
  readonly query: Record<string, string>;
  readonly headers: Record<string, string>;
  readonly timeout: number | null;
  readonly retry_times: number;
};

type Outputs = {
  readonly file_path: string;
};

export default async function (
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const fileNameWithExt = path.basename(params.url);
  const filePath = path.join(context.sessionDir, fileNameWithExt);
  const folderPath = path.dirname(filePath);
  const binary = await download({
    ...params,
    reportProgress: p => context.reportProgress(p),
  });
  await fs.mkdir(folderPath, { recursive: true });
  await fs.writeFile(filePath, binary);

  return { file_path: filePath };
}