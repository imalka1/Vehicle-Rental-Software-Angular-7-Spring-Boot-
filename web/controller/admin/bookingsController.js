var position = 0;

$(window).on("load", function () {
    changeReservationCategory(position);
});

$('#reservationDate').change(function () {
    changeReservationCategory(position);
})

$('#reservationsLeft').click(function () {
    if (position > 0) {
        changeReservationCategory(--position);
    }
})

$('#reservationsRight').click(function () {
    if (position < 1) {
        changeReservationCategory(++position);
    }
})

function changeReservationCategory(position) {
    var reservationsText = ['Pending Reservations', 'Completed Reservations'];
    if (position === 0) {
        $('#reservationsText').html(reservationsText[0]);
        loadReservations($('#reservationDate').val(), false)
    } else if (position === 1) {
        $('#reservationsText').html(reservationsText[1]);
        loadReservations($('#reservationDate').val(), true)
    }
}

var obj;

function loadReservations(reservationDate, isCompleted) {
    $.ajax(
        {
            type: "post",
            url: window.location.origin + $('#contextPath').val() + "/get_reservations",
            data: {
                reservationDate: reservationDate,
                isCompleted: isCompleted
            },
            success: function (response) {
                obj = JSON.parse(response);
                var tableData = '';
                for (var i = 0; i < obj.length; i++) {
                    tableData += '' +
                        '<tr>' +
                        '<td style="text-align: left;font-weight: bold"><input type="hidden" value="' + i + '">' + obj[i].ReservationNumber + '</td>' +
                        '<td>' + obj[i].ReservationTime + '</td>' +
                        '<td style="cursor: pointer" class="btnViewDetails"><i class="fa fa-search"></i></td>' +
                        '</tr>'
                }
                $('#reservationsBody').html(tableData);
                $('#pagination').html('1 / ' + obj.length)
            },
            error: function () {

            }
        }
    );
}

$(document).on('click', '.btnViewDetails', function () {

    var objDetails = obj[$(this).parent().children().eq(0).children('input').val()];
    $('#fieldCustomerName').html(objDetails.CustomerName);
    $('#fieldCustomerEmail').html(objDetails.CustomerEmail);
    $('#fieldCustomerTelNo').html(objDetails.CustomerTelNo);
    $('#fieldCustomerComment').html(objDetails.CustomerComments);
    $('#fieldReservationId').html(objDetails.ReservationNumber);
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

    for (var i = 0; i < $(this).parent().parent().children().length; i++) {
        $(this).parent().parent().children().eq(i).css('background-color', '');
    }

    $(this).parent().css('background-color', '#dbdbdb')
});