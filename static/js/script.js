// Code for Materialize features
$(document).ready(function(){
    $('.sidenav').sidenav({edge: "right"});
    $('.modal').modal();
    $('.tabs').tabs();
    $('.collapsible').collapsible();
    $('input#input_text, textarea#textarea2').characterCounter();
    $('.carousel.carousel-slider').carousel({
      fullWidth: true
    });
  });
         