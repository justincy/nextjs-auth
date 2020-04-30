import { useIsAuthenticated } from '../providers/Auth';
import withConditionalRedirect from './withConditionalRedirect';

/**
 * Require the user to be unauthenticated in order to render the component.
 * If the user is authenticated, forward to the given URL.
 */
export default function withoutAuth(WrappedComponent, location = '/profile') {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    condition: function withoutAuthCondition() {
      return useIsAuthenticated();
    }
  });
}
