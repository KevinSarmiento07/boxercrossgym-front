import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxClient from "@mapbox/mapbox-sdk";
import DirectionsService from "@mapbox/mapbox-sdk/services/directions";

// 🔑 Token de Mapbox
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2V2aW5hbGV4aXNlc21hIiwiYSI6ImNtYXZ2ZDkybjA4ZGYyaXExNjF3OGMzbXYifQ.0mE2s_hZlH1JITggcYOrqw";

// 📍 Destino fijo
const destination = {
  lng: -72.48825653739038,
  lat: 7.884325296010657,
};

const MapWithMapbox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const client = MapboxClient({ accessToken: mapboxgl.accessToken });
  const directionsService = DirectionsService(client);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const loc = {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        };
        setCurrentLocation(loc);
      },
      (err) => console.error("Error obteniendo ubicación:", err),
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (!currentLocation) return;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
      });

      map.current.on("load", () => {
        map.current.resize();

        // Ajustar vista
        map.current.fitBounds(
          [
            [currentLocation.lng, currentLocation.lat],
            [destination.lng, destination.lat],
          ],
          {
            padding: 100,
            maxZoom: 15,
            duration: 1000,
          }
        );

        // Agregar punto de inicio
        map.current.addSource("start-point", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [currentLocation.lng, currentLocation.lat],
            },
          },
        });

        map.current.addLayer({
          id: "start-circle",
          type: "circle",
          source: "start-point",
          paint: {
            "circle-radius": 8,
            "circle-color": "#00ff00",
          },
        });

        map.current.addLayer({
          id: "start-label",
          type: "symbol",
          source: "start-point",
          layout: {
            "text-field": "Tú estás aquí",
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
            "text-offset": [0, 1.5],
            "text-anchor": "top",
            "text-size": 14,
          },
          paint: {
            "text-color": "#00aa00",
            "text-halo-color": "#ffffff",
            "text-halo-width": 2,
          },
        });

        // Agregar punto de destino
        map.current.addSource("end-point", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [destination.lng, destination.lat],
            },
          },
        });

        map.current.addLayer({
          id: "end-circle",
          type: "circle",
          source: "end-point",
          paint: {
            "circle-radius": 8,
            "circle-color": "#ff0000",
          },
        });

        map.current.addLayer({
          id: "end-label",
          type: "symbol",
          source: "end-point",
          layout: {
            "text-field": "Destino",
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
            "text-offset": [0, 1.5],
            "text-anchor": "top",
            "text-size": 14,
          },
          paint: {
            "text-color": "#aa0000",
            "text-halo-color": "#ffffff",
            "text-halo-width": 2,
          },
        });

        // Obtener ruta
        directionsService
          .getDirections({
            profile: "driving-traffic",
            waypoints: [
              { coordinates: [currentLocation.lng, currentLocation.lat] },
              { coordinates: [destination.lng, destination.lat] },
            ],
            geometries: "geojson",
          })
          .send()
          .then((res) => {
            const route = res.body.routes[0].geometry;

            map.current.addSource("route", {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: route,
              },
            });

            map.current.addLayer({
              id: "route",
              type: "line",
              source: "route",
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#3b9ddd",
                "line-width": 6,
              },
            });
          });
      });
    }
  }, [currentLocation]);

  return (
    <div>
      <h2>Mapa con ubicación actual y ruta al destino</h2>
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "calc(100vh - 100px)",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default MapWithMapbox;
