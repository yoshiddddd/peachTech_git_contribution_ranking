import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEEKLY_CONTRIBUTIONS } from "../utils/GetQuery";
import { useParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { Loading } from "./loading";
import { FaGithub } from "react-icons/fa";
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
import {
  DetailQueryData,
  WeeklyContributionsVariables,
  DetailUser,
  LocationState,
} from "../utils/interface";



export const DetailPage = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const matchuser = state?.matchuser;
  const [usersData, setUsersData] = useState<DetailUser[]>([]);
  const { loginID } = useParams<{ loginID: string }>() as { loginID: string };
  const [fetchContributions] = useLazyQuery<
    DetailQueryData,
    WeeklyContributionsVariables
  >(GET_WEEKLY_CONTRIBUTIONS);
  const today: dayjs.Dayjs = dayjs();
  const querytoday: string = today.format();
  useEffect(() => {
    (async () => {
      const results = [];
      const result = await fetchContributions({
        variables: {
          login: loginID,
          to: querytoday,
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
  if (usersData.length === 0) return <Loading />;
  const dairyData = transformData(usersData);
  console.log(matchuser?.first_n);

  let badges: JSX.Element[] = [];

  if (matchuser?.first_n) {
    badges = Array.from({ length: 117 }).map((_, index) => (
      <div className="firstbadge" key={`first-${index}`}>
        <img
          src={`${process.env.PUBLIC_URL}/image/first.png`}
          alt="first"
          className="first"
        />
      </div>
    ));
  }

  if (matchuser?.second_n) {
    badges = badges.concat(
      Array.from({ length: matchuser.second_n }).map((_, index) => (
        <div className="secondbadge" key={`second-${index}`}>
          <img
            src={`${process.env.PUBLIC_URL}/image/second.png`}
            alt="second"
            className="second"
          />
        </div>
      ))
    );
  }

  if (matchuser?.third_n) {
    badges = badges.concat(
      Array.from({ length: matchuser.third_n }).map((_, index) => (
        <div className="thirdbadge" key={`third-${index}`}>
          <img
            src={`${process.env.PUBLIC_URL}/image/third.png`}
            alt="third"
            className="third"
          />
        </div>
      ))
    );
  }




  return (
    <>
      <Header />
      <div className="parents">
        <div className="profile">
          <img
            src={usersData[0].avatarUrl}
            alt={`${usersData[0].name} Avatar`}
            className="avatarurl"
          />
          <h2 className="name">{matchuser?.username}</h2>
          <a
            href={"https://github.com/" + loginID}
            className="githubpagelink"
            target="_blank"
          >
            <FaGithub size={50} />
          </a>
        {/* <div className="profileinfo"> */}
          <img 
        src={`https://github-readme-stats.vercel.app/api/top-langs?username=${loginID}&show_icons=true&locale=en&layout=compact`}
        alt="GitHub Top Languages"
        className="top-langs"
      />
      {/* <img src={`https://github-readme-stats.vercel.app/api?username=${loginID}&show_icons=true&locale=en`} alt="GitHub Stats" className="status"/> */}
      {/* </div>   */}
        </div>

        <div className="badge_field">
      <p className="badge-title">👑週間ランキング獲得バッチ👑</p>
      <div className="badges">
      {badges.length > 0 ? badges : <p className="not-badge-msg">まだバッチを取得したことがありません！</p>}
      </div>
    </div>

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
      </div>
    </>
  );
};
