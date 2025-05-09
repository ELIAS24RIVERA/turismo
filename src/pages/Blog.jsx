import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

// Datos de ejemplo para artículos del blog
const mockArticles = [
  {
    id: 1,
    title: 'Los 10 mejores destinos para viajar en 2024',
    excerpt: 'Descubre los lugares que serán tendencia este año según los expertos en viajes.',
    category: 'tendencias',
    date: '15 Enero 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
    featured: true
  },
  {
    id: 2,
    title: 'Guía completa para viajar a Japón',
    excerpt: 'Todo lo que necesitas saber para planificar tu viaje al país del sol naciente.',
    category: 'guias',
    date: '10 Enero 2024',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3',
    featured: false
  },
  {
    id: 3,
    title: 'Cómo viajar con presupuesto limitado',
    excerpt: 'Consejos prácticos para reducir gastos sin sacrificar experiencias.',
    category: 'consejos',
    date: '5 Enero 2024',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e',
    featured: false
  },
  {
    id: 4,
    title: 'Los secretos mejor guardados de Italia',
    excerpt: 'Lugares poco conocidos que te harán enamorarte aún más de Italia.',
    category: 'destinos',
    date: '28 Diciembre 2023',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5',
    featured: true
  },
  {
    id: 5,
    title: 'Qué llevar en tu mochila de viaje',
    excerpt: 'La lista definitiva de artículos que no pueden faltar en tu equipaje.',
    category: 'consejos',
    date: '20 Diciembre 2023',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1533735380053-5038f48bc8bc',
    featured: false
  },
  {
    id: 6,
    title: 'Ecoturismo: viajar de forma sostenible',
    excerpt: 'Cómo disfrutar de tus viajes mientras cuidas el medio ambiente.',
    category: 'tendencias',
    date: '12 Diciembre 2023',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995',
    featured: false
  }
];

const Blog = () => {
  const [articles, setArticles] = useState(mockArticles);
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [featuredArticle, setFeaturedArticle] = useState(null);

  // Obtener categorías únicas
  const categories = ['todos', ...new Set(mockArticles.map(article => article.category))];

  // Encontrar artículo destacado
  useEffect(() => {
    const featured = mockArticles.find(article => article.featured);
    setFeaturedArticle(featured);
  }, []);

  // Filtrar artículos
  useEffect(() => {
    let results = articles;
    
    // Filtro por término de búsqueda
    if (searchTerm) {
      results = results.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtro por categoría
    if (activeCategory !== 'todos') {
      results = results.filter(article => article.category === activeCategory);
    }
    
    setFilteredArticles(results);
  }, [searchTerm, activeCategory, articles]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog de Viajes</h1>
      <p className="blog-subtitle">Descubre consejos, guías y experiencias de viajeros</p>
      
      {/* Artículo destacado */}
      {featuredArticle && (
        <div className="featured-article">
          <div 
            className="featured-image" 
            style={{ backgroundImage: `url(${featuredArticle.image})` }}
          >
            <div className="featured-badge">Destacado</div>
          </div>
          <div className="featured-content">
            <span className="featured-category">{featuredArticle.category}</span>
            <h2>{featuredArticle.title}</h2>
            <p className="featured-excerpt">{featuredArticle.excerpt}</p>
            <div className="featured-meta">
              <span>{featuredArticle.date}</span>
              <span>•</span>
              <span>{featuredArticle.readTime} de lectura</span>
            </div>
            <Link to={`/blog/${featuredArticle.id}`} className="featured-button">
              Leer artículo
            </Link>
          </div>
        </div>
      )}
      
      {/* Filtros y búsqueda */}
      <div className="blog-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category === 'todos' ? 'Todos' : category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Listado de artículos */}
      <div className="articles-grid">
        {filteredArticles.length > 0 ? (
          filteredArticles
            .filter(article => !article.featured) // Excluir el destacado
            .map(article => (
              <article key={article.id} className="article-card">
                <div 
                  className="article-image" 
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="article-content">
                  <span className="article-category">{article.category}</span>
                  <h3>{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <div className="article-meta">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime} de lectura</span>
                  </div>
                  <Link to={`/blog/${article.id}`} className="article-link">
                    Leer más →
                  </Link>
                </div>
              </article>
            ))
        ) : (
          <div className="no-results">
            <p>No se encontraron artículos que coincidan con tu búsqueda.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('todos');
              }}
              className="reset-filters-button"
            >
              Mostrar todos
            </button>
          </div>
        )}
      </div>
      
      {/* Newsletter */}
      <div className="newsletter-section">
        <h3>Suscríbete a nuestro newsletter</h3>
        <p>Recibe los mejores artículos y ofertas de viaje directamente en tu correo.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Tu correo electrónico" required />
          <button type="submit">Suscribirse</button>
        </form>
      </div>
    </div>
  );
};

export default Blog;