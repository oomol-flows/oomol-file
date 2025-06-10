from oocana import Context

#region generated meta
import typing
class Inputs(typing.TypedDict):
    files: list[typing.Any]
    type: typing.Literal["image", "video", "audio", "pdf"]
class Outputs(typing.TypedDict):
    files: list[typing.Any]
#endregion

def main(params: Inputs, context: Context) -> Outputs:

    # your code
    file_type = params.get("type")
    filtered_files = []

    if file_type == "image":
        extensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"]
    elif file_type == "video":
        extensions = [".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv"]
    elif file_type == "audio":
        extensions = [".mp3", ".wav", ".aac", ".flac", ".ogg"]
    elif file_type == "pdf":
        extensions = [".pdf"]
    
    for file in params.get("files", []):
        for ext in extensions:
            if file.endswith(ext):
                filtered_files.append(file)
                break


    return { "files": filtered_files }