<?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); observePostViews(get_the_ID()); ?>
<article class="post">
	<header>
		<time date-time="<?php the_time('d:M:y'); ?>">
			<span class="time-day"><?php the_time('d'); ?></span>
			<span class="time-month"><?php the_time('M'); ?></span>
		</time>
		<div class="heading">
      <span class="sub-title"><? the_field('sub_title'); ?></span>
      <h2><? the_title(); ?></h2>
		</div>
	</header>
	<figure>
		<? the_post_thumbnail('large');  ?>
	</figure>
	
	<div class="excertp">
		<?php the_content(); ?>
		<p class="author-name-slug">
			<?php the_author_firstname(); ?> <?php the_author_lastname(); ?>
		</p>
		<p class="read-more"><a href="/blog" class="pjax">&laquo; BACK TO BLOG</a></p>
		<div class="post-tags">
		<?php
		$posttags = get_the_tags();
		if ($posttags) {
			foreach($posttags as $tag) {
				echo '<a href="/tag/'.$tag->slug.'"/>'.$tag->name.'</a> '; 
			}
		}
		?>
		
	</div>

  <p class="read-more prev-next">	
  <?php previous_post_link('%link', 'PREVIOUS' ); ?>
  <?php next_post_link('%link', 'NEXT' ); ?>
  <?php #next_post_link( '%link &rarr;', '%title' ) ?>
  </p>
     
	</div>
</article>	
<? endwhile; endif; ?>
<?php wp_reset_query(); ?>