import './App.css';
import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import dayjs from 'dayjs';
import moment from 'moment';
import "moment/locale/ja"; // 日本語ロケールをインポート
// import weekday from '@dayjs/plugin/weekday';
const GET_CONTRIBUTIONS = gql`
  query UserInfo($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login 
      name
      avatarUrl
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

interface ContributionsCollection {
  contributionCalendar: {
    totalContributions: number;
  };
}

interface User {
  login:string;
  name: string;
  avatarUrl: string;
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

function App() {
    const [usersData, setUsersData] = useState<User[]>([]);
    const [fetchContributions] = useLazyQuery<QueryData, QueryVariables>(GET_CONTRIBUTIONS);
    const userLogins = ['yoshiddddd','kaitobq', 'yusei53','momo-41','JinA293','na2kera','E-moL0587'];
    let now = dayjs().toISOString();
    let from_day =dayjs().startOf('week').add(1,'day').toISOString();
    let to_day = dayjs().endOf('week').add(1,'day').toISOString();
    console.log(moment(from_day).format('YYYY/MM/DD(ddd)'));
    useEffect(() => {
        (async () => {
            const results = [];
            for (const login of userLogins) {
                const result = await fetchContributions({
                    variables: {
                        login: login,
                        from: from_day,
                        to: to_day
                    }
                });
                if (result.data && result.data.user) {
                    results.push(result.data.user);
                }
                // console.log(results);
            }
            setUsersData(results);
        })();
    }, [fetchContributions]);
    if (usersData.length === 0) return <p>now Loading...</p>;

    return (
        <>
        <header>
            peach tech 週間コミット量ランキング
        </header>
            <p className='whenWeek'>{moment(from_day).format('YYYY/MM/DD(ddd)')}~{moment(to_day).format('YYYY/MM/DD(ddd)')}</p>
            {[...usersData]
  .sort((a, b) => b.contributionsCollection.contributionCalendar.totalContributions - a.contributionsCollection.contributionCalendar.totalContributions)
  .map((user,index) => (
    <div key={user.name}>
        {/* <p>{console.log(userLogins)}</p> */}
        <div className={`rankValue ${index === 0 ? "is_top" : index === 1 ? "is_second" : ""}`}>
            <p>{index+1}位</p>
            <img src={user.avatarUrl} alt={`${user.name} Avatar`} className='gitimg' />
            <p className='userName'>{user.login}</p>
            <p> {user.contributionsCollection.contributionCalendar.totalContributions}回</p>
        </div>
    </div>

))}
        </>
    );
}

export default App;
