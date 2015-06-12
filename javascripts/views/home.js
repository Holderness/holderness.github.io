var app = app || {};

(function($) {

  app.HomeView = Backbone.View.extend({
    el: "#top-container",
    template: _.template($('script[name=home]').html()),
    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.html(this.template).hide().fadeIn(700);
      this.pigTongueBlep(-18, -7);
    },
    pigTongueBlep: function(marginTop, marginLeft) {
      $('.pig-image-container').hover(function() {
        $('.fly-pig-tongue').stop(true, false).animate({
          marginTop: 0,
          marginLeft: 0
        }, 2000);
      },
      function() {
        $('.fly-pig-tongue').stop(true, false).animate({
          marginTop: marginTop,
          marginLeft: marginLeft
        }, 200);
      });
    }
  });

})(jQuery);