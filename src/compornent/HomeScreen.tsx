import { Loading } from "./loading";
import Header from "./Header";
import "../css/HomeScreen.css";
import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import moment from "moment";
import "moment/locale/ja";
import { RankingTable } from "./RankingTable";
import { getDocs, collection } from "firebase/firestore";
import { GET_CONTRIBUTIONS } from "../utils/GetQuery";
import { database } from "../utils/firebaseConfig";
import { CenteredTabs } from "../utils/CenterdTabs";
import {User, QueryData, QueryVariables,UserLogin} from "../utils/interface";
import { from_day, end_day } from "../utils/SetFromEndDay";
import { Weekly } from "./Weekly";

export const HomeScreen = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const collectionRef = collection(database, "users");
  const [fetchContributions] = useLazyQuery<QueryData, QueryVariables>(
    GET_CONTRIBUTIONS
  );
  const [userLogins, setUserLogins] = useState<UserLogin[]>([]);

  useEffect(() => {
    getDocs(collectionRef).then((response) => {
      const githubIds = response.docs.map((user) => {
        const data = user.data();
        return { githubID: data.githubID, username: data.name,first_n:data['1st_num'],second_n:data['2nd_num'],third_n:data['3rd_num'] };
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
            login: login.githubID,
            from: from_day,
            to: end_day,
          },
        });
        if (result.data && result.data.user) {
          results.push(result.data.user);
        }
        console.log(result);
      }
      setUsersData(results);
    })();
  }, [userLogins]);

  if (usersData.length === 0) return <Loading />;
//   console.log(userLogins);
  return (
    <>
      <Header />
      <CenteredTabs labels={["週間ランキング", "年間ランキング"]}>
        <Weekly usersData={usersData} userLogins={userLogins} />
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
                <RankingTable
                  user={user}
                  index={index}
                  condition={false}
                  userlogins={userLogins}
                />
              ))}
          </div>
        </div>
      </CenteredTabs>
    </>
  );
};
