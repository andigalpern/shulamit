<?php get_header(); ?>



<section class="container">
  
  
    <header class="row press-heading">
    <div class="col-sm-12">
      <h4 class="heavy">Upcoming Exhibitions</h4>
    </div>
  </header>
  
<?php $loop = new WP_Query( array( 'post_type' => 'exhibition' ,  'posts_per_page' => '9' , 'cat'=>'9' ) ); ?>
<?php while ( $loop->have_posts() ) : $loop->the_post() ; ?>

 <section class="row">
    
    <article class="row post featured col-sm-12">
  
      <figure class="col-sm-6">
          <a href="<? the_permalink(); ?>">
            <?php the_post_thumbnail('extra_large', array('class' => 'img-responsive')); ?>
          </a>
      </figure>
      
      <section class="col-sm-6">
        <header>
          <span class="bold slug">Upcoming</span>
          <h2 class="heavy"><a href="<? the_permalink(); ?>"><? the_title(); ?>:</a></h2>
          <h3 class="heavy"><a href="<? the_permalink(); ?>"><? the_field('sub_title'); ?></a></h3>
          <time><?php the_field('dates'); ?></time>
        </header>
        
        <section class="content">
            <?php the_excerpt(); ?>
        </section>
      </section>
     
    </article>
    
 </section><!-- end row -->
 
<?php endwhile; ?>
<?php wp_reset_query();?> 
  
 <section class="row">
    <?php $loop = new WP_Query( array( 'post_type' => 'exhibition' ,  'posts_per_page' => 16,   'offset' => '1', 'cat'=>'9'  ) ); ?>
    <?php while ( $loop->have_posts() ) : $loop->the_post() ; ?>  
      <article class="col-sm-4 post">
        <figure class="">
          <a href="<? the_permalink(); ?>">
            <?php the_post_thumbnail('medium_cropped', array('class' => 'img-responsive')); ?>
          </a>
        </figure>
        
        <section class="">
          <header>
          <span class="bold slug">Upcoming</span>
          <h2 class="heavy"><? the_title(); ?>:</h2>
          <h3 class="heavy"><? the_field('sub_title'); ?></h3>
          <time><?php the_field('dates'); ?></time>
          </header>
          
          <section class="content">
            <?php the_content();?>
          </section>
        </section>
      </article>
    <?php endwhile;?> 
    <?php wp_reset_query();?> 
    
    
 </section><!-- end row -->
 
 
</section><!-- end container -->

<?php get_footer(); ?>
