var app = app || {};

(function($) {

  app.WritingView = Backbone.View.extend({
    el: "#top-container",
    template: _.template($('script[name=writing]').html()),
    initialize: function(){
      this.render();
    },
    render: function() {
      this.$el.empty();
      this.$el.html(this.template()).hide().fadeIn(700);
      app.writingText = new app.BlurbView();
    },

  });

})(jQuery);


// var app = app || {};

// (function($) {

//   app.WritingView = Backbone.View.extend({
//     el: "#top-container",
//     template: _.template($('script[name=writing]').html()),
//     initialize: function(){
//       this.render();
//     },
//     render: function() {
//       this.$el.empty();
//       this.$el.html(this.template()).hide().fadeIn(700);
//       app.writingText = new app.WritingTextView({view: 'blurbs'});
//     },

//   });

// })(jQuery);