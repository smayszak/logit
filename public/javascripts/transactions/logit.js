
var logPage = function(){
    debugLog("Logit run page");
    categoryAccessor.updateCategories(pageAccessor);
    categoryAccessor.defaultCategory(pageAccessor);
    var logit = new Logit();
    var d = new Date();
    logit.setTimeZone(d, $("#tz"));
    logit.setLocalTime(d, $("#dt"));
};

window.registerPageLoad(logPage);

$( document ).ready(function() {
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
        var accountId = accountAccessor.getAccountId();
        if(accountId == null || accountId == "")
            return false;

        var currentUser = accountAccessor.getCurrentUser();
        if(currentUser == null)
            return false;

        var categoryId = $("#category").find(':selected').data('id');

        if(categoryId == null)
            return false;

        $("#sendit").attr("value", "Saving...");
        var formData = $('form').serialize();
        formData += "&user=" + currentUser.name;
        formData += "&userId=" + currentUser._id;
        formData += "&categoryId=" + categoryId;
        formData += "&accountId=" + accountId;
        debugLog(formData);
        $.ajax({
            url: "/transactions/create",
            data: formData,
            method: 'post'
        }).done(function(data) {
            debugLog(data);
            var  last = "<a href='/transactions/edit?id="+data.id+"'>Saved. Click here to edit last record</a>";
            $('form')[0].reset()
            $("#lastitem").empty();
            $("#lastitem").append(last);
            $("#sendit").attr("value", "Save");
            $("#sendit").addClass('disabledForm');
            var logit = new Logit();
            logit.setTimeZone($("#tz"));
            logit.setLocalTime($("#dt"));
            categoryAccessor.defaultCategory(pageAccessor);
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

	this.setTimeZone = function(d, $obj){

		$obj.val(d.getTimezoneOffset());
	}
	this.setLocalTime = function(d, $obj){
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
                var item = "<option data-id='"+data[idx]._id+"'>" + data[idx].name + "</option>";
                $("#category").append(item);
            }
        },
        defaultCategory : function(defCat){
            debugLog('logit defaultCategory: setting default');
            var options = $('option');
            for(var idx = 0; idx < options.length; idx++){
                if($(options[idx]).text() == defCat){
                    debugLog('logit defaultCategory: found default');
                    $(options[idx]).prop('selected', true)
                    return;
                }
            }
            debugLog('logit defaultCategory: no default found');
        }
    };
})();
