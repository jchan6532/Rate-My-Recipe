import { QueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

const useQueryClient = () => {
  const queryClient = useMemo(() => new QueryClient(), []);
  return { queryClient };
};

export default useQueryClient;
