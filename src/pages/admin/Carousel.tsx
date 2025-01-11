import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import MediaUpload from '../../components/admin/MediaUpload';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Trash2, GripVertical } from 'lucide-react';

interface CarouselImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export default function AdminCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .order('order');
      
      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(url: string) {
    try {
      const newOrder = images.length;
      const { error } = await supabase
        .from('carousel_images')
        .insert({
          url,
          alt: 'Portfolio image',
          order: newOrder
        });

      if (error) throw error;
      fetchImages();
    } catch (error) {
      console.error('Error adding image:', error);
    }
  }

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase
        .from('carousel_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  async function handleDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);

    // Update order in database
    try {
      const updates = items.map((item, index) => ({
        id: item.id,
        order: index
      }));

      const { error } = await supabase
        .from('carousel_images')
        .upsert(updates);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating order:', error);
    }
  }

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Add New Image</h2>
        <MediaUpload onUploadComplete={handleUpload} />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Manage Carousel Images</h2>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="carousel">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {images.map((image, index) => (
                  <Draggable key={image.id} draggableId={image.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center gap-4 bg-white/10 rounded-lg p-4"
                      >
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="text-white/60" />
                        </div>
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-32 h-20 object-cover rounded"
                        />
                        <input
                          type="text"
                          value={image.alt}
                          onChange={async (e) => {
                            const { error } = await supabase
                              .from('carousel_images')
                              .update({ alt: e.target.value })
                              .eq('id', image.id);
                            if (error) console.error('Error updating alt text:', error);
                          }}
                          className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                          placeholder="Image description"
                        />
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-white/5"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}