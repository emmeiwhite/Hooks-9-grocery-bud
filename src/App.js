import React, { useState, useEffect, useRef } from "react";
import List from "./components/list/List";
import Alert from "./components/alert/Alert";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./App.css";

function App() {
  const [listItems, setListItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const inputRef = useRef(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchItem) {
      const item = { item: searchItem, id: new Date().getTime().toString() };

      setListItems([...listItems, item]);
      setSearchItem("");
    } else {
      return;
    }
  };

  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };

  const handleEditClick = (id) => {
    const itemObj = listItems.find((item) => item.id == id);
    handleDeleteClick(id);
    console.log(itemObj);
    inputRef.current.focus();
  };

  const handleDeleteClick = (id) => {
    const updatedLists = listItems.filter((item) => item.id != id);
    setListItems(updatedLists);
  };

  const handleClearItems = (e) => {
    setListItems([]);
  };
  return (
    <>
      <main className="main-wrapper">
        <section className="main-grocery">
          <h3 className="grocery-heading">Grocery List</h3>
          <form className="main-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="grocery-name"
              onChange={handleChange}
              value={searchItem}
              ref={inputRef}
            />
            <button type="submit">Add Item</button>
          </form>

          {/* --- LIST --- */}
          <ul>
            {listItems.length > 0 &&
              listItems.map((item) => (
                <li className="grocery-item" key={item.id}>
                  <span>{item.item}</span>{" "}
                  <div>
                    <FaEdit
                      className="edit-icon"
                      onClick={() => handleEditClick(item.id)}
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={() => handleDeleteClick(item.id)}
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
