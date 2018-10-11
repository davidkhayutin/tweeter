$(() => {

function loadAllTweets(){
  $.ajax("/tweets").then((product) => {
    renderTweets(product);
  })
}


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
        loadAllTweets();
      })

    })

  function createTweetElement(tweetObject){
    return $("<article>").addClass("tweeted")
        .append($("<header>")
          .append($("<img>").attr("src", tweetObject.user.avatars.small))
          .append($("<h4>").text(tweetObject.user.name))
          .append($("<h6>").text(tweetObject.user.handle))
        )
        .append($("<div>").text(tweetObject.content.text))
        .append($("<footer>")
          .append($("<h6>").text(tweetObject.created_at))
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

  loadAllTweets();
//deligation

  $(".tweetfeed").on('click', "li span .fa-heart",(event) =>{
    $(event.target).toggleClass("toManyCharacters");
  })


  $("nav button").click(function(){
    console.log("click")
    $(".new-tweet").toggle();
    $(".new-tweet input:text, .new-tweet textarea").first().focus();
  })

});