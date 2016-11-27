var url = '2';
function LoadDTender() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
    }
    $.ajax({
        type: "POST",
        url: "/suggestion/getTender",
        data: { 'numTender': url },
        success: function (data) {
            alert("sucsses");
            //render products to appropriate dropdown
            renderDTender($('#numProduct'), data);
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
        var row = table.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = v.numTender;
        cell2.innerHTML = v.name;
    }
    )}
   
function LoadProduct() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
    }
    $.ajax({
        type: "POST",
        url: "/suggestion/getProduct",
        data: { 'numTender':url },
        success: function (data) {

            //render products to appropriate dropdown
            renderProduct($('#numProduct'), data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}
//});

function renderProduct(element, data) {
    //render product
    $.each(data, function (i, v) {
        var table = document.getElementById("tblsuggest");
        var row = table.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        //=======var cell5 = row.insertCell(4);
        cell1.innerHTML = v.numProduct;
        cell2.innerHTML = v.NameProduct;
        cell3.innerHTML = v.Amount;
        cell4.innerHTML = '<input id="price" type="text" />'
        //========cell5.innerHTML = '<a href="/suggestion/suggestion?numtender='+v.numProduct+'><img src="~/Images/next.jpg" width="50" height="50" /></a>'
    })
//    var $ele = $(element);
//$ele.empty();
//    $ele.append($('<option/>').val('0').text('Select'));
//   $.each(data, function (i, v) {
//        $ele.append($('<option/>').val(v.TenderDetailsID).text(v.NameProduct));
    //
}

LoadProduct();
LoadDTender();


