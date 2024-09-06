import { useState } from "react";
import axios from "axios";
import { Input, Button } from "@nextui-org/react";
import { MailIcon } from "./mail-icon.jsx";
import { LockIcon } from "./lock-icon.jsx";
import { Link } from "react-router-dom";


export default function Register({ onClose, onSwitch }) {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      return setError("Please fill in all fields");
    }
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        {
          email: formData.email,
          password: formData.password,
          username:formData.username
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        return window.location.reload()
      }
    } catch (e) {
      console.log(e);
      setError(e.message.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-5 flex-col">
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
        autoFocus
        endContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        onChange={handleChange}
        value={formData.username || ""}
        label="username"
        placeholder="Enter your username"
        variant="bordered"
        name="username"
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
      <Input
        endContent={
          <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        onChange={handleChange}
        value={formData.confirmPassword || ""}
        label="Confirm Password"
        placeholder="Confirm your password"
        type="password"
        variant="bordered"
        name="confirmPassword"
      />
      <Button color="primary" type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
      <Button color="default" onPress={onSwitch}>
        Login
      </Button>
    </form>
  );
}
