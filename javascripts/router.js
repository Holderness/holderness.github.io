var AppRouter = Backbone.Router.extend({
	routes: {
		":contact": "list",
		":portfolio": "list",
		// ":fiction": "list",
		"*default": "list"
	},
	list: function(linkList) {
		var linkList = linkList || "contact";
		this.linkList = LinkNavigation[linkList];
				debugger;
		this.linkListView = new LinkListView({collection: this.linkList});
		$('#footer').html(this.linkListView.render().el);
	}
});

var app = new AppRouter();
Backbone.history.start();