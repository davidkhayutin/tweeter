$(() => {

  function createTweetElement(tweetObject){
    let realTime = moment(tweetObject.created_at).fromNow();
    return $("<article>").addClass("tweeted")
      .append($("<header>")
        .append($("<img>").attr("src", tweetObject.user.avatars.small))
        .append($("<h4>").text(tweetObject.user.name))
        .append($("<h6>").text(tweetObject.user.handle))
      )
      .append($("<div>").text(tweetObject.content.text))
      .append($("<footer>")
        .append($("<h6>").text(realTime))
        .append($("<ul>")
          .append($("<li>").append($("<span>").append($("<i>").addClass("fa fa-heart"))))
          .append($("<li>").append($("<span>").append($("<i>").addClass("fa fa-retweet"))))
          .append($("<li>").append($("<span>").append($("<i>").addClass("fa fa-flag"))))

        )
      )
    }

  function renderTweets (data) {
    $(".tweetfeed").empty();
    for(var i = 0; i < data.length; i++){
      let tweet = createTweetElement(data[i]);
      $(".tweetfeed").prepend(tweet);

    }
  }

  function loadAllTweets(){
    $.ajax("/tweets").then((product) => {
      renderTweets(product);
    })
  }

  loadAllTweets();

   $(".new-tweet").slideToggle(0);

  // $(".tweetfeed").on('click', "li span .fa-heart",(event) =>{
  //   $(event.target).toggleClass("toManyCharacters");
  // })


  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
     console.log($(".new-tweet").css("display"))
    if(scroll > 230 && $(".new-tweet").css("display") === "inline-block"){
      $(".new-tweet").slideUp();
    }
  });


//   let status = false
//   $(".followMe").click(function(){
//     $(".followMe").text("ON")
//    }
// // $(".new-tweet").css(position: absolute)
//       })

  $("nav button").click(function(){
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet input:text, .new-tweet textarea").first().focus();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  })


  $('.new-tweet form').on("submit", (info)=>{

    info.preventDefault();
    let charactersEntered = $('.new-tweet form textarea').val().length
    let data = $(info.target).serialize();
    if(charactersEntered === 0) {
      $(".new-tweet form .error").text("You must enter something into a tweet!").addClass("errorTweet")
      return;
    }
    if(charactersEntered > 140){
      $(".new-tweet form .error").text("Your tweet is too long. Please Shorten!").addClass("errorTweet")
      return;
    }

    $.ajax("/tweets", {method: 'POST', data: data}).then(() =>{
      $(".new-tweet form")[0].reset();
      $(".counter").text(140);
      $(".new-tweet").slideToggle(0);
      loadAllTweets();
    })
  })

});