$(function () {
    init();


    function init() {
        eventBinding();
    }

    function eventBinding() {

        $('#send-msg').on('click', function () {
            setMsg('info', 'Running.....', '');

            var num = $("#phone-number").val();
            var msg = $("#msg-content").val();

            var data = {
                num: num,
                msg: msg
            };

            $.ajax({
                method: 'POST',
                data: data,
                url: "sms/send-msg",
                success: function (res) {
                    if (res.code === 0) {
                        setMsg('success', 'Well done!', 'success.');
                    } else {
                        setMsg('danger', 'Error!', 'Request failed.');
                    }
                }, error: function (error) {
                    console.log(error);
                    setMsg('danger', 'Error!', 'Request failed.');
                }
            });
        });
    }

    function setMsg(type, title, content) {
        try {
            var msgType = {
                success: 'alert alert-success',
                info: 'alert alert-info',
                warning: 'alert alert-warning',
                danger: 'alert alert-danger',
            };

            var sign_up_msg = $("#curr-msg");
            sign_up_msg.removeClass().addClass(msgType[type]);
            sign_up_msg.text('').append('<strong>' + title + '</strong> ' + content + ' ');
        }catch (e){
            console.log(e);
        }
    }
});