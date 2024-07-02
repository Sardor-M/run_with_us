import { useState } from "react";
import { Events } from "../../../types";
import EventLists from "./EventLists";

export default function FilterPageDetails() {
  const [category, setCategory] = useState<Events[]>([]);

  // fetch running events based on the category
  const fetchRunnerEventsData = async (category: string) => {
    try {
      const fetchedData: Events[] = await fetch(
        `http://localhost:4000/api/runners?type=${category}`
      )
        .then((response) => response.json())
        .then((data) => data);
      console.log(fetchedData, "Fetched Data!");

      // Moved the filtering the data to server side.

      setCategory(fetchedData);
    } catch (error) {
      if (error) {
        console.log("Error fetching the filtered events: " + error);
      }
    }
  };

  // Category details logic implementation function
  const handleFilterChange = (type: string) => {
    // TODO: Fetch category details
    setCategory([]);
    fetchRunnerEventsData(type).then((r) => r);
  };

  return (
    <div className="event-list-section">
      <div className="filter-page-container">
        <h3 className="filter-page-left">FilterPageDetails</h3>
        {/* <SearchBox /> */}
        <div className="filter-page-left input">
          <label>
            {" "}
            <input
              type="radio"
              value="simple"
              name="filter"
              onChange={(event) => handleFilterChange(event.target.value)}
            />{" "}
            short run{" "}
          </label>
          <label>
            {" "}
            <input
              type="radio"
              value="luxury"
              name="filter"
              onChange={(event) => handleFilterChange(event.target.value)}
            />{" "}
            long run{" "}
          </label>
          <label>
            {" "}
            <input
              type="radio"
              value="rugged"
              name="filter"
              onChange={(event) => handleFilterChange(event.target.value)}
            />{" "}
            marathon{" "}
          </label>
          <label>
            {" "}
            <input
              type="radio"
              value="simple"
              name="filter"
              onChange={(event) => handleFilterChange(event.target.value)}
            />{" "}
            short-distance race{" "}
          </label>
        </div>
        {/* has to define the css for the grid container */}
        <div className="events-grid-container">
          <div className="filtered-event-list">
            <h2 className="events-filtered"> Events </h2>
            {/* New Component that receives the filtered events from the server */}
            {/* New Component that receives the filtered events from the filter */}
            {/* New Component that receives the filtered events from the filter */}
            <EventLists />
            <ul>
              {category.map((event) => (
                <div className="filtered-event-result-list" key={event.id}>
                  {event.id}
                  <h2 key={event.description}>{event.description}</h2>
                  <li key={event.id}>{event.id}</li>
                  <li key={event.imageUrl}>{event.imageUrl}</li>
                  <li key={event.title}>{event.title}</li>
                  <li key={event.price}>{event.price}</li>
                  <li key={event.category}>{event.category}</li>
                  <li key={event.upcomingId}>{event.upcomingId}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}