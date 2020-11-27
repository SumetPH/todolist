import React, { useRef, useState } from "react";

function Nav({ fetchTodoList }) {
  const sidenav = useRef();
  const addModal = useRef();
  const textarea = useRef();
  const [text, setText] = useState("test");

  const openSideNav = (e) => {
    e.preventDefault();
    window.M.Sidenav.init(sidenav.current).open();
  };

  const addFunc = (e) => {
    e.preventDefault();
    window.M.Modal.init(addModal.current).open();
    window.M.Sidenav.init(sidenav.current).close();
  };

  const addSave = (e) => {
    e.preventDefault();
    let todolist = JSON.parse(localStorage.getItem("todolist"));
    if (todolist) {
      todolist.push({
        id: Date.now(),
        text: text,
        checked: false,
      });
    } else {
      todolist = [{ id: Date.now(), text: text, checked: false }];
    }
    window.M.Modal.init(addModal.current).close();
    localStorage.setItem("todolist", JSON.stringify(todolist));
    fetchTodoList();
    textarea.current.value = "";
  };

  return (
    <div>
      {/* nav */}
      <nav className="nav-extended blue">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo" style={{ marginLeft: 10 }}>
            Todolist
          </a>
          <a
            href="/"
            data-target="mobile-demo"
            className="sidenav-trigger"
            onClick={openSideNav}
          >
            <i className="material-icons">menu</i>
          </a>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/" onClick={addFunc}>
                เพิ่ม
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* sidenav */}
      <ul className="sidenav" id="mobile-demo" ref={sidenav}>
        <li>
          <a href="/" onClick={addFunc}>
            เพิ่ม
          </a>
        </li>
      </ul>

      {/* add modal */}
      <form onSubmit={addSave}>
        <div id="modal1" className="modal" ref={addModal}>
          <div className="modal-content">
            <div className="row">
              <div className="col s12">
                <div className="input-field col s12">
                  <textarea
                    id="textarea1"
                    className="materialize-textarea"
                    ref={textarea}
                    onChange={(e) => setText(e.target.value)}
                    required
                  ></textarea>
                  <label htmlFor="textarea1">รายละเอียด</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="waves-effect waves-green btn-flat" type="submit">
              บันทึก
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Nav;
