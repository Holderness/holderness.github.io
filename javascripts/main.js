$(function(){

  var growLinkOnHoverMobile = function growLinkOnHover() {
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

  var growLinkOnHover = function growLinkOnHover() {
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


  var linkImageFadeOutSlide = function linkImageFadeOutSlide(){
    var images = $(".footer").find("img");
    $.each(images, function(i, el){
      var elleft = $(el).offset().left;
      $(el).css({
                  left: elleft,
                  opacity: 1
      }).animate({
                  left: '-=200px',
                  opacity: 0
      }, 1000);
    });
  };

  if ($(window).width() < 650) {
    growLinkOnHoverMobile();
    pigTongueBlepMobile();
  } else {
    growLinkOnHover();
    pigTongueBlep();
  }

  blinkMyPig();


  // resets animations on screen resize
  $(window).resize(function(){
    if ($(window).width() < 650) location.reload();
  });




});