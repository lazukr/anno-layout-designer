import os
import json
from pathlib import Path

imagePath = "assets/images"

def main():
    rootDir = "../../public/assets/images/"
    gameList = write_game_json(rootDir)
    json_output = json.dumps(gameList, indent=4)
    jsonfile = f"{os.getcwd()}/data.json"
    os.makedirs(os.path.dirname(jsonfile), exist_ok=True)
    with open(jsonfile, "w+") as outfile:
        outfile.write(json_output)
                
def write_game_json(rootDir: os.DirEntry):
    gameList = {}
    for gameDir in os.scandir(rootDir):
        if (gameDir.is_dir()):
            gameList[gameDir.name] = {
                "name": gameDir.name,
                "title": f"Anno {gameDir.name}",
                "citizens": write_citizen_json(gameDir)
            }
    return gameList
                
def write_citizen_json(gameDir: os.DirEntry):
    citizenList = {}
    for citizenDir in os.scandir(gameDir):
        if (citizenDir.is_dir()):
            name = f"{gameDir.name}_{citizenDir.name}"
            path = os.path.join(imagePath, gameDir.name, citizenDir.name, f"{citizenDir.name}.png")
            citizenList[name] = {
                "name": name,
                "imagePath": path,
                "buildings": write_buildings_json(gameDir.name, citizenDir)
            }
    return citizenList
        
def write_buildings_json(game: str, citizenDir: os.DirEntry):
    buildingList = {}
    for buildingFile in os.scandir(citizenDir):
        if (buildingFile.is_file() and not buildingFile.name.startswith(".")):
            name = f"{game}_{citizenDir.name}_{buildingFile.name.split('.')[0]}"
            path = os.path.join(imagePath, game, citizenDir.name, f"{buildingFile.name}")
            buildingList[name] = ({
                "name": name,
                "imagePath": path,
                "width": 1,
                "height": 1,
                "colour": "#FFF",
            })
    return buildingList


if __name__ == "__main__":
    main()