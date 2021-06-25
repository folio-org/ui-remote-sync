import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pane
} from '@folio/stripes/components';


const propTypes = {
  resource: PropTypes.object,
};

export default function FeedbackItem({resource} : props) {

  return (
    <Pane>
      {JSON.stringify(resource)}
    </Pane>
  );
}

FeedbackItem.propTypes = propTypes;
