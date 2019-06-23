

function events()
{

  var display=$('#date')
  out=""
  for(var i=1;i<32;i++ )
  {
    out+="<option value='"+i+"'>"+i+"</option>";
  }
  display.html(out);


  var display=$('#year')
  out=""
  for(var i=2019;i<2040;i++ )
  {
    out+="<option value='"+i+"'>"+i+"</option>";
  }
  display.html(out);


  var display=$('#hour')
  out=""
  for(var i=0;i<24;i++ )
  {
    out+="<option value='"+i+"'>"+i+"</option>";
  }
  display.html(out);

  var display=$('#min')
  out=""
  for(var i=0;i<60;i++ )
  {
    out+="<option value='"+i+"'>"+i+"</option>";
  }
  display.html(out);

}