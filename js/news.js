function load(){
  return $.get("http://localhost:3000/api/v1/posts", function(data){
  })
}

load()
  .then((posts) => createPostsList(posts))

function createPost(post_id, posts){
  let post = posts.filter(post => post.id == post_id)[0];
  $("#description").text(post.description);
  $("#content").text(post.content);
}

function createPostsList(posts){
  posts.forEach(post => {
    $("#service-grid").append(`<li><a href="#" id="${post.id}" class="short-news"><i></i>${post.description}</a></div>`)
    $(`.short-news`).on("click", function(e){
      let post_id = e.target.id;
      createPost(post_id, posts);
    })
  })
}
