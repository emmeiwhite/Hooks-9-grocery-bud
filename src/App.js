import React, { useState, useEffect, useRef } from "react";
import List from "./components/list/List";
import Alert from "./components/alert/Alert";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./App.css";

function App() {
  const [listItems, setListItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isEditing, setIsEditing] = useState(true);
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
          {alert.show && <Alert />}
          <form className="main-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="grocery-name"
              onChange={handleChange}
              value={searchItem}
              ref={inputRef}
              placeholder="e.g. eggs"
            />
            <button type="submit">{isEditing ? "Edit" : "Submit"}</button>
          </form>
          {/* --- LIST --- */}
          <List
            listItems={listItems}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleClearItems={handleClearItems}
          />
        </section>
      </main>
    </>
  );
}

export default App;
