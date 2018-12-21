jQuery(document).ready(function($){
	var i = 0;
	jQuery('.Date').each(function(){
      	jQuery(this).attr('id', 'aaaa'+i)
	    jQuery(this).datepicker({
	    	changeMonth: true,
			changeYear: true
	    });
	    i++;
	});
    
    

	var redir = jQuery("#dotMailer_redir").val();
	if (typeof(redir) !== 'undefined') {
		window.location.href=redir;
	}


	$('#hackweek2018').on('submit', function(e){
		e.preventDefault();

		var frm = $('#hackweek2018');
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            action: frm.attr('action'),
            data: frm.serialize(),
            success: function (response) {
				alert(response);
            },
            error: function (response) {
				// alert(response);
            },
        });

	});
	

});


