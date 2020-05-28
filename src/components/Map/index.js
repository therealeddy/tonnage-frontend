import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactMapGL, {
  CanvasOverlay,
  FlyToInterpolator,
  Marker,
} from 'react-map-gl';

import PropTypes from 'prop-types';

import { isEmpty } from '~/utils/object';

import { Container } from './styles';

export default function Map({
  focus,
  destiny,
  origin,
  accessToken,
  route,
  ...rest
}) {
  const [viewport, setViewport] = useState({
    longitude: -50,
    latitude: -10,
    zoom: 3.5,
  });

  useEffect(() => {
    if (!isEmpty(focus)) {
      setViewport({
        longitude: parseInt(focus.lng, 10),
        latitude: parseInt(focus.lat, 10) - 0.5,
        zoom: 7,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 1000,
      });
    }
  }, [focus]);

  return (
    <Container>
      <ReactMapGL
        {...viewport}
        {...rest}
        onViewportChange={(e) => setViewport(e)}
        width="100%"
        height="300px"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={accessToken}
      >
        <PolylineOverlay points={route} color="#04215f" />

        {!isEmpty(origin) && (
          <Marker
            longitude={parseFloat(origin.lng)}
            latitude={parseFloat(origin.lat)}
            offsetLeft={-10}
            offsetTop={-25}
          >
            <FaMapMarkerAlt color="#007BFF" size={25} />
          </Marker>
        )}

        {!isEmpty(destiny) && (
          <Marker
            longitude={parseFloat(destiny.lng)}
            latitude={parseFloat(destiny.lat)}
            offsetLeft={-10}
            offsetTop={-25}
          >
            <FaMapMarkerAlt color="#DC3545" size={25} />
          </Marker>
        )}
      </ReactMapGL>
    </Container>
  );
}

function PolylineOverlay(props) {
  // https://github.com/uber/react-map-gl/issues/591
  // https://docs.mapbox.com/api-playground/#/directions?_k=dbkovf

  const { points, color, lineWidth, renderWhileDragging } = props;

  function redraw({ width, height, ctx, isDragging, project }) {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    if ((renderWhileDragging || !isDragging) && points) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.beginPath();
      points.forEach((point) => {
        const pixel = project([point[0], point[1]]);
        ctx.lineTo(pixel[0], pixel[1]);
      });
      ctx.stroke();
    }
  }

  return <CanvasOverlay redraw={redraw} />;
}

PolylineOverlay.propTypes = {
  points: PropTypes.arrayOf(PropTypes.array),
  color: PropTypes.string,
  lineWidth: PropTypes.number,
  renderWhileDragging: PropTypes.bool,
};

PolylineOverlay.defaultProps = {
  points: [[]],
  color: 'green',
  lineWidth: 3,
  renderWhileDragging: true,
};

Map.propTypes = {
  accessToken: PropTypes.string,
  route: PropTypes.array,
  focus: PropTypes.object,
  destiny: PropTypes.object,
  origin: PropTypes.object,
};

Map.defaultProps = {
  accessToken: '',
  route: [],
  focus: {},
  destiny: {},
  origin: {},
};
