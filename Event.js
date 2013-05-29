(function() {
	var Event = function() {
		this.eventListners = {};
		this.constructor = "Event";
	}
	Event.prototype = {
		emit: function(eventName) {
			var theArgs = Array.prototype.slice.call(arguments,arguments.callee.length);
			this.eventListners[eventName].apply(this,theArgs);
		},
		on: function(eventName, fn) {
			if(typeof eventName !== "string") {
				throw TypeError("The custom event name must be a string!");
			}
			this.eventListners[eventName] = fn;
		},
		unsubscribe: function(eventName) {
			delete this.eventListners[eventName];
		}
	}

	window.Event = Event;
})();