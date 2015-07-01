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

var publicationLink = new app.LinkItem( {
  url: "#writing",
  image: "css/images/mermaids-purse.png",
  id: "mermaids-purse"
});

var contactlinkList = new app.LinkList([ githubLink, linkedinLink, mailtoLink ]);
var portfoliolinkList = new app.LinkList([ pigcaveLink, hangmanglerLink, bklstLink, piqueLink]);
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
  description: "A discovery platform for professionals who are looking for an effective way to network. Pique users can create a profile and devise and sculpt a list of professional contacts. Users find others based on professional interests, social interests, industry, and more.",
  technologies: "Ruby on Rails, jQuery, PostgreSQL, Bcrypt, AJAX, Paperclip",
  images: ["css/images/pique/discover_projects1.png", "css/images/pique/discover_projects2.png", "css/images/pique/pique_msg.jpg", "css/images/pique/pique_profile.jpg", "css/images/pique/create_project1.png", "css/images/pique/create_project3.png"],
  link: "javascript:void(0);",
  github: "https://github.com/piqueapp/pique2",
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