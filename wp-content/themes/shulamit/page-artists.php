<?php get_header(); ?>

<section class="container-fluid">
  <article class="col-sm-2">
  <ul class="artist-list">
  <?php $loop = new WP_Query( array( 'post_type' => 'artist' ,  'posts_per_page=16' ) ); ?>
  <?php while ( $loop->have_posts() ) : $loop->the_post(); $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
    <li
      class="artist-item"
      data-swap="<?php echo $feat_image; ?>"
      data-title="<?php echo $post->post_title; ?>">
      
      
      <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
      
      <?php /* get featured images */ ?>
      
    </li>
  <?php endwhile; wp_reset_query(); ?>
  </ul>
  </article>
  
  <article class="col-sm-2">
  <ul class="artist-list">
  <?php $loop = new WP_Query( array( 'post_type' => 'artist' ,  'posts_per_page=16' ) ); ?>
  <?php while ( $loop->have_posts() ) : $loop->the_post(); $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
    <li
      class="artist-item"
      data-swap="<?php echo $feat_image; ?>"
      data-title="<?php echo $post->post_title; ?>">
      
      
      <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
      
      <?php /* get featured images */ ?>
      
    </li>
  <?php endwhile; wp_reset_query(); ?>
  </ul>
  </article>
  
  <article class="col-sm-5 col-sm-offset-1">
    <figure class="swap-image-wrap">
    
    <?php $loop = new WP_Query( 
        array(
        'post_type' => 'artist',
        'posts_per_page' => 1
        )
    ); ?>
    <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>  
    <a href="<?php the_permalink(); ?>" id="swap-image-link">
    <?php
    $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
    echo '<img src="'.$feat_image.'" class="img-responsive" id="swap-image"/>';
    ?>
    <figcaption id="swap-title"><?php echo $post->post_title; ?></figcaption>
    </a>
    <?php endwhile; wp_reset_query(); ?>
    </figure>
  </article>
  
</section>




<?php get_footer(); ?>