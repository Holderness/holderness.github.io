var AppRouter = Backbone.Router.extend({
	routes: {
		"/list": "list"
	},
	list: function() {
		this.linkItems = new LinkList();
		this.linkListView = new LinkListView({collection: this.linkItems});
		$('.footer').html(this.linkListView.render().el);
	}
});

var app = new AppRouter();
Backbone.history.start();