var xxx,xxx1,xxx2
var NoQ = {
    nq: 1,
    noq:1,
    usid:1,
    a : function() {
    return this.nq;
  },
  b : function() {
    return this.noq;
  },
   c : function() {
    return this.usid;
  },


};

function modeltimer()
{
var dt1 = $('#evnt').val()
var dt = new Date(dt1);
 dt.setMinutes( dt.getMinutes() + 1 );
var countDownDate = dt.getTime();
// Update the count down every 1 second
document.getElementById("go").disabled = true;
var t=0;
 xxx1 = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("modeltime").innerHTML = days+"days :"+ hours + "h :"
  + minutes + "m :" + seconds + "s ";

  // If the count down is over, write some text

  t=t+1;
  if (distance < 0) {
    clearInterval(xxx1);

    if(Math.abs(distance)<7200000){
    document.getElementById("modeltime").innerHTML = "IS RUNNING";
    medeltimeremove();
    }else
    {
        document.getElementById("modeltime").innerHTML = "IS OVER";

    }
  }
}, 1000);


}

function medeltimeremove()
{

var dt = new Date();
 dt.setMinutes( dt.getMinutes() + 1 );
var countDownDate = dt.getTime();
// Update the count down every 1 second
document.getElementById("go").disabled = false;
 xxx2 = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
//  document.getElementById("modeltime").innerHTML =  hours + "h :"
 // + minutes + "m :" + seconds + "s ";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(xxx2);
    document.getElementById("modeltime").innerHTML = " IS OVER";
    document.getElementById("go").disabled = true;

  }
}, 1000);

}

function modelstart()
{
 alert(123);
}


function examtimer()
{

var dt = new Date();
 dt.setMinutes( dt.getMinutes() + 120 );
var countDownDate = dt.getTime();
document.getElementById("id4").style.backgroundColor = "#f8f9fa"
// Update the count down every 1 second
 xxx = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("timer").innerHTML =  hours + "h :"
  + minutes + "m :" + seconds + "s ";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(xxx);
    document.getElementById("timer").innerHTML = "EXPIRED";
    resulting();
  }
}, 1000);


}
function modeltests()
{

var displayResources = $("#mdt");

var url="/info/home/event/api/";


$.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
       console.log(result)
          console.log(result);
          output="";

          for( var i in result){
                output+="<li class='nav-item dropdown'>"+
                "<a class='nav-link dropdown-toggle' href='' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+

                           "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'"+
                                 "fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'"+
                                 "stroke-linejoin='round' class='feather feather-layers'>"+
                                "<polygon points='12 2 2 7 12 12 22 7 12 2'></polygon>"+
                                "<polyline points='2 17 12 22 22 17'></polyline>"+
                                "<polyline points='2 12 12 17 22 12'></polyline>"+
                            "</svg>"+

                            result[i].name+
                        "<sup>th</sup> preli test</a>";

                        var modeltest=result[i].modeltests;

                           output+="<div class='dropdown-menu' id='subs' aria-labelledby='navbarDropdown'>";
                           for(var j in modeltest){
                            if(i==0 && j==0)
                            {
                            x=1;
                            }else{
                            output+="<a class='dropdown-item' href ='#' onclick='ques(val="+modeltest[j].id+")'>"+modeltest[j].test+"</a>"+

                            "<div class='dropdown-divider'></div>";
                             }}

                          output+="</div></div></li>";

           }
                displayResources.html(output);


      }
    });

}


function ques(vers)
{
 // alert(vers)
   clearInterval(xxx);
  document.getElementById("id4").disabled = true;
examtimer();
  {
var displayResources = $("#qus");

var url="/info/home/modelversion/api/"+vers+"/";


$.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(resu) {
       console.log(resu)
          console.log(resu);
          output="";
          var cnt=1;
           for (var j in resu){
           result=resu[j].modelquestion;
          for( var i in result){
            output+= "<div class='row' style='margin-left: 20px;'>"+
                   "<div class='m1-1' id='questionid"+cnt+"'>"+  (cnt)+". "+result[i].title+""+
                        "<ul style='margin-top: 5px;margin-bottom: 1rem;padding-inline-start: 30px'>";
                          if (result[i].que_pic!="/media/que_folder/None/no-img.jpg"){
                          output+="<img src='"+result[i].que_pic+"' style='height:200px;width:70%;'>";
                          }
                           output+="<div  class='radio'><label><input onclick='disables(a="+cnt+")' type='radio' name='options"+cnt+"' value='1' class='regular-radio'>  ক.   "+result[i].op1+"</label></div>"+
                           "<div  class='radio'><label><input onclick='disables(a="+cnt+")' type='radio' name='options"+cnt+"' value='2' class='regular-radio'>  খ.   "+result[i].op2+"</label></div>"+
                           "<div  class='radio'><label><input onclick='disables(a="+cnt+")' type='radio' name='options"+cnt+"' value='3' class='regular-radio'>  গ.   "+result[i].op3+"</label></div>"+
                           "<div  class='radio'><label><input onclick='disables(a="+cnt+")' type='radio' name='options"+cnt+"' value='4' class='regular-radio'>  ঘ.   "+result[i].op4+"</label></div>"+

                           "<input type='hidden' id='ans"+cnt+"' value='"+result[i].ans+"'>"+
                           "<input type='hidden' id='exp"+cnt+"' value='"+result[i].explain+"'>"+

                            "<div id='decision"+cnt+"'>"+
                            "</div>"+
                            "</ul>"+
                    "</div>"+
                "</div>";
                cnt++;

                }
                }
                output+=" <button   onclick='resulting()' style='padding: 15px 50px;' class='btn btn-primary'>upload</button>";

                displayResources.html(output);
                NoQ.nq=cnt-1

      }
    });

}
}

function disables(a)
{

//$("#questionid1").prop('disabled',true);
var nodes = document.getElementById("questionid"+a).getElementsByTagName('*');
for(var i = 0; i < nodes.length; i++){
     nodes[i].disabled = true;
     nodes[i].style.backgroundColor = "#f7f8f9"
}
 //var radioValue = $("input[name='options"+a+"']:checked").val();

               // alert("Your are a - " + radioValue);
}


function resulting(){
//alert(12)
ns=['a','ক','খ','গ','ঘ']
var at=0,ri=0,wr=0;
for(var i =1;i<=NoQ.a();i++){

display=$('#decision'+i)

var exp=$('#exp'+i).val();
var radioValue = $("input[name='options"+i+"']:checked").val();
var ans=$('#ans'+i).val();
output="";
if(radioValue){

var ds=""
 if(parseInt(ans)==parseInt(radioValue))
 {
  ds="Right Answer!";
  ri++;
 }else{
    ds="Wrong Answer!";
    wr++;

 }
                          output+="<h4>"+ds+"</h4>"+
                                    "<p>Correct answer is : <strong>"+ns[ans]+"</strong><br>"+
                                        "<strong>explain:</strong>"+exp+"</p>";


}else{
                        output+="<h4>Not Attempted!</h4>"+
                                    "<p>Correct answer is : <strong>"+ns[ans]+"</strong><br>"+
                                        "<strong>explain:</strong>"+exp+"</p>";

     at++;
}
  display.html(output);
}


reseted();
mdout=$('#rest');
mrks=ri-wr*(.5);
out="";
out+= "<table class='table table-sm'>"+
  "<thead>"+
    "<tr>"+
      "<th scope='col'>#</th>"+
      "<th scope='col'>parameter</th>"+
      "<th scope='col'>number</th>"+

    "</tr>"+
  "</thead>"+
  "<tbody>"+
     "<tr>"+
     " <th scope='row'>1</th>"+
      "<td>Total Questions</td>"+
      "<td>"+NoQ.a()+"</td>"+
    "</tr>"+
    "<tr>"+
     " <th scope='row'>2</th>"+
      "<td>Not attempted</td>"+
      "<td>"+at+"</td>"+
    "</tr>"+
    "<tr>"+
     " <th scope='row'>3</th>"+
      "<td>Right Answer</td>"+
      "<td>"+ri+"</td>"+
    "</tr>"+
"<tr>"+
     " <th scope='row'>4</th>"+
      "<td>Wrong Answer</td>"+
      "<td>"+wr+"</td>"+
    "</tr>"+
    "<tr>"+
     " <th scope='row'>5</th>"+
      "<td>Total Marks</td>"+
      "<td>"+mrks+"</td>"+
    "</tr>"+

  "</tbody>"+
  "</table>";

     mdout.html(out);


}

function reseted()
{
clearInterval(xxx);
document.getElementById("id4").disabled = false;
document.getElementById("id4").style.backgroundColor = "red"

for (var j =1;j<=NoQ.a();j++)
{
var nodes = document.getElementById("questionid"+j).getElementsByTagName('*');
for(var i = 0; i < nodes.length; i++){
     nodes[i].disabled = true;
     nodes[i].style.backgroundColor = "#f7f8f9"
}

}
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


