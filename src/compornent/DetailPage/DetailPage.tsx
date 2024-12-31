import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEEKLY_CONTRIBUTIONS } from "../../utils/GetQuery";
import { useParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { Loading } from "../loading";
import Header from "../Header";
import "../../css/DetailPage/DetailPage.css";
import {
  DetailQueryData,
  WeeklyContributionsVariables,
  DetailUser,
  LocationState,
  UserLogin,
} from "../../utils/interface";
import { Badge } from "./Badge";
import { Chart } from "./Chart";
import { Profile } from "./Profile";
import { Repository } from "./Repository";

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
  const now = new Date();
  const year = now.getFullYear(); 
  const firstDay = new Date(year, 0, 1, 0, 0, 0);
  useEffect(() => {
    (async () => {
      const results = [];
      const result = await fetchContributions({
        variables: {
          login: loginID,
          to: querytoday,
          from: firstDay.toISOString(),
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
        <div className="profile_and_repository">
            <Profile matchuser={matchuser} usersData={usersData} loginID={loginID} />
            <Repository userData={usersData} />
        </div>
        <Badge matchuser={matchuser} />
        <Chart usersData={usersData} />
      </div>
    </>
  );
};
