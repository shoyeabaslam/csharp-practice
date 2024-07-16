
export const AuthenticateUser = async (UserEmail:string,UserPassword:string)=>{
    const res = await fetch(import.meta.env.VITE_USERS_LOGIN_ENDPOINT,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json' // Correct header name
        },
        body: JSON.stringify({ // Convert the body to JSON string
            UserEmail,
            UserPassword
        })
    })
    if(!res.ok){
        throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data;
}

export const AddUser = async (userName:string,userEmail:string,userPassword:string)=>{
    const res = await fetch(import.meta.env.VITE_USERS_ENDPOINT,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json' // Correct header name
        },
        body:JSON.stringify({
            userName,
            userEmail,
            userPassword
        })
    })
    if(!res.ok){
        throw new Error("Error from the database")
    }
    const data = await res.json();
    return data;
}