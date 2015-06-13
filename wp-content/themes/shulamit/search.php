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

    <?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

        <h2><a href="<?php the_permalink(); ?>"><?php echo $post->post_title; ?></a></h2>
    
    
<?php endwhile; endif; ?>


<?php else: ?>   

		<h2 class="text-center no-results">No Results, try and another word.</h2>

<?php endif; ?>
</section>

<?php get_footer(); ?>