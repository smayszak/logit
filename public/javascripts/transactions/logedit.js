/**
 * Created by steve on 2/24/15.
 */

window.runPage = function(){
    categoryAccessor.updateCategories(pageAccessor);
    categoryAccessor.defaultCategory(pageAccessor);
    var logit = new Logit();
    logit.setTimeZone($("#tz"));
    logit.setLocalTime($("#dt"));
};

$( document ).ready(function() {
});