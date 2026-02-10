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
import ExportImport from './ExportImport';
import NotFound from './NotFound';
import PermissionSettingsDemo from './PermissionSettingsDemo';

const App = () => {
  let routes = [
    { path: '/', component: Documentations },
    { path: 'settings', component: SettingsPage },
    { path: 'settings/permission', component: PermissionSettingsDemo },
    { path: 'settings/:panel', component: SettingsPage },
    { path: 'section/:id', component: ListingPage },
    { path: 'export-import', component: ExportImport },
    { path: 'migrate', component: Migrate },
  ];

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
