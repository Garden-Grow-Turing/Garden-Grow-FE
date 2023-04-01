import "./Form.css";
import { useLazyQuery } from "@apollo/client";
import { LOAD_PLANTS } from "../../Graphql/Queries";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


// const Form = ({ setPlants, setGrowzone, setZipcode, zipcode }) => {
// const [loadPlants, { error, data }] = useLazyQuery(LOAD_PLANTS);

// const submitZip = (event) => {
//   event.preventDefault();
//   loadPlants({
//     variables: {
//       zipcode,
//     },
//   });
//   if (data) {
//     setPlants([...data.vegetablesByZipcode.vegetables]);
//     setGrowzone(data.vegetablesByZipcode.growZone);
//     clearInputs()
//   }
// };

//   const clearInputs = () => {
//     setZipcode("");
//   };

const Form = ({ setPlants, setGrowzone, setZipcode, zipcode }) => {
  const [loadPlants, { error, data }] = useLazyQuery(LOAD_PLANTS);

  const submitZip = (event) => {
    event.preventDefault();
    loadPlants({
      variables: {
        zipcode,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setPlants([...data.vegetablesByZipcode.vegetables]);
      setGrowzone(data.vegetablesByZipcode.growZone);
      }
  }, [data, setGrowzone, setPlants]);

  return (
    <form className="form-container">
      <div className="input-and-button">
        <input
          className="input"
          type="number"
          min="10000"
          max="99999"
          placeholder="zip code"
          name="zipCode"
          value={zipcode}
          onChange={(event) => setZipcode(event.target.value)}
        />
        {/* <div className="plants-link-container"> */}
          <Link 
            to={`/${zipcode}`}
            className="plants-link"
            onClick={(event) => {submitZip(event)}}
        >
            <span role="img" aria-label="plant emoji">&#x1F331; </span>
          </Link>
        {/* </div> */}
      </div>
      <div className="error-container">
        {error && (
          <div className="error-message">please enter a valid zipcode</div>
        )}
      </div>
    </form>
  );
};

export default Form;
