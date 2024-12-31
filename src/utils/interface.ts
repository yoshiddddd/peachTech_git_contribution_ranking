// interface ContributionsCollection {
//   contributionCalendar: {
//     totalContributions: number;
//   };
// }

// export interface User {
//   login: string;
//   name: string;
//   avatarUrl: string;
//   totalContributionsCollection: ContributionsCollection;
//   contributionsCollection: ContributionsCollection;
// }
// export interface QueryData {
//   user: User;
// }

export interface UserNew {
    name: string;
    user_id: string;
    contributions: number;
    avatar_url: string;
    year_contributions: number;
}


export interface QueryVariables {
  login: string;
  from: string;
  to: string;
}

export interface RankingTableProps {
  user: {
    name: string;
    user_id: string;
    contributions: number;
    avatar_url: string;
    year_contributions: number;
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

interface CommitContributionsByRepository {
  contributions: {
    totalCount: number;
  };
  repository: {
    name: string;
    nameWithOwner: string;
    url: string;
    languages: {
      edges: {
        node: {
          name: string;
        };
        size: number;
      }[];
    };
  };
}

interface DetailContributionsCollection {
  commitContributionsByRepository: CommitContributionsByRepository[];
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
        defaultBranchRef?: {
          // このフィールドはnullの場合があるのでオプショナルに
          target?: {
            history?: {
              totalCount: number;
            };
          };
        };
        languages?: {
          // 言語情報もリポジトリによっては存在しないことがあるのでオプショナルに
          edges: {
            node: {
              name: string;
            };
            size: number;
          }[];
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
  from: string;
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
