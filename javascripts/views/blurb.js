var app = app || {};

(function($) {

  app.BlurbView = Backbone.View.extend({
    el: ".writing-text-container",
    template: _.template($('script[name=blurbs]').html()),
    initialize: function(){
      this.render();
    },
    render: function() {
      this.$el.empty();
      this.$el.html(this.template()).hide().fadeIn(200);
    }
  });

})(jQuery);