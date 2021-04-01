<div class="card news-feed">
	<div class="card-body">
    
		<div class="row" data-news-template> 
	        <div class="col-md-2 mb-2 news-date text-muted d-none d-md-block" data-news-template-date></div>
			<div class="col-12 col-md-10 mb-2 news-link">
	            <i class="fa fa-rss"></i> <a href="#" data-news-template-title data-news-template-link></a>
	        </div>
	    </div>
	
	</div>
	
    <div class="card-footer">
        
		<div class="row">
			<div class="col-md-2 mb-2 news-date text-muted d-none d-md-block">
				<?php echo date('n/d');  ?>
			</div>
			<div class="col-12 col-md-10 mb-2 news-link">
	            <i class="fa fa-rss d-inline"></i>&nbsp;<?php include('price.assets.php'); ?>
	        </div>
		</div>
		
    </div>
</div>
	
