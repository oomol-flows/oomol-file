import io
import json
import requests
import urllib.parse

from oocana import Context

def main(inputs: dict, context: Context):
  url = inputs["url"]
  query: dict[str, str] = inputs["query"]
  headers: dict[str, str] = inputs["headers"]

  if len(query) > 0:
    query_string = urllib.parse.urlencode(query)
    url = f"{url}?{query_string}"

  buffer = io.BytesIO()
  response = requests.get(url, headers=headers, stream=True)
  _raise_if_fail(response)

  content_len = _content_length(response)
  buffer_len: int = 0

  for chunk in response.iter_content(chunk_size=16384):
    if chunk is not None:
      buffer.write(chunk)
      buffer_len += len(chunk)
      if content_len is not None:
        context.report_progress(float(buffer_len) / float(content_len) * 100.0)

  return { "binary": buffer.getvalue() }

def _content_length(response: requests.Response) -> int | None:
  try:
    content_length = response.headers.get("Content-Length", None)
    if content_length is None:
      return None
    return int(content_length)
  except Exception:
    return None

def _raise_if_fail(response: requests.Response):
  if response.status_code != 200:
    error: str
    if "application/json" in response.headers.get("Content-Type", ""):
      error = json.dumps(response.json())
    else:
      error = response.text
    if error == "":
      raise Exception(f"Fetch URL failed with status code {response.status_code}")
    else:
      raise Exception(f"Fetch URL failed with status code: {response.status_code}: {error}")