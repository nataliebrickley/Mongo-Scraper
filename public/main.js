
//Clear Articles (should not affect saved articles)
$(".clear").on("click", function() {
    console.log("clicked")
    $.ajax({
        method: "DELETE",
        url: "/api/clear"
    }).then(() => console.log("Cleared articles"))
})

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