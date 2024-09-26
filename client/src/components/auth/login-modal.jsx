import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import Login from "./login";
import Register from "./register";
import { useState } from "react";

export default function LoginModal() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isLogin, setIsLogin] = useState(true);
  const handleSwitch = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Login
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <ModalHeader>{isLogin ? "log in" : "Register"}</ModalHeader>
          <ModalBody>
            {isLogin ? (
              <Login onClose={onClose} onSwitch={handleSwitch} />
            ) : (
              <Register onClose={onClose} onSwitch={handleSwitch} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
