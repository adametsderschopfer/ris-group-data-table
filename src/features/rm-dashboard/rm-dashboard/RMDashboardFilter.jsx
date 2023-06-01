import PropTypes from "prop-types";
import { useState } from "react";
import { FilterIcon } from "../../../components/icons/FilterIcon.jsx";
import "./RMDashboardFilter.scss"

const FILTERS = {
  species: [
    "Human",
    "Humanoid",
    "Alien",
  ],
  type: [
    "Planet",
    "TV",
    "Dream",
    "Microverse",
    "Resort",
    "Cluster",
    "Space station",
    "Fantasy town",
  ],
}

export const RMDashboardFilter = (props) => {
  const [filtersShown, setFiltersShown] = useState(false);

  return (
    <div className="rm-filter">
      <button className="rm-filter__button" onClick={() => setFiltersShown(!filtersShown)}>
        <FilterIcon/>
      </button>

      <div className={"rm-filter__controllers" + (filtersShown ? " shown" : " hidden")}>
        {Object.entries(FILTERS).map(([key, options]) => (
          <>
            <strong style={{
              marginBottom: 5,
              textTransform: "capitalize"
            }}>{key}</strong>

            <select
              onChange={(event) => {
                setFiltersShown(false);
                props.handleFilterChange("add", {
                  name: key,
                  value: event.target.value
                })
              }}
            >
              {options.map(optionValue => (
                <option
                  value={optionValue}
                  key={`select-${key}_option-${optionValue}`}
                  disabled={props.currentFilters.find(item => item.value === optionValue)}
                >
                  {optionValue}
                </option>
              ))}
            </select>
          </>
        ))}
      </div>

      <div className="rm-filter__active">
        {props.currentFilters.map((item, index) => (
          <div
            className="rm-filter__active-item"
            key={`rm-filter-item-${index}`}
          >
            <span>{item.value}</span>

            <button
              onClick={() => props.handleFilterChange("delete", item)}
            >
              {"x"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

RMDashboardFilter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  currentFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ),
}
