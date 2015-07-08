</main>
</div><!-- END PJAX -->
<footer class="main-footer container">

</footer>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

<script src="<?php bloginfo( 'template_url' ); ?>/js/vendor/jquery.min.js"></script>s
<script src="<?php bloginfo( 'template_url' ); ?>/js/vendor/bootstrap.min.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/js/royalslider/jquery.royalslider.min.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/js/vendor/imagesloaded.pkgd.min.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/js/vendor/masonry.pkgd.min.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/js/vendor/touchcarousel/jquery.touchcarousel-1.1.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/js/vendor/jquery.waitforimages.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/js/vendor/nprogress.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/js/vendor/instafeed.min.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/js/vendor/pjax-standalone.min.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/js/main.js"></script>

</div><!-- end pjax -->

<div id="loader"></div>

<div class="ajax-wrapper">
  <div class="ajax-inner"></div>
</div>


<section class="search-overlay-wrapper">
   <div class="search-toggle close"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
  <form role="search" method="get" class="search-form" action="<?php echo home_url( '/' ); ?>">
  <input type="search" class="search-field" placeholder="Search..." value="<?php echo get_search_query() ?>" name="s" title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>" />
  <input type="submit" class="search-submit" value="go" />
  </form>
</section>


<?php wp_footer(); ?>
</body>
</html>