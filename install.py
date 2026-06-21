import os
import shutil
import sys

# This the location from which mobicontrol will do the file sync to %script%.
# Correct location as needed.
DEST_DIR = '\\\\ys003yyf\\MDM\\Data\\scripts\\'
#DEST_DIR = '%temp%'

extraLog = False

installFilesList = ['appMgr',
 'audioVolUIMgr',
 'bluetoothMgr',
 'cellularMgr',
 'dataWedgeMgr',
 'displayMgr',
 'enterpriseKeyboardMgr',
 'gprsMgr',
 'powerMgr',
 'settingsMgr',
 'touchMgr',
 'uiMgr',
 'wifiMgr',
 'wirelessMgr',
 'zebraMx']


def main():
    countDone = 0
    print("Installing zebraMX module...")
    src_dir = os.path.dirname(__file__)
    dest_dir = os.path.expandvars(DEST_DIR)

    print(f"Source directory: {src_dir}")
    print(f"Destination directory: {dest_dir}")

    if not os.path.exists(dest_dir):
        print(f"Creating destination directory: {dest_dir}")
        os.makedirs(dest_dir)

    for basename in installFilesList:
        filename = f"{basename}.js"
        src_file = os.path.join(src_dir, filename)
        if (extraLog):
            print(f"Processing {filename}...")

        subFolderName = basename;
        dest_folder = os.path.join(dest_dir, subFolderName);
        if (extraLog):
            print(f"Destination module folder: {dest_folder}")
        if not os.path.exists(dest_folder):
            print(f"Creating module folder: {dest_folder}")
            os.makedirs(dest_folder)
        dest_file = os.path.join(dest_folder, filename)
        if os.stat(src_file).st_mtime - os.stat(dest_file).st_mtime > 1:
            print(f"Copying {src_file} to {dest_file}...")
            shutil.copy2(src_file, dest_file)
            countDone += 1
            if (extraLog):
                print(f"Copied.")
        else:
            if (extraLog):
                print(f"{filename} is up to date, skipping copy.")

    if (countDone > 0):
        print(f"Installation complete. {countDone} packages copied.")
    else:
        print (f"All packages were already up to date.")

if __name__ == "__main__":
    main()
