import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEEKLY_CONTRIBUTIONS } from "../utils/GetQuery";
import { useParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { Loading } from "./loading";
import { FaGithub } from "react-icons/fa";
import Header from "./Header";
import "../css/DetailPage.css";
import {
  DetailQueryData,
  WeeklyContributionsVariables,
  DetailUser,
  LocationState,
  UserLogin,
} from "../utils/interface";
import { Badge } from "./Badge";
import { Chart } from "./Chart";



export const DetailPage = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const matchuser = state?.matchuser as UserLogin;
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

  if (usersData.length === 0) return <Loading />;

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
          <img 
        src={`https://github-readme-stats.vercel.app/api/top-langs?username=${loginID}&show_icons=true&locale=en&layout=compact`}
        alt="GitHub Top Languages"
        className="top-langs"
      />
    </div>
        <Badge matchuser={matchuser} />
        <Chart usersData={usersData} />
      </div>
    </>
  );
};
