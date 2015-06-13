var app = app || {};

(function($) {

  app.WritingTextView = Backbone.View.extend({
    el: ".writing-text-container",
    template: _.template($('script[name="<%= view %>"]').html()),
    initialize: function(options){
      debugger;
      this.options = options;
      this.render();

    },
    render: function() {
      debugger;
      this.$el.empty();
      this.$el.html(this.template({view: this.options.view})).hide().fadeIn(200);
    }
  });

})(jQuery);