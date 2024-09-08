
import { DetailUser } from '../utils/interface';
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
export const Chart = ({ usersData }: { usersData: DetailUser[] }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; // 月は0から始まるため+1する
        const day = date.getDate();
        return `${month}/${day}`;
      };
    
    const transformData = (
        users: DetailUser[]
      ): { date: string; contributionCount: number }[] => {
        const result = users.flatMap((user) => {
          if (
            !user.contributionsCollection ||
            !user.contributionsCollection.contributionCalendar
          ) {
            return [];
          }
          const { weeks } = user.contributionsCollection.contributionCalendar;
          return weeks.flatMap((week) =>
            week.contributionDays.map((day) => ({
              date: formatDate(day.date), // 日付をフォーマットする
              contributionCount: day.contributionCount,
            }))
          );
        });
    
        return result;
      };
    const dairyData = transformData(usersData);

    return (
        <div className="chart">
          <h2>2024年推移</h2>
          <ComposedChart width={1400} height={400} data={dairyData}>
            <XAxis dataKey="date" interval={20} />
            <YAxis
              label={{
                value: "コントリビューション数",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />

            <Line dataKey="contributionCount" type="monotone" />
          </ComposedChart>
        </div>
    )
}