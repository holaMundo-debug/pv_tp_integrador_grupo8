import { useState, useEffect } from "react";

const imageOptions = [
  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
  "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"
];

const ProductForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.image) {
      alert("Por favor, seleccioná una imagen.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Nombre:</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Nombre del producto"
          className="form-control"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Precio:</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
          className="form-control"
          required
        />
      </div>

      <div className="col-12">
        <label className="form-label">Descripción:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="form-control"
          rows="3"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Categoría:</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Categoría"
          className="form-control"
        />
      </div>

      <div className="col-12">
        <label className="form-label fw-semibold">Seleccioná una imagen</label>
        <div className="d-flex flex-wrap gap-3">
          {imageOptions.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Imagen ${index}`}
              onClick={() => setForm({ ...form, image: img })}
              className={`img-thumbnail ${form.image === img ? "border-success border-3" : ""}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {form.image && (
        <div className="col-12">
          <p className="text-muted small">Imagen seleccionada:</p>
          <img
            src={form.image}
            alt="Seleccionada"
            className="img-fluid rounded"
            style={{ maxHeight: "150px", objectFit: "contain" }}
          />
        </div>
      )}

      <div className="col-12">
        <button type="submit" className="btn btn-success">
          {initialData ? "Actualizar producto" : "Agregar producto"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;