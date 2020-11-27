import { useEffect, useState, useRef } from "react";
import Nav from "./components/Nav";

function App() {
  const editModal = useRef();
  const textarea = useRef();
  const [text, setText] = useState("");
  const [textIndex, setTextIndex] = useState(null);
  const [todolist, setTodolist] = useState([]);

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = () => {
    const t = JSON.parse(localStorage.getItem("todolist"));
    if (t) setTodolist(t);
  };

  const toggleTodoList = (index) => {
    let t = todolist;
    t[index].checked = !t[index].checked;
    setTodolist([...t]);
    localStorage.setItem("todolist", JSON.stringify(todolist));
  };

  const deleteTodoList = (index) => {
    const t = todolist.filter((t, i) => i !== index);
    setTodolist(t);
    localStorage.setItem("todolist", JSON.stringify(t));
  };

  const openModal = async (index) => {
    await setText(todolist[index].text);
    await setTextIndex(index);
    await window.M.updateTextFields();
    await window.M.Modal.init(editModal.current).open();
  };

  const editSave = (e) => {
    e.preventDefault();
    const t = todolist;
    t[textIndex].text = text;
    setTodolist([...t]);
    window.M.Modal.init(editModal.current).close();
    localStorage.setItem("todolist", JSON.stringify(t));
  };

  const unCheckList = todolist.map((l, index) =>
    l.checked === false ? (
      <div className="col s12" key={l.id}>
        <div className="card">
          <div className="card-content">
            <div className="row" style={{ margin: 0 }}>
              <div className="col s12 m9">
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={l.checked}
                    onClick={() => toggleTodoList(index)}
                  />
                  <span>{l.text}</span>
                </label>
              </div>
              <div
                className="col s12 m3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  className="waves-effect waves-light btn-small"
                  onClick={() => openModal(index)}
                >
                  แก้ไข
                </button>
                <button
                  className="waves-effect waves-light btn-small red"
                  style={{ marginLeft: 5 }}
                  onClick={() => deleteTodoList(index)}
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );

  const checkList = todolist.map((l, index) =>
    l.checked === true ? (
      <div className="col s12" key={l.id}>
        <div className="card">
          <div className="card-content">
            <div className="row" style={{ margin: 0 }}>
              <div className="col s12 m9">
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={l.checked}
                    onClick={() => toggleTodoList(index)}
                  />
                  <span>{l.text}</span>
                </label>
              </div>
              <div
                className="col s12 m3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  className="waves-effect waves-light btn-small"
                  onClick={() => openModal(index)}
                >
                  แก้ไข
                </button>
                <button
                  className="waves-effect waves-light btn-small red"
                  style={{ marginLeft: 5 }}
                  onClick={() => deleteTodoList(index)}
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );

  return (
    <div className="App">
      {/* navbar */}
      <Nav fetchTodoList={fetchTodoList} />

      {/* todolist */}
      <div className="container">
        <div className="row" style={{ marginTop: 50 }}>
          <h6>ยังไม่ได้ทำ</h6>
          {unCheckList}
        </div>
        <div className="row">
          <h6>ทำแล้ว</h6>
          {checkList}
        </div>
      </div>

      {/* edit modal */}
      <form onSubmit={editSave}>
        <div id="modal2" className="modal" ref={editModal}>
          <div className="modal-content">
            <div className="row">
              <div className="col s12">
                <div className="input-field col s12">
                  <textarea
                    id="textarea2"
                    className="materialize-textarea"
                    ref={textarea}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  ></textarea>
                  <label htmlFor="textarea1">รายละเอียด</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="waves-effect waves-green btn-flat">
              บันทึก
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
