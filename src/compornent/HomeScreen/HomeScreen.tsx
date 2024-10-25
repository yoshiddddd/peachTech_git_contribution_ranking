import { Loading } from "../loading";
import Header from "../Header";
import "../../css/HomeScreen.css";
import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { getDocs, collection } from "firebase/firestore";
import { GET_CONTRIBUTIONS } from "../../utils/GetQuery";
import { database } from "../../utils/firebaseConfig";
import { CenteredTabs } from "../../utils/CenterdTabs";
import {UserLogin, UserNew} from "../../utils/interface";
import { from_day, end_day } from "../../utils/SetFromEndDay";
import { Weekly } from "./Weekly";
import { Yearly } from "./Yearly";

export const HomeScreen = () => {
//   const [usersData, setUsersData] = useState<User[]>([]);
  const [usersNewData, setUsersNewData] = useState<UserNew[]>([]);
  const collectionRef = collection(database, "users");
  const collectionRkgRef = collection(database, "ranking");
//   const [fetchContributions] = useLazyQuery<QueryData, QueryVariables>(
//     GET_CONTRIBUTIONS
//   );
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
    getDocs(collectionRkgRef).then((response) => {
      const githubIds = response.docs.map((user) => {
        const data = user.data();
        return {name:data.name, user_id:data.user_id, contributions:data.contributions, avatar_url:data.avatar_url, year_contributions:data.year_contributions};
      });
      setUsersNewData(githubIds);
      console.log(usersNewData);
    });
  }, []);

// log:クライアントサイドでデータ取得していた際のuseEffect
//   useEffect(() => {
//     (async () => {
//       const results = [];
//       for (const login of userLogins) {
//         const result = await fetchContributions({
//           variables: {
//             login: login.githubID,
//             from: from_day,
//             to: end_day,
//           },
//         });
//         if (result.data && result.data.user) {
//           results.push(result.data.user);
//         }
//         console.log(usersNewData);
//       }
//       setUsersData(results);
//     })();
//   }, [userLogins]);

  if (usersNewData.length === 0) return <Loading />;
  return (
    <>
      <Header />
      <CenteredTabs labels={["週間ランキング", "年間ランキング"]}>
        <Weekly usersData={usersNewData} userLogins={userLogins} />
        <Yearly usersData={usersNewData} userLogins={userLogins} />
      </CenteredTabs>
    </>
  );
};
