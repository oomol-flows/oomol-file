import type { Context } from "@oomol/types/oocana";

import path from "path";
import fs from "fs/promises";
import download from "~/shared/downloader";

//#region generated meta
type Inputs = {
  url: string;
  ext_name: string | null;
  query: Record<string, any>;
  headers: Record<string, any>;
  timeout: number;
  retry_times: number;
};
type Outputs = {
  file_path: string;
};
//#endregion

export default async function (params: Inputs, context: Context<Inputs, Outputs>): Promise<Outputs> {
  let [fileName, extName] = splitExtNames(path.basename(params.url));

  if (extName === null) {
    extName = params.ext_name;
  }
  if (extName !== null) {
    extName = extName.replace(/^\./, "");
    fileName = `${fileName}.${extName}`;
  }
  const folderPath = path.join(context.sessionDir, "downloading");
  const binary = await download({
    ...params,
    reportProgress: p => context.reportProgress(p),
  });
  let filePath = path.join(folderPath, fileName);

  if (await fileExists(filePath)) {
    fileName = context.jobId;
    if (extName != null) {
      fileName = `${fileName}.${extName}`;
    }
    filePath = path.join(folderPath, fileName);
  }
  await fs.mkdir(folderPath, { recursive: true });
  await fs.writeFile(filePath, binary);

  return { file_path: filePath };
}

function splitExtNames(fileName: string): [string, string | null] {
  const cells = fileName.split(".");
  if (cells.length >= 2) {
    const extName = cells.pop();
    return [cells.join("."), extName];
  } else {
    return [fileName, null];
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.stat(filePath);
    return true;
  } catch {
    return false;
  }
}