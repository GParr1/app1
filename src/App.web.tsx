import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import ResetPasswordView from 'View/ResetPasswordView';
import Dashboard from 'View/Dashboard';
import MatchesView from 'View/MatchesView';
import MyAccountView from 'View/MyAccountView';
import ConfirmProfileView from 'View/ConfirmProfileView';
import { getUser } from 'state/auth/selectors';
import AppProviders from 'AppProviders';
import AuthView from 'View/AuthView';
import RankingView from 'View/RankingView';
import Page from 'structure/Page/Page'
import PageAuthenticated from 'structure/Page/PageAuthenticated'



const App: FC = () => {
  const user = useSelector(getUser);
  const welcomeConfig = {
    path: '/login',
    element: (
      <Page><AuthView /></Page>
    )
  }
  const createAccountConfig = {
    path: "/register",
    element:(
      <Page><AuthView register /></Page>
    )
  }
  const resetPassConfig = {
    path: '/reset-password',
    element: (
      <Page>
          <ResetPasswordView />
      </Page>
    )
  }
  const dashboardConfig = {
    path: '/dashboard',
    element: (
      <PageAuthenticated>
        <Dashboard />
      </PageAuthenticated>
    )
  }
  const classificaConfig = {
    path: '/classifica',
    element: (
      <PageAuthenticated>
        <RankingView />
      </PageAuthenticated>
    )
  }
  const matchConfig = {
    path: '/partite',
    element: (
      <PageAuthenticated>
        <MatchesView user={user} />
      </PageAuthenticated>
    )
  }
  const profileConfig = {
    path: '/profile',
    element: (
      <PageAuthenticated>
        <MyAccountView />
      </PageAuthenticated>
    )
  }
  const confirmProfileConfig = {
    path: '/confirm-profile',
    element: (
      <PageAuthenticated>
          <ConfirmProfileView user={user} />
      </PageAuthenticated>
    )
  }
  const catchNavigateConfig = {
    path: "*",
    element:<Navigate to={user ? '/dashboard' : '/login'} />
  }
  const emptyNavigateConfig = {
    path: "/",
    element:<Navigate to={user ? '/dashboard' : '/login'} />
  }
  return (
    <Router basename="/calcetto">
      <Routes>
        <Route {...catchNavigateConfig}/>
        <Route {...emptyNavigateConfig}/>
        <Route {...welcomeConfig} />
        <Route {...resetPassConfig}/>
        <Route {...createAccountConfig} />

        <Route {...dashboardConfig}/>
        <Route {...classificaConfig}/>
        <Route {...matchConfig}/>
        <Route {...profileConfig}/>
        <Route {...confirmProfileConfig}/>
      </Routes>
    </Router>
  );
};


export default function AppWeb() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}
