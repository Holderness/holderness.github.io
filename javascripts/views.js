var LinkItemView = Backbone.View.extend({
	tagName: 'a',
	className: 'link',
	template: _.template("<img src='<%= image %>' >"),
	render: function(){
		var attributes = this.model.toJSON();
    this.$el.attr('href', this.model.get('url'))
            .html(this.template(attributes))
            .find("img")
            .addClass("link-image");
    return this;
	}
});

var LinkListView = Backbone.View.extend({
	el: "#footer",
  initialize: function() {
    _.bindAll(this,'render', 'afterRender');
    var _this = this;
    this.render = _.wrap(this.render, function(render) {
      render();
      _this.afterRender();
    });
    this.collection.bind("reset", this.render, this);
    this.collection.fetch();
  },
  render: function (e) {
    this.$el.empty();
    var container = document.createDocumentFragment();
    _.each(this.collection.models, function(link) {
      var linkItemView = new LinkItemView({model: link});
      container.appendChild(linkItemView.render().el);
    });
    this.$el.append(container);
  },
  afterRender: function(){
    console.log('after render:');
    this.growLinkOnHover();
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
  }

});