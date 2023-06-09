/**
 * This is a reusable component which displays the 
 * table containing information about a stock which 
 * was searcher for by the user.
 */
import "../../styles/loginStyle.css";
import { useEffect, useState } from "react";
import { todaysData, getPrediction } from "../../utils/search";

function SearchTable(props) {
  const ticker = props.stockTicker;
  // gets the stylings
  const [changeStyle, setChangeStyle] = useState({ color: "#FF0000" });
  const [predictionStyle, setPredictionStyle] = useState({ color: "#FF0000" });
  const [changeData, setChangeData] = useState({});
  const [predictionData, setPredictionData] = useState("0.00");
  // gets the data for the searched stock
  useEffect(() => {
    stockData(ticker); 
    stockPrediction(ticker);
  }, []);
  // gets the daily change of the stock
  const stockData = (ticker) => {
    todaysData(ticker)
      .then((data) => {
        // sets the correct colorings
        if (data.changeStock.charAt(0) != "-") {
          setChangeStyle({ ...changeStyle, color: "#008000" });
          data.changeStock = "+" + data.changeStock;
        } else {
          setChangeStyle({ ...changeStyle, color: "#FF0000" });
        }
        setChangeData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  // gets the stocks prediction
  const stockPrediction = (ticker) => {
    getPrediction(ticker)
      .then((data) => {
        // sets the correct format
        if (data.charAt(0) != "-") {
          setPredictionStyle({ ...predictionStyle, color: "#008000" });
          data = "+" + data;
        } else {
          setPredictionStyle({ ...predictionStyle, color: "#FF0000" });
        }
        setPredictionData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <h3>Info</h3>
      <table className="stockTable">
        <thead>
          <tr>
            <th>Price</th>
            <th>Today's change</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Displays the values pulled from the api */}
            <td>${changeData.priceStock}</td>
            <td style={changeStyle}>{changeData.changeStock}</td>
            <td style={predictionStyle}>{predictionData}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SearchTable;
