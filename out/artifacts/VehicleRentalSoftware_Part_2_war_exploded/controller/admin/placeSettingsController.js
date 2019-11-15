$(window).on("load", function () {
    loadPlaces();
});

var obj = [];

function loadPlaces() {
    $.ajax(
        {
            type: "post",
            url: window.location.origin + $('#contextPath').val() + "/get_places",
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
            '<td style="text-align: left"><input type="hidden" value="' + i + '"><span>' + obj[i].PlaceName + '</span></td>' +
            '<td><i class="fa fa-times" style="color: red"></i></td>' +
            '</tr>';

    }
    $('#placesBody').html(tableData);
    $('#placeId').val(0);
    $('#placeName').val('');
}

var selectedRow = -1;
$(document).on('click', '.btnViewDetails', function () {
    selectedRow = $(this).children().eq(0).children('input').val();
    var objDetails = obj[selectedRow];
    $('#placeId').val(objDetails.PlaceId);
    $('#placeName').val(objDetails.PlaceName);
    selectTableRow();
    $(this).css('background-color', '#dbdbdb');
});

function selectTableRow() {
    for (var i = 0; i < obj.length; i++) {
        $('#placesBody').parent().children('tbody').children().eq(i).css('background-color', '');
    }
}

$('#newPlace').click(function () {
    if ($('#placeName').val().length !== 0) {
        $('#placeId').val(0)
        $.ajax(
            {
                type: "post",
                url: window.location.origin + $('#contextPath').val() + "/add_place",
                data: {
                    placeId: $('#placeId').val(),
                    placeName: $('#placeName').val()
                },
                success: function (response) {
                    obj.push(JSON.parse(response));
                    setTableBody();
                },
                error: function () {

                }
            }
        );
    }
});

$('#updatePlace').click(function () {
    if ($('#placeName').val().length !== 0) {
        $.ajax(
            {
                type: "post",
                url: window.location.origin + $('#contextPath').val() + "/update_place",
                data: {
                    placeId: $('#placeId').val(),
                    placeName: $('#placeName').val()
                },
                success: function (response) {
                    // obj.push(JSON.parse(response))
                    setTableBody();
                },
                error: function () {

                }
            }
        );
    }
});