$('#btnReset').click(function () {
    var that = this;
    if ($(that).html() === 'Send Email') {
        if ($('#userEmail').val() !== '') {
            $.ajax(
                {
                    type: "post",
                    url: window.location.origin + $('#contextPath').val() + "/forgot_password",
                    data: {
                        userEmail: $('#userEmail').val()
                    },
                    success: function (response) {
                        if (JSON.parse(response) === true) {
                            $('#passwordFields').html(
                                '<div class="form-group">' +
                                '<input type="password" class="form-control" placeholder="New Password" id="userPassword1">' +
                                '<span><i class="fa fa-lock"></i></span>' +
                                '</div>' +
                                '<div class="form-group">' +
                                '<input type="password" class="form-control" placeholder="Re-enter Password" id="userPassword2">' +
                                '<span><i class="fa fa-lock"></i></span>' +
                                '</div>'
                            )
                            $(that).html('Reset')
                        } else {
                            $('#passwordFields').html('');
                            $(that).html('Send Email')
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
                        userPassword: $('#userPassword1').val()
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