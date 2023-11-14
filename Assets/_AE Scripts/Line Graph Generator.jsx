{
    app.beginUndoGroup("Create Line Graph");

    // Create a new Comp
    var comp = app.project.items.addComp('Line Graph', 1920, 1080, 1, 10, 30);
    
    // Create a Null Object for Controls
    var controlLayer = comp.layers.addNull();
    controlLayer.name = "Controls";
    
    var sliderControl1 = controlLayer.Effects.addProperty("ADBE Slider Control");
    sliderControl1.name = "Number of Plots";

    var sliderControl2 = controlLayer.Effects.addProperty("ADBE Slider Control");
    sliderControl2.name = "Value 1";

    var sliderControl3 = controlLayer.Effects.addProperty("ADBE Slider Control");
    sliderControl3.name = "Value 2";
    
    // Create Shape Layer for Graph
    var graphLayer = comp.layers.addShape();
    graphLayer.name = "Graph Line";
    
    var contents = graphLayer.property("Contents");
    var shapeGroup = contents.addProperty("ADBE Vector Group");
    var pathGroup = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Group");
    var pathProperty = pathGroup.property("Path");

    // Add a stroke to the shape
    var stroke = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
    stroke.property("Color").setValue([1, 0, 0]);  // Set the stroke color to red
    stroke.property("Stroke Width").setValue(5);  // Set the stroke width to 5
    
    // Expression for the path
    var expressionCode = 'var controlLayer = thisComp.layer("Controls");' +
    'var numOfPlots = controlLayer("Effects")("Number of Plots")("Slider").value;' +
    'var values = [];' +
    'for (var i = 1; i <= numOfPlots; i++) {' +
    '  var val = controlLayer("Effects")("Value " + i)("Slider").value;' +
    '  values.push([i * 100, val * -10]);' +
    '}' +
    'createPath(values, [], [], false);';

    pathProperty.expression = expressionCode;
    
    app.endUndoGroup();
}