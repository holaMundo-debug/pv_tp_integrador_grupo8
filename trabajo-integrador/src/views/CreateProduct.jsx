import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductForm from "../components/ProductForm";
import Navbar from "../components/NavBar"; 
import { addNewProduct } from "../productsSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleAddProduct = (newProduct) => {
    const newId = Math.floor(Math.random() * 10000);

    dispatch(addNewProduct({
      id: newId,
      ...newProduct,
      price: Number(newProduct.price),
    }));

    setShowToast(true);

    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  return (
    <>
      <Navbar /> 
      <div className="container mt-4">
        <h2 className="mb-4">Nuevo producto</h2>
        <ProductForm onSubmit={handleAddProduct} />

        {showToast && (
          <div
            className="toast show position-fixed bottom-0 end-0 m-4 text-white bg-success"
            role="alert"
            style={{ zIndex: 1055 }}
          >
            <div className="toast-body">Producto agregado con éxito</div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateProduct;
