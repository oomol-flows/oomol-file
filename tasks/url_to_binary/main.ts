import type { Context } from "@oomol/types/oocana";
import download from "~/shared/downloader";

//#region generated meta
type Inputs = {
  url: string;
  query: Record<string, any>;
  headers: Record<string, any>;
  timeout: number;
  retry_times: number;
};
type Outputs = {
  binary: Buffer;
};
//#endregion

export default async function(params: Inputs, context: Context<Inputs, Outputs>): Promise<Outputs> {
  const binary = await download({
    ...params,
    reportProgress: p => context.reportProgress(p),
  });
  return { binary };
};