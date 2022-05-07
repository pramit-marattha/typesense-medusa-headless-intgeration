import React from 'react'
import {Highlight} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';

const ResultTemplate = (props) => {
  return (
    <div>
        <div>
      <img
        src={props.hit.thumbnail}
        align="left"
        alt={props.hit.title}
        style={{ width: '25%', height: 'auto' }}
      />
      <div className="hit-name">
        <Highlight attribute="title" hit={props.hit} />
      </div>
      <div className="hit-verified">
        Description: <Highlight attribute="description" hit={props.hit} />
      </div>
      <div className="hit-verified">
        handle: <Highlight attribute="handle" hit={props.hit} />
      </div>
    </div>
    </div>
  )
}

ResultTemplate.propTypes = {
    hit: PropTypes.object.isRequired,
  };

export default ResultTemplate