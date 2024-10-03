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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "@/hooks/useRegister.hook";

const Register = () => {
  const [input, setInput] = useState({
    userName: "",
    fullName: "",
    password: "",
    gender: "",
  });

  const { register } = useRegister();
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handelSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("register form", input);
    await register(input);
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center font-bold text-white ">
      <Card className="bg-transparent text-white w-[100%] max-w-[90%] sm:max-w-[30%] backdrop-filter backdrop-blur-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-4xl">REGISTER</CardTitle>
        </CardHeader>
        <form onSubmit={handelSubmitForm}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="full name"
                type="text"
                name="fullName"
                value={input.fullName}
                onChange={handleChangeInput}
              />
            </div>
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
            <div>
              <RadioGroup
                value={input.gender}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, gender: value }))
                }
                className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Male"
                    id="male"
                    className="border-white text-white"
                  />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Female"
                    id="female"
                    className="border-white text-white"
                  />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 transition-all duration-500">
              REGISTER
            </Button>
            <div>
              <small className="font-medium">
                Already have an Account{" "}
                <Link to="/login" className="text-sky-500 hover:underline">
                  Login
                </Link>
              </small>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
