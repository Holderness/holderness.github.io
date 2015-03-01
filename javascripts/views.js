var LinkItemView = Backbone.View.extend({
	tagName: 'a',
	className: 'link',
	template: _.template("<img class='link-image' src='<%= image %>' >"),
	render: function() {
		var attributes = this.model.toJSON();
    this.$el.attr('href', this.model.get('url'))
            .html(this.template(attributes));
    return this;
	}
});
  

var LinkListView = Backbone.View.extend({
  id: 'link-list-view',
  render: function (e) {
    console.log("render:");
    var container = document.createDocumentFragment();
    _.each(this.collection.models, function(link) {
      var linkItemView = new LinkItemView({model: link});
      container.appendChild(linkItemView.render().el);
    });
    this.$el.html(container);
    return this;
  },
  afterRender: function() {
    console.log('after render:');
    if ($(window).width() < 650) {
      this.growLinkOnHoverMobile();
    } else {
      this.growLinkOnHover();
    }
  },
  growLinkOnHover: function() {
    console.log("growLinkOnHover loaded");
    $('.link-image').hover(function() {
      $(this).stop(true, true).animate({
        width: "130px",
        marginTop: -50,
        marginLeft: -20
      },200);
    },
    function(){
      $(this).stop(true, true).animate({
        width: "90px",
        marginTop: 0,
        marginLeft: 0
      },600);
    });
  },
  growLinkOnHoverMobile: function() {
    $('.link-image').hover(function() {
      $(this).stop(true, false).animate({
        width: "75px",
        marginTop: -35,
        marginLeft: -10
      },200);
    },
    function() {
      $(this).stop(true, false).animate({
        width: "60px",
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



var NavLinkListView = Backbone.View.extend({
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
      }

      
      this.currentView = next;
  }
});







