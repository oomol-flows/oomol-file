from oocana import Context
import os

#region generated meta
import typing
class Inputs(typing.TypedDict):
    files: list[typing.Any]
    type: typing.Literal["image", "video", "audio", "pdf"] | None
    filt_hide: bool
class Outputs(typing.TypedDict):
    files: list[typing.Any]
#endregion

def main(params: Inputs, context: Context) -> Outputs:

    # your code
    file_type = params.get("type")
    filt_hide = params.get("filt_hide", False)
    files = params.get("files", [])
    
    # If type is None, return all files without filtering by extension
    if file_type is None:
        if filt_hide:
            # Filter out hidden files if filt_hide is True
            filtered_files = [file for file in files if not os.path.basename(file).startswith('.')]
        else:
            # Return all files
            filtered_files = files
    else:
        # Apply extension filtering based on file type
        if file_type == "image":
            extensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"]
        elif file_type == "video":
            extensions = [".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv"]
        elif file_type == "audio":
            extensions = [".mp3", ".wav", ".aac", ".flac", ".ogg"]
        elif file_type == "pdf":
            extensions = [".pdf"]
        else:
            extensions = []

        filtered_files = []
        for file in files:
            # Skip hidden files (those starting with a dot)
            if filt_hide and os.path.basename(file).startswith('.'):
                continue
                
            for ext in extensions:
                if file.endswith(ext):
                    filtered_files.append(file)
                    break

    return {"files": filtered_files}