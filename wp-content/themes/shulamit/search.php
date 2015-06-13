<?php
/**
 * The template for displaying Search Results pages.
 *
 * @package Shape
 * @since Shape 1.0
 */

get_header(); ?>



<section class="container">
<?php if ( have_posts() ) : ?>

<?php the_post(); ?>

		<div class="row" id="article-grid">
  		
		  <?php include 'inc/tag_loop.php' ; ?>
		  
	  </div><!-- END ROW -->

<?php else: ?>   

		<h2 class="text-center no-results">No Results, try and another word.</h2>

<?php endif; ?>
</section>

<?php get_footer(); ?>