var xxx,xxx1,xxx2
var NoQ = {
    nq: 1,
    noq:1,
    usid:1,
    userdetails:{},
    a : function() {
    return this.nq;
  },
  b : function() {
    return this.noq;
  },
   c : function() {
    return this.usid;
  },
  d:function()
  {
  return this.userdetails
  }


};

function modeltimer()
{
var dt1 = $('#evntss').val()
var dt = new Date(dt1);
 dt.setMinutes( dt.getMinutes() + 0 );
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

  if (distance < 0) {
  document.getElementById("modeltime").innerHTML = "Thank for staying with us"

    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
    clearInterval(xxx1);
    if (Math.abs(distance)<100000)
    {
       if($('#head').val()==$('#head1').val()){
        alert("You have to patient until the contest has been finished")

}else{
        ques();
        }
    }else{
    alert("result")
    document.getElementById('dash').innerHTML="CONTEST IS OVER"


   userretrieve();


    }


  }
}, 1000);



}





function examtimer()
{

var dt = new Date();
 dt.setMinutes( dt.getMinutes() + 1 );
var countDownDate = dt.getTime();

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
  document.getElementById("timer").innerHTML =  hours + ":"
  + minutes + ":" + seconds + "";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(xxx);
    document.getElementById("timer").innerHTML = "EXPIRED";
    resulting();
   // alert("remove question")
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

                             document.getElementById("md").value = modeltest[j].id;

                             document.getElementById("head").innerHTML = modeltest[j].test;
                             document.getElementById("head").value = modeltest[j].test;
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


function ques()
{
 clearInterval(xxx);
examtimer();
vers=parseInt($('#md').val());
alert(vers);
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
                output+=" <button  id='smb' onclick='resulting()' style='padding: 15px 50px;' class='btn btn-primary'>upload</button>";

                displayResources.html(output);
                NoQ.nq=cnt-1

      }
    });

}
}

function resultques()
{

vers=parseInt($('#md').val());
ns=['a','ক','খ','গ','ঘ']
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
            output+= "<div class='row' style='margin-left: 20px;' disabled>"+
                   "<div class='m1-1' id='questionid"+cnt+"'>"+  (cnt)+". "+result[i].title+""+
                        "<ul style='margin-top: 5px;margin-bottom: 1rem;padding-inline-start: 30px; background-color:#f8f9fa'>";
                          if (result[i].que_pic!="/media/que_folder/None/no-img.jpg"){
                          output+="<img src='"+result[i].que_pic+"' style='height:200px;width:70%;'>";
                          }
                          if(result[i].ans==1)
                          {
                          output+="<div  class='radio'><label><input  type='radio' name='options"+cnt+"' value='2' class='regular-radio' disabled checked>  ক.   "+result[i].op1+"</label></div>";

                          }else{
                          output+= "<div  class='radio'><label><input  type='radio' name='options"+cnt+"' value='2' class='regular-radio' disabled > ক.    "+result[i].op1+"</label></div>";

                          }
                           if(result[i].ans==2)
                          {
                             output+="<div  class='radio'><label><input  type='radio' name='options"+cnt+"' value='1' class='regular-radio' disabled checked> খ.    "+result[i].op2+"</label></div>";

                          }else{
                             output+="<div  class='radio'><label><input  type='radio' name='options"+cnt+"' value='1' class='regular-radio' disabled > খ.   "+result[i].op2+"</label></div>";

                          }
                           if(result[i].ans==3)
                          {
                           output+="<div  class='radio'><label><input  type='radio' name='options"+cnt+"' value='3' class='regular-radio' disabled checked>  গ.   "+result[i].op3+"</label></div>";

                          }else{
                             output+="<div  class='radio'><label><input  type='radio' name='options"+cnt+"' value='3' class='regular-radio' disabled>  গ.   "+result[i].op3+"</label></div>";

                          }
                           if(result[i].ans==4)
                          {
                           output+="<div  class='radio'><label><input  type='radio' name='options"+cnt+"' value='4' class='regular-radio' disabled checked>  ঘ.   "+result[i].op4+"</label></div>";

                          }else{
                           output+="<div  class='radio'><label><input  type='radio' name='options"+cnt+"' value='4' class='regular-radio' disabled>  ঘ.   "+result[i].op4+"</label></div>";

                          }


                            output+="<div id='decision"+cnt+"'>"+
                            "<p>Correct answer is : <strong>"+ns[result[i].ans]+"</strong><br><strong>explain:</strong>"+result[i].explain+"</p>"+
                            "</div>"+
                            "</ul>"+
                    "</div>"+
                "</div>";
                cnt++;

                }
                }

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

var exp=$('#exp'+i).val();
var radioValue = $("input[name='options"+i+"']:checked").val();
var ans=$('#ans'+i).val();
if(radioValue){
 if(parseInt(ans)==parseInt(radioValue))
 {
  ri++;
 }else{
    wr++;
 }

}else{

     at++;
}
}
mrks=ri-wr*(.5);

insertresult(at,wr,ri,mrks);
setTimeout("location.reload(true);",2000);
}
function insertresult(at,wa,ra,marks)
{

   urls="/exam/contest/upload/";
   inform={"test":$('#head').val()}

   mark=[]
   mr={
   'qu':NoQ.a(),
   'at':at,
   'wa':wa,
   'ra':ra,
   'marks':marks
   }
  mark.push(mr)
  inform.mark=mark
  console.log(inform)
  $.ajax({
        type:"POST",
        url:urls,
        dataType:'json',
        data:{inform:JSON.stringify(inform)},
        success:function(msg){
          alert("ok");
        }

  });


}

function allresult()
{

vers=($('#head').val());

  {
var displayResources = $("#qus");
document.getElementById('qs').style.display="block";
document.getElementById('rs').style.display="block";
document.getElementById("usersearch").classList.remove('d-none');
var url="/exam/contest/api/"+vers+"/";
users=NoQ.d()
//console.log("ok")
//console.log(users)
$.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(resu) {
       console.log(resu)
          //console.log(resu);
          out="";
          var cnt=1;

out+= "<table id='tb' class='table table-sm'>"+
  "<thead>"+
    "<tr>"+
      "<th scope='col'>#</th>"+
      "<th scope='col'>User</th>"+
      "<th scope='col'>Total Question</th>"+
      "<th scope='col'>Not Attempted</th>"+
      "<th scope='col'>Right Answer </th>"+
      "<th scope='col'>Wrong Answer</th>"+
      "<th scope='col'>Total Matks</th>"+
    "</tr>"+
  "</thead>";
           for (var j in resu){
           result=resu[j].mark;
          for( var i in result){



  out+="<tbody>"+
     "<tr>"+
      "<th >"+cnt+"</th>"+
      "<td >"+users[resu[j].usermodeltest_id]+"</td>"+
      "<td >"+result[i].qu+"</td>"+
      "<td >"+result[i].at+"</td>"+
      "<td >"+result[i].ra+"</td>"+
      "<td >"+result[i].wa+"</td>"+
      "<td >"+result[i].marks+"</td>"+
    "</tr>"+

  "</tbody>";


              cnt=cnt+1;
                }
                }
                out+="</table>";

                displayResources.html(out);


      }
    });

}


}

function  usermarks()
{
 var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("usersearch");
    filter = input.value.toUpperCase();
    tble = document.getElementById("tb");
    tbody = tble.getElementsByTagName("tbody");

    for (i = 0; i < tbody.length; i++) {
        a = tbody[i].getElementsByTagName("td")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tbody[i].style.display = "";
        } else {
            tbody[i].style.display = "none";
        }
    }

}


function outquestion()
{
resultques();
}
function dicition()
{
ns=['a','ক','খ','গ','ঘ']
var at=0,ri=0,wr=0;
alert(123);
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
                          output+=""+
                                    "<p>Correct answer is : <strong>"+ns[ans]+"</strong><br>"+
                                        "<strong>explain:</strong>"+exp+"</p>";


}else{
                        output+=""+
                                    "<p>Correct answer is : <strong>"+ns[ans]+"</strong><br>"+
                                        "<strong>explain:</strong>"+exp+"</p>";

     at++;
}
  display.html(output);
}

}

function userretrieve()
{

  $.ajax({
      type: "GET",
      url: "/exam/contest/user/api/", // Using our resources.json file to serve results
      success: function(result) {
      console.log(result)
      NoQ.userdetails=result
       allresult();
      }
  });
}