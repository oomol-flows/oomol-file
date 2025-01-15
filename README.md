# File

Related to operation files.

## Read file

Read the file from the file path set in the `file` field, and then return a binary data from the `binary` field.

## Read folder

Read the folder where the path set by the `folder` field is located, and return all its files in the `files` field in a string array.

If the `only_file_name` field is checked, `files` only returns an array of file names. If it is not checked, it returns an array of full file paths.

When the folder corresponding to `folder` does not exist, `files` will return an empty array, and the `folder_exists` field will return `false`.

## Read URL

Download the resource file indicated by the URL from the `url` field. And return the binary data of the resource from the `binary` field.

The key value pairs set in the `query` field will be added to the end of the URL.

When a request is made, the content in `headers` field will be inserted into the HTTP header.

`timeout` indicates the timeout of the request (in seconds).

`retry_times` indicates the number of retries.

## Write file

Saves the binary data passed to `binary` by another block to the file whose path is returned in `file_path`.

The `file_name` field indicates the file name to be saved.

The `output_folder` field indicates the folder to which the file is to be saved.

When `mk_dir` is checked, if the target folder to be saved has not been created yet, it will be automatically created (all non-existent parent folders will be recursively created). Otherwise, if the folder does not exist, an error will be reported.

The `when_file_exists` field indicates what action should be taken when the file to be saved already exists, depending on the selected option.

- `Override`: Directly overwrite the existing file.

- `Ignore`: Do not overwrite the existing file, ignore this file save operation (this will cause the binary data passed in the `binary` field to be lost).

- `Rename`: Save as a new file name to avoid overwriting any file (the new file name is created by adding a numeric suffix to the name represented by the `file_name` field).

- `Error`: Report an error.

## Write file (to path)

Saves the binary data passed to `binary` by another block to a temporary file, the file path of which is returned in `file_path`.