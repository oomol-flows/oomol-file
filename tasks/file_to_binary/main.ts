import fs from "fs/promises";

type Inputs = {
  readonly file: string;
};
type Outputs = {
  readonly binary: Buffer;
};

export default async function (params: Inputs): Promise<Outputs> {
  const filePath = params.file;
  const binary = await fs.readFile(filePath);
  return { binary };
};
