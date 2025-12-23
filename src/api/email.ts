import { ApiClient } from './client';
import { type EmailsResponse, type EmailFilters } from '../models';

export const emailApi = {
  getEmails: async (filters: EmailFilters = {}): Promise<EmailsResponse> => {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.labels?.length) params.append('labels', filters.labels.join(','));
    if (filters.isRead !== undefined) params.append('isRead', filters.isRead.toString());
    if (filters.isStarred !== undefined) params.append('isStarred', filters.isStarred.toString());
    if (filters.isImportant !== undefined) params.append('isImportant', filters.isImportant.toString());
    if (filters.hasAttachments !== undefined) params.append('hasAttachments', filters.hasAttachments.toString());

    const queryString = params.toString();
    const endpoint = queryString ? `/emails?${queryString}` : '/emails';

    return ApiClient.get<EmailsResponse>(endpoint);
  },

  markAsRead: async (emailId: string): Promise<void> => {
    return ApiClient.patch(`/emails/${emailId}/read`);
  },

  markAsUnread: async (emailId: string): Promise<void> => {
    return ApiClient.patch(`/emails/${emailId}/unread`);
  },

  toggleStar: async (emailId: string): Promise<void> => {
    return ApiClient.patch(`/emails/${emailId}/star`);
  },

  toggleImportant: async (emailId: string): Promise<void> => {
    return ApiClient.patch(`/emails/${emailId}/important`);
  },

  deleteEmail: async (emailId: string): Promise<void> => {
    return ApiClient.delete(`/emails/${emailId}`);
  },

  getEmailCounts: async (): Promise<{
    inbox: number;
    starred: number;
    sent: number;
    important: number;
    drafts: number;
    trash: number;
  }> => {
    // We'll make parallel requests to get counts for different folders
    const [inboxRes, starredRes, sentRes, importantRes, draftsRes, trashRes] = await Promise.all([
      ApiClient.get<EmailsResponse>('/emails?folder=inbox&limit=0'),
      ApiClient.get<EmailsResponse>('/emails?isStarred=true&limit=0'),
      ApiClient.get<EmailsResponse>('/emails?folder=sent&limit=0'),
      ApiClient.get<EmailsResponse>('/emails?isImportant=true&limit=0'),
      ApiClient.get<EmailsResponse>('/emails?folder=drafts&limit=0'),
      ApiClient.get<EmailsResponse>('/emails?folder=trash&limit=0'),
    ]);

    return {
      inbox: inboxRes.pagination?.total || 0,
      starred: starredRes.pagination?.total || 0,
      sent: sentRes.pagination?.total || 0,
      important: importantRes.pagination?.total || 0,
      drafts: draftsRes.pagination?.total || 0,
      trash: trashRes.pagination?.total || 0,
    };
  },
};