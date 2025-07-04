import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateProduct } from "../Store/productsSlice";
import ProductForm from "../components/ProductForm";
import Navbar from "../components/NavBar";
import Footer from "./Footer";            

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === Number(id))
  );

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!product) {
      alert("Producto no encontrado");
      navigate("/");
    }
  }, [product, navigate]);

  const handleUpdate = (updatedData) => {
    dispatch(
      updateProduct({
        ...updatedData,
        id: Number(id),
        price: Number(updatedData.price),
      })
    );
    setShowToast(true);
    setTimeout(() => navigate("/"), 1800);
  };

  if (!product) return null;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="bg-white rounded-4 shadow-sm border p-4">
          <h2 className="fw-bold mb-4 text-dark border-bottom pb-2">
            ✏️ Editar producto
          </h2>

          <ProductForm onSubmit={handleUpdate} initialData={product} />

          {showToast && (
            <div
              className="toast show position-fixed bottom-0 end-0 m-4 text-white bg-success shadow"
              role="alert"
              style={{ zIndex: 1055 }}
            >
              <div className="toast-body fw-semibold">
                Producto actualizado con éxito
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="my-5"></div> 
      <Footer />                   
    </>
  );
};

export default EditProduct;
