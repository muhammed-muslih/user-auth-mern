import MONGODB from 'mongodb-legacy'
const url = "mongodb://127.0.0.1:27017"
const dbName="UserManagement"
const state={
    db:null
}

 const connect =(callback)=>{
    if(state.db !==null){
        console.log("dtatabase is already connected");
        return callback(null,state.db)
    }
    MONGODB.MongoClient.connect(url,(err,client)=>{
        if(err) return callback(err)
        state.db = client.db(dbName)
        callback(null,state.db)
    })

}


 const getDB= ()=>{
    if(state.db ==null) {
        throw new Error("Database Not connected")
    }
    return state.db
}



export {connect,getDB} 

