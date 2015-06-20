var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if( isMobile.any() )  {
   console.log("is mobile");
}
else {
   console.log("is no mobile");
}

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

function clearEmptySpans() {
  $('span').each(function() {
    var $this = $(this);
    if($this.html().replace(/\s|&nbsp;/g, '').length == 0)
      $this.remove();
  });
}

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
      console.log("rsAfterContentSet")
    });
 }//end if
} //end function



function goRoyalFolio() {
  var $royalSlider = $('#single-folio');
  $royalSlider.royalSlider({
    addActiveClass: true,
    //imageScaleMode: 'fill',
    //slidesOrientation: 'vertical',
    controlNavigation: 'none',
    //imageScalePadding: 40,
    slidesSpacing: 0,
    //navigateByClick: false,
    numImagesToPreload: 2,
    //arrowsNav: false,
    //arrowsNavAutoHide: true,
    arrowsNavHideOnTouch: true,
    keyboardNavEnabled: true,
    fadeinLoadedSlide: true,
    globalCaption: false,
    globalCaptionInside: false,
    transitionSpeed: 300,
    //sliderDrag: false,
    autoPlay: {
      // autoplay options go gere
      pauseOnHover: false,
      enabled: true,
      delay: 3000
      }
  });
} //end function

function goRoyalFolioAfterAjax() {
  //resizeMainFolioSolo();
  var $royalSlider = $('#single-folio');
  $royalSlider.royalSlider({
    addActiveClass: true,
    //imageScaleMode: 'fill',
    //slidesOrientation: 'vertical',
    controlNavigation: 'none',
    //imageScalePadding: 40,
    slidesSpacing: 0,
    //navigateByClick: false,
    numImagesToPreload: 2,
    //arrowsNav: false,
    //arrowsNavAutoHide: true,
    arrowsNavHideOnTouch: true,
    keyboardNavEnabled: true,
    fadeinLoadedSlide: true,
    globalCaption: false,
    globalCaptionInside: false,
    transitionSpeed: 300,
    //sliderDrag: false,
    autoPlay: {
      // autoplay options go gere
      pauseOnHover: false,
      enabled: true,
      delay: 3000
      }
  });
} //end function


function goMasonry(){
  var $container = $("#portfolio-grid");
  $container.imagesLoaded(function(){
    $container.masonry({
      columnWidth: '.folio-thumb',
      itemSelector: '.folio-thumb'
    });
  }); 
}
function goMasonryArticles(){
  var $container = $("#article-grid");
  $container.imagesLoaded(function(){
    $container.masonry({
      columnWidth: '.post-masonry-item',
      itemSelector: '.post-masonry-item'
    });
  }); 
}


$(document).on('click', '.portfolio-thumb',function(e){
  e.preventDefault();
  var dataSrc = $(this).data('array');
  
  if( $(".rsOverflow").length ){
    var slider = $(".royalSlider").data('royalSlider');
    slider.destroy();
  }
  $("body").addClass('overflowhidden');
  $("#test-wrapper").addClass('loaded');
  
  
  //console.log(dataSrc);
  var output="";

  // for-in loop
    for (var i in dataSrc) {
    //console.log('<img class="rsImg" href="' + dataSrc[i] + '"/> ');
      output+="<a class=\"rsImg\" href=\"" + dataSrc[i] + "\" /> ";
    }


    document.getElementById("test").innerHTML=output;
    $("#test").imagesLoaded(function(){ 
      $("#test").royalSlider({
        addActiveClass: true,
        controlNavigation: 'none',
        imageScalePadding: 0,
        slidesSpacing: 0,
        numImagesToPreload: 2,
        arrowsNavHideOnTouch: true,
        keyboardNavEnabled: true,
        fadeinLoadedSlide: true,
        globalCaption: false,
        globalCaptionInside: false,
        transitionSpeed: 300,
        autoPlay: {
          // autoplay options go gere
          pauseOnHover: false,
          enabled: true,
          delay: 3000
        }
      });
    });  
});

//hide wrapper, remove RS
$(document).on('click', '#test-wrapper-close',function(e){
  $("#test-wrapper").removeClass('loaded');
  $("body").removeClass('overflowhidden');
});



//do all event handler here
$(document).on('click', '.toggle-search',function(e){
  e.preventDefault();
  $('.search-wrap').toggleClass('open');
  $('.search-wrap input[type="search"]').focus()
});

//Ajax loaded galleries
$(document).on('click', '.folio-thumb a.folio-link',function(e){
  e.preventDefault();
  var newUrl = $(this).attr('href');
  $('#ajax-folio').fadeIn(200, function(){
    $('#ajax-folio .inner').load(newUrl+' #single-folio', function(){
      //resizeMainFolioSolo();
      //goRoyalFolio();
      resizeMainFolioAjax()
      $(this).addClass('loaded');
    });
  });
});

$(document).on('click', '.ajax-folio-closer',function(e){
  $('#ajax-folio').fadeOut(200, function(){
    $('#ajax-folio .inner').empty().removeClass('loaded');
  });
 });
 
$(document).on('hover', '.artist-item',function(e){
 
    var imgTitle = $(this).data('title');
    var imgSrc = $(this).data('swap');
    var target = $('#swap-image');
    var targetTitle = $('#swap-title');
    var swapLink = $('a',this).attr('href');
    var targetLink = $('#swap-image-link');
    
     console.log(imgTitle , imgSrc);
     
     
     target.attr('src', imgSrc);
     targetTitle.html(imgTitle);
     targetLink.attr('href', swapLink)
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
  goMasonry();
  goMasonryArticles();
  //goOwl();
  //goRoyalFolio();
  clearEmptySpans();
  fadeBkgImg();
  resizeMainFolioSolo();
  goInstafeed();
  goInstafeedPage(); 
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