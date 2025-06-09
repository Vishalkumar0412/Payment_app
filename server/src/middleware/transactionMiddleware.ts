export const transactionMiddleware = (req, res, next) => {
   
    const { amount, to } = req.body;
    
    if (!amount || !to) {
        return res.status(400).json({
        success: false,
        message: "Amount and receiver are required",
        });
    }
    
 
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({
        success: false,
        message: "Amount must be a positive number",
        });
    }
    
   
    next();
    }