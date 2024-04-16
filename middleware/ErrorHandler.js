const {CustomError}=require('../errors/CustomErrorApi');
const erroHandlerMiddlware=(err,req,res,next)=>{

    if(err instanceof CustomError){
    return res.status(err.statuscode).json({msg:err.message});
    }
   
   res.status(500).json({msg:`something Is Wrong`});
    
}


module.exports=erroHandlerMiddlware;