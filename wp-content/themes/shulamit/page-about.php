<?php get_header(); ?>

<section class="container">
    <article class="row">
    <?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
     
      <figure class="col-sm-6">
       	<? $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );  ?>
    		<img src="<?php echo $feat_image; ?>" alt="Shumalit Nazarian Gallery" class="img-responsive">
    	</figure>
    	
    	<section class="col-sm-4">
        <h2 class="heavy"><?php the_title(); ?></h2>
        <?php echo $post->post_content; ?>
    	</section>
    
    <?php endwhile; endif; ?>
	</article>
</section>

<?php get_footer(); ?>