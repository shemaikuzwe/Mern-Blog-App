import BlogCard from "./BlogCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@nextui-org/react";
import { useSession } from "./context/session.jsx";

export default function Home() {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const{session}=useSession()
  const getBlogList = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/blogs");
      const data = await res.data;
      setBlogList(data);
      setLoading(false);
    } catch (e) {
      setBlogList([]);
      setLoading(false);
      console.log(e);
    }
  };
  useEffect(() => {
    getBlogList();
  }, []);
  console.log(session);
  
  if (loading) {
    return (
      <div className={"flex justify-center items-center mt-60"}>
        <CircularProgress size={"lg"} color={"primary"} />
      </div>
    );
  }
  return (
    <div className={"flex gap-4 justify-center items-center flex-wrap py-4"}>
      {blogList && blogList.length ? (
        blogList.map((blog, index) => <BlogCard key={index} blog={blog} />)
      ) : (
        <span className={" text-inherit text-xl"}>No Blogs found</span>
      )}
    </div>
  );
}
