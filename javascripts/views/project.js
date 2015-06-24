var app = app || {};

(function($) {

  app.ProjectView = Backbone.View.extend({
    el: "#top-container",
    template: _.template($('script[name=projects]').html()),
    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.empty();
      var attributes = this.model.toJSON();
      this.$el.html(this.template(attributes)).hide().fadeIn(700);
      this.growProjectNextImageOnHover("100px", -20, -20);
      $(".owl-carousel").owlCarousel({
        margin:10,
        loop:true,
        autoWidth:true,
        nav: true,
      });
    },
    growProjectNextImageOnHover: function(growWidth, marginTop, marginLeft) {
      console.log("growProjectNextImageOnHover loaded");
      var originalWidth = $('.project-next-button-img').width();
      $('.project-next-button-img').hover(function() {
        $(this).stop(true, true).animate({
          width: growWidth,
          marginTop: marginTop,
          marginLeft: marginLeft
        },200);
      },
      function(){
        $(this).stop(true, true).animate({
          width: originalWidth,
          marginTop: 0,
          marginLeft: 0
        },600);
      });
    }
  });

})(jQuery);