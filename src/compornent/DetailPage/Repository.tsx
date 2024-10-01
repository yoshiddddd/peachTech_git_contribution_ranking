import { DetailUser } from "../../utils/interface";
import "../../css/Repository.css";
export const Repository = ({ userData }: { userData: DetailUser[] }) => {
  if (userData.length === 0) {
    return <p>No repositories found.</p>;
  }

  const sortedRepos = [...userData[0].repositories.edges].sort(
    (a, b) =>
      (b.node.defaultBranchRef?.target?.history?.totalCount || 0) -
      (a.node.defaultBranchRef?.target?.history?.totalCount || 0)
  );


  const personalRepos = sortedRepos.slice(0,3).map((repo) => ({
    name: repo.node.name,
    url: repo.node.url,
    totalCount: repo.node.defaultBranchRef?.target?.history?.totalCount || 0,
    languages: repo.node.languages?.edges.map((language) => language.node.name) || [],
  }));

  
  return (
    <div className="repository-container">
        <p className="title">コミットリポジトリランキング(んー)</p>
      {personalRepos.map((repo, index) => (
        <a
          key={index}
          className={`repository ${index === 0 ? 'first' : ''} ${index === 1 ? 'second' : ''} ${index === 2 ? 'third' : ''}`}
          href={repo.url}
          target="_blank"
        >
          <div className="rank-badge">{index + 1}</div>
          <div className="name-languages">
            <div className="repository-name">{repo.name}</div>
            <div className="languages">
            {repo.languages.length > 0 ? (
                repo.languages.map((language, index) => (
                    <p key={index}>{language}</p>
                ))
            ) : (
                <p className="no-languages">使用言語がありません</p>
            )}
          </div>
          </div>
            <p className="repository-commits">{repo.totalCount}</p>
        </a>
      ))}
    </div>
  );
  
  
  
};
