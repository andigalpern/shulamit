<!doctype html>
<html class="no-js" lang="">
<head>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title><?php
/*
* Print the <title> tag based on what is being viewed.
* We filter the output of wp_title() a bit -- see
* boilerplate_filter_wp_title() in functions.php.
*/
wp_title( '', true, 'right' );
?></title>
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

<link rel="stylesheet" href="<?php bloginfo( 'template_url' ); ?>/css/main.css">
<script src="<?php bloginfo( 'template_url' ); ?>/js/vendor/modernizr.js"></script>

<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<!--[if lt IE 9]>
<div class="browserupgrade">
<h1 class="logo"><a href="/">Shulamit Nazarian</a></h1>
<p>You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
</div>
<![endif]-->



  
<header class="main-header">
  <section class="container-fluid top-row">
    
    <div class="hamburger">
      <div class="inner">
        <span class="pattie"></span>
        <span class="pattie"></span>
        <span class="pattie"></span>
      </div>
    </div>
    
    <h1 class="logo">
    <a href="/">
      <span>ShulamitNazarian</span>
      <span class="logo-slug">LosAngeles</span>
      </a>
    </h1>
    


  
  </section>
</header>

<nav class="main-nav">
  <div class="inner">
  <header class="main-nav-header">
  </header>
  
  <?php wp_nav_menu( array( 'theme_location' => 'main_menu' ) ); ?>
  
  
  <div class="search-toggle nav"></div>

  
  <footer class="main-nav-footer">
    <menu class="social-links">
      <a href="xxxhttps://www.facebook.com/sarah.appleby" target="_blank">&#xe027;</a>
      <a href="xxhttps://instagram.com/oksarahappleby/" target="_blank">&#xe100;</a>
      <a href="https://www.artsy.net/shulamit-gallery" target="_blank" class="artsty-icon">ARTSY</a>
    </menu>
    <address>
      <p><a href="https://www.google.com/maps/place/17+N+Venice+Blvd,+Venice,+CA+90291/@33.9845967,-118.4710927,17z/data=!3m1!4b1!4m2!3m1!1s0x80c2babbcf9d3253:0xee9f87c131a4f212" target="_blank">17 North Venice Blvd<br>
      Venice California, 90291<br>
      310.281.0961</a><br>
      <a href="mailto:info@shulamitgallery.com" target="_blank">info@shulamitgallery.com</a></p>
    </address>
  </footer>
  
  </div><!-- end inner -->
</nav>

<div id="pjax-content">
  
  <main class="main" id="main">




