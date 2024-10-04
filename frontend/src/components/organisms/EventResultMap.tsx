import React, { useEffect, useMemo, useState } from "react";
import { Events } from "../../types";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import styled from "styled-components";
import { SlLocationPin } from "react-icons/sl";

const PopupContent = styled.div`
  display: flex;
  flex-direction: flex-start;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

// Atom: Map Container
const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

// Molecule: Popup Container
const PopupContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 250px;
`;

// Molecule: Event Image
const EventImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  flex-shrink: 0;
  margin-bottom: 5px;
`;

// Molecule: Event Title
const EventTitle = styled.h2`
  font-size: 14px;
  margin: 0;
  font-weight: bold;
  /* flex-direction: flex-start; */
`;

// Molecule: Event Description
const EventPrice = styled.p`
  font-size: 12px;
  margin: 5px 0;
  color: #555;
`;

// Molecule: Event Date
const EventDate = styled.p`
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
`;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

interface MapProps {
  events: Events[];
  hoveredEventId: number | null;
}

interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

const EventResultMap: React.FC<MapProps> = ({ events, hoveredEventId }) => {
  const eventsWithCoordinates = useMemo(() => {
    return events.filter(
      (event) =>
        typeof event.latitude === "number" &&
        typeof event.longitude === "number"
    );
  }, [events]);
  console.log("Events with Coordinates:", eventsWithCoordinates);

  const [viewState, setViewState] = useState<ViewState>(() => ({
    latitude: eventsWithCoordinates[0]?.latitude || 37.7577,
    longitude: eventsWithCoordinates[0]?.longitude || -122.4376,
    zoom: 8,
  }));

  //   const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);

  // function to handle the hover event
  const handleMarkerHover = (eventId: number) => {
    setHoveredMarkerId(eventId);
  };

  useEffect(() => {
    console.log(
      "Events with Coordinates inside useEffect:",
      eventsWithCoordinates
    );
    console.log("Mapbox Access Token:", process.env.REACT_APP_MAPBOX_TOKEN);

    // we will center the map to the first event fertched
    if (eventsWithCoordinates.length > 0) {
      const firstEvent = eventsWithCoordinates[0];
      setViewState((prev) => ({
        ...prev,
        latitude: firstEvent.latitude!,
        longitude: firstEvent.longitude!,
      }));
    }
  }, [eventsWithCoordinates]);

  const hoveredEvent = eventsWithCoordinates.find(
    (e) => e.id === hoveredMarkerId
  );

  return (
    <MapContainer>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/sardor0968/cm1n7c9l7001901rb0z6rexnm" // changed the map style to more basic one
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }} // ensuring that the map takes up the full width and height of the parent container
      >
        {eventsWithCoordinates.map((event) => {
          const isHovered = hoveredEventId === event.id;
          const markerColor = isHovered ? "blue" : "red";

          return (
            <Marker
              key={event.id}
              latitude={event.latitude}
              longitude={event.longitude}
            >
              <div
                style={{ cursor: "pointer" }}
                onMouseEnter={() => handleMarkerHover(event.id)}
                onMouseLeave={() => setHoveredMarkerId(null)}
              >
                <SlLocationPin size="40" color={markerColor} />
                {hoveredMarkerId === event.id && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "45px",
                      left: "-100px",
                    }}
                  >
                    <PopupContainer>
                      <PopupContent>
                        <EventImage src={event.imageUrl} alt="Event" />
                        <TextContainer>
                          <EventTitle>{event.title}</EventTitle>
                          <EventDate>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </EventDate>
                          <EventPrice>{event.price}</EventPrice>
                        </TextContainer>
                      </PopupContent>
                    </PopupContainer>
                  </div>
                )}
              </div>
            </Marker>
          );
        })}
      </Map>
    </MapContainer>
  );
};

export default EventResultMap;
