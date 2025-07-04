import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "./Footer"; 
import { toggleFavorite } from "../Store/productsSlice"; 

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const favorites = useSelector((state) => state.products.favorites);

  // solo los productos que son favoritos
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  // para cambiar ícono al pasar el mouse
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container mt-4 flex-grow-1">
        <h3>Productos Favoritos</h3>

        <div className="row g-3">
          {favoriteProducts.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="fs-5 text-muted">
                😢 No hay productos favoritos
              </p>
            </div>
          ) : (
            favoriteProducts.map((product) => {
              const isFavorite = favorites.includes(product.id); // Saber si está en favoritos

              return (
                <div
                  key={product.id}
                  className="col-sm-6 col-md-4 col-lg-3"
                >
                  <div className="card h-100 border-0 rounded-4 shadow-lg p-2">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.title}
                      style={{
                        height: "250px",
                        objectFit: "contain",
                        padding: "1rem",
                      }}
                    />

                    <div className="card-body d-flex flex-column px-3 pb-3">
                      <h6
                        className="fw-semibold text-truncate mb-1"
                        style={{ fontSize: "0.95rem" }}
                      >
                        {product.title}
                      </h6>
                      <p
                        className="text-dark fw-bold mb-1"
                        style={{ fontSize: "1rem" }}
                      >
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-muted small mb-3">
                        {product.category}
                      </p>

                      {/* Botones */}
                      <div className="mt-auto d-flex gap-2 flex-wrap">
                        {/* Botón para ver detalles */}
                        <Link
                          to={`/product/${product.id}`}
                          className="btn btn-primary"
                          title="Ver detalles"
                        >
                          🔍 Detalles
                        </Link>

                        {/* Botón para quitar de favoritos */}
                        <button
                          onMouseEnter={() => setHoveredId(product.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={() => dispatch(toggleFavorite(product.id))}
                          className={`btn ${
                            isFavorite ? "btn-danger" : "btn-outline-secondary"
                          }`}
                          title={
                            isFavorite
                              ? "Quitar de favoritos"
                              : "Agregar a favoritos"
                          }
                        >
                          {isFavorite
                            ? "💔 Quitar de favoritos"
                            : "❤️ Marcar como favorito"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {favoriteProducts.length > 0 && <div className="my-5"></div>} 
      <Footer />
    </div>
  );
};

export default FavoritesPage;
