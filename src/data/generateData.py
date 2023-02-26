import os
import json
from pathlib import Path

imagePath = "assets/images"

def main():
    result = {}
    with open("svg_data.json") as json_file:
        data = json.load(json_file)
        for entry in data:
            result[entry["id"]] = entry

    json_output = json.dumps(result, indent=4)
    jsonfile = f"{os.getcwd()}/svg_data_test.json"
    os.makedirs(os.path.dirname(jsonfile), exist_ok=True)
    with open(jsonfile, "w+") as outfile:
        outfile.write(json_output)



if __name__ == "__main__":
    main()