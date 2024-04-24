const errorHandler = (err, req, res, next) => {
    console.log(err, '=======')
    res.status(err.status).json({err: err.message})
}

module.exports = { errorHandler }