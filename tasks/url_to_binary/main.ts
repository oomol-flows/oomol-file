import type { Context } from "@oomol/types/oocana";
import download from "~/shared/downloader";

type Inputs = {
  readonly url: string;
  readonly query: Record<string, string>;
  readonly headers: Record<string, string>;
  readonly timeout: number | null;
  readonly retry_times: number;
};

type Outputs = {
  readonly binary: Buffer;
};

export default async function(params: Inputs, context: Context<Inputs, Outputs>): Promise<Outputs> {
  const binary = await download({
    ...params,
    reportProgress: p => context.reportProgress(p),
  });
  return { binary };
};