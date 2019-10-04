import 'react-id-swiper/lib/styles/css/swiper.css';

import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Navigation from 'components/shared/Navigation';
import Theme from 'components/Theme';
import { GlobalState } from 'components/GlobalState';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

export default function App() {
  return (
    <GlobalState>
      <Theme>
        <CssBaseline />
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </Theme>
    </GlobalState>
  );
}
