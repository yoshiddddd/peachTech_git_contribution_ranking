import './App.css';
import './HomeTopRanker.css';
import './HomeSecondRanker.css';
import './Loading.css';
import { Tabs, Tab, Box } from '@mui/material';
import React, { useState, useEffect} from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import dayjs from 'dayjs';
import moment from 'moment';
import "moment/locale/ja"; // 日本語ロケールをインポート
import {Loading} from './loading';
import { RankingTable } from './RankingTable';
import { getDocs ,collection} from 'firebase/firestore';
import isoWeek from 'dayjs/plugin/isoWeek';
import {GET_CONTRIBUTIONS} from './GetQuery'
import { database } from './firebaseConfig';

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

let from_day: string;
let to_day: string;
const today: dayjs.Dayjs = dayjs();
const isSunday: boolean = today.day() === 0;
if(isSunday)
{
    from_day =dayjs().subtract(1, 'week').startOf('isoWeek').add(1,'day').toISOString();
    to_day = dayjs().subtract(1, 'week').endOf('week').add(1,'day').toISOString();    
}else{
    from_day =dayjs().startOf('isoWeek').add(1,'day').toISOString();
    to_day = dayjs().endOf('week').add(1,'day').toISOString();
}

export const HomeScreen=()=>{
    const [usersData, setUsersData] = useState<User[]>([]);
    const collectionRef = collection(database, 'users');
    const [value, setValue] = React.useState(0);
    const [fetchContributions] = useLazyQuery<QueryData, QueryVariables>(GET_CONTRIBUTIONS);
    const [userLogins, setUserLogins] = useState<string[]>([]);
    let now = dayjs().toISOString();

    useEffect(() => {
        getDocs(collectionRef).then((response) => {
            const githubIds = response.docs.map((user) => {
            const data = user.data();
            return data.githubID; // 直接githubIDを返す
        });
          setUserLogins(githubIds); // userLogins状態を更新
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
                        to: to_day
                    }
                });
                if (result.data && result.data.user) {
                    results.push(result.data.user);
                }
            }
            setUsersData(results);
        })();
    }, [userLogins]);

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
    return(
        <div>
        <div className='changetab'>
        <Tabs value={value} onChange={handleChange}>
            <Tab label="週間ランキング"/>
            <Tab label="年間ランキング"/>
        </Tabs>
        </div>
        <TabPanel value={value} index={0}>
        <div className='whenWeek'>今週 {moment(from_day).format('MM/DD(ddd)')}~{moment(to_day).format('MM/DD(ddd)')} の状況</div>
        <div className='bord'>
            {[...usersData]
                .sort((a, b) => b.contributionsCollection.contributionCalendar.totalContributions - a.contributionsCollection.contributionCalendar.totalContributions)
                .map((user,index) => (
                    <RankingTable user={user} index={index} condition={true} />
                    ))}
        </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <div className='whenWeek'>2024年の状況</div>
            <div className='bord'>
                {[...usersData]
                    .sort((a, b) => b.totalContributionsCollection.contributionCalendar.totalContributions - a.totalContributionsCollection.contributionCalendar.totalContributions)
                    .map((user,index) => (
                        <RankingTable user={user} index={index} condition={false} />
                ))}
            </div>
      </TabPanel>
      </div>
    )
}

