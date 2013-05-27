$(function() {
	var tempArray = [];
	var Waterfall = function(options) {
		this.node = options.node;
		this.url = options.url;
		this.maxColumn = options.maxColumn || 1;
		this.ul = "";
		this.li = [];
		this.ulNode;
		this.tmplUl = '<ul class="column"></ul>';
		this.tmplLi = '<li class="img-item"><a href="javascript:;"><img src="<%= img.src %>"></a><p class="des"><%= img.des %></p></li>';
		_.bindAll(this);
		this.init();
		$(window).scroll(_.bind(function() {
			if($(".search-wrap input").val() !== "") return;
			if(this.isNotFull()) {
				this.getData();
			}
		},this));
	}
	Waterfall.prototype = {
		isMobile: function() {
			var o = navigator.userAgent.toLowerCase();
			if(o.indexOf("ipod") || o.indexOf("iphone") || o.indexOf("ipad") || o.indexOf("android")) {
				return true;
			}
		},
		isNotFull: function(){
			var i,deviation;
			deviation = this.isMobile() ? -50 : 0;
			for(i=0;i<this.maxColumn;i++) {
				if(this.ulNode.eq(i).height() - $(document).scrollTop() + this.node.offset().top + deviation <= $(window).height()) {
					tempArray.push(i);
				}
			}
			return tempArray.length;
		},
		control: function() {
			this.insertLi();
			if(this.isNotFull()) {
				this.getData(tempArray.length);
			}
		},
		getData: function(num) {
			var i = 0,num;
			num = num ? num : this.maxColumn;
			$.post(this.url,{num: num},_.bind(function(json) {
				while(i<num) {
					this.li.push(_.template(this.tmplLi,{img: json[i]}));
					i++;
				}
				this.control();
			},this));
		},
		insertUl: function() {
			var i = 0;
			while(i<this.maxColumn) {
				this.ul += this.tmplUl;
				i++;
			}
			this.node.append(this.ul);
			this.ulNode = this.node.find("ul");
		},
		insertLi: function() {
			$(this.li).each(_.bind(function(i,el){
				if(tempArray.length !== 0) {
					this.ulNode.eq(tempArray[i]).append($(el));
					this.ulNode.eq(tempArray[i]).children(":last").fadeIn();
				}
				else {
					this.ulNode.eq(i).append($(el));
					this.ulNode.eq(i).children(":last").fadeIn();
				}
			},this));
			tempArray = [];
			this.li = [];
		},
		init: function() {
			this.insertUl();
			this.getData();
		}
	}
	window.Waterfall = Waterfall;
});