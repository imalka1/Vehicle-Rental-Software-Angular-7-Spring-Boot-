$(window).on("load", function () {
    autoFill();
});

$('#placeFrom').change(function () {
    $('#fieldPickUpFrom').html($('#placeFrom option:selected').html());
});

$('#placeTo').change(function () {
    $('#fieldDropTo').html($('#placeTo option:selected').html());
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

$('#adults').bind("keyup change", function(e) {
    if($('#adults').val()!==''){
        $('#adults').val(parseInt($('#adults').val()) - checkNoOfPassengers());
        $('#fieldAdults').html($('#adults').val());
    }
});

$('#children').bind("keyup change", function(e) {
    if($('#children').val()!=='') {
        $('#children').val(parseInt($('#children').val()) - checkNoOfPassengers());
        $('#fieldChildren').html($('#children').val());
    }
});

$('#infants').bind("keyup change", function(e) {
    if($('#infants').val()!=='') {
        $('#infants').val(parseInt($('#infants').val()) - checkNoOfPassengers());
        $('#fieldInfants').html($('#infants').val());
    }
});

function autoFill() {
    $('#placeFrom').val($('#pickUpFromIndex').val());
    $('#placeTo').val($('#dropToIndex').val());
    $('#trip').val($('#tripIndex').val());

    $('#fieldNoOfPassengers').html($('#noOfPassengersIndex').val());
    $('#fieldPickUpFrom').html($('#placeFrom option:selected').html());
    $('#fieldDropTo').html($('#placeTo option:selected').html());
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