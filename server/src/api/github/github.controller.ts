import { Request, Response, NextFunction } from "express";
import { getUserRepos, getPullRequest } from "../../services/github.service";

export async function listRepos(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = (req as any).user?.githubAccessToken ?? "";
    const repos = await getUserRepos(accessToken);
    res.json({ success: true, data: repos });
  } catch (err) {
    next(err);
  }
}

export async function getPR(req: Request, res: Response, next: NextFunction) {
  try {
    const { owner, repo, pullNumber } = req.params as {
    owner: string;
    repo: string;
    pullNumber: string;
  };
    const accessToken = (req as any).user?.githubAccessToken ?? "";
    const pr = await getPullRequest(accessToken, owner, repo, Number(pullNumber));
    res.json({ success: true, data: pr });
  } catch (err) {
    next(err);
  }
}
