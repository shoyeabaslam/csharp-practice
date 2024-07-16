import { useState } from "react";
import { ROUTES } from "../../contants/routes";
import LoginFormLayout from "../../components/loginformlayout/LoginFormLayout";
import InputForm from "../../components/inputform/InputForm";
import { AuthenticateUser } from "../../api/Users";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { UserState } from "../../store/atoms";
import { UserType } from "../../types/UserType";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const setUser = useSetRecoilState<UserType | null>(UserState); // is used to set the state value
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (userEmail.trim().length === 0 || userPassword.trim().length === 0) {
      return;
    }
    try {
      const data: UserType = await AuthenticateUser(userEmail, userPassword); // checking for user details
      setUser(data);

      navigate(ROUTES.HOME); // navigating to dashboard
      toast.success("Successfully Logged in");
    } catch (err) {
      console.error(err);
      toast.error("Invalid Credentials");
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center text-slate-950">
      <div className="wrapper  flex w-2/3 h-[80vh] bg-white rounded-xl overflow-hidden">
        <LoginFormLayout
          toLink={ROUTES.SIGNUP}
          linkText="Sign Up"
          title="Welcome Back!"
          subTitle="Create an account if you are new"
        />
        <div className="right flex-1 flex flex-col px-10 justify-center">
          <div className="my-5">
            <h1 className="text-2xl font-semibold">Login</h1>
          </div>
          <div>
            <InputForm
              name="Email"
              type="email"
              placeholder="Enter your email"
              value={userEmail}
              setValue={setUserEmail}
            />
            <InputForm
              name="Password"
              type="password"
              placeholder="Enter your password"
              value={userPassword}
              setValue={setUserPassword}
            />
          </div>
          <button
            onClick={handleLogin}
            className="bg-yellow-300 rounded-md my-4 py-2 font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
