import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from '@folio/stripes/components';
import Xarrow from "react-xarrows";
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';
import { Button } from '@folio/stripes/components';

const propTypes = {
};


const boxStyle = {
    border: "grey solid 2px",
    borderRadius: "10px",
    padding: "10px",
    margin: "25px"
};

const animationStyle = {
  animation: 1
}

// See https://github.com/folio-org/ui-dashboard/blob/master/src/routes/DashboardRoute.js#L26-L34

export default function RemoteSyncSummary({}) {

  const ky = useOkapiKy();

  // const { data: { 0: summary } = [], isLoading: summaryLoading, refetch: refetchSummary } = useQuery(
  const { data, isLoading, refetch } = useQuery(
    ['ui-remote-sync', 'summary'],
    async () => {
      // Actually wait for the data to come back.
      const sync_status_report = await ky("remote-sync/statusReport").json();
      console.log("Got status report %o",sync_status_report);
      return sync_status_report;
    }
  );

  const triggerSync = () => {
    console.log("triggerSync");
    let trigger_worker_get = async () => {
      const json = await ky.get('remote-sync/settings/worker').json();
      return json
    }

    trigger_worker_get().then(console.log)
  }

  let grid_rows = []
  let arrows =[]

  
  if ( data != null ) {
    grid_rows = data.map( datarow => {

      // Pull out the extractors
      let extractors = null;
      if ( datarow.extractors != null ) {
        extractors = datarow.extractors.map ( extractor => {
          return (
            <div id={extractor.id} style={boxStyle} key={extractor.id}>
              <h3>{extractor.name}</h3> ( {extractor.status} )
            </div>
          ) 
        })
      }

      let processes = null;
      if ( datarow.processes != null ) {
        processes = datarow.processes.map ( process => {
          return (
            <div id={process.id} style={boxStyle} key={process.id}>
              <h3>{process.name}</h3>
              {
                process.recordCounts.map ( rc => (
                    <span key={rc[0]}>status: {rc[0]} : {rc[1]}</span>
                  )
                )
              }
            </div>
          )
        })
      }

      return (<Row key={'dr:'+datarow.id} between="xs">
          <Col>
            <div id={datarow.id} style={boxStyle}>
              <h3>{datarow.sourceName} ({datarow.status})</h3>
              enabled: {datarow.enabled ? 'true' : 'false' } <br/>
              Record Count: {datarow.recordCount} <br/>
              Some info about source one<br/>
              PLAY | PAUSE | OTHER
            </div>
          </Col>
          <Col>{extractors}</Col>
          <Col>{processes}</Col>
          <Col></Col>
        </Row>)
    })

    // Collect arrows
    data.forEach ( ds => {
      ds.extractors.forEach ( ext => {
        arrows.push( <Xarrow key={ds.id+':'+ext.id} start={ds.id} end={ext.id} color="green" headSize={3} dashness={animationStyle} /> )
        arrows.push( <Xarrow key={ext.id+':'+ext.target} start={ext.id} end={ext.target} color="green" headSize={3} dashness={animationStyle} /> )
      } )
    })

    
  }
  else {
    console.log("No data...");
  }

  return (
    <div>
      <Button onClick={() => triggerSync()}>Trigger Sync</Button>
      <Grid fluid>
        {grid_rows}
        {arrows}
      </Grid>
    </div>
  );
}

RemoteSyncSummary.propTypes = propTypes;
