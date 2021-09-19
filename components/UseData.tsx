import { Div } from 'react-native-magnus';
import { trpc } from '../api/trpc';

export default function UseData(props: any) {
  const posts = trpc.useQuery(['post.all'], {
    refetchInterval: 3000,
  });
  console.log(`posts :>> `, posts)

  return (
    <Div>
      {JSON.stringify(posts)}
    </Div>
  )
}