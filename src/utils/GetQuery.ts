import {gql } from '@apollo/client';


export const GET_CONTRIBUTIONS = gql`
  query UserInfo($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login 
      avatarUrl
      totalContributionsCollection: contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
        contributionCalendar {
          totalContributions
        }
    }
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;


export const GET_WEEKLY_CONTRIBUTIONS = gql`
  query WeeklyContributions($login: String!, $to: DateTime!) {
    user(login: $login) {
      login
      name
      avatarUrl
      contributionsCollection(from: "2024-01-01T00:00:00Z", to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;