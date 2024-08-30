const express = require('express')
const http = require('http')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const server = http.createServer(app)
const success =true
app.post('/signin',async (req,res)=>{
  try{

    
    const {userName,password} = req.body
    const response = await fetch("http://localhost:8000/users")
    const data = await response.json()
    
    for (const user of data){
      if(user.userName === userName & user.password === password ){

        res.status(200).json({success:true})
        break
      }
    }
    success = false
  }catch(err){
    console.log(err)
    res.status(200).json({message:"username or passowrd incorrect"})
  }
})

app.post('/signup', async (req,res)=>{
  try{

    const { userName, email, password } = req.body
    await fetch('http://localhost:8000/users',{
     method:"POST",
     headers:{
       "content-type":"application/json"
     },
     body:JSON.stringify({userName,email,password})
     
    })
    res.status(200).json({success:true})
  }catch(error){
    console.log(error)
  }
})
app.post('/newItem', async (req,res)=>{
  
  const {itemName,itemPrice,quantity,user} = req.body
  itemPrice = itemPrice.replace("$","")
  try {
    await fetch('http://localhost:8000/carts',{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({itemName,itemPrice,quantity,user})
      
     })
     res.status(200).json({success:true})
  } catch (error) {
    console.log(error)
  }
})
const Port = 3000
server.listen(Port,()=>{
  console.log("server is running ")
})