import type { HonoEnv } from 'api/env';
import { cache } from 'api/lib/cache';
import { type Contributions, getContributions } from 'api/lib/contributions';
import type { Handler } from 'hono';
import type { TypedResponse } from 'hono/types';
import { Octokit } from 'octokit';
import * as v from 'valibot';

export const ContributionsPublicQuerySchema = v.object({
  username: v.optional(v.string(), 'tnfssc'),
});

export const ContributionsPublic: Handler<
  HonoEnv,
  string,
  { in: { query?: { username?: string } }; out: { query: { username: string } } },
  Promise<TypedResponse<Contributions['user']['repositoriesContributedTo']['nodes']>>
> = async (c) => {
  const octokit = new Octokit({ auth: c.env.GITHUB_PAT });

  const { username } = v.parse(ContributionsPublicQuerySchema, {
    username: c.req.query('username') ?? 'tnfssc',
  });

  const contributions = await cache(`contributions-public-${username}`)(() => getContributions(octokit, username));
  return c.json(contributions);
};
