import { FC, useState } from "react";
import InputForm from "../inputform/InputForm";
import { CgClose } from "react-icons/cg";
import toast from "react-hot-toast";
import { AddCategoriesToDb } from "../../api/Categories";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CategoryListState, UserState } from "../../store/atoms";
import { CategoryType } from "../../types/CategoryType";

interface Type {
  setIsCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCategory: FC<Type> = ({ setIsCategoryOpen }) => {
  const [taskName, setTaskName] = useState<string>("");

  const user = useRecoilValue(UserState);
  const setCategory = useSetRecoilState(CategoryListState);

  const handleAddCategory = async () => {
    if (!user) {
      toast.error("User is not authenticated");
      return;
    }
    try {
      const categroy: Omit<CategoryType, "categoryId"> = {
        userId: user.userId,
        categoryName: taskName,
      };
      const data = await AddCategoriesToDb(categroy);
      setCategory((prev) => {
        const categoryItem = [...prev, data];
        return categoryItem;
      });
      toast.success("Successfully category added.");
    } catch (err) {
      toast.error("Error while adding category");
      console.error(err);
    } finally {
      setIsCategoryOpen(false);
    }
  };
  return (
    <div className="z-[1000] w-full h-full fixed inset-1 bg-white/80 flex justify-center items-center text-slate-900">
      <div className="p-4 w-[400px] bg-white shadow-2xl rounded-lg border border-gray-200 relative">
        <div className="absolute right-3 top-2 text-2xl">
          <CgClose
            className=" cursor-pointer"
            onClick={() => setIsCategoryOpen((prev) => !prev)}
          />
        </div>

        <InputForm
          name="Category Name"
          type="text"
          placeholder="Eg: Work"
          value={taskName}
          setValue={setTaskName}
        />
        <button
          onClick={handleAddCategory}
          className="bg-yellow-500 rounded-lg w-full py-1 font-medium my-2"
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
