import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import { toggleFavorite, fetchProducts } from "../Store/productsSlice"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, favorites, loading } = useSelector(state => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const [sortOption, setSortOption] = useState("relevante");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "menorPrecio") return a.price - b.price;
    if (sortOption === "mayorPrecio") return b.price - a.price;
    return 0;
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onSearchChange={setSearchTerm} />

      <div className="container mt-4 mb-0 pb-0 flex-grow-1 d-flex flex-column">
        <div className="row justify-content-start mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 p-3 d-flex align-items-center flex-row gap-3">
              <span className="fw-semibold mb-0">Ordenar por:</span>
              <select
                className="form-select form-select-sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={{ maxWidth: "180px" }}
              >
                <option value="relevante">Más relevante</option>
                <option value="menorPrecio">Menor precio</option>
                <option value="mayorPrecio">Mayor precio</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row g-3">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-3 text-muted">Cargando productos...</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="col-12">
              <p className="text-center text-muted fs-5 py-5">
                ❌ No se encontraron productos que coincidan con tu búsqueda.
              </p>
            </div>
          ) : (
            sortedProducts.map((product) => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 rounded-4 shadow-lg p-2">
                  {product.price < 15 && (
                    <span className="badge-oferta">¡En oferta!</span>
                  )}
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
                    <h6 className="fw-semibold text-truncate mb-1" style={{ fontSize: "0.95rem" }}>
                      {product.title}
                    </h6>
                    <p className="text-dark fw-bold mb-1" style={{ fontSize: "1rem" }}>
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-muted small mb-3">{product.category}</p>

                    <div className="mt-auto d-flex gap-2 justify-content-center">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-outline-primary btn-circle"
                        title="Ver detalles"
                      >
                        🔍
                      </Link>

                      <button
                        className={`btn ${
                          favorites.includes(product.id)
                            ? "btn-outline-danger btn-favorite-pop"
                            : "btn-outline-secondary"
                        } btn-circle`}
                        onClick={() => dispatch(toggleFavorite(product.id))}
                        title={
                          favorites.includes(product.id)
                            ? "Quitar de favoritos"
                            : "Agregar a favoritos"
                        }
                      >
                        {favorites.includes(product.id) ? "❤️" : "🤍"}
                      </button>

                      <Link
                        to={`/editar/${product.id}`}
                        className="btn btn-outline-warning btn-circle"
                        title="Editar producto"
                      >
                        ✏️
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {sortedProducts.length > 0 && <div className="my-5"></div>}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
