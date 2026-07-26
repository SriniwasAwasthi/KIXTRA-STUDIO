import React, { useState } from 'react';
import { ArrowRight, Heart, Plus, X, Camera, Sparkles } from 'lucide-react';
import { INITIAL_POLAROIDS } from '../data/sneakersData';
import { PolaroidPost } from '../types/sneaker';

interface CommunityPolaroidWallProps {
  onOpenStudio: () => void;
  onNavigateContact: () => void;
}

export const CommunityPolaroidWall: React.FC<CommunityPolaroidWallProps> = ({
  onOpenStudio,
  onNavigateContact,
}) => {
  const [posts, setPosts] = useState<PolaroidPost[]>(INITIAL_POLAROIDS);
  const [selectedPost, setSelectedPost] = useState<PolaroidPost | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('Custom Build');
  const [newCaption, setNewCaption] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop');

  const presetPhotos = [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800&auto=format&fit=crop',
  ];

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const liked = !p.liked;
          return { ...p, liked, likes: liked ? p.likes + 1 : p.likes - 1 };
        }
        return p;
      })
    );
    if (selectedPost && selectedPost.id === id) {
      const liked = !selectedPost.liked;
      setSelectedPost({
        ...selectedPost,
        liked,
        likes: liked ? selectedPost.likes + 1 : selectedPost.likes - 1,
      });
    }
  };

  const handleAddPolaroid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newCaption) {
      alert('Please enter your handle and caption!');
      return;
    }
    const newPost: PolaroidPost = {
      id: `pol-${Date.now()}`,
      author: newAuthor.startsWith('@') ? newAuthor : `@${newAuthor}`,
      title: 'Kixtra Studio',
      subtitle: newSubtitle,
      image: newImage,
      likes: 1,
      liked: true,
      caption: newCaption,
      timestamp: 'Just now',
      tags: ['CommunityWall', 'SoleCulture', newSubtitle.replace(/\s+/g, '')],
    };
    setPosts([newPost, ...posts]);
    setShowUploadModal(false);
    setNewAuthor('');
    setNewCaption('');
  };

  return (
    <section id="community" className="relative bg-brand-lime min-h-screen border-b-2 border-brand-black overflow-hidden p-6 md:p-12 lg:p-16">
      
      {/* Decorative Right Vertical Text Block from template */}
      <div className="absolute right-0 top-0 h-full w-12 bg-white/50 border-l-2 border-brand-black hidden xl:flex items-center justify-center z-0">
        <span className="writing-vertical-rl rotate-180 font-bold tracking-widest text-xs opacity-60 whitespace-nowrap">
          KIXTRA STUDIO COMMUNITY WALL • REAL CREATORS • 1-OF-1 CUSTOM STREETS • KIXTRA STUDIO COMMUNITY WALL
        </span>
      </div>
      
      {/* Chain decoration SVG from template */}
      <svg className="absolute right-20 bottom-0 w-48 h-full z-0 opacity-20 pointer-events-none" viewBox="0 0 100 400" preserveAspectRatio="none">
        <path d="M50,0 Q60,50 40,100 T60,200 T40,300 T60,400" stroke="black" strokeWidth="10" fill="none" />
        <path d="M50,0 Q60,50 40,100 T60,200 T40,300 T60,400" stroke="white" strokeWidth="2" fill="none" />
      </svg>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Text & Model Block */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div className="uppercase font-bold text-xs tracking-widest border-b-2 border-brand-black w-fit pb-1 bg-white px-2">
              Community & Updates
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-brand-black text-brand-white px-4 py-2 font-black text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors border-2 border-brand-black shadow-brutal-sm flex items-center gap-1.5 animate-bounce"
            >
              <Plus className="w-4 h-4" /> Drop Polaroid
            </button>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase leading-none tracking-tighter">
            Stay Tuned <br /> To Our New <br /> Drops & Wall
          </h2>

          <p className="text-sm md:text-base font-mono leading-relaxed max-w-md text-brand-black/90">
            Consumers no longer follow a unified standard of what is considered "fashionable" or "beautiful". 
            We believe that the clothes we wear reflect our personalities and we want to empower everyone to 
            explore and express their individuality.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={onNavigateContact}
              className="w-fit bg-brand-white px-8 py-3.5 border-2 border-brand-black font-bold uppercase text-sm shadow-brutal hover:bg-brand-black hover:text-brand-white transition-colors flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onOpenStudio}
              className="w-fit bg-brand-black text-brand-lime px-8 py-3.5 border-2 border-brand-black font-bold uppercase text-sm shadow-brutal hover:bg-white hover:text-black transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Build Your Pair</span>
            </button>
          </div>


        </div>

        {/* Right Interactive Polaroid Collage Grid */}
        <div className="lg:col-span-7 relative min-h-[640px] lg:min-h-[800px] flex flex-col justify-center">
          
          <div className="mb-6 flex justify-between items-center bg-white/80 backdrop-blur-sm border-2 border-brand-black p-3 shadow-brutal-sm">
            <span className="font-black uppercase text-xs sm:text-sm italic">/// Interactive Polaroid Gallery ({posts.length} Posts)</span>
            <span className="text-[11px] font-mono text-gray-700">Click any polaroid to view story or like</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative p-4">
            {posts.map((post, idx) => {
              const rotations = ['rotate-3', '-rotate-3', 'rotate-2', '-rotate-4', 'rotate-1', '-rotate-2'];
              const rotClass = rotations[idx % rotations.length];

              return (
                <div 
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`bg-white p-4 pb-12 border-4 border-brand-black shadow-brutal-lg ${rotClass} hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer relative group flex flex-col`}
                >
                  <div className="flex justify-between items-baseline text-[11px] font-black uppercase mb-2 text-gray-800">
                    <span className="truncate max-w-[120px]">{post.author}</span>
                    <span className="bg-brand-lime px-1.5 py-0.2 font-mono text-[10px] border border-black">{post.subtitle}</span>
                  </div>

                  <div className="aspect-square w-full bg-brand-gray border-2 border-brand-black mb-3 overflow-hidden relative">
                    <img src={post.image} alt={post.author} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white text-black font-mono font-bold text-xs px-3 py-1.5 border border-black shadow-brutal-sm uppercase">
                        View Story →
                      </span>
                    </div>
                  </div>

                  <p className="font-mono text-xs text-gray-700 line-clamp-2 leading-tight mb-2 flex-1">
                    "{post.caption}"
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-brand-gray text-[11px] font-mono font-bold">
                    <span className="text-gray-500">{post.timestamp}</span>
                    <button 
                      onClick={(e) => handleLike(post.id, e)}
                      className={`flex items-center gap-1 px-2 py-0.5 border border-black transition-colors ${
                        post.liked ? 'bg-red-500 text-white' : 'bg-brand-gray hover:bg-brand-lime text-black'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${post.liked ? 'fill-white' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Polaroid Story Lightbox Modal */}
      {selectedPost && (
        <div 
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-4 border-brand-black shadow-brutal-white w-full max-w-2xl overflow-hidden relative my-auto animate-in zoom-in-95 duration-200 p-6 sm:p-8"
          >
            <div className="flex justify-between items-center pb-4 mb-6 border-b-2 border-brand-black">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-brand-black" />
                <h3 className="font-black text-xl uppercase italic tracking-tight">{selectedPost.author}'s 1-of-1 Flex</h3>
              </div>
              <button onClick={() => setSelectedPost(null)} className="p-1 hover:bg-brand-lime border border-black font-bold">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              <div className="sm:col-span-7 bg-brand-gray border-2 border-brand-black p-2 aspect-square">
                <img src={selectedPost.image} alt={selectedPost.author} className="w-full h-full object-cover shadow-sm" />
              </div>

              <div className="sm:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-mono text-xs bg-brand-lime px-2 py-0.5 border border-black font-bold uppercase">{selectedPost.subtitle}</span>
                    <span className="font-mono text-xs text-gray-500">{selectedPost.timestamp}</span>
                  </div>
                  
                  <p className="font-mono text-sm leading-relaxed text-black bg-brand-gray/50 p-3 border border-brand-black italic">
                    "{selectedPost.caption}"
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {selectedPost.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono bg-brand-black text-white px-2 py-0.5 uppercase">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-brand-black space-y-3">
                  <button
                    onClick={() => handleLike(selectedPost.id)}
                    className={`w-full py-3 px-4 font-black uppercase text-sm flex items-center justify-center gap-2 border-2 border-brand-black shadow-brutal-sm transition-all ${
                      selectedPost.liked ? 'bg-red-500 text-white' : 'bg-white hover:bg-brand-lime text-black'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${selectedPost.liked ? 'fill-white' : ''}`} />
                    <span>{selectedPost.liked ? 'Liked!' : 'Like This Flex'} ({selectedPost.likes})</span>
                  </button>
                  <button
                    onClick={() => { setSelectedPost(null); onOpenStudio(); }}
                    className="w-full bg-brand-black text-brand-lime py-3 font-bold uppercase text-xs hover:bg-white hover:text-black border-2 border-black transition-colors"
                  >
                    Build A Similar Pair in Studio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Polaroid Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white border-4 border-brand-black shadow-brutal-white w-full max-w-lg overflow-hidden relative my-auto animate-in zoom-in-95 duration-200 p-6">
            <div className="flex justify-between items-center pb-3 mb-4 border-b-2 border-brand-black">
              <h3 className="font-black text-xl uppercase italic flex items-center gap-2">
                <Camera className="w-5 h-5" /> Drop Your Polaroid to the Wall
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 hover:bg-brand-lime border border-black font-bold">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPolaroid} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="font-bold uppercase block">Your Social Handle or Name *</label>
                <input 
                  type="text" 
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="@your_handle" 
                  className="w-full border-2 border-brand-black p-2.5 font-bold uppercase focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase block">Sneaker Silhouette Title</label>
                <select
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full border-2 border-brand-black p-2.5 font-bold uppercase focus:outline-none focus:ring-2 focus:ring-brand-lime bg-white"
                >
                  <option value="Custom 1-of-1">Custom 1-of-1 Build</option>
                  <option value="Vortex Runner">Vortex Runner</option>
                  <option value="Air Glider">Air Glider</option>
                  <option value="Court High">Court High</option>
                  <option value="Urban Trek">Urban Trek</option>
                  <option value="Cyber Punk X">Cyber Punk X</option>
                  <option value="Volt Strider">Volt Strider</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase block">Caption / Review *</label>
                <textarea 
                  rows={3} 
                  required
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Tell the community about your pair, comfort level, or outfit pairing..." 
                  className="w-full border-2 border-brand-black p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-lime resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold uppercase block">Pick A Photo Preset (Or Enter Image URL):</label>
                <input 
                  type="url" 
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://..." 
                  className="w-full border-2 border-brand-black p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
                <div className="grid grid-cols-6 gap-2">
                  {presetPhotos.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewImage(url)}
                      className={`aspect-square border-2 border-brand-black p-0.5 overflow-hidden transition-all ${
                        newImage === url ? 'ring-2 ring-brand-lime scale-110 shadow-brutal-sm' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="Preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="w-1/3 bg-gray-100 text-black py-3 font-bold uppercase border-2 border-black"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-2/3 bg-brand-black text-brand-lime py-3 font-black uppercase tracking-widest hover:bg-brand-lime hover:text-black transition-colors border-2 border-black shadow-brutal"
                >
                  Post Polaroid Live 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
