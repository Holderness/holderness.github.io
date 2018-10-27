var app = app || {};

(function($) {

  app.PubView = Backbone.View.extend({
    el: ".writing-text-container",
    template: _.template($('script[name=pubs]').html()),
    initialize: function(){
      this.render();

      var $scroller = $(".publication-list");
        $scroller.bind('touchstart', function (ev) {
        var $this = $(this);
        var scroller = $scroller.get(0);

        if ($this.scrollTop() === 0) $this.scrollTop(1);
        var scrollTop = scroller.scrollTop;
        var scrollHeight = scroller.scrollHeight;
        var offsetHeight = scroller.offsetHeight;
        var contentHeight = scrollHeight - offsetHeight;
        if (contentHeight == scrollTop) $this.scrollTop(scrollTop-1);
      });

      $('.publication-list').on('scroll', function() {
        $(this).parent().find('.bar').css("opacity", 1 - $('.publication-list').scrollTop() / 80);
      });
      
    },
    render: function() {
      this.$el.empty();
      this.$el.html(this.template()).hide().fadeIn(200);
    }
  });

})(jQuery);