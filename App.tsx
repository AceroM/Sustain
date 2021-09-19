import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { transformer, trpc } from './api/trpc';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import store from './store';

const { manifest }: { manifest: any } = Constants;
const localhost = `http://${manifest.debuggerHost?.split(':').shift()}:3000`;

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: `${localhost}/api/trpc`,

      async headers() {
        return {};
      },
      transformer,
    }),
  );

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </Provider>
        </QueryClientProvider>
      </trpc.Provider>
    );
  }
}
