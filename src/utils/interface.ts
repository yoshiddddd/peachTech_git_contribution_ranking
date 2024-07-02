export interface ContributionsCollection {
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