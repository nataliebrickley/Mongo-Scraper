//Clear Articles (should not affect saved articles)
// $(".clear").on("click", function() {
//     console.log("clicked")
//     $.ajax({
//         method: "DELETE",
//         url: "/api/clear"
//     }).then(() => console.log("Cleared articles"))
// })

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
        console.log(data);
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
