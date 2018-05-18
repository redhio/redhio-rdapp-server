import { injectReducer } from '../store/reducers';
import MainRoute from './Main';
import SignupRoute from './Signup';
import ClassifierRoute from './Classifier';
import SolverRoute from './Solver';
import ShopifyRoute from './Shopify';
import LoginRoute from './Login';

export const createRoutes = (store) => (
  [{
    path: '/',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const CoreLayout = require('components/CoreLayout').default;
        const accountReducer = require('reducers/account').default;
        injectReducer(store, { key: 'account', reducer: accountReducer });
        cb(null, CoreLayout);
      }, 'coreLayout');
    },
    indexRoute: MainRoute,
    childRoutes: [
      SignupRoute,
      ClassifierRoute,
      SolverRoute,
      ShopifyRoute,
      LoginRoute
    ]
  }
  ]);

export default createRoutes;
