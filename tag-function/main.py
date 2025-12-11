# # # main.py
# # import json
# # from tag_suggest import suggest_tags

# # def main(req, res):
# #     """
# #     Expects JSON body:
# #     {
# #       "title": "post title",
# #       "content": "long blog body",
# #       "top_n": 5   # optional
# #     }
# #     """
# #     try:
# #         body = json.loads(req.body or "{}")
# #         title = body.get("title", "") or ""
# #         content = body.get("content", "") or ""
# #         top_n = body.get("top_n", 5)

# #         text = (title + "\n" + content).strip()
# #         if not text:
# #             return res.json({"tags": []})

# #         tags = suggest_tags(text, top_n=int(top_n))
# #         return res.json({"tags": tags})
# #     except Exception as e:
# #         # in demo it's ok to just send error message
# #         return res.json({"error": str(e)}, 500)

# # main.py
# import sys
# import json
# from tag_suggest import suggest_tags

# def read_input():
#     """Appwrite passes the payload on STDIN as JSON when executing a Python function."""
#     try:
#         raw = sys.stdin.read()
#         if not raw:
#             return {}
#         return json.loads(raw)
#     except Exception:
#         return {}

# def main():
#     payload = read_input()
#     # Appwrite may pass body directly or under "body" key depending on UI; handle both.
#     data = payload if isinstance(payload, dict) else {}
#     # If Appwrite UI wraps input under "body", try to extract:
#     if "body" in data and isinstance(data["body"], (str, dict)):
#         try:
#             # if body is a JSON string
#             body = data["body"]
#             if isinstance(body, str):
#                 body = json.loads(body)
#             data = body
#         except Exception:
#             # fallback to original data
#             pass

#     title = data.get("title", "") or ""
#     content = data.get("content", "") or ""
#     top_n = int(data.get("top_n", 5))

#     text = (title + "\n" + content).strip()
#     if not text:
#         out = {"tags": []}
#         print(json.dumps(out))
#         return

#     tags = suggest_tags(text, top_n=top_n)
#     out = {"tags": tags}
#     # IMPORTANT: print the JSON to stdout so Appwrite captures it as the response Body
#     print(json.dumps(out))

# if __name__ == "__main__":
#     main()



import sys
import json
import traceback
from tag_suggest import suggest_tags

def main():
    try:
        # Read raw input sent by Appwrite
        raw = sys.stdin.read()
        data = {}

        # Parse JSON if available
        if raw:
            try:
                data = json.loads(raw)
            except:
                data = {}

        # Appwrite sometimes wraps body like {"body": "{...json...}"}
        if "body" in data:
            body = data["body"]
            if isinstance(body, str):
                try:
                    data = json.loads(body)
                except:
                    data = {"content": body}
            elif isinstance(body, dict):
                data = body

        # Extract fields
        title = data.get("title", "")
        content = data.get("content", "")
        top_n = int(data.get("top_n", 5))

        text = (title + " " + content).strip()
        if not text:
            print(json.dumps({"tags": []}))
            sys.stdout.flush()
            return

        tags = suggest_tags(text, top_n)

        # FINAL RESPONSE
        print(json.dumps({"tags": tags}))
        sys.stdout.flush()

    except Exception as e:
        print(json.dumps({
            "error": str(e),
            "trace": traceback.format_exc()
        }))
        sys.stdout.flush()

if __name__ == "__main__":
    main()
