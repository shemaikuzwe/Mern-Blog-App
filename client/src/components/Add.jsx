import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSession } from "./context/session";
export default function Add() {
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useSession();
  const username = session?.user.username || "user";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    username: username,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((currentData) => {
      return {
        ...currentData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("https://mern-blog-app-2ha2.onrender.com/api/blogs", {
        title: formData.title,
        description: formData.description,
        username: formData.username,
      });
      const response = await res.data;
      setIsLoading(false);
      if (response) {
        setFormData({
          title: "",
          description: "",
        });

        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={" flex justify-center mt-12"}>
      <form className={"w-96 flex flex-col gap-3"} onSubmit={handleOnSubmit}>
        <Input type="hidden" value={formData.username} name="username" />
        <Input
          size={"sm"}
          type={"text"}
          onChange={handleChange}
          value={formData.title}
          label={"Blog Title"}
          name={"title"}
        />
        <Textarea
          size={"sm"}
          label={"blog Description"}
          value={formData.description}
          onChange={handleChange}
          name={"description"}
        />
        <Button
          color={"primary"}
          radius={"sm"}
          type={"submit"}
          className="disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ?"Adding..":"Add"}
        </Button>
      </form>
    </div>
  );
}
