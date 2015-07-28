<?php get_header(); ?>

<section class="container">
  
  <header class="row press-heading">
    <div class="col-sm-12">
      <h4 class="heavy">Past Exhibitions</h4>
    </div>
  </header>
  

<?php $loop = new WP_Query( array( 'post_type' => 'exhibition' ,  'posts_per_page' => 16 , 'cat'=>'8'  ) ); ?>
<?php while ( $loop->have_posts() ) : $loop->the_post() ; ?>  

  <article class="row post"> 
    <figure class="col-sm-6">
      <a href="<? the_permalink(); ?>">
        <?php
            if ( has_post_thumbnail() ){
              the_post_thumbnail('thumb_large', array('class' => 'img-responsive')); 
            }
            else {
              echo '<img src="http://placehold.it/600x400?text=Unavailable" class="img-responsive"/>';
            }
        ?>
      </a> 
    </figure>
    <section class="col-sm-6">
      <header class="post-header no-date">
        <span class="bold slug">Past Exhibition</span>
       <h2 class="heavy"><a href="<? the_permalink(); ?>"><? the_title();?></a></h2>
       <h3 class="heavy"><a href="<? the_permalink(); ?>"><? the_field('sub_title'); ?></a></h3>
      </header>
      <section class="content">
      <? the_excerpt();?>
      </section>
    </section>
  </article>
      
<?php endwhile;?> 
<?php wp_reset_query();?> 
 
 
</section><!-- end container -->

<?php get_footer(); ?>
