$(document).ready(function() {

  // Accordion functionality
  $('.accordion input').on('change', function() {
    if ($(this).is(':checked')) {
      // Close other accordion sections
      $('.accordion input').not(this).prop('checked', false);

      // Set other chevrons to point down
      $('.accordion input').not(this)
        .next('.accordion-title')
        .find('.chevron i')
        .removeClass('fa-chevron-up')
        .addClass('fa-chevron-down');

      // Set current chevron to point up
      $(this)
        .next('.accordion-title')
        .find('.chevron i')
        .removeClass('fa-chevron-down')
        .addClass('fa-chevron-up');
    } else {
      // If unchecked, set chevron to down
      $(this)
        .next('.accordion-title')
        .find('.chevron i')
        .removeClass('fa-chevron-up')
        .addClass('fa-chevron-down');
    }
  });

  
  // Hamburger menu
  
  $('.hamburger-button').click(function() {
    $('.hamburger-button').toggleClass('active');
    $('.mobile-menu').toggleClass('active');
  });

  
  // Algemene slider (home: .slider-container)
  
  $('.slider-container').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    arrows: true,
    accessibility: true,
    dots: true,
    fade: false,
    infinite: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  
  // Project Carousel (portfolio)
  
  $('.project-slider').slick({
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 1000,
    arrows: true,
    accessibility: true,
    dots: true,
    fade: false,
    infinite: false,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  });

  
  // Review Carousel (home)
  $('.review-slider').slick({
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 1000,
    arrows: true,
    accessibility: true,
    dots: true,
    fade: false,
    infinite: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
 

  
  // lightGallery
  
  if (document.getElementById('lightgallery')) {
    lightGallery(document.getElementById('lightgallery'), {
      selector: 'a',
      speed: 500,
      download: false
    });
  }

  
  // Animate on scroll
  
  AOS.init();

  
  // Filterable prices / portfolio
  
  $('#portfolio-filter span').click(function() {

    // Remove class 'active' from currently active <span>
    $('#portfolio-filter .active').removeClass('active');

    // give this <span> that was clicked on a class of 'active'
    $(this).addClass('active');

    // get the name of the category from this <span>
    var filterVal = $(this)
      .text()
      .replace(' ', '-')
      .replace(' ', '-')
      .toLowerCase();

    $('#filterable-gallery .gallery-item').each(function() {

      if (filterVal === 'all') {
        $(this).removeClass('hidden');
      } else {
        if ($(this).hasClass(filterVal)) {
          $(this).removeClass('hidden'); // show those that have the filter class
        } else {
          $(this).addClass('hidden'); // hide those that do not have the filter
        }
      }
    });
  });

  
  // Booking module (adviseert/ontwerpt, pakketten & agenda)
  
  (function() {
    var $mods = $('.booking-module');
    if (!$mods.length) return;

    $mods.each(function() {
      var $mod = $(this);
      var defaultService = $mod.attr('data-default') || 'adviseert';
      var $serviceBtns   = $mod.find('.service-btn');
      var $pkgs          = $mod.find('.pkg-btn');
      var $host          = $mod.find('#agenda-host');

      // init
      $pkgs.addClass('hidden');
      $host.html('<div class="agenda-placeholder">Selecteer een dienst en pakket om de agenda te laden.</div>');

      function selectService(service) {
        $serviceBtns
          .removeClass('is-selected').attr('aria-selected', 'false')
          .filter('[data-service="' + service + '"]')
          .addClass('is-selected').attr('aria-selected', 'true');

        $pkgs
          .removeClass('is-selected')
          .addClass('hidden')
          .filter('[data-service="' + service + '"]')
          .removeClass('hidden');

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
        } catch (e) {}

        var $iframe = $('<iframe/>', {
          class: 'agenda-iframe',
          src: src,
          title: (label || 'Agenda') + ' – ' + provider,
          loading: 'lazy'
        });

        var $fallback = $('<p/>', { css: { margin: '0.5rem 1rem 1rem' } })
          .html(
            'Zie je niets? <a class="agenda-fallback-link" target="_blank" rel="noopener" href="' +
            url +
            '">Open in nieuw tabblad</a>.'
          );

        $host.empty().append($iframe, $fallback);

        // smooth scroll
        $('html, body').animate({ scrollTop: $host.offset().top - 80 }, 400);
      }

      // events
      $serviceBtns.on('click', function() {
        selectService($(this).data('service'));
      });

      $mod.find('#package-grid').on('click', '.pkg-btn', function() {
        var $b = $(this);
        selectPackage($b);
        loadAgenda($b.data('url'), $b.data('provider'), $.trim($b.text()));
      });

      // Deeplink: ?service=adviseert&package=brainstormsessie
      var params     = new URLSearchParams(window.location.search);
      var qsService  = params.get('service');
      var qsPackage  = params.get('package');

      if (qsService) {
        selectService(qsService);
        if (qsPackage) {
          var $btn = $pkgs
            .filter('[data-service="' + qsService + '"][data-id="' + qsPackage + '"]')
            .first();
          if ($btn.length) {
            selectPackage($btn);
            loadAgenda($btn.data('url'), $btn.data('provider'), $.trim($btn.text()));
            return; // klaar
          }
        }
        return; // service stond in URL, maar geen (geldige) package
      }

      // geen deeplink → normale default
      selectService(defaultService);
    });
  })();

});
