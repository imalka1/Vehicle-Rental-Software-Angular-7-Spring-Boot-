var webSoc = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + $('#contextPath').val() + "/get_reservation_socket");

webSoc.onopen = function (ev) {
    console.log("logged");
}

webSoc.onclose = function (ev) {
    console.log("closed");
}

var position = 0;

$(window).on("load", function () {
    loadReservations($('#reservationDate').val());
    changeReservationCategory(position);
});

$('#reservationDate').change(function () {
    loadReservations($('#reservationDate').val());
    changeReservationCategory(position);
})

$('#reservationsLeft').click(function () {
    if (position > 0) {
        changeReservationCategory(--position);
        setTableBody();
    }
})

$('#reservationsRight').click(function () {
    if (position < 1) {
        changeReservationCategory(++position);
        setTableBody();
    }
})

function changeReservationCategory(position) {
    var reservationsText = ['Pending Reservations', 'Completed Reservations'];
    if (position === 0) {
        $('#reservationsText').html(reservationsText[0]);
        $('#btnChangeReservationCategory').html('Complete Reservation');
    } else if (position === 1) {
        $('#reservationsText').html(reservationsText[1]);
        $('#btnChangeReservationCategory').html('Set as pending');
    }
    setFieldsToNull();
}

var obj = Array;

function loadReservations(reservationDate) {
    $.ajax(
        {
            type: "post",
            url: window.location.origin + $('#contextPath').val() + "/get_reservations",
            data: {
                reservationDate: reservationDate
            },
            success: function (response) {
                obj = JSON.parse(response);
                setTableBody();
            },
            error: function () {

            }
        }
    );
}

webSoc.onmessage = function processMessage(message) {
    if (position === 0) {
        obj.unshift(JSON.parse(message.data));
        setTableBody();
    }
}

function setTableBody() {
    var count = 0;
    var tableData = '';
    if (position === 0) {
        for (var i = 0; i < obj.length; i++) {
            if (!obj[i].ReservationIsCompleted) {
                count++;
                tableData += '' +
                    '<tr class="btnViewDetails" style="cursor: pointer">' +
                    '<td style="text-align: left;font-weight: bold"><input type="hidden" value="' + i + '"><span>R' + obj[i].ReservationNumber + '</span></td>' +
                    '<td>' + obj[i].ReservationTime + '</td>' +
                    '<td>' + obj[i].ReservationPickupFrom + '</td>' +
                    '<td>' + obj[i].ReservationDropTo + '</td>' +
                    '</tr>'
            }
        }
    } else if (position === 1) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].ReservationIsCompleted) {
                count++;
                tableData += '' +
                    '<tr class="btnViewDetails" style="cursor: pointer">' +
                    '<td style="text-align: left;font-weight: bold"><input type="hidden" value="' + i + '"><span>R' + obj[i].ReservationNumber + '</span></td>' +
                    '<td>' + obj[i].ReservationTime + '</td>' +
                    '<td>' + obj[i].ReservationPickupFrom + '</td>' +
                    '<td>' + obj[i].ReservationDropTo + '</td>' +
                    '</tr>'
            }
        }
    }
    $('#reservationsBody').html(tableData);
    $('#pagination').html('1 / ' + count);
    selectTableRow();
}

var selectedRow = -1;
$(document).on('click', '.btnViewDetails', function () {

    selectedRow = $(this).children().eq(0).children('input').val();
    var objDetails = obj[selectedRow];
    $('#fieldCustomerName').html(objDetails.CustomerName);
    $('#fieldCustomerEmail').html(objDetails.CustomerEmail);
    $('#fieldCustomerTelNo').html(objDetails.CustomerTelNo);
    $('#fieldCustomerComment').html(objDetails.CustomerComments);
    $('#fieldReservationId').html('R' + objDetails.ReservationNumber);
    $('#fieldPickUpFrom').html(objDetails.ReservationPickupFrom);
    $('#fieldDropTo').html(objDetails.ReservationDropTo);
    $('#fieldTrip').html(objDetails.ReservationTrip);
    $('#fieldPickupDate').html($('#reservationDate').val());
    $('#fieldPickupTime').html(objDetails.ReservationTime);
    $('#fieldAdults').html(objDetails.ReservationAdults);
    $('#fieldChildren').html(objDetails.ReservationChildren);
    $('#fieldInfants').html(objDetails.ReservationInfants);
    $('#fieldNoOfPassengers').html(objDetails.ReservationNoOfPassengers);
    $('#priceText').html(objDetails.ReservationCost);

    selectTableRow();
});

function selectTableRow() {
    for (var i = 0; i < $('#reservationsBody').parent().children('tbody').children().length; i++) {
        $('#reservationsBody').parent().children('tbody').children().eq(i).css('background-color', '');
        if ($('#fieldReservationId').html() === $('#reservationsBody').parent().children('tbody').children().eq(i).children().eq(0).children('span').html()) {
            $('#reservationsBody').parent().children('tbody').children().eq(i).css('background-color', '#dbdbdb');
        }
    }
}

$('#btnChangeReservationCategory').click(function () {
    if (selectedRow !== -1) {
        var objDetails = obj[selectedRow];
        var isCompleted = false;
        if (position === 0) {
            isCompleted = true;
        } else if (position === 1) {
            isCompleted = false;
        }
        $.ajax(
            {
                type: "post",
                url: window.location.origin + $('#contextPath').val() + "/set_reservation_complete",
                data: {
                    reservationId: objDetails.ReservationNumber,
                    isCompleted: isCompleted
                },
                success: function (response) {
                    obj[selectedRow] = JSON.parse(response);
                    setTableBody();
                },
                error: function () {

                }
            }
        );
    }
})

function setFieldsToNull() {
    $('#fieldCustomerName').html('Not selected');
    $('#fieldCustomerEmail').html('Not selected');
    $('#fieldCustomerTelNo').html('Not selected');
    $('#fieldCustomerComment').html('Not selected');
    $('#fieldReservationId').html('Not selected');
    $('#fieldPickUpFrom').html('Not selected');
    $('#fieldDropTo').html('Not selected');
    $('#fieldTrip').html('Not selected');
    $('#fieldPickupDate').html('Not selected');
    $('#fieldPickupTime').html('Not selected');
    $('#fieldAdults').html('Not selected');
    $('#fieldChildren').html('Not selected');
    $('#fieldInfants').html('Not selected');
    $('#fieldNoOfPassengers').html('Not selected');
    $('#priceText').html('0.00');
}