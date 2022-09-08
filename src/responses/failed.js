function failed(message, data) {
    return {
        success: false,
        message: message,
        data: data
    };
}

module.exports = failed;