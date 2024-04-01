import { Loading } from "./loading";
import Header from "./Header";
import "../css/HomeScreen.css";
import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import dayjs from "dayjs";
import moment from "moment";
import "moment/locale/ja";
import { RankingTable } from "./RankingTable";
import { getDocs, collection } from "firebase/firestore";
import { GET_CONTRIBUTIONS } from "../utils/GetQuery";
import { database } from "../utils/firebaseConfig";
import { CenteredTabs } from "../utils/CenterdTabs";
interface ContributionsCollection {
  contributionCalendar: {
    totalContributions: number;
  };
}

interface User {
  login: string;
  name: string;
  avatarUrl: string;
  totalContributionsCollection: ContributionsCollection;
  contributionsCollection: ContributionsCollection;
}

interface QueryData {
  user: User;
}

interface QueryVariables {
  login: string;
  from: string;
  to: string;
}

let from_day: string;
let to_day: string;
const today: dayjs.Dayjs = dayjs();
const isSunday: boolean = today.day() === 0;
//ローカルタイムゾーン取得するにはisoではなくformatを使用
if (isSunday) {
  from_day = dayjs().subtract(1, "week").startOf("week").add(1, "day").format();
  to_day = dayjs().subtract(1, "week").endOf("week").add(1, "day").format();
} else {
  from_day = dayjs().startOf("week").add(1, "day").format();
  to_day = dayjs().endOf("week").add(1, "day").format();
}

export const HomeScreen = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const collectionRef = collection(database, "users");
  const [fetchContributions] = useLazyQuery<QueryData, QueryVariables>(
    GET_CONTRIBUTIONS
  );
  const [userLogins, setUserLogins] = useState<string[]>([]);

  useEffect(() => {
    getDocs(collectionRef).then((response) => {
      const githubIds = response.docs.map((user) => {
        const data = user.data();
        return data.githubID;
      });
      setUserLogins(githubIds);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const results = [];
      for (const login of userLogins) {
        const result = await fetchContributions({
          variables: {
            login: login,
            from: from_day,
            to: to_day,
          },
        });
        if (result.data && result.data.user) {
          results.push(result.data.user);
        }
      }
      setUsersData(results);
    })();
  }, [userLogins]);

  if (usersData.length === 0) return <Loading />;
  return (
    <>
      <Header />
      <CenteredTabs labels={["週間ランキング", "年間ランキング"]}>
        <div>
          <div className="whenWeek">
            今週 {moment(from_day).format("MM/DD(ddd)")}~
            {moment(to_day).format("MM/DD(ddd)")} の状況
          </div>
          <div className="bord">
            {[...usersData]
              .sort(
                (a, b) =>
                  b.contributionsCollection.contributionCalendar
                    .totalContributions -
                  a.contributionsCollection.contributionCalendar
                    .totalContributions
              )
              .map((user, index) => (
                <RankingTable user={user} index={index} condition={true} />
              ))}
          </div>
        </div>
        <div>
          <div className="whenWeek">2024年の状況</div>
          <div className="bord">
            {[...usersData]
              .sort(
                (a, b) =>
                  b.totalContributionsCollection.contributionCalendar
                    .totalContributions -
                  a.totalContributionsCollection.contributionCalendar
                    .totalContributions
              )
              .map((user, index) => (
                <RankingTable user={user} index={index} condition={false} />
              ))}
          </div>
        </div>
      </CenteredTabs>
    </>
  );
};
