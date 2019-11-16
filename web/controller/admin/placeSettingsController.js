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
            '<td class="btnRemove"><i class="fa fa-times" style="color: red"></i></td>' +
            '</tr>';
    }
    $('#placesBody').html(tableData);
    $('#placeId').val(0);
    $('#placeName').val('');
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

$(document).on('click', '.btnRemove', function () {
    var that = this;
    var r = confirm("Do you want to delete " + obj[$(that).parent().children().children('input').val()].PlaceName + "?");
    if (r === true) {
        $.ajax(
            {
                type: "post",
                url: window.location.origin + $('#contextPath').val() + "/remove_place",
                data: {
                    placeId: obj[$(that).parent().children().children('input').val()].PlaceId
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