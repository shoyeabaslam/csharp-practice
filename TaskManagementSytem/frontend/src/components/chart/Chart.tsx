import { useEffect } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useRecoilValue } from "recoil";
import { filterWeekTask } from "../../store/selectors";

const chartConfig = {
  desktop: {
    label: "Tasks Completed",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const Chart = () => {
  const chartData = useRecoilValue(filterWeekTask);
  useEffect(() => {
    // Suppress warnings about defaultProps for function components
    const consoleError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("Support for defaultProps will be removed")
      ) {
        return;
      }
      consoleError(...args);
    };
  }, []);
  return (
    <div className="flex-1 rounded-lg py-4 bg-white h-[300px]">
      <h3 className="px-4 text-start text-lg text-slate-800 font-medium">
        Weekly Performance Overview
      </h3>
      <ChartContainer config={chartConfig} className="h-full w-full p-4">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="week"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <CartesianGrid vertical={false} />

          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="tasks" fill="#E6C000" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default Chart;
