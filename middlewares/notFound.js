const notFound = (request,response)=>{
    response.status(404).json({error: "undefined path"}).end()
}

export {notFound}