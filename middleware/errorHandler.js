const errorHandler= (err, req, res, next) => {
    return res.staus(500).json({ msg: err});
};



module.exports= errorHandler;