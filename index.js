$(function() {
	var itemWidth = 240,
		$node = $("#container"),
	    options = {
			node: $node,
			maxColumn: Math.floor($node.width() / itemWidth),
			url: 'fall.php'
		};
		
	var fall = new Fall(options);
	//======================================================
	var search = new Search({
		node: $(".search-wrap input"),
		maxColumn: Math.floor($node.width() / itemWidth)
	});
});