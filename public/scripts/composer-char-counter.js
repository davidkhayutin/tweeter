$(document).ready(function() {
  console.log("I am here and ready");

  let keysPressed = $("textarea").on('keyup', function(){
   $(".counter").text(140 - ($(this).val().length))
   if($(".counter").text() < 0){
    $(".counter").addClass("toManyCharacters");
   } else if($(".counter").text() >= 0 && $(".counter").hasClass("toManyCharacters")){
    $(".counter").removeClass("toManyCharacters");
   }
  });
});
