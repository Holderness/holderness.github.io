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




//link list view trash after refactor
  initialize: function() {
    _.bindAll(this,'render');
    var _this = this;
    this.render = _.wrap(this.render, function(render) {
       render();
    });
  },
  linkImageFadeOutSlide: function() {
    var elleft = $('#link-list-view').offset().left;
    $('#link-list-view').css({
      left: elleft,
      opacity: 1
    }).animate({
      left: '-=250px',
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
  },






// tried to fix jumping images in linkListView
  var linkListViewWidth = function linkListViewWidth(){
    var totalWidth = 0;
    $.each($('.link-image'), function(i, child){
      totalWidth += $(child).width();
    });
    return totalWidth;
  };
  
  app.linkListViewWidth = linkListViewWidth();




//after growLink and blep refactor
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



/* html and css for name and professions intro */
      <div class="welcome-container">
      <div class="welcome">
        <h1 class="welcome-name">Anderson Holderness</h1>
        <h2 class="welcome-professions">WRITER. &nbsp;&nbsp; TINKERER. &nbsp;&nbsp; WEB DEVELOPER.</h2>
      </div>
    </div>

.welcome {
  padding-top: 260px;
  text-align: center;
}

.welcome-name {
  -webkit-text-stroke: 1px #000000;
  font-family: Garamond, Baskerville, Georgia, "Times New Roman", serif;
  font-size: 60px;
}

.welcome-professions {
  -webkit-text-stroke: .7px #000000;
  -webkit-font-smoothing: antialiased;
  font-family: 'Lato', sans-serif;
  font-size: 23px;
  margin: -40px 0 40px 0;
}




  <script type="text/javascript">
    var sc_project=10326034; 
    var sc_invisible=1; 
    var sc_security="80bbaded"; 
    var scJsHost = (("https:" == document.location.protocol) ?
      "https://secure." : "http://www.");
       document.write("<sc"+"ript type='text/javascript' src='" +
       scJsHost +
       "statcounter.com/counter/counter.js'></"+"script>");
  </script>
  <noscript>
    <div class="statcounter">
      <a title="shopify analytics" href="http://statcounter.com/shopify/" target="_blank">
        <img class="statcounter" src="http://c.statcounter.com/10326034/0/80bbaded/1/"
        alt="shopify analytics">
      </a>
    </div>
  </noscript>
