var Contes =[];
function LoadCon(element) {
    if (Contes.length == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/conToTender/getcon',
            success: function (data) {
                Contes = data;
                //render catagory
                renderCon(element,data);
            }
        })
    }
    else {
        //render catagory to the element
        renderCon(element,data);
    }
}

function renderCon(element,data) {
    $.each(data, function (i, v) {
        var table = document.getElementById("tblcon");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = v.numCon;
        cell2.innerHTML = v.nameCont;
        cell3.innerHTML = v.familyCont;
        cell4.innerHTML = ' <input type="checkbox" id="inTen"/>'
        
       
    })
}

LoadCon();


