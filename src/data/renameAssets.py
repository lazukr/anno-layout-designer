import os

def main():
    folder = "../../public/assets/images/"
    for count, filename in enumerate(os.listdir(folder)):
        print(filename)
        src = f"{folder}/{filename}"
        dst = f"{folder}/1800_{filename}"
        os.rename(src, dst)

if __name__ == "__main__":
    main()