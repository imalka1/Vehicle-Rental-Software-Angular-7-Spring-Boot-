$(window).on("load", function () {
    initialFill();
    validateSubmitButton();
});

$('#placeFrom').change(function () {
    setPlaces();
});

$('#placeTo').change(function () {
    setPlaces();
});

$('#trip').change(function () {
    $('#fieldTrip').html($('#trip option:selected').html());
});

$('#pickupDate').change(function () {
    if ($('#pickupDate').val() !== '') {
        $('#fieldPickupDate').html($('#pickupDate').val());
    } else {
        $('#fieldPickupDate').html('Not selected');
    }
    validateInputs();
});

$('#pickupTime').change(function () {
    if ($('#pickupTime').val() !== '') {
        $('#fieldPickupTime').html(
            convertAmPm()
        );
    } else {
        $('#fieldPickupTime').html('Not selected');
    }
    validateInputs();
});

$('#adults').bind("keyup change", function (e) {
    if ($('#adults').val() !== '') {
        $('#adults').val(parseInt($('#adults').val()) - checkNoOfPassengers());
    } else {
        $('#adults').val(0)
    }
    $('#fieldAdults').html($('#adults').val());
    validateInputs();
});

$('#children').bind("keyup change", function (e) {
    if ($('#children').val() !== '') {
        $('#children').val(parseInt($('#children').val()) - checkNoOfPassengers());
    } else {
        $('#children').val(0)
    }
    $('#fieldChildren').html($('#children').val());
    validateInputs();
});

$('#infants').bind("keyup change", function (e) {
    if ($('#infants').val() !== '') {
        $('#infants').val(parseInt($('#infants').val()) - checkNoOfPassengers());
    } else {
        $('#infants').val(0)
    }
    $('#fieldInfants').html($('#infants').val());
    validateInputs();
});

$('#noOfPassengers').bind("keyup change", function (e) {
    if ($('#noOfPassengers').val() !== '') {
        $('#fieldNoOfPassengers').html($('#noOfPassengers').val());
    } else {
        $('#noOfPassengers').val(0);
    }
    $('#fieldNoOfPassengers').html($('#noOfPassengers').val());
    getPassengersPrice();
    validateInputs();
});

function initialFill() {
    $('#placeFrom').val($('#pickUpFromIndex').val());
    $('#placeTo').val($('#dropToIndex').val());
    $('#trip').val($('#tripIndex').val());
    $('#noOfPassengers').val($('#noOfPassengersIndex').val());

    $('#fieldNoOfPassengers').html($('#noOfPassengersIndex').val());
    $('#fieldTrip').html($('#trip option:selected').html());
    $('#fieldPickupDate').html($('#pickupDate').val());
    $('#fieldPickupTime').html(
        convertAmPm()
    );
    setPlaces();
    getPassengersPrice();
}

function convertAmPm() {
    return parseInt($('#pickupTime').val().split(':')[0]) < 12 ?
        $('#pickupTime').val().split(':')[0] === '00' ?
            '12:' + $('#pickupTime').val().split(':')[1] + ' AM' :
            $('#pickupTime').val() + ' AM' :
        parseInt($('#pickupTime').val().split(':')[0]) - 12 < 10 ?
            parseInt($('#pickupTime').val().split(':')[0]) - 12 === 0 ?
                '12:' + $('#pickupTime').val().split(':')[1] + ' PM' :
                '0' + (parseInt($('#pickupTime').val().split(':')[0]) - 12) + ':' + $('#pickupTime').val().split(':')[1] + ' PM' :
            parseInt($('#pickupTime').val().split(':')[0]) - 12 + ':' + $('#pickupTime').val().split(':')[1] + ' PM'
}

function checkNoOfPassengers() {
    if (parseInt($('#adults').val()) + parseInt($('#children').val()) + parseInt($('#infants').val()) <= parseInt($('#fieldNoOfPassengers').html())) {
        return 0;
    } else {
        return parseInt($('#adults').val()) + parseInt($('#children').val()) + parseInt($('#infants').val()) - parseInt($('#fieldNoOfPassengers').html());
    }
}

function setPlaces() {
    if ($('#placeFrom option:selected').val() === $('#placeTo option:selected').val()) {
        $('#fieldDropTo').html('Not selected')
        $('#fieldPickUpFrom').html('Not selected')
    } else {
        $('#fieldDropTo').html(
            $('#placeTo').val() === '0' ?
                'Not selected' :
                $('#placeTo option:selected').html()
        );

        $('#fieldPickUpFrom').html(
            $('#placeFrom').val() === '0' ?
                'Not selected' :
                $('#placeFrom option:selected').html()
        );
    }
    validateInputs();
}

function validateInputs() {
    if ($('#noOfPassengers').val() !== 0 && parseInt($('#noOfPassengers').val()) < parseInt($('#adults').val()) + parseInt($('#children').val()) + parseInt($('#infants').val())) {
        $('#adults').val(0);
        $('#children').val(0);
        $('#infants').val(0);
        $('#fieldAdults').html(0);
        $('#fieldChildren').html(0);
        $('#fieldInfants').html(0);
    }

    if (
        $('#fieldPickUpFrom').html() !== 'Not selected' &&
        $('#fieldDropTo').html() !== 'Not selected' &&
        $('#fieldPickupDate').html() !== 'Not selected' &&
        $('#fieldPickupTime').html() !== 'Not selected' &&
        (parseInt($('#fieldNoOfPassengers').html()) === parseInt($('#fieldAdults').html()) + parseInt($('#fieldChildren').html()) + parseInt($('#fieldInfants').html()))
    ) {
        $('#priceText').html(totalCost);
    } else {
        $('#priceText').html('0.00');
    }

    if ($('#fieldPickUpFrom').html() !== 'Not selected') {
        $('.clsPlaceFrom').css('color', '');
    } else {
        $('.clsPlaceFrom').css('color', 'red');
    }

    if ($('#fieldDropTo').html() !== 'Not selected') {
        $('.clsPlaceTo').css('color', '');
    } else {
        $('.clsPlaceTo').css('color', 'red');
    }

    if ($('#fieldPickupDate').html() !== 'Not selected') {
        $('.clsDate').css('color', '');
    } else {
        $('.clsDate').css('color', 'red');
    }

    if ($('#fieldPickupTime').html() !== 'Not selected') {
        $('.clsTime').css('color', '');
    } else {
        $('.clsTime').css('color', 'red');
    }

    if ($('#fieldNoOfPassengers').html() !== '0' && parseInt($('#fieldNoOfPassengers').html()) === parseInt($('#fieldAdults').html()) + parseInt($('#fieldChildren').html()) + parseInt($('#fieldInfants').html())) {
        $('.clsPassengers').css('color', '');
    } else {
        $('.clsPassengers').css('color', 'red');
    }

    if (
        $('.clsPlaceTo').css('color') === 'rgb(255, 0, 0)' ||
        $('.clsPlaceFrom').css('color') === 'rgb(255, 0, 0)' ||
        $('.clsPassengers').css('color') === 'rgb(255, 0, 0)' ||
        $('.clsDate').css('color') === 'rgb(255, 0, 0)' ||
        $('.clsTime').css('color') === 'rgb(255, 0, 0)'
    ) {
        $('#btnSubmitReservation').prop("disabled", true);
    } else {
        $('#btnSubmitReservation').prop("disabled", false);
    }
}

var totalCost = 0.00;

function getPassengersPrice() {
    $.ajax(
        {
            type: "post",
            url: window.location.origin + $('#contextPath').val() + "/get_passengers_price",
            data: {
                passengersCount: $('#fieldNoOfPassengers').html()
            },
            success: function (response) {
                totalCost = JSON.parse(response).toFixed(2);
                validateInputs();
            },
            error: function () {

            }
        }
    );
}

$('#customerEmail').keyup(function () {
    var regex = /^([a-z])([a-z0-9])*([._-]([a-z0-9])+)*@+([a-z])*([._-]([a-z0-9])+)*([.]([a-z])+)+$/;
    if (regex.test($('#customerEmail').val())) {
        $.ajax(
            {
                type: "post",
                url: window.location.origin + $('#contextPath').val() + "/get_customer_via_email",
                data: {
                    customerEmail: $('#customerEmail').val()
                },
                success: function (response) {
                    var obj = JSON.parse(response);
                    $('#customerId').val(obj.CustomerId)
                    $('#customerName').val(obj.CustomerName)
                    $('#customerContact').val(obj.CustomerContactNo)
                },
                error: function () {

                }
            }
        );
    }
})

function validateSubmitButton() {

}