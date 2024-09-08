
import moment from "moment";
import "moment/locale/ja";
import { from_day, end_day } from "../utils/SetFromEndDay";
import { RankingTable } from "./RankingTable";
import { User, UserLogin } from "../utils/interface";
export const Weekly = ({usersData,userLogins}:{usersData:User[], userLogins:UserLogin[]}) => {

    return(
        <div>
        <div className="whenWeek">
          今週 {moment(from_day).format("MM/DD(ddd)")}~
          {moment(end_day).format("MM/DD(ddd)")} の状況
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
              <RankingTable
                user={user}
                index={index}
                condition={true}
                userlogins={userLogins}
              />
            ))}
        </div>
      </div>
    )

}