// Without the following js, Scrollspy doesn't doesn't use an offset during scroll
// which activates the menu items after the referenced section scrolls
// up past the bottom of the nav and the section heading disappears under the nav.
// ref: http://stackoverflow.com/questions/18244186/bootstrap-3-0-scrollspy-responsive-offsets?lq=1
// script.
$(window).on('load',function(){

    fixSpy();
    // hack to set the first link as the active link
    $('#first-link').addClass('active');
    $('#last-link').removeClass('active');

    function fixSpy(navCollapsed) {
        var $body   = $('body'), 
            $navtop = $('#navbar-ar');
        // grab a copy the scrollspy data for the element
        var data = $body.data('bs.scrollspy');
        if (data) {
            offset = $navtop.outerHeight();

            // Enable scrollSpy with correct offset based on height of navbar
            $body.scrollspy({ target: '#navbar-ar', offset: offset });
            // Apply only to .container-fluid (not .container, which is all the 
            // content below the home image) which is the home image under the navbar
            $('.container-fluid.scrollspy-ar').css('margin-top', offset);

            if(navCollapsed) {
              $body.css('padding-top', offset);
            }
            data.options.offset = offset
            $body.data('bs.scrollspy', data);
            $body.scrollspy('refresh');
        }
    }

    // on resize events
    var resizeTimer;
    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(fixSpy, 200);
    });

    $('#navbar-ar-collapse-1').on('shown.bs.collapse', function (event) {
        fixSpy();
    });          

    $('#navbar-ar-collapse-1').on('hidden.bs.collapse', function (event) {
        fixSpy(true);
    });          

    // All the anchors on the page that link to the page's sections are handled 
    // by this function. Otherwise, the navbar height is ignored.
    // To find out more on the selector "a[href^='#']": http://api.jquery.com/attribute-starts-with-selector/
    $("a[href^='#']").click(function (event) {
        var scrollPos = $('body > .scrollspy-ar').find($(this).attr('href')).offset().top - (offset - 1);
        $('body,html').animate({
            scrollTop: scrollPos
        }, 100, function () {
            $(".btn-navbar").click();
        });
    });
});    

// from http://getbootstrap.com/javascript/#modals-examples
$('#siteModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var modal = $(this)
  switch(button.data('whatever')) {
    case 'googleMap':
      var apiToken = window.apiToken;
      modal.find('.modal-body').html('<div class="embed-responsive embed-responsive-4by3"><iframe src=\'https://www.google.com/maps/embed/v1/place?zoom=16&q=37.7776%2C-122.4359&key='+apiToken+'\'></iframe></div>')
      break;
    case 'carousel':
      modal.find('.modal-body').load('/carousel')
      break;
    default:
      modal.find('.modal-body').html('No related modal content found')
  }    
})

$('#contact-by-email').on('click', function() {
  ga('send', 'event', 'link', 'click', 'contact-by-email'
    // , { 'hitCallback': function() { alert('hit sent'); } }
    );
});

$('#contact-by-phone').on('click', function() {
  ga('send', 'event', 'link', 'click', 'contact-by-phone');
});

$('#promotion-link').on('click', function() {
  ga('send', 'event', 'link', 'click', 'promotion-link');
});

$('#brand-price-link').on('click', function() {
  ga('send', 'event', 'link', 'click', 'brand-price-link');
});

$('#reviews-link').on('click', function() {
  ga('send', 'event', 'link', 'click', 'reviews-link');
});