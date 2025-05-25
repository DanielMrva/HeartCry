export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_call_logs: {
        Row: {
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          model: string | null
          prompt: string
          response: string
          tokens_used: number | null
        }
        Insert: {
          created_at?: string
          entity_id?: string
          entity_type: string
          id?: string
          model?: string | null
          prompt: string
          response: string
          tokens_used?: number | null
        }
        Update: {
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          model?: string | null
          prompt?: string
          response?: string
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_call_logs_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "summaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_call_logs_entity_id_fkey1"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "transcripts"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          changed_at: string
          changed_by: string | null
          diff: Json | null
          id: string
          operation: string
          record_id: string
          table_name: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          diff?: Json | null
          id?: string
          operation: string
          record_id?: string
          table_name: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          diff?: Json | null
          id?: string
          operation?: string
          record_id?: string
          table_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      churches: {
        Row: {
          created_at: string
          id: string
          name: string
          settings: Json
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
          settings?: Json
          slug?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          settings?: Json
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_jobs: {
        Row: {
          church_id: string
          created_at: string
          failure_details: string | null
          id: string
          job_type: string
          last_sent_at: string | null
          scheduled_for: string
          status: string
          target_summary_id: string
        }
        Insert: {
          church_id?: string
          created_at?: string
          failure_details?: string | null
          id?: string
          job_type?: string
          last_sent_at?: string | null
          scheduled_for: string
          status?: string
          target_summary_id?: string
        }
        Update: {
          church_id?: string
          created_at?: string
          failure_details?: string | null
          id?: string
          job_type?: string
          last_sent_at?: string | null
          scheduled_for?: string
          status?: string
          target_summary_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_jobs_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_jobs_target_summary_id_fkey"
            columns: ["target_summary_id"]
            isOneToOne: false
            referencedRelation: "summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      embeddings: {
        Row: {
          created_at: string
          id: string
          prayer_request_id: string
          vector: string
        }
        Insert: {
          created_at?: string
          id?: string
          prayer_request_id?: string
          vector: string
        }
        Update: {
          created_at?: string
          id?: string
          prayer_request_id?: string
          vector?: string
        }
        Relationships: [
          {
            foreignKeyName: "embeddings_prayer_request_id_fkey"
            columns: ["prayer_request_id"]
            isOneToOne: false
            referencedRelation: "prayer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      media_attachments: {
        Row: {
          id: string
          media_type: string
          metadata: Json | null
          prayer_request_id: string
          uploaded_at: string
          url: string
        }
        Insert: {
          id?: string
          media_type: string
          metadata?: Json | null
          prayer_request_id?: string
          uploaded_at?: string
          url: string
        }
        Update: {
          id?: string
          media_type?: string
          metadata?: Json | null
          prayer_request_id?: string
          uploaded_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_attachments_prayer_request_id_fkey"
            columns: ["prayer_request_id"]
            isOneToOne: false
            referencedRelation: "prayer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_request_assignments: {
        Row: {
          prayer_request_id: string
          user_id: string
        }
        Insert: {
          prayer_request_id: string
          user_id: string
        }
        Update: {
          prayer_request_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prayer_request_assignments_prayer_request_id_fkey"
            columns: ["prayer_request_id"]
            isOneToOne: false
            referencedRelation: "prayer_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prayer_request_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_request_tags: {
        Row: {
          prayer_request_id: string
          tag_id: string
        }
        Insert: {
          prayer_request_id?: string
          tag_id?: string
        }
        Update: {
          prayer_request_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prayer_request_tags_prayer_request_id_fkey"
            columns: ["prayer_request_id"]
            isOneToOne: false
            referencedRelation: "prayer_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prayer_request_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_requests: {
        Row: {
          anonymous: boolean
          church_id: string
          content_text: string | null
          created_at: string
          id: string
          request_type: string
          status: string
          user_id: string | null
        }
        Insert: {
          anonymous?: boolean
          church_id?: string
          content_text?: string | null
          created_at?: string
          id?: string
          request_type: string
          status?: string
          user_id?: string | null
        }
        Update: {
          anonymous?: boolean
          church_id?: string
          content_text?: string | null
          created_at?: string
          id?: string
          request_type?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prayer_requests_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prayer_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      summaries: {
        Row: {
          ai_metadata: Json | null
          church_id: string
          content_text: string
          created_at: string
          id: string
          request_count: number
          summary_period: string
        }
        Insert: {
          ai_metadata?: Json | null
          church_id?: string
          content_text: string
          created_at: string
          id?: string
          request_count?: number
          summary_period: string
        }
        Update: {
          ai_metadata?: Json | null
          church_id?: string
          content_text?: string
          created_at?: string
          id?: string
          request_count?: number
          summary_period?: string
        }
        Relationships: [
          {
            foreignKeyName: "summaries_chruch_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      summary_themes: {
        Row: {
          created_at: string
          id: string
          score: number | null
          summary_id: string
          theme: string
        }
        Insert: {
          created_at?: string
          id?: string
          score?: number | null
          summary_id?: string
          theme: string
        }
        Update: {
          created_at?: string
          id?: string
          score?: number | null
          summary_id?: string
          theme?: string
        }
        Relationships: [
          {
            foreignKeyName: "summary_themes_summary_id_fkey"
            columns: ["summary_id"]
            isOneToOne: false
            referencedRelation: "summaries"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          church_id: string
          id: string
          name: string
        }
        Insert: {
          church_id?: string
          id?: string
          name: string
        }
        Update: {
          church_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      transcripts: {
        Row: {
          created_at: string
          id: string
          media_id: string
          model_metadata: Json
          text: string
        }
        Insert: {
          created_at?: string
          id?: string
          media_id?: string
          model_metadata?: Json
          text: string
        }
        Update: {
          created_at?: string
          id?: string
          media_id?: string
          model_metadata?: Json
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "transcripts_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media_attachments"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          church_id: string
          created_at: string
          email: string
          id: string
          is_staff: boolean
          name: string | null
          password_hash: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          church_id?: string
          created_at?: string
          email?: string
          id?: string
          is_staff?: boolean
          name?: string | null
          password_hash: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          church_id?: string
          created_at?: string
          email?: string
          id?: string
          is_staff?: boolean
          name?: string | null
          password_hash?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "parishioner" | "prayer_minister" | "church_admin" | "app_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["parishioner", "prayer_minister", "church_admin", "app_admin"],
    },
  },
} as const
