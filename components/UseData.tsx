import { trpc } from '../api/trpc';

export default function UseData(props: any) {
  const posts = trpc.useQuery(['post.all'], {
    refetchInterval: 3000,
  });
  return props.children(posts)
}