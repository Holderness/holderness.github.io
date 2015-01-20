$(function(){
  if ($(window).width() < 650) {
    $('.link').hover(function() {
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
      },200);
    });
  } else {
    $('.link').hover(function() {
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
      },200);
    });
	}
  
  if ($(window).width() < 650) {
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
  } else {
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
  }

  var blinkity = function blinkity(){
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
    }, 7000);
    setTimeout(function(){
      $('.fly-pig-closed-eyes').css('visibility', 'hidden');
    }, 7100);
  };
        
  $('.fly-pig-closed-eyes').each(function() {
    var that = $(this);
    blinkity();
    setInterval(function() {
      blinkity();
    }, 10000);
  });


   $(window).resize(function(){location.reload();});


});