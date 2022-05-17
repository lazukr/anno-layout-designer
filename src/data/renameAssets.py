import os

def main():
    folder = "../../public/assets/images/"
    for count, filename in enumerate(os.listdir(folder)):        
        if (filename[:4].isdigit()):
            continue
    
        src = f"{folder}/{filename}"
        dst = f"{folder}/1800_{filename}"
        os.rename(src, dst)

if __name__ == "__main__":
    main()