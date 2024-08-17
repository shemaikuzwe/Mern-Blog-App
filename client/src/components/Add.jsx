import {Button, Input, Textarea} from "@nextui-org/react";
import {useState} from "react";
import  axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Add(){
    const [formData,setFormData]=useState({})
    const navigate=useNavigate();
    const  handleChange=(e)=>{
        setFormData(currentData=>{
            return{
                ...currentData,
                [e.target.name]: e.target.value
            }
        })
    }
    const  handleOnSubmit=async (e)=>{
        e.preventDefault()
      try {
          const  res=await  axios.post("https://mern-blog-app-2ha2.onrender.com/api/blogs",{
              title:formData.title,
              description:formData.description,
          })
          const response=await res.data;
          if (response){
              setFormData({
                  title:"",
                  description:""
              })
              navigate("/");
          }
      }catch (e){
            console.log(e)
      }
    }
    return(
     <div className={" flex justify-center mt-12"}>
         <form className={"w-96 flex flex-col gap-3" } onSubmit={handleOnSubmit}>
              <Input size={"sm"} type={"text"} onChange={handleChange} value={formData.title} label={"Blog Title"} name={"title"}/>
             <Textarea size={"sm"} label={"blog Description"} value={formData.description} onChange={handleChange} name={"description"}/>
             <Button color={"primary"} radius={"sm"} type={"submit"}>Add</Button>
         </form>
     </div>
    );
}
