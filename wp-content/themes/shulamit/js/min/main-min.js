function goInstafeed(){if($("#instagram-feed").length){var e=new Instafeed({get:"user",userId:11696583,accessToken:"11696583.850066e.fb4d778871ec4c67bc657374fb6ce721",sortBy:"most-recent",target:"instagram-feed",template:'<li class="touchcarousel-item"><a href="{{link}}" target="_blank"><img class="img-responsive" src="{{image}}" alt=""></a></li>',resolution:"thumbnail",limit:16,after:function(){doTouchCarousel()}});e.run()}}function resizeExpoSLider(){var e=$("#expo-gallery").width()/1.5,a=$("#expo-gallery");a.height(e)}function expoGallery(){if($("#expo-gallery").length){resizeExpoSLider();var e=$("#expo-gallery");e.royalSlider({addActiveClass:!0,imageScaleMode:"fit",controlNavigation:"none",slidesSpacing:0,numImagesToPreload:3,keyboardNavEnabled:!0,fadeinLoadedSlide:!0,transitionSpeed:300,arrowsNavAutoHide:!1,deeplinking:{change:!0,enabled:!0,prefix:"image-"}});var a=e.data("royalSlider"),t=$("slide-caption:first-of-type").html();console.log(t),captionHolder=$("#expo-gallery-captions"),captionHolder.html(t),a.ev.on("rsAfterSlideChange",function(e){console.log("rsAfterSlideChange");var a=$(".rsActiveSlide .slide-caption").html();console.log(a),captionHolder.html(a)})}}function goRoyalHomepage(){if($("#homepage-gallery").length){var e=$("#homepage-gallery");e.royalSlider({transitionType:"fade",imageScaleMode:"fill",controlNavigation:"none",slidesSpacing:0,navigateByClick:!1,numImagesToPreload:2,arrowsNav:!1,keyboardNavEnabled:!0,fadeinLoadedSlide:!0,globalCaption:!1,globalCaptionInside:!1,transitionSpeed:300,sliderDrag:!1,addActiveClass:!0,autoPlay:{pauseOnHover:!1,enabled:!0,delay:3e3}})}}function pjaxComplete(){NProgress.done(),goRoyalHomepage(),expoGallery()}$(document).on("click",".menu-item-has-children>a",function(e){e.preventDefault()}),$(document).one("click",".artist-thumb",function(e){e.preventDefault(),$(".artist-thumb").removeClass("active"),$(this).addClass("active"),$(".artist-thumbs").addClass("gallery-open"),$(".artist-thumbs").toggleClass("large"),$(".artist-thumb").each(function(){$(this).addClass("artist-thumb-slide-trigger").removeClass("artist-thumb")});var a=$(this).data("slide");console.log(a);var t=$(this).parent().data("array");if($(".rsOverflow").length){var o=$(".royalSlider").data("royalSlider");o.destroy()}$("body").addClass("overflowhidden"),$(".artist-gallery-wrapper").addClass("loaded");var i="";for(var l in t)i+='<a class="rsImg" href="'+t[l]+'" /> ';document.getElementById("artist-gallery").innerHTML=i,$("#artist-gallery").royalSlider({addActiveClass:!0,controlNavigation:"none",imageScalePadding:0,slidesSpacing:0,numImagesToPreload:2,arrowsNavHideOnTouch:!0,arrowsNavAutoHide:!1,keyboardNavEnabled:!0,fadeinLoadedSlide:!0,globalCaption:!1,globalCaptionInside:!1,transitionSpeed:300,deeplinking:{change:!0,enabled:!0,prefix:"image-"},autoPlay:{pauseOnHover:!1,enabled:!0,delay:3e3}}),window.location.hash=a}),$(document).on("click",".artist-thumb-slide-trigger",function(e){e.preventDefault(),$(".artist-thumb,.artist-thumb-slide-trigger").removeClass("active"),$(this).addClass("active"),$(".artist-thumb-slide-trigger").parent().hasClass("large")&&$(".artist-thumb-slide-trigger").parent().removeClass("large");var a=$(this).data("slide");console.log(a),window.location.hash=a}),$(".swap-image-wrap, .lazyload").waitForImages(function(){$("#swap-image, .lazyload").addClass("loaded")}),$(window).on("scroll",function(){var e;e=$(window).scrollTop(),e>200?$("body").addClass("scrolled"):$("body").removeClass("scrolled")}),$(".view-all").on("click",function(){$(this).hasClass("large")?($(this).text("[+] View All"),$(this).toggleClass("large")):($(this).text("[-] Thumbnails"),$(this).toggleClass("large")),$(".artist-thumbs").toggleClass("large"),$(".artist-thumbs img").each(function(){var e=$(this).data("large");$(this).attr("src",e)})});var theEvent;if($(window).width()<=800)var theEvent="toushstart";else var theEvent="mouseenter";$(document).on(theEvent,".hamburger",function(){$(".main-nav").addClass("shown"),$(this).addClass("shown"),$(".logo").addClass("shown"),$(".search-overlay-wrapper").hasClass("shown")&&$(".search-overlay-wrapper").toggleClass("shown")});var timeoutId;$(".hamburger").mouseleave(function(){timeoutId=1e3,timeoutId||(timeoutId=window.setTimeout(function(){timeoutId=null,$(".main-nav").addClass("shown")},1500))}),$(document).on("click",".search-toggle",function(){console.log("clicked"),$(".search-overlay-wrapper").toggleClass("shown"),$('input[type="search"]').focus()}),$(document).on("click",".expo-go-full-screen",function(e){$("#expo-gallery-wrap").toggleClass("fixed"),$(window).trigger("resize"),window.location.hash="#"}),$(document).on("click",".artist-thumb-expo",function(e){e.preventDefault();var a=$(this).data("slide");window.location=a}),$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash);if(e=e.length?e:$("[name="+this.hash.slice(1)+"]"),e.length)return $("html,body").animate({scrollTop:e.offset().top},300),!1}}),$(document).on("click",".toggle-search",function(e){e.preventDefault(),$(".search-wrap").toggleClass("open"),$('.search-wrap input[type="search"]').focus()}),$(document).on("mouseover",".artist-item",function(e){var a=$(this).data("title"),t=$(this).data("swap"),o=$("#swap-image"),i=$("#swap-title"),l=$("a",this).attr("href"),s=$("#swap-image-link");console.log(a,t),o.attr("src",t).css("opacity","1"),i.html(a),s.attr("href",l),$("#swap-title").css("opacity","1")}),$(document).on("mouseout",".artist-item",function(e){var a=$("#swap-image");a.css("opacity","0"),$("#swap-title").css("opacity","0")}),$(window).on("resize",function(){}),pjax.connect({useClass:"pjax",container:"pjax-content",beforeSend:function(e){NProgress.start()},complete:function(){pjaxComplete()}}),pjaxComplete();