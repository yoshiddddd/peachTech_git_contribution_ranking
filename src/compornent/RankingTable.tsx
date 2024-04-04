import "../css/RankingTable.css";
import "../css/HomeTopRanker.css";
import "../css/HomeSecondRanker.css";

interface RankingTableProps {
  user: {
    name: string;
    avatarUrl: string;
    login: string;
    totalContributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
      };
    };
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
      };
    };
  };
  index: number;
  condition: boolean;
  userlogins: {
    githubID: string;
    username: string;
  }[];
}
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
  return (
    <div key={user.name} className="parent">
      <div
        className={`rankValue ${
          index === 0 ? "is_top" : index === 1 ? "is_second" : "is_other"
        }`}
      >
        <p className="ranking-font">
          {index + 1}
          {suffix}
        </p>
        <img
          src={user.avatarUrl}
          alt={`${user.name} Avatar`}
          className="gitimg"
        />
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
  );
};
