var AppRouter = Backbone.Router.extend({
  routes: {
    "": "contact",
    "contact": "contact",
    "portfolio": "portfolio",
    "waiter": "waiter",
    "hangmangler": "hangmangler",
    "pigcave": "pigcave"
  },
  contact: function() {
    this.contactLinkListView = new LinkListView({collection: contactlinkList,
                                                  className: "contact"});
    this.navLinkListView.goto(this.contactLinkListView);
    this.homeView = new HomeView({});
    // this.contactLinkListView.render();
  },
  portfolio: function(pageRoute) {
    this.portfolioLinkListView = new LinkListView({collection: portfoliolinkList,
                                                   className: "portfolio"});
    this.navLinkListView.goto(this.portfolioLinkListView);
    this.pigcaveProjectView = new ProjectView({model: pigcaveProject});
    // this.portfolioLinkListView.render();
  },
  waiter: function() {
    this.waiterProjectView = new ProjectView({model: waiterProject});
    if (!this.navLinkListView.hasOwnProperty('currentView')) {
      this.portfolioLinkListView = new LinkListView({collection: portfoliolinkList,
                                                   className: "portfolio"});
      this.navLinkListView.goto(this.portfolioLinkListView);
    }
  },
  hangmangler: function() {
    this.hangmanglerProjectView = new ProjectView({model: hangmanglerProject});
    if (!this.navLinkListView.hasOwnProperty('currentView')) {
      this.portfolioLinkListView = new LinkListView({collection: portfoliolinkList,
                                                   className: "portfolio"});
      this.navLinkListView.goto(this.portfolioLinkListView);
    }
  },
  pigcave: function() {
    this.pigcaveProjectView.render();
    if (!this.navLinkListView.hasOwnProperty('currentView')) {
      this.portfolioLinkListView = new LinkListView({collection: portfoliolinkList,
                                                   className: "portfolio"});
      this.navLinkListView.goto(this.portfolioLinkListView);
    }
  }
});



var app = new AppRouter();
app.navLinkListView = new NavLinkListView();

Backbone.history.start();