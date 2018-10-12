$(() => {

  //A function for structuring each tweet to the appropriate HTML & CSS style
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

  //A funciton to render the newly created tweets into the main tweet body
  function renderTweets (data) {
    $(".tweetfeed").empty();
    data.forEach((tweet) =>{
      $(".tweetfeed").prepend(createTweetElement(tweet))
    })
  }

  // An Ajax function which renders new tweets onto the page without refreshing page - seamless transition
  function loadAllTweets(){
    $.ajax("/tweets").then((product) => {
      renderTweets(product);
    })
  }

  loadAllTweets();

  //initial setting for the tweet creation box
  $(".new-tweet").slideToggle(0);

  $(".tweetfeed").on('click', "li span .fa-heart",(event) =>{
    $(event.target).toggleClass("toManyCharacters");
  })

  //A small addition that closes that tweet box in its current state (errors included) if the user chooses to wait before tweeting
  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
     console.log($(".new-tweet").css("display"))
    if(scroll > 230 && $(".new-tweet").css("display") === "inline-block"){
      $(".new-tweet").slideUp();
    }
  });

  //the following actions when the new tweet botton is "clicked"
  $("nav button").click(function(){
    $(".new-tweet").slideToggle();
    $(".new-tweet input:text, .new-tweet textarea").first().focus();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  })

  //the tweet submission button with present requirements of constitutes an acceptable new tweet
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