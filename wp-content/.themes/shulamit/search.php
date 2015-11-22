<?php
/**
 * The template for displaying Search Results pages.
 *
 * @package Shape
 * @since Shape 1.0
 */

get_header(); ?>




<section class="container-fluid artist-container">
  <article class="col-sm-2">
  <?php  if ( have_posts() ) : ?>
    <h3 class="artist-list-heading">Search Result</h3>
  <?php  endif; ?>
  <ul class="artist-list">
   <?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <li
      class="artist-item">
      
      
     <a href="<?php the_permalink(); ?>"><?php echo $post->post_title; ?></a>
      
      <?php /* get featured images */ ?>
      
    </li>
    <?php endwhile; ?>
   <?php else : ?>
  <h3 class="artist-list-heading">No Search Terms Found</h3> 
  <?php  endif; ?>
  </ul>
  </article>
  
  

<?php get_footer(); ?>