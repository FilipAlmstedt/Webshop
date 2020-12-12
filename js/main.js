$(function() {
    $(".toggle").on("click",openMobileNavbar);
});

/*Aktiverar klassen active i css som gör att navbar visas vertikalt i mobilt läge*/ 
function openMobileNavbar(){
    if ($(".item").hasClass("active")) {
        $(".item").removeClass("active");
    } 
    else {
        $(".item").addClass("active");
    }
}
