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
      <table>
        <tbody>
          <tr><td>processControlStatus</td><td>{resource.processControlStatus}</td></tr>
          <tr><td>transformationStatus</td><td>{resource.transformationStatus}</td></tr>
          <tr><td>sourceRecordId</td><td>{resource.sourceRecordId}</td></tr>
          <tr><td>Status Report</td><td>
            <table>
              <tbody>
                { JSON.parse(resource.statusReport).map( (sr) => (
                    <tr>
                      <td>{sr.ts}</td>
                      <td>{sr.msg}</td>
                    </tr>
                  ) ) }
              </tbody>
            </table>
          </td></tr>
        </tbody>
      </table>
      <hr/>
      {JSON.stringify(resource)}
    </Pane>
  );
}

TransformationProcessRecord.propTypes = propTypes;

