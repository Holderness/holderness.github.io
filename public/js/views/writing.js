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
      this.$el.html(this.template()).hide().fadeIn(200);
      app.writingText = new app.PubView();
    },

  });

})(jQuery);


// var app = app || {};

// (function($) {

//   app.WritingView = Backbone.View.extend({
//     el: "#top-container",
//     template: _.template($('script[name=writing]').html()),
//     blurbTemplate: _.template($('script[name=blurbs]').html()),
//     pubTemplate: _.template($('script[name=pubs]').html()),
//     initialize: function(){
//       this.render();
//     },
//     render: function() {
//       this.$el.empty();
//       this.$el.html(this.template()).hide().fadeIn(700);
//       app.writingText = new app.WritingTextView('blurbs');
//     },

//   });

// })(jQuery);
