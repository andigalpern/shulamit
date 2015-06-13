<?php get_header(); ?>

<section class="container">
<!--
  <header class="row text-center page-header">
    <h1 class="tag-heading">
      <?php single_cat_title('',true); ?>
    </h1>
  </header>
-->
  
  
<section class="row">

<?php
/*
$args = array(
	'post_type' => 'portfolios',
);
$query = new WP_Query( $args );
*/
?>
<? $count = 0; ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	
  <?php
  $images = get_field('images');
  $image = $images[0];
  ?>


  	<div class="col-sm-4 portfolio-thumb" data-array='[<?php $image_text = array(); ?><?php foreach( $images as $image ): ?><?php $image_text[] = '"'. $image['sizes']['extra_large'] . '"'; ?><?php endforeach; ?><?php echo implode( $image_text, ","); ?>]'>
      
      <figure>
        <? the_post_thumbnail('folio_thumb');  ?>
        <figcaption><? the_title(); ?></figcaption>
      </figure>
     
  	</div>

   <? endwhile; endif; ?>
  <?php //wp_reset_query(); ?>
</section>



<div id="test-wrapper">
  <div id="test-wrapper-close">
    <div class="glyphicon glyphicon-remove"></div>
  </div>
  <div id="test" class="royalSlider rsDefault"></div>
</div>

<?php get_footer(); ?>