$(window).on("load", function () {
    initialFill();
    getPassengersPrice();
});

$('#placeFrom').change(function () {
    setPlaces();
    validateInputs();
});

$('#placeTo').change(function () {
    setPlaces();
    validateInputs();
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
        $('#fieldNoOfPassengers').html(0);
    }
    getPassengersPrice();
});

function initialFill() {
    $('#placeFrom').val($('#pickUpFromIndex').val());
    $('#placeTo').val($('#dropToIndex').val());
    $('#trip').val($('#tripIndex').val());
    $('#noOfPassengers').val($('#noOfPassengersIndex').val());
    setPlaces()

    $('#fieldNoOfPassengers').html($('#noOfPassengersIndex').val());
    $('#fieldTrip').html($('#trip option:selected').html());
    $('#fieldPickupDate').html($('#pickupDate').val());
    $('#fieldPickupTime').html(
        convertAmPm()
    );
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
    if ($('#placeFrom option:selected').html() === $('#placeTo option:selected').html()) {
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
}

function validateInputs() {
    if (parseInt($('#noOfPassengers').val()) < parseInt($('#adults').val()) + parseInt($('#children').val()) + parseInt($('#infants').val())) {
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