import fs from "fs/promises";
import path from "path";

type Inputs = {
  readonly folder: string;
  readonly sort: boolean;
  readonly traverse: boolean;
  readonly absolute_path: boolean;
};

type Outputs = {
  readonly files: string[];
  readonly folder_exists: boolean;
};

export default async function (params: Inputs): Promise<Outputs> {
  const { folder, sort, traverse, absolute_path } = params;
  const folderExists = await isFolderExists(folder);

  if (!folderExists) {
    return { files: [], folder_exists: false };
  }
  let files: string[] = [];
  await search(folder, "", files, traverse);

  if (sort) {
    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }
  if (absolute_path) {
    files = files.map((file) => path.join(folder, file));
  }
  return { files, folder_exists: true };
};

async function isFolderExists(folder: string): Promise<boolean> {
  try {
    const stat = await fs.stat(folder);
    return stat.isDirectory();
  } catch (error) {
    return false;
  }
}

async function search(
  rootPath: string,
  subPath: string,
  files: string[],
  traverse: boolean
): Promise<void> {
  const folderPath = subPath ? path.join(rootPath, subPath) : rootPath;
  for (const fileName of await fs.readdir(folderPath)) {
    const absEntry = path.join(folderPath, fileName);
    const nextPath = subPath ? path.join(subPath, fileName) : fileName;
    files.push(nextPath);
    if (traverse) {
      const stat = await fs.stat(absEntry);
      if (stat.isDirectory()) {
        await search(rootPath, nextPath, files, traverse);
      }
    }
  }
}
