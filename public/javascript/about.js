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
            var currFirstName = $('#add_first_name').val();
            var currLastName = $('#add_last_name').val();

            var data = {
                "firstName": currUserName,
                "lastName": currLastName
            };
            $.ajax({
                url: "about/add-user",
                data: data,
                method: "post",
                success: function (res) {
                    if (res.code === 0) {
                        initUserTable();
                    } else {
                        console.log(res);
                    }
                    $('#addUser').modal('hide');
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });

        $('#saveEdit').on('click', function () {
            var currFirstName = $('#edit_first_name').val();
            var currLastName = $('#edit_last_name').val();

            var data = {
                "first_name": currFirstName,
                "last_name": currLastName
            };
            $.ajax({
                url: "about/update-user",
                data: data,
                method: "post",
                success: function (res) {
                    if (res.code === 0) {
                        $('#editUser').modal('hide');
                        initUserTable();
                    } else {
                        console.log(res);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });


    }

    function initUserTable() {
        $.ajax({
            method: 'get',
            data: '',
            url: "about/all-user",
            success: function (res) {
                if (res.code === 0) {
                    setUserTable(res.data);
                } else {
                    console.log(res);
                    setUserTable(new Array());
                }
                setUserTableOptions();
            },
            error: function (err) {
                console.log(err);
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
            "data": "firstName"
        }, {
            "data": "lastName"
        }, {
            "data": "createdAt"
        }, {
            "data": "updatedAt"
        },{
            width: '5%',
            render: function (data, type, full) {
                return '<span class="glyphicon glyphicon-pencil" aria-hidden="true" user_id = ' + full.id + '></span>';
            }
        }, {
            width: '5%',
            render: function (data, type, full) {
                return '<span class="rm_button glyphicon glyphicon-remove-sign" aria-hidden="true" user_id = ' + full.id + '></span>'
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
            $('#edit_first_name').val($(tdNodes[0]).text());
            $('#edit_last_name').val($(tdNodes[1]).text());
            $('#edit_user_id').val($(this).attr('user_id'));
            $('#editUser').modal('show');
        });
        $('.rm_button').on('click', function () {
            var currUserId = $(this).attr('user_id');

            var data = {
                "id": currUserId
            };
            $.ajax({
                url: "about/remove-user",
                data: data,
                method: "post",
                success: function (res) {
                    if (res.code === 0) {
                        initUserTable();
                    } else {
                        console.log(res);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    }

});
