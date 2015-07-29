<?php get_header(); ?>

<?php  if ( have_posts() ) : while ( have_posts() ) : the_post();?>
  
  <?php
  $images = get_field('images');
  $image = $images[0];
  ?>


  <section id="current-expo-gallery" style="background-image: url(<?php echo $image['url']; ?>)">
    <img src="<?php echo $image['sizes']['medium']; ?>" class="img-responsive hidden"/>
  </section>
  
  
  <section class="container container-smaller current-expo-data">
    <article class="expo-article">
      <header class="expo-header">
        <h2 class="heavy"><? the_title(); ?>: <? the_field('sub_title'); ?></h2>
        <time class="heavy"><?php the_field('dates'); ?></time>
      </header>

      <section class="expo-body">
        <?php the_content(); ?>
      </section>
     
     
     <section id="expo-gallery-wrap">
        <figure class="current-expo-gallery-extra royalSlider rsDefault" id="expo-gallery">
        <?php foreach( $images as $image ): ?>
          <div class="slide" data-color="<?php echo $image['alt']; ?>">
             <div class="slide-image">
                <a href="<?php echo $image['sizes']['large']; ?>" class="rsImg"></a>
             </div>
            <div class="slide-caption">
              <p><?php echo $image['caption']; ?></p>
            </div>
          </div>
        <?php endforeach; ?>
        </figure>
        <aside  id="expo-gallery-captions">
          <p><?php echo $image['caption']; ?></p>
        </aside>
     </section>
      
      <section class="artist-thumbs row">
        <? $count = 1; ?>
        <?php foreach( $images as $image ): ?>
        <figure class="col-md-1 artist-thumb-expo" data-slide="#image-<? echo  $count++ ?>" >
          <img
          src="<?php echo $image['sizes']['thumbnail']; ?>"
          data-large="<?php echo $image['sizes']['thumb_large']; ?>"
          class="img-responsive"/>
        </figure>
      <?php endforeach; ?>
      </section>  
      
      
    </article>
  </section>
<?php endwhile; endif; ?>




<?php get_footer(); ?>
<div class="expo-go-full-screen"></div>