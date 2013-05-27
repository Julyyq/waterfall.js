$(function() {
	var Input = function(options) {
		this.node = options.node;
		this.bind();
	}
	Input.prototype = {
		bind: function() {
			var ie = !-[1,];
			if(ie){
				this.node[0].onpropertychange = _.bind(function(){
					if(this.node[0].value=='') return;
				},this);
			}
			else{
				this.node[0].oninput = _.bind(function(){
					if(this.node[0].value=='') return;
				},this);
			}
		}
	}

	window.Input = Input;
});