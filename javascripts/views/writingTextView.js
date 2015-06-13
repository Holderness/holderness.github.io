var app = app || {};

(function($) {

  app.WritingTextView = Backbone.View.extend({
    el: ".writing-text-container",
    initialize: function(options){
      debugger;
      app.vieww = options;
      this.render(app.vieww);
    },
    template: _.template($('script[name=' + options + ']').html()),
    render: function(options) {
      debugger;
      this.$el.empty();
      this.$el.html(this.template(options)).hide().fadeIn(200);
    }
  });

})(jQuery);