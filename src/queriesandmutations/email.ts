import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { emailApi } from '../api/email';
import { type EmailFilters } from '../models';

export const useEmails = (filters: EmailFilters = {}) => {
  return useQuery({
    queryKey: ['emails', filters],
    queryFn: () => emailApi.getEmails(filters),
    staleTime: 30 * 1000, // 30 seconds
    retry: 2,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.markAsRead,
    onSuccess: () => {
      // Invalidate emails query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      queryClient.invalidateQueries({ queryKey: ['emailCounts'] });
    },
    onError: (error) => {
      console.error('Failed to mark email as read:', error);
    },
  });
};

export const useMarkAsUnread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.markAsUnread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      queryClient.invalidateQueries({ queryKey: ['emailCounts'] });
    },
    onError: (error) => {
      console.error('Failed to mark email as unread:', error);
    },
  });
};

export const useToggleStar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.toggleStar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      queryClient.invalidateQueries({ queryKey: ['emailCounts'] });
    },
    onError: (error) => {
      console.error('Failed to toggle star:', error);
    },
  });
};

export const useToggleImportant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.toggleImportant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      queryClient.invalidateQueries({ queryKey: ['emailCounts'] });
    },
    onError: (error) => {
      console.error('Failed to toggle important:', error);
    },
  });
};

export const useDeleteEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.deleteEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      queryClient.invalidateQueries({ queryKey: ['emailCounts'] });
    },
    onError: (error) => {
      console.error('Failed to delete email:', error);
    },
  });
};

export const useEmailCounts = () => {
  return useQuery({
    queryKey: ['emailCounts'],
    queryFn: emailApi.getEmailCounts,
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    retry: 2,
  });
};