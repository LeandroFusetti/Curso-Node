const getUsuarioByID =(id,callback)=>{
    const usuario ={
        id,
        nombre:"leandro"
    }

    setTimeout(()=>{
        callback(usuario)
    },1500

    )


}

getUsuarioByID(10,(user)=>{
    console.log(user);
    
})