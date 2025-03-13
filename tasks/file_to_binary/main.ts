import fs from "fs/promises";

type Inputs = {
  readonly file_path: string;
};
type Outputs = {
  readonly binary: Buffer;
};

export default async function (params: Inputs): Promise<Outputs> {
  const filePath = params.file_path;
  const binary = await fs.readFile(filePath);
  return { binary };
};
