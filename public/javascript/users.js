$(function () {
    init();


    function init() {
        eventBinding();
        initUserTable();
    }

    function eventBinding() {

        $('#addButton').on('click', function () {
            $('#addUser').modal('show');
        });

        $('#saveAdd').on('click', function () {
            var currUserName = $('#add_user_name').val();
            var currUserEmail = $('#add_user_email').val();
            var currUserPwd = $('#add_user_pwd').val();

            var data = {
                "name": currUserName,
                "email": currUserEmail,
                "pwd": currUserPwd
            };
            $.ajax({
                url: "/users/addUser",
                data: data,
                dataType: 'json',
                method: "get",
                success: function (res) {
                    $('#addUser').modal('hide');
                    initUserTable();
                },
                error: function (err) {
                    console.error(err);
                }
            });
        });

        $('#saveEdit').on('click', function () {
            var currUserName = $('#edit_user_name').val();
            var currUserEmail = $('#edit_user_email').val();
            var currUserPwd = $('#edit_user_pwd').val();
            var currUserId = $('#edit_user_id').val();

            var data = {
                "id": currUserId,
                "name": currUserName,
                "email": currUserEmail,
                "pwd": currUserPwd
            };
            $.ajax({
                url: "users/updateUser",
                data: data,
                dataType: 'json',
                method: "post",
                success: function (res) {
                    $('#editUser').modal('hide');
                    initUserTable();
                },
                error: function (err) {
                    console.error(err);
                }
            });
        });


    }

    function initUserTable() {
        $.ajax({
            contentType: "application/json",
            crossDomain: true,
            method: 'get',
            data: '',
            dataType: 'json',
            url: "users/getAllUsers",
            success: function (res) {
                setUserTable(res);
                setUserTableOptions();
            },
            error: function (data) {
                alert("failed");
            }
        });
    }

    function setUserTable(data) {
        var dataTableOption = {
            dom: '<"top"<"pull-left"l><"pull-right"f>>rt<"bottom"<"pull-left"i><"pull-right"p>><"clear">',
            iDisplayLength: 10,
            bAutoWidth: false,
            responsive: true,
            bSort: true,
            bFilterOnEnter: true,
            paging: true,
            processing: false,
            bPaginate: true,
            sEmptyTable: "No data available in table"
        }
        dataTableOption.columns = [{
            "data": "ou_name"
        }, {
            "data": "ou_email"
        }, {
            "data": "ou_pwd"
        }, {
            width:'5%',
            render: function (data, type, full) {
                return '<span class="glyphicon glyphicon-pencil" aria-hidden="true" user_id = ' + full.ou_id + '></span>';
            }
        }, {
            width:'5%',
            render: function (data, type, full) {
                return '<span class="rm_button glyphicon glyphicon-remove-sign" aria-hidden="true" user_id = ' + full.ou_id + '></span>'
            }
        }];


        dataTableOption.data = data;
        $("#usersTable").DataTable().destroy();
        $("#usersTable").DataTable(dataTableOption)
    }

    function setUserTableOptions() {
        $('#usersTable tbody').on("click", "span.glyphicon-remove-sign", function () {
            var table = $('#usersTable').DataTable();
            table.row($(this).parents('tr')).remove().draw();
        });
        $('#usersTable tbody').on("click", "span.glyphicon-pencil", function () {
            var tdNodes = $(this).parents('tr').find('td');
            $('#edit_user_name').val($(tdNodes[0]).text());
            $('#edit_user_email').val($(tdNodes[1]).text());
            $('#edit_user_pwd').val($(tdNodes[2]).text());
            $('#edit_user_id').val($(this).attr('user_id'));
            $('#editUser').modal('show');
        });
        $('.rm_button').on('click', function () {
            var currUserId = $(this).attr('user_id');

            var data = {
                "id": currUserId
            };
            $.ajax({
                url: "users/removeUserById",
                data: data,
                dataType: 'json',
                method: "get",
                success: function (res) {
                    alert("test");
                    initUserTable();
                },
                error: function (err) {
                    alert("test");
                    console.error(err);
                }
            });
        });
    }

});
