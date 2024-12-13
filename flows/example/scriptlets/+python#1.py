from oocana import Context

def main(inputs: dict, context: Context):
  file_path: str = inputs["file"]
  with open(file_path, "rb") as f:
    return {
      "binary": f.read(),
    }
