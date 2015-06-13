<section class="slide-wrapper">
  <section id="homepage-gallery" class="royalSlider rsDefault">
  
    <?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <?php
      $images = get_field('images');
      $image = $images[0];
      ?>
      
      <?php foreach( $images as $image ): ?>
      
        <a href="<?php echo $image['sizes']['large']; ?>" class="rsImg"/></a>
        
      <?php endforeach; ?>
      
    <?php endwhile; endif;  ?>
  
  </section>
</section>