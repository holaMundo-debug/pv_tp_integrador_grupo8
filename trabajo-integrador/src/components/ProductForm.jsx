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
    image: ""
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Solo se permiten imágenes JPG o PNG.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
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
    <div className="card shadow p-4 border-0 rounded-4">
      <h4 className="fw-bold mb-4 text-center text-dark border-bottom pb-2">
        📋 Datos del producto
      </h4>

      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-md-6">
          <label className="form-label">Nombre del producto</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Ej: Zapatillas Nike"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Precio</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="form-control"
            placeholder="Ej: 15999.90"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Categoría</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Seleccioná una categoría</option>
            <option value="electronics">Electrónica</option>
            <option value="jewelery">Joyería</option>
            <option value="men's clothing">Ropa de hombre</option>
            <option value="women's clothing">Ropa de mujer</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Detalle del producto"
            rows="3"
          />
        </div>

       
        <div className="col-md-6">
          <label className="form-label">Subí una imagen desde tu dispositivo</label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleImageUpload}
            className="form-control"
          />
        </div>
 
        <div className="col-12">
          <label className="form-label fw-semibold">O seleccioná una imagen del catálogo</label>
          <div className="d-flex flex-wrap gap-3">
            {imageOptions.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Imagen ${index}`}
                onClick={() => setForm({ ...form, image: img })}
                className={`img-thumbnail shadow-sm ${
                  form.image === img ? "border-success border-3" : ""
                }`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                  cursor: "pointer"
                }}
              />
            ))}
          </div>
        </div>

        
        {form.image && (
          <div className="col-12 mt-2">
            <p className="text-muted small mb-1">📌 Imagen seleccionada:</p>
            <div className="bg-light p-2 rounded text-center">
              <img
                src={form.image}
                alt="Seleccionada"
                className="img-fluid"
                style={{ maxHeight: "180px", objectFit: "contain" }}
              />
            </div>
          </div>
        )}

        
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success px-4">
            {initialData ? "Actualizar" : "Agregar producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;