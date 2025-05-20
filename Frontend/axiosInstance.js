import axios from "axios";

const instance=axios.create(
    {
        baseURL:"http://localhost:3000",
        timeout:1000,
    }
);
//Request interceptor->interceptors axios ka ek feature hai jo req aur res ko modify krne ke lyi use hota hai, yeh middleware ki tarah kam krta hai jo har req aur res ce pehle aur baad me execute hota hai..
instance.interceptors.request.use(async (config)=>
{
    try{
        const token = localStorage.getItem("token");
    
//jab api authentication ke lyi baerer token ka use krti hai,toh backend exprect krta hai ki token authorization header m "bearer" ke sath aye
//agr hum "beare" na likhe, toh req reject ho skti hai ya unauthorized error (101) aa skta hai
    config.headers.Authorization=`Bearer ${token}`;
    return config;
    }
    catch(error)
    {
        console.log(error);
        
    }
});

//resposnse interceptor
instance.interceptors.response.use(
    (response)=>
    {
        console.log("Response data:",response.data);
        return response;
        
    },
    (error)=>{
        console.error("Response error:",error);
        if(error.response.status ===401)
        {
            console.log("Unauthorized error. Redirecting to login...");
            
        }
        //return Promise.reject(error);
        
    }
);
export default instance;