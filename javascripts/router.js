var AppRouter = Backbone.Router.extend({
  routes: {
    "": "page",
    ":contact": "page",
    ":portfolio": "page"
  },
  page: function(pageRoute) {
    var pageRoute = pageRoute || "contact";
    this.boldNav(pageRoute);
    this.pageRoute = LinkNavigation[pageRoute];
    this.linkListView = new LinkListView({collection: this.pageRoute});
    $('#footer').html(this.linkListView.render());
  },
  boldNav: function(navEl){
    $('#nav').find('.bold-nav').removeClass('bold-nav');
    $('#nav').find("#"+navEl).addClass('bold-nav');
  }
});



var app = new AppRouter();

Backbone.history.start();