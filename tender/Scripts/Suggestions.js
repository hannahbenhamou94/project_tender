var product = [];
var sizeRoomy = [];
var price = [];
var flag = false;
var url = null;
var isValid = false;
var inputText = [];
var LastSuggest=0;
var LastDetail=0;
var weight = [];
var avg = 0;
var numT;
var flag = 0;
var numCont=localStorage["user"];



function checkTender() {
    var u = "http://localhost:14962/Login/Login";
    if (localStorage["user"] == undefined)
        window.location.href =u;
    ///cookie
    if (!url) {
        url = window.location.href;
      //  alert(url);
        url = url.substr(url.indexOf('=') + 1);
    }
    var conTo = {
        numCon: numCont,
        numTender: url,
    }

    //         alert(suggestionDetail);
    $.ajax({
        type: 'POST',
        url: '/Suggestions/checkEnglish',
        data: JSON.stringify(conTo),
        contentType: 'application/json',
        success: function (data) {
            if (data == 0) {
                document.getElementById("dd").innerHTML = "אין לך הרשאות למכרז אנא פנה לעורך המכרז";

            }
            else if (data == -1) {
                document.getElementById("dd").innerHTML = "המכרז לא קיים";
            }
        },
        error: function (error) {
            console.log(error);

        }
    });



}

function time(x, time) {
    var diff = (time - x) * 1000;
    //   alert(diff+" diff");
    setTimeout(function () {
            $.ajax({
                type: "POST",
                url: "/Suggestions/stopEnglishTender",
                data: { 'numTender': url },
                success: function () {
                    // alert("Tender stoped!");
                    $("#submit").Attr('disabled');
                    document.getElementById("dd").innerHTML = "המכרז סגור";

                    //render products to appropriate dropdown
                    // renderDTender(data);
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }, diff);
  //  timeInterval(time);
}


function timeInterval(time) {

    var setTime = time * 1000;
    //  alert(time + " time timer");
    setInterval(function () {
        $.ajax({
            type: "POST",
            url: "/Suggestions/stopEnglishTender",
            data: { 'numTender': url },
            success: function () {
                // alert("Tender stoped!");
                $("#submit").Attr('disabled');
                document.getElementById("dd").innerHTML = "המכרז סגור";

                //render products to appropriate dropdown
                // renderDTender(data);
            },
            error: function (error) {
                console.log(error);
            }
        })
    }, (time));
}

function stopTender() {

    $.ajax({
        type: "POST",
        url: "/Suggestions/stopEnglishTender",
        data: { 'numTender': url },
        success: function () {
           //  alert("Tender stoped!");
            $("#submit").Attr('disabled');
            $("#submit").Attr('hidden');

            document.getElementById("dd").innerHTML = "המכרז סגור";
            window.location.href = '/Client/Tenders';

            //render products to appropriate dropdown
            // renderDTender(data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function LoadDTender() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
    }
    numT = url;
    $.ajax({
        type: "POST",
        url: "/Suggestions/getTender",
        data: { 'numTender': url },
        success: function (data) {
            var x = data.includes("close");
            if (!x) {
                renderDTender($('#numProduct'), data);
            }
            else {
               // alert("close");
                flag = 1;
                document.getElementById("dd").innerHTML = "המכרז סגור";
                window.location.href = '/Client/Tenders';


            }            //render products to appropriate dropdown
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function renderDTender(element, data) {
    //render product
    $.each(data, function (i, v) {
        var table = document.getElementById("tbldtender");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
 
        cell1.innerHTML = v.numTender;
        cell2.innerHTML = v.name;
 

    }
    )
}
function LoadTime() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);

    }
 //  alert(url);
    $.ajax({
        type: "POST",
        url: "/Suggestions/LoadDate",
        dataType: 'json',
        data: { 'numTender': url },
        success: function (data) {
            // alert("update");
            updateTime(data);

        },
        error: function (error) {
            console.log(error);
        }
    })
}
function updateTime(data) {
    //  alert("again");

    $.each(data, function (i, v) {

        date = v.dataSuggestion;
        var my_date = ConvertJSONDateToDate(v.dataSuggestion);
        //alert(JSON.stringify(v.time_update));
        var j = JSON.stringify(v.time_update);
        var json = $.parseJSON(j);
        $(json).each(function (i, val) {
            $.each(val, function (k, v) {
                if (k == "TotalMilliseconds")
                    time_update = v;
            });
        });
        var diff = checkTime(my_date);
        var count = diff + 1;
        var count = Math.floor(diff / time_update);
      //  alert(count + " count");
        if (count > 0) {
       //     alert("update time and the count  " + count);
            stopTender();
        }
        var module = diff % time_update;
     ///   alert(module + "  module");

          time(module, time_update);
        //   alert(time_update + " time ");




    })

}
function ConvertJSONDateToDate(jsonDate) {
    var dateSlice = jsonDate.slice(6, 24);
    var milliseconds = parseInt(dateSlice);
    var date = new Date(milliseconds);
    return date;
}

function checkTime(s) {
    var date = new Date();
    var diff = Math.abs(date - s);
    return diff;

}


function ToJavaScriptDate(value) { //To Parse Date from the Returned Parsed Date
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
}
function ToJavaScriptTime(value) { //To Parse Date from the Returned Parsed Date
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getHours()) + ":" + dt.getMinutes();
}

function LoadType(element) {
    if (arrType.length == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: "/Suggestions/getType",
            success: function (data) {
                if (flag != 1)
                {
                    arrType = data;
                    renderType(element);
                }
                else {
                //    alert("close");
                    document.getElementById("dd").innerHTML = "המכרז סגור";
                }


              
            }
        })
    }
    else {
        if (flag != 1) {
            renderType(element);

        }
        else {
        //    alert("close");
            document.getElementById("dd").innerHTML = "המכרז סגור";
        }
        //render catagory to the element
    }
}


function renderType(element, data) {
    //render product
    $.each(data, function (i, v) {
        var table = document.getElementById("tbType");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = v.nameType;
    }
    )
}

function LoadProduct() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
    }
    $.ajax({
        type: "POST",
        url: "/Suggestions/getProduct",
        data: { 'numTender': url },
        success: function (data) {
            console.log(data);
            if (data == "")
            {
                renderFirstSuggestion();
            }
            //render products to appropriate dropdown
            else
            renderProduct($('#numProduct'), data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}
//});
function renderFirstSuggestion()
   
{
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
    }
    $.ajax({
        type: "POST",
        url: "/Suggestions/getProduct2",
        data: { 'numTender': url },
        success: function (data) {
          
                renderFirstSuggestion2(data);
            
                //render products to appropriate dropdown
         
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function renderFirstSuggestion2( data) {
    console.log(data);
    $.each(data, function (i, v) {

        var table = document.getElementById("tblsuggest");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell5 = row.insertCell(3);
        var cell6 = row.insertCell(4);
        var cell4 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        //=======var cell5 = row.insertCell(4);
        cell1.innerHTML = v.numProduct;
        cell2.innerHTML = v.NameProduct;
        cell3.innerHTML = v.Amount;
        cell5.innerHTML = v.PriceUpdate;
        cell6.innerHTML = v.weight;
        var t = ToJavaScriptDate(v.from);
        cell4.innerHTML = t;
        cell7.innerHTML = '<input id="price" type="number" name="prices"/>'
        //========cell5.innerHTML = '<a href="/suggestion/suggestion?numtender='+v.numProduct+'><img src="~/Images/next.jpg" width="50" height="50" /></a>'
    })
    //    var $ele = $(element);
    //$ele.empty();
    //    $ele.append($('<option/>').val('0').text('Select'));
    //   $.each(data, function (i, v) {
    //        $ele.append($('<option/>').val(v.TenderDetailsID).text(v.NameProduct));
    //
}


function renderProduct(element, data) {
    //render product
    $.each(data, function (i, v) {
        var table = document.getElementById("tblsuggest");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell5 = row.insertCell(3);
        var cell6 = row.insertCell(4);
        var cell4 = row.insertCell(5);
        var cell7 = row.insertCell(6);
         //=======var cell5 = row.insertCell(4);
        cell1.innerHTML = v.numproduct;
        cell2.innerHTML = v.NameProduct;
        cell3.innerHTML = v.Amount;
        cell5.innerHTML = v.priceToProduct + v.sizeRoomy;
        cell6.innerHTML = v.weight;
        var t = ToJavaScriptDate(v.dataSuggestion);
        var d = ToJavaScriptTime(v.dataSuggestion);
        cell4.innerHTML = t+" "+d;
        cell7.innerHTML = '<input id="price" type="number" name="prices"/>'
        //========cell5.innerHTML = '<a href="/suggestion/suggestion?numtender='+v.numProduct+'><img src="~/Images/next.jpg" width="50" height="50" /></a>'
    })
    //    var $ele = $(element);
    //$ele.empty();
    //    $ele.append($('<option/>').val('0').text('Select'));
    //   $.each(data, function (i, v) {
    //        $ele.append($('<option/>').val(v.TenderDetailsID).text(v.NameProduct));
    //
}

function clickAndDisable() {

    url1 = window.location.href;

    // disable subsequent clicks
    url1.onclick = function (event) {
        event.preventDefault();
     }
}
function loadNew() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
     //   $("#tenderNum").val(url);

    }
  //  alert("before");
    $.ajax({
        type: "POST",
        url: "/Suggestions/getSuggestionDetails1",
        data: { 'numTender': url },
        datatype: "json",
        success: function (data) {
         //   alert("sucsses");
            //render products to appropriate dropdown
        },
        error: function (error) {
            console.log(error);
        }
    })
}
function loadDetail() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
      //  $("#NumTender").val(url)
    }
    //alert(url);
    $.ajax({
        type: "POST",
        url: "/Suggestions/getSuggestionMax",
        data: { 'numTender': url },
        //complete: function (jqXHR, status) {
        //if (status=='success')
        //},
        success: function (data) {
            renderDetail(data);
          //  alert("renderDetail suceess");
        },
        error: function (error) {
            console.log(error);
        }
    })
}


function renderDetail(data) {

    $.each(data, function (i, v) {
          if (v.priceToproduct!=undefined) {
            product[i] = v.numproduct;
            price[i] = v.priceToProduct + v.sizeRoomy;
            weight[i] = v.weight;
        }
        
        else {

            product[i] = v.numproduct;
            price[i] = v.PriceUpdate;
            weight[i] = v.weight;
        }
    
    
    });
    flag = true;
 //   alert("i update the weight");
    check();
}


function check() {
    var input = document.getElementsByName("prices");
  //  alert(price.length);
    if (flag = true) {
        for (var index = 0; index < price.length; ++index) {
            inputText[index] = input[index].value;
            if (price[index] < input[index].value);
            if (price[index] > input[index].value) {
                input[index].value = "";
              //  alert("error ");
                flag = false;
                document.getElementById("error").innerHTML = 'Please enter a Correct Price/s.';
                isValid = false;

            }
        }
        if (flag == true)
            isValid = true;
   //     alert("isvalid=true");
        findAverage();
    }

    else {
        BlankText();
    }
}

function findLastSuggest() {
   // if (LastSuggest == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/Suggestions/findLastSuggest',
            success: function (data) {
              //  alert("findLastSuggest");
                LastSuggest = data;
                //render NumOfCon
                renderLastSuggestion(data);
            }
        })
   // }
    
}
function findLastDetail() {
    if (LastDetail == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/Suggestions/findLastDetail',
            success: function (data) {
              //  alert("findLastDetail");
                LastDetail = data;
                //render NumOfCon
                renderLastDetail(data);
            //    alert("after ajax last detail " + data);
            }
        })
    }
    else {
        //render NumOfCon to the element
        renderLastDetail(data);
    }
}

function renderLastDetail(data) {
 //   alert("LastDetail " + data);
    $("#LastDetail").val(data)
    LastDetail = data;
}

function renderLastSuggestion(data) {
 //   alert(" data " + data);
    $("#LastSuggest").val(data)
}

function findAverage() {
     avg = 0;
  
    for (var index = 0; index < price.length; ++index) {
   //     avg =  (price[index] * weight[index]);
        //  alert(index);
    

        var p = price[index];
        var w = weight[index];
        var count = p * w;
     //   alert(count + " count");
        avg = avg + count;
       // alert(avg + " avgerage");
        //alert(weight[index] + " weight[index]");
        //alert(price[index] + "  price[index]");
    }
    var lenght=price.length;
     avg = Math.floor(avg / lenght);

    //avg = ;
  //  alert(" avg final" + avg);

  //  $("#avg").val(avg)
    next();
}
 
function BlankText() {
    for (var index = 0; index < price.length; ++index) {
        input[index].value = "";
        document.getElementById("error").innerHTML = 'Error with the value Please Renter the price/s.';
    }

}
function next()
{
    var d1 = Date.now();
    $("#dateNow").val(d1)
  //  alert(d1 + " date boulette");
    if (isValid == true) {
      //  alert(" after  if ");
    var suggestion = {
                numSuggestion: $("#LastSuggest").val(),
                numTender: numT,
                numCont:numCont,
                priceToproduct: avg,
                dataSuggestion: new Date(),

            }
         //   alert("save please");
          //  alert(suggestion);
    $.ajax({
        type: 'POST',
        url: '/Suggestions/save',
        data: JSON.stringify(suggestion),
        contentType: 'application/json',
        success: function (data) {
            if (data.status) {
                alert('Successfully saved');
                //here we will clear the form

                //$('#LastDetail,#LastSuggest,product[i],price[i]').val('');
                //location.reload();

            }
            else {
                alert('Error');
            }

        },
        error: function (error) {
            console.log(error);

        }
    });

            LastDetail = LastDetail - 1;

 
            for(var i=0;i<price.length;++i)
            {
                LastDetail = LastDetail + 1;

             //   alert("helo last detail");
                var t = $("#LastDetail").val()
//alert(x + " last detail val ll");
                var suggestionDetail = {
                    numDetailSuggestion:LastDetail,
                    numsuggest: $("#LastSuggest").val(),
                    numproduct: product[i],
                    priceToProduct: inputText[i],
                 }
                
       //         alert(suggestionDetail);
                $.ajax({
                    type: 'POST',
                    url: '/Suggestions/saveDetail',
                    data: JSON.stringify(suggestionDetail),
                    contentType: 'application/json',
                    success: function (data) {
                        //if (data.status) {
                        ////    alert('Successfully saved');
                        //    //here we will clear the form

                        //    //$('#LastDetail,#LastSuggest,product[i],price[i]').val('');
                        //    //location.reload();
                           
                        //}
                        //else {
                        // //   alert('Error');
                        //}

                    },
                    error: function (error) {
                        console.log(error);

                    }
                });


             


            }//for
             window.location.href = '/Client/Tenders';

    }
}

$(document).ready(function () {
    //Add button click event
    $('#submit').click(function () {
        loadDetail();
        findLastDetail();
        findLastSuggest();
      //  alert("hello");
    })//button 
});
checkTender();
LoadTime();
LoadDTender();

LoadProduct();
LoadType();

 