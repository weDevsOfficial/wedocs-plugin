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
import '../components/ProPreviews';
import ManagerPage from './DocManager';

const App = () => {
  let routes = [
    { path: '/', component: Documentations },
    { path: 'settings', component: SettingsPage },
    { path: 'section/:id', component: ListingPage },
    { path: 'migrate', component: Migrate },
    { path: '*', component: NotFound },
    { path: 'manager/:id', component: ManagerPage },
  ];

  routes = wp.hooks.applyFilters( 'wedocs_register_menu_routes', routes );
  const router = createHashRouter(
    createRoutesFromElements(
      <>
        { routes &&
          routes.map( ( route, index ) => (
            <Route
              key={ index }
              path={ route.path }
              element={ <route.component /> }
            />
          ) ) }
      </>
    )
  );

  return (
    <Layout>
      <RouterProvider router={ router } />
    </Layout>
  );
};

export default App;
