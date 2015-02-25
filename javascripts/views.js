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
  el: '.footer',
  initialize: function() {
  	debugger;
    this.collection.bind("reset", this.render, this);
    this.collection.fetch();
  },
  render: function (e) {
    _.each(this.collection.models, function(link) {
    	debugger;
      var linkItemView = new LinkItemView({model: link
    });
    this.$el.append(linkItemView.render().el);
    }, this);
    return this;
  }
});