import type { Context } from "@oomol/types/oocana";
import fs from "fs/promises";
import path from "path"; // 引入 path 模块

type Inputs = {
  dir: string;
  sort: boolean; 
}
type Outputs = {
  path_array: string[];
}

export default async function (
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const { dir, sort } = params;

  try {
    // 读取文件夹内容
    const files = await fs.readdir(dir);

    let sortFiles: string[] = files;

    if (sort) {
      sortFiles = files.sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
      );
    }

    const fullPaths = sortFiles.map(file => path.join(dir, file));

    return { path_array: fullPaths };
  } catch (err) {
    console.error('无法读取文件夹:', err);
    return { path_array: [] }; // 发生错误时返回空数组
  }
};
