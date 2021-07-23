import React, { useState } from "react";
import { LIMIT } from "../constants";

const ItemConponemnt = (props) => {
  const [textS, setTextS] = useState("");
  const [textUpdate, setTextUpdate] = useState("");
  const [file, setFile] = useState("");
  const [upFile, setUpFile] = useState("");
  const [nameFile, setNameFile] = useState("");

  // list xuất danh sách file (video or IMG)
  let listImg = [];
  let stt = (props.activePage - 1) * LIMIT + 1;
  listImg = props.items.map((item, key) => {
    let str = item.url;
    let ckeck = str.includes(".mp4");
    // ckeck url xem file video hay IMG
    if (ckeck) {
      return (
        <tr key={key}>
          <td>{stt + key}</td>
          <td>{item.fileName}</td>
          <td>
            <video
              src={item.url}
              alt=""
              width={300}
              height={300}
              autoPlay
              loop
              muted
              controls
            />
          </td>
          {/* nút delete */}
          <td>
            <button
              onClick={() => {
                props.deleteLoad({
                  id: item._id,
                  textSearch: props.textSearch,
                });
              }}
            >
              DELETE
            </button>
          </td>
          {/* btn update  */}
          <td>
            <button
              className={`pick${key}`}
              style={{ background: "green", color: "white" }}
              onClick={async () => {
                let click = document.querySelector(`.abc${key}`);
                click.style.display = "block";
                document.querySelector(`.cancel${key}`).style.display = "block";
                document.querySelector(`.pick${key}`).style.display = "none";
              }}
            >
              UPDATE
            </button>
            {/* hiện phần nhập thông tin để up date */}
            <div
              className={`abc${key}`}
              style={{ display: "none", float: "right" }}
            >
              {/* nút Cancel */}
              <button
                className={`cancel${key}`}
                style={{ display: "none", background: "red" }}
                onClick={async () => {
                  let click = document.querySelector(`.abc${key}`);
                  click.style.display = "none";
                  document.querySelector(`.cancel${key}`).style.display =
                    "none";
                  document.querySelector(`.pick${key}`).style.display = "block";
                }}
              >
                CANCEL
              </button>

              {/* input nhâp name update */}
              <input
                type="text"
                placeholder="name"
                value={nameFile}
                onChange={(e) => {
                  setNameFile(e.target.value);
                  setTextUpdate(e.target.value);
                }}
              />
              {/* update file */}
              <input
                type="file"
                style={{ display: "none" }}
                id={`fileUpdate${key}`}
                onChange={(e) => {
                  setUpFile(e.target.files[0]);
                  document.querySelector(`.nameFileUp${key}`).innerHTML =
                    "" + e.target.files[0].name;
                }}
              />
              {/* focus vào input file */}
              <label
                htmlFor={`fileUpdate${key}`}
                style={{
                  padding: "5px 10px",
                  background: "#E6E6E6",
                  margin: "10px",
                  border: "1px solid black",
                }}
              >
                Chọn Tệp
              </label>
              {/* xuất hiện tên file update */}
              <span className={`nameFileUp${key}`}></span>
              {/* nút thực hiện update */}
              <button
                onClick={async () => {
                  if (upFile !== "") {
                    let fileData = new FormData();
                    await fileData.append("data", upFile);
                    await fileData.append("text", nameFile);
                    props.updateLoad({
                      fileData: fileData,
                      textSearch: textUpdate,
                      id: item._id,
                    });
                    setUpFile("");
                    document.querySelector(`.pick${key}`).style.display =
                      "block";
                    document.querySelector(`.abc${key}`).style.display = "none";
                    document.querySelector(`.nameFileUp${key}`).innerHTML = "";
                  } else {
                    alert("chua chon anh de update");
                  }
                }}
              >
                UPDATE
              </button>
            </div>
          </td>
        </tr>
      );
    } else {
      // xuất IMG - các bước như trên khi xuất video
      return (
        <tr key={key}>
          <td>{stt + key}</td>
          <td>{item.fileName}</td>
          <td>
            <img src={item.url} alt="" width={300} height={300} />
          </td>
          <td>
            <button
              onClick={() => {
                props.deleteLoad({
                  id: item._id,
                  textSearch: props.textSearch,
                });
              }}
            >
              DELETE
            </button>
          </td>
          <td>
            <button
              className={`pick${key}`}
              style={{ background: "green", color: "white" }}
              onClick={async () => {
                let click = document.querySelector(`.abc${key}`);
                click.style.display = "block";
                document.querySelector(`.cancel${key}`).style.display = "block";
                document.querySelector(`.pick${key}`).style.display = "none";
              }}
            >
              UPDATE
            </button>

            <div
              className={`abc${key}`}
              style={{ display: "none", float: "right" }}
            >
              <button
                className={`cancel${key}`}
                style={{ display: "none", background: "red" }}
                onClick={async () => {
                  let click = document.querySelector(`.abc${key}`);
                  click.style.display = "none";
                  document.querySelector(`.cancel${key}`).style.display =
                    "none";
                  document.querySelector(`.pick${key}`).style.display = "block";
                }}
              >
                CANCEL
              </button>

              <input
                type="text"
                placeholder="name"
                value={nameFile}
                onChange={(e) => {
                  setNameFile(e.target.value);
                  setTextUpdate(e.target.value);
                }}
              />
              <input
                style={{ display: "none" }}
                type="file"
                id={`fileUpdate${key}`}
                onChange={(e) => {
                  setUpFile(e.target.files[0]);
                  document.querySelector(`.nameFileUp${key}`).innerHTML =
                    "" + e.target.files[0].name;
                }}
              />
              <label
                for={`fileUpdate${key}`}
                style={{
                  padding: "5px 10px",
                  background: "#E6E6E6",
                  margin: "10px",
                  border: "1px solid black",
                }}
              >
                Chọn Tệp
              </label>
              <span className={`nameFileUp${key}`}></span>
              <button
                onClick={async () => {
                  if (props.textSearch !== "") {
                    setTextS(upFile.name);
                  }
                  if (upFile !== "") {
                    let fileData = new FormData();
                    await fileData.append("data", upFile);
                    await fileData.append("text", nameFile);
                    props.updateLoad({
                      fileData: fileData,
                      textSearch: textUpdate,
                      id: item._id,
                    });
                    setUpFile("");
                    document.querySelector(`.pick${key}`).style.display =
                      "block";
                    document.querySelector(`.abc${key}`).style.display = "none";
                    document.querySelector(`.nameFileUp${key}`).innerHTML = "";
                  } else {
                    alert("chua chon anh de update");
                  }
                }}
              >
                UPDATE
              </button>
            </div>
          </td>
        </tr>
      );
    }
  });
  // list button
  let listBtn = [];
  for (let i = 1; i <= props.totalPage; i++) {
    listBtn.push(
      <button
        key={i}
        onClick={() => {
          console.log(props.textSearch);
          props.initLoad({ activePage: i, textSearch: props.textSearch });
        }}
      >
        {i}
      </button>
    );
  }
  return (
    <div>
      <div>
        {/* text search  */}
        <input
          type="text"
          placeholder="Search"
          value={textS}
          onChange={(e) => {
            setTextS(e.target.value);
          }}
        />
        <button
          onClick={() => {
            props.initLoad({ activePage: 1, textSearch: textS });
          }}
        >
          Search
        </button>
      </div>
      {/* hiện kết quả  */}
      <table>
        <tbody>
          <tr>
            <th>STT</th>
            <th>NAME</th>
            <th>IMGorVIDEO</th>
          </tr>
          {listImg}
        </tbody>
      </table>
      <div>{listBtn}</div>

      {/* Add thêm video or IMG */}
      <div>
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            document.querySelector(".nameFile").innerHTML =
              "" + e.target.files[0].name;
          }}
        />
        <label
          htmlFor="file"
          style={{
            padding: "5px 10px",
            background: "#E6E6E6",
            margin: "10px",
            border: "1px solid black",
          }}
        >
          Chọn Tệp
        </label>
        <span className="nameFile"></span>
        <button
          onClick={async () => {
            if (file !== "") {
              let fileData = new FormData();
              await fileData.append("data", file);
              props.postLoad({ fileData: fileData, textSearch: file.name });
              setFile("");
              document.querySelector(".nameFile").innerHTML = "";
            } else {
              alert("chua chon anh de them vao");
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ItemConponemnt;
