import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product");
      // Backend response might be { message: "...", products: [...] }
      if (response.data.products) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb"
          alt="Luxury handmade jewelry"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl text-white font-playfair mb-6">
              Timeless Flavour,
              <br />
              <span className="text-amber-400">Crafted by Hand</span>
            </h1>
            <div className="flex gap-4">
              <Link
                to="/shop"
                className="px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600"
              >
                Shop Collection
              </Link>
              <Link
                to="/shop"
                className="px-8 py-3 border border-white text-white rounded-full hover:bg-white/10"
              >
                New Arrivals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair mb-4">Featured Pieces</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto" />
          </div>

          {loading ? (
            <p className="text-center text-lg">Loading products...</p>
          ) : product.length === 0 ? (
            <p className="text-center text-lg">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group"
                >
                  <Link to={`/product/${product._id}`}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-square">
                      <img
                        src={product.productImage} // Use full URL from backend
                        alt={product.productName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="bg-white px-6 py-2 rounded-full font-medium"
                        >
                          Quick Add
                        </button>
                      </div>
                    </div>
                  </Link>

                  <div className="text-center mt-4">
                    <h3 className="font-playfair text-lg">{product.productName}</h3>
                    <p className="text-amber-600 font-medium">
                      NPR. {product.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              to="/shop"
              className="px-10 py-4 border-2 border-amber-500 text-amber-600 rounded-full hover:bg-amber-50"
            >
              View All Collections →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-amber-50 text-center">
        <h2 className="text-4xl font-playfair mb-6">
          Create Your Signature Piece
        </h2>
        <p className="text-lg mb-8">
          Every piece is handcrafted with love and precision
        </p>
        <Link
          to="/shop"
          className="px-10 py-4 bg-amber-600 text-white rounded-full hover:bg-amber-700"
        >
          Begin Your Journey
        </Link>
      </section>
    </div>
  );
}
