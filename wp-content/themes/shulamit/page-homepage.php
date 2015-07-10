<?php get_header(); ?>


  <?php $loop = new WP_Query( array( 'post_type' => 'current_exhibition' ,  'posts_per_page=1'  ) ); ?>
  <?php while ( $loop->have_posts() ) : $loop->the_post() ; ?>
  
  
<section class="slide-wrapper">
  <section id="homepage-gallery" class="royalSlider rsDefault">
  

      <?php
      $images = get_field('images');
      $image = $images[0];
      ?>
      
      <?php foreach( $images as $image ): ?>
        <div class="slide" data-color="<?php echo $image['alt']; ?>">
          <a href="<?php echo $image['sizes']['large']; ?>" class="rsImg"></a>
        </div>
      <?php endforeach; ?>
      
  
  
  </section>
  
  <aside id="slide-credit">
    <h2><? the_title(); ?>:</h2>
    <h3><? the_field('sub_title'); ?></h3>
    <time datetime=""><?php the_field('dates'); ?>5</time>
  </aside>
</section>

  <?php endwhile;   ?>

<?php get_footer(); ?>