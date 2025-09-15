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

  
  //Carousel
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

  //Review Carousel
  $('.center').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
		

  //Project  Carousel
  $('.project-slider').slick({
      autoplay: false,         // Do we want it to autoplay? true or false
      autoplaySpeed: 3000,    // How long between each slide when auto-playing
      speed: 1000,             // How fast is the transition in milliseconds
      arrows: true,           // Do you want to show arrows to trigger each slide
      accessibility: true,    // Enables keyboard tabbing and arrow key navigation
      dots: true,             // Enables the dots below to show how many slides
      fade: false,            // Changes the animate from slide to fade if true
      infinite: false,        // When true, means that it will scroll in a circle
      pauseOnHover: true,    // When true means the autoplay pauses when hovering
      pauseOnDotsHover: true, // Pauses the autoplay when hovering over the dots
    slidesToShow: 6,
    slidesToScroll: 1, 
    responsive: [ // responsive gallery: mobiel minder, desktop meer
      {
        breakpoint: 1280, // < 1280px
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
          // infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 1024, // < 1024px
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768, // < 768px (tablet)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });


  lightGallery(document.getElementById('lightgallery'), {
    selector: '.box', 
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

/* ===== Booking module (default=adviseert, gele selectie, fallback link, deeplink) ===== */
$(function () {
  var $mods = $('.booking-module');
  if (!$mods.length) return;

  $mods.each(function () {
    var $mod = $(this);
    var defaultService = $mod.attr('data-default') || 'adviseert';
    var $serviceBtns = $mod.find('.service-btn');
    var $pkgs        = $mod.find('.pkg-btn');
    var $host        = $mod.find('#agenda-host');

    // init
    $pkgs.addClass('hidden');
    $host.html('<div class="agenda-placeholder">Selecteer een dienst en pakket om de agenda te laden.</div>');

    function selectService(service) {
      $serviceBtns
        .removeClass('is-selected').attr('aria-selected','false')
        .filter('[data-service="'+service+'"]')
        .addClass('is-selected').attr('aria-selected','true');

      $pkgs.removeClass('is-selected').addClass('hidden')
           .filter('[data-service="'+service+'"]').removeClass('hidden');

      $host.html('<div class="agenda-placeholder">Kies nu een pakket om de agenda te laden.</div>');
    }

    function selectPackage($btn) {
      $pkgs.removeClass('is-selected');
      $btn.addClass('is-selected');
    }

    function loadAgenda(url, provider, label) {
      var src = url;
      try {
        var u = new URL(url, window.location.href);
        if (provider === 'calendly') {
          u.searchParams.set('embed_domain', location.host || 'localhost');
          u.searchParams.set('embed_type', 'Inline');
        } else if (provider === 'tidycal') {
          u.searchParams.set('hide_title', '1');
          u.searchParams.set('hide_gdpr_banner', '1');
        }
        src = u.toString();
      } catch(e){}

      var $iframe = $('<iframe/>', {
        class: 'agenda-iframe',
        src: src,
        title: (label || 'Agenda') + ' – ' + provider,
        loading: 'lazy'
      });

      var $fallback = $('<p/>', { css: { margin: '0.5rem 1rem 1rem' } })
        .html('Zie je niets? <a class="agenda-fallback-link" target="_blank" rel="noopener" href="'+url+'">Open in nieuw tabblad</a>.');

      $host.empty().append($iframe, $fallback);

      // smooth scroll (handig als je van andere pagina komt)
      $('html, body').animate({ scrollTop: $host.offset().top - 80 }, 400);
    }

    // events
    $serviceBtns.on('click', function () {
      selectService($(this).data('service'));
    });

    $mod.find('#package-grid').on('click', '.pkg-btn', function () {
      var $b = $(this);
      selectPackage($b);
      loadAgenda($b.data('url'), $b.data('provider'), $.trim($b.text()));
    });

    // --- Deeplink: ?service=adviseert&package=brainstormsessie ---
    var params = new URLSearchParams(window.location.search);
    var qsService = params.get('service');          // 'adviseert' | 'ontwerpt'
    var qsPackage = params.get('package');          // bv. 'brainstormsessie'

    if (qsService) {
      selectService(qsService);
      if (qsPackage) {
        var $btn = $pkgs.filter('[data-service="'+qsService+'"][data-id="'+qsPackage+'"]').first();
        if ($btn.length) {
          selectPackage($btn);
          loadAgenda($btn.data('url'), $btn.data('provider'), $.trim($btn.text()));
          return; // klaar
        }
      }
      return; // service stond in URL, maar geen (geldige) package → gebruiker kiest zelf pakket
    }

    // geen deeplink → normale default
    selectService(defaultService);
  });
});




});