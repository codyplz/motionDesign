// Create a new project
var project = app.newProject();

// Create a new composition
var comp = project.items.addComp('Vaping Among Teenagers', 1920, 1080, 1, 30, 30);

// Create a null object to hold the data points
var nullLayer = comp.layers.addNull();
nullLayer.name = "Data Points";

// Data for the line graph
var states = ["CA", "TX", "NV", "WA"];
var percentages = [50, 75, 89, 1];

// Create shape layer for the line graph
var shapeLayer = comp.layers.addShape();
shapeLayer.name = "Line Graph";

// Access the shape layer's contents
var contents = shapeLayer.property("ADBE Root Vectors Group");

// Create a new group for the line
var lineGroup = contents.addProperty("ADBE Vector Group");
lineGroup.name = "Line";

// Create a path for the line
var path = lineGroup.property("Contents").addProperty("ADBE Vector Shape - Group");
var pathProp = path.property("ADBE Vector Shape");

// Create stroke
var stroke = lineGroup.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
stroke.property("ADBE Vector Stroke Color").setValue([1, 0, 0]);
stroke.property("ADBE Vector Stroke Width").setValue(5);

// Initialize variables for path points
var points = [];
var inTangents = [];
var outTangents = [];

// Generate path points based on data
var xStep = comp.width / (states.length - 1);
var x = 0;
for (var i = 0; i < states.length; i++) {
  var y = comp.height - (percentages[i] / 100) * comp.height;
  points.push([x, y]);
  inTangents.push([0, 0]);
  outTangents.push([0, 0]);
  x += xStep;
}

// Set the path
pathProp.setValue(new Shape({ points: points, inTangents: inTangents, outTangents: outTangents, isClosed: false }));
