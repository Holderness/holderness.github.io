var app = app || {};

(function() {

  app.LinkItem = Backbone.Model.extend({
    url: "/link-carousel",
    defaults: {
      url: "",
      image: "",
      id: null
    }
  });

})();