<?php get_header(); ?>


  <?php $loop = new WP_Query( array( 'post_type' => 'exhibition' ,  'posts_per_page'=>'1', 'featured' => 'yes' ) ); ?>
  <?php while ( $loop->have_posts() ) : $loop->the_post() ; ?>
  
  
<section class="slide-wrapper">
  <section id="homepage-gallery" class="royalSlider rsDefault">
  

      <?php
      $images = get_field('home_images');
      $image1 = $images[0];
      $image2 = $images[1];
      $image3 = $images[2];
      $image4 = $images[3];
      $image5 = $images[4];
      ?>
      
      <? /*     
      <div class="slide" data-color="<?php echo $image1['alt']; ?>">
        <a href="<?php echo $image1['url']; ?>" class="rsImg"></a>
      </div>
      <div class="slide" data-color="<?php echo $image2['alt']; ?>">
        <a href="<?php echo $image2['url']; ?>" class="rsImg"></a>
      </div>
      <div class="slide" data-color="<?php echo $image2['alt']; ?>">
        <a href="<?php echo $image3['url']; ?>" class="rsImg"></a>
      </div>
      <div class="slide" data-color="<?php echo $image2['alt']; ?>">
        <a href="<?php echo $image4['url']; ?>" class="rsImg"></a>
      </div>
      <div class="slide" data-color="<?php echo $image2['alt']; ?>">
        <a href="<?php echo $image5['url']; ?>" class="rsImg"></a>
      </div>                  
      */ ?>
    
      <?php foreach( $images as $image ): ?>
      <div class="slide home-slide" data-url="<? the_permalink()?>">
        <a href="<?php echo $image['url']; ?>" class="rsImg"></a>
      </div>
      <?php endforeach; ?> 
     
  
  </section>
  
  <aside id="slide-credit">
    <a href="<? the_permalink()?>">
      <h2><? the_title(); ?>:</h2>
      <h3><? the_field('sub_title'); ?></h3>
      <time datetime=""><?php the_field('dates'); ?></time>
    </a>
  </aside>
</section>

  <?php endwhile;   ?>

<?php get_footer(); ?>