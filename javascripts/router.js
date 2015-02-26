var AppRouter = Backbone.Router.extend({
	routes: {
    "": "list",
    ":contact": "list",
    ":portfolio": "list"
	},
	list: function(linkList) {
		var linkList = linkList || "contact";
		this.linkList = LinkNavigation[linkList];
		this.linkListView = new LinkListView({collection: this.linkList});
		$('#footer').html(this.linkListView.render().el);
	}
});

var app = new AppRouter();
Backbone.history.start();