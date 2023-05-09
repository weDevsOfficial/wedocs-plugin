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

const App = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={ <Documentations /> } />
        <Route path="settings" element={ <SettingsPage /> } />
        <Route path="section/:id" element={ <ListingPage /> } />
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
