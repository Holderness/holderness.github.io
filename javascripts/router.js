var AppRouter = Backbone.Router.extend({
	routes: {
    "": "list",
    ":contact": "list",
    ":portfolio": "list"
	},
	list: function(linkList) {
		var linkList = linkList || "contact";
		this.boldNav(linkList);
		this.linkList = LinkNavigation[linkList];
		this.linkListView = new LinkListView({collection: this.linkList});
		$('#footer').html(this.linkListView.render());
	},
  boldNav: function(navEl){
    $('#nav').find('.active').removeClass('active');
    $('#nav').find("#"+navEl).addClass('active');
  }
});



var app = new AppRouter();

Backbone.history.start();