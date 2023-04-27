# Job Stats Tracker Via Google Extensions

:woman_cartwheeling:A Google extension that connects to your Google Sheets to track applied to jobs at your convenience. I use Google Sheets to keep track of all the jobs I've applied for which includes company, position, date applied and URL so that I can review job descriptions as needed. I found that going from application page to spreadsheet page quickly became tedious so I created this extension that pops up at the click of a button on the current application page, so in that way all the needed details can be documented without going back and forth between pages. The extension also automatically saves the url as a link on the spreadsheet and a cute pop up confirms your data has been saved. 

## Installation

Note: This is not available on the Google Extension store because this was made before the required registration fee of Chrome Web Store Developers. 

To be able to use this you must have a google sheets with values in A1:F1 -> [Company Name, Position, Site Discovered, Applied Date, Status, Resume Version Used] and the corresponding SheetID for use in the .env file. You must also make a Chrome Web Store Developer account as well as a Google API developer account and create an OAUTH2.0 Client ID for use in the manifest.json file. An example of .env file and manifest.json file is provided for you.

Once you have gathered all the required id and keys, access the extension page by clicking on the kebab menu on the upper right corner of your Chrome brower and go to "More Tools" > "Extension". Ensure that the "Developer Mode" is switched on(upper right corner). On the top left corner, click on "Load unpacked", and select your file to be added to your list of extensions for use! :clap: :clap: :clap:

## Usage 

A similar icon :cat: should appear on your extension on the top right of your browser. When clicked a form will appear to document necessary Job information. Once you click on "Add" a pop up notification will appear on the top right hand side informing you the status of the save whether it is successful or failed. 

## Contributing 

Please let me know what additional features you would love to see when tracking your jobs! GOOD LUCK TO EVERYONE JOB SEARCHING! :crossed_fingers:

## License 

[MIT](https://choosealicense.com/licenses/mit/)