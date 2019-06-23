$(function () {

  $(".js-upload-photos").click(function () {
     predeleted();
    $("#fileupload").click();

  });

  $("#fileupload").fileupload({
    dataType: 'json',
    done: function (e, data) {
      if (data.result.is_valid) {
        $("#gallery tbody").prepend(
          "<tr><td><a target='_blank' href='" + data.result.url + "'>" + data.result.name + "</a><img src='"+data.result.url+"' height='100px'></td></tr>"
        )
      }
    }
  });

});

function predeleted()
{

    var urls="/info/del/";
    $.ajax({
      type: "GET",
      url:urls, // Using our resources.json file to serve results
      success: function(result) {

      }
    });


}