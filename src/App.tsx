import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import SocketProvider from './contexts/SocketProvider';
import { ToastContainer } from 'react-toastify';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <SocketProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
        <ToastContainer style={{ fontSize: 15 }} pauseOnFocusLoss={false} />
      </LocalizationProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}
export default App;
