import os
import shutil

from typing import cast
from oocana import Context

def main(params: dict, context: Context):
  binary: bytes = params["binary"]
  suffix: str | None = params["suffix"]
  file_path: str | None = params["file_path"]

  if file_path is None:
    file_path = os.path.join(context.session_dir, context.job_id)

  if suffix is not None:
    file_path = cast(str, file_path) + suffix

  file_dir_path = os.path.dirname(file_path)

  if not os.path.exists(file_dir_path):
    os.makedirs(file_dir_path)

  with open(file_path, "wb") as file:
    file.write(binary)

  return { "file_path": file_path }