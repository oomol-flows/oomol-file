import io
import json

from oocana import Context
from typing import cast
from urllib.parse import urlencode
from requests import Session, Response
from requests.adapters import HTTPAdapter, Retry

def main(params: dict, context: Context):
  url = params["url"]
  query: dict[str, str] = params["query"]
  headers: dict[str, str] = params["headers"]
  timeout: int | float | None = params["timeout"]
  retry_times: int = params["retry_times"]

  if len(query) > 0:
    query_string = urlencode(query)
    url = f"{url}?{query_string}"

  if timeout == 0:
    timeout = None
  else:
    timeout = cast(int, timeout) * 1000.0

  buffer = io.BytesIO()
  session = _session(retry_times)
  response = session.get(
    url, 
    headers=headers, 
    stream=True, 
    timeout=timeout,
  )
  _raise_if_fail(response)

  content_len = _content_length(response)
  buffer_len: int = 0

  for chunk in response.iter_content(chunk_size=16384):
    if chunk is not None:
      buffer.write(chunk)
      buffer_len += len(chunk)
      if content_len is not None:
        context.report_progress(float(buffer_len) / float(content_len) * 100.0)

  context.report_progress(100.0)
  binary = buffer.getvalue()

  return { "binary": binary }

def _content_length(response: Response) -> int | None:
  try:
    content_length = response.headers.get("Content-Length", None)
    if content_length is None:
      return None
    return int(content_length)
  except Exception:
    return None

def _raise_if_fail(response: Response):
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

def _session(retry_times: int):
  session = Session()
  retries = Retry(
    total=retry_times,
    backoff_factor=0.1,
    status_forcelist=[502, 503, 504],
  )
  session.mount(
    prefix="https://",
    adapter=HTTPAdapter(max_retries=retries),
  )
  return session