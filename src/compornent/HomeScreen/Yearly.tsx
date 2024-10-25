import { UserLogin, UserNew } from "../../utils/interface";
import { RankingTable } from "./RankingTable";

export const Yearly = ({usersData,userLogins}:{usersData:UserNew[], userLogins:UserLogin[]}) => {

    return (

        <div>
          <div className="whenWeek">2024年の状況</div>
          <div className="bord">
            {[...usersData]
              .sort(
                (a, b) =>
                  b.year_contributions -
                  a.year_contributions
                    
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