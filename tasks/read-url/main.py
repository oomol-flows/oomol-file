import json
import requests
import urllib.parse

def main(inputs: dict):
  url = inputs["url"]
  query: dict[str, str] = inputs["query"]
  headers: dict[str, str] = inputs["headers"]

  if len(query) > 0:
    query_string = urllib.parse.urlencode(query)
    url = f"{url}?{query_string}"

  response = requests.get(url, headers=headers)
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

  return { "binary": response.content }
