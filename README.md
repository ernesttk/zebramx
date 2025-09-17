Repository with simple javascript meant to be used within mobicontrol managed devices from Zebra.

Before a module can be used, it needs to be downloaded to the %scripts%/js/ folder of the agent using a file sync rule. It is recommended to create a extra sub-folder for each module.

These are the steps to install:

    On the server, create a folder for syncing scripts, for example "scripts/".
    Create a zebraMx subfolder and copy zebraMx.js into it. Similarely create as many folders as modules that must be included.
    Create a file sync rule:
    - download files from the server to the device
    - origin:  "scripts/" folder
    - destination: %scripts%/js folder.
    - including sub-folders
    - optionaly, set up to delete on device all files not present in the source folder, this makes clean up very easy.
    - optionaly, sync as soon as possible when a device is discovered to allow these script modules to be used during staging.
    Assign the rule to the devices who need them

The %script% folder is where Mobicontrol places all the scripts which run on device. By adding the js/ folder we don't interfere with them.
