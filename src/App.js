import React, { useState, useEffect } from "react";
import List from "./components/list/List";
import Alert from "./components/alert/Alert";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./App.css";

function App() {
  const [listItems, setListItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isError, setIsError] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchItem) {
      const item = { item: searchItem, id: new Date().getTime().toString() };

      setListItems([...listItems, item]);
      setIsError(false);
      setSearchItem("");
      setIsItemAdded(true);
    } else {
      setIsError(true);
      return;
    }
  };

  const handleChange = (e) => {
    setSearchItem(e.target.value);
    setIsItemAdded(false);
    setIsCleared(false);
  };

  const handleEditClick = (e) => {
    console.log(e.target);
  };

  const handleDeleteClick = (e) => {
    console.log(e.target);
  };

  const handleClearItems = (e) => {
    setListItems([]);
    setIsCleared(true);
  };
  return (
    <>
      <main className="main-wrapper">
        <section className="main-grocery">
          {isItemAdded && !isError && !isCleared && (
            <div className="success-message">Item Added Successfully</div>
          )}

          {isCleared && (
            <div className="success-message">Item Removed Successfully</div>
          )}
          <h3 className="grocery-heading">Grocery List</h3>
          <form className="main-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="grocery-name"
              onChange={handleChange}
              value={searchItem}
            />
            <button type="submit">Add Item</button>
          </form>
          {isError ? (
            <span className="error-message">No Grocery Name Provided</span>
          ) : (
            ""
          )}

          {/* --- LIST --- */}
          <ul>
            {listItems.length > 0 &&
              listItems.map((item) => (
                <li className="grocery-item" key={item.id}>
                  <span>{item.item}</span>{" "}
                  <div>
                    <FaEdit className="edit-icon" onClick={handleEditClick} />
                    <FaTrash
                      className="delete-icon"
                      onClick={handleDeleteClick}
                    />
                  </div>
                </li>
              ))}
          </ul>

          {listItems.length > 0 && (
            <div className="clear-items" onClick={handleClearItems}>
              Clear Items
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
