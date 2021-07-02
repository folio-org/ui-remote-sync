import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
const Settings = lazy(() => import('./settings'));
const RemoteSyncSummary = lazy(() => import('./components/RemoteSyncView/RemoteSyncSummary'));
const ToDos = lazy(() => import('./components/ToDos/ToDos'));
const Feedback = lazy(() => import('./components/Feedback/Feedback'));
const Resources = lazy(() => import('./components/Resources/Resources'));
import { FormattedMessage } from 'react-intl';
import { AppContextMenu, 
         Route, 
         coreEvents, 
         HandlerManager } from '@folio/stripes/core';
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


const App = (appProps) => {

  const { actAs, history, match: { path }, location: { pathname } } = appProps;

  if (actAs === 'settings') {
    return (
      <Settings {...appProps} />
    );
  }

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

            <Switch>
              <Route component={Resources} path={`${path}/resources`} />
              <Route component={Feedback} path={`${path}/feedback`} />
              <Route component={ToDos} path={`${path}/todos`} />
              <Route component={RemoteSyncSummary} path={`${path}`} />
            </Switch>
      </Suspense>
  );
}

let registryEventFired = false;
App.eventHandler = (event, stripes, data) => {

  if (event === coreEvents.LOGIN) {
    console.log("EVENT HANDLER %o, %o, %o",event,stripes,data);
  }

  return null;
};


export default App;
