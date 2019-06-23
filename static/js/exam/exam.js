var xxx;
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

function examtimer(times,ids)
{
 //
NoQ.noq=5;
questions(ids);
var dt = new Date();
 dt.setMinutes( dt.getMinutes() + times );
var countDownDate = dt.getTime();
document.getElementById("id1").disabled = true;
document.getElementById("id2").disabled = true;
document.getElementById("id3").disabled = true;
document.getElementById("id4").disabled = true;
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


function questions(ids)
{
var displayResources = $("#qus");

var url="/info/home/exam/api/"+ids+"/"+NoQ.b()+"/";


$.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
       console.log(result)
          console.log(result);
          output="";
          var cnt=1;
          for( var i in result){
            output+= "<div class='row' style='margin-left: 20px;'>"+
                   "<div class='m1-1' id='questionid"+cnt+"'>"+  (cnt)+". "+result[i].title+""+
                        "<ul style='margin-top: 5px;margin-bottom: 1rem;padding-inline-start: 30px'>";
                          if (result[i].que_pic!="/media/que_folder/None/no-img.jpg"){
                          output+="<img src='"+result[i].que_pic+"' style='height:250px;'>";
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
                output+=" <button   onclick='resulting()' style='padding: 15px 50px;' class='btn btn-primary'>upload</button>";

                displayResources.html(output);
                NoQ.nq=cnt-1
      }
    });

}

function subject()
{

var displayResources = $("#subs");
var head=$('#head');

var url="/info/home/subjects/";


$.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
       console.log(result)
          console.log(result);
          output="";
          hout="";

          for( var i in result){
                  output+="<a class='dropdown-item' href='/exam/start/"+result[i].id+"/'>"+result[i].name+"</a>";
                if(result[i].id==NoQ.c())
                {
                  hout="<strong>"+result[i].name+"</strong>";
                }

           }
                displayResources.html(output);
                head.html(hout);

      }
    });

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
document.getElementById("id1").disabled = false;
document.getElementById("id2").disabled = false;
document.getElementById("id3").disabled = false;
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