Repository with simple javascript meant to be used within mobicontrol managed devices from Zebra.

Before a module can be used, it needs to be downloaded to the %scripts% folder of the agent using a file sync rule. It is recommended to create a sub-folder for each module.

These are the steps to install zebramx.js:

    On the server, create a folder for syncing scripts, for example C:\scripts. This step can be skipped if the script syncing folder already exists.
    Create a fraction subfolder and copy zebramx.js into it.
    Create a file sync rule to download files from the server's C:\scripts folder to the device's %scripts% folder (including sub-folders) and assign the rule.
