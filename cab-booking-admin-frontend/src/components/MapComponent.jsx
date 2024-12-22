import React, { useEffect, useRef } from "react";

const MapComponent = ({ onPolygonComplete, mapCenter }) => {
  const mapRef = useRef(null); // Persist the map reference
  const drawingManagerRef = useRef(null); // Persist the DrawingManager reference
  const polygonsRef = useRef([]); // Keep track of drawn polygons

  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        zoom: 12,
        center: mapCenter,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      };

      if (!mapRef.current) {
        mapRef.current = new window.google.maps.Map(
          document.getElementById("map-canvas"),
          mapOptions
        );

        drawingManagerRef.current = new window.google.maps.drawing.DrawingManager({
          drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
          },
          polygonOptions: {
            clickable: true,
            draggable: false,
            editable: true,
            fillColor: "#D3D3D3",
            fillOpacity: 0.5,
          },
        });

        window.google.maps.event.addListener(
          drawingManagerRef.current,
          "polygoncomplete",
          (polygon) => {
            polygonsRef.current.push(polygon);

            const path = polygon.getPath();
            const coordinates = [];
            for (let i = 0; i < path.getLength(); i++) {
              const latLng = path.getAt(i);
              coordinates.push({ lat: latLng.lat(), lng: latLng.lng() });
            }

            if (onPolygonComplete) {
              onPolygonComplete(coordinates);
            }

            drawingManagerRef.current.setDrawingMode(null);
          }
        );

        drawingManagerRef.current.setMap(mapRef.current);
      }
      else {
        mapRef.current.setCenter(mapCenter);
      }
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      console.error("Google Maps API not loaded!");
    }
  }, [onPolygonComplete,mapCenter]);

  const resetPolygons = () => {
    polygonsRef.current.forEach((polygon) => {
      polygon.setMap(null);
    });
    polygonsRef.current = [];
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        id="map-canvas"
        style={{
          width: "95%",
          height: "500px",
          margin: "0 auto",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="button"
        onClick={resetPolygons}
        style={{
          width:"95%",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#ff4d4d",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Reset Coordinates
      </button>
    </div>
  );
};

export default MapComponent;
