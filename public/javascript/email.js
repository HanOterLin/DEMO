$(function() {
    init();
});

function init() {
    eventBinding();
}

function eventBinding() {

    $("#sign-up-btn").click(function() {
        setMsg('info', 'Running.....', '');

        var enter_email = $("#enter-email").val();
        var enter_password = $("#enter-password").val();

        if (checkEmailFormat(enter_email) && checkPwdFormat(enter_password)){
            var data = {
                regEmail : enter_email,
                regPwd : enter_password
            };

            $.ajax({
                contentType: "application/json",
                crossDomain: true,
                method: 'POST',
                data: JSON.stringify(data),
                dataType:'text',
                url: "email/sendEmail",
                success: function(res) {
                    setMsg('success', 'Well done!', res);
                },error: function(error) {
                    console.log(error);
                    setMsg('danger', 'Error!', 'Request failed.');
                }
            });
        }
    });

}

function checkEmailFormat(enter_email) {
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    if (!reg.test(enter_email)){
        setMsg('warning', 'Warning!', 'Enter not a E-mail address.');
        return false;
    }
    return true;
}

function checkPwdFormat(enter_password) {
    var reg = /^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
    if (!reg.test(enter_password)){
        setMsg('warning', 'Warning!', 'Password format not right,Only allow length 6-20 character "1-9", "_", "a-z", "A-Z".');
        return false;
    }
    return true;
}

function setMsg(type, title, content) {
    try {
        var msgType = {
            success: 'alert alert-success',
            info: 'alert alert-info',
            warning: 'alert alert-warning',
            danger: 'alert alert-danger',
        };

        var sign_up_msg = $("#sign-up-msg");
        sign_up_msg.removeClass().addClass(msgType[type]);
        sign_up_msg.text('').append('<strong>' + title + '</strong> ' + content + ' ');
    }catch (e){
        console.log(e);
    }
}