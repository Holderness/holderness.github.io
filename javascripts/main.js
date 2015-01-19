$(function(){
  if ($(window).width() < 650) {
    $('.link').hover(function() {
      $(this).animate({
        width: "75px",
      },200);
    },
    function() {
      $(this).animate({
        width: "60px",
      },200);
    });
  } else {
    $('.link').hover(function() {
      $(this).animate({
        width: "120px",
      },200);
    },
    function(){
      $(this).animate({
        width: "90px",
      },200);
    });
	}
  
  if ($(window).width() < 650) {
    $('.pig-image').hover(function() {
      $('.fly-pig-tongue').filter(':not(:animated)').animate({
        marginTop: 0,
        marginLeft: 0
      }, 2000);
    },
    function() {
      $('.fly-pig-tongue').animate({
        marginTop: -9,
        marginLeft: -3
      }, 200);
    });
  } else {
    $('.pig-image').hover(function() {
      $('.fly-pig-tongue').filter(':not(:animated)').animate({
        marginTop: 0,
        marginLeft: 0
      }, 2000);
    },
    function() {
      $('.fly-pig-tongue').animate({
        marginTop: -18,
        marginLeft: -7
      }, 200);
    });
  }

   $(window).resize(function(){location.reload();});


});