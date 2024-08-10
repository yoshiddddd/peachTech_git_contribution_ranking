import "../css/RankingTable.css";
import "../css/HomeTopRanker.css";
import "../css/HomeSecondRanker.css";
import "../css/HomeThirdRanker.css";
import { Link , LinkProps} from "react-router-dom";
import {RankingTableProps}  from "../utils/interface";

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
  
  const matchuser = userlogins.find((ul) => ul.githubID === user.login);
  const to = {
    pathname: `/detail/${user.login}`,
    state: { matchuser },
  };
  return (
    // <button>
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
      to={`/detail/${user.login}`}
      state={{ matchuser }}
    >
            <img
            src={user.avatarUrl}
            alt={`${user.name} Avatar`}
            className="gitimg"
            />
        </Link>
        <a
          href={"https://github.com/" + user.login}
          className="username"
          target="_blank"
        >
          {matchuser?.username}
        </a>
        <p className="contributionNum">
          {condition
            ? user.contributionsCollection.contributionCalendar
                .totalContributions
            : user.totalContributionsCollection.contributionCalendar
                .totalContributions}
        </p>
      </div>
    </div>
    // </button>
  );
};
