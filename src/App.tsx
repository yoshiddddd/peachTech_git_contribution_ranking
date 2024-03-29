import './App.css';
import './HomeTopRanker.css'
import './HomeSecondRanker.css'
import './Loading.css'
import React, { useState, useEffect} from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import dayjs from 'dayjs';
import moment from 'moment';
import "moment/locale/ja"; // 日本語ロケールをインポート
import {Loading} from './loading';
import { HomeScreen } from './HomeScreen';
import { Tabs, Tab, Box } from '@mui/material';
// import weekday from '@dayjs/plugin/weekday';
const GET_CONTRIBUTIONS = gql`
  query UserInfo($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login 
      name
      avatarUrl
      totalContributionsCollection: contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
        contributionCalendar {
          totalContributions
        }
    }
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

function App() {
    const [usersData, setUsersData] = useState<User[]>([]);
    const [value, setValue] = React.useState(0);
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
    if (usersData.length === 0)  return (
       <Loading />
      );
      const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
      interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
      }
      
      function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                {children}
              </Box>
            )}
          </div>
        );
      }

    return (
    <body>
        <header>
            peach tech contribution ランキング
        </header>
        <Tabs value={value} onChange={handleChange}>
            <Tab label="週間ランキング"/>
            <Tab label="年間ランキング"/>
        </Tabs>
        <TabPanel value={value} index={0}>
        <p className='whenWeek'>今週 {moment(from_day).format('MM/DD(ddd)')}~{moment(to_day).format('MM/DD(ddd)')} の状況</p>
        <div className='bord'>
            {[...usersData]
                .sort((a, b) => b.contributionsCollection.contributionCalendar.totalContributions - a.contributionsCollection.contributionCalendar.totalContributions)
                .map((user,index) => (
                    <HomeScreen user={user} index={index} condition={true} />
            ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <p className='whenWeek'>2024年の状況</p>
        <div className='bord'>
            {[...usersData]
                .sort((a, b) => b.totalContributionsCollection.contributionCalendar.totalContributions - a.totalContributionsCollection.contributionCalendar.totalContributions)
                .map((user,index) => (
                    <HomeScreen user={user} index={index} condition={false} />
            ))}
        </div>
      </TabPanel>

    </body>
    );
}

export default App;
