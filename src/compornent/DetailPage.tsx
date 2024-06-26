import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEEKLY_CONTRIBUTIONS } from "../utils/GetQuery";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Loading } from "./loading";
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
  } from "recharts";
import { syntaxError } from "graphql";
  export interface ContributionDay {
    date: string;
    contributionCount: number;
  }
  
  export interface Week {
    contributionDays: ContributionDay[];
  }
  
  export interface ContributionCalendar {
    weeks: Week[];
  }
  
  export interface ContributionsCollection {
    contributionCalendar: ContributionCalendar;
  }
  
  export interface User {
    login: string;
    name: string;
    contributionsCollection: ContributionsCollection;
  }
  
  export interface QueryData {
    user: User;
  }
  
  export interface WeeklyContributionsVariables {
    login: string;
    to: string;
  }

export const DetailPage = () => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const { loginID } = useParams<{ loginID: string }>() as { loginID: string };
    const [fetchContributions] = useLazyQuery<QueryData, WeeklyContributionsVariables>(
        GET_WEEKLY_CONTRIBUTIONS);
    const today: dayjs.Dayjs = dayjs();
    const querytoday: string = today.format();
        // if (!loginID) {
        //     return <div>No Login ID provided</div>;
        //   }
    useEffect(() => {
        (async () => {
          const results = [];
            const result = await fetchContributions({
              variables: {
                login: loginID,
                to: querytoday
              },
            });
            if (result.data && result.data.user) {
              results.push(result.data.user);
            }
            setUsersData(results);
            console.log(usersData);
        })();
    }, []);
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; // 月は0から始まるため+1する
        const day = date.getDate();
        return `${month}/${day}`;
      };
      
      const transformData = (users: User[]): { date: string; contributionCount: number }[] => {
        const result = users.flatMap(user => {
          if (!user.contributionsCollection || !user.contributionsCollection.contributionCalendar) {
            return [];
          }
      
          const { weeks } = user.contributionsCollection.contributionCalendar;
      
          return weeks.flatMap(week =>
            week.contributionDays.map(day => ({
              date: formatDate(day.date), // 日付をフォーマットする
              contributionCount: day.contributionCount
            }))
          );
        });
      
        return result;
      };
    if (usersData.length === 0) return <Loading />;
    const dairyData = transformData(usersData);
    // console.log(loginID);
    return (
        <div>hello
        <ComposedChart
        width={1300}
        height={400}
        data={dairyData}>
        <XAxis dataKey="date" interval={15} />
        <YAxis />
        <Tooltip />

        <Line dataKey="contributionCount" type="monotone" />
        </ComposedChart>
</div>
    );

}