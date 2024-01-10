import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
const Dashboard = () => {
  const {loginData,setLoginData,setUser}=useContext(LoginContext);
  
  const navigate=useNavigate();

const DashboardValid=async()=>{
let token=localStorage.getItem("userDataToken");
console.log(token);
const response=await axios.get('http://localhost:8000/validUser',{
    headers:{
        Accept:'application/json',
        authorization:token
    }
});
//console.log(response.data);
if(response.data.status === 401 ||!response.data){
     navigate("*")}
else{
  console.log("user verify");
  setLoginData(response.data.validUserOne)
  setUser(response.data.validUserOne.email[0].toUpperCase());
  navigate('/dashboard')
}
}

useEffect(()=>{
DashboardValid();
},[]);

  return (
    <>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center",backgroundColor:"pink"}}>
     <h1>User Email :{loginData?loginData.email:""}</h1>
        </div>
    </>
  )
}

export default Dashboard