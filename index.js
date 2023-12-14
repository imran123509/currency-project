const express=require('express');
const axios=require('axios');

const app=express();

app.get('/currency', async (req, res)=>{
     try{
        const response= await axios.get(`https://open.er-api.com/v6/latest/${apiKey}`);
        const currencies=Object.keys(response.data.rates);
        res.json(currencies);

     } catch(error){
         console.error(error);
         res.status(500).json({error: "internal problem"});
     }
});

app.get('/exchange-rate', async (req, res)=>{
      const {base , target}=req.query;

      if(!base || !target){
           return res.status(400).json({error: "both are required"});
           
      }

      try {
        const response= await axios.get(`https://open.er-api.com/v6/latest/${apiKey}`);

        const exchangeRate=response.data.rates[target]/response.data.rates[base];

        res.json({base, target, exchangeRate});
      }catch(error){
        console.error(error);
        return res.status(500).json({error: "both are required"});
      }


});



app.listen(8000, ()=>{
    console.log('connected to the server');
})