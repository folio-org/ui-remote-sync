import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from '@folio/stripes/components';
import Xarrow from "react-xarrows";

const propTypes = {
};


const boxStyle = {
    border: "grey solid 2px",
    borderRadius: "10px",
    padding: "5px",
};

const animationStyle = {
  animation: 1
}


export default function RemoteSyncSummary({}) {

  return (
    <Grid fluid>
      <Row between="xs">
        <Col xs="2">
          Sources
        </Col>
        <Col xs="2">
          Extract
        </Col>
        <Col xs="2">
          Transform
        </Col>
        <Col xs="2">
          Load
        </Col>
      </Row>

      <Row between="xs">
        <Col xs="2">
          <div id="test_source_one" style={boxStyle}>
            Source one
          </div>
        </Col>

        <Col xs="2">

          <div id="test_extract_one" style={boxStyle}>
            Extract one
          </div>

          <div id="test_extract_two" style={boxStyle}>
            Extract two
          </div>
        </Col>

        <Col xs="2"/>

        <Col xs="2">
        </Col>

      </Row>

      <Row between="xs">
        <Col xs="2">
          <div id="test_source_two" style={boxStyle}>
            Source Two
          </div>
        </Col>

        <Col xs="2">
          <div id="test_extract_three" style={boxStyle}>
            Extract Two
          </div>
        </Col>

        <Col xs="2">
        </Col>

        <Col xs="2">
        </Col>
      </Row>

      <Xarrow start="test_source_one" end="test_extract_one" color="green" headSize={3} dashness={animationStyle} />
      <Xarrow start="test_source_one" end="test_extract_two" color="green" headSize={3} dashness={animationStyle} />
      <Xarrow start="test_source_two" end="test_extract_three" color="green" headSize={3} dashness={animationStyle} />

    </Grid>
  );
}

RemoteSyncSummary.propTypes = propTypes;
