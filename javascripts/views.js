var LinkView = Backbone.View.extend({
	tagName: 'a',
	className: 'link',
	template: _.template("<img src='<%= image %>' >"),
	render: function(){
		var attributes = this.model.toJSON();
    this.$el.attr('href', this.model.get('url'))
            .html(this.template(attributes))
            .find("img")
            .addClass("link-image");
	}
});