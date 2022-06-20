import classNames from "classnames";
import React, { useState } from "react";
import { boolean } from "yup";
import "./style.css";

const CropperDialog: React.FC = () => {

    const [show, setShow] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");

  const handleImageSelect = (e: React.FormEvent<HTMLInputElement>) => {
    let file = (e.currentTarget.files as FileList)[0];
    console.log("Select image cropper", file);
    if(file){
        const url=URL.createObjectURL(file);
        console.log("url show image", url);
        setShow(true);
        setImage(url);
    }
    e.currentTarget.value = "";
  };
  const toggleModal = () =>
  {
    setShow(prev=>!prev);
  }

  return (
    <>
      <label htmlFor="image">
        <img
          style={{ cursor: "pointer" }}
          src="https://thumbs.dreamstime.com/b/happy-cute-little-kid-girl-choose-clothes-174609315.jpg"
          width="150"
          alt="Оберіть фото"
        />
      </label>
      <input
        type="file"
        className="d-none"
        id="image"
        onChange={handleImageSelect}
      />

      <div className={classNames("modal fade show", { "custom-modal": show })}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body">
              <img
                style={{ cursor: "pointer" }}
                src={image}
                width="450"
                alt="Оберіть фото"
              />
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={toggleModal}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CropperDialog;
