var githubLink = new LinkItem( {
  url: "https://github.com/Holderness",
  image: "css/images/github-icon.png"
});

var linkedinLink = new LinkItem( {
  url: "https://www.linkedin.com/in/andersonholderness",
  image: "css/images/linked-in-icon.png"
});

var mailtoLink = new LinkItem( {
  url: "mailto:andersonholderness@gmail.com",
  image: "css/images/mail-icon.png"
});

var pigcaveLink = new LinkItem( {
  url: "http://pigcave.com",
  image: "css/images/pig-cave.png"
});

var waiterLink = new LinkItem( {
  url: "http://192.241.243.100/",
  image: "css/images/waiter-icon.png"
});

var hangmanglerLink = new LinkItem( {
  url: "https://hangmanglerhelper.herokuapp.com/",
  image: "css/images/hangmangler-icon.png"
});

var publicationLink = new LinkItem( {
  url: "http://www.salttooth.co/p/creative-writing-publications.html",
  image: "css/images/mermaids-purse.png"
});

var contactlinkList = new LinkList([ githubLink, linkedinLink, mailtoLink ]);
var portfoliolinkList = new LinkList([ pigcaveLink, hangmanglerLink, waiterLink]);
var writinglinkList = new LinkList([ publicationLink ]);


var pigcaveProject = new Project( {
  title: "Pig Cave",
  subtitle: "Story-creation App",
  description: "This app's foundation is a word-sorting algorithm that pairs similar texts together. The data comes from two websites I scraped and is housed in an API built on Rails. The original images were drawn in Photoshop and animated with Skrollr.js.",
  technologies: "Backbone.js, Skrollr.js, jQuery, Ruby on Rails, JSON, Photoshop",
  image: "css/images/pig-cave-project.png",
  link: "#portfolio/waiter",
  github: "https://github.com/Holderness/Pig_Cave_JS_Client",
  githubIcon: "css/images/github-icon.png"
});

var waiterProject = new Project( {
  title: "W",
  subtitle: "Restaurant Management CRUD App",
  description: "The system allows users to keep track of orders, tables, and menu items. The design is minimal and tight for quick interaction on mobile devices.",
  technologies: "Sinatra, jQuery, PostgreSQL",
  image: "css/images/waiter-project.png",
  link: "#portfolio/hangmangler",
  github: "https://github.com/Holderness/Waiter",
  githubIcon: "css/images/github-icon.png"
});

var hangmanglerProject = new Project({
  title: "Hangmangler Helper",
  subtitle: "Gaming App",
  description: "Play hangman or tic-tac-toe in this ASCII art themed gaming app.  It's got talking cows, moving clouds, and existentialism.",
  technologies: "Sinatra, jQuery, PostgreSQL, Bcrypt, AJAX",
  image: "css/images/hangmangler-project.png",
  link: "#portfolio/pigcave",
  github: "https://github.com/Holderness/Hangmangler-Helper",
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
  $(window).resize(function(){ location.reload();});




});