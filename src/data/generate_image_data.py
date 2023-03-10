import os
import json
from pathlib import Path

imagePath = "assets/images"

def main():
    rootDir = "../../public/assets/images/"
    gameList = write_game_json(rootDir)
    json_output = json.dumps(gameList, indent=4)
    jsonfile = f"{os.getcwd()}/image_data.json"
    os.makedirs(os.path.dirname(jsonfile), exist_ok=True)
    with open(jsonfile, "w+") as outfile:
        outfile.write(json_output)
                
def write_game_json(rootDir: os.DirEntry):
    gameList = {}
    for gameDir in os.scandir(rootDir):
        if (gameDir.is_dir()):
            cur = write_citizen_json(gameDir)
            gameList = {**gameList, **cur}
    return gameList
                
def write_citizen_json(gameDir: os.DirEntry):
    citizenList = {}
    for citizenDir in os.scandir(gameDir):
        if (citizenDir.is_dir()):
            cur = write_buildings_json(gameDir.name, citizenDir)
            citizenList = {**citizenList, **cur}
    return citizenList
        
def write_buildings_json(game: str, citizenDir: os.DirEntry):
    buildingList = {}
    for buildingFile in os.scandir(citizenDir):
        if (buildingFile.is_file() and not buildingFile.name.startswith(".")):
            name = f"{game}_{buildingFile.name.split('.')[0]}"
            path = os.path.join(imagePath, game, citizenDir.name, f"{buildingFile.name}")
            buildingList[name] = path
    return buildingList


if __name__ == "__main__":
    main()