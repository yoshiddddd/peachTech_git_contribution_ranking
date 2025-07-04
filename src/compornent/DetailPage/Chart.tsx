
import { DetailUser } from '../../utils/interface';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{`日付: ${label}`}</p>
        <p className="tooltip-value">
          {`コントリビューション数: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export const Chart = ({ usersData }: { usersData: DetailUser[] }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
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
              date: formatDate(day.date),
              contributionCount: day.contributionCount,
            }))
          );
        });
    
        return result;
      };
    
    const dairyData = transformData(usersData);
    const getCurrentYear = () => {
        const now = new Date();
        return now.getFullYear();
      };
    const year = getCurrentYear();
    
    return (
        <div className="chart">
          <h2 className="chart-title">{year}年コントリビューション推移</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={dairyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
                <XAxis 
                  dataKey="date" 
                  interval="preserveStartEnd"
                  tick={{ fontSize: 12, fill: '#666' }}
                  stroke="#888"
                />
                <YAxis
                  label={{
                    value: "コントリビューション数",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: 'middle', fill: '#666' }
                  }}
                  tick={{ fontSize: 12, fill: '#666' }}
                  stroke="#888"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  dataKey="contributionCount" 
                  type="monotone" 
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 2, fill: '#6366f1' }}
                  activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
    )
}