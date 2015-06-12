var app = app || {};

(function() {

  app.LinkList = Backbone.Collection.extend({
    model: app.LinkItem,
    url: '/link-carousel'
  });

})();