import type { Context } from "@oomol/types/oocana";

type Inputs = {
  file: string;
}
type Outputs = {
  file: string;
}

export default async function(
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {

  const { file } = params;

  return { file: file };
};
