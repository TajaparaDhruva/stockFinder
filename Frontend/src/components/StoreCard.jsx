import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Store, Phone, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StoreCard = ({ store }) => {
  const navigate = useNavigate();
  const hasImage = !!store.image;
  
  // Default image if none provided
  const storeImage = store.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800';

  const handleViewDetails = () => {
    navigate(`/store/${store._id}`);
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      onClick={handleViewDetails}
      className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-7 shadow-2xl transition-all hover:border-primary/50 group cursor-pointer flex flex-col"
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-bold text-xl leading-tight tracking-tight group-hover:text-primary transition-colors">{store.name}</h3>
          <div className="bg-[#4ade80] text-[#020617] text-[10px] font-black px-2.5 py-1 rounded-lg tracking-tighter uppercase shadow-[0_0_15px_rgba(74,222,128,0.3)]">
            {store.distance || '2.4'} KM
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-6 font-medium flex items-center gap-1.5">
          <MapPin size={12} className="text-primary/70" />
          {store.location}
        </p>
        
        {/* Store Image / Interactive Graphic - Always show like first photo */}
        <div className="relative h-52 bg-[#1e293b] rounded-2xl mb-8 flex items-center justify-center overflow-hidden border border-white/10 group">
            <motion.img 
              src={storeImage} 
              alt={store.name} 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" 
            />
            {/* Gradient Overlay for Interactivity */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
            
            {/* Abstract floating element from design */}
            <div className="absolute inset-x-6 inset-y-6 border border-white/10 rounded-xl pointer-events-none group-hover:border-primary/30 transition-colors"></div>
            
            {/* Center icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl">
                  <Store size={20} />
              </div>
            </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between mb-5">
           <div className="flex items-center gap-2.5 text-[10px] uppercase font-black tracking-[0.2em]">
             <span className={`w-2.5 h-2.5 rounded-full ${store.status === 'Closed' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]' : 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]'}`}></span>
             <span className={store.status === 'Closed' ? 'text-red-400' : 'text-green-400'}>{store.status || 'Open Now'}</span>
             <span className="text-gray-700">•</span>
             <span className="text-gray-500">Stock updated 4m ago</span>
           </div>
           
           {store.rating && (
             <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                <Star size={12} fill="currentColor" />
                <span>{store.rating}</span>
             </div>
           )}
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
          className="w-full py-4 rounded-2xl border border-white/5 bg-white/5 text-[11px] font-black tracking-[0.2em] text-gray-400 uppercase hover:text-white hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 group"
        >
          View Details
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default StoreCard;
