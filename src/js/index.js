$(function() {

  if (navigator.onLine) {
    $("#indicatorP").text("Online");
  } else {
    $("#indicatorP").text("Offline").css("color","red").css("font-weight","bold");
  }

});
