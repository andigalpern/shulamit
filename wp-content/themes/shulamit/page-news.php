<?php get_header(); ?>
<section class="container">
  <header class="row press-heading">
    <div class="col-sm-12">
      <h4 class="heavy">News</h4>
    </div>
  </header>
    
  
  <?php $loop = new WP_Query( array( 'post_type' => 'post' ,  'posts_per_page=9' , 'cat=5' ) ); ?>
  <?php while ( $loop->have_posts() ) : $loop->the_post(); $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
  
  
   <section class="row post"> 
    <figure class="col-sm-6">
        <a href="<? the_permalink(); ?>">
          <?php the_post_thumbnail('medium', array('class' => 'img-responsive')); ?>
        </a> 
    </figure>
      <section class="col-sm-6">
        <header>
         <span class="bold slug">Past Exhibition</span>
         <h2 class="heavy"><? the_title();?></h2>
        </header>
        <section class="content">
        <? the_excerpt();?>
        </section>
    </section>
  </section>

<?php endwhile; wp_reset_query(); ?>
  
 
<?php get_footer(); ?>



