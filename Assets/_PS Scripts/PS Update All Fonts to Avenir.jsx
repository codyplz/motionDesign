// Loop through all layers in the active document
function processLayers(layers) {
  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    
    // Check if the layer is a text layer
    if (layer.kind === LayerKind.TEXT) {
      // Update the font and weight
      layer.textItem.font = "AvenirNextLTPro-Demi";
    }
    
    // If the layer has sub-layers, process those too
    if (layer.layers) {
      processLayers(layer.layers);
    }
  }
}

// Start the script
var doc = app.activeDocument;
processLayers(doc.layers);
