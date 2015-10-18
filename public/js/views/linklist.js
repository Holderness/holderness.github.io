var app = app || {};

(function($) {

  app.LinkListView = Backbone.View.extend({
    id: 'link-list-view',
    render: function (e) {
      console.log("render:");
      var container = document.createDocumentFragment();
      _.each(this.collection.models, function(link) {
        var linkItemView = new app.LinkItemView({model: link});
        container.appendChild(linkItemView.render().el);
      });
      this.$el.html(container);
      return this;
    },
    // transfer this to css
    afterRender: function() {
      console.log('after render:');
      if ($(window).width() < 650) {
        this.growLinkOnHover("75px", -35, -10);
      } else {
        this.growLinkOnHover("130px", -50, -20);
      }
    },
    owlProjectNav: function() {
      this.$el.slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: true,
      });
    },
    growLinkOnHover: function(growWidth, marginTop, marginLeft) {
      console.log("growLinkOnHover loaded");
      var originalWidth = $('.link-image').width();
      $('.link-image').hover(function() {
        $(this).stop(true, false).animate({
          width: growWidth,
          marginTop: marginTop,
          marginLeft: marginLeft
        },200);
      },
      function(){
        $(this).stop(true, false).animate({
          width: originalWidth,
          marginTop: 0,
          marginLeft: 0
        },600);
      });
    },
    linkCarousel: function(duration, startPosition, endPosition, slideIn) {
      var elleft = $('#link-list-view').offset().left;
      var opacityStart = (slideIn === false) ? 1 : 0;
      var opacityEnd = (slideIn === true) ? 1 : 0;
      $('#link-list-view').css({
        left: elleft += startPosition,
        opacity: opacityStart
      }).animate({
        left: '-=' + endPosition + 'px',
        opacity: opacityEnd
      }, duration);
    }

  });

})(jQuery);