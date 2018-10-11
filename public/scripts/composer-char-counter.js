$(document).ready(function() {
  console.log("I am here and ready");

  let keysPressed = $("textarea").on('keyup', function(){
    $(".new-tweet form .error").text("").removeClass("errorTweet")
   $(".counter").text(140 - ($(this).val().length))
   if($(".counter").text() < 0){
    $(".counter").addClass("toManyCharacters");
   } else if($(".counter").text() >= 0 && $(".counter").hasClass("toManyCharacters")){
    $(".counter").removeClass("toManyCharacters");
   }
  });

  $(".tweeted:hover").click(function(){
    console.log("clicked");
  })







});
