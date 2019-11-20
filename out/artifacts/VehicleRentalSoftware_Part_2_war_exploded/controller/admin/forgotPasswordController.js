var verificationCode = 0;
$('#btnReset').click(function () {
    var that = this;
    if ($(that).html() === 'Send Email') {
        if ($('#userEmail').val() !== '') {
            $.ajax(
                {
                    type: "post",
                    url: window.location.origin + $('#contextPath').val() + "/send_verification",
                    data: {
                        userEmail: $('#userEmail').val()
                    },
                    success: function (response) {
                        verificationCode = JSON.parse(response);
                        if (verificationCode !== 0) {
                            $('#passwordFields').html(
                                '<div class="form-group">' +
                                '<input type="text" class="form-control" placeholder="Enter Verification Code" id="verifyCode">' +
                                '<span><i class="fa fa-lock"></i></span>' +
                                '</div>'
                            );
                            $(that).html('Reset');
                        }
                    },
                    error: function () {

                    }
                }
            );
        }
    } else if ($(this).html() === 'Reset') {
        if (checkPasswordEquality()) {
            $.ajax(
                {
                    type: "post",
                    url: window.location.origin + $('#contextPath').val() + "/reset_password",
                    data: {
                        userEmail: $('#userEmail').val(),
                        userPassword: $('#userPassword1').val(),
                        verificationCode: verificationCode
                    },
                    success: function (response) {
                        if (JSON.parse(response) === true) {
                            document.location.href = $('#contextPath').val() + "/view/admin/login.jsp";
                        }
                    },
                    error: function () {

                    }
                }
            );
        }
    }
});

$(document).on('keyup', '#verifyCode', function () {
    if (verificationCode === parseInt($(this).val())) {
        $(this).css('border-color', '');
        $('#passwordFields').html(
            '<div class="form-group">' +
            '<input type="password" class="form-control" placeholder="New Password" id="userPassword1">' +
            '<span><i class="fa fa-lock"></i></span>' +
            '</div>' +
            '<div class="form-group">' +
            '<input type="password" class="form-control" placeholder="Re-enter Password" id="userPassword2">' +
            '<span><i class="fa fa-lock"></i></span>' +
            '</div>'
        );
    } else {
        $(this).css('border-color', 'red');
    }
})

function checkPasswordEquality() {
    if (
        $('#userPassword1').val() !== '' &&
        $('#userPassword1').val() === $('#userPassword2').val()
    ) {
        return true;
    } else {
        return false;
    }
}