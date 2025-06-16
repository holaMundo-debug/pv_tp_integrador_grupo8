import { useSelector } from 'react-redux';
import Navbar from '../components/NavBar';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const products = useSelector(state => state.products.items);
  const favorites = useSelector(state => state.products.favorites);
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Productos Favoritos</h3>
        <div className="row g-3">
          {favoriteProducts.length === 0 ? (
            <p>No hay productos favoritos.</p>
          ) : (
            favoriteProducts.map(product => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 rounded-4 shadow-sm">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                      height: '250px',
                      objectFit: 'contain',
                      padding: '1rem',
                    }}
                  />
                  <div className="card-body d-flex flex-column px-3 pb-3">
                    <h6 className="fw-semibold text-truncate mb-1">{product.title}</h6>
                    <p className="fw-bold">${product.price.toFixed(2)}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-outline-primary btn-sm mt-auto"
                    >
                      Ver detalles
                    </Link>
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
