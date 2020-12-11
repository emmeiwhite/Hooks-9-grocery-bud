import React, { useState, useEffect, useRef } from "react";
import List from "./components/list/List";
import Alert from "./components/alert/Alert";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./App.css";

function App() {
  const [listItems, setListItems] = useState([]);
  const [item, setItem] = useState("");
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

    if (!item) {
      showAlert(true, "danger", "Enter a value");
    } else if (item && isEditing) {
      // deal with edit
    } else {
      const listItem = { item, id: new Date().getTime().toString() };

      setListItems([...listItems, listItem]);
      setItem("");
      showAlert(true, "success", "Item ADDED");
    }
  };

  /* --- Showing Alert --- */
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({
      ...alert,
      show,
      type,
      msg,
    });
  };

  /* --- End Showing Alert --- */

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
          {alert.show && <Alert {...alert} disappearingAlert={showAlert} />}

          <h3 className="grocery-heading">Grocery List</h3>

          <form className="main-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="grocery-name"
              onChange={(e) => setItem(e.target.value)}
              value={item}
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
          />
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
