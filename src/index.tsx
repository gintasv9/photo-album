import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import App from './App';
import AlbumList from './albums/AlbumList';
import { AlbumChangesProvider } from './albums/hooks/useAlbumChangesContext';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/albums/:userId"
              element={
                <AlbumChangesProvider>
                  <AlbumList />
                </AlbumChangesProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
