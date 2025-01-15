import tempfile
from oocana import Context

def main(params: dict, context: Context):
  binary: bytes = params["binary"]
  dir = context.session_dir
  with tempfile.NamedTemporaryFile(dir=dir, delete=False) as temp_file:
    file_path: str = temp_file.name
    temp_file.write(binary)

  return { "file_path": file_path }