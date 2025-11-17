import AppRouting from './utils/Routing';
// import AuthProvider from 'react-auth-kit';
// import createStore from 'react-auth-kit/createStore';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/clients/queryClient';

function App() {
  // const store = createStore({
  //   authName: '_auth',
  //   authType: 'cookie',
  //   cookieDomain: window.location.hostname,
  //   cookieSecure: window.location.protocol === 'https:',
  // });

  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider store={store}> */}
      <AppRouting />
      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
}

export default App;
