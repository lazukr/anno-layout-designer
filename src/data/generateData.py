import os
import json

def main():
    folder = "../../public/assets/images/"
    entries = [image_to_json_data(filename) for filename in os.listdir(folder)]
    name = "buildings.json"
    
    file = open(name)
    exist_dict = json.load(file)
    file.close()
    
    for building in entries:
        if (building["id"] not in exist_dict):
            exist_dict[building["id"]] = building
            
    dict_list = dict(sorted(exist_dict.items(), key=lambda item: item[0]))      
    json_output = json.dumps(dict_list, indent=4)
    with open(name, "w+") as outfile:
        outfile.write(json_output)
        
def get_id(obj):
    return obj["id"]


def image_to_json_data(image):
    return {
        "id": image.split(".")[0],
        "width": 1,
        "height": 1,
        "colour": "#FFF",
    }
    
def merge_dict(entries):
    this_dict = {}
    for entry in entries:
        this_dict[entry["id"]] = entry
    
    return this_dict

if __name__ == "__main__":
    main()