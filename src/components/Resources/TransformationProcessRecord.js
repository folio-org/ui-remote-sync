import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pane
} from '@folio/stripes/components';

const propTypes = {
  resource: PropTypes.object,
};

export default function TransformationProcessRecord({resource} : props) {

  let folioResourceLink = (resourceLink) => {
    let result = null;
    if ( resourceLink != null ) {
      result = (
        <span>{resourceLink.folioContext}/{resourceLink.folioId}</span>
      )
    }

    retun result;
  }

  return (
    <Pane>
      <table>
        <tbody>
          <tr><td>processControlStatus</td><td>{resource.processControlStatus}</td></tr>
          <tr><td>transformationStatus</td><td>{resource.transformationStatus}</td></tr>
          <tr><td>sourceRecordId</td><td>{resource.sourceRecordId}</td></tr>
          <tr><td>last processing attempt</td><td>{resource.lastProcessAttempt}</td></tr>
          <tr><td>last success</td><td>{resource.lastProcessComplete}</td></tr>
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
          <tr><td>Corresponding Resource</td><td>{folioResourceLink(resource.correspondingResource)}</td></tr>
          <tr><td>Data</td><td>{resource.inputDataString}</td></tr>
        </tbody>
      </table>
      <hr/>
      {JSON.stringify(resource)}
    </Pane>
  );
}

TransformationProcessRecord.propTypes = propTypes;

