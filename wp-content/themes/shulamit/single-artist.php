<?php get_header(); ?>

 
<?php $count = 1; ?>
<?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<section class="artist-hero-wrap">
  <figure class="artist-hero lazyload artist-wrapper">
  <?php
  $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
  echo '<img src="'.$feat_image.'" class="img-responsive"/>';
  ?>
  </figure>
  <menu class="artist-menu">
     <h1 class="heavy"><?php the_title(); ?></h1>
     <ul class="bold">
       <li><a href="#artist-selected-work">Selected Work</a></li>
       <li><a href="#artist-exhibitions">Exhibitions</a></li>
       <li><a href="#artist-bio">Biography</a></li>
       <li><a href="<? the_field('pdf'); ?>" target="_blank">Download CV</a></li>
       <li><a href="#artist-press">Selected Press</a></li>
     </ul>
  </menu>
</section>      


 <article class="container artist-wrapper">
  
  <section class="artist-gallery-wrapper row">
    <figure class="artist-gallery royalSlider rsDefault" id="artist-gallery">
    </figure>
  </section>

      <section class="row" id="artist-selected-work"> 
        <header class="col-sm-12 artist-header">    
          <h3 class="bold"><?php the_title(); ?> Selected Works</h3>
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
      
      
      <section class="artist-bio" id="artist-bio">
         <h3 class="bold"><?php the_title(); ?> Biography</h3>
        <?php the_content(); ?>
      </section>
      
      

      
      <section class="artist-bio artist-exihitions" id="artist-exhibitions">
    


        <h3 class="bold"><?php the_title(); ?> Exhibitions</h3>
        <?php $expos = the_field('exhibition_list');?>
         <?php var_dump($expos);?>
        <?php while(has_sub_field('exhibition_list')): ?>
        
          <p>
          <b class="bold"><?php the_sub_field('year'); ?></b>
          <span class="artist-exihition-location"><?php the_sub_field('details'); ?></span>
          </p>
        
        <?php endwhile;?> 
      </section>  
     
      
      <section class="artist-bio" id="artist-press" >
         <h3 class="bold"><?php the_title(); ?> Press</h3>
         <p>
           <b class="bold">2013</b> <span class="artist-exihition-location"><a href="">"Golems Gold", "Golems Gold", The Shiraz Institute.The Shiraz Institute.</a></span>
         </p>
         <p>
           <b class="bold">2013</b> <span class="artist-exihition-location"><a href="">"Golems Gold", The Shiraz Institute.</a></span>
         </p>         
         <p>
           <b class="bold">2013</b> <span class="artist-exihition-location"><a href="">"Golems Gold", The Shiraz Institute.</a></span>
         </p>
      </section>  
    
  
      
  
       
  <?php endwhile; endif;  ?>
  


  </article>
<?php get_footer(); ?>