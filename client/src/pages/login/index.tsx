import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [input, setInput] = useState({
    userName: "",
    password: "",
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handelSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form", input);
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center font-bold text-white ">
      <Card className="bg-transparent text-white w-[100%] max-w-[90%] sm:max-w-[60%] backdrop-filter backdrop-blur-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-4xl">LOGIN</CardTitle>
        </CardHeader>
        <form onSubmit={handelSubmitForm}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                placeholder="user name"
                type="text"
                value={input.userName}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="password"
                type="password"
                value={input.password}
                onChange={handleChangeInput}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 transition-all duration-500"
            >
              LOGIN
            </Button>
            <div>
              <small className="font-medium">
                {"Don't"} have an Account{" "}
                <Link to="/register" className="text-sky-500 hover:underline">
                  Register
                </Link>
              </small>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LogIn;
