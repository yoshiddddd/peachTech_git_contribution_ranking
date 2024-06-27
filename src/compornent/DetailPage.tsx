import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEEKLY_CONTRIBUTIONS } from "../utils/GetQuery";
import { useParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { Loading } from "./loading";
import { FaGithub } from "react-icons/fa"
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
  } from "recharts";
import { syntaxError } from "graphql";
import Header from "./Header";
import "../css/DetailPage.css";
// import icon from "giticon.png";
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
    avatarUrl: string;
    contributionsCollection: ContributionsCollection;
  }
  
  export interface QueryData {
    user: User;
  }
  
  export interface WeeklyContributionsVariables {
    login: string;
    to: string;
  }
  interface MatchUser {
    githubID: string;
    username: string;
  }
  
  interface LocationState {
    matchuser?: MatchUser;
  }
export const DetailPage = () => {
    const location = useLocation();
    const state = location.state as LocationState;
    const matchuser = state?.matchuser;
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
    console.log(matchuser);
    return (
        <>
        <Header />
        <div className="parent">
        <div className="profile">
            <img src={usersData[0].avatarUrl} alt={`${usersData[0].name} Avatar`} className="avatarurl"/>
            <h2 className="name">{matchuser?.username}</h2>
            {/* <img src="/giticon.png"></img> */}
            <a href={"https://github.com/"+loginID} className="githubpagelink" target="_blank">
            <FaGithub size={50}/>
            </a>
        </div>
        <div className="chart">
            <h2>2024年推移</h2>
        <ComposedChart
        width={1300}
        height={400}
        data={dairyData}>
        {/* <CartesianGrid stroke="#f5f5f5" fill="#e0f7fa" /> */}
        <XAxis dataKey="date" interval={15} />
        <YAxis  label={{ value: "コントリビューション数", angle: -90, position: "insideLeft" }}/>
        <Tooltip />

        <Line dataKey="contributionCount" type="monotone" />
        </ComposedChart>
        </div>
</div>
</>
    );

}