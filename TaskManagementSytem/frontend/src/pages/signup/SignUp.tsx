import { useState } from "react";
import { ROUTES } from "../../contants/routes";
import LoginFormLayout from "../../components/loginformlayout/LoginFormLayout";
import InputForm from "../../components/inputform/InputForm";
import toast from "react-hot-toast";
import { AddUser } from "../../api/Users";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { UserState } from "../../store/atoms";
import { UserType } from "../../types/UserType";

const SignUp = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState<UserType | null>(UserState); // is used to set the state value

  const handleSignUp = async () => {
    if (
      userName.trim().length === 0 ||
      userEmail.trim().length === 0 ||
      userPassword.trim().length === 0
    ) {
      {
        toast.error("Empty fiedls");
      }
      return;
    }
    try {
      const data = await AddUser(userName, userEmail, userPassword); // adding users into db.
      setUser(data);

      toast.success("Succesfully user added");
      navigate(ROUTES.HOME);
    } catch (err) {
      toast.error("Unable to authe  nticate the user");
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center text-slate-950">
      <div className="wrapper  flex w-2/3 h-[80vh] bg-white rounded-xl overflow-hidden">
        <LoginFormLayout
          toLink={ROUTES.SIGNIN}
          linkText="Sign In"
          title="Welcome Back!"
          subTitle="To keep connected with us please login"
        />
        <div className="right flex-1 flex flex-col px-10 justify-center">
          <div className="my-5">
            <h1 className="text-2xl font-semibold">Create Account</h1>
          </div>
          <div>
            <InputForm
              name="Name"
              type="text"
              placeholder="Enter your name"
              value={userName}
              setValue={setUserName}
            />
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
            onClick={handleSignUp}
            className="bg-yellow-300 rounded-md my-4 py-2 font-semibold"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
