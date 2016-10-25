var tools = {};

(function (namespace) {

    var appName = document.title;

    var path = {
        // rootPath : '/' + appName,
        upload : '/upload',
        // user : '/user',
        // case : '/case',
        // assignment : '/assignment',
        // role : '/role',
        // alert: '/alert',
        // dashboard : '/dashboard',
        // entity: '/entity',
        // search: '/search',
        // workflow: '/workflow',
        // survey: '/survey',
        // admin:'/admin',
        // document: '/doc',
        // note: '/notes',
        // task:'/task'
    }

    namespace.ajaxEx = function (option) {
        var appName = document.title;
        var jwtName = 'jwt-' + appName.toLowerCase();
        var apiLogPath = $('#faast_url').val() + 'APILog';
        var postData = {};

        if (option.type) {
            postData.method = option.type;
        } else if (option.method) {
            postData.method = option.method;
        }
        postData.url = location.origin + '/' + appName + option.url;
        postData.origin = location.origin;
        postData.jwtName = jwtName;
        postData.params = option.data;

        var ajaxOption = {
            url: apiLogPath,
            method: "post",
            headers: {
                'jwt': $.cookie(jwtName)
            },
            data: postData,
            success: option.success,
            error: option.error
        }

        if (option.beforeSend) {
            ajaxOption.beforeSend = option.beforeSend;
        }

        $.ajax(ajaxOption);
    }

    namespace.formatDate = function formatDate(date) {
        var date = new Date(date);
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }

    namespace.formatUSD = function formatUSD(num) {
        if (typeof(num) != "undefined" && num != null) {
            return '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return '';
        }
    }

    namespace.formatUSD2 = function formatUSD2(amount) {
        if (typeof(amount) != "undefined" && amount != null) {
            return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return '';
        }
    }

    namespace.checkInputInformation = function (inputValue) {
        if (inputValue.includes("<") || inputValue.includes(">")) {
            return true;
        } else {
            return false;
        }
    }

    namespace.getDataTableOption = function () {
        var dataTableOption = {
            dom: '<"top"<"pull-left"l><"pull-right"f>>rt<"bottom"<"pull-left"i><"pull-right"p>><"clear">',
            iDisplayLength: 10,
            bAutoWidth: false,
            responsive: true,
            bSort: true,
            bFilterOnEnter: false,
            paging: true,
            processing: false,
            bPaginate: true,
            sEmptyTable: "No data available in table"
        }
        return dataTableOption
    }

    namespace.path = path;

})(tools);

$.extend({
    ajaxEx: tools.ajaxEx
});
