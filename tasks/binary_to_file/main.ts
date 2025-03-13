import path from "path";
import fs from "fs/promises";

type WhenFileExists = "override" | "ignore" | "rename" | "error";

type Inputs = {
  readonly binary: Buffer;
  readonly file_name: string;
  readonly output_folder: string;
  readonly mkdir: boolean;
  readonly when_file_exists: WhenFileExists;
};

type Outputs = {
  readonly file_path: string;
};

export default async function (params: Inputs): Promise<Outputs> {
  const { binary, file_name, output_folder, mkdir, when_file_exists } = params;

  if (mkdir) {
    await fs.mkdir(output_folder, { recursive: true });
  } else {
    const exists = await fs.access(output_folder)
                           .then(() => true)
                           .catch(() => false);
    if (!exists) {
      throw new Error(`folder ${output_folder} does not exist`);
    }
    const stats = await fs.stat(output_folder);
    if (!stats.isDirectory()) {
      throw new Error(`${output_folder} is not a directory`);
    }
  }
  let filePath = path.join(output_folder, file_name);

  const fileExists = await fs.access(filePath)
                             .then(() => true)
                             .catch(() => false);
  if (fileExists) {
    if (when_file_exists === "ignore") {
      return { file_path: filePath };
    } else if (when_file_exists === "error") {
      throw new Error(`file ${filePath} already exists`);
    } else if (when_file_exists === "rename") {
      const newFileName = await renameFile(file_name, output_folder);
      filePath = path.join(output_folder, newFileName);
    }
  }
  await fs.writeFile(filePath, binary);

  return { file_path: filePath };
}

async function renameFile(fileName: string, folderPath: string): Promise<string> {
  const { singleFileName, extName } = splitFileName(fileName);
  const prefix = singleFileName.replace(/_\d+$/, "");

  let maxIndex = 0;

  for (const file of await fs.readdir(folderPath)) {
    const subName = path.parse(file).name;
    if (subName.startsWith(prefix)) {
      const suffix = subName.slice(prefix.length);
      let index = 0;
      if (/_\d+$/.test(suffix)) {
        index = parseInt(suffix.slice(1), 10);
      } else if (suffix === "") {
        index = 1;
      }
      if (index > 0) {
        maxIndex = Math.max(maxIndex, index);
      }
    }
  }
  return `${prefix}_${maxIndex + 1}${extName}`;
}

function splitFileName(fileName: string): { singleFileName: string; extName: string } {
  const extName = path.extname(fileName);
  const singleFileName = fileName.slice(0, fileName.length - extName.length);
  return { singleFileName, extName };
}
