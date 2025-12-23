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
};