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

var LinkNavigation = {
  contact: contactlinkList,
  portfolio: portfoliolinkList
};



// var linkView = new LinkView({ model: githubLink });


$(function(){

  var growLinkOnHover = function growLinkOnHover() {
    console.log("growLinkOnHover loaded");
    $('.link-image').hover(function() {
      $(this).stop(true, false).animate({
        width: "130px",
        marginTop: -50,
        marginLeft: -20
      },200);
    },
    function(){
      $(this).stop(true, false).animate({
        width: "90px",
        marginTop: 0,
        marginLeft: 0
      },600);
    });
  };

  var growLinkOnHoverMobile = function growLinkOnHoverMobile() {
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
  };

  var pigTongueBlepMobile = function pigTongueBlepMobile() {
    $('.pig-image').hover(function() {
      $('.fly-pig-tongue').stop(true, false).animate({
        marginTop: 0,
        marginLeft: 0
      }, 2000);
    },
    function() {
      $('.fly-pig-tongue').stop(true, false).animate({
        marginTop: -9,
        marginLeft: -3
      }, 200);
    });
  };

  var pigTongueBlep = function pigTongueBlep() {
    $('.pig-image').hover(function() {
      $('.fly-pig-tongue').stop(true, false).animate({
        marginTop: 0,
        marginLeft: 0
      }, 2000);
    },
    function() {
      $('.fly-pig-tongue').stop(true, false).animate({
        marginTop: -18,
        marginLeft: -7
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
    pigTongueBlepMobile();
  } else {
    pigTongueBlep();
  }
  

  blinkMyPig();
  boldNavEl();


  // resets animations on screen resize
  $(window).resize(function(){ location.reload();});




});