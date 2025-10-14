# OOMOL File Operations

A comprehensive collection of file and folder management blocks for OOMOL workflows, designed to handle common file operations without writing code.

## What is This Package?

**OOMOL File** is a toolkit that provides essential building blocks for working with files and folders in your OOMOL workflows. Whether you need to download files from the internet, copy documents between folders, or convert data into files, these blocks make it simple and intuitive.

---

## Use Cases

This package is ideal for:

- **Content Automation**: Download images, videos, or documents from URLs and organize them automatically
- **File Organization**: Copy, move, and organize files and folders based on your workflow needs
- **Data Management**: Convert binary data into files or extract binary content from existing files
- **Batch Processing**: Process multiple files at once, filter by type, and apply operations to entire folders
- **Web Integration**: Download content from web URLs and save them as local files

---

## Available Blocks

### 📥 Download & Import

#### **URL to File**
Downloads content from a web URL and saves it as a file.

**Use it when**: You need to download images, documents, or any file from the internet.

**Features**:
- Customize download location
- Set custom headers and query parameters
- Configure timeout and retry attempts
- Option to preserve original filename or rename

---

#### **URL to Binary**
Downloads content from a URL and outputs it as binary data (without saving to disk).

**Use it when**: You need to process downloaded content in memory before saving.

**Features**:
- Query parameters support
- Custom headers
- Timeout and retry configuration

---

#### **File to Binary**
Reads a file and converts its content to binary data.

**Use it when**: You need to process file content in memory or pass it to another block.

---

### 💾 Save & Export

#### **Binary to File**
Writes binary data to a file with full control over the save location.

**Use it when**: You have binary content (from downloads or processing) that needs to be saved.

**Features**:
- Specify exact filename and location
- Create folders automatically if they don't exist
- Choose behavior when file exists: override, ignore, rename, or throw error

---

#### **Binary Save As File**
Quick save for binary content with minimal configuration.

**Use it when**: You want a simple "Save As" dialog experience.

**Features**:
- Optional custom save path
- Auto-generate filenames with custom suffix

---

### 📂 File & Folder Management

#### **Copy File**
Copies a single file from one location to another.

**Use it when**: You need to duplicate a file to a different folder.

---

#### **Copy Files** (Batch)
Copies multiple files at once to a destination folder.

**Use it when**: You need to copy many files together in one operation.

---

#### **Copy Folder**
Copies an entire folder with all its contents to a new location.

**Use it when**: You need to duplicate a complete folder structure.

---

#### **Empty Folder**
Deletes all contents inside a folder (but keeps the folder itself).

**Use it when**: You need to clear out a folder before processing new content.

⚠️ **Warning**: This permanently deletes all files and subfolders inside the specified folder.

---

### 🔍 File Discovery & Filtering

#### **List Files from Folder**
Retrieves all file paths from a folder.

**Use it when**: You need to get a list of files to process.

**Features**:
- Natural sorting by filename
- Recursive subfolder search option
- Choose between absolute or relative paths
- Returns empty array if folder doesn't exist (no error)

---

#### **Filter Files**
Filters a list of files by type (images, videos, audio, PDF).

**Use it when**: You have a mixed list of files and need only specific types.

**Supported Types**:
- **Images**: .jpg, .jpeg, .png, .gif, .bmp, .webp, .svg, etc.
- **Videos**: .mp4, .avi, .mov, .mkv, .wmv, .flv, etc.
- **Audio**: .mp3, .wav, .flac, .aac, .ogg, .wma, etc.
- **PDF**: .pdf documents

**Features**:
- Option to filter out hidden files

---

## Common Workflow Examples

### Example 1: Download and Organize Images
```
1. URL to File → Downloads image from web
2. Copy File → Moves it to organized folder
```

### Example 2: Batch Process Documents
```
1. List Files from Folder → Gets all files
2. Filter Files → Keeps only PDFs
3. Copy Files → Copies filtered files to output folder
```

### Example 3: Web Content Collection
```
1. URL to Binary → Downloads content
2. Binary to File → Saves with custom name
3. Copy File → Organizes into category folder
```

### Example 4: Folder Cleanup and Refresh
```
1. Empty Folder → Clears output directory
2. List Files from Folder → Gets new source files
3. Copy Files → Populates output with fresh content
```

---

## Installation

This package is available in the OOMOL marketplace. Simply add it to your project dependencies:

```yaml
dependencies:
  oomol-file: latest
```

Or install via the OOMOL interface by searching for **"OOMOL File Operations"**.

---

## Requirements

- **OOMOL Platform**: Version 0.1.0 or higher
- **Node.js Runtime**: Required for block execution (automatically managed by OOMOL)

---

## Support & Contributions

- **Repository**: [https://github.com/oomol-flows/oomol-file](https://github.com/oomol-flows/oomol-file)
- **Issues**: Report bugs or request features via GitHub Issues
- **Documentation**: Visit [OOMOL Documentation](https://oomol.com/docs) for workflow guides

---

## License

This package is open source and available for use in both personal and commercial OOMOL projects.

---

## Tips for Best Results

1. **Use Filter Files** after List Files to process only the file types you need
2. **Enable retry options** in download blocks for reliable web downloads
3. **Choose "rename"** option in Binary to File when you don't want to overwrite existing files
4. **Enable recursive search** in List Files to process nested folder structures
5. **Always test with Empty Folder** before processing to ensure clean output directories

---

## What's New

**Version 0.1.0**
- Initial release with 11 essential file operation blocks
- Support for file downloads with retry mechanism
- Flexible file filtering by media type
- Comprehensive copy operations for files and folders

---

*Built for OOMOL Platform - Making file operations simple and visual*
