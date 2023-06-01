import PropTypes from "prop-types";
import { API_ENDPOINT } from "../../../constants.js";

export const RMApiSelector = (props) => {
  return (
    <>
      <select
        style={{
          marginRight: 10
        }}
        onChange={(event) => {
          props.handleApiEndpointChange(event.target.value);
        }}
        value={API_ENDPOINT[props.currentApiEndpoint]}
      >
        {Object.keys(API_ENDPOINT).map((key) => (
          <option
            key={key}
            value={API_ENDPOINT[key]}
          >
            {key}
          </option>
        ))}
      </select>
    </>
  );
}

RMApiSelector.propTypes = {
  handleApiEndpointChange: PropTypes.func.isRequired,
  currentApiEndpoint: PropTypes.string.isRequired,
}