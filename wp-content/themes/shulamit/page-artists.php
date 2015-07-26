<?php get_header(); ?>

<section class="container-fluid artist-container">
  <article class="col-sm-3">
  <h3 class="artist-list-heading">Artists</h3>
  <ul class="artist-list">
  <?php $loop = new WP_Query( array( 'post_type' => 'artist','category__not_in'=>'4' ) ); ?>
  <?php while ( $loop->have_posts() ) : $loop->the_post(); $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
    $thumb = wp_get_attachment_image_src( get_post_thumbnail_id(), 'hover_thumb');
    $url = $thumb[0];
    
  ?>
    <li
      class="artist-item"
      data-swap="<?php echo $url; ?>"
      data-title="<?php echo $post->post_title; ?>">
      
      
     <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
      
      <?php /* get featured images */ ?>
      
    </li>
  <?php endwhile; wp_reset_query(); ?>
  </ul>
  </article>
  
  <article class="col-sm-3">
  <h3 class="artist-list-heading right">Selling Works By</h3>
  <ul class="artist-list">
    <?php $loop = new WP_Query( array( 'post_type' => 'artist' ,  'posts_per_page'=>'100' , 'cat'=>'4' ) ); ?>
    <?php
    while ( $loop->have_posts() ) : $loop->the_post();
    $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
    $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ));
    ?>
    <li
      class="artist-item"
      data-swap="<?php echo $image; ?>"
      data-title="<?php echo $post->post_title; ?>">
      
      
    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
      
      <?php /* get featured images */ ?>
      
    </li>
  <?php endwhile; wp_reset_query(); ?>
  </ul>
  </article>
  
  <article class="col-sm-6 swap-image-outer-wrap">
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
      //$feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
    
      $thumb = wp_get_attachment_image_src( get_post_thumbnail_id(), 'medium');
      $url = $thumb[0];


    echo '<img src="'. $url.'" class="img-responsive" id="swap-image"/>';
    ?>
    <figcaption id="swap-title"><?php echo $post->post_title; ?></figcaption>
    </a>
    <?php endwhile; wp_reset_query(); ?>
    </figure>
  </article>
  
</section>

<section class="ajax-content-wrapper">
  
</section>


<?php get_footer(); ?>