var AppRouter = Backbone.Router.extend({
  routes: {
    "": "page",
    ":contact": "page",
    ":portfolio": "page"
  },
  page: function(pageRoute) {
    var pageRoute = pageRoute || "contact";
    this.pageRoute = LinkNavigation[pageRoute];
    this.linkListView = new LinkListView({collection: this.pageRoute});
    $('#footer').html(this.linkListView.render());
  }
});



var app = new AppRouter();
Backbone.history.start();