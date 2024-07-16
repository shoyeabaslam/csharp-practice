import { useRecoilValue } from "recoil";
import profile from "../../assets/images/profile.png";
import { UserState } from "../../store/atoms";

const Profile = () => {
  const user = useRecoilValue(UserState);
  return (
    <div className="p-2 flex-1 bg-white rounded-lg flex flex-col justify-center items-center ">
      <div className="bg-yellow-300 w-fit rounded-full p-1 overflow-hidden">
        <img
          src={profile}
          className="w-[60px] h-[60px] object-cover rounded-b-full object-top"
        />
      </div>
      <div className="flex flex-col items-center pb-2 px-1 text-slate-900">
        <h3 className="font-medium text-lg">{user?.userName}</h3>
        <p className="text-sm">Congratulations on getting started!</p>
      </div>
    </div>
  );
};

export default Profile;
