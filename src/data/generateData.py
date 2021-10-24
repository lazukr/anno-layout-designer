import os
import json

dir = '../../public/assets/images/'

def get_images(folder):
    return os.listdir(folder)



def image_to_json_data(image, folder):
    return {
        "name": image.replace("_", " ").split(".")[0],
        "image": image,
        "colour": "#FFFFFF",
        "class": folder,
        "size": {
            "x": 1,
            "y": 1,
        },

    }



def main():
    folders = next(os.walk(dir))[1]
    for folder in folders:
        images = get_images(dir + folder)
        building_data = [image_to_json_data(image, folder) for image in images]
        
        print(building_data)
        
        output_data = {
            "buildings": building_data
        }

        json_output = json.dumps(output_data, indent=4)
        name = folder + ".json"

      

        try:
            with open(name, "x") as outfile:
                outfile.write(json_output)
        except FileExistsError:
            print(f"{name} already exists. Delete the existing file before regenerating it.")



if __name__ == "__main__":
    main()