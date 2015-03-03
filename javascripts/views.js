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
      this.growLinkOnHover("75px", -35, -10);
    } else {
      this.growLinkOnHover("130px", -50, -20);
    }
  },
  growLinkOnHover: function(growWidth, marginTop, marginLeft) {
    console.log("growLinkOnHover loaded");
    var originalWidth = $('.link-image').width();
    $('.link-image').hover(function() {
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


var HomeView = Backbone.View.extend({
  el: "#top-container",
  template: _.template($('script[name=home]').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template).hide().fadeIn(700);
    if ($(window).width() < 650) {
      this.pigTongueBlep(-9,-3);
    } else {
      this.pigTongueBlep(-18, -7);
    }
  },
  pigTongueBlep: function(marginTop, marginLeft) {
    $('.pig-image').hover(function() {
      $('.fly-pig-tongue').stop(true, false).animate({
        marginTop: 0,
        marginLeft: 0
      }, 2000);
    },
    function() {
      $('.fly-pig-tongue').stop(true, false).animate({
        marginTop: marginTop,
        marginLeft: marginLeft
      }, 200);
    });
  }
});

var ProjectView = Backbone.View.extend({
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






