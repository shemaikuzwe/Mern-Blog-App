import {Button, Card, CardBody, CardFooter, CardHeader, Divider} from "@nextui-org/react";
import {FaTrashCan,FaPen} from "react-icons/fa6"
import {Link, useNavigate,redirect} from "react-router-dom";
import axios from "axios";
export default function BlogCard({blog}){

    const navigate = useNavigate();

   const  handleDelete= async (id)=>{
       const response=await  axios.delete(`https://mern-blog-app-2ha2.onrender.com/api/blogs/${id}`)
       const  status=await response.data;
       if (status){
           navigate(0)
       }
   }
    return(
        <Card className="w-[300px] h-[36vh]">
            <CardHeader className="flex gap-3 justify-center items-center">
                <span className={"font-bold text-xl text-inherit "}>{blog.title}</span>
            </CardHeader>
            <Divider/>
            <CardBody >
                <p className={"text-inherit py-1"}>
                    {blog.description}
                </p>

            </CardBody>
            <Divider/>
            <CardFooter className={"flex gap-8 justify-center "}>
                <Button color={"success"} radius={"sm"} size={"md"} className={"text-white"}><Link to={`/edit/${blog._id}`} className={"flex gap-3"}><FaPen/>Edit</Link></Button>

                <Button color={"danger"} radius={"sm"} size={"md"} className={"text-white"} onClick={()=>handleDelete(blog._id)}><FaTrashCan/>Remove</Button>
            </CardFooter>
        </Card>
    );
}
