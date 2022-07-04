import classNames from "classnames";
import React, { useState, useRef, LegacyRef, useEffect } from "react";
import Cropper from "cropperjs";
import "./style.css";
import "cropperjs/dist/cropper.css";
import { ICropperDialog } from "./types";

const CropperDialog: React.FC<ICropperDialog> = ({
  onChange,
  field,
  error,
  touched,
  value,
 aspectRation=1/1
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>("https://thumbs.dreamstime.com/b/happy-cute-little-kid-girl-choose-clothes-174609315.jpg");

  const [image, setImage] = useState<string>("");
  const [cropperObj, setCropperObj] = useState<Cropper>();
  const imgRef = useRef<HTMLImageElement>();
  const imgPrev = useRef<HTMLImageElement>();


  useEffect(() => {
    let tempValue:any|null = {key:"key",value:"value"};
    console.log("a:",tempValue.key);
    tempValue=null;
    console.log("a:",tempValue?.key);

    if(imgRef.current)
    {
        const cropper = new Cropper(imgRef.current as HTMLImageElement, {
            viewMode: 1,
            aspectRatio: 1/1,
            preview: imgPrev.current
        });
        setCropperObj(cropper);
    }
  }, []);
  const handleImageSelect = (e: React.FormEvent<HTMLInputElement>) => {
    let file = (e.currentTarget.files as FileList)[0];
    console.log("Select image cropper", file);
    if (file) {
      const url = URL.createObjectURL(file);
      console.log("url show image", url);
      setShow(true);
      setImage(url);
      cropperObj?.replace(url);
    }
    e.currentTarget.value = "";
  };
  const toggleModal = () => {
    setShow((prev) => !prev);
  };

  const handleSelectImage = () => {
    const base64 = cropperObj?.getCroppedCanvas().toDataURL() as string;
    onChange(field, base64);
    setCurrentImage(base64);
    toggleModal();
  }

  return (
    <>
      <label htmlFor="image">
        <img
          style={{ cursor: "pointer" }}
          src={currentImage}
          width="150"
          alt="Оберіть фото"
        />
      </label>
      <input
        type="file"
        className="d-none"
        accept="image/*"
        id="image"
        onChange={handleImageSelect}
      />

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className={classNames("modal fade show", { "custom-modal": show })}>
        <div className="modal-dialog modal-lg">
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
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-lg-9">
                    <div className="d-flex justify-content-center">
                      <img
                        style={{ cursor: "pointer" }}
                        src={image}
                        ref={imgRef as LegacyRef<HTMLImageElement>}
                        width="100%"
                        alt="Оберіть фото"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="d-flex justify-content-center">
                      <div
                        ref={imgPrev as LegacyRef<HTMLDivElement>}
                        style={{
                          height: "150px",
                          width: "150px",
                          border: "1px solid silver",
                          overflow: "hidden",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={toggleModal}
              >
                Скасувати
              </button>
              <button type="button" onClick={handleSelectImage} className="btn btn-primary">
                Обрати фото
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CropperDialog;
