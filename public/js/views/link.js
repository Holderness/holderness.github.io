var app = app || {};

(function($) {

  app.LinkItemView = Backbone.View.extend({
    tagName: 'a',
    className: 'link',
    template: _.template("<img id='<%= id %>' class='link-image' src='<%= image %>' >"),
    render: function() {
      var attributes = this.model.toJSON();
      this.$el.attr('href', this.model.get('url'))
      .html(this.template(attributes));
      return this;
    }
  });

})(jQuery);