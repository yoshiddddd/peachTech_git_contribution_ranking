import "../../css/RankingTable.css";
import "../../css/HomeTopRanker.css";
import "../../css/HomeSecondRanker.css";
import "../../css/HomeThirdRanker.css";
import { Link , LinkProps} from "react-router-dom";
import {RankingTableProps}  from "../../utils/interface";

function getSuffix(index: number): string {
  if (index === 0) {
    return "st";
  } else if (index === 1) {
    return "nd";
  } else if (index === 2) {
    return "rd";
  } else {
    return "th";
  }
}
export const RankingTable: React.FC<RankingTableProps> = ({
  user,
  index,
  condition,
  userlogins,
}) => {
  const suffix = getSuffix(index);
  
  const matchuser = userlogins.find((ul) => ul.githubID === user.user_id);
  
  return (
    <div key={user.name} className="parent">
      <div
        className={`rankValue ${
          index === 0 ? "is_top" : index === 1 ? "is_second" : index === 2? "is_third": "is_other"
        }`}
      >
        <p className="ranking-font">
          {index + 1}
          {suffix}
        </p>
        <Link
      to={`/detail/${user.user_id}`}
      state={{ matchuser }}
    >
            <img
            src={user.avatar_url}
            alt={`${user.name} Avatar`}
            className="gitimg"
            />
        </Link>
        <a
          href={"https://github.com/" + user.user_id}
          className="username"
          target="_blank"
        >
          {matchuser?.username}
        </a>
        <p className="contributionNum">
          {condition
            ? user.contributions
            : user.year_contributions}
        </p>
      </div>
    </div>
  );
};
