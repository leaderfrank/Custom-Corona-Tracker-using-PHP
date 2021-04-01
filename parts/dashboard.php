<!-- covid-19 update -->
<div class="row pt-4">
	
	<!-- coronavirus update -->
	<div class="col-12 col-md-6 look2">
		
		<!-- coronavirus cases -->
		<div class="row">
			<?php include_once('cases.global.php'); ?>			
		</div><!-- /coronavirus cases -->
		
		<!-- coronavirus today & graph -->
		<div class="row">
			
			<!-- today -->
			<div class="col-12 col-lg-6 d-none d-md-block">
				<?php include_once('cases.today.php'); ?>				
			</div><!-- /today -->
			
			<!-- graph -->
			<div class="col-12 col-lg-6 d-none d-lg-block">
				<?php include_once('graph.global.php'); ?>					
			</div><!-- /graph -->	
			
		</div> <!-- /coronavirus today & graph -->
		
	</div><!-- /coronavirus update -->	
	
	<!-- coronavirus map -->
	<div class="col-12 col-md-6">	
		<?php include_once('map.global.php'); ?>
	</div><!-- /coronavirus map -->	
	
</div><!-- /covid-19 update -->

<!-- covid-19 top 10 -->
<div class="row pt-4 top-list">
	
	<!-- top 10 set1 -->
	<div class="col-6 col-md-4 col-lg-3 col-xl-2 mb-2" data-top-by="total">
        <div class="row mb-1">
			<div class="col-12 text-muted small">
				<span class="pl-1">Top Cases</span>
			</div>
        </div>

		<?php include('cases.top.php'); ?>	
	</div>
	
	<!-- top 10 set2 -->
	<div class="col-6 col-md-4 col-lg-3 col-xl-2 mb-2" data-top-by="total_change">
        <div class="row mb-1">
			<div class="col-12 text-muted small">
				<span class="pl-1">Top Cases (Today)</span>
			</div>
        </div>

		<?php include('cases.top.php'); ?>		
	</div>

    <!-- top 10 set3 -->
    <div class="col-6 col-md-4 col-lg-3 col-xl-2 mb-2 d-none d-md-block" data-top-by="active">
        <div class="row mb-1">
			<div class="col-12 text-muted small">
				Top Active
			</div>
        </div>

        <?php include('cases.top.php'); ?>
    </div>
	
	<!-- top 10 set4 -->
	<div class="col-6 col-md-4 col-lg-3 col-xl-2 mb-2 d-none d-md-block" data-top-by="recovered">
        <div class="row mb-1">
			<div class="col-12 text-muted small">
				Top Recovered
			</div>
        </div>

		<?php include('cases.top.php'); ?>		
	</div>
	
	<!-- top 10 set5 -->
	<div class="col-6 col-md-4 col-lg-3 col-xl-2 mb-2 d-none d-md-block" data-top-by="deaths">
        <div class="row mb-1">
			<div class="col-12 text-muted small">
				Top Deaths
			</div>
        </div>

		<?php include('cases.top.php'); ?>		
	</div>
	
	<!-- top 10 set6 -->
	<div class="col-6 col-md-4 col-lg-3 col-xl-2 mb-2 d-none d-md-block" data-top-by="tested">
        <div class="row mb-1">
			<div class="col-12 text-muted small">
				Top Tested
			</div>
        </div>

		<?php include('cases.top.php'); ?>		
	</div>

</div><!-- /covid-19 top 10 -->

<!-- covid-19 top all -->
<div class="row pt-4 top-table d-none d-lg-block">
	
	<!-- table -->
	<div class="col-12">    
		<?php include('table.global.php'); ?>
	</div>
	
</div><!-- /covid-19 top all -->

<!-- covid-19 news -->
<div class="row pt-4 news">
    <!-- tweets -->
    <div class="col-12 col-md-4 mb-2 d-none d-md-block">
        <?php include('tweets.php'); ?>
    </div>
    <!-- news -->
    <div class="col-12 col-md-8 col-xl-5 mb-2">
        <?php include('news.php'); ?>
    </div>
	<!-- empty s -->
    <div class="col-12 col-xl-3 mb-2 d-none d-xl-block">
        <?php include('custom.php'); ?>
    </div>
</div><!-- /covid-19 news -->

<!-- footer -->
<div class="row pb-4 footer">
    <div class="col-12">
        <?php include('footer.php'); ?>
    </div>
</div><!-- /footer -->
