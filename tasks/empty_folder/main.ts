import fs from "fs-extra"

type Inputs = {
  folder: string;
}
type Outputs = {
  folder: string;
}

export default async function (params: Inputs): Promise<Outputs> {
  const { folder } = params;
  try {
    await fs.emptyDir(folder);
  } catch (err) {
    throw err;
  }
  return { folder };
};