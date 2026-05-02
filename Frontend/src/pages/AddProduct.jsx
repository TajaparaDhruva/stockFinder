import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Tag, IndianRupee, Image as ImageIcon, 
  AlignLeft, X, ArrowLeft, Zap, Target, 
  TrendingUp, ShieldCheck, Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import InputField from '../components/InputField';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    sizeType: '',
    sizes: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const imageUrls = [formData.image1, formData.image2, formData.image3, formData.image4].filter(url => url && url.trim() !== '');
      const response = await api.post('/stores/my-store/products', {
        ...formData,
        price: Number(formData.price),
        image: imageUrls[0] || '',
        images: imageUrls
      });
      if (response.data.success) {
        toast.success('Product added successfully!');
        navigate('/products');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 pb-12 border-b border-white/5"
        >
          <div className="max-w-xl space-y-6">
             <button 
               onClick={() => navigate(-1)}
               className="flex items-center gap-2 text-white/30 hover:text-white transition-all group"
             >
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
               <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Return</span>
             </button>
             <h1 className="text-7xl font-light tracking-tight leading-[0.9] text-white">Create New<br/>Listing_</h1>
             <p className="text-white/40 text-sm font-medium leading-relaxed">
                Enter your product into the store's digital inventory. Ensure all imagery and specifications meet the platform's premium standards.
             </p>
          </div>
          
          <div className="hidden lg:block">
             <div className="flex gap-16 text-right">
                <div className="space-y-1">
                   <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Inventory Type</p>
                   <p className="text-xs font-bold text-white tracking-widest uppercase">Premium Retail</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Security Status</p>
                   <p className="text-xs font-bold text-white tracking-widest uppercase">Verified Entry</p>
                </div>
             </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-24">
          
          {/* Identity Section */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24">
             <div className="lg:col-span-1 space-y-4">
                <h2 className="text-xl font-light text-white">Product Identity</h2>
                <p className="text-xs text-white/30 leading-relaxed">Define the primary characteristics and nomenclature of the item.</p>
             </div>
             <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                   <InputField label="Product Name" name="name" placeholder="e.g. Minimalist Wool Blazer" icon={Package} value={formData.name} onChange={handleChange} required />
                   <InputField label="Category" name="category" placeholder="e.g. Outerwear, Men" icon={Tag} value={formData.category} onChange={handleChange} required />
                   <InputField label="Market Value (₹)" name="price" type="number" placeholder="e.g. 55000" icon={IndianRupee} value={formData.price} onChange={handleChange} required />
                   <InputField label="Brief Description" name="description" placeholder="Technical and aesthetic details..." icon={AlignLeft} value={formData.description} onChange={handleChange} required />
                </div>
             </div>
          </section>

          {/* Visuals Section */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24">
             <div className="lg:col-span-1 space-y-4">
                <h2 className="text-xl font-light text-white">Visual Gallery</h2>
                <p className="text-xs text-white/30 leading-relaxed">Upload high-fidelity imagery from multiple angles to showcase craftsmanship.</p>
             </div>
             <div className="lg:col-span-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <InputField label="Master Image URL" name="image1" placeholder="Primary Exhibit" icon={ImageIcon} value={formData.image1} onChange={handleChange} required />
                      <div className="aspect-[4/5] bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden flex items-center justify-center group relative">
                         {formData.image1 ? (
                           <img src={formData.image1} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         ) : (
                           <ImageIcon className="text-white/5" size={48} strokeWidth={1} />
                         )}
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Main Display</span>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-8">
                      <div className="space-y-6">
                        <InputField label="Secondary Perspective 01" name="image2" placeholder="Angle URL" icon={ImageIcon} value={formData.image2} onChange={handleChange} />
                        <InputField label="Secondary Perspective 02" name="image3" placeholder="Angle URL" icon={ImageIcon} value={formData.image3} onChange={handleChange} />
                        <InputField label="Secondary Perspective 03" name="image4" placeholder="Angle URL" icon={ImageIcon} value={formData.image4} onChange={handleChange} />
                      </div>
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                         <p className="text-[11px] font-medium text-white/30 leading-relaxed italic">
                            Recommendation: Use studio lighting and neutral backgrounds to maintain the platform's high-fidelity aesthetic standards.
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* Sizing Section */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24">
             <div className="lg:col-span-1 space-y-4">
                <h2 className="text-xl font-light text-white">Inventory Specs</h2>
                <p className="text-xs text-white/30 leading-relaxed">Specify the available sizes and stock availability for this listing.</p>
             </div>
             <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                   <div className="space-y-6">
                      <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] ml-1">Calibration Type</label>
                      <div className="flex gap-2">
                         {['None', 'Clothing', 'Shoes'].map(type => (
                           <button
                             key={type}
                             type="button"
                             onClick={() => setFormData({ ...formData, sizeType: type === 'None' ? '' : type, sizes: [] })}
                             className={`flex-1 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                               (type === 'None' ? formData.sizeType === '' : formData.sizeType === type)
                                 ? 'bg-white text-black border-white shadow-2xl'
                                 : 'bg-white/5 border-white/5 text-white/30 hover:border-white/10'
                             }`}
                           >
                             {type}
                           </button>
                         ))}
                      </div>
                   </div>

                   {formData.sizeType && (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.98 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="space-y-6"
                     >
                        <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] ml-1">Available Vectors</label>
                        <div className="flex flex-wrap gap-3">
                           {(formData.sizeType === 'Clothing' ? ['XS', 'S', 'M', 'L', 'XL', 'XXL'] : ['6', '7', '8', '9', '10', '11', '12']).map(size => (
                             <button
                               key={size}
                               type="button"
                               onClick={() => handleSizeToggle(size)}
                               className={`w-16 h-16 rounded-2xl text-xs font-bold transition-all border ${
                                 formData.sizes.includes(size) 
                                   ? 'bg-white text-black border-white shadow-2xl scale-110' 
                                   : 'bg-white/5 border-white/5 text-white/30 hover:border-white/10'
                               }`}
                             >
                               {size}
                             </button>
                           ))}
                        </div>
                     </motion.div>
                   )}
                </div>
             </div>
          </section>

          {/* Submission Section */}
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row gap-6">
             <button 
               type="button" 
               onClick={() => navigate('/products')}
               className="flex-1 bg-transparent hover:bg-white/5 text-white/30 hover:text-white rounded-full py-8 text-[11px] font-bold uppercase tracking-[0.4em] transition-all"
             >
               Discard Entry
             </button>
             <Button type="submit" isLoading={isLoading} className="flex-[2] !rounded-full !py-8 !text-xs !font-bold uppercase tracking-[0.3em] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                Finalize Product Entry &rarr;
             </Button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default AddProduct;
