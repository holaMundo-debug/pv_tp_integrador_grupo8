import { useState } from "react";
import "../style/ProductForm.css"; 

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [image, setImage] = useState(initialData.image || "");
  const [localFile, setLocalFile] = useState(null);

  const catalogImages = [
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedImage = localFile
      ? URL.createObjectURL(localFile)
      : image;

    onSubmit({
      title,
      price,
      description,
      category,
      image: selectedImage,
    });

    if (!initialData.title) {
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
      setLocalFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="title" className="label-violeta">
            Nombre del producto
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="price" className="label-violeta">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.01"
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="label-violeta">
          Descripción
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="label-violeta">
          Categoría
        </label>
        <select
          className="form-select"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Seleccioná una categoría</option>
          <option value="men's clothing">Ropa de hombre</option>
          <option value="women's clothing">Ropa de mujer</option>
          <option value="jewelery">Joyería</option>
          <option value="electronics">Electrónica</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="imageUpload" className="form-label label-violeta">
          Subí una imagen desde tu dispositivo
        </label>
        <input
          className="form-control"
          type="file"
          id="imageUpload"
          onChange={(e) => {
            setLocalFile(e.target.files[0]);
            setImage("");
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label label-violeta">
          O seleccioná una imagen del catálogo
        </label>
        <div className="d-flex gap-2 overflow-auto">
          {catalogImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`img-${index}`}
              className={`img-thumbnail ${
                image === img ? "border border-3 border-success" : ""
              }`}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
                cursor: "pointer",
              }}
              onClick={() => {
                setImage(img);
                setLocalFile(null);
              }}
            />
          ))}
        </div>
      </div>

      {(image || localFile) && (
        <div className="mt-4">
          <p className="texto-imagen">📌 Imagen seleccionada:</p>
          <div className="bg-light rounded p-3 text-center">
            <img
              src={localFile ? URL.createObjectURL(localFile) : image}
              alt="preview"
              className="img-fluid"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          </div>
        </div>
      )}

      <div className="text-end mt-4">
        <button type="submit" className="btn boton-violeta">
          {initialData.title ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
