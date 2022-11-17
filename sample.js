$(document).ready(function() {
    $('.select2bs4').select2({
		theme: 'bootstrap4'
	});
	
	$('#wrocatty').on('change',function(){
		getwrkcode($(this).val());
	});
	
});


function getwrkcode(value) {
	if (value == "0") {
		return false;
	}
	$("#wrk_code").empty();
	$('#wrk_code').select2({
					theme: 'bootstrap4',
					data: [{id:'0', text:'---Please Select Work Code ---'}],
				});
	$.ajax({
	method : "POST",
	url : "/mis/materialpayslip/workcode",	
	data : {
		"work_category" : value,
		"_csrf": $('#tkn').val(),
	},
	dataType : "json",
	success: function(wrkcode) {
			if(wrkcode.status){
				var res = $.map(wrkcode.data,function(item){
								return{id: item.work_category,text:item.work_code}
							})
				$('#wrk_code').select2({
					theme: 'bootstrap4',
					data: res,
				});
			}
			else{
				swal.fire("Info","Invalid","info");
				return false;	
			}
	},
});
}
