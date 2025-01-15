import os

def main(params: dict):
  folder_path: str = params["folder"]
  only_file_name: bool = params["only_file_name"]
  files: list[str] = []
  folder_exists = False

  if os.path.exists(folder_path) and \
     os.path.isdir(folder_path):
    folder_exists = True
    for file in os.listdir(folder_path):
      if only_file_name:
        files.append(file)
      else:
        files.append(os.path.join(folder_path, file))

  return { 
    "files": files,
    "folder_exists": folder_exists,
  }
