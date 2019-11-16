$(window).on("load", function () {
    loadPassengers();
});

var obj = [];

function loadPassengers() {
    $.ajax(
        {
            type: "post",
            url: window.location.origin + $('#contextPath').val() + "/get_passengers",
            data: {},
            success: function (response) {
                obj = JSON.parse(response);
                setTableBody();
            },
            error: function () {

            }
        }
    );
}

function setTableBody() {
    var tableData = '';
    for (var i = 0; i < obj.length; i++) {
        tableData += '' +
            '<tr class="btnViewDetails" style="cursor: pointer">' +
            '<td style="text-align: center"><input type="hidden" value="' + i + '"><span>' + obj[i].PassengersCount + '</span></td>' +
            '<td style="text-align: center"><span>&euro;' + obj[i].PassengersPrice.toFixed(2) + '</span></td>' +
            '<td class="btnRemove"><i class="fa fa-times" style="color: red"></i></td>' +
            '</tr>';
    }
    $('#passengersBody').html(tableData);
    $('#passengersCount').val(1);
    $('#passengersPrice').val('0.00');
}

var selectedRow = -1;
$(document).on('click', '.btnViewDetails', function () {
    selectedRow = $(this).children().eq(0).children('input').val();
    var objDetails = obj[selectedRow];
    $('#passengersCount').val(objDetails.PassengersCount);
    $('#passengersPrice').val(objDetails.PassengersPrice);
    selectTableRow();
    $(this).css('background-color', '#dbdbdb');
});

function selectTableRow() {
    for (var i = 0; i < obj.length; i++) {
        $('#passengersBody').parent().children('tbody').children().eq(i).css('background-color', '');
    }
}

$('#newPassenger').click(function () {
    if (
        $('#passengersCount').val() !== '' && $('#passengersCount').val() !== '' &&
        parseInt($('#passengersCount').val()) > 0 && parseInt($('#passengersPrice').val()) > 0 &&
        $('#passengersPrice').val() !== '0.00' && $('#passengersPrice').val() !== '0'
    ) {
        $.ajax(
            {
                type: "post",
                url: window.location.origin + $('#contextPath').val() + "/add_passenger",
                data: {
                    passengersCount: $('#passengersCount').val(),
                    passengersPrice: $('#passengersPrice').val()
                },
                success: function (response) {
                    var tempObj = JSON.parse(response);
                    var insert = true;
                    for (var i = 0; i < obj.length; i++) {
                        if (tempObj.PassengersCount === obj[i].PassengersCount) {
                            obj[i] = JSON.parse(response);
                            insert = false;
                        }
                    }
                    if (insert) {
                        obj.push(JSON.parse(response));
                    }
                    setTableBody();
                },
                error: function () {

                }
            }
        );
    }
});

$(document).on('click', '.btnRemove', function () {
    var that = this;
    var r = confirm("Do you want to delete passengers count " + obj[$(that).parent().children().children('input').val()].PassengersCount + "?");
    if (r === true) {
        $.ajax(
            {
                type: "post",
                url: window.location.origin + $('#contextPath').val() + "/remove_passenger",
                data: {
                    passengersCount: obj[$(that).parent().children().children('input').val()].PassengersCount
                },
                success: function (response) {
                    if (JSON.parse(response)) {
                        obj.splice($(that).parent().children().children('input').val(), 1)
                        setTableBody();
                    }
                },
                error: function () {

                }
            }
        );
    }
});