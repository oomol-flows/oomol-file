from ntpath import isdir
import os

def main(params: dict):
  folder_path: str = params["folder"]
  sort: bool = params["sort"]
  traverse: bool = params["traverse"]
  absolute_path: bool = params["absolute_path"]

  if not os.path.exists(folder_path) or \
     not os.path.isdir(folder_path):
    return {
      "files": [],
      "folder_exists": False,
    }
  files: list[str] = []
  folder_exists = False

  _search(folder_path, "", files, traverse)

  if sort:
    files.sort()

  if absolute_path:
    for i in range(len(files)):
      files[i] = os.path.join(folder_path, files[i])

  return { 
    "files": files,
    "folder_exists": folder_exists,
  }

def _search(root_path: str, sub_path: str, files: list[str], traverse: bool):
  folder_path: str = root_path
  if sub_path != "":
    folder_path = os.path.join(root_path, sub_path)

  for file in os.listdir(folder_path):
    abs_file = os.path.join(folder_path, file)
    next_path: str
    if sub_path == "":
      next_path = file
    else:
      next_path = os.path.join(sub_path, file)

    files.append(next_path)
    if traverse and os.path.isdir(abs_file):
      _search(root_path, next_path, files, traverse)