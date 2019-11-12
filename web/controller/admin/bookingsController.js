var position = 0;
$(window).on("load", function () {
    changeReservationCategory(position);
});

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
                var obj = JSON.parse(response);
                var tableData = '';
                for (var i = 0; i < obj.length; i++) {
                    tableData += '' +
                        '<tr>' +
                        '<td style="text-align: left;font-weight: bold">' + obj[i].ReservationNumber + '</td>' +
                        '<td>' + obj[i].ReservationTime + '</td>' +
                        '<td style="cursor: pointer" class="btnViewDetails"><i class="fa fa-search"></i></td>' +
                        '</tr>'
                }
                $('#reservationsBody').html(tableData);
            },
            error: function () {

            }
        }
    );
}