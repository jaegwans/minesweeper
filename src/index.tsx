import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import theme from './styles/theme';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

//교수학습개발센터 승연관 2층 김혜란

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <GlobalStyle />
                <App />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
