$('#btnSubmitDetails').click(function () {
    if ($('#systemAddress').val() !== '' && $('#systemTelNo').val() !== '') {
        $.ajax(
            {
                type: "post",
                url: window.location.origin + $('#contextPath').val() + "/update_system_details",
                data: {
                    systemId: $('#systemId').val(),
                    systemAddress: $('#systemAddress').val(),
                    systemTelNo: $('#systemTelNo').val()
                },
                success: function (response) {
                    if (JSON.parse(response)) {

                    }
                },
                error: function () {

                }
            }
        );
    }
});

$('#btnSubmitEmail').click(function () {
    if ($('#systemEmail').val() !== '' && $('#password1').val() !== '' && checkPasswordEqualitySystem()) {
        $.ajax(
            {
                type: "post",
                url: window.location.origin + $('#contextPath').val() + "/update_system_email",
                data: {
                    systemId: $('#systemId').val(),
                    systemPassword: $('#password1').val(),
                    systemEmail: $('#systemEmail').val()
                },
                success: function (response) {
                    if (JSON.parse(response)) {

                    }
                },
                error: function () {

                }
            }
        );
    }
});

$('#btnSubmitUser').click(function () {
    if ($('#systemEmail').val() !== '' && $('#password1').val() !== '' && checkPasswordEqualityUser()) {
        $.ajax(
            {
                type: "post",
                url: window.location.origin + $('#contextPath').val() + "/update_password",
                data: {
                    userId: $('#userId').val(),
                    userEmail: $('#userEmail').val(),
                    userPassword: $('#userPassword1').val()
                },
                success: function (response) {
                    if (JSON.parse(response)) {

                    }
                },
                error: function () {

                }
            }
        );
    }
});

function checkPasswordEqualitySystem() {
    if (
        $('#password1').val() !== '' &&
        $('#password1').val() === $('#password2').val()
    ) {
        return true;
    } else {
        return false;
    }
}

function checkPasswordEqualityUser() {
    if (
        $('#userPassword1').val() !== '' &&
        $('#userPassword1').val() === $('#userPassword2').val()
    ) {
        return true;
    } else {
        return false;
    }
}