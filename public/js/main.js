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
var portfoliolinkList = new app.LinkList([ pigcaveLink, hangmanglerLink, justokayreadsLink, piqueLink, chjatLink]);
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