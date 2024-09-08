import { User, UserLogin } from "../utils/interface";
import { RankingTable } from "./RankingTable";

export const Yearly = ({usersData,userLogins}:{usersData:User[], userLogins:UserLogin[]}) => {

    return (

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
    )
}