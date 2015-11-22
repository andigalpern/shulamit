<?php
query_posts('cat=23,50,16 & posts_per_page=20');
?>

<?php  if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<article class="post">
	<header>
		<time date-time="<?php the_time('d:M:y'); ?>">
			<span class="time-day"><?php the_time('d'); ?></span>
			<span class="time-month"><?php the_time('M'); ?></span>
		</time>
		
		<div class="heading">
        <span class="sub-title"><? the_field('sub_title'); ?></span>
      <h2><a href="<? the_permalink(); ?>" class="pjax"><? the_title(); ?></a></h2>
		</div>
    <?php /* 
    <div class="meta">
    <?php
    $category = get_the_category(); 
    if($category[0]){
    echo '<a class="pjax" href="'.get_category_link($category[0]->term_id ).'" class="category-link">'.$category[0]->cat_name.'</a>';
    }
    ?>
    </div>
    */ ?>	
	</header>
	<figure>
		<a href="<? the_permalink(); ?>" class="pjax">
			<? the_post_thumbnail('large');  ?>
		</a>
	</figure>
	
	<div class="excertp">
		<?php the_excerpt(); ?>
		<p class="author-name-slug">
			<?php the_author_firstname(); ?> <?php the_author_lastname(); ?>
		</p>
		<p class="read-more"><a href="<? the_permalink(); ?>" class="pjax">CONTINUE READING &raquo;</a></p>
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
	</div>
</article>	

<? endwhile; endif; ?>

    <p class="read-more prev-next">	
      <?php //echo paginate_links(); ?>
      <?php next_posts_link( 'Older posts' ); ?>
      <?php previous_posts_link( 'Newer posts' ); ?>
    </p>
    
    
<?php wp_reset_query(); ?>