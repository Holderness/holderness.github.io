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
  initialize: function() {
    _.bindAll(this,'render', 'afterRender', 'beforeRender');
    var _this = this;
    this.render = _.wrap(this.render, function(render) {
       _this.beforeRender();
       render();
       _this.afterRender();
    });
  },
  events: {
    "click" : "growLinkOnHover"
  },
  beforeRender: function() {
    console.log("before render:");
  },
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
    $('.link-image').hover(function(e) {
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
    $('.link-image').hover(function(e) {
      e.preventDefault();
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
  linkImageFadeOutSlide: function() {
    var elleft = $('#link-list-view').offset().left;
    $('#link-list-view').css({
      left: elleft,
      opacity: 1
    }).animate({
      left: '-=200px',
      opacity: 0
    }, 500);
  },
  linkImageFadeInSlide: function() {
    var elleft = $('#link-list-view').offset().left;
    $('#link-list-view').css({
      left: elleft += 250,
      opacity: 0
    }).animate({
      left: '-=250px',
      opacity: 1
    }, 600);
    this.afterRender();
  }

});



var NavLinkListView = Backbone.View.extend({
  el: "#footer",
  goto: function(view) {

      var previous = this.currentView || null;
      var next = view;
      var _this = this;
      
      if (previous === null) {
        next.render();
        _this.$el.html(next.$el);
        next.linkImageFadeInSlide();
      } else {
        previous.linkImageFadeOutSlide();
        next.render();
        setTimeout(function(){
          _this.$el.html(next.$el);
          next.linkImageFadeInSlide();
        }, 500);
      }

      this.currentView = next;
  }
});