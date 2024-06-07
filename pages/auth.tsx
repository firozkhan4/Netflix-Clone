import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant(variant === "login" ? "register" : "login");
  }, [variant]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
    } catch (error) {
      console.error(error);
    }
  }, [email, name, password]);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
    }
  }, [email, password]);
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-fixed bg-center">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="flex items-center px-12 py-5">
          <h1 className="text-red-600 text-5xl font-bold font-mono">NETFLIX</h1>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 self-center  px-16 py-16 mt-2 lg:2/5 lg:max-w-md rounded-md w-full ">
            <h2 className="font-semibold text-white text-4xl mb-8">
              {variant === "login" ? "Sign in" : "Create Account"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  lable="Username"
                  type="text"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                />
              )}
              <Input
                lable="Email"
                value={email}
                type="email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
              />
              <Input
                lable="Password"
                value={password}
                type="password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
