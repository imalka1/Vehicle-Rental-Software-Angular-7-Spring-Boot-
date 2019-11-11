var position = 1;
$(window).on("load", function () {
    changeReservationCategory(position);
});

$('#reservationsLeft').click(function () {
    if (position > 0) {
        changeReservationCategory(--position);
    }
})

$('#reservationsRight').click(function () {
    if (position < 2) {
        changeReservationCategory(++position);
    }
})

function changeReservationCategory(position) {
    var reservationsText = ['Pending Reservations', 'Pending / Completed Reservations', 'Completed Reservations'];
    if (position === 0) {
        $('#reservationsText').html(reservationsText[0]);
    } else if (position === 1) {
        $('#reservationsText').html(reservationsText[1]);
    } else if (position === 2) {
        $('#reservationsText').html(reservationsText[2]);
    }
}