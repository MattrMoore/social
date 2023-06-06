function formatDate(timestamp) {
    return Intl.DateTimeFormat('en-US').format(timestamp);
}

module.exports = formatDate;