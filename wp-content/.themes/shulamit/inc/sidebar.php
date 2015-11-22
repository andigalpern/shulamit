<menu class="sidebar-menu">
	<ul>
  	<li><a href="/bio/" class="pjax">WHO IS SARAH?</a></li>
  	<li><a href="/category/use/" class="pjax">USE</a></li>
  	<li><a href="/category/work/" class="pjax">WORK</a></li>
  	<li><a href="/category/live/" class="pjax">LIVE</a></li>
	</ul>
</menu>
<div class="tags-wrap">
  <h3>TAGS</h3>
<?php $tagargs = array(
'smallest'                  => '12', 
'largest'                   => '12',
'unit'                      => 'px', 
'number'                    => 20,  
'format'                    => 'list',
/*
'separator'                 => "\n",
'orderby'                   => 'name', 
'order'                     => 'ASC',
'exclude'                   => null, 
'include'                   => null, 
'topic_count_text_callback' => default_topic_count_text,
'link'                      => 'view', 
'taxonomy'                  => 'post_tag', 
'echo'                      => true,
'child_of'                  => null, // see Note!
*/
); ?>
<?php wp_tag_cloud( $tagargs ); ?>
<a href="/tagged/" class="see-more-tags">See more tags <span>&raquo;</span></a>
</div>

<div class="clear"></div>

<div class="blog-lovin-cta">
  <a href="https://www.bloglovin.com/blogs/sarah-appleby-blog-7335823" target="_blank">
    <span class="icon glyphicon glyphicon-plus-sign"><span>PLUS</span></span>
    <span class="text">Follow me<br> on Bloglovin</span>
    <div class="clear"></div>
  </a>
</div>

<div class="popular-posts">
  <h3>Popular Posts</h3>
  <?php
  query_posts('meta_key=post_views_count&orderby=meta_value_num&order=DESC');
  ?>
  <?php while(have_posts()) : the_post(); ?>
  <article>
    <a href="<? the_permalink(); ?>" class="pjax">
      <?php the_post_thumbnail('medium'); ?>
      <h4><?php the_title(); ?></h4>
      <p class="read-more">CONTINUE READING &raquo;</p>
    </a>
  </article>
  <?php endwhile; ?>
  <?php wp_reset_query(); ?>
</div>

<!--
<div class="ad-banner sidebar-ad">
 <a hef="">
  <img src="http://placehold.it/300x600" class="">
</a>
</div>
-->

<div class="clear"></div>

<div class="follow-on-instagram">
  <a href="https://instagram.com/oksarahappleby/" target="_blank">
    <span class="instagram-icon">&#xe300;</span>
    <span class="text">Follow On Instagram</span>
    <div class="clear"></div>
    <img src="https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xat1/t51.2885-19/10844072_379218778918161_1263391292_a.jpg"/>    <div class="clear"></div>
  </a>
</div>
