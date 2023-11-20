import React, { useState, useEffect } from "react";
import Tours from "./Tours";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [filteredTour, setFilteredTour] = useState(Tours);
  const [showFullInfoFor, setShowFullInfoFor] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, []);


  function handleRefresh() {
    window.location.reload();
    setFilteredTour(Tours);
  }

  const handleDelete = (id) => {
    setFilteredTour((preTour) => preTour.filter((Tours) => Tours.id !== id));
  }

  const handleToggleInfo = (id) => {
    setShowFullInfoFor(id === showFullInfoFor ? null : id);
  }

  return (
    <main id="main">
      {
        loading ?
          (<h1>Loading...</h1>) :
          (
            filteredTour.length ?
              (
                filteredTour.map((tour, index) => (
                  <div key={index}>
                    <img src={tour.image}></img>
                    <h4 className="title">{tour.name}</h4>
                    <p className="tour-price">{tour.price}</p>
                    <div id={`tour-item-para-${tour.id}`}>
                      {
                        showFullInfoFor === tour.id ?
                          <span className="tour-info">{tour.info}
                            <button className="show-less-btn" onClick={() => handleToggleInfo(tour.id)}>
                              See Less
                            </button>
                          </span>
                          :
                          <span id={`see-more-${tour.id}`}>{`${tour.info.slice(0, 200)}`}
                            <button className="show-more-btn" onClick={() => handleToggleInfo(tour.id)}>
                              See More
                            </button>
                          </span>
                      }
                    </div>
                    <button id={`delete-btn-${tour.id}`} value={tour.id} onClick={() => handleDelete(tour.id)}>Delete Tour</button>
                  </div>
                ))
              ) :
              (
                <div>
                  <h3>No tours left</h3>
                  <button className="btn" onClick={handleRefresh}>Refresh</button>
                </div>
              )
          )
      }
    </main>
  )
}
export default App;
