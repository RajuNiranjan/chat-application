import { useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";

interface ProfileProp {
  userName: string;
  email: string;
  password: string;
}

const Profile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const user = currentUser.user;

  const [profileForm, setProfileForm] = useState<ProfileProp>({
    userName: user.userName,
    email: user.email,
    password: "",
  });

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitProfileForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userID = user._id;
    try {
      const res = await axios.patch(
        `/api/auth/updateprofile/${userID}`,
        profileForm
      );
      const data = res.data;
      setProfileForm({
        userName: user.userName,
        email: user.email,
        password: "",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmitProfileForm}
        className="border w-[450px] p-4 shadow-lg bg-white rounded-lg flex flex-col gap-4"
      >
        <h1 className="text-xl text-center">
          Welcome back <b className="capitalize">{user.userName}</b>
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            className="p-3 border focus-within:outline-none rounded-lg"
            value={profileForm.userName}
            onChange={onChangeText}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-3 border focus-within:outline-none rounded-lg"
            value={profileForm.email}
            onChange={onChangeText}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            className="p-3 border focus-within:outline-none rounded-lg"
            value={profileForm.password}
            onChange={onChangeText}
          />
        </div>
        <button className="bg-blue-500 p-3 rounded-lg text-white">
          Update profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
