
import moment from "moment";
import "moment/locale/ja";
import { from_day, end_day } from "../../utils/SetFromEndDay";
import { RankingTable } from "./RankingTable";
import {  UserLogin, UserNew } from "../../utils/interface";
export const Weekly = ({usersData,userLogins}:{usersData:UserNew[], userLogins:UserLogin[]}) => {

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
                b.contributions
                   -
                a.contributions
                  
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