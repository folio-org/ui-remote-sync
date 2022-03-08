import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { AppContextMenu, Route } from '@folio/stripes/core';
import {
  NavList,
  NavListSection,
  NavListItem,
} from '@folio/stripes/components';
import RemoteSyncSummary from './components/RemoteSyncView/RemoteSyncSummary';
import Settings from './settings';
import ActionedRoute from './routes/ActionedRoute';
import ForActionRoute from './routes/ForActionRoute';
import SourceRecordsRoute from './routes/SourceRecordsRoute';

const App = (appProps) => {
  const {
    actAs,
    match: { path },
  } = appProps;

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
              <NavListItem onClick={handleToggle} to="/remote-sync">
                <FormattedMessage id="ui-remote-sync.remote-sync.dashboard" />
              </NavListItem>
              <NavListItem
                onClick={handleToggle}
                to="/remote-sync/sourceRecords"
              >
                <FormattedMessage id="ui-remote-sync.recordList.sourceRecords.title" />
              </NavListItem>
              <NavListItem onClick={handleToggle} to="/remote-sync/forAction">
                <FormattedMessage id="ui-remote-sync.recordList.forAction.title" />
              </NavListItem>
              <NavListItem onClick={handleToggle} to="/remote-sync/actioned">
                <FormattedMessage id="ui-remote-sync.recordList.actioned.title" />
              </NavListItem>
              <NavListItem
                onClick={() => {
                  // shortcutModalToggle(handleToggle);
                }}
              >
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
