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
  events: {
    'change': 'growLinkOnHover'
	},
	el: "#footer",
  initialize: function() {
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
  growLinkOnHover: function(){
  	console.log('O )))))) O');
  	growLinkOnHover();
  }
});