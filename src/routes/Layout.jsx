import { Outlet, Link } from "react-router-dom";

const Layout = () => (
  <div>
    <nav style={{ background: '#222', padding: '1rem' }}>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/">🏠 Home</Link>
    </nav>
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
