import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';

import Settings from './settings';
import RemoteSyncSummary from './components/RemoteSyncView/RemoteSyncSummary';
import ToDos from './components/ToDos/ToDos';
import Resources from './components/Resources/Resources';

import { FormattedMessage } from 'react-intl';
import {
  AppContextMenu, 
  Route, 
} from '@folio/stripes/core';

import {
  NavList,    
  NavListSection,
  NavListItem
} from '@folio/stripes/components';

import FeedbackRoute from './routes/FeedbackRoute';

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
                <FormattedMessage id="ui-remote-sync.recordList.sourceRecords.title" />
              </NavListItem>
              <NavListItem to="/remote-sync/todos" onClick={handleToggle}>
                <FormattedMessage id="ui-remote-sync.recordList.forAction.title" />
              </NavListItem>
              <NavListItem to="/remote-sync/feedback" onClick={handleToggle}>
                <FormattedMessage id="ui-remote-sync.recordList.actioned.title" />
              </NavListItem>
              <NavListItem onClick={() => { shortcutModalToggle(handleToggle); }}>
                 <FormattedMessage id="ui-remote-sync.remote-sync.kbdshortcuts" />
              </NavListItem>
            </NavListSection>
          </NavList>
        )}
        </AppContextMenu>

        <Switch>
          <FeedbackRoute path={`${path}/feedback`} />
          <Route component={Resources} path={`${path}/resources`} />
          <Route component={ToDos} path={`${path}/todos`} />
          <Route component={RemoteSyncSummary} path={path} />
        </Switch>
      </Suspense>

      // TODO set up routes. Allow routes to use common SASQ wrangler?
      //So feedbackRoute would basically just render SASQRoute and have that set up nested route with options
  );
};

export default App;
