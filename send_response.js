
module.exports.sendResponse = (res, data,statusCode) => {
    res.status(statusCode).json(data);
};
