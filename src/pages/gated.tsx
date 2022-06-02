import { client } from 'client';

export default function Page() {
  const { useMutation, useAuth } = client.auth;
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You are not authenticated!</div>;
  }

  return <div>Authenticated content</div>;
}
