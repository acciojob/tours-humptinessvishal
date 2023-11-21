import React, { useEffect, useState } from "react";
import Tours from "./Tours"

const App = () => {
  const [data, setData] = useState(null)
  const [isVisibleStatuses, setVisibleStatuses] = useState(Array(Tours.length).fill(false))

  useEffect(() => {
    setTimeout(() => setData(Tours), 2000)
  }, []);


  function deleteData(i) {
    const newData = data.filter((el, ind) => ind != i)
    setData(newData)
  }

  function toggleVisibleStatus(i) {
    const newVisibleStatus = [...isVisibleStatuses]
    newVisibleStatus[i] = !newVisibleStatus[i]
    setVisibleStatuses(newVisibleStatus)
  }

  function handleRefresh() {
    window.location.reload();
  }

  return (
    <main id="main">
      <h1 className="title" >Tours</h1>
      {
        !data ?
          <p className="loading" >Loading</p>
          :
          (
            data.length == 0 ?
              <div>
                <p>No more tours</p>
                <button className="btn" onClick={handleRefresh} >Refresh</button>
              </div>
              :
              (
                data.map((element, i) => {
                  return (
                    <div className="single-tour" >
                      <p className="tour-info" >{element.price}</p>
                      <p id={`tour-item-para-${element.id}`} className="tour-price" >
                        {
                          isVisibleStatuses[i] ? element.info : element.info.slice(0, 200)
                        }
                      </p>
                      <button id={`see-more-${element.id}`} onClick={() => toggleVisibleStatus(i)} >{!isVisibleStatuses[i] ? "See more" : "Show less"}</button>
                      <button className="delete-btn" id={`delete-btn-${element.id}`} onClick={() => deleteData(i)} >Delete</button>
                    </div>
                  )
                })
              )
          )
      }
    </main>
  )
}
export default App;