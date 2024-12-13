import os
import re

from typing import Literal

WhenFileExists = Literal["override", "ignore", "rename", "error"]

def main(inputs: dict):
  binary: bytes = inputs["binary"]
  file_name: str = inputs["file_name"]
  output_folder: str = inputs["output_folder"]
  mkdir: bool = inputs["mkdir"]
  when_file_exists: WhenFileExists = inputs["when_file_exists"]

  if mkdir:
    os.makedirs(output_folder, exist_ok=True)
  elif not os.path.exists(output_folder):
    raise Exception(f"folder {output_folder} does not exist")
  elif not os.path.isdir(output_folder):
    raise  Exception(f"{output_folder} is not a directory")
  
  file_path = os.path.join(output_folder, file_name)
  if os.path.exists(file_path):
    if when_file_exists == "ignore":
      return
    elif when_file_exists == "error":
      raise Exception(f"file {file_path} already exists")
    elif when_file_exists == "rename":
      new_file_name = _rename_file(file_name, output_folder)
      file_path = os.path.join(output_folder, new_file_name)
  
  with open(file_path, "wb") as f:
    f.write(binary)
  
  return { "file_path": file_path }

def _rename_file(file_name: str, folder_path: str) -> str:
  single_file_name, ext_name = _split_file_name(file_name)
  prefix = re.sub(r"_\d+$", "", single_file_name)
  max_index = 0
  print(ext_name, single_file_name, prefix)

  for file in os.listdir(folder_path):
    sub_name = os.path.splitext(file)[0]
    if sub_name.startswith(prefix):
      suffix = sub_name[len(prefix):]
      index = 0
      if re.search(r"_\d+$", suffix):
        index = int(suffix[1:])
      elif suffix == "":
        index = 1
      if index > 0:
        max_index = max(max_index, index)

  return f"{prefix}_{max_index + 1}{ext_name}"

def _split_file_name(file_name: str):
  ext_name = os.path.splitext(file_name)[1]
  single_file_name = file_name[:len(file_name) - len(ext_name)]
  return single_file_name, ext_name