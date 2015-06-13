<?php get_header(); ?>
sigle.php
<section class="container">
	<div class="row">
		<div class="col-md-9 blog-col">
		<?php include 'inc/single_loop.php' ; ?>
		</div>
		<aside class="col-md-3 right-sidebar">
		<?php include 'inc/sidebar.php'; ?>	
		</aside>
	</div><!-- END ROW -->

<?php get_footer(); ?>