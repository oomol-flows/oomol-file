import type { Context } from "@oomol/types/oocana";
import fs from "fs-extra";

type Inputs = {
  source_files: string[];
  destination_dir: string | null;
}
type Outputs = {
  destination_dir: string;
}

export default async function(
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const {source_files, destination_dir} = params;
  const target_dir = destination_dir === null ? context.sessionDir : destination_dir;
  await copyFilesToDir(source_files, destination_dir);

  return { destination_dir: target_dir };
};

async function copyFilesToDir(sourceFiles: string[], destinationDir: string) {
  try {
    // 确保目标文件夹存在
    await fs.ensureDir(destinationDir);

    // 遍历文件列表
    for (const sourceFile of sourceFiles) {
      // 获取源文件名
      const fileName = sourceFile.split('/').pop();
      // 拼接目标路径
      const destinationFile = `${destinationDir}/${fileName}`;
      // 拷贝文件
      await fs.copy(sourceFile, destinationFile);
      console.log(`File ${fileName} copied successfully!`);
    }
  } catch (err) {
    console.error('Error copying files:', err);
  }
}