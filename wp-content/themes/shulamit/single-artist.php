<?php get_header(); ?>
SIGNLE ARTIST VIEW single-artist.php  



<section class="container-fluid">
  <article class="">

 

 <?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
     
      
      <h2><?php the_title(); ?></h2>
      <section>
        <?php echo $post->post_content; ?>
      </section>

      <?php
      $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
      echo '<img src="'.$feat_image.'" class="img-responsive" id="swap-image"/>';
      ?>

<?php endwhile; endif;  ?>

  </article>

<?php get_footer(); ?>