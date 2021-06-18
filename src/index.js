import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
const Settings = lazy(() => import('./settings'));
const RemoteSyncSummary = lazy(() => import('./components/RemoteSyncView/RemoteSyncSummary'));
const ToDos = lazy(() => import('./components/ToDos/ToDos'));
const Resources = lazy(() => import('./components/Resources/Resources'));
import { FormattedMessage } from 'react-intl';

import {
  Pane,
  PaneMenu,
  Paneset,
  Button,
  ButtonGroup,
  NavList,    
  NavListSection,
  NavListItem
} from '@folio/stripes/components';

import { Route, 
         AppContextMenu 
} from '@folio/stripes/core';

class App extends React.Component {
  static propTypes = {
    actAs: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }),
  }

  render() {
    const { actAs, match: { path }, location: { pathname } } = this.props;

    if (actAs === 'settings') {
      return (
        <Suspense fallback={null}>
          <Settings {...this.props} />
        </Suspense>
      );
    }

    const remote_sync_header = <ButtonGroup fullWidth>
                                 <Button id="clickable-remote-sync-summary" to={path} buttonStyle={ pathname==`${path}` ? 'primary' : '' } >
                                   <FormattedMessage id="ui-remote-sync.remote-sync.summary" />
                                 </Button>
                                 <Button id="clickable-remote-sync-resources" to={`${path}/resources`} buttonStyle={ pathname==`${path}/resources` ? 'primary' : '' } >
                                   <FormattedMessage id="ui-remote-sync.remote-sync.resources" />
                                 </Button>
                                 <Button id="clickable-remote-sync-tasks" to={`${path}/todos`} buttonStyle={ pathname==`${path}/todos` ? 'primary' : '' } >
                                   <FormattedMessage id="ui-remote-sync.remote-sync.tasks" />
                                 </Button>
                                 <Button id="clickable-remote-sync-feedback" to={`${path}/feedback`} buttonStyle={ pathname==`${path}/feedback` ? 'primary' : '' } >
                                   <FormattedMessage id="ui-remote-sync.remote-sync.feedback" />
                                 </Button>
                               </ButtonGroup>

    return (
      <Suspense fallback={null}>

        <AppContextMenu>
        {(handleToggle) => (
          <NavList>
            <NavListSection>
              <NavListItem to="/remote-sync" onClick={handleToggle}>
                Remote Sync
              </NavListItem>
              <NavListItem to="/remote-sync/resources" onClick={handleToggle}>
                <FormattedMessage id="ui-remote-sync.remote-sync.resources" />
              </NavListItem>
              <NavListItem to="/remote-sync/todos" onClick={handleToggle}>
                <FormattedMessage id="ui-remote-sync.remote-sync.tasks" />
              </NavListItem>
              <NavListItem to="/remote-sync/feedback" onClick={handleToggle}>
                <FormattedMessage id="ui-remote-sync.remote-sync.feedback" />
              </NavListItem>
              <NavListItem onClick={() => { shortcutModalToggle(handleToggle); }}>
                Keyboard Shortcuts
              </NavListItem>
            </NavListSection>
          </NavList>
        )}
        </AppContextMenu>

        <Paneset>
          <Pane defaultWidth="fill" renderHeader={() => remote_sync_header } >
            <Switch>
              <Route component={Resources} path={`${path}/resources`} />
              <Route component={ToDos} path={`${path}/feedback`} />
              <Route component={ToDos} path={`${path}/todos`} />
              <Route component={RemoteSyncSummary} path={`${path}`} />
            </Switch>
          </Pane>
        </Paneset>
      </Suspense>
    );
  }
}

export default App;
