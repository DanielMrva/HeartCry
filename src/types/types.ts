import { Json } from "./database.types";

//–– Enums & Primitives ––//
export type Role =
  | 'parishioner'
  | 'prayer_minister'
  | 'church_admin'
  | 'app_admin';

export type RequestType = 'text' | 'audio' | 'video';
export type MediaType = 'audio' | 'video';
export type SummaryPeriod = 'daily' | 'weekly' | 'monthly';
export type JobType = 'daily' | 'weekly' | 'monthly' | 'ad_hoc';
export type OperationType = 'INSERT' | 'UPDATE' | 'DELETE';

//–– Core Tables ––//
export interface Church {
  id: string;
  name: string;
  slug: string;
  settings: Json;
  created_at: string;
  updated_at: string;
}
export interface ChurchInput {
  name: string;
  slug: string;
  settings?: Json;
}
export interface ChurchEditInput {
  id: string;
  name?: string;
  slug?: string;
  settings?: Json;
}

export interface User {
  id: string;
  church_id: string;
  email: string;
  name?: string | null;
  role: Role;
  created_at: string;
  updated_at: string;
}
// signup form
export interface UserSignupInput {
  email: string;
  password: string;
  name?: string;
  church_id: string;
}
export interface UserEditInput {
  id: string;
  email?: string;
  name?: string;
  role?: Role;
}

export interface PrayerRequest {
  id: string;
  church_id: string;
  user_id: string | null;
  anonymous: boolean;
  content_text: string | null;
  request_type: string;
  status: string;
  created_at: string;
}
export interface AddPrayerRequestInput {
  church_id: string;
  user_id?: string;
  anonymous?: boolean;
  content_text: string;
  request_type: RequestType;
}
export interface EditPrayerRequestInput {
  id: string;
  anonymous?: boolean;
  content_text?: string;
  request_type?: RequestType;
  status?: string;
}

//–– Media & Transcripts ––//
export interface MediaAttachment {
  id: string;
  prayer_request_id: string;
  url: string;
  media_type: MediaType;
  metadata: Json;
  uploaded_at: string;
}
export interface AddMediaAttachmentInput {
  prayer_request_id: string;
  url: string;
  media_type: MediaType;
  metadata?: Json;
}

export interface Transcript {
  id: string;
  media_id: string;
  text: string;
  model_metadata: Json;
  created_at: string;
}

//–– Summaries & Themes ––//
export interface Summary {
  id: string;
  church_id: string;
  summary_period: SummaryPeriod;
  generated_at: string;
  content_text: string;
  request_count: number;
  ai_metadata: Json;
}
export interface SummaryTheme {
  id: string;
  summary_id: string;
  theme: string;
  score: number;
}

//–– Tagging & Assignments ––//
export interface Tag {
  id: string;
  church_id: string;
  name: string;
}
export interface AddTagInput {
  church_id: string;
  name: string;
}
export interface EditTagInput {
  id: string;
  name?: string;
}

export interface PrayerRequestTag {
  prayer_request_id: string;
  tag_id: string;
}
export interface AddPrayerRequestTagInput {
  prayer_request_id: string;
  tag_id: string;
}

export interface PrayerRequestAssignment {
  prayer_request_id: string;
  user_id: string;
}
export interface AddPrayerRequestAssignmentInput {
  prayer_request_id: string;
  user_id: string;
}

//–– Email Scheduling ––//
export interface EmailJob {
  id: string;
  church_id: string;
  job_type: JobType;
  targetsummary_id?: string | null;
  scheduled_for: string;
  last_sent_at?: string | null;
  status: string;
  failure_details?: string | null;
}
export interface AddEmailJobInput {
  church_id: string;
  job_type: JobType;
  target_summary_id?: string;
  scheduled_for: string;
}
export interface EditEmailJobInput {
  id: string;
  job_type?: JobType;
  scheduled_for?: string;
  status?: string;
  failure_details?: string;
}

export type ChurchName = Pick<Church, 'id' | 'name'>;
