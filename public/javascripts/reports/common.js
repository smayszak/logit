
function zeroPadded(val) {
    if (val >= 10)
        return val;
    else
        return '0' + val;
}

$( document ).ready(function() {
    var tDay = new Date();
    var sds = tDay.getFullYear() + '-' + zeroPadded(tDay.getMonth() + 1) + '-01';
    tDay.setDate(tDay.getDate() + 1);
    var tds = tDay.getFullYear() + '-' + zeroPadded(tDay.getMonth() + 1) + '-' + zeroPadded(tDay.getDate());
    var tzOff = tDay.getTimezoneOffset() / 60;
    $("#sd").val(sds);
    $("#ed").val(tds);
    $("#tz").val(tzOff);
    $("#up_down").click(function(){
        console.log('click');
        $("#up_down").toggleClass("arrowtop");
        $("#up_down").toggleClass("arrowbottom");
        $("#report_flyout").toggleClass("rptup");
        $("#report_flyout").toggleClass("rptdown");
        $("#report_content").toggle();
        $("#ad").toggle();
        $("#au").toggle();
        $("#report_options").toggle();
    });

    $("#getit").click(function(){
        $("#up_down").trigger("click");
       runReport();
        return false;
    });
    runReport = function(){
        var formData = $('form').serialize();
        $.ajax({
            url: "/reports/run",
            data: formData
        }).done(function(data) {
            console.log(data);
            $("#report_content").empty();
            var report = reportFactory.getReport();
            report.run(data, $("#report_content"));
        });
    }
    runReport();
});

var gridReport = (function(){

    function rowClick(evt){
        var category = $(evt.currentTarget).data("category");
        if(category != undefined){
            var s = $("#sd").val();
            var e = $("#ed").val();
            var t = $("#tz").val();
            var route = (window.location.origin + "/edit?c=" + category +"&t=" + t +"&s="+s+"&e="+e) ;
            window.location.replace(route);
        }
    };

    return {
        run: function (data, $_target) {
            var content = '';
            content+='<p>' +  $("#sd").val() + ' - ' +  $("#ed").val() + '</p>';
            content+= '<table class="rpt_table">';
            content+='<tr><th>Category</td><td>Cash</td><td>Credit</td><td>Total</td></tr>';
            for(var key in  data.items){
                var item = data.items[key];
                content+='<tr data-category="'+item.category +'"><td>'+item.category +'</td><td>'+item.cash.toFixed(2)+'</td><td>'+item.credit.toFixed(2)+'</td><td>'+item.total.toFixed(2)+'</td></tr>';
            }
            content+='<tr style="border-top 1px double"><td>Total:</td><td>'+data.cashTotal.toFixed(2)+'</td><td>'+data.credTotal.toFixed(2)+'</td><td>'+data.total.toFixed(2)+'</td></tr></table>';
            $_target.append(content);
            $(".rpt_table tr").click(rowClick);
        }
    };

})();

var reportFactory = (function(){
    return {
        getReport: function(){
            var reportName = $("#rp").val();
            if(reportName == 'Grid'){
                return gridReport;
            }
        }
    };
})();
