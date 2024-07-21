import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

interface SignUpInterFace {
  userName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  console.log();

  const [signUpForm, setSignUpForm] = useState<SignUpInterFace>({
    userName: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignUpForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const onSubmitsSignUpForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      // const res = await axios.post(`${apiUrl}/api/signup`, signUpForm);
      // const data = res.data;
      console.log(signUpForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <div className="flex-1">Image some random</div>
      <div className="flex-1 flex justify-center items-center">
        <div className="border border-slate-200 shadow-lg w-[550px] h-[650px] bg-white rounded-lg px-10 py-4">
          <h1 className="text-center text-4xl font-medium">Sign Up</h1>
          <form
            onSubmit={onSubmitsSignUpForm}
            className="flex flex-col gap-4 my-14">
            <div className="flex flex-col gap-2">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={signUpForm.userName}
                onChange={onChangeInput}
                required
                className="focus:outline-none border w-full p-3 rounded-lg hover:shadow"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={signUpForm.email}
                onChange={onChangeInput}
                required
                className="focus:outline-none border w-full p-3 rounded-lg hover:shadow"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <div className="border w-full p-3 rounded-lg hover:shadow flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={signUpForm.password}
                  onChange={onChangeInput}
                  className="focus:outline-none w-full"
                  required
                />
                {showPassword ? (
                  <VscEye
                    className="text-lg cursor-pointer ml-2"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <VscEyeClosed
                    className="text-lg cursor-pointer ml-2"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 p-3 rounded-lg hover:shadow-lg text-white text-xl font-medium">
                Sign Up
              </button>

              <h1 className="font-medium my-4">
                <small>Already have an Account? </small>
                <Link href="/login">
                  <small className="text-blue-700 underline">Log In</small>
                </Link>
              </h1>

              <div className="flex items-center gap-4 my-5">
                <span className="h-[1px] w-full bg-black" />
                <span>or</span>
                <span className="h-[1px] w-full bg-black" />
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  className="flex justify-center items-center hover:shadow-lg border w-full p-3 rounded-lg font-medium text-xl">
                  <FcGoogle />
                  oogle
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
