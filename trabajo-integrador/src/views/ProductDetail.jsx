import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../Store/productsSlice";
import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "./Footer"; 

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);
  const favorites = useSelector((state) => state.products.favorites);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    } else {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [productId, products]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Cargando detalles del producto...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <p className="text-danger">Producto no encontrado.</p>
          <Link to="/" className="btn btn-outline-primary mt-3">Volver al inicio</Link>
        </div>
        <div className="my-5"></div>
        <Footer />
      </>
    );
  }

  const isFavorite = favorites.includes(product.id);

  return (
  <div className="d-flex flex-column min-vh-100">
    <Navbar />

    <div className="container mt-5 flex-grow-1">
      <div className="card shadow-lg rounded-4 border-0 p-4">
        <div className="row g-4 align-items-center justify-content-center">
          
          <div className="col-md-4 d-flex justify-content-center">
            <div className="rounded-4 p-3 d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid"
                style={{
                  maxHeight: "320px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          <div className="col-md-7 d-flex flex-column align-items-center text-center">
            <h2 className="fw-bold mb-3">{product.title}</h2>
            <span className="badge bg-secondary mb-2">{product.category}</span>
            <h4 className="text-success fw-semibold mb-3">${product.price.toFixed(2)}</h4>
            <p className="text-muted">{product.description}</p>

            <ul className="list-unstyled mb-4">
              <li><strong>ID:</strong> {product.id}</li>
              <li><strong>Stock estimado:</strong> {Math.floor(product.rating?.count || 20)} unidades</li>
              <li><strong>Rating:</strong> ⭐ {product.rating?.rate || "4.5"}</li>
            </ul>

            <div className="d-flex gap-3">
              <button
                className={`btn ${isFavorite ? "btn-danger" : "btn-outline-secondary"}`}
                onClick={() => dispatch(toggleFavorite(product.id))}
              >
                {isFavorite ? "💔 Quitar de favoritos" : "❤️ Marcar como favorito"}
              </button>

              <Link to="/" className="btn" style={{ backgroundColor: "#6a11cb", color: "white" }}>
                ← Volver
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div className="my-5"></div>
    <Footer />
  </div>
);
};

export default ProductDetail;
