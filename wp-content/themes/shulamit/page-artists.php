<?php get_header(); ?>


<? /*
<script>


var myimages=new Array()
function preloadimages(){
for (i=0;i<preloadimages.arguments.length;i++){
myimages[i]=new Image()
myimages[i].src=preloadimages.arguments[i]
}
}


//Enter path of images to be preloaded inside parenthesis. Extend list as desired.
preloadimages(
<?php $loop = new WP_Query( array( 'post_type' => 'artist' ) ); ?>
<?php while ( $loop->have_posts() ) : $loop->the_post();?>
<?php
$images = get_field('images');
$image = $images[0];
?>
<?php $image_text = array(); ?>
<?php foreach( $images as $image ): ?>
<?php $image_text[] = '"'. $image['sizes']['hover_thumb'] . '"'; ?>
<?php endforeach; ?>
<?php echo implode( $image_text, ","); ?>
<?php endwhile;  ?>
)

</script>
*/ ?>




<section class="container-fluid artist-container">
  <article class="col-sm-3 artist-list-wrap">
  <h3 class="artist-list-heading">Artists</h3>
  <ul class="artist-list">
  <?php $loop = new WP_Query( array( 'post_type' => 'artist','category__not_in'=>'4' ) ); ?>
  <?php while ( $loop->have_posts() ) : $loop->the_post();
    //$feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
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
  
  <article class="col-sm-3 artist-list-wrap">
  <h3 class="artist-list-heading right">Selling Works By</h3>
  <ul class="artist-list">
    <?php $loop = new WP_Query( array( 'post_type' => 'artist' ,  'posts_per_page'=>'100' , 'cat'=>'4' ) ); ?>
    <?php
    while ( $loop->have_posts() ) : $loop->the_post();
    //wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
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
    
    $thumb = wp_get_attachment_image_src( get_post_thumbnail_id(), 'hover_thumb');
    $url = $thumb[0];
    

    echo '<img src="'. $url.'" class="img-responsive" id="swap-image"/>';
    ?>
    <figcaption id="swap-title"><?php echo $post->post_title; ?></figcaption>
    </a>
    <?php endwhile; wp_reset_query(); ?>
    </figure>
  </article>
  
</section>



<?php get_footer(); ?>