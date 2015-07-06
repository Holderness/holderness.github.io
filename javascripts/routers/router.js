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
      this.boldNavEl('contact');
    },
    portfolio: function(pageRoute) {
      this.portfolioLinkListView = new app.LinkListView({collection: portfoliolinkList,
     className: "portfolio"});
      app.navLinkListView.goto(this.portfolioLinkListView);
      this.pigcaveProjectView = new app.ProjectView({model: pigcaveProject});
      this.boldNavEl('portfolio');
    },
    project: function(project){
      var projectList = {
        pique: piqueProject,
        pigcave: pigcaveProject,
        hangmangler: hangmanglerProject,
        bklst: bklstProject
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
      app.navLinkListView.setPubViewListener();
      this.boldNavEl('writing');
    },
    boldNavEl: function(nav) {
      $('#nav').find('.bold-nav').removeClass('bold-nav');
      $('#' + nav).addClass('bold-nav');
    }

  });

  app.router = new app.AppRouter();
  app.navLinkListView = new app.NavLinkListView();
  Backbone.history.start();

})();