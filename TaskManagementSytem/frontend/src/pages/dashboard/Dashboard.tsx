import { Calendar } from "../../components/ui/calendar";
import { useEffect, useState } from "react";
import TaskList from "../../components/tasklist/TaskList";
import Chart from "../../components/chart/Chart";
import Categories from "../../components/categories/Categories";
import PendingTasks from "../../components/upcomingtasks/UpcomingTasks";
import SearchBar from "../../components/searchbar/SearchBar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CategoryListState, TaskListState, UserState } from "../../store/atoms";
import { useNavigate } from "react-router";
import { ROUTES } from "../../contants/routes";
import { GetTasksByUserId } from "../../api/Tasks";
import { GetCategoriesByUserId } from "../../api/Categories";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const user = useRecoilValue(UserState);
  const setTasks = useSetRecoilState(TaskListState);
  const setCategories = useSetRecoilState(CategoryListState);

  const navigate = useNavigate();

  useEffect(() => {});

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.SIGNIN);
    } else {
      const addData = async () => {
        try {
          const userTasksRes = await GetTasksByUserId(user.userId);
          const categoriesRes = await GetCategoriesByUserId(user.userId); // fetching categories by user

          if (userTasksRes.ok) {
            const userTasksData = await userTasksRes.json();
            setTasks(userTasksData);
          }

          if (categoriesRes.ok) {
            const categoriesData = await categoriesRes.json();
            setCategories(categoriesData);
          } else {
            console.error("No records found");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      addData();
    }
  }, [navigate, setCategories, setTasks, user]);
  return (
    <div className="w-full ">
      <SearchBar />

      <div className="my-6 flex space-x-4">
        <Calendar
          className="bg-white rounded-lg"
          mode="single"
          selected={date}
          onSelect={setDate}
        />
        <TaskList date={date} />
      </div>
      <div className="flex my-6 space-x-4">
        <Categories />
        <PendingTasks />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
