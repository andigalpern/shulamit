// We call this "one" time to unbind after one click, to allow us to bind a new event handler
// based on the new class we add here 'artist-thumb-slide-trigger'
$(document).one('click', '.artist-thumb',function(e){
  e.preventDefault();
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
      output+="<a class=\"rsImg\" href=\"" + dataSrc[i] + "\" /> ";
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
$(document).on('click', '.hamburger', function(){
  $('.main-nav').toggleClass('shown');
  $(this).toggleClass('shown');
  $('.logo').toggleClass('shown');
  if ($('.search-overlay-wrapper').hasClass('shown') ) {
    $('.search-overlay-wrapper').toggleClass('shown');
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


function goInstafeedPage() {
  if( $('#instagram-page').length){
  var loadButton = $('#instagram-load-more');
  console.log("instagram page feed start")
  var feed = new Instafeed({
/*
      get: 'tagged',
      tagName: 'makeup',
      clientId: '9465ec57105c4ea08beeb8b9e413bbdc',
*/
      get: 'user',
      userId: 11696583,
      accessToken: '11696583.850066e.fb4d778871ec4c67bc657374fb6ce721',

      sortBy: 'most-recent',
      target: 'instagram-page',
      template: '<div class="col-xs-4 col-sm-3 instagram-item"><a href="{{link}}" target="_blank"><span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span><img class="img-responsive" src="{{image}}" alt=""><div class="insta-meta"></div></a></div>',
      resolution: 'low_resolution',
      limit: 24,
      after: function() {
        // disable button if no more results to load
        if ( !this.hasNext() ) {
          loadButton.setAttribute('disabled', 'disabled');
        }
      }
  });
  // bind the load more button
  $(document).on('click', loadButton, function() {
    feed.next();
  });
  
  feed.run();
  } //end if
}


function doTouchCarousel() {
    console.log("touch carosuel start")
    $("#owl-demo").touchCarousel({
        //pagingNav: false,
        snapToItems: false,
        itemsPerMove: 4,
        scrollToLast: false,
        loopItems: true,
        scrollbar: false
    });
    $("#owl-demo").addClass('loaded')
}




//add bkg image support
$.waitForImages.hasImgProperties = ['backgroundImage'];
function fadeBkgImg(){
  var imgWrap = $('.bio-img');
  if(imgWrap .length){
    imgWrap.waitForImages(function(){
      console.log("loaded");
      $(this).css({
        'opacity':'1'
      });
    });
  }
}

/*
function clearEmptySpans() {
  $('span').each(function() {
    var $this = $(this);
    if($this.html().replace(/\s|&nbsp;/g, '').length == 0)
      $this.remove();
  });
}
*/

/*
function goOwl(){
  if ($("#owl-demo").length) {
    $("#owl-demo").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items : 8,
        navigation:true,
    });
  }
}
*/
/*
function resizeHomeSlide() {
  console.log("resizeHomeSlide")
  if ($('#homepage-gallery').length) {
    var theWidth = $('#homepage-gallery').width();
    var theHeight = theWidth / 3;
    $('#homepage-gallery').height(theHeight);
  } 
}
*/
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




function goRoyalHomepage() {
  if ($('#homepage-gallery').length) {
  	var $royalSlider = $('#homepage-gallery');
    $royalSlider.royalSlider({
      transitionType: 'fade',
    	addActiveClass: true,
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
 }//end if
} //end function




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
   //resizeHomeSlide();
   //resizeMainFolioSolo()
   //resizeMainFolioAjax();
});

// PJAX COMPLETE

function pjaxComplete() {
  NProgress.done();
  goRoyalHomepage();
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