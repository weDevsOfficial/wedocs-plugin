import Layout from './Layout';
import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ListingPage from './DocListing';
import SettingsPage from './Settings';
import Documentations from './Documentations';
import Migrate from './Migrations';
import NotFound from './NotFound';
import PermissionSettingsDemo from './PermissionSettingsDemo';
import Dashboard from './Dashboard';
import Premium from './Premium';

const App = () => {
  let routes = [
    { path: '/', component: Documentations },
    { path: 'dashboard', component: Dashboard },
    { path: 'settings', component: SettingsPage },
    { path: 'settings/permission', component: PermissionSettingsDemo },
    { path: 'settings/:panel', component: SettingsPage },
    { path: 'section/:id', component: ListingPage },
    { path: 'migrate', component: Migrate },
  ];

  // Premium upgrade page is only for free users.
  if ( ! window.weDocsAdminVars?.pro_active ) {
    routes.push( { path: 'premium', component: Premium } );
  }

  routes = wp.hooks.applyFilters('wedocs_register_menu_routes', routes);
  
  // Add wildcard NotFound route LAST so it doesn't catch Pro routes
  routes.push({ path: '*', component: NotFound });
  const router = createHashRouter(
    createRoutesFromElements(
      <>
        {routes &&
          routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
      </>
    )
  );

  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
};

export default App;
