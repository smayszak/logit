/**
 * Created by steve on 2/24/15.
 */
$( document ).ready(function() {
    function editData(evt){
      var id = $(evt.currentTarget).data('id');
    };
   $("tr").click(editData);
});