interface ContributionsCollection {
  contributionCalendar: {
    totalContributions: number;
  };
}

export interface User {
  login: string;
  name: string;
  avatarUrl: string;
  totalContributionsCollection: ContributionsCollection;
  contributionsCollection: ContributionsCollection;
}

export interface QueryData {
  user: User;
}

export interface QueryVariables {
  login: string;
  from: string;
  to: string;
}

export interface RankingTableProps {
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

export interface UserData {
  githubID?: string;
  name?: string;
  password?: string;
}

export interface UserLogin {
    githubID: string;
    username: string;
    first_n: number;
    second_n: number;
    third_n: number; 
}

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  weeks: Week[];
}

interface DetailContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

export interface DetailUser {
  login: string;
  name: string;
  avatarUrl: string;
  contributionsCollection: DetailContributionsCollection;
    repositories: {
        edges: {
        node: {
            name: string;
            url: string;
            defaultBranchRef: {
            target: {
                history: {
                totalCount: number;
                };
            };
            };
        };
        }[];
    };
}

export interface DetailQueryData {
  user: DetailUser;
}

export interface WeeklyContributionsVariables {
  login: string;
  to: string;
}
interface MatchUser {
  githubID: string;
  username: string;
  first_n: number;
  second_n: number;
  third_n: number; 
}

export interface LocationState {
  matchuser?: MatchUser;
}
