trash.js


      <a class="link" href="https://github.com/Holderness">
        <img class="link-image" src="css/images/github-icon.png" alt="Github:Holderness">
      </a>
      <a class="link" href="https://www.linkedin.com/in/andersonholderness">
        <img class="link-image" src="css/images/linked-in-icon.png" alt="/in/andersonholderness">
      </a>
      <a class="link" href="mailto:andersonholderness@gmail.com">
        <img class="link-image" src="css/images/mail-icon.png" alt="andersonholderness@gmail.com">
      </a>
      <a class="link" href="http://pigcave.com">
        <img class="link-image" src="css/images/pig-cave.png" alt="pigcave.com">
      </a>


      var LinkView = Backbone.View.extend({
      	tagName: 'a',
      	className: 'link',
      	template: _.template("<img src='<%= image %>' >")
      	render: function(){
      		var html = "<img src='" + this.model.get('image') +"' >";
      		$(this.el).html(html)
      		.find("img")
      		.addClass("link-image");
      	}
      });



      <a href="https://github.com/Holderness">
      <img class="arrow" src="css/images/arrow.png">
      </a>


      
      var images = $(".footer").find("img");
      $.each(images, function(i, el){
      	var elleft = $(el).offset().left;
      	$(el).css({left: elleft,
      		opacity: 1})
      	.animate({left: '+=50px',
      		opacity: 0},'slow')
      	
      });