import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEEKLY_CONTRIBUTIONS } from "../utils/GetQuery";
import { useParams } from "react-router-dom";
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
    contributionsCollection: ContributionsCollection;
  }
  
  export interface QueryData {
    user: User;
  }
  
  export interface WeeklyContributionsVariables {
    login: string;
  }
  

export const DetailPage = () => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const { loginID } = useParams<{ loginID: string }>() as { loginID: string };
    const [fetchContributions] = useLazyQuery<QueryData, WeeklyContributionsVariables>(
        GET_WEEKLY_CONTRIBUTIONS);
        // if (!loginID) {
        //     return <div>No Login ID provided</div>;
        //   }
    useEffect(() => {
        (async () => {
          const results = [];
            const result = await fetchContributions({
              variables: {
                login: loginID

              },
            });
            if (result.data && result.data.user) {
              results.push(result.data.user);
            }
            setUsersData(results);
            console.log(usersData);
        })();
    }, []);
    
    const transformData = (users: User[]) => {
        const result = users.flatMap(user => {
            if (!user.contributionsCollection || !user.contributionsCollection.contributionCalendar) {
                return [];
            }
            
            const { weeks } = user.contributionsCollection.contributionCalendar;
            
            return weeks.flatMap(week =>
                week.contributionDays.map(day => ({
                    date: day.date,
                    contributionCount: day.contributionCount
                }))
            );
        })
        console.log(result);
    };
    
    transformData(usersData);
    // console.log(loginID);
    return (
        <div>hello</div>
    );

}