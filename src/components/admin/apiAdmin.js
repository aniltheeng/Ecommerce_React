export const createCategory=(userId,token,category)=>{
    return fetch (`http://localhost:5000/api/postcategory/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-type":'application/json',
            Authorization:`bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response=>{
        return response.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const getCategories = () => {
    return fetch(`http://localhost:5000/api/showcategory`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });

}


export const createProduct=(userId,token,product)=>{

    return fetch(`http://localhost:5000/api/postproduct/${userId}`,{
     method:"POST",
     headers:{
         Accept:'application/json',   
         Authorization:`Bearer ${token}`
     },
     body:product
    })
    .then(response=>{
       return response.json() ;
    })
    .catch(err=>{
        console.log(err);
    });
   };