
//Save an article
$(document).on("click", ".save", function(){
    let id = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
            saved: true
        }
    }).then(function(data){
        console.log(data);
        location.reload();
    })
})

//delete a saved article
$(document).on("click", ".delete-one", function(){
    let id = $(this).attr("data-id");

    $.ajax({
        method: "DELETE",
        url: "/articles/" + id,
        data: {
            saved: false
        }
    }).then(function(data){
        location.reload();
    })
})

//Delete a comment
$(document).on("click", ".deleteComment", function(){
    let id = $(this).attr("data-id");

    $.ajax({
        method: "DELETE",
        url: `/api/${id}/comments`
    }).then(function(data){
        location.reload();
    })
})

//post a comment
$(document).on("click", ".submit", function() {
    event.preventDefault();
    let id= $(this).attr("data-id");
    let text=$("#comment-" + id).val()
    console.log(text)
    $.ajax({
        method: "POST",
        url: `/api/${id}/comments`,
        data: {
            body: text
        }
    }).then(function(data) {
        console.log(data)
        location.reload()
    })
})