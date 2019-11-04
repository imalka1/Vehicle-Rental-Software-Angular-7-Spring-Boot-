$(window).on("load", function () {
    autoFill();
});

function autoFill() {
    $('#placeFrom').val($('#pickUpFromIndex').val());
    $('#placeTo').val($('#dropToIndex').val());
    $('#trip').val($('#tripIndex').val());
    $('#fieldNoOfPassengers').html($('#noOfPassengersIndex').val());
    $('#fieldPickUpFrom').html($('#placeFrom option:selected').html());
    $('#fieldDropTo').html($('#placeTo option:selected').html());
    $('#fieldTrip').html($('#trip option:selected').html());
}

$('#placeFrom').change(function () {
    $('#fieldPickUpFrom').html($('#placeFrom option:selected').html());
});

$('#placeTo').change(function () {
    $('#fieldDropTo').html($('#placeTo option:selected').html());
});

$('#trip').change(function () {
    $('#fieldTrip').html($('#trip option:selected').html());
});