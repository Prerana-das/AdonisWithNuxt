//slider 
// $(document).ready(function(){
//     $('.slider').owlCarousel({
//     items:1,
//     loop:true,
//     nav:true,
//     navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
//     });
// });


$(document).ready(function() {
new Typed(".element", {
    strings: ["Prerana"],
    typeSpeed: 100,
    loop: !0,
    fadeOut: !0
});
});

// clint slider 
$(document).ready(function(){
    $('.clint').owlCarousel({
    items:1,
    loop:true,
    dots:true,
    });
});

//wow js
// var wow = new WOW(
//             {
//     boxClass:     'wow',      
//     animateClass: 'animated',
//     offset:       0,         
//     mobile:       true,   
//     live:         true,    
//     callback:     function(box) {
//     },
//     scrollContainer: null 
//   }
// );
// wow.init();

//scroll to top		
$(document).ready(function(){
$(window).scroll(function(){
    if ($(this).scrollTop() > 300) {
        $('.scrollToTop').fadeIn();
    } else {
        $('.scrollToTop').fadeOut();
    }
});
$('.scrollToTop').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
});

});
