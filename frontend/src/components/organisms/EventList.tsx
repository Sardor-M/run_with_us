// Organisms/EventCard.tsx
import React from "react";
import { EventCard } from "../molecules/EventCard";
import styled from "styled-components";
import { EventCardProps, Events } from "../../types";
import useHttpNew from "../../hooks/useHttp";
import { List } from "../atoms/EventCard/Card";

const StyledCard = styled.div`
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 6px;
  overflow: hidden;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const EventList: React.FC<EventCardProps> = () => {
  const {
    data: eventList,
    isLoading,
    error,
  } = useHttpNew("http://localhost:8080/api/runners");

  if (isLoading) {
    return <div> Loading ...</div>;
  }

  if (error) {
    return <div> Error: {error}</div>;
  }

  const eventListData = (eventList as Events[])?.map((event: Events) => {
    return (
      <div>
        <List>
          <EventCard
            key={event.id}
            aria-label={event.id}
            imageSrc={event.imageUrl}
            title={event.title}
            description={event.description}
            price={event.price}
          />
        </List>
      </div>
    );
  });

  return <StyledCard>{eventListData}</StyledCard>;
};