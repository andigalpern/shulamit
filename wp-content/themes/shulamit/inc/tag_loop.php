<?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<article class="post col-sm-4 post-masonry-item">
  <div class="inner">
    <header>
      <span class="sub-title"><? the_field('sub_title'); ?></span>
      <h2><a href="<? the_permalink(); ?>" class="pjax"><? the_title(); ?></a></h2>
    </header>
  	<figure>
  		<a href="<? the_permalink(); ?>" class="pjax">
  			<? the_post_thumbnail('large');  ?>
  		</a>
  	</figure>
  	
  	<div class="excertp">
  		<?php //the_excerpt(); ?>
  		<p class="author-name-slug">
  			<?php the_author_firstname(); ?> <?php the_author_lastname(); ?>
  		</p>
  		<p class="read-more"><a href="<? the_permalink(); ?>" class="pjax">CONTINUE READING</a></p>>
  	</div>
  </div>
</article>	
<? endwhile; endif; ?>
<?php wp_reset_query(); ?>