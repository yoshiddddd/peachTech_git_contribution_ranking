import { DetailUser } from "../../utils/interface";
import "../../css/Repository.css";
export const Repository = ({ userData }: { userData: DetailUser[] }) => {
  if (userData.length === 0) {
    return <p>No repositories found.</p>;
  }

  // ビジネスロジックをここで切り離して記述
  const sortedRepos = [...userData[0].repositories.edges].sort(
    (a, b) =>
      (b.node.defaultBranchRef?.target?.history?.totalCount || 0) -
      (a.node.defaultBranchRef?.target?.history?.totalCount || 0)
  );

  // ロジックを分離して変数に格納
  const personalRepos = sortedRepos.map((repo) => ({
    name: repo.node.name,
    url: repo.node.url,
    totalCount: repo.node.defaultBranchRef?.target?.history?.totalCount || 0,
    languages: repo.node.languages?.edges.map((language) => language.node.name) || [],
  }));

  // レンダリング部分はreturn内で行う
  return (
    <div className="repository-container">
      {personalRepos.map((repo, index) => (
        <div key={index} className="repository">
          <p className="repository-name">{repo.name}</p>
          <a href={repo.url} className="repository-url">{repo.url}</a>
          <p className="repository-commits">Commits: {repo.totalCount}</p>
          <div className="languages">
            {repo.languages.length > 0 ? (
              repo.languages.map((language, index) => (
                <p key={index}>{language}</p>
              ))
            ) : (
              <p className="no-languages">No language data available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  
};
