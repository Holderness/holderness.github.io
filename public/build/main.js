var app = app || {};

(function() {

  app.LinkItem = Backbone.Model.extend({
    url: "/link-carousel",
    defaults: {
      url: "",
      image: "",
      id: null
    }
  });

})();
var app = app || {};

(function() {

  app.Project = Backbone.Model.extend({
    url: "/portfolio"
  });

})();
var app = app || {};

(function() {

  app.LinkList = Backbone.Collection.extend({
    model: app.LinkItem,
    url: '/link-carousel'
  });

})();
var app = app || {};

(function($) {

  app.BlurbView = Backbone.View.extend({
    el: ".writing-text-container",
    template: _.template($('script[name=blurbs]').html()),
    initialize: function(){
      this.render();
    },
    render: function() {
      this.$el.empty();
      this.$el.html(this.template()).hide().fadeIn(200);
    }
  });

})(jQuery);
var app = app || {};

(function($) {

  app.HomeView = Backbone.View.extend({
    el: "#top-container",
    template: _.template($('script[name=home]').html()),
    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.html(this.template).hide().fadeIn(700);
      this.pigTongueBlep(-18, -7);
    },
    pigTongueBlep: function(marginTop, marginLeft) {
      $('.pig-image-container').hover(function() {
        $('.fly-pig-tongue').stop(true, false).animate({
          marginTop: 0,
          marginLeft: 0
        }, 2000);
      },
      function() {
        $('.fly-pig-tongue').stop(true, false).animate({
          marginTop: marginTop,
          marginLeft: marginLeft
        }, 200);
      });
    }
  });

})(jQuery);
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
var app = app || {};

(function($) {

  app.LinkListView = Backbone.View.extend({
    id: 'link-list-view',
    render: function (e) {
      console.log("render:");
      var container = document.createDocumentFragment();
      _.each(this.collection.models, function(link) {
        var linkItemView = new app.LinkItemView({model: link});
        container.appendChild(linkItemView.render().el);
      });
      this.$el.html(container);
      return this;
    },
    // transfer this to css
    afterRender: function() {
      console.log('after render:');
      if ($(window).width() < 650) {
        this.growLinkOnHover("75px", -35, -10);
      } else {
        this.growLinkOnHover("130px", -50, -20);
      }
    },
    owlProjectNav: function() {
      this.$el.slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: true,
      });
    },
    growLinkOnHover: function(growWidth, marginTop, marginLeft) {
      console.log("growLinkOnHover loaded");
      var originalWidth = $('.link-image').width();
      $('.link-image').hover(function() {
        $(this).stop(true, false).animate({
          width: growWidth,
          marginTop: marginTop,
          marginLeft: marginLeft
        },200);
      },
      function(){
        $(this).stop(true, false).animate({
          width: originalWidth,
          marginTop: 0,
          marginLeft: 0
        },600);
      });
    },
    linkCarousel: function(duration, startPosition, endPosition, slideIn) {
      var elleft = $('#link-list-view').offset().left;
      var opacityStart = (slideIn === false) ? 1 : 0;
      var opacityEnd = (slideIn === true) ? 1 : 0;
      $('#link-list-view').css({
        left: elleft += startPosition,
        opacity: opacityStart
      }).animate({
        left: '-=' + endPosition + 'px',
        opacity: opacityEnd
      }, duration);
    }

  });

})(jQuery);
var app = app || {};

(function($) {

  app.NavLinkListView = Backbone.View.extend({
    el: "#footer",
    goto: function(view) {

      var previous = this.currentView || null;
      var next = view;
      var _this = this;
      next.render();
      
      if (previous === null) {
        _this.$el.html(next.$el);
        next.linkCarousel(600, 250, 250, true);
        next.afterRender();
      } else if (next.className === "portfolio" && previous.className === "contact") {
        previous.linkCarousel(500, 0, 250, false);
        setTimeout(function(){
          _this.$el.html(next.$el);
          next.linkCarousel(600, 250, 250, true);
          next.afterRender();
          next.owlProjectNav();
        }, 500);
      } else if (next.className === "portfolio" && previous.className === "writing") {
        previous.linkCarousel(500, 0, -250, false);
        setTimeout(function(){
          _this.$el.html(next.$el);
          next.linkCarousel(600, -250, -250, true);
          next.afterRender();
          next.owlProjectNav();
        }, 500);
      } else if (next.className === "contact" && previous.className === "portfolio") {
        previous.linkCarousel(500, 0, -250, false);
        setTimeout(function(){
          _this.$el.html(next.$el);
          next.linkCarousel(600, -250, -250, true);
          next.afterRender();
        }, 500);
      } else if (next.className === "writing") {
        previous.linkCarousel(500, 0, 250, false);
        setTimeout(function(){
          _this.$el.html(next.$el);
          next.linkCarousel(600, 250, 250, true);
          next.afterRender();
        }, 500);
        this.setPubViewListener();
      } else if (previous.className === "writing") {
        previous.linkCarousel(500, 0, -250, false);
        setTimeout(function(){
          _this.$el.html(next.$el);
          next.linkCarousel(600, -250, -250, true);
          next.afterRender();
        }, 500);
      }

      this.currentView = next;
    },

    setPubViewListener: function() {
      this.$el.off('click', '#mermaids-purse');
      var this_ = this;
      this.$el.on('click', '#mermaids-purse', function() {
        this_.pubViewToggle();
      });
      app.blurbView = true;
    },

    pubViewToggle: function() {
      // app.pubView = app.pubView === 'blurbs' ? 'blurbs' : 'pubs';
      // if (app.pubView === 'blurbs') {
      //   debugger;
      //   new app.WritingTextView({'view': 'pubs'});
      // } else {
      //   debugger;
      //   new app.WritingTextView({'view': 'blurbs'});
      // }
      app.blurbView = app.blurbView === false ? true : false;
      if (app.blurbView) {
        app.writingText = new app.BlurbView();

      } else {
        app.writingText = new app.PubView();

      }
    }


  });

})(jQuery);
var app = app || {};

(function($) {

  app.ProjectView = Backbone.View.extend({
    el: "#top-container",
    template: _.template($('script[name=projects]').html()),
    imageTemplate: _.template("<img src=<%= image %>>"),
    initialize: function() {
      this.render();
    },
    render: function() {
      var attributes = this.model.toJSON();
      var this_ = this;

      var images = attributes.images;

      // function fade() {
      //   $(".owl-carousel").hide().fadeIn(300);
      // }

      $('.link').on('click', function() {
        if ($('#top-container').is(':animated')) {
           $('#top-container').stop(true, true);
         }
       });
      
      this.$el.empty().hide().html(this.template(attributes)).fadeIn(700);


        $(".project-image").owlCarousel({
          margin:30,
          loop:true,
          autoWidth:true,
          nav: true,
          lazyLoad: true,
          center: true,
          onInitialize: this_.createImages(images),
        });




      // this.growProjectNextImageOnHover("100px", -20, -20);
    },
    // growProjectNextImageOnHover: function(growWidth, marginTop, marginLeft) {
    //   console.log("growProjectNextImageOnHover loaded");
    //   var originalWidth = $('.project-next-button-img').width();
    //   $('.project-next-button-img').hover(function() {
    //     $(this).stop(true, true).animate({
    //       width: growWidth,
    //       marginTop: marginTop,
    //       marginLeft: marginLeft
    //     },200);
    //   },
    //   function(){
    //     $(this).stop(true, true).animate({
    //       width: originalWidth,
    //       marginTop: 0,
    //       marginLeft: 0
    //     },600);
    //   });
    // },

    createImages: function(images) {
      $(".owl-carousel").children().remove();
      $.each(images, function(i, image) {
        $(".owl-carousel").append(this.imageTemplate({image: image}));
      }.bind(this));
    }

  });

})(jQuery);
var app = app || {};

(function($) {

  app.PubView = Backbone.View.extend({
    el: ".writing-text-container",
    template: _.template($('script[name=pubs]').html()),
    initialize: function(){
      this.render();

      var $scroller = $(".publication-list");
        $scroller.bind('touchstart', function (ev) {
        var $this = $(this);
        var scroller = $scroller.get(0);

        if ($this.scrollTop() === 0) $this.scrollTop(1);
        var scrollTop = scroller.scrollTop;
        var scrollHeight = scroller.scrollHeight;
        var offsetHeight = scroller.offsetHeight;
        var contentHeight = scrollHeight - offsetHeight;
        if (contentHeight == scrollTop) $this.scrollTop(scrollTop-1);
      });

      $('.publication-list').on('scroll', function() {
        $(this).parent().find('.bar').css("opacity", 1 - $('.publication-list').scrollTop() / 185);
      });
      
    },
    render: function() {
      this.$el.empty();
      this.$el.html(this.template()).hide().fadeIn(200);
    }
  });

})(jQuery);
var app = app || {};

(function($) {

  app.WritingView = Backbone.View.extend({
    el: "#top-container",
    template: _.template($('script[name=writing]').html()),
    initialize: function(){
      this.render();
    },
    render: function() {
      this.$el.empty();
      this.$el.html(this.template()).hide().fadeIn(200);
      app.writingText = new app.BlurbView();
    },

  });

})(jQuery);


// var app = app || {};

// (function($) {

//   app.WritingView = Backbone.View.extend({
//     el: "#top-container",
//     template: _.template($('script[name=writing]').html()),
//     blurbTemplate: _.template($('script[name=blurbs]').html()),
//     pubTemplate: _.template($('script[name=pubs]').html()),
//     initialize: function(){
//       this.render();
//     },
//     render: function() {
//       this.$el.empty();
//       this.$el.html(this.template()).hide().fadeIn(700);
//       app.writingText = new app.WritingTextView('blurbs');
//     },

//   });

// })(jQuery);
// var app = app || {};

// (function($) {

//   app.WritingTextView = Backbone.View.extend({
//     el: ".writing-text-container",
//     initialize: function(options){
//       debugger;
//       app.vieww = options;
//       this.render(app.vieww);
//     },
//     template: _.template($('script[name=' + options + ']').html()),
//     render: function(options) {
//       debugger;
//       this.$el.empty();
//       this.$el.html(this.template(options)).hide().fadeIn(200);
//     }
//   });

// })(jQuery);
var githubLink = new app.LinkItem( {
  url: "https://github.com/Holderness",
  image: "public/images/github-icon.png"
});

var linkedinLink = new app.LinkItem( {
  url: "https://www.linkedin.com/in/andersonholderness",
  image: "public/images/linked-in-icon.png"
});

var mailtoLink = new app.LinkItem( {
  url: "mailto:andersonholderness@gmail.com",
  image: "public/images/mail-icon.png"
});

var pigcaveLink = new app.LinkItem( {
  url: "#portfolio/pigcave",
  image: "public/images/fly-pig-icon.png"
});

var justokayreadsLink = new app.LinkItem( {
  url: "#portfolio/justokayreads",
  image: "public/images/book-icon.png"
});

// var waiterLink = new app.LinkItem( {
//   url: "#portfolio/waiter",
//   image: "public/images/waiter-icon.png"
// });

var hangmanglerLink = new app.LinkItem( {
  url: "#portfolio/hangmangler",
  image: "public/images/hangmangler-icon.png"
});

var piqueLink = new app.LinkItem( {
  url: "#portfolio/pique",
  image: "public/images/pique-icon.png"
});

// var pigcaveLink = new app.LinkItem( {
//   url: "http://pigcave.com",
//   image: "public/images/pig-cave.png"
// });

// var waiterLink = new app.LinkItem( {
//   url: "http://192.241.243.100/",
//   image: "public/images/waiter-icon.png"
// });

// var hangmanglerLink = new app.LinkItem( {
//   url: "https://hangmanglerhelper.herokuapp.com/",
//   image: "public/images/hangmangler-icon.png"
// });

var chjatLink = new app.LinkItem( {
  url: "#portfolio/chjat",
  image: "public/images/chjat-icon.png"
});

var publicationLink = new app.LinkItem( {
  url: "#writing",
  image: "public/images/mermaids-purse.png",
  id: "mermaids-purse"
});

var contactlinkList = new app.LinkList([ githubLink, linkedinLink, mailtoLink ]);
var portfoliolinkList = new app.LinkList([ pigcaveLink, hangmanglerLink, justokayreadsLink, piqueLink, chjatLink ]);
var writinglinkList = new app.LinkList([ publicationLink ]);


var pigcaveProject = new app.Project( {
  title: "Pig Cave",
  subtitle: "Story-creation App",
  description: "This app's foundation is a word-sorting algorithm that pairs similar texts together. The data comes from two websites I scraped and is housed in an API built on Rails. The original images were drawn in Photoshop and animated with Skrollr.js.",
  technologies: "Backbone.js, Skrollr.js, jQuery, Ruby on Rails, JSON, Photoshop",
  images: ["public/images/pigcave/pig-cave-project.png", "public/images/pigcave/owl.png", "public/images/pigcave/laser.png"],
  link: "http://pigcave.com",
  github: "https://github.com/Holderness/Pig_Cave_JS_Client",
  githubIcon: "public/images/github-icon.png"
});

var justokayreadsProject = new app.Project( {
  title: "Justokayreads",
  subtitle: "Personal Library App",
  description: "This single-page app offers the ability to build your own digital library. Rate, comment, search, upload book covers: keep track of the books you read.",
  technologies: "Node.js, Express.js, MongoDB, Mongoose, Multer, AWS, Backbone.js, OAuth",
  images: ["public/images/justokayreads/justokayreads.png", "public/images/justokayreads/register.png", "public/images/justokayreads/comment.png", "public/images/justokayreads/addbook.png", "public/images/justokayreads/sort.png"],
  link: "https://justokayreads.herokuapp.com/",
  github: "https://github.com/Holderness/O",
  githubIcon: "public/images/github-icon.png"
});

var waiterProject = new app.Project( {
  title: "W",
  subtitle: "Restaurant Management CRUD App",
  description: "The system allows users to keep track of orders, tables, and menu items. The design is minimal and tight for quick interaction on mobile devices.",
  technologies: "Sinatra, jQuery, PostgreSQL",
  images: ["public/images/waiter-project.png"],
  link: "http://192.241.243.100/",
  github: "https://github.com/Holderness/Waiter",
  githubIcon: "public/images/github-icon.png"
});

var hangmanglerProject = new app.Project({
  title: "Hangmangler Helper",
  subtitle: "Gaming App",
  description: "Play hangman or tic-tac-toe in this ASCII art themed gaming app.  It's got talking cows, moving clouds, and existentialism.",
  technologies: "Sinatra, jQuery, PostgreSQL, Bcrypt, AJAX",
  images: ["public/images/hangmangler/hangmangler-project.png", "public/images/hangmangler/quinoa.png", "public/images/hangmangler/udders.png","public/images/hangmangler/hangman.png", "public/images/hangmangler/cowturn.png"],
  link: "https://hangmanglerhelper.herokuapp.com/",
  github: "https://github.com/Holderness/Hangmangler-Helper",
  githubIcon: "public/images/github-icon.png"
});

var piqueProject = new app.Project({
  title: "Pique",
  subtitle: "Networking Platform",
  description: "A discovery platform for professionals looking for an effective way to network. Pique users can devise and sculpt a list of professional contacts finding others through professional and social interests, industry, and more.",
  technologies: "Ruby on Rails, jQuery, PostgreSQL, Bcrypt, AJAX, Paperclip",
  images: ["public/images/pique/discover_projects1.png", "public/images/pique/discover_projects2.png", "public/images/pique/pique_msg.jpg", "public/images/pique/pique_profile.jpg", "public/images/pique/create_project1.png", "public/images/pique/create_project3.png"],
  link: "javascript:void(0);",
  github: "https://github.com/piqueapp/pique2",
  githubIcon: "public/images/github-icon.png"
});

var chjatProject = new app.Project({
  title: "Chjat",
  subtitle: "Real-Time Chat Application",
  description: "Chat instantly through this lightweight app. Create and personalize a chatroom or talk directly to another user. Chjat uses Socket.io for lightning fast communication, AWS for image and gif storage, and MongoDB to save all your conversations.",
  technologies: "Node.js, Express.js, Socket.io, Mongodb, Backbone.js, AWS, Gulp.js, SCSS, OAuth",
  images: [
    "public/images/chjat/register.png",
    "public/images/chjat/chatroom.png",
    "public/images/chjat/chatroom-image.png",
    "public/images/chjat/image-upload.png",
    "public/images/chjat/invitation.png",
    "public/images/chjat/mobile-chatroom.png",
    "public/images/chjat/mobile-slide-screen.png",
    "public/images/chjat/mobile-modal.png",
  ],
  link: "http://www.chjat.com",
  github: "https://github.com/Holderness/Chjat",
  githubIcon: "public/images/github-icon.png"
});




$(function(){

  var blinkityPig = function blinkityPig(){
    setTimeout(function(){
      $('.fly-pig-closed-eyes').css('visibility', 'visible');
    }, 800);
    setTimeout(function(){
      $('.fly-pig-closed-eyes').css('visibility', 'hidden');
    }, 900);
    setTimeout(function(){
      $('.fly-pig-closed-eyes').css('visibility', 'visible');
    }, 1100);
    setTimeout(function(){
      $('.fly-pig-closed-eyes').css('visibility', 'hidden');
    }, 1200);
    setTimeout(function(){
      $('.fly-pig-closed-eyes').css('visibility', 'visible');
    }, 4100);
    setTimeout(function(){
      $('.fly-pig-closed-eyes').css('visibility', 'hidden');
    }, 4200);
    setTimeout(function(){
      $('.fly-pig-closed-eyes').css('visibility', 'visible');
    }, 7000);
    setTimeout(function(){
      $('.fly-pig-closed-eyes').css('visibility', 'hidden');
    }, 7100);
  };

  var blinkMyPig = function blinkMyPig() {
    $('.fly-pig-closed-eyes').each(function() {
      blinkityPig();
      setInterval(function() {
        blinkityPig();
      }, 10000);
    });
  };

  var boldNavEl = function boldNavEl() {
    $('#nav a').on("click", function() {
      $('#nav').find('.bold-nav').removeClass('bold-nav');
      $(this).addClass('bold-nav');
    });
  };


  


  blinkMyPig();
  boldNavEl();


  // resets animations on screen resize
  // $(window).resize().done(function(){ location.reload();});

// var resizeTimer;
// $(window).on('resize', function(e) {
//   clearTimeout(resizeTimer);
//   resizeTimer = setTimeout(function() {
//     location.reload()      
//   }, 250);
// });
// above code is the same as debouncing

// $(window).on('resize', _.debounce(function () {
//     location.reload();
// }, 500));




});
var app = app || {};

(function() {

  app.AppRouter = Backbone.Router.extend({
    routes: {
      "": "contact",
      "contact": "contact",
      "portfolio": "portfolio",
      "portfolio/:project": "project",
      "writing": "writing"
    },
    contact: function() {
      this.contactLinkListView = new app.LinkListView({collection: contactlinkList,
        className: "contact"});
      app.navLinkListView.goto(this.contactLinkListView);
      this.homeView = new app.HomeView({});
      this.boldNavEl('contact');
    },
    portfolio: function(pageRoute) {
      this.portfolioLinkListView = new app.LinkListView({collection: portfoliolinkList,
     className: "portfolio"});
      app.navLinkListView.goto(this.portfolioLinkListView);
      this.pigcaveProjectView = new app.ProjectView({model: pigcaveProject});
      this.boldNavEl('portfolio');
    },
    project: function(project){
      var projectList = {
        pique: piqueProject,
        pigcave: pigcaveProject,
        hangmangler: hangmanglerProject,
        justokayreads: justokayreadsProject,
        chjat: chjatProject
      };
      this.projectView = new app.ProjectView({model: projectList[project]});
      if (!app.navLinkListView.hasOwnProperty('currentView')) {
        this.portfolioLinkListView = new app.LinkListView({collection: portfoliolinkList,
         className: "portfolio"});
        app.navLinkListView.goto(this.portfolioLinkListView);
      }
      
    },
    writing: function() {
      this.writingView = new app.WritingView({});
      this.writingLinkListView = new app.LinkListView({collection: writinglinkList,
       className: "writing"});
      app.navLinkListView.goto(this.writingLinkListView);
      app.navLinkListView.setPubViewListener();
      this.boldNavEl('writing');
    },
    boldNavEl: function(nav) {
      $('#nav').find('.bold-nav').removeClass('bold-nav');
      $('#' + nav).addClass('bold-nav');
    }

  });

  app.router = new app.AppRouter();
  app.navLinkListView = new app.NavLinkListView();
  Backbone.history.start();

})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmsuanMiLCJwcm9qZWN0LmpzIiwibGlua2xpc3QuanMiLCJibHVyYi5qcyIsImhvbWUuanMiLCJuYXZsaW5rbGlzdC5qcyIsInB1Yi5qcyIsIndyaXRpbmcuanMiLCJ3cml0aW5nVGV4dFZpZXcuanMiLCJtYWluLmpzIiwicm91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUo5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBRWhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FHbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUozRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBS3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYXBwIHx8IHt9O1xuXG4oZnVuY3Rpb24oJCkge1xuXG4gIGFwcC5MaW5rSXRlbVZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgdGFnTmFtZTogJ2EnLFxuICAgIGNsYXNzTmFtZTogJ2xpbmsnLFxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKFwiPGltZyBpZD0nPCU9IGlkICU+JyBjbGFzcz0nbGluay1pbWFnZScgc3JjPSc8JT0gaW1hZ2UgJT4nID5cIiksXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5tb2RlbC50b0pTT04oKTtcbiAgICAgIHRoaXMuJGVsLmF0dHIoJ2hyZWYnLCB0aGlzLm1vZGVsLmdldCgndXJsJykpXG4gICAgICAuaHRtbCh0aGlzLnRlbXBsYXRlKGF0dHJpYnV0ZXMpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbn0pKGpRdWVyeSk7IiwidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKCQpIHtcblxuICBhcHAuUHJvamVjdFZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgZWw6IFwiI3RvcC1jb250YWluZXJcIixcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgkKCdzY3JpcHRbbmFtZT1wcm9qZWN0c10nKS5odG1sKCkpLFxuICAgIGltYWdlVGVtcGxhdGU6IF8udGVtcGxhdGUoXCI8aW1nIHNyYz08JT0gaW1hZ2UgJT4+XCIpLFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXR0cmlidXRlcyA9IHRoaXMubW9kZWwudG9KU09OKCk7XG4gICAgICB2YXIgdGhpc18gPSB0aGlzO1xuXG4gICAgICB2YXIgaW1hZ2VzID0gYXR0cmlidXRlcy5pbWFnZXM7XG5cbiAgICAgIC8vIGZ1bmN0aW9uIGZhZGUoKSB7XG4gICAgICAvLyAgICQoXCIub3dsLWNhcm91c2VsXCIpLmhpZGUoKS5mYWRlSW4oMzAwKTtcbiAgICAgIC8vIH1cblxuICAgICAgJCgnLmxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQoJyN0b3AtY29udGFpbmVyJykuaXMoJzphbmltYXRlZCcpKSB7XG4gICAgICAgICAgICQoJyN0b3AtY29udGFpbmVyJykuc3RvcCh0cnVlLCB0cnVlKTtcbiAgICAgICAgIH1cbiAgICAgICB9KTtcbiAgICAgIFxuICAgICAgdGhpcy4kZWwuZW1wdHkoKS5oaWRlKCkuaHRtbCh0aGlzLnRlbXBsYXRlKGF0dHJpYnV0ZXMpKS5mYWRlSW4oNzAwKTtcblxuXG4gICAgICAgICQoXCIucHJvamVjdC1pbWFnZVwiKS5vd2xDYXJvdXNlbCh7XG4gICAgICAgICAgbWFyZ2luOjMwLFxuICAgICAgICAgIGxvb3A6dHJ1ZSxcbiAgICAgICAgICBhdXRvV2lkdGg6dHJ1ZSxcbiAgICAgICAgICBuYXY6IHRydWUsXG4gICAgICAgICAgbGF6eUxvYWQ6IHRydWUsXG4gICAgICAgICAgY2VudGVyOiB0cnVlLFxuICAgICAgICAgIG9uSW5pdGlhbGl6ZTogdGhpc18uY3JlYXRlSW1hZ2VzKGltYWdlcyksXG4gICAgICAgIH0pO1xuXG5cblxuXG4gICAgICAvLyB0aGlzLmdyb3dQcm9qZWN0TmV4dEltYWdlT25Ib3ZlcihcIjEwMHB4XCIsIC0yMCwgLTIwKTtcbiAgICB9LFxuICAgIC8vIGdyb3dQcm9qZWN0TmV4dEltYWdlT25Ib3ZlcjogZnVuY3Rpb24oZ3Jvd1dpZHRoLCBtYXJnaW5Ub3AsIG1hcmdpbkxlZnQpIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwiZ3Jvd1Byb2plY3ROZXh0SW1hZ2VPbkhvdmVyIGxvYWRlZFwiKTtcbiAgICAvLyAgIHZhciBvcmlnaW5hbFdpZHRoID0gJCgnLnByb2plY3QtbmV4dC1idXR0b24taW1nJykud2lkdGgoKTtcbiAgICAvLyAgICQoJy5wcm9qZWN0LW5leHQtYnV0dG9uLWltZycpLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAkKHRoaXMpLnN0b3AodHJ1ZSwgdHJ1ZSkuYW5pbWF0ZSh7XG4gICAgLy8gICAgICAgd2lkdGg6IGdyb3dXaWR0aCxcbiAgICAvLyAgICAgICBtYXJnaW5Ub3A6IG1hcmdpblRvcCxcbiAgICAvLyAgICAgICBtYXJnaW5MZWZ0OiBtYXJnaW5MZWZ0XG4gICAgLy8gICAgIH0sMjAwKTtcbiAgICAvLyAgIH0sXG4gICAgLy8gICBmdW5jdGlvbigpe1xuICAgIC8vICAgICAkKHRoaXMpLnN0b3AodHJ1ZSwgdHJ1ZSkuYW5pbWF0ZSh7XG4gICAgLy8gICAgICAgd2lkdGg6IG9yaWdpbmFsV2lkdGgsXG4gICAgLy8gICAgICAgbWFyZ2luVG9wOiAwLFxuICAgIC8vICAgICAgIG1hcmdpbkxlZnQ6IDBcbiAgICAvLyAgICAgfSw2MDApO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfSxcblxuICAgIGNyZWF0ZUltYWdlczogZnVuY3Rpb24oaW1hZ2VzKSB7XG4gICAgICAkKFwiLm93bC1jYXJvdXNlbFwiKS5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICAgJC5lYWNoKGltYWdlcywgZnVuY3Rpb24oaSwgaW1hZ2UpIHtcbiAgICAgICAgJChcIi5vd2wtY2Fyb3VzZWxcIikuYXBwZW5kKHRoaXMuaW1hZ2VUZW1wbGF0ZSh7aW1hZ2U6IGltYWdlfSkpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgfSk7XG5cbn0pKGpRdWVyeSk7IiwidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKCQpIHtcblxuICBhcHAuTGlua0xpc3RWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIGlkOiAnbGluay1saXN0LXZpZXcnLFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwicmVuZGVyOlwiKTtcbiAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICBfLmVhY2godGhpcy5jb2xsZWN0aW9uLm1vZGVscywgZnVuY3Rpb24obGluaykge1xuICAgICAgICB2YXIgbGlua0l0ZW1WaWV3ID0gbmV3IGFwcC5MaW5rSXRlbVZpZXcoe21vZGVsOiBsaW5rfSk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsaW5rSXRlbVZpZXcucmVuZGVyKCkuZWwpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLiRlbC5odG1sKGNvbnRhaW5lcik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIC8vIHRyYW5zZmVyIHRoaXMgdG8gY3NzXG4gICAgYWZ0ZXJSZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coJ2FmdGVyIHJlbmRlcjonKTtcbiAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDY1MCkge1xuICAgICAgICB0aGlzLmdyb3dMaW5rT25Ib3ZlcihcIjc1cHhcIiwgLTM1LCAtMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ncm93TGlua09uSG92ZXIoXCIxMzBweFwiLCAtNTAsIC0yMCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvd2xQcm9qZWN0TmF2OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsLnNsaWNrKHtcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBncm93TGlua09uSG92ZXI6IGZ1bmN0aW9uKGdyb3dXaWR0aCwgbWFyZ2luVG9wLCBtYXJnaW5MZWZ0KSB7XG4gICAgICBjb25zb2xlLmxvZyhcImdyb3dMaW5rT25Ib3ZlciBsb2FkZWRcIik7XG4gICAgICB2YXIgb3JpZ2luYWxXaWR0aCA9ICQoJy5saW5rLWltYWdlJykud2lkdGgoKTtcbiAgICAgICQoJy5saW5rLWltYWdlJykuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuc3RvcCh0cnVlLCBmYWxzZSkuYW5pbWF0ZSh7XG4gICAgICAgICAgd2lkdGg6IGdyb3dXaWR0aCxcbiAgICAgICAgICBtYXJnaW5Ub3A6IG1hcmdpblRvcCxcbiAgICAgICAgICBtYXJnaW5MZWZ0OiBtYXJnaW5MZWZ0XG4gICAgICAgIH0sMjAwKTtcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnN0b3AodHJ1ZSwgZmFsc2UpLmFuaW1hdGUoe1xuICAgICAgICAgIHdpZHRoOiBvcmlnaW5hbFdpZHRoLFxuICAgICAgICAgIG1hcmdpblRvcDogMCxcbiAgICAgICAgICBtYXJnaW5MZWZ0OiAwXG4gICAgICAgIH0sNjAwKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbGlua0Nhcm91c2VsOiBmdW5jdGlvbihkdXJhdGlvbiwgc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24sIHNsaWRlSW4pIHtcbiAgICAgIHZhciBlbGxlZnQgPSAkKCcjbGluay1saXN0LXZpZXcnKS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgdmFyIG9wYWNpdHlTdGFydCA9IChzbGlkZUluID09PSBmYWxzZSkgPyAxIDogMDtcbiAgICAgIHZhciBvcGFjaXR5RW5kID0gKHNsaWRlSW4gPT09IHRydWUpID8gMSA6IDA7XG4gICAgICAkKCcjbGluay1saXN0LXZpZXcnKS5jc3Moe1xuICAgICAgICBsZWZ0OiBlbGxlZnQgKz0gc3RhcnRQb3NpdGlvbixcbiAgICAgICAgb3BhY2l0eTogb3BhY2l0eVN0YXJ0XG4gICAgICB9KS5hbmltYXRlKHtcbiAgICAgICAgbGVmdDogJy09JyArIGVuZFBvc2l0aW9uICsgJ3B4JyxcbiAgICAgICAgb3BhY2l0eTogb3BhY2l0eUVuZFxuICAgICAgfSwgZHVyYXRpb24pO1xuICAgIH1cblxuICB9KTtcblxufSkoalF1ZXJ5KTsiLCJ2YXIgYXBwID0gYXBwIHx8IHt9O1xuXG4oZnVuY3Rpb24oJCkge1xuXG4gIGFwcC5CbHVyYlZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgZWw6IFwiLndyaXRpbmctdGV4dC1jb250YWluZXJcIixcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgkKCdzY3JpcHRbbmFtZT1ibHVyYnNdJykuaHRtbCgpKSxcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpe1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbC5lbXB0eSgpO1xuICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKCkpLmhpZGUoKS5mYWRlSW4oMjAwKTtcbiAgICB9XG4gIH0pO1xuXG59KShqUXVlcnkpOyIsInZhciBhcHAgPSBhcHAgfHwge307XG5cbihmdW5jdGlvbigkKSB7XG5cbiAgYXBwLkhvbWVWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIGVsOiBcIiN0b3AtY29udGFpbmVyXCIsXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoJCgnc2NyaXB0W25hbWU9aG9tZV0nKS5odG1sKCkpLFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUpLmhpZGUoKS5mYWRlSW4oNzAwKTtcbiAgICAgIHRoaXMucGlnVG9uZ3VlQmxlcCgtMTgsIC03KTtcbiAgICB9LFxuICAgIHBpZ1Rvbmd1ZUJsZXA6IGZ1bmN0aW9uKG1hcmdpblRvcCwgbWFyZ2luTGVmdCkge1xuICAgICAgJCgnLnBpZy1pbWFnZS1jb250YWluZXInKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmZseS1waWctdG9uZ3VlJykuc3RvcCh0cnVlLCBmYWxzZSkuYW5pbWF0ZSh7XG4gICAgICAgICAgbWFyZ2luVG9wOiAwLFxuICAgICAgICAgIG1hcmdpbkxlZnQ6IDBcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5mbHktcGlnLXRvbmd1ZScpLnN0b3AodHJ1ZSwgZmFsc2UpLmFuaW1hdGUoe1xuICAgICAgICAgIG1hcmdpblRvcDogbWFyZ2luVG9wLFxuICAgICAgICAgIG1hcmdpbkxlZnQ6IG1hcmdpbkxlZnRcbiAgICAgICAgfSwgMjAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbn0pKGpRdWVyeSk7IiwidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKCQpIHtcblxuICBhcHAuTmF2TGlua0xpc3RWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIGVsOiBcIiNmb290ZXJcIixcbiAgICBnb3RvOiBmdW5jdGlvbih2aWV3KSB7XG5cbiAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMuY3VycmVudFZpZXcgfHwgbnVsbDtcbiAgICAgIHZhciBuZXh0ID0gdmlldztcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICBuZXh0LnJlbmRlcigpO1xuICAgICAgXG4gICAgICBpZiAocHJldmlvdXMgPT09IG51bGwpIHtcbiAgICAgICAgX3RoaXMuJGVsLmh0bWwobmV4dC4kZWwpO1xuICAgICAgICBuZXh0LmxpbmtDYXJvdXNlbCg2MDAsIDI1MCwgMjUwLCB0cnVlKTtcbiAgICAgICAgbmV4dC5hZnRlclJlbmRlcigpO1xuICAgICAgfSBlbHNlIGlmIChuZXh0LmNsYXNzTmFtZSA9PT0gXCJwb3J0Zm9saW9cIiAmJiBwcmV2aW91cy5jbGFzc05hbWUgPT09IFwiY29udGFjdFwiKSB7XG4gICAgICAgIHByZXZpb3VzLmxpbmtDYXJvdXNlbCg1MDAsIDAsIDI1MCwgZmFsc2UpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgX3RoaXMuJGVsLmh0bWwobmV4dC4kZWwpO1xuICAgICAgICAgIG5leHQubGlua0Nhcm91c2VsKDYwMCwgMjUwLCAyNTAsIHRydWUpO1xuICAgICAgICAgIG5leHQuYWZ0ZXJSZW5kZXIoKTtcbiAgICAgICAgICBuZXh0Lm93bFByb2plY3ROYXYoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dC5jbGFzc05hbWUgPT09IFwicG9ydGZvbGlvXCIgJiYgcHJldmlvdXMuY2xhc3NOYW1lID09PSBcIndyaXRpbmdcIikge1xuICAgICAgICBwcmV2aW91cy5saW5rQ2Fyb3VzZWwoNTAwLCAwLCAtMjUwLCBmYWxzZSk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBfdGhpcy4kZWwuaHRtbChuZXh0LiRlbCk7XG4gICAgICAgICAgbmV4dC5saW5rQ2Fyb3VzZWwoNjAwLCAtMjUwLCAtMjUwLCB0cnVlKTtcbiAgICAgICAgICBuZXh0LmFmdGVyUmVuZGVyKCk7XG4gICAgICAgICAgbmV4dC5vd2xQcm9qZWN0TmF2KCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9IGVsc2UgaWYgKG5leHQuY2xhc3NOYW1lID09PSBcImNvbnRhY3RcIiAmJiBwcmV2aW91cy5jbGFzc05hbWUgPT09IFwicG9ydGZvbGlvXCIpIHtcbiAgICAgICAgcHJldmlvdXMubGlua0Nhcm91c2VsKDUwMCwgMCwgLTI1MCwgZmFsc2UpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgX3RoaXMuJGVsLmh0bWwobmV4dC4kZWwpO1xuICAgICAgICAgIG5leHQubGlua0Nhcm91c2VsKDYwMCwgLTI1MCwgLTI1MCwgdHJ1ZSk7XG4gICAgICAgICAgbmV4dC5hZnRlclJlbmRlcigpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfSBlbHNlIGlmIChuZXh0LmNsYXNzTmFtZSA9PT0gXCJ3cml0aW5nXCIpIHtcbiAgICAgICAgcHJldmlvdXMubGlua0Nhcm91c2VsKDUwMCwgMCwgMjUwLCBmYWxzZSk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBfdGhpcy4kZWwuaHRtbChuZXh0LiRlbCk7XG4gICAgICAgICAgbmV4dC5saW5rQ2Fyb3VzZWwoNjAwLCAyNTAsIDI1MCwgdHJ1ZSk7XG4gICAgICAgICAgbmV4dC5hZnRlclJlbmRlcigpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgICB0aGlzLnNldFB1YlZpZXdMaXN0ZW5lcigpO1xuICAgICAgfSBlbHNlIGlmIChwcmV2aW91cy5jbGFzc05hbWUgPT09IFwid3JpdGluZ1wiKSB7XG4gICAgICAgIHByZXZpb3VzLmxpbmtDYXJvdXNlbCg1MDAsIDAsIC0yNTAsIGZhbHNlKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIF90aGlzLiRlbC5odG1sKG5leHQuJGVsKTtcbiAgICAgICAgICBuZXh0LmxpbmtDYXJvdXNlbCg2MDAsIC0yNTAsIC0yNTAsIHRydWUpO1xuICAgICAgICAgIG5leHQuYWZ0ZXJSZW5kZXIoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50VmlldyA9IG5leHQ7XG4gICAgfSxcblxuICAgIHNldFB1YlZpZXdMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbC5vZmYoJ2NsaWNrJywgJyNtZXJtYWlkcy1wdXJzZScpO1xuICAgICAgdmFyIHRoaXNfID0gdGhpcztcbiAgICAgIHRoaXMuJGVsLm9uKCdjbGljaycsICcjbWVybWFpZHMtcHVyc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpc18ucHViVmlld1RvZ2dsZSgpO1xuICAgICAgfSk7XG4gICAgICBhcHAuYmx1cmJWaWV3ID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgcHViVmlld1RvZ2dsZTogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhcHAucHViVmlldyA9IGFwcC5wdWJWaWV3ID09PSAnYmx1cmJzJyA/ICdibHVyYnMnIDogJ3B1YnMnO1xuICAgICAgLy8gaWYgKGFwcC5wdWJWaWV3ID09PSAnYmx1cmJzJykge1xuICAgICAgLy8gICBkZWJ1Z2dlcjtcbiAgICAgIC8vICAgbmV3IGFwcC5Xcml0aW5nVGV4dFZpZXcoeyd2aWV3JzogJ3B1YnMnfSk7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICBkZWJ1Z2dlcjtcbiAgICAgIC8vICAgbmV3IGFwcC5Xcml0aW5nVGV4dFZpZXcoeyd2aWV3JzogJ2JsdXJicyd9KTtcbiAgICAgIC8vIH1cbiAgICAgIGFwcC5ibHVyYlZpZXcgPSBhcHAuYmx1cmJWaWV3ID09PSBmYWxzZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIGlmIChhcHAuYmx1cmJWaWV3KSB7XG4gICAgICAgIGFwcC53cml0aW5nVGV4dCA9IG5ldyBhcHAuQmx1cmJWaWV3KCk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwcC53cml0aW5nVGV4dCA9IG5ldyBhcHAuUHViVmlldygpO1xuXG4gICAgICB9XG4gICAgfVxuXG5cbiAgfSk7XG5cbn0pKGpRdWVyeSk7IiwidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKCQpIHtcblxuICBhcHAuUHViVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICBlbDogXCIud3JpdGluZy10ZXh0LWNvbnRhaW5lclwiLFxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKCQoJ3NjcmlwdFtuYW1lPXB1YnNdJykuaHRtbCgpKSxcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpe1xuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgdmFyICRzY3JvbGxlciA9ICQoXCIucHVibGljYXRpb24tbGlzdFwiKTtcbiAgICAgICAgJHNjcm9sbGVyLmJpbmQoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIHNjcm9sbGVyID0gJHNjcm9sbGVyLmdldCgwKTtcblxuICAgICAgICBpZiAoJHRoaXMuc2Nyb2xsVG9wKCkgPT09IDApICR0aGlzLnNjcm9sbFRvcCgxKTtcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHNjcm9sbGVyLnNjcm9sbFRvcDtcbiAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHNjcm9sbGVyLnNjcm9sbEhlaWdodDtcbiAgICAgICAgdmFyIG9mZnNldEhlaWdodCA9IHNjcm9sbGVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgdmFyIGNvbnRlbnRIZWlnaHQgPSBzY3JvbGxIZWlnaHQgLSBvZmZzZXRIZWlnaHQ7XG4gICAgICAgIGlmIChjb250ZW50SGVpZ2h0ID09IHNjcm9sbFRvcCkgJHRoaXMuc2Nyb2xsVG9wKHNjcm9sbFRvcC0xKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCcucHVibGljYXRpb24tbGlzdCcpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuYmFyJykuY3NzKFwib3BhY2l0eVwiLCAxIC0gJCgnLnB1YmxpY2F0aW9uLWxpc3QnKS5zY3JvbGxUb3AoKSAvIDE4NSk7XG4gICAgICB9KTtcbiAgICAgIFxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsLmVtcHR5KCk7XG4gICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSkuaGlkZSgpLmZhZGVJbigyMDApO1xuICAgIH1cbiAgfSk7XG5cbn0pKGpRdWVyeSk7IiwidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKCQpIHtcblxuICBhcHAuV3JpdGluZ1ZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgZWw6IFwiI3RvcC1jb250YWluZXJcIixcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgkKCdzY3JpcHRbbmFtZT13cml0aW5nXScpLmh0bWwoKSksXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWwuZW1wdHkoKTtcbiAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKS5oaWRlKCkuZmFkZUluKDIwMCk7XG4gICAgICBhcHAud3JpdGluZ1RleHQgPSBuZXcgYXBwLkJsdXJiVmlldygpO1xuICAgIH0sXG5cbiAgfSk7XG5cbn0pKGpRdWVyeSk7XG5cblxuLy8gdmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuLy8gKGZ1bmN0aW9uKCQpIHtcblxuLy8gICBhcHAuV3JpdGluZ1ZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4vLyAgICAgZWw6IFwiI3RvcC1jb250YWluZXJcIixcbi8vICAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgkKCdzY3JpcHRbbmFtZT13cml0aW5nXScpLmh0bWwoKSksXG4vLyAgICAgYmx1cmJUZW1wbGF0ZTogXy50ZW1wbGF0ZSgkKCdzY3JpcHRbbmFtZT1ibHVyYnNdJykuaHRtbCgpKSxcbi8vICAgICBwdWJUZW1wbGF0ZTogXy50ZW1wbGF0ZSgkKCdzY3JpcHRbbmFtZT1wdWJzXScpLmh0bWwoKSksXG4vLyAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKXtcbi8vICAgICAgIHRoaXMucmVuZGVyKCk7XG4vLyAgICAgfSxcbi8vICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgdGhpcy4kZWwuZW1wdHkoKTtcbi8vICAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKS5oaWRlKCkuZmFkZUluKDcwMCk7XG4vLyAgICAgICBhcHAud3JpdGluZ1RleHQgPSBuZXcgYXBwLldyaXRpbmdUZXh0VmlldygnYmx1cmJzJyk7XG4vLyAgICAgfSxcblxuLy8gICB9KTtcblxuLy8gfSkoalF1ZXJ5KTsiLCIvLyB2YXIgYXBwID0gYXBwIHx8IHt9O1xuXG4vLyAoZnVuY3Rpb24oJCkge1xuXG4vLyAgIGFwcC5Xcml0aW5nVGV4dFZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4vLyAgICAgZWw6IFwiLndyaXRpbmctdGV4dC1jb250YWluZXJcIixcbi8vICAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKXtcbi8vICAgICAgIGRlYnVnZ2VyO1xuLy8gICAgICAgYXBwLnZpZXd3ID0gb3B0aW9ucztcbi8vICAgICAgIHRoaXMucmVuZGVyKGFwcC52aWV3dyk7XG4vLyAgICAgfSxcbi8vICAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgkKCdzY3JpcHRbbmFtZT0nICsgb3B0aW9ucyArICddJykuaHRtbCgpKSxcbi8vICAgICByZW5kZXI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbi8vICAgICAgIGRlYnVnZ2VyO1xuLy8gICAgICAgdGhpcy4kZWwuZW1wdHkoKTtcbi8vICAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZShvcHRpb25zKSkuaGlkZSgpLmZhZGVJbigyMDApO1xuLy8gICAgIH1cbi8vICAgfSk7XG5cbi8vIH0pKGpRdWVyeSk7IiwidmFyIGdpdGh1YkxpbmsgPSBuZXcgYXBwLkxpbmtJdGVtKCB7XG4gIHVybDogXCJodHRwczovL2dpdGh1Yi5jb20vSG9sZGVybmVzc1wiLFxuICBpbWFnZTogXCJwdWJsaWMvaW1hZ2VzL2dpdGh1Yi1pY29uLnBuZ1wiXG59KTtcblxudmFyIGxpbmtlZGluTGluayA9IG5ldyBhcHAuTGlua0l0ZW0oIHtcbiAgdXJsOiBcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9hbmRlcnNvbmhvbGRlcm5lc3NcIixcbiAgaW1hZ2U6IFwicHVibGljL2ltYWdlcy9saW5rZWQtaW4taWNvbi5wbmdcIlxufSk7XG5cbnZhciBtYWlsdG9MaW5rID0gbmV3IGFwcC5MaW5rSXRlbSgge1xuICB1cmw6IFwibWFpbHRvOmFuZGVyc29uaG9sZGVybmVzc0BnbWFpbC5jb21cIixcbiAgaW1hZ2U6IFwicHVibGljL2ltYWdlcy9tYWlsLWljb24ucG5nXCJcbn0pO1xuXG52YXIgcGlnY2F2ZUxpbmsgPSBuZXcgYXBwLkxpbmtJdGVtKCB7XG4gIHVybDogXCIjcG9ydGZvbGlvL3BpZ2NhdmVcIixcbiAgaW1hZ2U6IFwicHVibGljL2ltYWdlcy9mbHktcGlnLWljb24ucG5nXCJcbn0pO1xuXG52YXIganVzdG9rYXlyZWFkc0xpbmsgPSBuZXcgYXBwLkxpbmtJdGVtKCB7XG4gIHVybDogXCIjcG9ydGZvbGlvL2p1c3Rva2F5cmVhZHNcIixcbiAgaW1hZ2U6IFwicHVibGljL2ltYWdlcy9ib29rLWljb24ucG5nXCJcbn0pO1xuXG4vLyB2YXIgd2FpdGVyTGluayA9IG5ldyBhcHAuTGlua0l0ZW0oIHtcbi8vICAgdXJsOiBcIiNwb3J0Zm9saW8vd2FpdGVyXCIsXG4vLyAgIGltYWdlOiBcInB1YmxpYy9pbWFnZXMvd2FpdGVyLWljb24ucG5nXCJcbi8vIH0pO1xuXG52YXIgaGFuZ21hbmdsZXJMaW5rID0gbmV3IGFwcC5MaW5rSXRlbSgge1xuICB1cmw6IFwiI3BvcnRmb2xpby9oYW5nbWFuZ2xlclwiLFxuICBpbWFnZTogXCJwdWJsaWMvaW1hZ2VzL2hhbmdtYW5nbGVyLWljb24ucG5nXCJcbn0pO1xuXG52YXIgcGlxdWVMaW5rID0gbmV3IGFwcC5MaW5rSXRlbSgge1xuICB1cmw6IFwiI3BvcnRmb2xpby9waXF1ZVwiLFxuICBpbWFnZTogXCJwdWJsaWMvaW1hZ2VzL3BpcXVlLWljb24ucG5nXCJcbn0pO1xuXG4vLyB2YXIgcGlnY2F2ZUxpbmsgPSBuZXcgYXBwLkxpbmtJdGVtKCB7XG4vLyAgIHVybDogXCJodHRwOi8vcGlnY2F2ZS5jb21cIixcbi8vICAgaW1hZ2U6IFwicHVibGljL2ltYWdlcy9waWctY2F2ZS5wbmdcIlxuLy8gfSk7XG5cbi8vIHZhciB3YWl0ZXJMaW5rID0gbmV3IGFwcC5MaW5rSXRlbSgge1xuLy8gICB1cmw6IFwiaHR0cDovLzE5Mi4yNDEuMjQzLjEwMC9cIixcbi8vICAgaW1hZ2U6IFwicHVibGljL2ltYWdlcy93YWl0ZXItaWNvbi5wbmdcIlxuLy8gfSk7XG5cbi8vIHZhciBoYW5nbWFuZ2xlckxpbmsgPSBuZXcgYXBwLkxpbmtJdGVtKCB7XG4vLyAgIHVybDogXCJodHRwczovL2hhbmdtYW5nbGVyaGVscGVyLmhlcm9rdWFwcC5jb20vXCIsXG4vLyAgIGltYWdlOiBcInB1YmxpYy9pbWFnZXMvaGFuZ21hbmdsZXItaWNvbi5wbmdcIlxuLy8gfSk7XG5cbnZhciBjaGphdExpbmsgPSBuZXcgYXBwLkxpbmtJdGVtKCB7XG4gIHVybDogXCIjcG9ydGZvbGlvL2NoamF0XCIsXG4gIGltYWdlOiBcInB1YmxpYy9pbWFnZXMvY2hqYXQtaWNvbi5wbmdcIlxufSk7XG5cbnZhciBwdWJsaWNhdGlvbkxpbmsgPSBuZXcgYXBwLkxpbmtJdGVtKCB7XG4gIHVybDogXCIjd3JpdGluZ1wiLFxuICBpbWFnZTogXCJwdWJsaWMvaW1hZ2VzL21lcm1haWRzLXB1cnNlLnBuZ1wiLFxuICBpZDogXCJtZXJtYWlkcy1wdXJzZVwiXG59KTtcblxudmFyIGNvbnRhY3RsaW5rTGlzdCA9IG5ldyBhcHAuTGlua0xpc3QoWyBnaXRodWJMaW5rLCBsaW5rZWRpbkxpbmssIG1haWx0b0xpbmsgXSk7XG52YXIgcG9ydGZvbGlvbGlua0xpc3QgPSBuZXcgYXBwLkxpbmtMaXN0KFsgcGlnY2F2ZUxpbmssIGhhbmdtYW5nbGVyTGluaywganVzdG9rYXlyZWFkc0xpbmssIHBpcXVlTGluaywgY2hqYXRMaW5rIF0pO1xudmFyIHdyaXRpbmdsaW5rTGlzdCA9IG5ldyBhcHAuTGlua0xpc3QoWyBwdWJsaWNhdGlvbkxpbmsgXSk7XG5cblxudmFyIHBpZ2NhdmVQcm9qZWN0ID0gbmV3IGFwcC5Qcm9qZWN0KCB7XG4gIHRpdGxlOiBcIlBpZyBDYXZlXCIsXG4gIHN1YnRpdGxlOiBcIlN0b3J5LWNyZWF0aW9uIEFwcFwiLFxuICBkZXNjcmlwdGlvbjogXCJUaGlzIGFwcCdzIGZvdW5kYXRpb24gaXMgYSB3b3JkLXNvcnRpbmcgYWxnb3JpdGhtIHRoYXQgcGFpcnMgc2ltaWxhciB0ZXh0cyB0b2dldGhlci4gVGhlIGRhdGEgY29tZXMgZnJvbSB0d28gd2Vic2l0ZXMgSSBzY3JhcGVkIGFuZCBpcyBob3VzZWQgaW4gYW4gQVBJIGJ1aWx0IG9uIFJhaWxzLiBUaGUgb3JpZ2luYWwgaW1hZ2VzIHdlcmUgZHJhd24gaW4gUGhvdG9zaG9wIGFuZCBhbmltYXRlZCB3aXRoIFNrcm9sbHIuanMuXCIsXG4gIHRlY2hub2xvZ2llczogXCJCYWNrYm9uZS5qcywgU2tyb2xsci5qcywgalF1ZXJ5LCBSdWJ5IG9uIFJhaWxzLCBKU09OLCBQaG90b3Nob3BcIixcbiAgaW1hZ2VzOiBbXCJwdWJsaWMvaW1hZ2VzL3BpZ2NhdmUvcGlnLWNhdmUtcHJvamVjdC5wbmdcIiwgXCJwdWJsaWMvaW1hZ2VzL3BpZ2NhdmUvb3dsLnBuZ1wiLCBcInB1YmxpYy9pbWFnZXMvcGlnY2F2ZS9sYXNlci5wbmdcIl0sXG4gIGxpbms6IFwiaHR0cDovL3BpZ2NhdmUuY29tXCIsXG4gIGdpdGh1YjogXCJodHRwczovL2dpdGh1Yi5jb20vSG9sZGVybmVzcy9QaWdfQ2F2ZV9KU19DbGllbnRcIixcbiAgZ2l0aHViSWNvbjogXCJwdWJsaWMvaW1hZ2VzL2dpdGh1Yi1pY29uLnBuZ1wiXG59KTtcblxudmFyIGp1c3Rva2F5cmVhZHNQcm9qZWN0ID0gbmV3IGFwcC5Qcm9qZWN0KCB7XG4gIHRpdGxlOiBcIkp1c3Rva2F5cmVhZHNcIixcbiAgc3VidGl0bGU6IFwiUGVyc29uYWwgTGlicmFyeSBBcHBcIixcbiAgZGVzY3JpcHRpb246IFwiVGhpcyBzaW5nbGUtcGFnZSBhcHAgb2ZmZXJzIHRoZSBhYmlsaXR5IHRvIGJ1aWxkIHlvdXIgb3duIGRpZ2l0YWwgbGlicmFyeS4gUmF0ZSwgY29tbWVudCwgc2VhcmNoLCB1cGxvYWQgYm9vayBjb3ZlcnM6IGtlZXAgdHJhY2sgb2YgdGhlIGJvb2tzIHlvdSByZWFkLlwiLFxuICB0ZWNobm9sb2dpZXM6IFwiTm9kZS5qcywgRXhwcmVzcy5qcywgTW9uZ29EQiwgTW9uZ29vc2UsIE11bHRlciwgQVdTLCBCYWNrYm9uZS5qcywgT0F1dGhcIixcbiAgaW1hZ2VzOiBbXCJwdWJsaWMvaW1hZ2VzL2p1c3Rva2F5cmVhZHMvanVzdG9rYXlyZWFkcy5wbmdcIiwgXCJwdWJsaWMvaW1hZ2VzL2p1c3Rva2F5cmVhZHMvcmVnaXN0ZXIucG5nXCIsIFwicHVibGljL2ltYWdlcy9qdXN0b2theXJlYWRzL2NvbW1lbnQucG5nXCIsIFwicHVibGljL2ltYWdlcy9qdXN0b2theXJlYWRzL2FkZGJvb2sucG5nXCIsIFwicHVibGljL2ltYWdlcy9qdXN0b2theXJlYWRzL3NvcnQucG5nXCJdLFxuICBsaW5rOiBcImh0dHBzOi8vanVzdG9rYXlyZWFkcy5oZXJva3VhcHAuY29tL1wiLFxuICBnaXRodWI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0hvbGRlcm5lc3MvT1wiLFxuICBnaXRodWJJY29uOiBcInB1YmxpYy9pbWFnZXMvZ2l0aHViLWljb24ucG5nXCJcbn0pO1xuXG52YXIgd2FpdGVyUHJvamVjdCA9IG5ldyBhcHAuUHJvamVjdCgge1xuICB0aXRsZTogXCJXXCIsXG4gIHN1YnRpdGxlOiBcIlJlc3RhdXJhbnQgTWFuYWdlbWVudCBDUlVEIEFwcFwiLFxuICBkZXNjcmlwdGlvbjogXCJUaGUgc3lzdGVtIGFsbG93cyB1c2VycyB0byBrZWVwIHRyYWNrIG9mIG9yZGVycywgdGFibGVzLCBhbmQgbWVudSBpdGVtcy4gVGhlIGRlc2lnbiBpcyBtaW5pbWFsIGFuZCB0aWdodCBmb3IgcXVpY2sgaW50ZXJhY3Rpb24gb24gbW9iaWxlIGRldmljZXMuXCIsXG4gIHRlY2hub2xvZ2llczogXCJTaW5hdHJhLCBqUXVlcnksIFBvc3RncmVTUUxcIixcbiAgaW1hZ2VzOiBbXCJwdWJsaWMvaW1hZ2VzL3dhaXRlci1wcm9qZWN0LnBuZ1wiXSxcbiAgbGluazogXCJodHRwOi8vMTkyLjI0MS4yNDMuMTAwL1wiLFxuICBnaXRodWI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0hvbGRlcm5lc3MvV2FpdGVyXCIsXG4gIGdpdGh1Ykljb246IFwicHVibGljL2ltYWdlcy9naXRodWItaWNvbi5wbmdcIlxufSk7XG5cbnZhciBoYW5nbWFuZ2xlclByb2plY3QgPSBuZXcgYXBwLlByb2plY3Qoe1xuICB0aXRsZTogXCJIYW5nbWFuZ2xlciBIZWxwZXJcIixcbiAgc3VidGl0bGU6IFwiR2FtaW5nIEFwcFwiLFxuICBkZXNjcmlwdGlvbjogXCJQbGF5IGhhbmdtYW4gb3IgdGljLXRhYy10b2UgaW4gdGhpcyBBU0NJSSBhcnQgdGhlbWVkIGdhbWluZyBhcHAuICBJdCdzIGdvdCB0YWxraW5nIGNvd3MsIG1vdmluZyBjbG91ZHMsIGFuZCBleGlzdGVudGlhbGlzbS5cIixcbiAgdGVjaG5vbG9naWVzOiBcIlNpbmF0cmEsIGpRdWVyeSwgUG9zdGdyZVNRTCwgQmNyeXB0LCBBSkFYXCIsXG4gIGltYWdlczogW1wicHVibGljL2ltYWdlcy9oYW5nbWFuZ2xlci9oYW5nbWFuZ2xlci1wcm9qZWN0LnBuZ1wiLCBcInB1YmxpYy9pbWFnZXMvaGFuZ21hbmdsZXIvcXVpbm9hLnBuZ1wiLCBcInB1YmxpYy9pbWFnZXMvaGFuZ21hbmdsZXIvdWRkZXJzLnBuZ1wiLFwicHVibGljL2ltYWdlcy9oYW5nbWFuZ2xlci9oYW5nbWFuLnBuZ1wiLCBcInB1YmxpYy9pbWFnZXMvaGFuZ21hbmdsZXIvY293dHVybi5wbmdcIl0sXG4gIGxpbms6IFwiaHR0cHM6Ly9oYW5nbWFuZ2xlcmhlbHBlci5oZXJva3VhcHAuY29tL1wiLFxuICBnaXRodWI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0hvbGRlcm5lc3MvSGFuZ21hbmdsZXItSGVscGVyXCIsXG4gIGdpdGh1Ykljb246IFwicHVibGljL2ltYWdlcy9naXRodWItaWNvbi5wbmdcIlxufSk7XG5cbnZhciBwaXF1ZVByb2plY3QgPSBuZXcgYXBwLlByb2plY3Qoe1xuICB0aXRsZTogXCJQaXF1ZVwiLFxuICBzdWJ0aXRsZTogXCJOZXR3b3JraW5nIFBsYXRmb3JtXCIsXG4gIGRlc2NyaXB0aW9uOiBcIkEgZGlzY292ZXJ5IHBsYXRmb3JtIGZvciBwcm9mZXNzaW9uYWxzIGxvb2tpbmcgZm9yIGFuIGVmZmVjdGl2ZSB3YXkgdG8gbmV0d29yay4gUGlxdWUgdXNlcnMgY2FuIGRldmlzZSBhbmQgc2N1bHB0IGEgbGlzdCBvZiBwcm9mZXNzaW9uYWwgY29udGFjdHMgZmluZGluZyBvdGhlcnMgdGhyb3VnaCBwcm9mZXNzaW9uYWwgYW5kIHNvY2lhbCBpbnRlcmVzdHMsIGluZHVzdHJ5LCBhbmQgbW9yZS5cIixcbiAgdGVjaG5vbG9naWVzOiBcIlJ1Ynkgb24gUmFpbHMsIGpRdWVyeSwgUG9zdGdyZVNRTCwgQmNyeXB0LCBBSkFYLCBQYXBlcmNsaXBcIixcbiAgaW1hZ2VzOiBbXCJwdWJsaWMvaW1hZ2VzL3BpcXVlL2Rpc2NvdmVyX3Byb2plY3RzMS5wbmdcIiwgXCJwdWJsaWMvaW1hZ2VzL3BpcXVlL2Rpc2NvdmVyX3Byb2plY3RzMi5wbmdcIiwgXCJwdWJsaWMvaW1hZ2VzL3BpcXVlL3BpcXVlX21zZy5qcGdcIiwgXCJwdWJsaWMvaW1hZ2VzL3BpcXVlL3BpcXVlX3Byb2ZpbGUuanBnXCIsIFwicHVibGljL2ltYWdlcy9waXF1ZS9jcmVhdGVfcHJvamVjdDEucG5nXCIsIFwicHVibGljL2ltYWdlcy9waXF1ZS9jcmVhdGVfcHJvamVjdDMucG5nXCJdLFxuICBsaW5rOiBcImphdmFzY3JpcHQ6dm9pZCgwKTtcIixcbiAgZ2l0aHViOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9waXF1ZWFwcC9waXF1ZTJcIixcbiAgZ2l0aHViSWNvbjogXCJwdWJsaWMvaW1hZ2VzL2dpdGh1Yi1pY29uLnBuZ1wiXG59KTtcblxudmFyIGNoamF0UHJvamVjdCA9IG5ldyBhcHAuUHJvamVjdCh7XG4gIHRpdGxlOiBcIkNoamF0XCIsXG4gIHN1YnRpdGxlOiBcIlJlYWwtVGltZSBDaGF0IEFwcGxpY2F0aW9uXCIsXG4gIGRlc2NyaXB0aW9uOiBcIkNoYXQgaW5zdGFudGx5IHRocm91Z2ggdGhpcyBsaWdodHdlaWdodCBhcHAuIENyZWF0ZSBhbmQgcGVyc29uYWxpemUgYSBjaGF0cm9vbSBvciB0YWxrIGRpcmVjdGx5IHRvIGFub3RoZXIgdXNlci4gQ2hqYXQgdXNlcyBTb2NrZXQuaW8gZm9yIGxpZ2h0bmluZyBmYXN0IGNvbW11bmljYXRpb24sIEFXUyBmb3IgaW1hZ2UgYW5kIGdpZiBzdG9yYWdlLCBhbmQgTW9uZ29EQiB0byBzYXZlIGFsbCB5b3VyIGNvbnZlcnNhdGlvbnMuXCIsXG4gIHRlY2hub2xvZ2llczogXCJOb2RlLmpzLCBFeHByZXNzLmpzLCBTb2NrZXQuaW8sIE1vbmdvZGIsIEJhY2tib25lLmpzLCBBV1MsIEd1bHAuanMsIFNDU1MsIE9BdXRoXCIsXG4gIGltYWdlczogW1xuICAgIFwicHVibGljL2ltYWdlcy9jaGphdC9yZWdpc3Rlci5wbmdcIixcbiAgICBcInB1YmxpYy9pbWFnZXMvY2hqYXQvY2hhdHJvb20ucG5nXCIsXG4gICAgXCJwdWJsaWMvaW1hZ2VzL2NoamF0L2NoYXRyb29tLWltYWdlLnBuZ1wiLFxuICAgIFwicHVibGljL2ltYWdlcy9jaGphdC9pbWFnZS11cGxvYWQucG5nXCIsXG4gICAgXCJwdWJsaWMvaW1hZ2VzL2NoamF0L2ludml0YXRpb24ucG5nXCIsXG4gICAgXCJwdWJsaWMvaW1hZ2VzL2NoamF0L21vYmlsZS1jaGF0cm9vbS5wbmdcIixcbiAgICBcInB1YmxpYy9pbWFnZXMvY2hqYXQvbW9iaWxlLXNsaWRlLXNjcmVlbi5wbmdcIixcbiAgICBcInB1YmxpYy9pbWFnZXMvY2hqYXQvbW9iaWxlLW1vZGFsLnBuZ1wiLFxuICBdLFxuICBsaW5rOiBcImh0dHA6Ly93d3cuY2hqYXQuY29tXCIsXG4gIGdpdGh1YjogXCJodHRwczovL2dpdGh1Yi5jb20vSG9sZGVybmVzcy9DaGphdFwiLFxuICBnaXRodWJJY29uOiBcInB1YmxpYy9pbWFnZXMvZ2l0aHViLWljb24ucG5nXCJcbn0pO1xuXG5cblxuXG4kKGZ1bmN0aW9uKCl7XG5cbiAgdmFyIGJsaW5raXR5UGlnID0gZnVuY3Rpb24gYmxpbmtpdHlQaWcoKXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAkKCcuZmx5LXBpZy1jbG9zZWQtZXllcycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgfSwgODAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAkKCcuZmx5LXBpZy1jbG9zZWQtZXllcycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICB9LCA5MDApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICQoJy5mbHktcGlnLWNsb3NlZC1leWVzJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICB9LCAxMTAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAkKCcuZmx5LXBpZy1jbG9zZWQtZXllcycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICB9LCAxMjAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAkKCcuZmx5LXBpZy1jbG9zZWQtZXllcycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgfSwgNDEwMCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgJCgnLmZseS1waWctY2xvc2VkLWV5ZXMnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgfSwgNDIwMCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgJCgnLmZseS1waWctY2xvc2VkLWV5ZXMnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgIH0sIDcwMDApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICQoJy5mbHktcGlnLWNsb3NlZC1leWVzJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgIH0sIDcxMDApO1xuICB9O1xuXG4gIHZhciBibGlua015UGlnID0gZnVuY3Rpb24gYmxpbmtNeVBpZygpIHtcbiAgICAkKCcuZmx5LXBpZy1jbG9zZWQtZXllcycpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBibGlua2l0eVBpZygpO1xuICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGJsaW5raXR5UGlnKCk7XG4gICAgICB9LCAxMDAwMCk7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIGJvbGROYXZFbCA9IGZ1bmN0aW9uIGJvbGROYXZFbCgpIHtcbiAgICAkKCcjbmF2IGEnKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgJCgnI25hdicpLmZpbmQoJy5ib2xkLW5hdicpLnJlbW92ZUNsYXNzKCdib2xkLW5hdicpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYm9sZC1uYXYnKTtcbiAgICB9KTtcbiAgfTtcblxuXG4gIFxuXG5cbiAgYmxpbmtNeVBpZygpO1xuICBib2xkTmF2RWwoKTtcblxuXG4gIC8vIHJlc2V0cyBhbmltYXRpb25zIG9uIHNjcmVlbiByZXNpemVcbiAgLy8gJCh3aW5kb3cpLnJlc2l6ZSgpLmRvbmUoZnVuY3Rpb24oKXsgbG9jYXRpb24ucmVsb2FkKCk7fSk7XG5cbi8vIHZhciByZXNpemVUaW1lcjtcbi8vICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oZSkge1xuLy8gICBjbGVhclRpbWVvdXQocmVzaXplVGltZXIpO1xuLy8gICByZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4vLyAgICAgbG9jYXRpb24ucmVsb2FkKCkgICAgICBcbi8vICAgfSwgMjUwKTtcbi8vIH0pO1xuLy8gYWJvdmUgY29kZSBpcyB0aGUgc2FtZSBhcyBkZWJvdW5jaW5nXG5cbi8vICQod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4vLyAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4vLyB9LCA1MDApKTtcblxuXG5cblxufSk7IiwidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gIGFwcC5BcHBSb3V0ZXIgPSBCYWNrYm9uZS5Sb3V0ZXIuZXh0ZW5kKHtcbiAgICByb3V0ZXM6IHtcbiAgICAgIFwiXCI6IFwiY29udGFjdFwiLFxuICAgICAgXCJjb250YWN0XCI6IFwiY29udGFjdFwiLFxuICAgICAgXCJwb3J0Zm9saW9cIjogXCJwb3J0Zm9saW9cIixcbiAgICAgIFwicG9ydGZvbGlvLzpwcm9qZWN0XCI6IFwicHJvamVjdFwiLFxuICAgICAgXCJ3cml0aW5nXCI6IFwid3JpdGluZ1wiXG4gICAgfSxcbiAgICBjb250YWN0OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuY29udGFjdExpbmtMaXN0VmlldyA9IG5ldyBhcHAuTGlua0xpc3RWaWV3KHtjb2xsZWN0aW9uOiBjb250YWN0bGlua0xpc3QsXG4gICAgICAgIGNsYXNzTmFtZTogXCJjb250YWN0XCJ9KTtcbiAgICAgIGFwcC5uYXZMaW5rTGlzdFZpZXcuZ290byh0aGlzLmNvbnRhY3RMaW5rTGlzdFZpZXcpO1xuICAgICAgdGhpcy5ob21lVmlldyA9IG5ldyBhcHAuSG9tZVZpZXcoe30pO1xuICAgICAgdGhpcy5ib2xkTmF2RWwoJ2NvbnRhY3QnKTtcbiAgICB9LFxuICAgIHBvcnRmb2xpbzogZnVuY3Rpb24ocGFnZVJvdXRlKSB7XG4gICAgICB0aGlzLnBvcnRmb2xpb0xpbmtMaXN0VmlldyA9IG5ldyBhcHAuTGlua0xpc3RWaWV3KHtjb2xsZWN0aW9uOiBwb3J0Zm9saW9saW5rTGlzdCxcbiAgICAgY2xhc3NOYW1lOiBcInBvcnRmb2xpb1wifSk7XG4gICAgICBhcHAubmF2TGlua0xpc3RWaWV3LmdvdG8odGhpcy5wb3J0Zm9saW9MaW5rTGlzdFZpZXcpO1xuICAgICAgdGhpcy5waWdjYXZlUHJvamVjdFZpZXcgPSBuZXcgYXBwLlByb2plY3RWaWV3KHttb2RlbDogcGlnY2F2ZVByb2plY3R9KTtcbiAgICAgIHRoaXMuYm9sZE5hdkVsKCdwb3J0Zm9saW8nKTtcbiAgICB9LFxuICAgIHByb2plY3Q6IGZ1bmN0aW9uKHByb2plY3Qpe1xuICAgICAgdmFyIHByb2plY3RMaXN0ID0ge1xuICAgICAgICBwaXF1ZTogcGlxdWVQcm9qZWN0LFxuICAgICAgICBwaWdjYXZlOiBwaWdjYXZlUHJvamVjdCxcbiAgICAgICAgaGFuZ21hbmdsZXI6IGhhbmdtYW5nbGVyUHJvamVjdCxcbiAgICAgICAganVzdG9rYXlyZWFkczoganVzdG9rYXlyZWFkc1Byb2plY3QsXG4gICAgICAgIGNoamF0OiBjaGphdFByb2plY3RcbiAgICAgIH07XG4gICAgICB0aGlzLnByb2plY3RWaWV3ID0gbmV3IGFwcC5Qcm9qZWN0Vmlldyh7bW9kZWw6IHByb2plY3RMaXN0W3Byb2plY3RdfSk7XG4gICAgICBpZiAoIWFwcC5uYXZMaW5rTGlzdFZpZXcuaGFzT3duUHJvcGVydHkoJ2N1cnJlbnRWaWV3JykpIHtcbiAgICAgICAgdGhpcy5wb3J0Zm9saW9MaW5rTGlzdFZpZXcgPSBuZXcgYXBwLkxpbmtMaXN0Vmlldyh7Y29sbGVjdGlvbjogcG9ydGZvbGlvbGlua0xpc3QsXG4gICAgICAgICBjbGFzc05hbWU6IFwicG9ydGZvbGlvXCJ9KTtcbiAgICAgICAgYXBwLm5hdkxpbmtMaXN0Vmlldy5nb3RvKHRoaXMucG9ydGZvbGlvTGlua0xpc3RWaWV3KTtcbiAgICAgIH1cbiAgICAgIFxuICAgIH0sXG4gICAgd3JpdGluZzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLndyaXRpbmdWaWV3ID0gbmV3IGFwcC5Xcml0aW5nVmlldyh7fSk7XG4gICAgICB0aGlzLndyaXRpbmdMaW5rTGlzdFZpZXcgPSBuZXcgYXBwLkxpbmtMaXN0Vmlldyh7Y29sbGVjdGlvbjogd3JpdGluZ2xpbmtMaXN0LFxuICAgICAgIGNsYXNzTmFtZTogXCJ3cml0aW5nXCJ9KTtcbiAgICAgIGFwcC5uYXZMaW5rTGlzdFZpZXcuZ290byh0aGlzLndyaXRpbmdMaW5rTGlzdFZpZXcpO1xuICAgICAgYXBwLm5hdkxpbmtMaXN0Vmlldy5zZXRQdWJWaWV3TGlzdGVuZXIoKTtcbiAgICAgIHRoaXMuYm9sZE5hdkVsKCd3cml0aW5nJyk7XG4gICAgfSxcbiAgICBib2xkTmF2RWw6IGZ1bmN0aW9uKG5hdikge1xuICAgICAgJCgnI25hdicpLmZpbmQoJy5ib2xkLW5hdicpLnJlbW92ZUNsYXNzKCdib2xkLW5hdicpO1xuICAgICAgJCgnIycgKyBuYXYpLmFkZENsYXNzKCdib2xkLW5hdicpO1xuICAgIH1cblxuICB9KTtcblxuICBhcHAucm91dGVyID0gbmV3IGFwcC5BcHBSb3V0ZXIoKTtcbiAgYXBwLm5hdkxpbmtMaXN0VmlldyA9IG5ldyBhcHAuTmF2TGlua0xpc3RWaWV3KCk7XG4gIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKTtcblxufSkoKTsiXX0=
