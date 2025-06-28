import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
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
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Productos Favoritos</h3>

        <div className="row g-3">
          {favoriteProducts.length === 0 ? (
            <p>No hay productos favoritos.</p>
          ) : (
            favoriteProducts.map((product) => (
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

                    <div className="mt-auto d-flex gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-outline-primary btn-circle"
                        title="Ver detalles"
                      >
                        🔍
                      </Link>

                      <button
                        onMouseEnter={() => setHoveredId(product.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => dispatch(toggleFavorite(product.id))}
                        className="btn btn-circle btn-outline-danger"
                        title="Quitar de favoritos"
                      >
                        {hoveredId === product.id ? "💔" : "❤️"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
