import {
  Account,
  Home,
  NotFoundPage,
  SubscriptionServices,
  Instructions,
} from '../pages';
import { Settings } from '../pages/settings';
import RegisterPage from '../pages/RegisterPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import ForgotPassPage from '../pages/ForgotPassPage.jsx';
import ChangePassPage from '../pages/ChangePassPage.jsx';
import { Privacy } from '../pages/privacy.jsx';
import { Policy } from '../pages/policy.jsx';
import { Slides } from '../pages/slides.jsx';

const coreRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/accounts',
    component: Account,
  },
  {
    path: '/subscription-services',
    component: SubscriptionServices,
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/video-instructions',
    component: Instructions,
  },
  {
    path: '/auth/register',
    component: RegisterPage,
  },
  {
    path: '/auth/login',
    component: LoginPage,
  },
  {
    path: '/auth/forgot-password',
    component: ForgotPassPage,
  },
  {
    path: '/auth/change',
    component: ChangePassPage,
  },
  {
    path: '/privacy',
    component: Privacy,
  },
  {
    path: '/policy',
    component: Policy,
  },
  {
    path: '/slides',
    component: Slides,
  },

  {
    path: '*',
    component: NotFoundPage,
  },
];

const routes = [...coreRoutes];
export default routes;
