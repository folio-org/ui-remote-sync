import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';

import Settings from './settings';
import RemoteSyncSummary from './components/RemoteSyncView/RemoteSyncSummary';

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

import ActionedRoute from './routes/ActionedRoute';
import ForActionRoute from './routes/ForActionRoute';
import SourceRecordsRoute from './routes/SourceRecordsRoute';


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
              <NavListItem to="/remote-sync/sourceRecords" onClick={handleToggle}>
                <FormattedMessage id="ui-remote-sync.recordList.sourceRecords.title" />
              </NavListItem>
              <NavListItem to="/remote-sync/forAction" onClick={handleToggle}>
                <FormattedMessage id="ui-remote-sync.recordList.forAction.title" />
              </NavListItem>
              <NavListItem to="/remote-sync/actioned" onClick={handleToggle}>
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
          <ActionedRoute path={`${path}/actioned`} />
          <ForActionRoute path={`${path}/forAction`} />
          <SourceRecordsRoute path={`${path}/sourceRecords`} />
          <Route component={RemoteSyncSummary} path={path} />
        </Switch>
      </Suspense>
  );
};

export default App;
