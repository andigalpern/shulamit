<?php get_header(); ?>

<section class="container">
  

  
 <section class="row">
    <?php $loop = new WP_Query( array( 'post_type' => 'exhibition' ,  'posts_per_page' => 16 , 'cat'=>'8'  ) ); ?>
    <?php while ( $loop->have_posts() ) : $loop->the_post() ; ?>  
      <article class="col-sm-4 post">
        <figure class="">
          <a href="<? the_permalink(); ?>">
            <?php the_post_thumbnail('medium_cropped', array('class' => 'img-responsive')); ?>
          </a>
        </figure>
        
        <section class="">
          <header>
          <span class="bold slug">Past Exhibition</span>
          <h2 class="heavy"><? the_title(); ?>:</h2>
          <h3 class="heavy"><? the_field('sub_title'); ?></h3>
          <time><?php the_field('dates'); ?></time>
          </header>
        </section>
      </article>
    <?php endwhile;?> 
    <?php wp_reset_query();?> 
    
    
 </section><!-- end row -->
 
 
</section><!-- end container -->

<?php get_footer(); ?>
