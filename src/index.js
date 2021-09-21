import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';

import Settings from './settings';
import RemoteSyncSummary from './components/RemoteSyncView/RemoteSyncSummary';
import ToDos from './components/ToDos/ToDos';
import Feedback from './components/Feedback/Feedback';
import Resources from './components/Resources/Resources';

import { FormattedMessage } from 'react-intl';
import { AppContextMenu, 
         Route, 
         coreEvents, 
         HandlerManager } from '@folio/stripes/core';
import {
  NavList,    
  NavListSection,
  NavListItem
} from '@folio/stripes/components';

const App = (appProps) => {
  const { actAs, match: { path } } = appProps;

  if (actAs === 'settings') {
    return (
      <Suspense fallback={null}>
        <Settings {...appProps} />
      </Suspense>
    );
  }

  return (
      <Suspense fallback={null}>
        <AppContextMenu>
        {(handleToggle) => (
          <NavList>
            <NavListSection>
              <NavListItem to="/remote-sync" onClick={handleToggle}>
                 <FormattedMessage id="ui-remote-sync.remote-sync.dashboard" />
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
                 <FormattedMessage id="ui-remote-sync.remote-sync.kbdshortcuts" />
              </NavListItem>
            </NavListSection>
          </NavList>
        )}
        </AppContextMenu>

        <Switch>
          <Route component={Resources} path={`${path}/resources`} />
          <Route component={Feedback} path={`${path}/feedback`} />
          <Route component={ToDos} path={`${path}/todos`} />
          <Route component={RemoteSyncSummary} path={`${path}`} />
        </Switch>
      </Suspense>
  );
};

export default App;
