var url = null;
function LoadDTender() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);

    }
    //alert(url);
    $.ajax({
        type: "POST",
        url: "/Suggestions/getSuggestionDetail",
        data: { 'numTender': url },
        success: function (data) {
            //render products to appropriate dropdown
            var x = data.includes("close");
            if (!x) {
                renderDTender(data);
                       }
            else {
             document.getElementById("dd").innerHTML="המכרז סגור";
   }
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function renderDTender(data) {
    //render product
    $.each(data, function (i, v) {
        var table = document.getElementById("t01");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell3 = row.insertCell(1);
        var cell5 = row.insertCell(2);
      
        cell1.innerHTML = v.NameProduct;
        cell3.innerHTML =v.priceToproduct;
        cell5.innerHTML =  v.Amount;
        


    })
}

LoadDTender();


function stopTender() {

    $.ajax({
        type: "POST",
        url: "/Suggestions/stopTender",
        data: { 'numTender': url },
        success: function () {
            alert("Tender stoped!");
            $("#stop").Attr('disabled');
            //render products to appropriate dropdown
           // renderDTender(data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}


