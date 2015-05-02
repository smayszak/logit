$( document ).ready(function() {
    categoryAccessor.updateCategories(pageAccessor);
    categoryAccessor.defaultCategory(pageAccessor);
	var logit = new Logit();
	logit.setTimeZone($("#tz"));
	logit.setLocalTime($("#dt"));

    $( ".press_btn" ).click(function() {
        $(".press_btn").toggleClass('press_btn_selected');
        if($("#cash").hasClass('press_btn_selected')){
            $("#payment").val('cash');
        }else{
            $("#payment").val('credit');
        }
    });
    $("#cost").change(function(){
        enableButton($("#sendit"));
    });
    $("#sendit").click(function(){
        if(validatedForm == false)
            return false;
        validatedForm = false;
        $("#sendit").attr("value", "Saving...");
        var formData = $('form').serialize();
        formData += "&user=" + accountAccessor.currentUser();
        console.log(formData);
        $.ajax({
            url: "/transactions/create",
            data: formData,
            method: 'post'
        }).done(function(data) {
            console.log(data);
            var  last = "<div data-id='"+data.id+"'>Saved. Click her to edit last record</div>";
            $("#cost").val("0.00");
            $("#comments").val('');
            $("#lastitem").empty();
            $("#lastitem").append(last);
            $("#sendit").attr("value", "Save");
            $("#sendit").addClass('disabledForm');
        });
        return false;
    });

});
var validatedForm= false;
function enableButton($_control){
    var cval = $("#cost").val();
    var fval = parseFloat(cval);
    var valid = fval > 0.00 ? true : false;
    validatedForm = valid;
    if(valid){
        $_control.removeClass('disabledForm');
    }else{
        $_control.addClass('disabledForm');
    }
}

function Logit(){

	this.setTimeZone = function($obj){
        var d = new Date();
		$obj.val(d.getTimezoneOffset());
	}
	this.setLocalTime = function($obj){
		var d = new Date();
        var dtlog = d.getFullYear()
            +"-"+zeroPadded(d.getMonth() + 1)
            +"-"+zeroPadded(d.getDate())
            +"T"+zeroPadded(d.getHours())+":"
            +zeroPadded(d.getMinutes());
        console.log(dtlog);
		$obj.val(dtlog);
	}
}


var pageAccessor = (function(){
    return {
        updateCategories: function(data){
           for(var idx = 0; idx< data.length; idx++){
                var item = "<option data-name='"+data[idx]+"'>" + data[idx] + "</option>";
                $("#category").append(item);
            }
        },
        defaultCategory : function(data){
            var options = $('option');
            for(var idx = 0; idx < options.length; idx++){
                var optionvalue = $(options[idx]).data('name');
                if(optionvalue == data){
                    $(options[idx]).select();
                    break;
                }
            }
        }
    };
})();
