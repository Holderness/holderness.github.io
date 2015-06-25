var app = app || {};

(function($) {

  app.ProjectView = Backbone.View.extend({
    el: "#top-container",
    template: _.template($('script[name=projects]').html()),
    imageTemplate: _.template("<img src=<%= image %>>"),
    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.empty();
      var attributes = this.model.toJSON();
      var this_ = this;

      var images = attributes.images;

      function fade() {
        $(".owl-carousel").hide().fadeIn(300);
      }

      this.$el.html(this.template(attributes)).hide().fadeIn(700, function() {
        $(".owl-carousel").owlCarousel({
          margin:10,
          loop:true,
          autoWidth:true,
          nav: true,
          onInitialize: this_.createImages(images),
          onInitialized: fade,
        });
      });

      this.growProjectNextImageOnHover("100px", -20, -20);

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
    },

    createImages: function(images) {
      $.each(images, function(i, image) {
        $(".owl-carousel").append(this.imageTemplate({image: image}));
      }.bind(this));
    }

  });

})(jQuery);