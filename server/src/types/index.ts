import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    githubId: number;
    login: string;
    avatarUrl: string;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export type JobName = "ai-review" | "github-sync" | "notification";
