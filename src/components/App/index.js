import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/global';

import defaultTheme from '../../assets/styles/themes/default';
import { Routes } from '../../routes';
import { Header } from '../Header';
import { Container } from './styles';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles theme={defaultTheme} />
      <Container>
        <Header />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
