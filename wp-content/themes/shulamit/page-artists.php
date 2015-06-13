<?php get_header(); ?>

page-artists.php
<section class="container-fluid">
  <article class="col-sm-6">
  <ul>
  <?php $loop = new WP_Query( array( 'post_type' => 'artist' ) ); ?>
  <?php while ( $loop->have_posts() ) : $loop->the_post(); $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
    <li
      class="artist-item"
      data-swap="<?php echo $feat_image; ?>">
      
      
      <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
      
      <?php /* get featured images */ ?>
      
    </li>
  <?php endwhile; wp_reset_query(); ?>
  </ul>
  </article>
  
  
  <article class="col-sm-6">
    <figure class="swap-image-wrap">
    <?php $loop = new WP_Query( 
        array(
        'post_type' => 'artist',
        'posts_per_page' => 1
        )
    ); ?>
    <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>  
    <?php
    $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
    echo '<img src="'.$feat_image.'" class="img-responsive" id="swap-image"/>';
    ?>
    <?php endwhile; wp_reset_query(); ?>

    </figure>
  </article>
  
</section>




<?php get_footer(); ?>