import os
import json


def main():
    folder = "../../public/assets/images/"
    entries = [image_to_json_data(filename) for filename in os.listdir(folder)]
    dict_entries = mergeDict(entries)
    name = "test.json"
    json_output = json.dumps(dict_entries, indent=4)
    try:
        with open(name, "x") as outfile:
            outfile.write(json_output)
    except FileExistsError:
        print(f"{name} already exists. Delete the existing file before regenerating it.")

def image_to_json_data(image):
    return {
        "id": image.split(".")[0],
        "width": 1,
        "height": 1,
    }
    
def mergeDict(entries):
    this_dict = {}
    for entry in entries:
        this_dict[entry["id"]] = entry
    
    return this_dict

if __name__ == "__main__":
    main()