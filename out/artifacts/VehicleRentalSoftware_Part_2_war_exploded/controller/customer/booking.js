$(window).on("load", function () {
    autoFill();
    getPassengersPrice();
});

$('#placeFrom').change(function () {
    setPlaces()
});

$('#placeTo').change(function () {
    setPlaces()
});

$('#trip').change(function () {
    $('#fieldTrip').html($('#trip option:selected').html());
});

$('#pickupDate').change(function () {
    $('#fieldPickupDate').html($('#pickupDate').val());
});

$('#pickupTime').change(function () {
    $('#fieldPickupTime').html(
        convertAmPm()
    );
});

$('#adults').bind("keyup change", function (e) {
    if ($('#adults').val() !== '') {
        $('#adults').val(parseInt($('#adults').val()) - checkNoOfPassengers());
        $('#fieldAdults').html($('#adults').val());
    }
});

$('#children').bind("keyup change", function (e) {
    if ($('#children').val() !== '') {
        $('#children').val(parseInt($('#children').val()) - checkNoOfPassengers());
        $('#fieldChildren').html($('#children').val());
    }
});

$('#infants').bind("keyup change", function (e) {
    if ($('#infants').val() !== '') {
        $('#infants').val(parseInt($('#infants').val()) - checkNoOfPassengers());
        $('#fieldInfants').html($('#infants').val());
    }
});

$('#noOfPassengers').bind("keyup change", function (e) {
    if ($('#noOfPassengers').val() !== '') {
        $('#fieldNoOfPassengers').html($('#noOfPassengers').val());
        getPassengersPrice();
    }
});

function autoFill() {
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
        $('#fieldDropTo').html('No selected')
        $('#fieldPickUpFrom').html('No selected')
    } else {
        $('#fieldDropTo').html(
            $('#placeTo').val() === '0' ?
                'No selected' :
                $('#placeTo option:selected').html()
        );

        $('#fieldPickUpFrom').html(
            $('#placeFrom').val() === '0' ?
                'No selected' :
                $('#placeFrom option:selected').html()
        );
    }
}

function getPassengersPrice() {
    $.ajax(
        {
            type: "post",
            url: window.location.origin + $('#contextPath').val() + "/get_passengers_price",
            data: {
                passengersCount: $('#noOfPassengers').val()
            },
            success: function (response) {
                $('#priceText').html(JSON.parse(response).toFixed(2));
            },
            error: function () {

            }
        }
    );
}