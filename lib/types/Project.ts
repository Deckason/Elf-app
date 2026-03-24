/* ─────────────────────────────────────────────────────────────
   Types derived directly from your Prisma schema.
   Project → createdBy (User), updates (ProjectUpdate[])
───────────────────────────────────────────────────────────── */

export type ProjectStatus = "ACTIVE" | "COMPLETED" | "PAUSED";

export interface ProjectCreator {
  id:        string;
  firstName: string;
  lastName:  string;
  email:     string;
  profile?:  { avatarUrl: string | null } | null;
}

export interface ProjectUpdate {
  id:        string;
  projectId: string;
  title:     string;
  content:   string;
  image:     string | null;
  createdAt: string;
}

export interface Project {
  id:            string;
  title:         string;
  slug:          string;
  description:   string;        // markdown
  coverImage:    string | null;
  goalAmount:    number;        // Decimal serialised as number
  currentAmount: number;        // Decimal serialised as number
  status:        ProjectStatus;
  isFeatured:    boolean;
  createdById:   string;
  createdBy:     ProjectCreator;
  updates:       ProjectUpdate[];
  createdAt:     string;
  updatedAt:     string;
}

/** Lightweight shape used in listing / grid cards */
export type ProjectCard = Pick<
  Project,
  | "id"
  | "title"
  | "slug"
  | "description"
  | "coverImage"
  | "goalAmount"
  | "currentAmount"
  | "status"
  | "isFeatured"
  | "createdBy"
  | "createdAt"
>;