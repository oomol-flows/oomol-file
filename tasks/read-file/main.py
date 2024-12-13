def main(inputs: dict):
  file_path: str = inputs["file"]
  with open(file_path, "rb") as f:
    return {
      "binary": f.read(),
    }
