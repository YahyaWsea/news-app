const handleError = (err, res) => {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
        status: "error",
        statusCode,
        message
    });
};

module.exports = { handleError };