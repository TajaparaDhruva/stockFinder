import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const getStockBadge = (status) => {
  switch (status) {
    case 'IN_STOCK':
      return { color: 'text-green-400', bg: 'bg-green-500/10', dot: 'bg-green-500', label: 'IN STOCK' };
    case 'LOW_STOCK':
      return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', dot: 'bg-yellow-500', label: 'LOW STOCK' };
    case 'OUT_OF_STOCK':
      return { color: 'text-red-400', bg: 'bg-red-500/10', dot: 'bg-red-500', label: 'OUT OF STOCK' };
    default:
      return { color: 'text-gray-400', bg: 'bg-gray-500/10', dot: 'bg-gray-500', label: 'UNKNOWN' };
  }
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const badge = getStockBadge(product.status);
  
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-[#111827]/40 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-hidden transition-all hover:border-primary/40 group cursor-pointer flex flex-col h-full shadow-2xl"
    >
      <div className="relative aspect-square p-4 flex items-center justify-center">
        
        {/* Background Pedestal - CIRCULAR MASKING */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="w-full h-full rounded-full bg-[#1e293b]/40 border border-white/5 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden">
                <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-br from-[#1e293b] to-[#020617] border border-white/10 shadow-2xl relative overflow-hidden flex items-center justify-center">
                    
                    {/* Inner lighting and texture */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 via-transparent to-black/20"></div>

                    {/* THE PRODUCT IMAGE - Masked to the circle if necessary */}
                    {product.image ? (
                        <motion.img 
                            src={product.image} 
                            alt={product.name} 
                            whileHover={{ scale: 1.15, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-full h-full object-cover rounded-full mix-blend-lighten opacity-90 group-hover:opacity-100" 
                        />
                    ) : (
                        <div className="text-center opacity-20 px-4">
                            <p className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase leading-tight">
                                {product.name.split(' ')[0]}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Stock Badge - Overlaid */}
        <div className={`absolute top-6 right-6 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-2xl border border-white/10 ${badge.bg}`}>
          <span className={`w-2 h-2 rounded-full ${badge.dot} shadow-[0_0_10px_rgba(34,197,94,0.4)]`}></span>
          <span className={`text-[9px] font-black tracking-[0.1em] ${badge.color}`}>{badge.label}</span>
        </div>
      </div>

      <div className="px-8 pb-8 flex-1 flex flex-col">
        <div className="mb-4">
          <p className="text-[10px] uppercase font-black tracking-[0.25em] text-gray-600 mb-2">{product.category}</p>
          <h3 className="text-white font-bold text-xl mb-1 leading-tight group-hover:text-primary transition-colors tracking-tight">{product.name}</h3>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="text-white text-2xl font-black tracking-tighter">{formattedPrice}</div>
          <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <span className="text-xl leading-none">›</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
