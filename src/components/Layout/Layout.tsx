import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export const Layout = (): JSX.Element => (
  <>
    <Header />
    <Outlet />
  </>
);
