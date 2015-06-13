<section class="slide-wrapper">
<section id="homepage-gallery" class="royalSlider rsDefault">
<?php query_posts('post_type=homeslider, & posts_per_page=1'); ?>
  <?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <?php
    $images = get_field('images');
    $image = $images[0];
    ?>
    <?php foreach( $images as $image ): ?>
      <a href="<?php echo $image['sizes']['large']; ?>" class="rsImg"/></a>
    <?php endforeach; ?>
  <?php endwhile; endif;  ?>
<?php wp_reset_query(); ?>
</section>
</section>