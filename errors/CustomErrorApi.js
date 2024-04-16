class CustomError extends Error
{
    constructor(message,statuscode)
    {
     super(message);
     this.statuscode=statuscode;
    }
}
const CreateCustomError=(msg,StatusCode)=>{
    return new CustomError(msg,StatusCode);
}

module.exports={CustomError,CreateCustomError};