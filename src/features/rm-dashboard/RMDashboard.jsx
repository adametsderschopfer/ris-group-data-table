import { useCallback, useEffect, useMemo, useState } from "react";
import { API_ENDPOINT } from "../../constants.js";
import { RMApiSelector } from "./rm-api-selector/RMApiSelector";
import { Table } from "../../components/table/Table";
import axios from "axios";
import { RMDashboardFilter } from "./rm-dashboard/RMDashboardFilter";
import "./RMDashboard.scss"

export const RMDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentFilters, setFilters] = useState([]);
  const [currentApiEndpoint, setApiEndpoint] = useState(API_ENDPOINT.LOCATION);

  const handleFilterChange = (action, filterItem) => {
    if (action === "delete") {
      setFilters(prevState =>
        prevState.filter(item =>
          item.name !== filterItem && item.value !== filterItem.value
        )
      );

      return;
    }

    setFilters((prevState) => [
      ...prevState,
      {
        name: filterItem.name,
        value: filterItem.value,
      }
    ]);
  }

  const handleApiEndpointChange = (apiEndpoint) => {
    setApiEndpoint(apiEndpoint);
    setFilters([]);
  }

  const fetchRMTableData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(currentApiEndpoint);
      setData(response.data.results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [currentApiEndpoint, currentFilters]);

  const renderTableHead = () => (
    <>
      <RMApiSelector
        handleApiEndpointChange={handleApiEndpointChange}
        currentApiEndpoint={currentApiEndpoint}
      />

      <RMDashboardFilter
        handleFilterChange={handleFilterChange}
        currentFilters={currentFilters}
      />
    </>
  );

  const filteredData = useMemo(() => {
    if (!currentFilters.length) {
      return data;
    }

    return data.filter(item => {
     return currentFilters.reduce((isFiltered, currentValue) => {
       if (currentValue.name in item && currentValue.value === item[currentValue.name]) {
         console.log(currentValue)
         isFiltered = true;
       }

       return isFiltered;
     }, false)
    })
  }, [data, currentFilters]);

  useEffect(() => {
    fetchRMTableData();
  }, [currentApiEndpoint, currentFilters]);

  return (
    <div className="rm-dashboard">
      <Table
        isLoading={loading}
        renderHead={renderTableHead}
        data={filteredData}
      />
    </div>
  );
};
