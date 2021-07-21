import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pane
} from '@folio/stripes/components';

const propTypes = {
  resource: PropTypes.object,
};

export default function TransformationProcessRecord({resource} : props) {

  return (
    <Pane>
      TPR
    </Pane>
  );
}

TransformationProcessRecord.propTypes = propTypes;

