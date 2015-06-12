// var AppRouter = Backbone.Router.extend({
//   routes: {
//     "": "contact",
//     "contact": "contact",
//     "portfolio": "portfolio",
//     "portfolio/:project": "project",
//     "writing": "writing"
//   },
//   contact: function() {
//     this.contactLinkListView = new LinkListView({collection: contactlinkList,
//                                                   className: "contact"});
//     this.navLinkListView.goto(this.contactLinkListView);
//     this.homeView = new HomeView({});
//     // this.contactLinkListView.render();
//   },
//   portfolio: function(pageRoute) {
//     this.portfolioLinkListView = new LinkListView({collection: portfoliolinkList,
//                                                    className: "portfolio"});
//     this.navLinkListView.goto(this.portfolioLinkListView);
//     this.pigcaveProjectView = new ProjectView({model: pigcaveProject});
//     // this.portfolioLinkListView.render();
//   },
//   project: function(project){
//     var projectList = {
//       waiter: waiterProject,
//       pigcave: pigcaveProject,
//       hangmangler: hangmanglerProject
//     };
//     this.projectView = new ProjectView({model: projectList[project]});
//     if (!this.navLinkListView.hasOwnProperty('currentView')) {
//       this.portfolioLinkListView = new LinkListView({collection: portfoliolinkList,
//                                                    className: "portfolio"});
//       this.navLinkListView.goto(this.portfolioLinkListView);
//     }
//   },
//   writing: function() {
//     this.writingView = new WritingView({});
//     this.writingLinkListView = new LinkListView({collection: writinglinkList,
//                                                    className: "writing"});
//     this.navLinkListView.goto(this.writingLinkListView);
//   }
// });



// var app = new AppRouter();
// app.navLinkListView = new NavLinkListView();
// Backbone.history.start();