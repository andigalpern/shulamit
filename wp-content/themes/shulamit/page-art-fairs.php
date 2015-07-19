<?php get_header(); ?>

<section class="container">
  <header class="row press-heading">
    <div class="col-sm-12">
      <h4 class="heavy">Art Fairs</h4>
    </div>
  </header>
    
  <section class="row">  
   <?php $loop = new WP_Query( array( 'post_type' => 'artfairs' ,  'posts_per_page=16' ) ); ?>
   <?php while ( $loop->have_posts() ) : $loop->the_post(); $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>   
     <article class="post col-sm-4">
      <figure class="">
        <a href="<? the_permalink(); ?>">
          <?php the_post_thumbnail('thumb_large', array('class' => 'img-responsive')); ?>
        </a>  
      </figure>
      <header>
        <span class="bold slug"><? the_field('sub_title'); ?></span>
        <h2 class="heavy"><? the_title(); ?></h2>
      </header>
    </article>
<? endwhile; ?>
  </section>

<?php get_footer(); ?>