import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
const Settings = lazy(() => import('./settings'));
const RemoteSyncSummary = lazy(() => import('./components/RemoteSyncView/RemoteSyncSummary'));
import { FormattedMessage } from 'react-intl';

import {
  Pane,
  PaneMenu,
  Paneset,
  Button,
  ButtonGroup
} from '@folio/stripes/components';

import { Route, 
         AppContextMenu 
} from '@folio/stripes/core';

class App extends React.Component {
  static propTypes = {
    actAs: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  }

  render() {
    const { actAs, match: { path } } = this.props;

    if (actAs === 'settings') {
      return (
        <Suspense fallback={null}>
          <Settings {...this.props} />
        </Suspense>
      );
    }

    const remote_sync_header = <ButtonGroup fullWidth>
                                 <Button id="clickable-remote-sync-summary" to={path} buttonStyle="primary">
                                   <FormattedMessage id="ui-remote-sync.summary" />
                                 </Button>
                                 <Button id="clickable-remote-sync-tasks" to={path} >
                                   <FormattedMessage id="ui-remote-sync.tasks" />
                                 </Button>
                               </ButtonGroup>

    return (
      <Suspense fallback={null}>

        <AppContextMenu>
        {(handleToggle) => (
          <NavList>
            <NavListSection>
              <NavListItem to={packageInfo.stripes.home} onClick={handleToggle}>
                Remote Sync
              </NavListItem>
              <NavListItem onClick={() => { shortcutModalToggle(handleToggle); }}>
                Keyboard Shortcuts
              </NavListItem>
            </NavListSection>
          </NavList>
        )}
        </AppContextMenu>

        <Paneset>
          <Pane defaultWidth="fill" 
                renderHeader={() => remote_sync_header } >
            <Switch>
              <Route component={RemoteSyncSummary} path={`${path}`} />
            </Switch>
          </Pane>
        </Paneset>
      </Suspense>
    );
  }
}

export default App;
