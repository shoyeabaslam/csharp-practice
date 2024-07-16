import { FaHandPointRight } from "react-icons/fa";
import "./categories.css";
import { useRecoilState } from "recoil";
import { CategoryListState } from "../../store/atoms";
import { TiPlus } from "react-icons/ti";
import { useState } from "react";
import AddCategory from "../addcategory/AddCategory";
import { MdDelete } from "react-icons/md";
import { CategoryType } from "../../types/CategoryType";
import { DeleteCategoryFromDb } from "../../api/Categories";
import toast from "react-hot-toast";

const Categories = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useRecoilState(CategoryListState);

  const handleAddCategory = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  const handleDeleteCategory = async (category: CategoryType) => {
    try {
      await DeleteCategoryFromDb(category);
      toast.success("Successfully deleted");
      setCategories((prev) => {
        return prev.filter((cat) => cat.categoryId !== category.categoryId);
      });
    } catch (err) {
      toast.error("Error while deleting category");
    }
  };
  return (
    <div className="flex-1 bg-white p-3 rounded-lg h-[300px]">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium text-slate-800">My Categories</h3>
        <button className="text-2xl" onClick={handleAddCategory}>
          <TiPlus className="text-slate-700" />
        </button>
      </div>
      {isCategoryOpen && <AddCategory setIsCategoryOpen={setIsCategoryOpen} />}
      <ul className="category_scrollbar h-[250px] w-full overflow-y-auto py-1">
        {categories.map((category) => (
          <li
            key={category.categoryId}
            className="flex items-center space-x-6 p-2 rounded-lg text-center text-lg  shadow-lg border border-gray-100 my-2"
          >
            <FaHandPointRight className="text-slate-600" />
            <span className="flex-1 truncate font-medium text-slate-800">
              {category.categoryName}
            </span>
            <MdDelete
              onClick={() => handleDeleteCategory(category)}
              className="text-slate-600 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
