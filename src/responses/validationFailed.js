function validationFailed(message, data) {
    return {
        success: false,
        message: message,
        data: data
    };
}

module.exports = validationFailed;