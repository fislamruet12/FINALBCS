
      $(document).ready(function() {
  $("#retrieve-resources").click(function() {



  });
});

function information(urls)
{
alert(urls)
var displayResources = $("#inform");

    displayResources.text("Loading data from JSON source...");

    $.ajax({
      type: "GET",
      url: urls, // Using our resources.json file to serve results
      success: function(result) {
        console.log(result);
        var output =
          "";
        for (var i in result) {
            var x=result[i].content,y;
            y=x.split(".");

          output +="<div class='w3-example'>"+
            "<h2 class='d'>"+result[i].title+"</h2>";
            output+="<div class='w3-code notranslate htmlHigh'>";
            for(var j=0;j<y.length;j++)
            {
              output+="<p style='font-size:90%'>"+y[j]+"</p>";
            }
           output+="</div>"+
               "<a  href='#/info/' class='w3-btn w3-margin-bottom'>অনুশীলন</a>"
             +"</div>";


        }
        output += "";

        displayResources.html(output);

      }
    });


}