<?php get_header(); ?>


<section class="container">
 <section class="row">
    
  <article class="row post featured col-sm-12">
    <?php $loop = new WP_Query( array( 'post_type' => 'exhibition' ,  'posts_per_page' => '1'   ) ); ?>
    <?php while ( $loop->have_posts() ) : $loop->the_post() ; ?>

    <figure class="col-sm-6">
        <a href="<? the_permalink(); ?>">
          <?php the_post_thumbnail('medium_cropped', array('class' => 'img-responsive')); ?>
        </a>
    </figure>
    
    <section class="col-sm-6">
      <header>
        <span class="bold slug">Upcoming</span>
        <h2 class="heavy"><? the_title(); ?></h2>
        <h3 class="heavy"><? the_field('sub_title'); ?></h3>
        <time><?php the_field('dates'); ?></time>
      </header>
      
      <section class="content">
          <?php the_excerpt(); ?>
      </section>
    </section>
    <?php endwhile; ?>
    <?php wp_reset_query();?>
  </article>
 </section><!-- end row -->
  
  
 <section class="row">
    <?php $loop = new WP_Query( array( 'post_type' => 'exhibition' ,  'posts_per_page' => 16,   'offset' => 1, 'featured' => 'no'  ) ); ?>
    <?php while ( $loop->have_posts() ) : $loop->the_post() ; ?>  
    <article class="col-sm-4 post">
    
    <figure class="">
      <a href="<? the_permalink(); ?>">
        <?php the_post_thumbnail('large', array('class' => 'img-responsive')); ?>
      </a>
    </figure>
    
    <section class="">
      <header>
      <span class="bold slug">Upcoming</span>
      <h2 class="heavy"><? the_title(); ?></h2>
      <h3 class="heavy"><? the_field('sub_title'); ?></h3>
      <time><?php the_field('dates'); ?></time>
      </header>
      
      <section class="content">
        <?phpthe_content();?>
      </section>
    </section>
    
    </article>
    <?php endwhile;?> 
    <?php wp_reset_query();?> 
    
 </section><!-- end row -->
</section><!-- end container -->

<?php get_footer(); ?>
