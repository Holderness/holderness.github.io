var AppRouter = Backbone.Router.extend({
  routes: {
    "": "contact",
    "contact": "contact",
    "portfolio": "portfolio",
    "portfolio/:project": "project",
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
  project: function(project){
    var projectModelList = {
      waiter: waiterProject,
      pigcave: pigcaveProject,
      hangmangler: hangmanglerProject
    };
    this.projectView = new ProjectView({model: projectModelList[project]});
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