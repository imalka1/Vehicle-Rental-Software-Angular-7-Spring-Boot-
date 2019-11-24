var webSoc = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + $('#contextPath').val() + "/get_reservation_socket");

webSoc.onopen = function (ev) {
    console.log("logged");
}

webSoc.onclose = function (ev) {
    console.log("closed");
}

webSoc.onmessage = function processMessage(message) {
    if (position === 0) {
        obj.unshift(JSON.parse(message.data));
        // setPagesCount();
        if (selectedRow !== -1) {
            selectedRow++;
        }
        setTableBody();
    }
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
        // $('#pagination').html(pageCount[0] + ' / ' + pagesCount[0]);
    }
})

$('#reservationsRight').click(function () {
    if (position < 1) {
        changeReservationCategory(++position);
        setTableBody();
        // $('#pagination').html(pageCount[1] + ' / ' + pagesCount[1]);
    }
})

$('#btnChangeReservationComplete').click(function () {
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
                    setFieldsToNull();
                    setTableBody();
                    // setPagesCount();
                },
                error: function () {

                }
            }
        );
    }
});

$('#btnRemoveReservation').click(function () {
    if (selectedRow !== -1) {
        var objDetails = obj[selectedRow];
        var r = confirm("Do you want to delete reservation - R" + objDetails.ReservationNumber + "?");
        if (r === true) {
            $.ajax(
                {
                    type: "post",
                    url: window.location.origin + $('#contextPath').val() + "/remove_reservation",
                    data: {
                        reservationId: objDetails.ReservationNumber
                    },
                    success: function (response) {
                        if (JSON.parse(response) === true) {
                            obj.splice(selectedRow, 1);
                            setFieldsToNull();
                            setTableBody();
                            // setPagesCount();
                        }
                    },
                    error: function () {

                    }
                }
            );
        }
    }
});

var selectedRow = -1;
$(document).on('click', '.btnViewDetails', function () {
    selectedRow = $(this).children().eq(1).children('input').val();
    var objDetails = obj[selectedRow];
    $('#fieldCustomerName').html(objDetails.CustomerTitle + objDetails.CustomerName);
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

var obj = [];

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
                // setPagesCount();
                setTableBody();
            },
            error: function () {

            }
        }
    );
}

function changeReservationCategory(position) {
    var reservationsText = ['Pending Reservations', 'Completed Reservations'];
    if (position === 0) {
        $('#reservationsText').html(reservationsText[0]);
        $('#btnChangeReservationComplete').html('Complete Reservation');
        $('#btnRemoveReservation').prop("disabled", true);
    } else if (position === 1) {
        $('#reservationsText').html(reservationsText[1]);
        $('#btnChangeReservationComplete').html('Set as pending');
        $('#btnRemoveReservation').prop("disabled", false);
    }
    setFieldsToNull();
}

function setTableBody() {
    var count = 0;
    var tableData = '';
    if (position === 0) {
        count = 0;
        // for (var i = pagePositionPending[pageCount[0] - 1]; i < obj.length; i++) {
        for (var i = 0; i < obj.length; i++) {
            if (!obj[i].ReservationIsCompleted) {
                // if (count < 22) {
                count++;
                tableData += '' +
                    '<tr class="btnViewDetails" style="cursor: pointer">' +
                    '<td style="text-align: right;font-weight: bold">' + count + '</td>' +
                    '<td style="text-align: left"><input type="hidden" value="' + i + '"><span>R' + obj[i].ReservationNumber + '</span></td>' +
                    '<td>' + obj[i].ReservationTime + '</td>' +
                    '<td>' + obj[i].ReservationPickupFrom + '</td>' +
                    '<td>' + obj[i].ReservationDropTo + '</td>' +
                    '</tr>';
                // } else {
                //     break;
                // }
            }
        }
    } else if (position === 1) {
        count = 0;
        // for (var i = pagePositionCompleted[pageCount[1] - 1]; i < obj.length; i++) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].ReservationIsCompleted) {
                // if (count < 22) {
                count++;
                tableData += '' +
                    '<tr class="btnViewDetails" style="cursor: pointer">' +
                    '<td style="text-align: right;font-weight: bold">' + count + '</td>' +
                    '<td style="text-align: left"><input type="hidden" value="' + i + '"><span>R' + obj[i].ReservationNumber + '</span></td>' +
                    '<td>' + obj[i].ReservationTime + '</td>' +
                    '<td>' + obj[i].ReservationPickupFrom + '</td>' +
                    '<td>' + obj[i].ReservationDropTo + '</td>' +
                    '</tr>'
                // } else {
                //     break;
                // }
            }
        }
    }
    $('#reservationsBody').html(tableData);
    selectTableRow();
}

function selectTableRow() {
    for (var i = 0; i < $('#reservationsBody').parent().children('tbody').children().length; i++) {
        $('#reservationsBody').parent().children('tbody').children().eq(i).css('background-color', '');
        if ($('#fieldReservationId').html() === $('#reservationsBody').parent().children('tbody').children().eq(i).children().eq(1).children('span').html()) {
            $('#reservationsBody').parent().children('tbody').children().eq(i).css('background-color', '#dbdbdb');
        }
    }
}

function setFieldsToNull() {
    selectedRow = -1;
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

//--------------

// $('#pageLeft').click(function () {
//     if (position === 0) {
//         if (pageCount[0] > 1) {
//             pageCount[0]--;
//             $('#pagination').html(pageCount[0] + ' / ' + pagesCount[0]);
//         }
//     } else if (position === 1) {
//         if (pageCount[1] > 1) {
//             pageCount[1]--;
//             $('#pagination').html(pageCount[1] + ' / ' + pagesCount[1]);
//         }
//     }
//     setTableBody();
// });
//
// $('#pageRight').click(function () {
//     if (position === 0) {
//         if (pageCount[0] < pagesCount[0]) {
//             pageCount[0]++;
//             $('#pagination').html(pageCount[0] + ' / ' + pagesCount[0]);
//         }
//     } else if (position === 1) {
//         if (pageCount[1] < pagesCount[1]) {
//             pageCount[1]++;
//             $('#pagination').html(pageCount[1] + ' / ' + pagesCount[1]);
//         }
//     }
//     setTableBody();
// });

// var pageCount = [1, 1];
// var pagesCount = [1, 1];
// var pagePositionPending = [];
// var pagePositionCompleted = [];
//
// function setPagesCount() {
//     pagePositionPending = [];
//     pagePositionCompleted = [];
//     pagePositionPending.push(0);
//     pagePositionCompleted.push(0);
//     pagesCount = [1, 1];
//     var tempCount = [1, 1];
//
//     var rowCount = [0, 0];
//     for (var i = 0; i < obj.length; i++) {
//         if (!obj[i].ReservationIsCompleted) {
//             rowCount[0]++;
//             if (rowCount[0] === 22 * tempCount[0]) {
//                 tempCount[0]++;
//                 pagePositionPending.push(i + 1);
//             }
//             if (rowCount[0] === 22 * pagesCount[0]) {
//                 pagesCount[0]++;
//             }
//         }
//         if (obj[i].ReservationIsCompleted) {
//             rowCount[1]++;
//             if (rowCount[1] === 22 * tempCount[1]) {
//                 tempCount[1]++;
//                 pagePositionCompleted.push(i + 1);
//             }
//             if (rowCount[1] === 22 * pagesCount[1]) {
//                 pagesCount[1]++;
//             }
//         }
//     }
//
//     if ((tempCount[0] * 22) - 22 === rowCount[0]) {
//         pagesCount[0]--;
//     }
//
//     if ((tempCount[1] * 22) - 22 === rowCount[1]) {
//         pagesCount[1]--;
//     }
//
//     if (position === 0) {
//         $('#pagination').html(pageCount[0] + ' / ' + pagesCount[0]);
//         if (pageCount[0] > pagesCount[0]) {
//             pageCount[0]--;
//             $('#pagination').html(pageCount[0] + ' / ' + pagesCount[0]);
//             setTableBody();
//         }
//     } else if (position === 1) {
//         $('#pagination').html(pageCount[1] + ' / ' + pagesCount[1]);
//         if (pageCount[1] > pagesCount[1]) {
//             pageCount[1]--;
//             $('#pagination').html(pageCount[1] + ' / ' + pagesCount[1]);
//             setTableBody();
//         }
//     }
// }