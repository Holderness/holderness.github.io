var app = app || {};

(function($) {

  app.NavLinkListView = Backbone.View.extend({
    el: "#footer",
    goto: function(view) {

      var previous = this.currentView || null;
      var next = view;
      var _this = this;
      next.render();
      
      if (previous === null) {
        _this.$el.html(next.$el);
        next.linkCarousel(600, 250, 250, true);
        next.afterRender();
      } else if (next.className === "portfolio" && previous.className === "contact") {
        previous.linkCarousel(500, 0, 250, false);
        setTimeout(function(){
          _this.$el.html(next.$el);
          next.linkCarousel(600, 250, 250, true);
          next.afterRender();
        }, 500);
      } else if (next.className === "contact" && previous.className === "portfolio") {
        previous.linkCarousel(500, 0, -250, false);
        setTimeout(function(){
          _this.$el.html(next.$el);
          next.linkCarousel(600, -250, -250, true);
          next.afterRender();
        }, 500);
      } else if (next.className === "writing") {
        previous.linkCarousel(500, 0, 250, false);
        setTimeout(function(){
          _this.$el.html(next.$el);
          next.linkCarousel(600, 250, 250, true);
          next.afterRender();
        }, 500);
      } else if (previous.className === "writing") {
        previous.linkCarousel(500, 0, -250, false);
        setTimeout(function(){
          _this.$el.html(next.$el);
          next.linkCarousel(600, -250, -250, true);
          next.afterRender();
        }, 500);
      }

      this.currentView = next;
    },

    setPubViewListener: function() {
      this.$el.on('click', '#mermaids-purse', function() {
        this.pubView = new app.PubView();
      });
    },

    // pubViewToggle: function() {
    //   if ($('.pub-container') === []) {
    //     this.writingView = new app.
    //   }
    // }


  });

})(jQuery);