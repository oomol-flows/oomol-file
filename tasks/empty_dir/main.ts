import type { Context } from "@oomol/types/oocana";
import fs from "fs-extra"

type Inputs = {
  dir: string;
}
type Outputs = {
  dir: string;
}

export default async function (
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const {dir} = params;

  try {
    await fs.emptyDir(dir);
    console.log(`Successfully emptied directory: ${dir}`);
  } catch (err) {
    console.error(`Error emptying directory: ${err}`);
    throw err;
  }

  return { dir: dir };
};