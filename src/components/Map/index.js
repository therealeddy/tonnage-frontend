import React, { useState, useEffect } from 'react';
import ReactMapGL, { CanvasOverlay } from 'react-map-gl';

import PropTypes from 'prop-types';

import api from '~/services/api';
import { isEmpty } from '~/utils/object';

import { Container } from './styles';

export default function Map({ destiny, origin, accessToken, ...rest }) {
  const [route, setRoute] = useState([]);

  function getUrlApiRoute(start, end) {
    return `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}.json?access_token=${accessToken}&geometries=geojson`;
  }

  useEffect(() => {
    async function getRoute() {
      const response = await api.get(
        getUrlApiRoute([origin.lng, origin.lat], [destiny.lng, destiny.lat])
      );

      setRoute(response.data.routes[0].geometry.coordinates);
    }

    if (!isEmpty(origin) && !isEmpty(destiny)) {
      getRoute();
    }
  }, [origin, destiny]);

  return (
    <Container>
      <ReactMapGL
        {...rest}
        width="100%"
        height="300px"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={accessToken}
      >
        <PolylineOverlay points={route} color="#04215f" />
        {/* {data.map(renderMarker)} */}
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
  destiny: PropTypes.object,
  origin: PropTypes.object,
};

Map.defaultProps = {
  accessToken: '',
  destiny: {},
  origin: {},
};
