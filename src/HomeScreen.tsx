
interface HomeScreenProps {
    user: {
      name: string;
      avatarUrl: string;
      login: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
        };
      };
    };
    index: number;
  }
  function getSuffix(index: number): string {
    if (index === 0) {
        return 'st';
    } else if (index === 1) {
        return 'nd';
    } else if(index === 2){
        return 'rd';
    } else{
        return 'th';
    }
}
  export const HomeScreen: React.FC<HomeScreenProps> = ({ user, index }) => {
    const suffix = getSuffix(index);
    return (
      <div key={user.name} className="parent">
        <div className={`rankValue ${index === 0 ? "is_top" : index === 1 ? "is_second" : "is_other"}`}>
          <p className='ranking-font'>{index + 1}{suffix}</p>
          <img src={user.avatarUrl} alt={`${user.name} Avatar`} className='gitimg' />

          {/* <p className='userName'>{user.login}</p> */}
          <a href={"https://github.com/"+user.login} className="userName" target="_blank">{user.login}</a>
          <p className='contributionNum'>{user.contributionsCollection.contributionCalendar.totalContributions}</p>
        </div>
      </div>
    );
  };