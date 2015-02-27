var LinkItemView = Backbone.View.extend({
	tagName: 'a',
	className: 'link',
	template: _.template(
    "<img class='link-image' src='<%= image %>' >"),
	render: function(){
		var attributes = this.model.toJSON();
    this.$el.attr('href', this.model.get('url'))
            .html(this.template(attributes));
    return this;
	}
});
  

var LinkListView = Backbone.View.extend({
	el: "#footer",
  initialize: function() {
    _.bindAll(this,'render', 'afterRender', 'beforeRender');
    var _this = this;
    this.render = _.wrap(this.render, function(render) {
       _this.beforeRender();
       render();
       _this.afterRender();
    });
  },
  beforeRender: function() {
    console.log("before render:");
    this.linkImageFadeOutSlide();
  },
  render: function (e) {
    console.log("render:");
    this.$el.empty();
    var container = document.createDocumentFragment();
    _.delay(
    _.each(this.collection.models, function(link) {
      var linkItemView = new LinkItemView({model: link});
      container.appendChild(linkItemView.render().el);
    }),
    300000);
    this.$el.append(container);
  },
  afterRender: function(){
    console.log('after render:');
    if ($(window).width() < 650) {
      this.growLinkOnHoverMobile();
    } else {
      this.growLinkOnHover();
    }
  },
  growLinkOnHover: function(){
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
  growLinkOnHoverMobile: function(){
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
  linkImageFadeOutSlide: function(){
    var images = $("#footer").find("img");
    $.each(images, function(i, el){
      var elleft = $(el).offset().left;
      $(el).css({
                  left: elleft,
                  opacity: 1
      }).animate({
                  left: '-=200px',
                  opacity: 0
      }, 1000);
    });
  }

});