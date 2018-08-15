module.exports = (req,res,next) => {
    if(req.body.id_product && req.body.quantity && req.body.amount){
        next();
    }
    else
        return res.status(400).send('Invalid input (cart item): {id_product,quantity,amount}');
}