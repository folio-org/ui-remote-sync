import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  PaneHeader
} from '@folio/stripes/components';

const propTypes = {
};

export default function Crosswalks(props) {

  return (
    <Pane
      renderHeader={renderProps => (
        <PaneHeader
          {...renderProps}
          dismissible
          paneTitle="Crosswalks..."
        />
      )}

    >
      Crosswalks
    </Pane>
  );
}

FeedbackItem.propTypes = propTypes;
