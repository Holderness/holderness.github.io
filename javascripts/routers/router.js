var app = app || {};

(function() {

  app.AppRouter = Backbone.Router.extend({
    routes: {
      "": "contact",
      "contact": "contact",
      "portfolio": "portfolio",
      "portfolio/:project": "project",
      "writing": "writing"
    },
    contact: function() {
      this.contactLinkListView = new app.LinkListView({collection: contactlinkList,
        className: "contact"});
      app.navLinkListView.goto(this.contactLinkListView);
      this.homeView = new app.HomeView({});
    // this.contactLinkListView.render();
    },
    portfolio: function(pageRoute) {
      this.portfolioLinkListView = new app.LinkListView({collection: portfoliolinkList,
     className: "portfolio"});
      app.navLinkListView.goto(this.portfolioLinkListView);
      this.pigcaveProjectView = new app.ProjectView({model: pigcaveProject});
    // this.portfolioLinkListView.render();
    },
    project: function(project){
      var projectList = {
        waiter: waiterProject,
        pigcave: pigcaveProject,
        hangmangler: hangmanglerProject
      };
      this.projectView = new app.ProjectView({model: projectList[project]});
      if (!app.navLinkListView.hasOwnProperty('currentView')) {
        this.portfolioLinkListView = new app.LinkListView({collection: portfoliolinkList,
         className: "portfolio"});
        app.navLinkListView.goto(this.portfolioLinkListView);
      }
    },
    writing: function() {
      this.writingView = new app.WritingView({});
      this.writingLinkListView = new app.LinkListView({collection: writinglinkList,
       className: "writing"});
      app.navLinkListView.goto(this.writingLinkListView);
    }
  });

  app.router = new app.AppRouter();
  app.navLinkListView = new app.NavLinkListView();
  Backbone.history.start();

})();