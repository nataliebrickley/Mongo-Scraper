
// $(".clear").on("click", function() {
//     console.log("clicked")
//     $.ajax({
//         method: "DELETE",
//         url: "/api/delete"
//     })
// })

//Save an article
$(document).on("click", ".save", function(){
    let id = $(this).attr("data-id");
    let title = $(this).attr("data-title")
    let link = $(this).attr("data-link")
    let summary = $(this).attr("data-summary")
    let image = $(this).attr("data-image")
    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
            // title: title,
            // summary: summary,
            // image: image,
            // link: link,
            saved: true
        }
    }).then(function(data){
        console.log(data);
    })
})