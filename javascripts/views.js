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
  el: "#footer",
  initialize: function() {
    _.bindAll(this,'render', 'afterRender', 'beforeRender', 'linkImageFadeOutSlide');
    var _this = this;
    this.render = _.wrap(this.render, function(render) {
       _this.beforeRender();
       render();
       _this.afterRender();
    });
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
    $('.link-image').hover(function() {
      $(this).stop(true, false).animate({
        width: "130px",
        marginTop: -50,
        marginLeft: -20
      },200);
    },
    function(){
      $(this).stop(true, false).animate({
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
  appendLinks: function() {

  },
  linkImageFadeOutSlide: function() {
    var images = this.$el.find("img");
    $.each(images, function(i, el){
      var elleft = $(el).offset().left;
      $(el).css({
                  left: elleft,
                  opacity: 1
      }).animate({
                  left: '-=200px',
                  opacity: 0
      }, 2000);
    });
    // if (_.isFunction(callback)) {
    //       callback();
    // }
  },
  linkImageFadeInSlide: function() {
    var images = this.$el.find("img");
    $.each(images, function(i, el){
      var elleft = $(el).offset().left;
      elleft += 200;
      $(el).css({
                  left: elleft,
                  opacity: 0
      }).animate({
                  left: '-=200px',
                  opacity: 1
      }, 600);
    });
    // if (_.isFunction(callback)) {
    //       callback();
    // }
  },
  goto: function(view) {

      var previous = this.currentView || null;
      var next = view;
      var _this = this;
      
      if (previous) {
        // previous.linkImageFadeOutSlide();
      }

      setTimeout(function(){
        next.render();
                next.linkImageFadeInSlide();
        this.currentView = next;
      }, 200);
      

        next.linkImageFadeInSlide();
        this.currentView = next;




  }

});