// hard-coded to US format MM/DD/YYYY which zero pads day and month < 10
module.exports.formatDate = function(date) {
    var date = new Date(date);
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
}

module.exports.formatUSD = function formatUSD(num) {
    if (typeof(num) != "undefined" && num != null) {
        return '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return '';
    }
}
