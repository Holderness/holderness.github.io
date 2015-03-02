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

var contactlinkList = new LinkList([ githubLink, linkedinLink, mailtoLink ]);
var portfoliolinkList = new LinkList([ pigcaveLink, hangmanglerLink, waiterLink]);
var fictionlinkList = new LinkList([ githubLink, linkedinLink, mailtoLink ]);


var pigcaveProject = new Project( {
  title: "blurg",
  description: "blah",
  image: "blag"
});

var waiterProject = new Project( {
  title: "blurg",
  description: "blah",
  image: "blag"
});

var hangmanglerProject = new Project({
  title: "blurg",
  description: "blah",
  image: "blag"
});


$(function(){

  var pigTongueBlep = function pigTongueBlep(marginTop, marginLeft) {
    $('.pig-image').hover(function() {
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
  };

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


  if ($(window).width() < 650) {
    pigTongueBlep(-9,-3);
  } else {
    pigTongueBlep(-18, -7);
  }


  blinkMyPig();
  boldNavEl();


  // resets animations on screen resize
  $(window).resize(function(){ location.reload();});




});