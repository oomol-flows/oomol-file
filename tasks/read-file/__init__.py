def main(params: dict):
  file_path: str = params["file"]
  with open(file_path, "rb") as f:
    return {
      "binary": f.read(),
    }
