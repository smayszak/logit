/**
 * Created by steve on 2/24/15.
 */

var logeditPage = function(){
    debugLog("Logedit run page");
    setDates();
    setCategory();
    $("#sendit").click(edit);
    $("#deleteit").click(remove);
    validatedForm = true;
};

var edit = function(){
    var formData = $('form').serialize();
    var categoryId = $("#category").find(':selected').data('id');
    formData += "&categoryId=" + categoryId;
    $.ajax({
        url: "/transactions/edit",
        data: formData,
        method: 'patch'
    }).done(function(data) {
        debugLog(data);
        if(data == 'ok'){
            window.location = '/transactions/logit';
        }else{
            $("#error").show();
        }
    });
}

var remove = function(){
    var formData = {id: $("#id").val()};
    $.ajax({
        url: "/transactions/edit",
        data: formData,
        method: 'delete'
    }).done(function(data) {
        debugLog(data);
        if(data == 'ok'){
            window.location = '/transactions/logit';
        }else{
            $("#error").show();
        }
    });
}

var setCategory = function(){
    var options = $('option');
    for(var idx = 0; idx < options.length; idx++){
        if($(options[idx]).text() == window.theRecord.category){
            debugLog('logit defaultCategory: found default');
            $(options[idx]).prop('selected', true)
            break;
        }
    }
}
var setDates = function(){
    var date = window.theRecord.date;
    var d = new Date(date);
    var logit = new Logit();
    logit.setTimeZone(d, $("#tz"));
    logit.setLocalTime(d, $("#dt"));
}

window.registerPageLoad(logeditPage);
