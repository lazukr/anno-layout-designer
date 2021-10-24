import os
import json

dir = '../images/'

def main():
    images = os.listdir(dir)
    print(images)

    buildings = []

    for image in images:
        buildings.append({
            "name": image.replace("_", " ").split(".")[0],
            "image": image,
            "size": {
                "x": 1,
                "y": 1,
            },
        })

        print(buildings)

    output = {
        "buildings": buildings
    }

    json_obj = json.dumps(output, indent=4)

    name = "Farmers.json"

    try:
        with open(name, "x") as outfile:
            outfile.write(json_obj)
    except FileExistsError:
        print(f"{name} already exists. Delete the existing file before regenerating it.")


if __name__ == "__main__":
    main()