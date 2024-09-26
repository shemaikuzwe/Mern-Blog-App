import axios from "axios";
import { MailIcon } from "./mail-icon.jsx";
import { LockIcon } from "./lock-icon.jsx";
import { useState } from "react";
import { Input, Button,Checkbox } from "@nextui-org/react";
import { Link } from "react-router-dom";


export default function Login({onClose,onSwitch}){
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
  
    const handleChange = (event) => {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!formData.email || !formData.password) {
        return setError("Invalid credentials");
      }
  
      setLoading(true);
      try {
        const res = await axios.post(
          "http://localhost:3000/auth/login",
          {
            email: formData.email,
            password: formData.password,
          },
          {
            withCredentials: true,
          }
        );
        if (res.status == 200) {
          return window.location.reload();
        }
      } catch (e) {
  
        setError("Invalid credentials");
      } finally {
        setLoading(false);
      }
    };
  
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && <h4 className="text-danger">{error}</h4>}
      <Input
        autoFocus
        endContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        onChange={handleChange}
        value={formData.email || ""}
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
        name="email"
      />
      <Input
        endContent={
          <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        onChange={handleChange}
        value={formData.password || ""}
        label="Password"
        placeholder="Enter your password"
        type="password"
        variant="bordered"
        name="password"
      />
      <div className="flex py-2 px-1 justify-between">
        <Checkbox classNames={{ label: "text-small" }}>Remember me</Checkbox>
        <Link color="primary" href="#" size="sm">
          Forgot password?
        </Link>
      </div>
      <Button color="primary" className="disabled:cursor-not-allowed" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      <Button color="default" onPress={onSwitch}>
        Register
      </Button>
    </form>
  );
}
