<?php get_header(); ?>


<?php $count = 1; ?>
<?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<section class="artist-hero-wrap container-fluid">
  <figure class="artist-hero lazyload">
  <?php
  $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
  echo '<img src="'.$feat_image.'" class="img-responsive"/>';
  ?>
  </figure>
  <menu class="artist-menu">
     <h1 class="heavy"><?php the_title(); ?></h1>
     <ul class="bold">
       <li><a href="#selected-work">Selected Work</a></li>
       <li><a href="#">Exhibitions</a></li>
       <li><a href="#">Biography</a></li>
       <li><a href="#">Selected Press</a></li>
     </ul>
  </menu>
</section>      


<article class="container artist-wrapper">  
  <section class="artist-gallery-wrapper row">
    <figure class="artist-gallery royalSlider rsDefault" id="artist-gallery">
    </figure>
  </section>

        <section class="row" id="selected-work"> 
          <header class="col-sm-12 artist-header">    
            <h2 class="heavy"><?php the_title(); ?></h2>
            <h3 class="bold">Selected Works</h3>
          </header>
        </section>
        
          <?php
          //#GET THE IMAGES FIELD OBJECT
          $images = get_field('images');
          $image = $images[0];
          ?>
        <section class="artist-thumbs row" data-array='[<?php $image_text = array(); ?><?php foreach( $images as $image ): ?><?php $image_text[] = '"'. $image['sizes']['extra_large'] . '"'; ?><?php endforeach; ?><?php echo implode( $image_text, ","); ?>]'>
          <?php foreach( $images as $image ): ?>
          <figure class="col-md-1 artist-thumb" data-slide="#image-<? echo  $count++ ?>" >
                <img
                src="<?php echo $image['sizes']['thumbnail']; ?>"
                data-large="<?php echo $image['sizes']['thumb_large']; ?>"
                class="img-responsive"/>
          </figure>
          <?php endforeach; ?>
          <div class="clear text-right">
            <span class="bold view-all">[+] View All</span>
          </div>
        </section>
        
        
        <section class="artist-bio">
           <h3 class="bold">Biopgraphy</h3>
          <?php echo $post->post_content; ?>
        </section>
      
        <?php
        //$feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
        //echo '<img src="'.$feat_image.'" class="img-responsive" id="swap-image"/>';
        ?>
    
    <?php endwhile; endif;  ?>

  </article>
<?php get_footer(); ?>