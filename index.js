const {MongoClient, ConnectionPoolClosedEvent} = require('mongodb');

//connection string of Mongodb atlas: 
// const uri = "mongodb+srv://rejaulkarim:THZQpfKqqN19oJ9R@cluster0.fmftb.mongodb.net/school?retryWrites=true&w=majority";

//connection string of Mongdb local server
const uri ="mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect((err, myMongoClient)=>{
    if(err){
        console.log("connection fail");
    } 
    else{
        console.log("connection successful");
        // dataDelete(myMongoClient);
        insertData(myMongoClient);
        // deleteMany(myMongoClient);
        // findOne(myMongoClient);
        // findAllData(myMongoClient);
        // findAllDataByProjection(myMongoClient)
        // findDataByquery(myMongoClient);
        // findDataByLimit(myMongoClient)
        // findAllDataByShorting(myMongoClient)
        // updateData(myMongoClient)
        // createCollection(myMongoClient);
        // delteCollection(myMongoClient);
    }
})

//data insert function
const insertData=(myMongoClient)=>{
    const myDataBase = myMongoClient.db('school');
    const myCollection = myDataBase.collection('student');
    const myData = {name: "Karim", roll: "01", class:"ten", address: "Barishal"};
    myCollection.insertOne(myData, (err)=>{
        if(err){
            console.log("data insert failed")
        } else{
            console.log("data insert success")
        }
    })

}

//mongodb data delete one operation
const dataDelete = myMongoClient=>{
    const databse = myMongoClient.db('school');
    const collection = databse.collection('student');
    const deleteItem = {roll: "0133"}
    collection.deleteOne(deleteItem, (err)=>{
        if(err){
            console.log("data delete failed")
        } else{
            console.log("data deleted successful")
        }
    })

}

//delete many operation
const deleteMany = (myMongoClient)=>{
    const databse = myMongoClient.db("school");
    const collection = databse.collection("student");
    const query = {class: "nine"}
    collection.deleteMany(query, (err, result)=>{
        if(err){
            console.log("data delete fail")
        } else{
            console.log("data delete success", result)
        }
    })
}

//find one Method operation 
const findOne = (myMongoClient) =>{
    const database = myMongoClient.db("school");
    const collection = database.collection("student");
    collection.find({roll: "02"}, (err, result)=>{
        if(err){
            console.log("finding error");
        } else{
            console.log("finded data", result);
        }
    })

}

//find many
const findAllData = (myMongoClient)=>{
    const database = myMongoClient.db("school");
    const collection = database.collection("student");
    collection.find({}).toArray((err, data)=>{
        if(err){
            console.log("data finding error");
        }
        else{
            console.log("finded data", data);
        }
    })
}


//find all data by projection and
const findAllDataByProjection=(myMongoClient)=>{
    const database = myMongoClient.db("school");
    const collection = database.collection("student");
    const itemProjection = {projection:{_id: 0,address: 1}}
    collection.find({}, itemProjection).toArray((err, data)=>{
        if(err){
            console.log("data finding error");
        }
        else{
            console.log("projection successfully", data);
        }
    })
}

//find data by query
const findDataByquery=(myMongoClient)=>{
    const database = myMongoClient.db("school");
    const collection = database.collection("student");
    const query = {roll: "03", address: "Dhaka"};
    collection.find(query).toArray((err, data)=>{
        if(err){
            console.log("Data query fail")
        }
        else{
            console.log("querys data", data)
        }
    })
}
//find data by limit
const findDataByLimit = (myMongoClient)=>{
    const database = myMongoClient.db("school");
    const collection = database.collection("student");
    collection.find().limit(2).toArray((err, data)=>{
        if(err){
            conole.log("Limitation error")
        } else{
            console.log("Finding collection", data)
        }
    })
}

//find all data by shorting 
const findAllDataByShorting = (myMongoClient)=>{
    const database = myMongoClient.db("school");
    const collection = database.collection("student");
    const shorting = {roll: -1};
    collection.find().sort(shorting).toArray((err, data)=>{
        if(err){
            console.log("data shorting error")
        }
        else{
            console.log("data shorting", data)
        }
    })
}

//update data with
const updateData = (myMongoClient)=>{
    const database = myMongoClient.db("school");
    const collection = database.collection("student");
    const query = {class:"ten"};
    const newValue = {$set:{address:"Now our power banladesh to total country"}};
    collection.updateMany(query, newValue, (err, result)=>{
        console.log("data update success", result)
        if(err){
            console.log("data update fail")
        } else{
            console.log("data update success", result)
        }
    })
}

//create myCollection
const createCollection = (myMongoClient)=>{
    const database = myMongoClient.db("school");
    database.createCollection("cleners", (err, result)=>{
      if(err){
          console.log("collection create success")
      }
      else{
          console.log("collection create successfully", result)
      }
    })
};

//delete collection
const delteCollection=(myMongoClient)=>{
    const database = myMongoClient.db("school");
    const collection = database.collection("cleners")
    collection.drop((err, result)=>{
        if(err){
            console.log("collection delete failed")
        } else{
            console.log("collection deleted successfully", result)
        }
    })
}
