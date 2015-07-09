<?php get_header(); ?>


  <?php $loop = new WP_Query( array( 'post_type' => 'current_exhibition' ,  'posts_per_page=1'  ) ); ?>
  <?php while ( $loop->have_posts() ) : $loop->the_post() ; ?>
  
    <?php
      $images = get_field('images');
      $image = $images[0];
      ?>


  <section id="current-expo-gallery" style="background-image: url(<?php echo $image['url']; ?>)">


<!--
      <?php
      $images = get_field('images');
      $image = $images[0];
      ?>
      
      <?php foreach( $images as $image ): ?>
        <div class="slide" data-color="<?php echo $image['alt']; ?>">
          <a href="<?php echo $image['sizes']['large']; ?>" class="rsImg"></a>
        </div>
      <?php endforeach; ?>
-->
      
  
  
  </section>
  <section class="container">
    <article class="">
      <h2 class="bold"><? the_title(); ?></h2>
      <h3 class="bold"><? the_field('sub_title'); ?></h3>

      <?php the_content(); ?>
     
      
    </article>
  </section>
<?php endwhile;  ?>
<?php get_footer(); ?>