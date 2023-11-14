// Create Undo Group
app.beginUndoGroup("Generate Folder Structure");

// Get the active project
var proj = app.project;

// Create "00_Assets" folder with no color label
var assetsFolder = proj.items.addFolder("00_Assets");
assetsFolder.label = 0;

var rasterFolder;
var subfolders = ["Raster", "Vector", "C4D", "Clips", "Audio", "Sequences"];
for (var i = 0; i < subfolders.length; i++) {
    var subFolder = proj.items.addFolder(subfolders[i]);
    subFolder.parentFolder = assetsFolder;
    subFolder.label = assetsFolder.label;
    if (subfolders[i] === "Raster") {
        rasterFolder = subFolder;
    }
}

// Create "01_Main Comps" folder with green label
var mainCompsFolder = proj.items.addFolder("01_Main Comps");
mainCompsFolder.label = 14;

// Create new comp inside "01_Main Comps"
var mainComp = proj.items.addComp("Main Comp", 1280, 720, 1, 15, 59.94);
mainComp.parentFolder = mainCompsFolder;
mainComp.label = mainCompsFolder.label;

// Import guide layer into the project
var guideFilePath = new File("D:/OneDrive/OneDrive - The Walt Disney Company/ARTDEPT SHARED/__ABC11 Assets/_Templates PSD/2021 Safe frame.psd");
var guideFile = proj.importFile(new ImportOptions(guideFilePath));
guideFile.parentFolder = rasterFolder;
guideFile.label = rasterFolder.label;

// Add imported guide layer to the new comp and set as guide layer
var guideLayer = mainComp.layers.add(guideFile);
guideLayer.guideLayer = true;

// Create "02_Precomps" folder with orange label
var precompsFolder = proj.items.addFolder("02_Precomps");
precompsFolder.label = 7;

// End Undo Group
app.endUndoGroup();