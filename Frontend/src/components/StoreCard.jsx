import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Navigation } from 'lucide-react';

const StoreCard = ({ store }) => {
  const hasImage = !!store.image;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-7 shadow-2xl transition-all hover:border-primary/50 group cursor-pointer flex flex-col ${hasImage ? 'justify-start' : 'justify-between'}`}
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-bold text-xl leading-tight tracking-tight group-hover:text-primary transition-colors">{store.name}</h3>
          <div className="bg-[#4ade80] text-[#020617] text-[10px] font-black px-2.5 py-1 rounded-lg tracking-tighter uppercase shadow-[0_0_15px_rgba(74,222,128,0.3)]">
            2.4 KM
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-6 font-medium">{store.location}</p>
        
        {/* Store Image / Interactive Graphic */}
        {hasImage ? (
          <div className="relative h-52 bg-[#1e293b] rounded-2xl mb-8 flex items-center justify-center overflow-hidden border border-white/10 group">
             <motion.img 
               src={store.image} 
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
                    <Navigation size={20} />
                </div>
             </div>
          </div>
        ) : (
          <div className="space-y-4 mb-10 p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-bold uppercase tracking-[0.15em]">Distance</span>
              <span className="text-gray-300 font-black">8.1 KM</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-bold uppercase tracking-[0.15em]">In-Store Pickup</span>
              <span className="text-green-400 font-black flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></span>
                Available
              </span>
            </div>
          </div>
        )}
      </div>

      <div className={hasImage ? "mt-auto" : ""}>
        {hasImage && (
           <div className="flex items-center gap-2.5 mb-5 text-[10px] uppercase font-black tracking-[0.2em]">
             <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]"></span>
             <span className="text-green-400">Open Now</span>
             <span className="text-gray-700">•</span>
             <span className="text-gray-500">Stock updated 4m ago</span>
           </div>
        )}
        
        <button className="w-full py-4 rounded-2xl border border-white/5 bg-white/5 text-[11px] font-black tracking-[0.2em] text-gray-400 uppercase hover:text-white hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 group">
          Get Directions
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default StoreCard;
