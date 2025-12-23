export interface EmailAttachment {
  id: string;
  email_id: string;
  filename: string;
  size: number;
  type: string;
  url: string;
  created_at: string;
}

export interface Email {
  id: string;
  userId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  isImportant: boolean;
  hasAttachments: boolean;
  attachments: EmailAttachment[];
  labels: string[];
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailsResponse {
  success: boolean;
  data: Email[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface EmailFilters {
  page?: number;
  limit?: number;
  search?: string;
  labels?: string[];
  isRead?: boolean;
  isStarred?: boolean;
  isImportant?: boolean;
  hasAttachments?: boolean;
}