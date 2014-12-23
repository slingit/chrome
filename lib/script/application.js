var App = {
	render: function() {
		alert(location.hash.substring(1));
	}
};

App.render();