import { Button, CircularProgress, Input, Textarea } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "./context/session";

export default function Edit() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { session } = useSession();
  const user = session?.user;
  const getBlog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://mern-blog-app-2ha2.onrender.com/api/blogs/${id}`);
      const data = res.data;
      if (data) {
        setFormData({
          title: data.title,
          description: data.description,
        });
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const handleChange = (e) => {
    setFormData((currentData) => {
      return { ...currentData, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(`https://mern-blog-app-2ha2.onrender.com/api/blogs/${id}`, {
      title: formData.title,
      description: formData.description,
      username: user?.username,
    });
    navigate("/");
  };
  useEffect(() => {
    getBlog();
  }, []);
  if (loading) {
    return (
      <div className={"flex justify-center items-center mt-60"}>
        <CircularProgress size={"lg"} color={"primary"} />
      </div>
    );
  }
  return (
    <div className={" flex justify-center mt-12"}>
      <form className={"w-96 flex flex-col gap-3"} onSubmit={handleSubmit}>
        <Input
          size={"sm"}
          type={"text"}
          label={"Blog Title"}
          onChange={handleChange}
          name={"title"}
          value={formData.title}
        />
        <Textarea
          size={"sm"}
          label={"blog Description"}
          name={"description"}
          onChange={handleChange}
          value={formData.description}
        />
        <Button color={"primary"} radius={"sm"} type={"submit"}>
          Edit
        </Button>
      </form>
    </div>
  );
}
