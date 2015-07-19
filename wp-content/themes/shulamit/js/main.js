$(document).on('click', '.menu-item-has-children>a',function(e){
   e.preventDefault();
});

// We call this "one" time to unbind after one click, to allow us to bind a new event handler
// based on the new class we add here 'artist-thumb-slide-trigger'
$(document).one('click', '.artist-thumb',function(e){
  e.preventDefault();
  
  $('.artist-thumb').removeClass('active');
  $(this).addClass('active');
  $('.artist-thumbs').addClass('gallery-open');

  $('.artist-thumbs').toggleClass('large');
  $('.artist-thumb').each(function(){
    $(this).addClass('artist-thumb-slide-trigger').removeClass('artist-thumb');
  })
  var slideIndex = $(this).data('slide');
  console.log(slideIndex);
  var dataSrc = $(this).parent().data('array');
  
  
  if( $(".rsOverflow").length ){
    var slider = $(".royalSlider").data('royalSlider');
    slider.destroy();
  }
  $("body").addClass('overflowhidden');
  $(".artist-gallery-wrapper").addClass('loaded');
  
  
  //console.log(dataSrc);
  var output="";

  // for-in loop
    for (var i in dataSrc) {
    //console.log('<img class="rsImg" href="' + dataSrc[i] + '"/> ');
    if(dataSrc[i].image) {
       console.log("we have image")
    }
    if(dataSrc[i].dataTitle) {
       console.log("we have title")
    }
    else {
       console.log("we have no title")
    }
    output+="<div class=\"slide\"><a class=\"rsImg\" href=\"" + dataSrc[i].image + "\" /></div> ";
    }

    //add the output to the elem
    document.getElementById("artist-gallery").innerHTML=output;
    
    //$("#artist-gallery").imagesLoaded(function(){ 
      $("#artist-gallery").royalSlider({
        addActiveClass: true,
        controlNavigation: 'none',
        imageScalePadding: 0,
        slidesSpacing: 0,
        numImagesToPreload: 2,
        arrowsNavHideOnTouch: true,
        arrowsNavAutoHide: false,
        keyboardNavEnabled: true,
        fadeinLoadedSlide: true,
        globalCaption: false,
        globalCaptionInside: false,
        transitionSpeed: 300,
        deeplinking: {
          change: true,
          enabled: true,
          prefix: 'image-'
        },
        autoPlay: {
          // autoplay options go gere
          pauseOnHover: false,
          enabled: true,
          delay: 3000
        }
      });
    //}); 
    window.location.hash=slideIndex; 
    //window.location='#artist-gallery';
});

$(document).on('click', '.artist-thumb-slide-trigger',function(e){
e.preventDefault();

  
  $('.artist-thumb,.artist-thumb-slide-trigger').removeClass('active');
  $(this).addClass('active');
   
  if( $('.artist-thumb-slide-trigger').parent().hasClass('large') ){
    $('.artist-thumb-slide-trigger').parent().removeClass('large');
  }
var slideIndex = $(this).data('slide');
console.log(slideIndex);
window.location.hash=slideIndex; 
});

//fadeIn Artist Index firts imnage
$('.swap-image-wrap, .lazyload').waitForImages(function() {
  $('#swap-image, .lazyload').addClass('loaded');
});



/*
$('#menu-main-menu a').on('click', function(e){
  e.preventDefault();
  var url = $(this).attr('href');
  $('.main-nav').toggleClass('shown');
  if ($('.search-overlay-wrapper').hasClass('shown') ) {
    $('.search-overlay-wrapper').toggleClass('shown');
  }
  $('.main').fadeOut(200, function(){
    window.location=url;
  })  
});
*/


//add scrolle nav
$(window).on('scroll', function() {
  var scroll;
  scroll = $(window).scrollTop();
  if (scroll > 200) {
    $('body').addClass('scrolled');
  } else {
    $('body').removeClass('scrolled');
  }
});


$('.view-all').on('click', function(){
  if( $(this).hasClass('large')) {
    $(this).text('[+] View All');
    $(this).toggleClass('large');
  }
  else {
    
    $(this).text('[-] Thumbnails');
    $(this).toggleClass('large');
  }
  
  $('.artist-thumbs').toggleClass('large');
  $('.artist-thumbs img').each(function(){
    var swap = $(this).data('large');
    $(this).attr('src', swap);
  });
});


//TOGGLE HAMBUEGRE NAV
var theEvent;
if ($(window).width() <= 800) {
  var theEvent = 'toushstart'
}
else {
  var theEvent = 'mouseenter'
}

$(document).on(theEvent , '.hamburger',function(){
  $('.main-nav').addClass('shown');
  $(this).addClass('shown');
  $('.logo').addClass('shown');
  if ($('.search-overlay-wrapper').hasClass('shown') ) {
    $('.search-overlay-wrapper').toggleClass('shown');
  }
});
/*
$(document).on('mouseleave, click', '.main-nav.shown', function(){
  alert("leave");
  if ($('.main-nav'),hasClass('shown')) {
    $('.main-nav').removeClass('shown');
  }
  if ($('.hamburger').hasClass('shown')) {
    $('.hamburger').removeClass('shown');
  }
  if ($('.hamburger').hasClass('shown')) {
    $('.logo').removeClass('shown');
  }
  if ($('.search-overlay-wrapper').hasClass('shown') ) {
    $('.search-overlay-wrapper').toggleClass('shown');
  }
}); 
*/


var timeoutId;
$('.hamburger').mouseleave(function() {
  timeoutId = 1000;
    if (!timeoutId) {
        timeoutId = window.setTimeout(function() {
            timeoutId = null;
            $('.main-nav').addClass('shown');
       }, 1500);
    }
});
    
    
  
  
// TOGGLE SEARHC
$(document).on('click', '.search-toggle', function(){
  console.log("clicked")
  $('.search-overlay-wrapper').toggleClass('shown');
  $('input[type="search"]').focus();
});


//Incementally fade in thumb divs
/*
$(window).load(function() {
   $('.artist-thumbs figure').each(function(i) {
      $(this).delay((i + 1) * 100).fadeIn(250);
   });
});
*/



function goInstafeed() {
  if( $('#instagram-feed').length){
  var feed = new Instafeed({

      get: 'user',
      userId: 11696583,
      accessToken: '11696583.850066e.fb4d778871ec4c67bc657374fb6ce721',

      sortBy: 'most-recent',
      target: 'instagram-feed',
      template: '<li class="touchcarousel-item"><a href="{{link}}" target="_blank"><img class="img-responsive" src="{{image}}" alt=""></a></li>',
      resolution: 'thumbnail',
      limit: 16,
      after: function() {
        doTouchCarousel();
      }
  });
  feed.run();
  }
}




/*
function resizeMainFolioAjax() {
  if ( $('#single-folio').length ) {
    console.log("resizeMainFolioAjax")
    var rsHeight = $(window).height() - 80;
    $('#single-folio').height(rsHeight);
    goRoyalFolio();
  }
}
function resizeMainFolioSolo() { 
  if ( $('#single-folio').length ) {
    console.log("resizeMainFolioSolo")
    var pageHeight = $(window).height();
    var headHeight = $('.main-header').height() + 100;
    var dif = pageHeight - headHeight;
    console.log(pageHeight,headHeight,dif)
    $('#single-folio').height(dif);
    goRoyalFolio();
  } 
}
*/

function resizeExpoSLider(){
    var expoHeight = $('#expo-gallery').width() / 1.5;
    var $royalSlider = $('#expo-gallery');
    $royalSlider.height(expoHeight);
}
function expoGallery(){
  if ($('#expo-gallery').length) {
    
    resizeExpoSLider();
    
     var $royalSlider = $('#expo-gallery');
     $royalSlider.royalSlider({
        addActiveClass: true,
        imageScaleMode: 'fit',
        controlNavigation: 'none',
        slidesSpacing: 0,
        numImagesToPreload: 3,
        keyboardNavEnabled: true,
        fadeinLoadedSlide: true,
        transitionSpeed: 300,
        arrowsNavAutoHide: false,
        deeplinking: {
          change: true,
          enabled: true,
          prefix: 'image-'
        }
     });
     
     
   var slider = $royalSlider.data('royalSlider');

    var caption = $('slide-caption:first-of-type').html();
    console.log(caption)
    
    captionHolder = $('#expo-gallery-captions');
    captionHolder.html(caption);


    slider.ev.on('rsAfterSlideChange', function(event) {
        console.log("rsAfterSlideChange")
        var caption = $('.rsActiveSlide .slide-caption').html();
        console.log(caption)
        captionHolder.html(caption);
    }); 
     
  } //end if
}

$(document).on('click', '.expo-go-full-screen', function(e){
 $('#expo-gallery-wrap').toggleClass('fixed');
  $(window).trigger('resize');
  window.location.hash="#";
});



$(document).on('click', '.artist-thumb-expo', function(e){
  e.preventDefault();
  var url = $(this).data('slide');
  window.location=url;
})

function goRoyalHomepage() {
  if ($('#homepage-gallery').length) {
  	var $royalSlider = $('#homepage-gallery');
    $royalSlider.royalSlider({
      transitionType: 'fade',
      imageScaleMode: 'fill',
      //autoScaleSlider: true,
      //slidesOrientation: 'vertical',
      controlNavigation: 'none',
      //imageScalePadding: 40,
      slidesSpacing: 0,
      navigateByClick: false,
      numImagesToPreload: 2,
      arrowsNav: false,
      //arrowsNavAutoHide: true,
      //arrowsNavHideOnTouch: true,
      keyboardNavEnabled: true,
      fadeinLoadedSlide: true,
      globalCaption: false,
      globalCaptionInside: false,
      transitionSpeed: 300,
      sliderDrag: false,
      addActiveClass: true,
      autoPlay: {
        // autoplay options go gere
        pauseOnHover: false,
        enabled: true,
        delay: 3000
        }
    });
/*
    var slider = $royalSlider.data('royalSlider');
    slider.ev.on('rsAfterSlideChange', function(event) {
      console.log("rsAfterSlideChange")
      var color = $('.rsActiveSlide .slide').data('color');
      console.log(color)
      $('#slide-credit').attr('class', '');
      $('#slide-credit').addClass(color)
    });
    slider.slides[0].holder.on('rsAfterContentSet', function() {
      console.log("rsAfterContentSet");
      var color = $('.rsActiveSlide .slide').data('color');
      console.log(color)
      $('#slide-credit').attr('class', '');
      $('#slide-credit').addClass(color)
    });
*/
 } //end if
}  //end function




//https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 300);
        return false;
      }
    }
  });





//do all event handler here
$(document).on('click', '.toggle-search',function(e){
  e.preventDefault();
  $('.search-wrap').toggleClass('open');
  $('.search-wrap input[type="search"]').focus()
});



 
$(document).on('mouseover', '.artist-item',function(e){
 
    var imgTitle = $(this).data('title');
    var imgSrc = $(this).data('swap');
    var target = $('#swap-image');
    var targetTitle = $('#swap-title');
    var swapLink = $('a',this).attr('href');
    var targetLink = $('#swap-image-link');
    
     console.log(imgTitle , imgSrc);
     
     target.attr('src', imgSrc).css("opacity", "1");
     targetTitle.html(imgTitle);
     targetLink.attr('href', swapLink)
     $('#swap-title').css("opacity", "1");

 });
$(document).on('mouseout', '.artist-item',function(e){
   var target = $('#swap-image');
   target.css("opacity", "0");
   $('#swap-title').css("opacity", "0");
 }); 
  
 
$(window).on('resize', function(){
  //resizeExpoSLider();
   //resizeHomeSlide();
   //resizeMainFolioSolo()
   //resizeMainFolioAjax();
});

// PJAX COMPLETE

function pjaxComplete() {
  NProgress.done();
  goRoyalHomepage();
  expoGallery();
}
pjax.connect({
  'useClass' : 'pjax',
  'container': 'pjax-content',
  'beforeSend': function(e) {
    //$('#loader').show();
    NProgress.start();
  },
  'complete': function() {
    pjaxComplete();
    //$('#loader').hide();
     
  }
});
//$(document).on('pjax:start', function() { NProgress.start(); });
//$(document).on('pjax:end',   function() { NProgress.done();  });

//call it all on DOM ready
pjaxComplete(); 