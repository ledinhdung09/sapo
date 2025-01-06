"use client";
import React, { useRef, useState } from "react";
import { Button, Card, Input, Typography } from "antd";
import { useRouter } from "next/navigation";
import { loginAPI } from "@/api/handleApi";
import { useAuth } from "@/app/(auth)/login/AuthContext";

const { Text } = Typography;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const { login } = useAuth();
  // Sử dụng kiểu `Input` từ Ant Design cho ref
  const emailRef = useRef<React.ComponentRef<typeof Input>>(null);
  const passwordRef = useRef<React.ComponentRef<typeof Input>>(null);

  const router = useRouter();

  const handleLogin = async () => {
    if (!username) {
      emailRef.current?.focus(); // Focus vào ô email nếu chưa nhập
      return;
    }
    if (!pass) {
      passwordRef.current?.focus(); // Focus vào ô password nếu chưa nhập
      return;
    }

    try {
      const response = await loginAPI(username, pass);
      console.log(response);
      if (response?.session_token && response?.username) {
        login(response.session_token);
        localStorage.setItem("username", response.username);
        router.push("/");
      } else {
        alert("Mật khẩu hoặc tài khoản không chính xác!");
      }
    } catch (err: any) {
      console.log(err.message || "An error occurred");
    }

    return;
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-white">
      <Card
        style={{
          minWidth: "400px",
        }}
      >
        <Typography.Title level={2} className="text-center">
          Đăng nhập
        </Typography.Title>
        <div>
          <Text>Username</Text>
          <Input
            value={username}
            ref={emailRef} // Đặt ref cho Ant Design Input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            style={{
              color: "black",
              marginTop: ".2rem",
              marginBottom: "1rem",
            }}
            required
            type="text"
            placeholder="Username"
          />
        </div>

        <div>
          <Text>Password</Text>
          <Input
            ref={passwordRef} // Đặt ref cho Ant Design Input
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="password"
            required
            placeholder="Password"
            style={{
              color: "black",
              marginTop: ".2rem",
            }}
          />
        </div>
        <Button
          onClick={handleLogin}
          color="default"
          variant="solid"
          className=" block m-auto mt-4"
        >
          Đăng nhập
        </Button>
      </Card>
    </div>
  );
}
