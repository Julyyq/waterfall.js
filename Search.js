$(function() {
	var css = {
		container: "#container"
	}
	var Search = function(options) {
		this.node = options.node;
		this.maxColumn = options.maxColumn;
		this.ul = "";
		this.li = [];
		this.tmplUl = '<ul class="column"></ul>';
		this.tmplLi = '<li class="img-item"><a href="javascript:;"><img src="<%= img.src %>"></a><p class="des"><%= img.des %></p></li>';
		this.bind();
	}
	Search.prototype = {
		bind: function() {
			var ie = !-[1,],
			throttled = _.throttle(_.bind(function() {
				if(this.getValue() =='') {
					$(css.container).empty();
					window.Fall.namespace.init();
					return;
				}
				this.sendKey(this.getValue());
			},this), 1000);
			if(ie){
				this.node[0].onpropertychange = throttled;
			}
			else{
				this.node[0].oninput = throttled;
			}
		},
		sendKey: function(val) {
			$.post("search.php",{key: val}, _.bind(function(json) {
				var num = json.length,i=0;
				if(num == 0) return;
				while(i<num) {
					this.li.push(_.template(this.tmplLi,{img: json[i]}));
					i++;
				}
				this.insert();
			},this));
		},
		getValue: function() {
			return this.node[0].value;
		},
		insert: function() {
			var $co = $(css.container);
			$co.empty();
			for(var k = 0;k<this.maxColumn;k++) {
				this.ul += this.tmplUl;
			}
			$co.append(this.ul);

			var tempIndex=0,$tempUl = $co.find("ul");
			for(var j=0;j<this.li.length;j++) {
				if(j%this.maxColumn == 0) tempIndex=0;
				$tempUl.eq(tempIndex).append(this.li[j]);
				$tempUl.eq(tempIndex).children(":last").fadeIn();
				tempIndex++;
			}

			this.ul = "";
			this.li = [];
		}
	}

	window.Search = Search;
});