<?php


require_once('locale/en_US.php');

require_once(__DIR__ . '/includes/http.php');
require_once(__DIR__ . '/includes/i18n.php');

define('CACHE_LOCATION', __DIR__ . '/.cache');
error_reporting(E_ALL);

$feed = json_decode(
    cacheFetchURL('summary.json', 'https://api.quarantine.country/api/v1/summary/latest', 5 * 60),
    true
);

?>

<!DOCTYPE html>
<html lang=en-US>
<head>
	<?php include_once('parts/meta.php'); ?>
	
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.slim.min.js"></script>
    <script type="text/javascript" src="//cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="assets/js/content.js"></script>
	
    <link rel="stylesheet" type="text/css" href="//covidscript-yatko.netdna-ssl.com/assets/css/bootstrap.min.css" data-theme-bootstrap>
    <link rel="stylesheet" type="text/css" href="//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/style.css" data-theme-style>
	<link rel="stylesheet" type="text/css" href="assets/css/theme.css" >
	
	<link rel="shortcut icon" type="image/png" href="assets/images/favicon.png" sizes=32x32>
	
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-162200634-2"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	
	  gtag('config', 'UA-162200634-2');
	</script>
</head>

<body class="coronavirus-theme bg-light theme-light" data-spy="scroll" data-offset="80">
	<header>
	    <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
	        <a class="navbar-brand" href="#"><h1 class="display-5 d-none d-md-inline"><?php echo __('h1_title'); ?></h1>
	            <span><i class="fa fa-virus"></i><?php echo __('nav_brand'); ?></span></a>
				<span class="sr-only text-muted">by <a class="pl-2 text-muted" href="https://covidscript.com/#php">Covid-19 Script</a></span>
	    </nav>
	</header>
	
	<!-- main content -->
	<div id="atf"></div>
	<div id="btf">    
	    <div class="container-fluid">
	
	       <?php include_once('parts/dashboard.php'); ?>
		   
	    </div><!--end container-fluid-->
	</div>

	<!-- /main content -->
    <script async defer src="assets/js/script.js"></script>
    <script async defer src="assets/js/map.js"></script>
    <script async defer src="assets/js/chart.js"></script>
    <script async defer src="assets/js/top.js"></script>
    <script async defer src="assets/js/table.js"></script>
    <script async defer src="assets/js/news.js"></script>
    <script async defer src="assets/js/price-assets.js"></script>
    <script async defer src="assets/js/theme.js"></script>
	<script src='//kit.fontawesome.com/a076d05399.js'></script>
</body>
</html>
