import PropTypes from "prop-types";
import { Loader } from "../loader/Loader.jsx";
import "./Table.scss"

export const Table = (props) => {
  return (
    <div className={"table"}>
      <div className="table__head">
        {props.renderHead()}
      </div>

      {props.data?.length ? (
        <div className="table__body-row table__body-head">
          {Object.keys(props.data[0]).map(key => (
            <div className="table__body-col" key={key}>
              {key}
            </div>
          ))}
        </div>
      ) : null}

      <div className="table__body">
        {props.isLoading
          ? (
            <div className="table__body-loader">
              <Loader/>
            </div>
          )
          : props.data?.length ? (
            props.data.map(item => (
              <div className="table__body-row" key={item.id}>
                {Object.values(item).map((value, index) => (
                  <div className="table__body-col" key={`row-${item.id}_col-${index}`}>
                    {value instanceof Object ? value.name : value}
                  </div>
                ))}
              </div>
            ))
          ) : <strong>empty table</strong>}
      </div>
    </div>
  )
}

Table.propTypes = {
  renderHead: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
}