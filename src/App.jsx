import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './redux/store';
import AppRoutes from './routes';
import ScrollToTop from './components/Common/ScrollToTop';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '10px',
              background: '#1f2937',
              color: '#fff',
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
