var AppRouter = Backbone.Router.extend({
  routes: {
    "": "contact",
    "contact": "contact",
    "portfolio": "portfolio"
  },
  contact: function() {
    this.contactLinkListView = new LinkListView({collection: LinkNavigation.contact,
                                                  className: "contact"});
    this.navLinkListView.goto(this.contactLinkListView);
    // this.contactLinkListView.render();
  },
  portfolio: function(pageRoute) {
    this.portfolioLinkListView = new LinkListView({collection: LinkNavigation.portfolio,
                                                   className: "portfolio"});
    this.navLinkListView.goto(this.portfolioLinkListView);
    // this.portfolioLinkListView.render();
  }
});



var app = new AppRouter();
app.navLinkListView = new NavLinkListView();

Backbone.history.start();