<?php get_header(); ?>

<a href="/artists" class="bold back-to-artists">Back To Artists</a>

<?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<?php 
$count = 1; 
$count_1 = 1; 
$images = get_field('images');
$image_1 = $images[0];
?>
<article class="artist-hero-container artist-section" id="selected-works">
<section class="artist-hero-wrap">
<section class="rsSlider rsDerault artist-rsSlider" id="single-artist-slider">
<?php
foreach( $images as $image ):
?>
  <div class="slide" data-color="<?php echo $image['alt']; ?>" data-id="<? echo $count_1++; ?>">
     <div class="slide-image">
        <a href="<?php echo $image['sizes']['large']; ?>" class="rsImg"></a>
     </div>
    <div class="slide-caption slide-caption-<? echo $count_1++; ?>" >
      <p><?php echo $image['caption']; echo $image['thumbnail'];?></p>
    </div>
  </div>
<?php endforeach; ?> 
</section>

<aside id="expo-gallery-captions">
<p><?php echo $image_1['caption'];?></p>
</aside>

<!--   <figure class="artist-hero lazyload artist-wrapper"></figure> -->

</section>  



  
      
 <section class="container artist-wrapper">
 
 


<!--
      <section class="row" id="artist-selected-work"> 
        <header class="col-sm-12 artist-header">    
          <h3 class="bold"><?php the_title(); ?> Selected Works</h3>
        </header>
      </section>
-->
      
      <?php
      //#GET THE IMAGES FIELD OBJECT
      $count_1 = 1;
      $images = get_field('images');
      $image = $images[0];
      ?>
      <section class="artist-thumbs row">
      <?php foreach( $images as $image ): ?>
        <a href="#image-<? echo  $count++ ?>" data-id="<? echo $count_1++; ?>">
        <figure class="col-md-1 artist-thumb">
        <div class="table">
          <div class="table-cell">
          <img
          src="<?php echo $image['sizes']['thumbnail']; ?>"
          class="img-responsive"/>
          </div>
        </div>
        </figure>
        </a>
      <?php endforeach; ?>
       <? /*
        <div class="clear text-right">
        <span class="bold view-all">[+] View All</span>
        </div>
       */ ?>
      </section>
 </section>
</article>
 
 
 
   <menu class="artist-menu">
     <h1 class="heavy"><a href="#selected-works"><?php the_title(); ?></a></h1>
     <ul class="bold">
<!--        <li><a href="#artist-selected-work">Selected Work</a></li> -->
<!--        <li><a href="#artist-exhibitions">Exhibitions</a></li> -->
       <li><a href="#artist-bio" class="ajax-trigger">Biography</a></li>
       <li><a href="<? the_field('pdf'); ?>" target="_blank" id="cv">CV</a></li>
<!--        <li><a href="#artist-press" class="ajax-trigger">Press</a></li> -->
     </ul>
  </menu>
  
  
     
      <section class="artist-section" id="artist-bio">
        <section class="artist-bio ajax-wrapper" >
           <h3 class="bold"><?php the_title(); ?> Biography</h3>
          <?php the_content(); ?>
        </section>
      </section>
      
      

      <section class="artist-section hidden" id="artist-exhibitions">
        <section class="artist-bio artist-exihitions ajax-wrapper" >
        
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
      </section>
      
      <section class="artist-section hidden" id="artist-press">
        <section class="artist-bio ajax-wrapper" i>
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
      </section> 
    
  
      
  
       
  <?php endwhile; endif;  ?>
  


  </article>
<?php get_footer(); ?>