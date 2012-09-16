// vim: ts=2 sw=2 et

var Hexagon = function Hexagon(sideLength, x, y) {
  this.x = x || 0;
  this.y = y || 0;
  this.sideLength = sideLength || 1;
};

Hexagon.prototype.getVertices = function getVertices() {
  var self = this;
  var sideLength = this.sideLength;
  return [
    [sideLength/2, 0],
    [sideLength/2 + sideLength, 0],
    [2*sideLength, Math.sqrt(3)/2 * sideLength],
    [sideLength/2 + sideLength, Math.sqrt(3) * sideLength],
    [sideLength/2, Math.sqrt(3) * sideLength],
    [0, Math.sqrt(3)/2 * sideLength]
    ].map(function(p){
      return [self.x + p[0], self.y + p[1]];
    });
};

Hexagon.prototype.getEdges = function getEdges() {
  var vertices = this.getVertices();
  var edges = [];
  var i;
  for(i=0; i<vertices.length;i++) {
    edges.push([
        vertices[i],
        vertices[(i+1) % vertices.length]
        ]);
  }
  return edges;
};

var init = function init(){

  d3.select('body').style('background-color', 'gray');

  var body = d3.select('body');

  var svg = body.append('svg:svg');

  var hexagon = new Hexagon(50, 100, 100);

  var vertices = hexagon.getVertices();

  vertices.push(vertices[0]); //close ring

  var line = d3.svg.line()
    .x(function(d){
      return d[0];
    })
    .y(function(d){
      return d[1];
    });

  svg.append("svg:path")
    .datum(vertices)
    .attr("class", "line")
    .attr("d", line)
    .style("stroke", "black")
    .style("fill", "orange")
    .style("stroke-width");

  d3.selectAll('path')
    .on("mouseover", function(){ d3.select(this).style("fill", "red"); })
    .on("mouseout", function(){ d3.select(this).style("fill", "orange"); });

};
