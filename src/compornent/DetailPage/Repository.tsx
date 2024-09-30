
import { DetailUser } from "../../utils/interface"

export const Repository = ({userData}:{userData:DetailUser[]})=>{
    // console.log(userData[0].repositories);
    console.log(userData[0].repositories.edges[0]);
    console.log(userData[0].repositories.edges[0].node.languages?.edges[0].node.name);
    // if (userData.length > 0) {
        // リポジトリをコミット数でソートし、各リポジトリを表示
        const personalRepos = [... userData[0].repositories.edges]
          .sort(
            (a, b) =>
              (b.node.defaultBranchRef?.target?.history?.totalCount || 0) -
              (a.node.defaultBranchRef?.target?.history?.totalCount || 0)
          )
          .map((repo) => {
            return (
              <div key={repo.node.name}>
                <p>{repo.node.name}</p>
                <a href={repo.node.url}>{repo.node.url}</a>
                <p>
                  {
                    repo.node.defaultBranchRef?.target?.history
                      ?.totalCount || 0
                  }
                </p>
                <div>
                {repo.node.languages?.edges && repo.node.languages.edges.length > 0 ? (
                    <div>
                        {repo.node.languages.edges.map((language, index) => (
                        <p key={index}>{language.node.name}</p>
                        ))}
                    </div>
                    ) : (
                    <p>No language data available</p>
)}
            </div>
              </div>
            );
          });
    
        // return <div>{personalRepos}</div>;
    //   } else {
    //     return <p>No repositories found.</p>;
    //   }
 
    return(
        <>{personalRepos}</>
    );
}