import { useQuery } from '@tanstack/react-query';
import { readActivityById } from '@/api/activityRoutes';

export const useReadActivityById = (
  type: 'design' | 'social_media' | undefined,
  id: number | undefined
) => {
  return useQuery({
    queryKey: ['activity', type, id],
    queryFn: () => readActivityById(type!, id!),
    enabled: !!type && !!id, // Só executa a busca se 'type' e 'id' existirem
  });
};