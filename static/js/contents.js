
function contents(urls,pageurl)
{
  alert(urls)
window.history.pushState('object or string', 'Title',""+pageurl);
var displayResources = $("#conntent");

    displayResources.text("Loading data from JSON source...");

    $.ajax({
      type: "GET",
      url: urls, // Using our resources.json file to serve results
      success: function(result) {
        console.log(result);
        var output ="";

        for(var i in result){
          var d = new Date();

            output+="<div class='w3-col l10 m12' style='margin:10px;'><h1><span class='color_h1';>"+result[i].contentlist+" </span></h1>"+
            "<p>last update "+d.getMonth()+" months ago</span></p>"+
               "<div id ='single'>"+
                "<a id='qm'></a>";
               // "<a  onclick='questions(val=12653)' href='#'  data-toggle='modal' data-target='#mod'>Practice Question&raquo;</a>";
            output+="<div class='w3-clear nextprev'>"+
              //  "<a class='w3-left w3-btn' href='#' onclick='contents(val="+xl+")'>&#10094; Previous</a>"+
                //"<a class='w3-right w3-btn' href='/info/home/catalog/4/25/'>Next &#10095;</a>"+
            "</div><hr>";
          var cn=result[i].contents;


             for(var j in cn){

            var cont=cn[j].content.split('.');
            var im=cn[j].images;
            var mod=im.length,l;
             if(mod!=0){
               l=cont.length/mod;
            }

  output+= "<hr><div class='bd'><h2>"+cn[j].title+"</h2>"+
                "<p>The button in front "+cn[0].boxcontent+" or behind it as a help text.</p>"+
                "<p>The <code>.input-group-addon</code> class attaches an icon or help text next to the input field.</p><br>"
                +"<div class='w3-example'>"+
                    "<div class='w3-code notranslate htmlHigh clearfix'>"+
                       "<ul>";

                              var imc=0;
                              var imgs=cn[j].images;

                              // output+="<img class='img1' src='"+imgs[0].content_pic+"' width='170' height='170'>";

                              for(var r in cont)
                            {

                              if(r%l==0)
                              {
                                for(var r in imgs)
                              {
                                  output+="<img class='img1' src='"+imgs[imc].content_pic+"' width='170' height='170'>";
                                  imc++;
                                  break;

                              }

                              }
                              output+="<li style='font-size:16px;font-weight:200;'>"+cont[r]+"</li>";
                            }

                        output+="</ul>"+
                    "</div>"+

                 "</div><br>";

              var tabletitle=cn[j].contenttable;
              var a=['cl1','cl2'];

              for(var k in tabletitle){
              var tableinfos=tabletitle[k].tableinfo
     output+="<br><p><code class='w3-codespan' >"+tabletitle[k].title+"</code></p>"+

               "<div class='w3-example' style='padding: 0.01em 5px;margin: 5px 0;'>"+

                    "<div class='w3-code notranslate htmlHigh clearfix'>"+
                        "<table id='customers'>"+
                    "<tr>"+
                        "<th>"+tabletitle[k].cl1+"</th>"+
                        "<th>"+tabletitle[k].cl2+"</th>"+
                        "<th>"+tabletitle[k].cl3+"</th>"+
                   "</t br>";
                   for(var tf in tableinfos )
                   if(tf%2==0){
                   output+="<tr>"+
                        "<td>"+tableinfos[tf].tl1+"</td>"+
                        "<td>"+tableinfos[tf].tl2+"</td>"+
                        "<td>"+tableinfos[tf].tl3+"</td>"+
                    "</tr>";
                    }else{
                    output+="<tr class='alt'>"+
                        "<td>"+tableinfos[tf].tl1+"</td>"+
                        "<td>"+tableinfos[tf].tl2+"</td>"+
                        "<td>"+tableinfos[tf].tl3+"</td>"+
                    "</tr>";
                    }
                output+="</table>"+
               "</div>"+
              "</div>";
               }



              output+="<br><div class='w3-example'>"+

                        "<a onclick='questions(val="+cn[j].id+")' href='#' class='w3-btn w3-margin-bottom'  data-toggle='modal' data-target='#mod'>Practice Question&raquo;</a>"+


                     "</div><br>";

           output+="</div>";


}




               output+="</div></div><div class='w3-col l2 m12' id='right'>"+

            "<div class='sidesection w3-light-grey' style='margin-left:auto;margin-right:auto;max-width:230px'>"+
            "<div class='w3-container w3-dark-grey'>"+

                    "<h4><a href='#' onclick='tropicexam()' >Take Exam</a></h4>"+
                "</div><hr>"+

                "<div class='w3-container w3-dark-grey'>"+

                    "<h4><a  class='w3-hover-text-white'>tropics</a></h4>"+
                "</div>"+
                "<div class='w3-container w3-left-align w3-padding-16'>";
                // alert(one+urls+pageurl +"hello");

                for(k in cn)
            {
                    output+="<a href='#' onclick='singleE(b="+result[i].id+",d="+cn[k].id+")'>"+cn[k].title+"</a><br>";
             }
                  output+="</div>"+
                 "</div>";
            "</div>";
            }

        output += "";



        displayResources.html(output);

      }
    });
}



function questions(quesid)
{

  var x="/info/home/qu/api/"+quesid+"/";
  var displayResources = $("#qm");
      var cnt=1;
$.ajax({
  type:"GET",
  url:x,
    success:function(result)
    {
    var subdisplay= $("#qut")
     out="";

      for(var tp in result){
       var qus=result[tp].allquestion;

        for(var q in qus){
        out+="<div class='scontainer clearfix bd'>"+
        "<div class='tooltipz'>"+
               "<span class='tooltiptextz'>"+result[tp].title+"</span>"+
                       "</div>"+

        "<div class='lcontainer bd'>"+

         "<div><span style='font-size:150%;color:black;margin-left: -18px;'>"+(cnt++)+".</span><span style='font-size:120%;color:black'>"+qus[q].title+"</span> <a href='#'><span style='float:right;color:red;'>Bookmarks<span></a></div>"+

                      "<ul>"+
                           "<img src='https://images.pexels.com/photos/372297/pexels-photo-372297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' width='90%' height='150'>"+
                          "<li><strong class='d'> "+qus[q].que_pic+"</strong>"+
                            "</li>"
                            +"<li><strong class='d'> "+qus[q].op1+"</strong>"+
                            "</li>"+
                            "<li><strong class='d'>"+qus[q].op2+"</strong>"+
                            "</li>"+
                            "<li><strong class='d'>"+qus[q].op3+"</strong>"+
                            "</li>"+
                            "<li><strong class='d'>"+qus[q].op4+"</strong>"+
                            "</li>"+


                        "</ul>"+

        "<div class='radio img1'>"+
        "<label>"+
            "<input type='radio' name='ab"+tp+q+"' onclick='click_position(this,"+tp+","+q+")' id='ab' value='Ans : "+qus[q].ans+"'/>উত্তর</label>"+
         "</div>"+

        "<div class='radio img1'>"+
        "<label>"+
            "<input type='radio'  id='ab1' name='ab"+tp+q+"' onclick='click_position(this,"+tp+","+q+")' value='explain : "+qus[q].explain+"' class='regular-radio'' />ব্যাখ্যা</label>"+
         "</div>";
           out+="</div>"+

           "<div class='rcontainer'>";
        out+="<p id='ans"+tp+q+"'>press to get ans</p>";
           out+="</div></div><br>";
}

         "</div>";
         }
   // alert(result[0].title);
    subdisplay.html(out);
    }
});


$.ajax({
  type:"GET",
  url:"/info/home/modelquestion/api/"+quesid+"/",
    success:function(result)
    {

    var subdisplay= $("#qut")
     out="";


      for (var vr in result)
      {
        versions=result[vr].version;
        for (var tp in versions){
          modelquestions=versions[tp].modelquestion
          for( var q in modelquestions)
          {

        out+="<div class='scontainer clearfix bd'>"+
        "<div class='tooltipz'>"+
               "<span class='tooltiptextz'>other</span>"+
                       "</div>"+

        "<div class='lcontainer bd'>"+

         "<div><span style='font-size:150%;color:black;margin-left: -18px;'>"+(cnt++)+".</span><span style='font-size:120%;color:black'>"+modelquestions[q].title+"</span> <a href='#'><span style='float:right;color:red;'>Bookmarks<span></a></div>"+

                      "<ul>"+
                           "<img src='https://images.pexels.com/photos/372297/pexels-photo-372297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' width='90%' height='150'>"+
                          "<li><strong class='d'> "+modelquestions[q].que_pic+"</strong>"+
                            "</li>"
                            +"<li><strong class='d'> "+modelquestions[q].op1+"</strong>"+
                            "</li>"+
                            "<li><strong class='d'>"+modelquestions[q].op2+"</strong>"+
                            "</li>"+
                            "<li><strong class='d'>"+modelquestions[q].op3+"</strong>"+
                            "</li>"+
                            "<li><strong class='d'>"+modelquestions[q].op4+"</strong>"+
                            "</li>"+


                        "</ul>"+

        "<div class='radio img1'>"+
        "<label>"+
            "<input type='radio' name='pq"+tp+q+"' onclick='click_position1(this,"+tp+","+q+")' id='px' value='Ans : "+modelquestions[q].ans+"'/>উত্তর</label>"+
         "</div>"+

        "<div class='radio img1'>"+
        "<label>"+
            "<input type='radio'  id='pq1' name='ab"+tp+q+"' onclick='click_position1(this,"+tp+","+q+")' value='explain : "+modelquestions[q].explain+"' class='regular-radio'' />ব্যাখ্যা</label>"+
         "</div>";
           out+="</div>"+

           "<div class='rcontainer'>";
        out+="<p id='ans1"+tp+q+"'>press to get ans</p>";
           out+="</div></div><br>";
}

         out+="</div>";
          }

      }



    subdisplay.append(out);
    }
});

var output="";
 output+="<div class='modal fade' id='mod' role='dialog'>"+
    "<div class='modal-dialog'>"+


      "<div class='modal-content'>"+
        "<div class='modal-header'>"+
        "<h1>QUESTION</h1>"+
          "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"+
        "</div>"+

        "<div id='qut' class='modal-body mcontainer clearfix '>"+
        "</div>"+
        "<div class='modal-footer'>"+
          "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"+
        "</div>"+
      "</div>"+

    "</div>"+
  "</div>";
  displayResources.html(output);

}

function greeting (obj) {
    alert('Hello ' + obj.first + ' ' + obj.last);
}


function singleE(a,b)
{
var displayResources = $("#single");
var url="/info/home/single/api/"+a+"/"+b+"/";
    displayResources.text("Loading data from JSON source...");

 $.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
        console.log(result);
        var output ="";

            output+="<a id='qm'></a>";
            output+="<div class='w3-clear nextprev'>"+
            "</div><hr>";

            var cont=result.content.split('.');
            var im=result.images;
            var mod=im.length,l;
             if(mod!=0){
               l=cont.length/mod;
            }

  output+= "<div ><h2>"+result.title+"</h2>"+
                "<p>The button in front "+result.boxcontent+" or behind it as a help text.</p>"+
                "<br>"
                +"<div class='w3-example'>"+
                    "<div class='w3-code notranslate htmlHigh clearfix'>"+
                       "<ul>";

                              var imc=0;
                              var imgs=result.images;

                              // output+="<img class='img1' src='"+imgs[0].content_pic+"' width='170' height='170'>";

                              for(var r in cont)
                            {

                              if(r%l==0)
                              {
                                for(var r in imgs)
                              {
                                  output+="<img class='img1' src='"+imgs[imc].content_pic+"' width='170' height='170'>";
                                  imc++;
                                  break;

                              }

                              }
                              output+="<li style='font-size:16px;font-weight:200;'>"+cont[r]+"</li>";
                            }

                        output+="</ul>"+
                    "</div>"+

                 "</div><br>";

              var tabletitle=result.contenttable;


              for(var k in tabletitle){
              var tableinfos=tabletitle[k].tableinfo
     output+="<br><p><code class='w3-codespan' >"+tabletitle[k].title+"</code></p>"+

               "<div class='w3-example' style='padding: 0.01em 5px;margin: 5px 0;'>"+

                    "<div class='w3-code notranslate htmlHigh clearfix'>"+
                        "<table id='customers'>"+
                    "<tr>"+
                        "<th>"+tabletitle[k].cl1+"</th>"+
                        "<th>"+tabletitle[k].cl2+"</th>"+
                        "<th>"+tabletitle[k].cl3+"</th>"+
                   "</t br>";
                   for(var tf in tableinfos )
                   if(tf%2==0){
                   output+="<tr>"+
                        "<td>"+tableinfos[tf].tl1+"</td>"+
                        "<td>"+tableinfos[tf].tl2+"</td>"+
                        "<td>"+tableinfos[tf].tl3+"</td>"+
                    "</tr>";
                    }else{
                    output+="<tr class='alt'>"+
                        "<td>"+tableinfos[tf].tl1+"</td>"+
                        "<td>"+tableinfos[tf].tl2+"</td>"+
                        "<td>"+tableinfos[tf].tl3+"</td>"+
                    "</tr>";
                    }
                output+="</table>"+
               "</div>"+
              "</div>";
               }



              output+="<br><div class='w3-example'>"+

                        "<a onclick='questions(val="+result.id+")' href='#' class='w3-btn w3-margin-bottom'  data-toggle='modal' data-target='#mod'>Practice Question&raquo;</a>"+


                     "</div><br>";



        output += "";

        displayResources.html(output);

      }
    });


}

 function subject()
    {
      var display = $("#subjects");

      var url="/info/home/sub/api/";
    $.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
      output="";
      output+="<option value=''>..</option>";
        console.log(result);
            for(var j in result){
            output+="<option value='"+result[j].id+"'>"+result[j].name+"</option>";

            }
            output+="";

            display.html(output);

      }
    });

}

function catagory()
    {
      var display = $("#subcata");
   var x=document.getElementById("subjects");
   n=parseInt(x.value);
  // alert(n);
      var url="/info/home/hole/api/"+n+"/";
    $.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
      output="";
      output+="<option value=''>..</option>";
        console.log(result);
            for(var j in result){
            output+="<option value='"+result[j].id+"'>"+result[j].catalist+"</option>";

            }
            output+="";

            display.html(output);

      }
    });

}


function subcatagory()
    {
      var display = $("#cataE");
   var x=document.getElementById("subcata");
   var x1=document.getElementById("subjects");
   var n=parseInt(x.value);
   var n1=parseInt(x1.value);
   //alert(n);
      var url="/info/home/hole/api/"+n1+"/";
    $.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
      output="";
      output+="<option value=''>..</option>";
        console.log(result);
            for(var j in result){

             if(result[j].id==n){
            //  alert(n);
             var cat=result[j].catagoried;
              for(var k in cat){
            output+="<option value='"+cat[k].id+"'>"+cat[k].contentlist+"</option>";
            }
             }
            }
            output+="";

            display.html(output);

      }
    });

}

function preroot()
    {

      var display = $("#root");
   var x=document.getElementById("cataE");
   n=parseInt(x.value);

      var url="/info/preroot/"+n+"/";
    $.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
      output="";
      output+="<option value=''>..</option>";
        console.log(result);
            for(var j in result){
            output+="<option value='"+result[j].id+"'>"+result[j].name+"</option>";

            }
            output+="";

            display.html(output);

      }
    });

}

function bcsmodel()
    {
      var display = $("#bcs");
   var x=document.getElementById("root");
   n=parseInt(x.value);

      var url="/info/home/modelquestion/api/"+n+"/";
    $.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
      output="";
      output+="<option value=''>..</option>";
        console.log(result);
            for(var j in result){
            output+="<option value='"+result[j].id+"'>"+result[j].name+"</option>";

            }
            output+="";

            display.html(output);

      }
    });

}


function bcsversion()
    {
      var display = $("#version");
   var x=document.getElementById("bcs");
   n=parseInt(x.value);

      var url="/info/preroot2/"+n+"/";
    $.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
      output="";
      output+="<option value=''>..</option>";
        console.log(result);
            for(var j in result){
            output+="<option value='"+result[j].id+"'>"+result[j].versionname+"</option>";

            }
            output+="";

            display.html(output);

      }
    });

}
function event()
    {
      var display = $("#version");

      var url="/info/preroot1/";
    $.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
      output="";
      output+="<option value=''>..</option>";
        console.log(result);
            for(var j in result){
            output+="<option value='"+result[j].name+"'>"+result[j].name+"</option>";

            }
            output+="";

            display.html(output);

      }
    });

}

function subcatagory()
    {
      var display = $("#cataE");
   var x=document.getElementById("subcata");
   var x1=document.getElementById("subjects");
   var n=parseInt(x.value);
   var n1=parseInt(x1.value);
   //alert(n);
      var url="/info/home/hole/api/"+n1+"/";
    $.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
      output="";
      output+="<option value=''>..</option>";
        console.log(result);
            for(var j in result){

             if(result[j].id==n){
            //  alert(n);
             var cat=result[j].catagoried;
              for(var k in cat){
            output+="<option value='"+cat[k].id+"'>"+cat[k].contentlist+"</option>";
            }
             }
            }
            output+="";

            display.html(output);

      }
    });

}

function tropicexam()
{
   alert("exam is procced");
}


var person = {
  firstName: 1,
  lastName : 2,
  a : function() {
    return this.firstName;
  },
  b : function() {
    return this.lastName;
  }
};

function Upcontents(urls,pageurl,au,ac)
{


person.firstName=au;
person.lastName=ac;
window.history.pushState('object or string', 'Title',""+pageurl);
var displayResources = $("#conntent");

    //displayResources.text("Loading data from JSON source...");

    $.ajax({
      type: "GET",
      url: urls, // Using our resources.json file to serve results
      success: function(result) {
        console.log(result);
        var output ="";

        for(var i in result){
          var d = new Date();

            output+="<div id='gallery' class='w3-col l10 m12' style='margin:10px;'><h1><span class='color_h1';>"+result[i].contentlist+" </span></h1>"+
            "<p>last update "+d.getMonth()+" months ago</span></p>"+
               "<div id ='single'>"+

                "<a id='qm'></a>";
               // "<a  onclick='questions(val=12653)' href='#'  data-toggle='modal' data-target='#mod'>Practice Question&raquo;</a>";
            output+="<div class='w3-clear nextprev'>"+
              //  "<a class='w3-left w3-btn' href='#' onclick='contents(val="+xl+")'>&#10094; Previous</a>"+
                //"<a class='w3-right w3-btn' href='/info/home/catalog/4/25/'>Next &#10095;</a>"+
            "</div><hr>";
          var cn=result[i].contents;


             for(var j in cn){

            var cont=cn[j].content.split('.');
             var im=cn[j].images;


            var mod=im.length,l;
             if(mod!=0){
               l=cont.length/mod;
            }


  output+= "<hr><div  style='padding: 6px;'><h2>"+cn[j].title+"</h2>"+
                "<p>"+cn[j].boxcontent+"</p>"+
                "<br>"
                +"<div class='w3-example'>"+
                    "<div class='w3-code notranslate htmlHigh clearfix'>"+
                       "<ul>";
                              var imc=0;
                              var imgs=cn[j].images;
                              var contbytable=cn[j].contentstables;
                              //alert(contbytable)
                               for( var ii in contbytable)
                               {
                                 output+="<li>"+contbytable[ii].qu+"<small style='color:red'> :- </small><small style='font-weight:600'>"+contbytable[ii].ans+"</small></li>";
                               }
                             for(var t in imgs){
                              // output+="<img class='img1' src='"+imgs[t].content_pic+"' width='170' height='170'><br>";
                               }

                            for(var r in cont)
                            {

                              if(r%l==0)
                              {
                                for(var r in imgs)
                              {
                                  output+="<img class='img1' src='"+imgs[imc].content_pic+"' width='170' height='170'>";
                                  imc++;
                                  break;

                              }

                              }
                              output+="<li style='font-size:16px;font-weight:200;'>"+cont[r]+"</li>";
                            }

                        output+="</ul>"+
                    "</div>"+

                 "</div><br>";

              var alltables=cn[j].tables;


              for(var k in alltables){

              var tabletitle=alltables[k].tabletitle;
              var tableinfo=alltables[k].tableinfo;
     output+="<br><p><code class='w3-codespan' >"+alltables[k].title+"</code></p>"+

               "<div class='w3-example' style='padding: 0.01em 5px;margin: 5px 0;'>"+

                    "<div class='w3-code notranslate htmlHigh clearfix'>"+
                        "<table id='customers'>"+
                    "<tr>";
                      for(var l in tabletitle)
                      {
                       output+="<th>"+tabletitle[l].col+"</th>";
                      }

                   output+="</tr>";

                   var len=tabletitle.length;
                   var a=[[]];
                   var k=0;



             output+="<tr style='background-color: #bdc8be;'>";
            for(var h=0;h<tableinfo.length;h++)
                   {
                      if(k<len)
                      {
                        //alert(tableinfo[h].col);
                        output+="<td>"+tableinfo[h].col+"</td>";
                        k++;
                      }else{
                        k=0;
                     output+="</tr><tr style='background-color: #bdc8be;'>";
                         h=h-1;

                      }
                   }





                output+="</tr></table>"+
               "</div>"+
              "</div>";
               }



              output+="<br><div class='w3-example'>"+

                        "<a onclick='questions(val="+cn[j].id+")' href='#' class='w3-btn w3-margin-bottom'  data-toggle='modal' data-target='#mod'>Practice Question&raquo;</a>"+


                     "</div><br>";

           output+="</div>";


}




               output+="</div></div><div class='w3-col l2 m12' id='right' >"+

            "<div class='sidesection w3-light-grey' style='margin-left:auto;margin-right:auto;width: 120%;'>"+
            //"<div class='w3-container w3-dark-grey'>"+

              //      "<a onclick='tropicexam()' href='#'><img src='https://www.gora.si/sites/default/files/images/exam_logo.png' height='50px;' width='100%'></a>"+
              //  "</div><hr>"+

                "<div class='w3-container w3-dark-grey'>"+

                    "<h4><a  class='w3-hover-text-white'>tropics</a></h4>"+
                "</div>"+
                "<div id='rightsurls' class='w3-container w3-left-align w3-padding-16'>";
                // alert(one+urls+pageurl +"hello");

                for(k in cn)
            {
                    output+="<a href='#s' onclick='UpdatesingleE(b="+result[i].id+",d="+cn[k].id+")'>"+cn[k].title+"</a><br>";
             }
                  output+="</div>"+
                 "</div>";
            "</div>";
            }

        output += "";



        displayResources.html(output);



      }
    });


}


function UpdatesingleE(a,b)
{

person.firstName=100000;
person.lastName=100000;
var displayResources = $("#single");
var url="/info/home/upsingle/api/"+a+"/"+b+"/";
    displayResources.text("Loading data from JSON source...");

 $.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
        console.log(result);
        var output ="";

            output+="<a id='qm'></a>";
            output+="<div class='w3-clear nextprev '>"+
            "</div><hr>";

            var cont=result.content.split('.');
             var im=result.images;


            var mod=im.length,l;
             if(mod!=0){
               l=cont.length/mod;
            }


  output+= "<div  style='padding: 6px;'><h2>"+result.title+"</h2>"+
                "<p>"+result.boxcontent+"</p>"+
                "<br>"
                +"<div class='w3-example'>"+
                    "<div class='w3-code notranslate htmlHigh clearfix'>"+
                       "<ul>";


                           var imc=0;
                              var imgs=result.images;
                              var contbytable=result.contentstables;
                              //alert(contbytable)
                               for( var ii in contbytable)
                               {
                                 output+="<li>"+contbytable[ii].qu+"<small style='color:red'> :- </small><small style='font-weight:600'>"+contbytable[ii].ans+"</small></li>";
                               }
                              // output+="<img class='img1' src='"+imgs[0].content_pic+"' width='170' height='170'>";
                        for(var r in cont)
                            {

                              if(r%l==0)
                              {
                                for(var r in imgs)
                              {
                                  output+="<img class='img1' src='"+imgs[imc].content_pic+"' width='170' height='170'>";
                                  imc++;
                                  break;

                              }

                              }
                              output+="<li style='font-size:16px;font-weight:200;'>"+cont[r]+"</li>";
                            }

                        output+="</ul>"+
                    "</div>"+

                 "</div><br>";

          var alltables=result.tables;


              for(var k in alltables){

              var tabletitle=alltables[k].tabletitle;
              var tableinfo=alltables[k].tableinfo;
     output+="<br><p><code class='w3-codespan' >"+alltables[k].title+"</code></p>"+

               "<div class='w3-example' style='padding: 0.01em 5px;margin: 5px 0;'>"+

                    "<div class='w3-code notranslate htmlHigh clearfix'>"+
                        "<table id='customers'>"+
                    "<tr>";
                      for(var l in tabletitle)
                      {
                       output+="<th>"+tabletitle[l].col+"</th>";
                      }

                   output+="</tr>";

                   var len=tabletitle.length;
                   var a=[[]];
                   var k=0;



             output+="<tr style='background-color: #bdc8be;'>";
            for(var h=0;h<tableinfo.length;h++)
                   {
                      if(k<len)
                      {
                        //alert(tableinfo[h].col);
                        output+="<td>"+tableinfo[h].col+"</td>";
                        k++;
                      }else{
                        k=0;
                     output+="</tr><tr style='background-color: #bdc8be;'>";
                         h=h-1;

                      }
                   }





                output+="</tr></table>"+
               "</div>"+
              "</div>";
               }



              output+="<br><div class='w3-example'>"+

                        "<a onclick='questions(val="+result.id+")' href='#' class='w3-btn w3-margin-bottom'  data-toggle='modal' data-target='#mod'>Practice Question&raquo;</a>"+


                     "</div><br>";



        output += "";

        displayResources.html(output);

      }
    });



}

function myFunction() {
var x1=document.getElementById("boxcontrol").value;
var display=$('#qucontrol')
   str="";
   n=parseInt(x1);
   var output=""
   for(var x=0;x<n;x++)
   {
    output+="<div class='form-group col-md-8'>"+

                    "<textarea class='form-control' id='qu"+x+"' rows='2' placeholder='Question'></textarea>"+

                "</div>"+
                "<div class='form-group col-md-4'>"+

                    "<textarea class='form-control' id='ans"+x+"' rows='2' placeholder='answer'></textarea>"+

                "</div>";

   }
display.html(output)

  }
  function myFunctionCata() {
var x1=document.getElementById("boxcontrol").value;
var display=$('#qucontrol')
   str="";
   n=parseInt(x1);
   var output=""
   for(var x=0;x<n;x++)
   {
    output+="<div class='form-group col-md-12'>"+

                    "<textarea class='form-control' id='catas"+x+"' rows='1' placeholder='catagory' required></textarea>"+

                "</div>";


   }
display.html(output)

  }

function TableE(c)
    {
      var x=document.getElementById("Econtrol");
  var r=parseInt(x.value);
   var display=$("#rowcol")
   //alert(c);
   output="<br>";
   for(var j=0;j<r;j++){
      output+="<div class='form-row'>";
     for(var i=0;i<c;i++){
                       output+="<div class='form-group col-md-"+Math.floor(12/c)+"'>"+

                            "<input type='text' id='row"+j+i+"' class='form-control' placeholder='col"+i+"' required>"+
                            "</div>";
                            }

                   output+= "</div>";
            }
   display.html(output);
        }


 function Table()
        {
             var x=document.getElementById("tablecontrol");
   n=parseInt(x.value);
   var display=$("#column")

     output="<div class='form-group col-md-12'>"+
                            "<label>Table title</label>"+
                        "<input type='text' class='form-control' id='table-title' placeholder='table title' required>"+

                    "</div>";
   for(var i =0;i<n;i++)
   {
                      output+= "<div class='form-group col-md-"+Math.floor(12/n)+"'>"+
                            "<input type='input' class='form-control' id='clm"+i+"' placeholder='col"+i+" name' required>"+

                          "</div>";
   }
      output+="<div class='form-group col-md-12'>";
   output+="<select id='Econtrol' onchange='TableE("+n+")' class='form-control' style='width: 16%;' required>"+
                        "<option value=''>No of rows...</option>";
                        for(var t=1;t<30;t++){
                        output+="<option value='"+t+"'>"+t+"</option>";
                        }

                    "</select></div>";


   display.html(output);
        }


function reload()
{
location.reload();
}


function AddOnebyOne(userid,catid,elementNo)
{
//alert("el= "+(elementNo-1)+" "+catid);
var x=elementNo-1;
var displayResources = $("#single");
var rightdisplay=$("#rightsurls");

var url="/info/home/upaddonebyone/api/"+catid+"/"+x+"/";
 $.ajax({
      type: "GET",
      url: url, // Using our resources.json file to serve results
      success: function(result) {
       console.log(result)
          console.log(result);
        var output ="";
        var rightout="";
       for(var t in result){
            output+="<a id='qm'></a>";
            output+="<div class='w3-clear nextprev'>"+
            "</div><hr>";

            var cont=result[t].content.split('.');
             var im=result[t].images;


            var mod=im.length,l;
             if(mod!=0){
               l=cont.length/mod;
            }


  output+= "<div style='padding: 6px;'><h2>"+result[t].title+"</h2>"+
                "<p>"+result[t].boxcontent+"</p>"+
                "<br>"
                +"<div class='w3-example'>"+
                    "<div class='w3-code notranslate htmlHigh clearfix'>"+
                       "<ul>";


                           var imc=0;
                              var imgs=result[t].images;
                              var contbytable=result[t].contentstables;
                              //alert(contbytable)
                               for( var ii in contbytable)
                               {
                                 output+="<p>"+contbytable[ii].qu+"-<small>"+contbytable[ii].ans+"</small></p>";
                               }
                              // output+="<img class='img1' src='"+imgs[0].content_pic+"' width='170' height='170'>";
                        for(var r in cont)
                            {

                              if(r%l==0)
                              {
                                for(var r in imgs)
                              {
                                  output+="<img class='img1' src='"+imgs[imc].content_pic+"' width='170' height='170'>";
                                  imc++;
                                  break;

                              }

                              }
                              output+="<li style='font-size:16px;font-weight:200;'>"+cont[r]+"</li>";
                            }

                        output+="</ul>"+
                    "</div>"+

                 "</div><br>";

          var alltables=result[t].tables;


              for(var k in alltables){

              var tabletitle=alltables[k].tabletitle;
              var tableinfo=alltables[k].tableinfo;
     output+="<br><p><code class='w3-codespan' >"+alltables[k].title+"</code></p>"+

               "<div class='w3-example' style='padding: 0.01em 5px;margin: 5px 0;'>"+

                    "<div class='w3-code notranslate htmlHigh clearfix'>"+
                        "<table id='customers'>"+
                    "<tr>";
                      for(var l in tabletitle)
                      {
                       output+="<th>"+tabletitle[l].col+"</th>";
                      }

                   output+="</tr>";

                   var len=tabletitle.length;
                   var a=[[]];
                   var k=0;



             output+="<tr style='background-color: #bdc8be;'>";
            for(var h=0;h<tableinfo.length;h++)
                   {
                      if(k<len)
                      {
                        //alert(tableinfo[h].col);
                        output+="<td>"+tableinfo[h].col+"</td>";
                        k++;
                      }else{
                        k=0;
                     output+="</tr><tr style='background-color: #bdc8be;'>";
                         h=h-1;

                      }
                   }





                output+="</tr></table>"+
               "</div>"+
              "</div>";
               }



              output+="<br><div class='w3-example'>"+

                        "<a onclick='questions(val="+result[t].id+")' href='#' class='w3-btn w3-margin-bottom'  data-toggle='modal' data-target='#mod'>Practice Question&raquo;</a>"+


                     "</div><br>";

                  rightout+="<a href='#s' onclick='UpdatesingleE(b="+catid+",d="+result[t].id+")'>"+result[t].title+"</a><br>";



        output += "";
}
        displayResources.append(output);
        rightdisplay.append(rightout);

      }
    });

}