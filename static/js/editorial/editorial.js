


function edicontent() {
var x1=document.getElementById("boxcontrol").value;
var display=$('#qucontrol')
   str="";
   n=parseInt(x1);
   var output=""
   for(var x=0;x<n;x++)
   {
    output+="<div class='form-group col-md-6'>"+

                    "<textarea class='form-control' id='cnt"+x+"' rows='6' placeholder='content'></textarea>"+

                "</div>"+
                "<div class='form-group col-md-6'>"+

                    "<textarea class='form-control' id='mn"+x+"' rows='6' placeholder='meaning'></textarea>"+

                "</div>";

   }
display.html(output)

  }

  function ediiems()
  {
    var display=$('#channels')
    var item=parseInt($('#items').val());

    output="";
    for(var i=0;i<item;i++)
    {
      output+="<div class='row'>"+
            "<div class='form-group col-md-6'>"+
                "<input type='text' class='form-control' id='ty"+i+"' placeholder='title'>"+
            "</div>"+
        "</div>"+
        "<div class='row'>"+
            "<div class='form-group col-md-10'>"+

                "<div class='row'  id='typeno"+i+"'>"+

                "</div>"+
            "</div>"+
            "<div class='form-group col-md-2'>"+
                "<select id='box"+i+"' onchange='editype(val="+i+")' class='form-control'>"+
                    "<option value='' selected>Choose...</option>"+
                    "<option value='1'>1</option>"+
                    "<option value='2'>2</option>"+
                    "<option value='3'>3</option>"+
                    "<option value='4'>4</option>"+
                    "<option value='5'>5</option>"+
                    "<option value='6'>6</option>"+
                    "<option value='7'>7</option>"+


               " </select>"+
           " </div>"+
       "</div>"+
        "<h1 class='page-header'>"+

        "</h1>";
    }

    display.html(output)

  }

  function editype(id) {
var x1=document.getElementById("box"+id).value;
var display=$('#typeno'+id)
   str="";
   n=parseInt(x1);
   var output=""
   for(var x=0;x<n;x++)
   {
    output+="<div class='form-group col-md-12'>"+

                    "<textarea class='form-control' id='el"+id+x+"' rows='1' placeholder='element' required></textarea>"+

                "</div>";


   }
display.html(output)

  }

function modal_edit(id)
{

  var display=$('#md_ed')
  $.ajax({
            type: "GET",
            url: "/editorial/content/api/"+id+"/",
            dataType: 'json',
            success: function(result){
                output="<h2>"+result.title+"</h2> <div class='modal-header'></div>";
                var contents=result.contents;
                for(var i in contents )
                {
                  output+="<h4 style='font-weight: 100;'>"+contents[i].passage+"</h4><br>"+
                           "<h4 style='font-weight: 100;'>"+contents[i].mean+"</h4><br>";
                }
                 output+="<div class='modal-header'></div>";
                 var meaning=result.meaning
                 for(var i in meaning)
                 {
                      output+="<h4>"+meaning[i].types+":</h4><br><ul>";
                      meaningelements=meaning[i].meaningelement
                       for(var j in meaningelements)
                       {
                         output+="<li>"+meaningelements[j].data+":</li><br>";
                       }
                       output+="</ul>";

                 }
                display.html(output)
            }
        });
}


