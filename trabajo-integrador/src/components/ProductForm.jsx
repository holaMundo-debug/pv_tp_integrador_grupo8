import { useState, useEffect } from "react";
import "../style/ProductForm.css"; 


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

      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-md-6">
          <label htmlFor="title" className="label-violeta">Nombre del producto</label>
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
          <label htmlFor="price" className="label-violeta">Precio</label>
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
          <label htmlFor="price" className="label-violeta">Categoría</label>
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
          <label htmlFor="price" className="label-violeta">Descripción</label>
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
          <label htmlFor="imageUpload" className="form-label label-violeta">Subí una imagen desde tu dispositivo</label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleImageUpload}
            className="form-control"
          />
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
          <button type="submit" className="btn boton-violeta">
            {initialData ? "Actualizar" : "Agregar producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

