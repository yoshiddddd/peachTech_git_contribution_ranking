interface ContributionsCollection {
    contributionCalendar: {
      totalContributions: number;
    };
  }
  
export  interface User {
    login: string;
    name: string;
    avatarUrl: string;
    totalContributionsCollection: ContributionsCollection;
    contributionsCollection: ContributionsCollection;
  }
  
export  interface QueryData {
    user: User;
  }
  
export  interface QueryVariables {
    login: string;
    from: string;
    to: string;
  }

export  interface RankingTableProps {
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

export  interface UserData {
    githubID?: string;
    name?: string;
    password?: string;
  }

  export interface UserLogin {
    githubID: string;
    username: string;
  };
