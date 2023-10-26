
import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");

  const handleClick = (val) => {
    setShow(val);
  };

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = { name, status };
    setData([...data, newData]);

    setName("");
    setStatus("");
  };

  const sortedData = data.sort((a, b) => {
    // Sort data by status in ascending order
    if (a.status < b.status) return -1;
    if (a.status > b.status) return 1;
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    if (show === "all") return true;
    if (show === "active") return item.status.toLowerCase() === "active";
    if (show === "completed") return item.status.toLowerCase() === "completed";
    return true;
  });

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;