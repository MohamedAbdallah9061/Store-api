const product = require('../model/product');
const Product=require('../model/product');

const getAllStaticProducts= async (req,res)=>
{
    const products=await Product.find({
        featured:true,
        
    });
   return res.status(200).send({products,nbHits:products.length});
}

const getAllProducts= async (req,res)=>
{
    const {name,featured,company,sort,fields,numericfilter}=req.query;
    const QueryObject={};
    if(featured)
    {
        QueryObject.featured=featured==='true'?true:false;
    }
    if(company)
    {
        QueryObject.company=company;
    }
    if(name)
    {
        QueryObject.name={$regex:name,$options:'i'};
    }

    if(numericfilter)
    {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
          };
          const regx= /\b(<|>|>=|=|<|<=)\b/g;
          const filters=numericfilter.replace(regx,(match)=>`-${operatorMap[match]}-`);
          const options=['rating','price'];
          filters.split(',').forEach((element) => {
           
            const [option,oprator,value]=element.split('-');
            if(options.includes(option))
            {
            QueryObject[option]={[oprator]:Number(value)};
            }
          });
    }
    let result=Product.find(QueryObject);
    if(sort)
    {
        const sortlist=sort.split(',').join(' ');
        result=result.sort(sortlist);
    }
    else
    {
        result=result.sort('createdAt');
    }

    if(fields)
    {
        const fieldslist=fields.split(',').join(' ');
        result=result.select(fieldslist);
    }
    const limit=Number(req.query.limit)||10;
    const page=Number(req.query.page)||1;
    const skip=(page-1)*limit;
    
    result=result.skip(skip).limit(limit);

    const products=await result;
   return  res.status(200).send({products,nbHits:products.length});
}

module.exports={getAllStaticProducts,getAllProducts}