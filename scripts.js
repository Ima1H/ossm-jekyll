$(document).ready(function() {
  $('.accordion input').on('change', function() {
      if ($(this).is(':checked')) {
          // Close other accordion sections
          $('.accordion input').not(this).prop('checked', false);
          
          // Set other chevrons to point down
          $('.accordion input').not(this).next('.accordion-title').find('.chevron i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
          
          // Set current chevron to point up
          $(this).next('.accordion-title').find('.chevron i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      } else {
          // If unchecked, set chevron to down
          $(this).next('.accordion-title').find('.chevron i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      }
  });
  
  // Hamburger menu
  $('.hamburger-button').click(function(){
    $('.hamburger-button').toggleClass('active');
    $('.mobile-menu').toggleClass('active');
  });

  
  //Visage Treatment Carousel
  $('.slider-container').slick({
      autoplay: true,         // Do we want it to autoplay? true or false
      autoplaySpeed: 3000,    // How long between each slide when auto-playing
      speed: 1000,             // How fast is the transition in milliseconds
      arrows: true,           // Do you want to show arrows to trigger each slide
      accessibility: true,    // Enables keyboard tabbing and arrow key navigation
      dots: true,             // Enables the dots below to show how many slides
      fade: false,            // Changes the animate from slide to fade if true
      infinite: true,        // When true, means that it will scroll in a circle
      pauseOnHover: true,    // When true means the autoplay pauses when hovering
      pauseOnDotsHover: true, // Pauses the autoplay when hovering over the dots
    slidesToShow: 3,
    slidesToScroll: 1, 
    responsive: [ //responsive gallery so when you have a small screen, it shows only one picture. When you watch on a desktop, it shows more pictures
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          //infinite: true, //if you want it different on mobile, you let this in your code
          //dots: true
        }
      }
     ]
  });

  lightGallery(document.getElementById('lightgallery'), {
    speed: 500,
    download: false
  });

  //Animate on scroll activate
  AOS.init();


  //filterable prices
  $('#portfolio-filter span').click(function(){
    
    // Remove class 'active' from any <span> that is currently active 
    $('#portfolio-filter .active').removeClass('active');
    
    // give this <span> that was clicked on a class of 'active' 
    $(this).addClass('active');

    // get the name of the cateory from this <span>, remove up to two spaces from the text and replace them with dashes, and make it lowercase 
    var filterVal = $(this).text().replace(' ','-').replace(' ','-').toLowerCase();

    // This is something new, it's an 'each' function which is basically iterates through each element that matches the selector and applies the function one by one.
    
    $('#filterable-gallery .gallery-item').each(function() {
      
        // If the filter value that they have clicked on is 'all' then remove the class of hidden from each gallery-item. 

        if (filterVal == 'all') {
          $(this).removeClass('hidden');
          
        }
      
        // if it's not all, then 
        else {
           if($(this).hasClass(filterVal)) {
              $(this).removeClass('hidden'); // show those that have the filter class
             
            }
          else {
              $(this).addClass('hidden'); // hide those that do not have the filter
            }};
        });
      
});

});

