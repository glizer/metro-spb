var svg = d3.select('svg');

var linesContainer = svg.append('g').attr('id', 'lines').selectAll('path')
    .data(lines).enter()
    .append('path')
    .attr('id', function(node) {
        return 'line-' + node.id;
    })
    .attr('stroke', function(node) {
        return node.color
    })
    .attr('fill', 'none')
    .attr('stroke-width', 5)
    .attr('stroke-linecap', 'round')
    .attr('d', function(node) {
        return node.d;
    });