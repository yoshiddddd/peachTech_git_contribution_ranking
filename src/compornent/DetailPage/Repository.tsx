
import { DetailUser } from "../../utils/interface"

export const Repository = ({userData}:{userData:DetailUser[]})=>{
    // console.log(userData[0].repositories);
    console.log(userData[0].repositories.edges[0]);
    const personalRepos = userData[0].repositories.edges.map((repo)=>{
        if (userData.length > 0) {
            
              console.log(repo.node.name);  // 各リポジトリ名を出力
              return (
                <div key={repo.node.name}>
                  <p>{repo.node.name}</p>
                  <a href={repo.node.url}>{repo.node.url}</a>
                </div>
              );
            ;
        
            return <div>{personalRepos}</div>;
          } else {
            return <p>No repositories found.</p>;
          }
    });
 
    return(
        <>{personalRepos}</>
    );
}