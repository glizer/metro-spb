var svg = d3.select('svg');

var linesContainer = svg.append('g').attr('id', 'lines').selectAll('path')
    .data(lines).enter()
    .append('g')
    .attr('id', function(node) {
        return 'line-' + node.id;
    })
    .append('path')
    .attr('stroke', function(node) {
        return node.color
    })
    .attr('fill', 'none')
    .attr('stroke-width', 5)
    .attr('stroke-linecap', 'round')
    .attr('d', function(node) {
        return node.d;
    })
    .on('mouseover', selectLine)
    .on('mouseout', selectLine);

lines.forEach(function(line) {
    var $line = d3.select('#line-' + line.id);
    $line.append('g').selectAll('.station')
        .data(line.station).enter()
        .append('circle')
        .attr('id', function(node, i) {
            return 'circle-' + i;
        })
        .attr('transform', 'translate(30)')
        .attr('class', 'station')
        .attr('stroke', line.color)
        .attr('fill', '#fff')
        .attr('stroke-width', 3)
        .attr('r', 8)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('transform', function(d, i) {
            var thisLine = $line.select('path').node(),
                length = thisLine.getTotalLength(),
                position = thisLine.getPointAtLength(length / (line.station.length - 1) * i);
            return 'translate(' + position.x + ' , ' + position.y + ')';
        });
});

var station = svg.selectAll('.station');

function selectLine(line) {
    var event = d3.event.type;
    d3.select(this).attr('stroke-width', event == 'mouseover' ? 7 : 5);
}