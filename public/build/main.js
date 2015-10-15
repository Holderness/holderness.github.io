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
  image: "css/images/github-icon.png"
});

var linkedinLink = new app.LinkItem( {
  url: "https://www.linkedin.com/in/andersonholderness",
  image: "css/images/linked-in-icon.png"
});

var mailtoLink = new app.LinkItem( {
  url: "mailto:andersonholderness@gmail.com",
  image: "css/images/mail-icon.png"
});

var pigcaveLink = new app.LinkItem( {
  url: "#portfolio/pigcave",
  image: "css/images/fly-pig-icon.png"
});

var bklstLink = new app.LinkItem( {
  url: "#portfolio/bklst",
  image: "css/images/book-icon.png"
});

// var waiterLink = new app.LinkItem( {
//   url: "#portfolio/waiter",
//   image: "css/images/waiter-icon.png"
// });

var hangmanglerLink = new app.LinkItem( {
  url: "#portfolio/hangmangler",
  image: "css/images/hangmangler-icon.png"
});

var piqueLink = new app.LinkItem( {
  url: "#portfolio/pique",
  image: "css/images/pique-icon.png"
});

// var pigcaveLink = new app.LinkItem( {
//   url: "http://pigcave.com",
//   image: "css/images/pig-cave.png"
// });

// var waiterLink = new app.LinkItem( {
//   url: "http://192.241.243.100/",
//   image: "css/images/waiter-icon.png"
// });

// var hangmanglerLink = new app.LinkItem( {
//   url: "https://hangmanglerhelper.herokuapp.com/",
//   image: "css/images/hangmangler-icon.png"
// });

var chjatLink = new app.LinkItem( {
  url: "#portfolio/chjat",
  image: "css/images/chjat-icon.png"
});

var publicationLink = new app.LinkItem( {
  url: "#writing",
  image: "css/images/mermaids-purse.png",
  id: "mermaids-purse"
});

var contactlinkList = new app.LinkList([ githubLink, linkedinLink, mailtoLink ]);
var portfoliolinkList = new app.LinkList([ pigcaveLink, hangmanglerLink, bklstLink, piqueLink, chjatLink]);
var writinglinkList = new app.LinkList([ publicationLink ]);


var pigcaveProject = new app.Project( {
  title: "Pig Cave",
  subtitle: "Story-creation App",
  description: "This app's foundation is a word-sorting algorithm that pairs similar texts together. The data comes from two websites I scraped and is housed in an API built on Rails. The original images were drawn in Photoshop and animated with Skrollr.js.",
  technologies: "Backbone.js, Skrollr.js, jQuery, Ruby on Rails, JSON, Photoshop",
  images: ["css/images/pigcave/pig-cave-project.png", "css/images/pigcave/owl.png", "css/images/pigcave/laser.png"],
  link: "http://pigcave.com",
  github: "https://github.com/Holderness/Pig_Cave_JS_Client",
  githubIcon: "css/images/github-icon.png"
});

var bklstProject = new app.Project( {
  title: "BK LST",
  subtitle: "Personal Library App",
  description: "This single-page app offers the ability to build your own digital library. Rate, comment, search, upload book covers: keep track of the books you read.",
  technologies: "Node.js, Express.js, MongoDB, Mongoose, Multer, AWS, Backbone.js, OAuth",
  images: ["css/images/bklst/bklst.png", "css/images/bklst/register.png", "css/images/bklst/comment.png", "css/images/bklst/addbook.png", "css/images/bklst/sort.png"],
  link: "https://bklst.herokuapp.com/",
  github: "https://github.com/Holderness/O",
  githubIcon: "css/images/github-icon.png"
});

var waiterProject = new app.Project( {
  title: "W",
  subtitle: "Restaurant Management CRUD App",
  description: "The system allows users to keep track of orders, tables, and menu items. The design is minimal and tight for quick interaction on mobile devices.",
  technologies: "Sinatra, jQuery, PostgreSQL",
  images: ["css/images/waiter-project.png"],
  link: "http://192.241.243.100/",
  github: "https://github.com/Holderness/Waiter",
  githubIcon: "css/images/github-icon.png"
});

var hangmanglerProject = new app.Project({
  title: "Hangmangler Helper",
  subtitle: "Gaming App",
  description: "Play hangman or tic-tac-toe in this ASCII art themed gaming app.  It's got talking cows, moving clouds, and existentialism.",
  technologies: "Sinatra, jQuery, PostgreSQL, Bcrypt, AJAX",
  images: ["css/images/hangmangler/hangmangler-project.png", "css/images/hangmangler/quinoa.png", "css/images/hangmangler/udders.png","css/images/hangmangler/hangman.png", "css/images/hangmangler/cowturn.png"],
  link: "https://hangmanglerhelper.herokuapp.com/",
  github: "https://github.com/Holderness/Hangmangler-Helper",
  githubIcon: "css/images/github-icon.png"
});

var piqueProject = new app.Project({
  title: "Pique",
  subtitle: "Networking Platform",
  description: "A discovery platform for professionals looking for an effective way to network. Pique users can devise and sculpt a list of professional contacts finding others through professional and social interests, industry, and more.",
  technologies: "Ruby on Rails, jQuery, PostgreSQL, Bcrypt, AJAX, Paperclip",
  images: ["css/images/pique/discover_projects1.png", "css/images/pique/discover_projects2.png", "css/images/pique/pique_msg.jpg", "css/images/pique/pique_profile.jpg", "css/images/pique/create_project1.png", "css/images/pique/create_project3.png"],
  link: "javascript:void(0);",
  github: "https://github.com/piqueapp/pique2",
  githubIcon: "css/images/github-icon.png"
});

var chjatProject = new app.Project({
  title: "Chjat",
  subtitle: "Real-Time Chat Application",
  description: "Chat instantly through this lightweight app. Create and personalize a chatroom or talk directly to another user. Chjat uses Socket.io for lightning fast communication, AWS for image and gif storage, and MongoDB to save all your conversations.",
  technologies: "Node.js, Express.js, Socket.io, Mongodb, Backbone.js, AWS, Gulp.js, SASS, OAuth",
  images: [
    "css/images/chjat/register.png",
    "css/images/chjat/chatroom.png",
    "css/images/chjat/chatroom-image.png",
    "css/images/chjat/image-upload.png",
    "css/images/chjat/invitation.png",
    "css/images/chjat/mobile-chatroom.png",
    "css/images/chjat/mobile-slide-screen.png",
    "css/images/chjat/mobile-modal.png",
  ],
  link: "http://www.chjat.com",
  github: "https://github.com/Holderness/Chjat",
  githubIcon: "css/images/github-icon.png"
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
        bklst: bklstProject,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmsuanMiLCJwcm9qZWN0LmpzIiwibGlua2xpc3QuanMiLCJibHVyYi5qcyIsImhvbWUuanMiLCJuYXZsaW5rbGlzdC5qcyIsInB1Yi5qcyIsIndyaXRpbmcuanMiLCJ3cml0aW5nVGV4dFZpZXcuanMiLCJtYWluLmpzIiwicm91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUo5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBRWhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBR2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FKM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUt6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKCQpIHtcblxuICBhcHAuTGlua0l0ZW1WaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIHRhZ05hbWU6ICdhJyxcbiAgICBjbGFzc05hbWU6ICdsaW5rJyxcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShcIjxpbWcgaWQ9JzwlPSBpZCAlPicgY2xhc3M9J2xpbmstaW1hZ2UnIHNyYz0nPCU9IGltYWdlICU+JyA+XCIpLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXR0cmlidXRlcyA9IHRoaXMubW9kZWwudG9KU09OKCk7XG4gICAgICB0aGlzLiRlbC5hdHRyKCdocmVmJywgdGhpcy5tb2RlbC5nZXQoJ3VybCcpKVxuICAgICAgLmh0bWwodGhpcy50ZW1wbGF0ZShhdHRyaWJ1dGVzKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xuXG59KShqUXVlcnkpOyIsInZhciBhcHAgPSBhcHAgfHwge307XG5cbihmdW5jdGlvbigkKSB7XG5cbiAgYXBwLlByb2plY3RWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIGVsOiBcIiN0b3AtY29udGFpbmVyXCIsXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoJCgnc2NyaXB0W25hbWU9cHJvamVjdHNdJykuaHRtbCgpKSxcbiAgICBpbWFnZVRlbXBsYXRlOiBfLnRlbXBsYXRlKFwiPGltZyBzcmM9PCU9IGltYWdlICU+PlwiKSxcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLm1vZGVsLnRvSlNPTigpO1xuICAgICAgdmFyIHRoaXNfID0gdGhpcztcblxuICAgICAgdmFyIGltYWdlcyA9IGF0dHJpYnV0ZXMuaW1hZ2VzO1xuXG4gICAgICAvLyBmdW5jdGlvbiBmYWRlKCkge1xuICAgICAgLy8gICAkKFwiLm93bC1jYXJvdXNlbFwiKS5oaWRlKCkuZmFkZUluKDMwMCk7XG4gICAgICAvLyB9XG5cbiAgICAgICQoJy5saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKCcjdG9wLWNvbnRhaW5lcicpLmlzKCc6YW5pbWF0ZWQnKSkge1xuICAgICAgICAgICAkKCcjdG9wLWNvbnRhaW5lcicpLnN0b3AodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICB9XG4gICAgICAgfSk7XG4gICAgICBcbiAgICAgIHRoaXMuJGVsLmVtcHR5KCkuaGlkZSgpLmh0bWwodGhpcy50ZW1wbGF0ZShhdHRyaWJ1dGVzKSkuZmFkZUluKDcwMCk7XG5cblxuICAgICAgICAkKFwiLnByb2plY3QtaW1hZ2VcIikub3dsQ2Fyb3VzZWwoe1xuICAgICAgICAgIG1hcmdpbjozMCxcbiAgICAgICAgICBsb29wOnRydWUsXG4gICAgICAgICAgYXV0b1dpZHRoOnRydWUsXG4gICAgICAgICAgbmF2OiB0cnVlLFxuICAgICAgICAgIGxhenlMb2FkOiB0cnVlLFxuICAgICAgICAgIGNlbnRlcjogdHJ1ZSxcbiAgICAgICAgICBvbkluaXRpYWxpemU6IHRoaXNfLmNyZWF0ZUltYWdlcyhpbWFnZXMpLFxuICAgICAgICB9KTtcblxuXG5cblxuICAgICAgLy8gdGhpcy5ncm93UHJvamVjdE5leHRJbWFnZU9uSG92ZXIoXCIxMDBweFwiLCAtMjAsIC0yMCk7XG4gICAgfSxcbiAgICAvLyBncm93UHJvamVjdE5leHRJbWFnZU9uSG92ZXI6IGZ1bmN0aW9uKGdyb3dXaWR0aCwgbWFyZ2luVG9wLCBtYXJnaW5MZWZ0KSB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhcImdyb3dQcm9qZWN0TmV4dEltYWdlT25Ib3ZlciBsb2FkZWRcIik7XG4gICAgLy8gICB2YXIgb3JpZ2luYWxXaWR0aCA9ICQoJy5wcm9qZWN0LW5leHQtYnV0dG9uLWltZycpLndpZHRoKCk7XG4gICAgLy8gICAkKCcucHJvamVjdC1uZXh0LWJ1dHRvbi1pbWcnKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgJCh0aGlzKS5zdG9wKHRydWUsIHRydWUpLmFuaW1hdGUoe1xuICAgIC8vICAgICAgIHdpZHRoOiBncm93V2lkdGgsXG4gICAgLy8gICAgICAgbWFyZ2luVG9wOiBtYXJnaW5Ub3AsXG4gICAgLy8gICAgICAgbWFyZ2luTGVmdDogbWFyZ2luTGVmdFxuICAgIC8vICAgICB9LDIwMCk7XG4gICAgLy8gICB9LFxuICAgIC8vICAgZnVuY3Rpb24oKXtcbiAgICAvLyAgICAgJCh0aGlzKS5zdG9wKHRydWUsIHRydWUpLmFuaW1hdGUoe1xuICAgIC8vICAgICAgIHdpZHRoOiBvcmlnaW5hbFdpZHRoLFxuICAgIC8vICAgICAgIG1hcmdpblRvcDogMCxcbiAgICAvLyAgICAgICBtYXJnaW5MZWZ0OiAwXG4gICAgLy8gICAgIH0sNjAwKTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH0sXG5cbiAgICBjcmVhdGVJbWFnZXM6IGZ1bmN0aW9uKGltYWdlcykge1xuICAgICAgJChcIi5vd2wtY2Fyb3VzZWxcIikuY2hpbGRyZW4oKS5yZW1vdmUoKTtcbiAgICAgICQuZWFjaChpbWFnZXMsIGZ1bmN0aW9uKGksIGltYWdlKSB7XG4gICAgICAgICQoXCIub3dsLWNhcm91c2VsXCIpLmFwcGVuZCh0aGlzLmltYWdlVGVtcGxhdGUoe2ltYWdlOiBpbWFnZX0pKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gIH0pO1xuXG59KShqUXVlcnkpOyIsInZhciBhcHAgPSBhcHAgfHwge307XG5cbihmdW5jdGlvbigkKSB7XG5cbiAgYXBwLkxpbmtMaXN0VmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICBpZDogJ2xpbmstbGlzdC12aWV3JyxcbiAgICByZW5kZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInJlbmRlcjpcIik7XG4gICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgXy5lYWNoKHRoaXMuY29sbGVjdGlvbi5tb2RlbHMsIGZ1bmN0aW9uKGxpbmspIHtcbiAgICAgICAgdmFyIGxpbmtJdGVtVmlldyA9IG5ldyBhcHAuTGlua0l0ZW1WaWV3KHttb2RlbDogbGlua30pO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGlua0l0ZW1WaWV3LnJlbmRlcigpLmVsKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kZWwuaHRtbChjb250YWluZXIpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBhZnRlclJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZygnYWZ0ZXIgcmVuZGVyOicpO1xuICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNjUwKSB7XG4gICAgICAgIHRoaXMuZ3Jvd0xpbmtPbkhvdmVyKFwiNzVweFwiLCAtMzUsIC0xMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdyb3dMaW5rT25Ib3ZlcihcIjEzMHB4XCIsIC01MCwgLTIwKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG93bFByb2plY3ROYXY6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWwuc2xpY2soe1xuICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdyb3dMaW5rT25Ib3ZlcjogZnVuY3Rpb24oZ3Jvd1dpZHRoLCBtYXJnaW5Ub3AsIG1hcmdpbkxlZnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ3Jvd0xpbmtPbkhvdmVyIGxvYWRlZFwiKTtcbiAgICAgIHZhciBvcmlnaW5hbFdpZHRoID0gJCgnLmxpbmstaW1hZ2UnKS53aWR0aCgpO1xuICAgICAgJCgnLmxpbmstaW1hZ2UnKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5zdG9wKHRydWUsIGZhbHNlKS5hbmltYXRlKHtcbiAgICAgICAgICB3aWR0aDogZ3Jvd1dpZHRoLFxuICAgICAgICAgIG1hcmdpblRvcDogbWFyZ2luVG9wLFxuICAgICAgICAgIG1hcmdpbkxlZnQ6IG1hcmdpbkxlZnRcbiAgICAgICAgfSwyMDApO1xuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuc3RvcCh0cnVlLCBmYWxzZSkuYW5pbWF0ZSh7XG4gICAgICAgICAgd2lkdGg6IG9yaWdpbmFsV2lkdGgsXG4gICAgICAgICAgbWFyZ2luVG9wOiAwLFxuICAgICAgICAgIG1hcmdpbkxlZnQ6IDBcbiAgICAgICAgfSw2MDApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBsaW5rQ2Fyb3VzZWw6IGZ1bmN0aW9uKGR1cmF0aW9uLCBzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiwgc2xpZGVJbikge1xuICAgICAgdmFyIGVsbGVmdCA9ICQoJyNsaW5rLWxpc3QtdmlldycpLm9mZnNldCgpLmxlZnQ7XG4gICAgICB2YXIgb3BhY2l0eVN0YXJ0ID0gKHNsaWRlSW4gPT09IGZhbHNlKSA/IDEgOiAwO1xuICAgICAgdmFyIG9wYWNpdHlFbmQgPSAoc2xpZGVJbiA9PT0gdHJ1ZSkgPyAxIDogMDtcbiAgICAgICQoJyNsaW5rLWxpc3QtdmlldycpLmNzcyh7XG4gICAgICAgIGxlZnQ6IGVsbGVmdCArPSBzdGFydFBvc2l0aW9uLFxuICAgICAgICBvcGFjaXR5OiBvcGFjaXR5U3RhcnRcbiAgICAgIH0pLmFuaW1hdGUoe1xuICAgICAgICBsZWZ0OiAnLT0nICsgZW5kUG9zaXRpb24gKyAncHgnLFxuICAgICAgICBvcGFjaXR5OiBvcGFjaXR5RW5kXG4gICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuXG4gIH0pO1xuXG59KShqUXVlcnkpOyIsInZhciBhcHAgPSBhcHAgfHwge307XG5cbihmdW5jdGlvbigkKSB7XG5cbiAgYXBwLkJsdXJiVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICBlbDogXCIud3JpdGluZy10ZXh0LWNvbnRhaW5lclwiLFxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKCQoJ3NjcmlwdFtuYW1lPWJsdXJic10nKS5odG1sKCkpLFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsLmVtcHR5KCk7XG4gICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSkuaGlkZSgpLmZhZGVJbigyMDApO1xuICAgIH1cbiAgfSk7XG5cbn0pKGpRdWVyeSk7IiwidmFyIGFwcCA9IGFwcCB8fCB7fTtcblxuKGZ1bmN0aW9uKCQpIHtcblxuICBhcHAuSG9tZVZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgZWw6IFwiI3RvcC1jb250YWluZXJcIixcbiAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgkKCdzY3JpcHRbbmFtZT1ob21lXScpLmh0bWwoKSksXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSkuaGlkZSgpLmZhZGVJbig3MDApO1xuICAgICAgdGhpcy5waWdUb25ndWVCbGVwKC0xOCwgLTcpO1xuICAgIH0sXG4gICAgcGlnVG9uZ3VlQmxlcDogZnVuY3Rpb24obWFyZ2luVG9wLCBtYXJnaW5MZWZ0KSB7XG4gICAgICAkKCcucGlnLWltYWdlLWNvbnRhaW5lcicpLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuZmx5LXBpZy10b25ndWUnKS5zdG9wKHRydWUsIGZhbHNlKS5hbmltYXRlKHtcbiAgICAgICAgICBtYXJnaW5Ub3A6IDAsXG4gICAgICAgICAgbWFyZ2luTGVmdDogMFxuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmZseS1waWctdG9uZ3VlJykuc3RvcCh0cnVlLCBmYWxzZSkuYW5pbWF0ZSh7XG4gICAgICAgICAgbWFyZ2luVG9wOiBtYXJnaW5Ub3AsXG4gICAgICAgICAgbWFyZ2luTGVmdDogbWFyZ2luTGVmdFxuICAgICAgICB9LCAyMDApO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxufSkoalF1ZXJ5KTsiLCJ2YXIgYXBwID0gYXBwIHx8IHt9O1xuXG4oZnVuY3Rpb24oJCkge1xuXG4gIGFwcC5OYXZMaW5rTGlzdFZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgZWw6IFwiI2Zvb3RlclwiLFxuICAgIGdvdG86IGZ1bmN0aW9uKHZpZXcpIHtcblxuICAgICAgdmFyIHByZXZpb3VzID0gdGhpcy5jdXJyZW50VmlldyB8fCBudWxsO1xuICAgICAgdmFyIG5leHQgPSB2aWV3O1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIG5leHQucmVuZGVyKCk7XG4gICAgICBcbiAgICAgIGlmIChwcmV2aW91cyA9PT0gbnVsbCkge1xuICAgICAgICBfdGhpcy4kZWwuaHRtbChuZXh0LiRlbCk7XG4gICAgICAgIG5leHQubGlua0Nhcm91c2VsKDYwMCwgMjUwLCAyNTAsIHRydWUpO1xuICAgICAgICBuZXh0LmFmdGVyUmVuZGVyKCk7XG4gICAgICB9IGVsc2UgaWYgKG5leHQuY2xhc3NOYW1lID09PSBcInBvcnRmb2xpb1wiICYmIHByZXZpb3VzLmNsYXNzTmFtZSA9PT0gXCJjb250YWN0XCIpIHtcbiAgICAgICAgcHJldmlvdXMubGlua0Nhcm91c2VsKDUwMCwgMCwgMjUwLCBmYWxzZSk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBfdGhpcy4kZWwuaHRtbChuZXh0LiRlbCk7XG4gICAgICAgICAgbmV4dC5saW5rQ2Fyb3VzZWwoNjAwLCAyNTAsIDI1MCwgdHJ1ZSk7XG4gICAgICAgICAgbmV4dC5hZnRlclJlbmRlcigpO1xuICAgICAgICAgIG5leHQub3dsUHJvamVjdE5hdigpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfSBlbHNlIGlmIChuZXh0LmNsYXNzTmFtZSA9PT0gXCJwb3J0Zm9saW9cIiAmJiBwcmV2aW91cy5jbGFzc05hbWUgPT09IFwid3JpdGluZ1wiKSB7XG4gICAgICAgIHByZXZpb3VzLmxpbmtDYXJvdXNlbCg1MDAsIDAsIC0yNTAsIGZhbHNlKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIF90aGlzLiRlbC5odG1sKG5leHQuJGVsKTtcbiAgICAgICAgICBuZXh0LmxpbmtDYXJvdXNlbCg2MDAsIC0yNTAsIC0yNTAsIHRydWUpO1xuICAgICAgICAgIG5leHQuYWZ0ZXJSZW5kZXIoKTtcbiAgICAgICAgICBuZXh0Lm93bFByb2plY3ROYXYoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dC5jbGFzc05hbWUgPT09IFwiY29udGFjdFwiICYmIHByZXZpb3VzLmNsYXNzTmFtZSA9PT0gXCJwb3J0Zm9saW9cIikge1xuICAgICAgICBwcmV2aW91cy5saW5rQ2Fyb3VzZWwoNTAwLCAwLCAtMjUwLCBmYWxzZSk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBfdGhpcy4kZWwuaHRtbChuZXh0LiRlbCk7XG4gICAgICAgICAgbmV4dC5saW5rQ2Fyb3VzZWwoNjAwLCAtMjUwLCAtMjUwLCB0cnVlKTtcbiAgICAgICAgICBuZXh0LmFmdGVyUmVuZGVyKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9IGVsc2UgaWYgKG5leHQuY2xhc3NOYW1lID09PSBcIndyaXRpbmdcIikge1xuICAgICAgICBwcmV2aW91cy5saW5rQ2Fyb3VzZWwoNTAwLCAwLCAyNTAsIGZhbHNlKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIF90aGlzLiRlbC5odG1sKG5leHQuJGVsKTtcbiAgICAgICAgICBuZXh0LmxpbmtDYXJvdXNlbCg2MDAsIDI1MCwgMjUwLCB0cnVlKTtcbiAgICAgICAgICBuZXh0LmFmdGVyUmVuZGVyKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICAgIHRoaXMuc2V0UHViVmlld0xpc3RlbmVyKCk7XG4gICAgICB9IGVsc2UgaWYgKHByZXZpb3VzLmNsYXNzTmFtZSA9PT0gXCJ3cml0aW5nXCIpIHtcbiAgICAgICAgcHJldmlvdXMubGlua0Nhcm91c2VsKDUwMCwgMCwgLTI1MCwgZmFsc2UpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgX3RoaXMuJGVsLmh0bWwobmV4dC4kZWwpO1xuICAgICAgICAgIG5leHQubGlua0Nhcm91c2VsKDYwMCwgLTI1MCwgLTI1MCwgdHJ1ZSk7XG4gICAgICAgICAgbmV4dC5hZnRlclJlbmRlcigpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gbmV4dDtcbiAgICB9LFxuXG4gICAgc2V0UHViVmlld0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsLm9mZignY2xpY2snLCAnI21lcm1haWRzLXB1cnNlJyk7XG4gICAgICB2YXIgdGhpc18gPSB0aGlzO1xuICAgICAgdGhpcy4kZWwub24oJ2NsaWNrJywgJyNtZXJtYWlkcy1wdXJzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzXy5wdWJWaWV3VG9nZ2xlKCk7XG4gICAgICB9KTtcbiAgICAgIGFwcC5ibHVyYlZpZXcgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBwdWJWaWV3VG9nZ2xlOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGFwcC5wdWJWaWV3ID0gYXBwLnB1YlZpZXcgPT09ICdibHVyYnMnID8gJ2JsdXJicycgOiAncHVicyc7XG4gICAgICAvLyBpZiAoYXBwLnB1YlZpZXcgPT09ICdibHVyYnMnKSB7XG4gICAgICAvLyAgIGRlYnVnZ2VyO1xuICAgICAgLy8gICBuZXcgYXBwLldyaXRpbmdUZXh0Vmlldyh7J3ZpZXcnOiAncHVicyd9KTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIGRlYnVnZ2VyO1xuICAgICAgLy8gICBuZXcgYXBwLldyaXRpbmdUZXh0Vmlldyh7J3ZpZXcnOiAnYmx1cmJzJ30pO1xuICAgICAgLy8gfVxuICAgICAgYXBwLmJsdXJiVmlldyA9IGFwcC5ibHVyYlZpZXcgPT09IGZhbHNlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgaWYgKGFwcC5ibHVyYlZpZXcpIHtcbiAgICAgICAgYXBwLndyaXRpbmdUZXh0ID0gbmV3IGFwcC5CbHVyYlZpZXcoKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBwLndyaXRpbmdUZXh0ID0gbmV3IGFwcC5QdWJWaWV3KCk7XG5cbiAgICAgIH1cbiAgICB9XG5cblxuICB9KTtcblxufSkoalF1ZXJ5KTsiLCJ2YXIgYXBwID0gYXBwIHx8IHt9O1xuXG4oZnVuY3Rpb24oJCkge1xuXG4gIGFwcC5QdWJWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIGVsOiBcIi53cml0aW5nLXRleHQtY29udGFpbmVyXCIsXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoJCgnc2NyaXB0W25hbWU9cHVic10nKS5odG1sKCkpLFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICB2YXIgJHNjcm9sbGVyID0gJChcIi5wdWJsaWNhdGlvbi1saXN0XCIpO1xuICAgICAgICAkc2Nyb2xsZXIuYmluZCgndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldikge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgc2Nyb2xsZXIgPSAkc2Nyb2xsZXIuZ2V0KDApO1xuXG4gICAgICAgIGlmICgkdGhpcy5zY3JvbGxUb3AoKSA9PT0gMCkgJHRoaXMuc2Nyb2xsVG9wKDEpO1xuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gc2Nyb2xsZXIuc2Nyb2xsVG9wO1xuICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsZXIuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB2YXIgb2Zmc2V0SGVpZ2h0ID0gc2Nyb2xsZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB2YXIgY29udGVudEhlaWdodCA9IHNjcm9sbEhlaWdodCAtIG9mZnNldEhlaWdodDtcbiAgICAgICAgaWYgKGNvbnRlbnRIZWlnaHQgPT0gc2Nyb2xsVG9wKSAkdGhpcy5zY3JvbGxUb3Aoc2Nyb2xsVG9wLTEpO1xuICAgICAgfSk7XG5cbiAgICAgICQoJy5wdWJsaWNhdGlvbi1saXN0Jykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5iYXInKS5jc3MoXCJvcGFjaXR5XCIsIDEgLSAkKCcucHVibGljYXRpb24tbGlzdCcpLnNjcm9sbFRvcCgpIC8gMTg1KTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWwuZW1wdHkoKTtcbiAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKS5oaWRlKCkuZmFkZUluKDIwMCk7XG4gICAgfVxuICB9KTtcblxufSkoalF1ZXJ5KTsiLCJ2YXIgYXBwID0gYXBwIHx8IHt9O1xuXG4oZnVuY3Rpb24oJCkge1xuXG4gIGFwcC5Xcml0aW5nVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICBlbDogXCIjdG9wLWNvbnRhaW5lclwiLFxuICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKCQoJ3NjcmlwdFtuYW1lPXdyaXRpbmddJykuaHRtbCgpKSxcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpe1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbC5lbXB0eSgpO1xuICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKCkpLmhpZGUoKS5mYWRlSW4oMjAwKTtcbiAgICAgIGFwcC53cml0aW5nVGV4dCA9IG5ldyBhcHAuQmx1cmJWaWV3KCk7XG4gICAgfSxcblxuICB9KTtcblxufSkoalF1ZXJ5KTtcblxuXG4vLyB2YXIgYXBwID0gYXBwIHx8IHt9O1xuXG4vLyAoZnVuY3Rpb24oJCkge1xuXG4vLyAgIGFwcC5Xcml0aW5nVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbi8vICAgICBlbDogXCIjdG9wLWNvbnRhaW5lclwiLFxuLy8gICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKCQoJ3NjcmlwdFtuYW1lPXdyaXRpbmddJykuaHRtbCgpKSxcbi8vICAgICBibHVyYlRlbXBsYXRlOiBfLnRlbXBsYXRlKCQoJ3NjcmlwdFtuYW1lPWJsdXJic10nKS5odG1sKCkpLFxuLy8gICAgIHB1YlRlbXBsYXRlOiBfLnRlbXBsYXRlKCQoJ3NjcmlwdFtuYW1lPXB1YnNdJykuaHRtbCgpKSxcbi8vICAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpe1xuLy8gICAgICAgdGhpcy5yZW5kZXIoKTtcbi8vICAgICB9LFxuLy8gICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4vLyAgICAgICB0aGlzLiRlbC5lbXB0eSgpO1xuLy8gICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKCkpLmhpZGUoKS5mYWRlSW4oNzAwKTtcbi8vICAgICAgIGFwcC53cml0aW5nVGV4dCA9IG5ldyBhcHAuV3JpdGluZ1RleHRWaWV3KCdibHVyYnMnKTtcbi8vICAgICB9LFxuXG4vLyAgIH0pO1xuXG4vLyB9KShqUXVlcnkpOyIsIi8vIHZhciBhcHAgPSBhcHAgfHwge307XG5cbi8vIChmdW5jdGlvbigkKSB7XG5cbi8vICAgYXBwLldyaXRpbmdUZXh0VmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbi8vICAgICBlbDogXCIud3JpdGluZy10ZXh0LWNvbnRhaW5lclwiLFxuLy8gICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuLy8gICAgICAgZGVidWdnZXI7XG4vLyAgICAgICBhcHAudmlld3cgPSBvcHRpb25zO1xuLy8gICAgICAgdGhpcy5yZW5kZXIoYXBwLnZpZXd3KTtcbi8vICAgICB9LFxuLy8gICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKCQoJ3NjcmlwdFtuYW1lPScgKyBvcHRpb25zICsgJ10nKS5odG1sKCkpLFxuLy8gICAgIHJlbmRlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuLy8gICAgICAgZGVidWdnZXI7XG4vLyAgICAgICB0aGlzLiRlbC5lbXB0eSgpO1xuLy8gICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKG9wdGlvbnMpKS5oaWRlKCkuZmFkZUluKDIwMCk7XG4vLyAgICAgfVxuLy8gICB9KTtcblxuLy8gfSkoalF1ZXJ5KTsiLCJ2YXIgZ2l0aHViTGluayA9IG5ldyBhcHAuTGlua0l0ZW0oIHtcbiAgdXJsOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9Ib2xkZXJuZXNzXCIsXG4gIGltYWdlOiBcImNzcy9pbWFnZXMvZ2l0aHViLWljb24ucG5nXCJcbn0pO1xuXG52YXIgbGlua2VkaW5MaW5rID0gbmV3IGFwcC5MaW5rSXRlbSgge1xuICB1cmw6IFwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2FuZGVyc29uaG9sZGVybmVzc1wiLFxuICBpbWFnZTogXCJjc3MvaW1hZ2VzL2xpbmtlZC1pbi1pY29uLnBuZ1wiXG59KTtcblxudmFyIG1haWx0b0xpbmsgPSBuZXcgYXBwLkxpbmtJdGVtKCB7XG4gIHVybDogXCJtYWlsdG86YW5kZXJzb25ob2xkZXJuZXNzQGdtYWlsLmNvbVwiLFxuICBpbWFnZTogXCJjc3MvaW1hZ2VzL21haWwtaWNvbi5wbmdcIlxufSk7XG5cbnZhciBwaWdjYXZlTGluayA9IG5ldyBhcHAuTGlua0l0ZW0oIHtcbiAgdXJsOiBcIiNwb3J0Zm9saW8vcGlnY2F2ZVwiLFxuICBpbWFnZTogXCJjc3MvaW1hZ2VzL2ZseS1waWctaWNvbi5wbmdcIlxufSk7XG5cbnZhciBia2xzdExpbmsgPSBuZXcgYXBwLkxpbmtJdGVtKCB7XG4gIHVybDogXCIjcG9ydGZvbGlvL2JrbHN0XCIsXG4gIGltYWdlOiBcImNzcy9pbWFnZXMvYm9vay1pY29uLnBuZ1wiXG59KTtcblxuLy8gdmFyIHdhaXRlckxpbmsgPSBuZXcgYXBwLkxpbmtJdGVtKCB7XG4vLyAgIHVybDogXCIjcG9ydGZvbGlvL3dhaXRlclwiLFxuLy8gICBpbWFnZTogXCJjc3MvaW1hZ2VzL3dhaXRlci1pY29uLnBuZ1wiXG4vLyB9KTtcblxudmFyIGhhbmdtYW5nbGVyTGluayA9IG5ldyBhcHAuTGlua0l0ZW0oIHtcbiAgdXJsOiBcIiNwb3J0Zm9saW8vaGFuZ21hbmdsZXJcIixcbiAgaW1hZ2U6IFwiY3NzL2ltYWdlcy9oYW5nbWFuZ2xlci1pY29uLnBuZ1wiXG59KTtcblxudmFyIHBpcXVlTGluayA9IG5ldyBhcHAuTGlua0l0ZW0oIHtcbiAgdXJsOiBcIiNwb3J0Zm9saW8vcGlxdWVcIixcbiAgaW1hZ2U6IFwiY3NzL2ltYWdlcy9waXF1ZS1pY29uLnBuZ1wiXG59KTtcblxuLy8gdmFyIHBpZ2NhdmVMaW5rID0gbmV3IGFwcC5MaW5rSXRlbSgge1xuLy8gICB1cmw6IFwiaHR0cDovL3BpZ2NhdmUuY29tXCIsXG4vLyAgIGltYWdlOiBcImNzcy9pbWFnZXMvcGlnLWNhdmUucG5nXCJcbi8vIH0pO1xuXG4vLyB2YXIgd2FpdGVyTGluayA9IG5ldyBhcHAuTGlua0l0ZW0oIHtcbi8vICAgdXJsOiBcImh0dHA6Ly8xOTIuMjQxLjI0My4xMDAvXCIsXG4vLyAgIGltYWdlOiBcImNzcy9pbWFnZXMvd2FpdGVyLWljb24ucG5nXCJcbi8vIH0pO1xuXG4vLyB2YXIgaGFuZ21hbmdsZXJMaW5rID0gbmV3IGFwcC5MaW5rSXRlbSgge1xuLy8gICB1cmw6IFwiaHR0cHM6Ly9oYW5nbWFuZ2xlcmhlbHBlci5oZXJva3VhcHAuY29tL1wiLFxuLy8gICBpbWFnZTogXCJjc3MvaW1hZ2VzL2hhbmdtYW5nbGVyLWljb24ucG5nXCJcbi8vIH0pO1xuXG52YXIgY2hqYXRMaW5rID0gbmV3IGFwcC5MaW5rSXRlbSgge1xuICB1cmw6IFwiI3BvcnRmb2xpby9jaGphdFwiLFxuICBpbWFnZTogXCJjc3MvaW1hZ2VzL2NoamF0LWljb24ucG5nXCJcbn0pO1xuXG52YXIgcHVibGljYXRpb25MaW5rID0gbmV3IGFwcC5MaW5rSXRlbSgge1xuICB1cmw6IFwiI3dyaXRpbmdcIixcbiAgaW1hZ2U6IFwiY3NzL2ltYWdlcy9tZXJtYWlkcy1wdXJzZS5wbmdcIixcbiAgaWQ6IFwibWVybWFpZHMtcHVyc2VcIlxufSk7XG5cbnZhciBjb250YWN0bGlua0xpc3QgPSBuZXcgYXBwLkxpbmtMaXN0KFsgZ2l0aHViTGluaywgbGlua2VkaW5MaW5rLCBtYWlsdG9MaW5rIF0pO1xudmFyIHBvcnRmb2xpb2xpbmtMaXN0ID0gbmV3IGFwcC5MaW5rTGlzdChbIHBpZ2NhdmVMaW5rLCBoYW5nbWFuZ2xlckxpbmssIGJrbHN0TGluaywgcGlxdWVMaW5rLCBjaGphdExpbmtdKTtcbnZhciB3cml0aW5nbGlua0xpc3QgPSBuZXcgYXBwLkxpbmtMaXN0KFsgcHVibGljYXRpb25MaW5rIF0pO1xuXG5cbnZhciBwaWdjYXZlUHJvamVjdCA9IG5ldyBhcHAuUHJvamVjdCgge1xuICB0aXRsZTogXCJQaWcgQ2F2ZVwiLFxuICBzdWJ0aXRsZTogXCJTdG9yeS1jcmVhdGlvbiBBcHBcIixcbiAgZGVzY3JpcHRpb246IFwiVGhpcyBhcHAncyBmb3VuZGF0aW9uIGlzIGEgd29yZC1zb3J0aW5nIGFsZ29yaXRobSB0aGF0IHBhaXJzIHNpbWlsYXIgdGV4dHMgdG9nZXRoZXIuIFRoZSBkYXRhIGNvbWVzIGZyb20gdHdvIHdlYnNpdGVzIEkgc2NyYXBlZCBhbmQgaXMgaG91c2VkIGluIGFuIEFQSSBidWlsdCBvbiBSYWlscy4gVGhlIG9yaWdpbmFsIGltYWdlcyB3ZXJlIGRyYXduIGluIFBob3Rvc2hvcCBhbmQgYW5pbWF0ZWQgd2l0aCBTa3JvbGxyLmpzLlwiLFxuICB0ZWNobm9sb2dpZXM6IFwiQmFja2JvbmUuanMsIFNrcm9sbHIuanMsIGpRdWVyeSwgUnVieSBvbiBSYWlscywgSlNPTiwgUGhvdG9zaG9wXCIsXG4gIGltYWdlczogW1wiY3NzL2ltYWdlcy9waWdjYXZlL3BpZy1jYXZlLXByb2plY3QucG5nXCIsIFwiY3NzL2ltYWdlcy9waWdjYXZlL293bC5wbmdcIiwgXCJjc3MvaW1hZ2VzL3BpZ2NhdmUvbGFzZXIucG5nXCJdLFxuICBsaW5rOiBcImh0dHA6Ly9waWdjYXZlLmNvbVwiLFxuICBnaXRodWI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0hvbGRlcm5lc3MvUGlnX0NhdmVfSlNfQ2xpZW50XCIsXG4gIGdpdGh1Ykljb246IFwiY3NzL2ltYWdlcy9naXRodWItaWNvbi5wbmdcIlxufSk7XG5cbnZhciBia2xzdFByb2plY3QgPSBuZXcgYXBwLlByb2plY3QoIHtcbiAgdGl0bGU6IFwiQksgTFNUXCIsXG4gIHN1YnRpdGxlOiBcIlBlcnNvbmFsIExpYnJhcnkgQXBwXCIsXG4gIGRlc2NyaXB0aW9uOiBcIlRoaXMgc2luZ2xlLXBhZ2UgYXBwIG9mZmVycyB0aGUgYWJpbGl0eSB0byBidWlsZCB5b3VyIG93biBkaWdpdGFsIGxpYnJhcnkuIFJhdGUsIGNvbW1lbnQsIHNlYXJjaCwgdXBsb2FkIGJvb2sgY292ZXJzOiBrZWVwIHRyYWNrIG9mIHRoZSBib29rcyB5b3UgcmVhZC5cIixcbiAgdGVjaG5vbG9naWVzOiBcIk5vZGUuanMsIEV4cHJlc3MuanMsIE1vbmdvREIsIE1vbmdvb3NlLCBNdWx0ZXIsIEFXUywgQmFja2JvbmUuanMsIE9BdXRoXCIsXG4gIGltYWdlczogW1wiY3NzL2ltYWdlcy9ia2xzdC9ia2xzdC5wbmdcIiwgXCJjc3MvaW1hZ2VzL2JrbHN0L3JlZ2lzdGVyLnBuZ1wiLCBcImNzcy9pbWFnZXMvYmtsc3QvY29tbWVudC5wbmdcIiwgXCJjc3MvaW1hZ2VzL2JrbHN0L2FkZGJvb2sucG5nXCIsIFwiY3NzL2ltYWdlcy9ia2xzdC9zb3J0LnBuZ1wiXSxcbiAgbGluazogXCJodHRwczovL2JrbHN0Lmhlcm9rdWFwcC5jb20vXCIsXG4gIGdpdGh1YjogXCJodHRwczovL2dpdGh1Yi5jb20vSG9sZGVybmVzcy9PXCIsXG4gIGdpdGh1Ykljb246IFwiY3NzL2ltYWdlcy9naXRodWItaWNvbi5wbmdcIlxufSk7XG5cbnZhciB3YWl0ZXJQcm9qZWN0ID0gbmV3IGFwcC5Qcm9qZWN0KCB7XG4gIHRpdGxlOiBcIldcIixcbiAgc3VidGl0bGU6IFwiUmVzdGF1cmFudCBNYW5hZ2VtZW50IENSVUQgQXBwXCIsXG4gIGRlc2NyaXB0aW9uOiBcIlRoZSBzeXN0ZW0gYWxsb3dzIHVzZXJzIHRvIGtlZXAgdHJhY2sgb2Ygb3JkZXJzLCB0YWJsZXMsIGFuZCBtZW51IGl0ZW1zLiBUaGUgZGVzaWduIGlzIG1pbmltYWwgYW5kIHRpZ2h0IGZvciBxdWljayBpbnRlcmFjdGlvbiBvbiBtb2JpbGUgZGV2aWNlcy5cIixcbiAgdGVjaG5vbG9naWVzOiBcIlNpbmF0cmEsIGpRdWVyeSwgUG9zdGdyZVNRTFwiLFxuICBpbWFnZXM6IFtcImNzcy9pbWFnZXMvd2FpdGVyLXByb2plY3QucG5nXCJdLFxuICBsaW5rOiBcImh0dHA6Ly8xOTIuMjQxLjI0My4xMDAvXCIsXG4gIGdpdGh1YjogXCJodHRwczovL2dpdGh1Yi5jb20vSG9sZGVybmVzcy9XYWl0ZXJcIixcbiAgZ2l0aHViSWNvbjogXCJjc3MvaW1hZ2VzL2dpdGh1Yi1pY29uLnBuZ1wiXG59KTtcblxudmFyIGhhbmdtYW5nbGVyUHJvamVjdCA9IG5ldyBhcHAuUHJvamVjdCh7XG4gIHRpdGxlOiBcIkhhbmdtYW5nbGVyIEhlbHBlclwiLFxuICBzdWJ0aXRsZTogXCJHYW1pbmcgQXBwXCIsXG4gIGRlc2NyaXB0aW9uOiBcIlBsYXkgaGFuZ21hbiBvciB0aWMtdGFjLXRvZSBpbiB0aGlzIEFTQ0lJIGFydCB0aGVtZWQgZ2FtaW5nIGFwcC4gIEl0J3MgZ290IHRhbGtpbmcgY293cywgbW92aW5nIGNsb3VkcywgYW5kIGV4aXN0ZW50aWFsaXNtLlwiLFxuICB0ZWNobm9sb2dpZXM6IFwiU2luYXRyYSwgalF1ZXJ5LCBQb3N0Z3JlU1FMLCBCY3J5cHQsIEFKQVhcIixcbiAgaW1hZ2VzOiBbXCJjc3MvaW1hZ2VzL2hhbmdtYW5nbGVyL2hhbmdtYW5nbGVyLXByb2plY3QucG5nXCIsIFwiY3NzL2ltYWdlcy9oYW5nbWFuZ2xlci9xdWlub2EucG5nXCIsIFwiY3NzL2ltYWdlcy9oYW5nbWFuZ2xlci91ZGRlcnMucG5nXCIsXCJjc3MvaW1hZ2VzL2hhbmdtYW5nbGVyL2hhbmdtYW4ucG5nXCIsIFwiY3NzL2ltYWdlcy9oYW5nbWFuZ2xlci9jb3d0dXJuLnBuZ1wiXSxcbiAgbGluazogXCJodHRwczovL2hhbmdtYW5nbGVyaGVscGVyLmhlcm9rdWFwcC5jb20vXCIsXG4gIGdpdGh1YjogXCJodHRwczovL2dpdGh1Yi5jb20vSG9sZGVybmVzcy9IYW5nbWFuZ2xlci1IZWxwZXJcIixcbiAgZ2l0aHViSWNvbjogXCJjc3MvaW1hZ2VzL2dpdGh1Yi1pY29uLnBuZ1wiXG59KTtcblxudmFyIHBpcXVlUHJvamVjdCA9IG5ldyBhcHAuUHJvamVjdCh7XG4gIHRpdGxlOiBcIlBpcXVlXCIsXG4gIHN1YnRpdGxlOiBcIk5ldHdvcmtpbmcgUGxhdGZvcm1cIixcbiAgZGVzY3JpcHRpb246IFwiQSBkaXNjb3ZlcnkgcGxhdGZvcm0gZm9yIHByb2Zlc3Npb25hbHMgbG9va2luZyBmb3IgYW4gZWZmZWN0aXZlIHdheSB0byBuZXR3b3JrLiBQaXF1ZSB1c2VycyBjYW4gZGV2aXNlIGFuZCBzY3VscHQgYSBsaXN0IG9mIHByb2Zlc3Npb25hbCBjb250YWN0cyBmaW5kaW5nIG90aGVycyB0aHJvdWdoIHByb2Zlc3Npb25hbCBhbmQgc29jaWFsIGludGVyZXN0cywgaW5kdXN0cnksIGFuZCBtb3JlLlwiLFxuICB0ZWNobm9sb2dpZXM6IFwiUnVieSBvbiBSYWlscywgalF1ZXJ5LCBQb3N0Z3JlU1FMLCBCY3J5cHQsIEFKQVgsIFBhcGVyY2xpcFwiLFxuICBpbWFnZXM6IFtcImNzcy9pbWFnZXMvcGlxdWUvZGlzY292ZXJfcHJvamVjdHMxLnBuZ1wiLCBcImNzcy9pbWFnZXMvcGlxdWUvZGlzY292ZXJfcHJvamVjdHMyLnBuZ1wiLCBcImNzcy9pbWFnZXMvcGlxdWUvcGlxdWVfbXNnLmpwZ1wiLCBcImNzcy9pbWFnZXMvcGlxdWUvcGlxdWVfcHJvZmlsZS5qcGdcIiwgXCJjc3MvaW1hZ2VzL3BpcXVlL2NyZWF0ZV9wcm9qZWN0MS5wbmdcIiwgXCJjc3MvaW1hZ2VzL3BpcXVlL2NyZWF0ZV9wcm9qZWN0My5wbmdcIl0sXG4gIGxpbms6IFwiamF2YXNjcmlwdDp2b2lkKDApO1wiLFxuICBnaXRodWI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3BpcXVlYXBwL3BpcXVlMlwiLFxuICBnaXRodWJJY29uOiBcImNzcy9pbWFnZXMvZ2l0aHViLWljb24ucG5nXCJcbn0pO1xuXG52YXIgY2hqYXRQcm9qZWN0ID0gbmV3IGFwcC5Qcm9qZWN0KHtcbiAgdGl0bGU6IFwiQ2hqYXRcIixcbiAgc3VidGl0bGU6IFwiUmVhbC1UaW1lIENoYXQgQXBwbGljYXRpb25cIixcbiAgZGVzY3JpcHRpb246IFwiQ2hhdCBpbnN0YW50bHkgdGhyb3VnaCB0aGlzIGxpZ2h0d2VpZ2h0IGFwcC4gQ3JlYXRlIGFuZCBwZXJzb25hbGl6ZSBhIGNoYXRyb29tIG9yIHRhbGsgZGlyZWN0bHkgdG8gYW5vdGhlciB1c2VyLiBDaGphdCB1c2VzIFNvY2tldC5pbyBmb3IgbGlnaHRuaW5nIGZhc3QgY29tbXVuaWNhdGlvbiwgQVdTIGZvciBpbWFnZSBhbmQgZ2lmIHN0b3JhZ2UsIGFuZCBNb25nb0RCIHRvIHNhdmUgYWxsIHlvdXIgY29udmVyc2F0aW9ucy5cIixcbiAgdGVjaG5vbG9naWVzOiBcIk5vZGUuanMsIEV4cHJlc3MuanMsIFNvY2tldC5pbywgTW9uZ29kYiwgQmFja2JvbmUuanMsIEFXUywgR3VscC5qcywgU0FTUywgT0F1dGhcIixcbiAgaW1hZ2VzOiBbXG4gICAgXCJjc3MvaW1hZ2VzL2NoamF0L3JlZ2lzdGVyLnBuZ1wiLFxuICAgIFwiY3NzL2ltYWdlcy9jaGphdC9jaGF0cm9vbS5wbmdcIixcbiAgICBcImNzcy9pbWFnZXMvY2hqYXQvY2hhdHJvb20taW1hZ2UucG5nXCIsXG4gICAgXCJjc3MvaW1hZ2VzL2NoamF0L2ltYWdlLXVwbG9hZC5wbmdcIixcbiAgICBcImNzcy9pbWFnZXMvY2hqYXQvaW52aXRhdGlvbi5wbmdcIixcbiAgICBcImNzcy9pbWFnZXMvY2hqYXQvbW9iaWxlLWNoYXRyb29tLnBuZ1wiLFxuICAgIFwiY3NzL2ltYWdlcy9jaGphdC9tb2JpbGUtc2xpZGUtc2NyZWVuLnBuZ1wiLFxuICAgIFwiY3NzL2ltYWdlcy9jaGphdC9tb2JpbGUtbW9kYWwucG5nXCIsXG4gIF0sXG4gIGxpbms6IFwiaHR0cDovL3d3dy5jaGphdC5jb21cIixcbiAgZ2l0aHViOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9Ib2xkZXJuZXNzL0NoamF0XCIsXG4gIGdpdGh1Ykljb246IFwiY3NzL2ltYWdlcy9naXRodWItaWNvbi5wbmdcIlxufSk7XG5cblxuXG5cbiQoZnVuY3Rpb24oKXtcblxuICB2YXIgYmxpbmtpdHlQaWcgPSBmdW5jdGlvbiBibGlua2l0eVBpZygpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICQoJy5mbHktcGlnLWNsb3NlZC1leWVzJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICB9LCA4MDApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICQoJy5mbHktcGlnLWNsb3NlZC1leWVzJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgIH0sIDkwMCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgJCgnLmZseS1waWctY2xvc2VkLWV5ZXMnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgIH0sIDExMDApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICQoJy5mbHktcGlnLWNsb3NlZC1leWVzJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgIH0sIDEyMDApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICQoJy5mbHktcGlnLWNsb3NlZC1leWVzJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICB9LCA0MTAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAkKCcuZmx5LXBpZy1jbG9zZWQtZXllcycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICB9LCA0MjAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAkKCcuZmx5LXBpZy1jbG9zZWQtZXllcycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgfSwgNzAwMCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgJCgnLmZseS1waWctY2xvc2VkLWV5ZXMnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgfSwgNzEwMCk7XG4gIH07XG5cbiAgdmFyIGJsaW5rTXlQaWcgPSBmdW5jdGlvbiBibGlua015UGlnKCkge1xuICAgICQoJy5mbHktcGlnLWNsb3NlZC1leWVzJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGJsaW5raXR5UGlnKCk7XG4gICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgYmxpbmtpdHlQaWcoKTtcbiAgICAgIH0sIDEwMDAwKTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgYm9sZE5hdkVsID0gZnVuY3Rpb24gYm9sZE5hdkVsKCkge1xuICAgICQoJyNuYXYgYScpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAkKCcjbmF2JykuZmluZCgnLmJvbGQtbmF2JykucmVtb3ZlQ2xhc3MoJ2JvbGQtbmF2Jyk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdib2xkLW5hdicpO1xuICAgIH0pO1xuICB9O1xuXG5cbiAgXG5cblxuICBibGlua015UGlnKCk7XG4gIGJvbGROYXZFbCgpO1xuXG5cbiAgLy8gcmVzZXRzIGFuaW1hdGlvbnMgb24gc2NyZWVuIHJlc2l6ZVxuICAvLyAkKHdpbmRvdykucmVzaXplKCkuZG9uZShmdW5jdGlvbigpeyBsb2NhdGlvbi5yZWxvYWQoKTt9KTtcblxuLy8gdmFyIHJlc2l6ZVRpbWVyO1xuLy8gJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbihlKSB7XG4vLyAgIGNsZWFyVGltZW91dChyZXNpemVUaW1lcik7XG4vLyAgIHJlc2l6ZVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbi8vICAgICBsb2NhdGlvbi5yZWxvYWQoKSAgICAgIFxuLy8gICB9LCAyNTApO1xuLy8gfSk7XG4vLyBhYm92ZSBjb2RlIGlzIHRoZSBzYW1lIGFzIGRlYm91bmNpbmdcblxuLy8gJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbi8vICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbi8vIH0sIDUwMCkpO1xuXG5cblxuXG59KTsiLCJ2YXIgYXBwID0gYXBwIHx8IHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgYXBwLkFwcFJvdXRlciA9IEJhY2tib25lLlJvdXRlci5leHRlbmQoe1xuICAgIHJvdXRlczoge1xuICAgICAgXCJcIjogXCJjb250YWN0XCIsXG4gICAgICBcImNvbnRhY3RcIjogXCJjb250YWN0XCIsXG4gICAgICBcInBvcnRmb2xpb1wiOiBcInBvcnRmb2xpb1wiLFxuICAgICAgXCJwb3J0Zm9saW8vOnByb2plY3RcIjogXCJwcm9qZWN0XCIsXG4gICAgICBcIndyaXRpbmdcIjogXCJ3cml0aW5nXCJcbiAgICB9LFxuICAgIGNvbnRhY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5jb250YWN0TGlua0xpc3RWaWV3ID0gbmV3IGFwcC5MaW5rTGlzdFZpZXcoe2NvbGxlY3Rpb246IGNvbnRhY3RsaW5rTGlzdCxcbiAgICAgICAgY2xhc3NOYW1lOiBcImNvbnRhY3RcIn0pO1xuICAgICAgYXBwLm5hdkxpbmtMaXN0Vmlldy5nb3RvKHRoaXMuY29udGFjdExpbmtMaXN0Vmlldyk7XG4gICAgICB0aGlzLmhvbWVWaWV3ID0gbmV3IGFwcC5Ib21lVmlldyh7fSk7XG4gICAgICB0aGlzLmJvbGROYXZFbCgnY29udGFjdCcpO1xuICAgIH0sXG4gICAgcG9ydGZvbGlvOiBmdW5jdGlvbihwYWdlUm91dGUpIHtcbiAgICAgIHRoaXMucG9ydGZvbGlvTGlua0xpc3RWaWV3ID0gbmV3IGFwcC5MaW5rTGlzdFZpZXcoe2NvbGxlY3Rpb246IHBvcnRmb2xpb2xpbmtMaXN0LFxuICAgICBjbGFzc05hbWU6IFwicG9ydGZvbGlvXCJ9KTtcbiAgICAgIGFwcC5uYXZMaW5rTGlzdFZpZXcuZ290byh0aGlzLnBvcnRmb2xpb0xpbmtMaXN0Vmlldyk7XG4gICAgICB0aGlzLnBpZ2NhdmVQcm9qZWN0VmlldyA9IG5ldyBhcHAuUHJvamVjdFZpZXcoe21vZGVsOiBwaWdjYXZlUHJvamVjdH0pO1xuICAgICAgdGhpcy5ib2xkTmF2RWwoJ3BvcnRmb2xpbycpO1xuICAgIH0sXG4gICAgcHJvamVjdDogZnVuY3Rpb24ocHJvamVjdCl7XG4gICAgICB2YXIgcHJvamVjdExpc3QgPSB7XG4gICAgICAgIHBpcXVlOiBwaXF1ZVByb2plY3QsXG4gICAgICAgIHBpZ2NhdmU6IHBpZ2NhdmVQcm9qZWN0LFxuICAgICAgICBoYW5nbWFuZ2xlcjogaGFuZ21hbmdsZXJQcm9qZWN0LFxuICAgICAgICBia2xzdDogYmtsc3RQcm9qZWN0LFxuICAgICAgICBjaGphdDogY2hqYXRQcm9qZWN0XG4gICAgICB9O1xuICAgICAgdGhpcy5wcm9qZWN0VmlldyA9IG5ldyBhcHAuUHJvamVjdFZpZXcoe21vZGVsOiBwcm9qZWN0TGlzdFtwcm9qZWN0XX0pO1xuICAgICAgaWYgKCFhcHAubmF2TGlua0xpc3RWaWV3Lmhhc093blByb3BlcnR5KCdjdXJyZW50VmlldycpKSB7XG4gICAgICAgIHRoaXMucG9ydGZvbGlvTGlua0xpc3RWaWV3ID0gbmV3IGFwcC5MaW5rTGlzdFZpZXcoe2NvbGxlY3Rpb246IHBvcnRmb2xpb2xpbmtMaXN0LFxuICAgICAgICAgY2xhc3NOYW1lOiBcInBvcnRmb2xpb1wifSk7XG4gICAgICAgIGFwcC5uYXZMaW5rTGlzdFZpZXcuZ290byh0aGlzLnBvcnRmb2xpb0xpbmtMaXN0Vmlldyk7XG4gICAgICB9XG4gICAgICBcbiAgICB9LFxuICAgIHdyaXRpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy53cml0aW5nVmlldyA9IG5ldyBhcHAuV3JpdGluZ1ZpZXcoe30pO1xuICAgICAgdGhpcy53cml0aW5nTGlua0xpc3RWaWV3ID0gbmV3IGFwcC5MaW5rTGlzdFZpZXcoe2NvbGxlY3Rpb246IHdyaXRpbmdsaW5rTGlzdCxcbiAgICAgICBjbGFzc05hbWU6IFwid3JpdGluZ1wifSk7XG4gICAgICBhcHAubmF2TGlua0xpc3RWaWV3LmdvdG8odGhpcy53cml0aW5nTGlua0xpc3RWaWV3KTtcbiAgICAgIGFwcC5uYXZMaW5rTGlzdFZpZXcuc2V0UHViVmlld0xpc3RlbmVyKCk7XG4gICAgICB0aGlzLmJvbGROYXZFbCgnd3JpdGluZycpO1xuICAgIH0sXG4gICAgYm9sZE5hdkVsOiBmdW5jdGlvbihuYXYpIHtcbiAgICAgICQoJyNuYXYnKS5maW5kKCcuYm9sZC1uYXYnKS5yZW1vdmVDbGFzcygnYm9sZC1uYXYnKTtcbiAgICAgICQoJyMnICsgbmF2KS5hZGRDbGFzcygnYm9sZC1uYXYnKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgYXBwLnJvdXRlciA9IG5ldyBhcHAuQXBwUm91dGVyKCk7XG4gIGFwcC5uYXZMaW5rTGlzdFZpZXcgPSBuZXcgYXBwLk5hdkxpbmtMaXN0VmlldygpO1xuICBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KCk7XG5cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
