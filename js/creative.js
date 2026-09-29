/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    var navHeight = function() {
        var $header = $('.site-header');
        if ($header.length) {
            return $header.outerHeight();
        }
        return $('#mainNav').outerHeight() || 0;
    };

    $('a.page-scroll[href^="#"]').bind('click', function(event) {
        var $anchor = $(this);
        var $target = $($anchor.attr('href'));
        if ($target.length) {
            $('html, body').stop().animate({
                scrollTop: ($target.offset().top - navHeight())
            }, 1250, 'easeInOutExpo');
            event.preventDefault();
        }
    });

    // Highlight the top nav as scrolling occurs
    if ($('#contact').length) {
        $('body').scrollspy({
            target: '.navbar-fixed-top',
            offset: navHeight() + 1
        });
    }

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("header h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

    // Resume side rail: mobile toggle + active section highlighting
    if ($('#resume').length) {
        var $sideNav = $('#sideNavMenu');
        var $sideToggle = $('#sideNavToggle');
        var $sideLinks = $('#sideNavLinks a.page-scroll');

        $sideToggle.on('click', function() {
            var open = !$sideNav.hasClass('is-open');
            $sideNav.toggleClass('is-open', open);
            $sideToggle.attr('aria-expanded', open ? 'true' : 'false');
        });

        $sideLinks.on('click', function() {
            $sideNav.removeClass('is-open');
            $sideToggle.attr('aria-expanded', 'false');
        });

        var sectionIds = $sideLinks.map(function() {
            return $(this).attr('href');
        }).get();

        var setActiveSideLink = function() {
            var scrollPos = $(window).scrollTop() + navHeight() + 40;
            var current = sectionIds[0];

            $.each(sectionIds, function(_, id) {
                var $section = $(id);
                if ($section.length && $section.offset().top <= scrollPos) {
                    current = id;
                }
            });

            $sideLinks.parent().removeClass('active');
            $sideLinks.filter('[href="' + current + '"]').parent().addClass('active');
        };

        $(window).on('scroll resize', setActiveSideLink);
        setActiveSideLink();
    }

})(jQuery); // End of use strict
