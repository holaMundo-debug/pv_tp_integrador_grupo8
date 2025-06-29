import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductForm from "../components/ProductForm";
import Navbar from "../components/NavBar";
import { addNewProduct } from "../Store/productsSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleAddProduct = (newProduct) => {
    const newId = Math.floor(Math.random() * 10000);

    dispatch(
      addNewProduct({
        id: newId,
        ...newProduct,
        price: Number(newProduct.price),
      })
    );

    setShowToast(true);

    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        
        <nav className="mb-2 small text-muted">
          Inicio / <strong className="text-dark">Alta de producto</strong>
        </nav>

        <div className="bg-white rounded-4 shadow-sm border p-4">
          <h2 className="fw-bold mb-4 text-dark border-bottom pb-2">
            📦 Alta de nuevo producto
          </h2>

          <ProductForm onSubmit={handleAddProduct} />

          {showToast && (
            <div
              className="toast show position-fixed bottom-0 end-0 m-4 text-white bg-success shadow"
              role="alert"
              style={{ zIndex: 1055, animation: "fadeInUp 0.5s" }}
            >
              <div className="toast-body fw-semibold d-flex align-items-center gap-2">
                 <span>Producto agregado con éxito</span>
              </div>
            </div>
          )}
        </div>
      </div>

    
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .btn-success:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
};

export default CreateProduct;


