import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import Dashboard from '@/pages/Dashboard';
import Categories from '@/pages/Categories';

const BaseLayout = () => {
  return (
    <div className="bg-background/95 w-screen h-screen">
      {/* <Navbar /> */}
      <main className="">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
