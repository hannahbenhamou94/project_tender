
//var url = null;
//function LoadDTender() {
//    if (!url) {
//        url = window.location.href;
//        url = url.substr(url.indexOf('=') + 1);

//    }
//    //alert(url);
//    $.ajax({
//        type: "POST",
//        url: "/home/getDetail",
//        success: function (data) {
//            //  alert("sucsses");
//            //render products to appropriate dropdown
//            renderDTender(data);
//        },
//        error: function (error) {
//            console.log(error);
//        }
//    })
//}
//function renderDTender(data) {
//    //render product
//    $.each(data, function (i, v) {
//        var table = document.getElementById("table1");
//        var row = table.insertRow(i + 1);
//        var cell1 = row.insertCell(0);
//        var cell3 = row.insertCell(1);
//        var cell5 = row.insertCell(2);
//        var cell6 = row.insertCell(3);
//        var cell7 = row.insertCell(4);
//        var cell8 = row.insertCell(5)
//        var cell9 = row.insertCell(6);
//        var cell11 = row.insertCell(7);
//        var cell12 = row.insertCell(8);

//        cell1.innerHTML = v.numTender;
//        cell3.innerHTML = v.name;
//        cell5.innerHTML = v.typeAcquire;
//        cell6.innerHTML = v.nameEditor;
//        cell7.innerHTML = v.nameCategory;
//        cell8.innerHTML = v.nameType
//        var date1 = ToJavaScriptDate(v.from);
//        //  var date2 = ToJavaScriptDate(v.till);
//        //  var time2 = ToJavaScriptTime(v.hourFinish);
//        cell9.innerHTML = date1;
//        //   cell10.innerHTML = date2;
//        cell11.innerHTML = v.status;
//        var href = "UpdateTender?id=" + v.numTender;
//        cell12.innerHTML = "<a href=" + href + ">עדכן</a>";




//    }
//    )
//}

function loadWinner() {
 
    //alert(url);
    $.ajax({
        type: "POST",
        url: "/home/getWinners",
        success: function (data) {
            //  alert("sucsses");
            //render products to appropriate dropdown
            renderDTender(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function renderDTender(data) {
    //render product
     $.each(data, function (i, v) {
        var table = document.getElementById("table1");

        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell3 = row.insertCell(1);
        var cell5 = row.insertCell(2);
        var cell6 = row.insertCell(3);
        var cell7 = row.insertCell(4);
        var cell8 = row.insertCell(5);
        //var cell9 = row.insertCell(6);
        var cell11 = row.insertCell(6);
        var cell12 = row.insertCell(7);
        var cell13 = row.insertCell(8);
        //var cell115 = row.insertCell(10)

        cell1.innerHTML = v.numTender;
        cell3.innerHTML = v.name;
        cell5.innerHTML = v.nameType;
        cell6.innerHTML = v.nameCategory;
        cell7.innerHTML = v.nameCompanyCont;
    //   cell8.innerHTML = v.nameType;
        // cell9.innerHTML = new Date(v.till.match(/\d/)[0] * 1).toLocaleDateString();
        //  cell10.innerHTML =new Date(v.from.match(/\d/)[0] * 1).toLocaleDateString();
        cell8.innerHTML = v.nameCont +" "+v.familyCont;
          cell11.innerHTML=v.priceToproduct;
         var date1 = ToJavaScriptDate(v.from);
       var date2 = ToJavaScriptDate(v.till);
        //  var time2 = ToJavaScriptTime(v.hourFinish);
        cell12.innerHTML = date1;
        cell13.innerHTML = date2;
 

    }
    )
}








function ToJavaScriptDate(value) {
    //To Parse Date from the Returned Parsed Date
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

loadWinner();


//LoadDTender();

