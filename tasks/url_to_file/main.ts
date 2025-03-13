import type { Context } from "@oomol/types/oocana";
import download from "download";
import path from "path";
import fs from "fs/promises";

type Inputs = {
  url: string;
};

type Outputs = {
  file: string;
};

export default async function (
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const { url } = params;
  const fileNameWithExt = path.basename(url);
  const savePath = path.join(context.sessionDir, fileNameWithExt);

  try {
    await downloadResource(url, savePath, context);
    return { file: savePath };
  } catch (error) {
    console.error(`Download failed: ${error.message}`);
    throw error; // Re-throw the error to ensure it's propagated
  }
}

async function downloadResource(
  url: string,
  destination: string,
  context: Context<Inputs, Outputs>
): Promise<void> {
  const dir = path.dirname(destination);

  // Ensure the destination directory exists
  await fs.mkdir(dir, { recursive: true });

  // Download and save the file
  await new Promise<void>((resolve, reject) => {
    download(url, dir, { filename: path.basename(destination) })
      .on("downloadProgress", (progress) => {
        context.reportProgress(progress.percent * 100);
      })
      .on("end", () => {
        console.log(`Downloaded to ${destination}`);
        resolve();
      })
      .on("error", (error) => {
        console.error(`Download failed: ${error.message}`);
        reject(error);
      });
  });
}