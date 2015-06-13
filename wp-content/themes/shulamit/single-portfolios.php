<?php get_header(); ?>

<section class="container-fluid" id="single-folio-wrapper">
<div id="single-folio" class="royalSlider rsDefault">
<?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	
<?php
$images = get_field('images');
$image = $images[0];
?>

<?php foreach( $images as $image ): ?>


<a href="<?php echo $image['sizes']['large']; ?>" class="rsImg"/></a>


<?php endforeach; ?>					
<?php endwhile; endif;  ?>
</div>
</section>


<?php get_footer(); ?>