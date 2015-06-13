<?php get_header(); ?>

<div class="tags-wrap container tags-page-wrap">
<?php $tagargs = array(
'smallest'                  => '12', 
'largest'                   => '12',
'unit'                      => 'px', 
'number'                    => 200,  
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
</div>

<?php get_footer(); ?>