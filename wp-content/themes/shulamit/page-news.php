<?php get_header(); ?>
<section class="container">
  <header class="row press-heading">
    <div class="col-sm-12">
      <h4 class="heavy">News</h4>
    </div>
  </header>
    
  
  <?php $loop = new WP_Query( array( 'post_type' => 'post' ,  'posts_per_page'=>'9' , 'category__and'=>'5, 7' ) ); ?>
  <?php while ( $loop->have_posts() ) : $loop->the_post(); $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
  
  
   <section class="row post"> 
    <figure class="col-sm-6">
        <a href="<? the_permalink(); ?>">
          <?php
            if ( has_post_thumbnail() ){
             the_post_thumbnail('medium', array('class' => 'img-responsive'));
             }
             else {
               echo '<img src="http://placehold.it/600x400" class="img-responsive"/>';
             }
          ?>
        </a> 
    </figure>
      <section class="col-sm-6">
        <header class="post-header no-date">
<!--          <span class="bold slug">Past Exhibition</span> -->
         <h2 class="heavy"><? the_title();?></h2>
        </header>
        <section class="content">
        <? the_excerpt();?>
        </section>
    </section>
  </section>

<?php endwhile; wp_reset_query(); ?>


   <section class="row archive">
      <?php $loop = new WP_Query( array( 'post_type' => 'post' ,  'posts_per_page'=>'9' , 'category__and'=>'5, 7', 'offset'=>'9' ) ); ?>
      <?php while ( $loop->have_posts() ) : $loop->the_post() ; ?>  
        <article class="col-sm-4 post">
          <figure class="">
            <a href="<? the_permalink(); ?>">
          <?php
            if ( has_post_thumbnail() ){
             the_post_thumbnail('medium_cropped', array('class' => 'img-responsive'));
             }
             else {
               echo '<img src="http://placehold.it/600x400" class="img-responsive"/>';
             }
          ?>
            </a>
          </figure>
          
          <section class="">
            <header>
<!--             <span class="bold slug">Past Exhibition</span> -->
            <h2 class="heavy"><? the_title(); ?>:</h2>
            <h3 class="heavy"><? the_field('sub_title'); ?></h3>
            <time><?php the_field('dates'); ?></time>
            </header>
          </section>
        </article>
      <?php endwhile;?> 
      <?php wp_reset_query();?> 
      
 </section><!-- end row -->
 
 
  
 
<?php get_footer(); ?>



