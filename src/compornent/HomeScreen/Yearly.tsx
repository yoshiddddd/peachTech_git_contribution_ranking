import { UserLogin, UserNew } from "../../utils/interface";
import { RankingTable } from "./RankingTable";

export const Yearly = ({usersData,userLogins}:{usersData:UserNew[], userLogins:UserLogin[]}) => {
    const getCurrentYear = () => {
        const now = new Date();
        return now.getFullYear(); // 現在の年を取得
      };
      console.log(getCurrentYear());
      const year = getCurrentYear();
    return (

        <div>
          <div className="whenWeek">{year}年の状況</div>
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