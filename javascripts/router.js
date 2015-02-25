var AppRouter = Backbone.Router.extend({
	routes: {
		":contact": "list",
		":portfolio": "list",
		":fiction": "list",
		"*default": "list"
	},
	list: function(linkList) {
		this.linkItems = new LinkList();
		debugger;
		this.linkListView = new LinkListView({collection: this.linkItems});
		$('.footer').html(this.linkListView.render().el);
	}
});

var app = new AppRouter();
Backbone.history.start();