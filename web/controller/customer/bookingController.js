$(document).ready(function () {
    console.log('ready')
    $('#makeReservationForm').submit(function (e) {
        e.preventDefault(e);
    });
});

$('#btnSubmitReservation').click(function () {
    var that = this;
    $("#makeReservationForm").unbind("submit");
    $('#makeReservationForm').submit();
    $(that).prop("disabled", true);
})

$(window).on("load", function () {
    console.log('load')
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
    if ($('#adults').val() !== '' && $('#adults').val() >= 0) {
        $('#adults').val(parseInt($('#adults').val()) - checkNoOfPassengers());
    } else {
        $('#adults').val(0)
    }
    $('#fieldAdults').html($('#adults').val());
    validateInputs();
});

$('#children').bind("keyup change", function (e) {
    if ($(this).val() !== '' && $(this).val() >= 0) {
        $(this).val(parseInt($(this).val()) - checkNoOfPassengers());
    } else {
        $(this).val(0)
    }
    $('#fieldChildren').html($(this).val());
    validateInputs();
});

$('#infants').bind("keyup change", function (e) {
    if ($(this).val() !== '' && $(this).val() >= 0) {
        $(this).val(parseInt($(this).val()) - checkNoOfPassengers());
    } else {
        $(this).val(0)
    }
    $('#fieldInfants').html($(this).val());
    validateInputs();
});

$('#noOfPassengers').bind("keyup change", function (e) {
    if ($(this).val() !== '' && $(this).val() >= 0) {
        if ($(this).val() > maxPassengersCount) {
            $(this).val(parseInt($(this).val()) - (parseInt($(this).val()) - maxPassengersCount));
        }
        $('#fieldNoOfPassengers').html($(this).val());
        getPassengersPrice();
    } else {
        $(this).val(0);
    }
    validateInputs();
});

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
                    $('#customerName').val(obj.CustomerName)
                    $('#customerContact').val(obj.CustomerContactNo)
                    validateSubmitButton();
                },
                error: function () {

                }
            }
        );
    } else {
        validateSubmitButton();
    }
})

$('#customerName').keyup(function () {
    validateSubmitButton();
});

$('#customerContact').keyup(function () {
    validateSubmitButton();
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
    getMaxPassengersCount();
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

    validateSubmitButton();
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

var maxPassengersCount = 0;

function getMaxPassengersCount() {
    $.ajax(
        {
            type: "post",
            url: window.location.origin + $('#contextPath').val() + "/get_max_passenger_count",
            data: {},
            success: function (response) {
                maxPassengersCount = JSON.parse(response);

            },
            error: function () {

            }
        }
    );
}

function validateSubmitButton() {
    if (
        ($('.clsPlaceTo').css('color') === 'rgb(255, 0, 0)' ||
            $('.clsPlaceFrom').css('color') === 'rgb(255, 0, 0)' ||
            $('.clsPassengers').css('color') === 'rgb(255, 0, 0)' ||
            $('.clsDate').css('color') === 'rgb(255, 0, 0)' ||
            $('.clsTime').css('color') === 'rgb(255, 0, 0)') ||
        $('#customerEmail').val().length === 0 ||
        $('#customerContact').val().length === 0 ||
        $('#customerName').val().length === 0 ||
        $('#priceText').html() === '0.00'
    ) {
        $('#btnSubmitReservation').prop("disabled", true);
    } else {
        $('#btnSubmitReservation').prop("disabled", false);
    }
}

//----------------------------------------

// Wait for the DOM to be ready
// $(function() {
//     // Initialize form validation on the registration form.
//     // It has the name attribute "makeReservation"
//     $("form[name='makeReservatio']").validate({
//         // Specify validation rules
//         rules: {
//             // The key name on the left side is the name attribute
//             // of an input field. Validation rules are defined
//             // on the right side
//             customerEmail: "required",
//             customerContact: "required",
//             customerName: "required",
//             pickupDate: "required"
//             // email: {
//             //     required: true,
//             //     // Specify that email should be validated
//             //     // by the built-in "email" rule
//             //     email: true
//             // },
//             // password: {
//             //     required: true,
//             //     minlength: 5
//             // }
//         },
//         // Specify validation error messages
//         messages: {
//             // firstname: "Please enter your firstname",
//             // lastname: "Please enter your lastname",
//             // password: {
//             //     required: "Please provide a password",
//             //     minlength: "Your password must be at least 5 characters long"
//             // },
//             customerEmail: "Please enter a valid email address"
//         },
//         // Make sure the form is submitted to the destination defined
//         // in the "action" attribute of the form when valid
//         submitHandler: function(form) {
//             form.submit();
//         }
//     });
// });