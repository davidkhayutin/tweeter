$(document).ready(function() {

function loadAllTweets(){
    $.ajax("/tweets").then((product) => {
    renderTweets(product);
  })
}


    $('.new-tweet form').on("submit", (info)=>{

      info.preventDefault();
      let data = $(info.target).serialize();
      if((data.length) <= 5 || (data.length) > 140 ){
        alert("your content is not tweetable")
        data.preventDefault();
      }

      $.ajax("/tweets", {method: 'POST', data: data}).then(() =>{
        $(".new-tweet form")[0].reset();
        $(".tweetfeed").empty();
        loadAllTweets();
      })

    })

  function createTweetElement(tweetObject){
    return $("<article>").addClass("tweeted")
        .append($("<header>")
          .append($("<img src=" + tweetObject.user.avatars.small + ">"))
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
    for(var i = 0; i < data.length; i++){
      let tweet = createTweetElement(data[i]);
      $(".tweetfeed").append(tweet);
    }
  }

  loadAllTweets();

  $("nav button").click(function(){
    console.log("click")
    $(".new-tweet").toggle();
    $(".new-tweet input:text, .new-tweet textarea").first().focus();
  })

});