<?php get_header(); ?>


<?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<section class="row bio-wrap">
  
  <?php 
  $images = get_field('image');
  ?>
  
  <?php foreach( $images as $image ): ?>
  <figure class="bio-img" style="background-image: url(<?php echo $image['sizes']['extra_large']; ?>);">
<!--     <img src="<?php echo $image['sizes']['extra_large']; ?>" alt="<?php echo $image['alt']; ?>" class="img-responsive"/> -->
  </figure>
  
  <?php endforeach; ?>
</section>
  
<section class="container bio-text">
        <h2 class="about-heading">
        <?php the_title(); ?>
        </h2>
        <? the_content();  ?>
  </section>      
  					
<?php endwhile; endif;  ?>





<?php get_footer(); ?>