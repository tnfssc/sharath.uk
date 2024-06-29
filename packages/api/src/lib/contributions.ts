import { Octokit } from 'octokit';

export interface Contributions {
  user: {
    repositoriesContributedTo: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
      nodes: {
        nameWithOwner: string;
        stargazerCount: number;
        url: string;
        openGraphImageUrl: string;
        shortDescriptionHTML: string;
      }[];
    };
  };
}

export const getContributions = async (octokit: Octokit, username = 'tnfssc', signal?: AbortSignal) => {
  const data: Contributions = await octokit.graphql(
    `
    query getContributions($login: String!, $contributionTypes: [RepositoryContributionType]) {
      user(login: $login) {
        repositoriesContributedTo(
          contributionTypes: $contributionTypes
          first: 100
          includeUserRepositories: false
          orderBy: {field: STARGAZERS, direction: DESC}
          privacy: PUBLIC
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            nameWithOwner
            stargazerCount
            url
            openGraphImageUrl
            shortDescriptionHTML
          }
        }
      }
    }
    `,
    { request: { signal }, login: username, contributionTypes: ['COMMIT', 'REPOSITORY'] },
  );

  return data.user.repositoriesContributedTo.nodes;
};
