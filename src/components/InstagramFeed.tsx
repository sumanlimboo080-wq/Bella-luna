import React, { useState } from 'react';
import { INSTAGRAM_POSTS_DATA } from '../data/salonData';
import { InstagramPost } from '../types';
import { Heart, MessageCircle, Instagram, Sparkles, ExternalLink, X } from 'lucide-react';

export const InstagramFeed: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  return (
    <section className="py-16 bg-[#FDF8F5] border-t border-[#F0E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2ED] text-xs font-semibold text-[#C59B27] uppercase tracking-wider">
              <Instagram className="w-3.5 h-3.5" />
              <span>@BellaLunaSalon</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#2A2421]">Follow Our Beauty Journey</h3>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#1E1B18] text-[#F7E7CE] hover:bg-[#D4AF37] hover:text-white font-medium text-xs shadow transition-colors flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @BellaLunaSalon</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 6 Post Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS_DATA.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-[#FAF2ED] shadow-sm border border-[#F0E2D8]"
            >
              <img
                src={post.imageUrl}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white">
                <span className="flex items-center gap-1 text-xs font-semibold">
                  <Heart className="w-4 h-4 fill-white text-white" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold">
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  {post.comments}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Preview Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="h-72 md:h-auto bg-black">
                <img
                  src={selectedPost.imageUrl}
                  alt="Post preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1E1B18] text-[#DFB15B] flex items-center justify-center font-serif font-bold text-xs">
                      ☽
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#2A2421]">Bella Luna Salon</h4>
                      <p className="text-[10px] text-[#6E625B]">{selectedPost.date}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#2A2421] leading-relaxed">{selectedPost.caption}</p>
                </div>

                <div className="pt-4 border-t border-[#F0E2D8] flex items-center justify-between text-xs text-[#6E625B]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-[#2A2421]">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      {selectedPost.likes}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#2A2421]">
                      <MessageCircle className="w-4 h-4 text-[#C59B27]" />
                      {selectedPost.comments}
                    </span>
                  </div>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C59B27] hover:underline font-medium"
                  >
                    View on Instagram ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
