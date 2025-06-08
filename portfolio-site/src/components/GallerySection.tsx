'use client';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

const portfolioItems = [
  { id: 1, image: 'https://source.unsplash.com/random/800x600?sig=1', title: 'Project 1' },
  { id: 2, image: 'https://source.unsplash.com/random/600x800?sig=2', title: 'Project 2' },
  { id: 3, image: 'https://source.unsplash.com/random/800x800?sig=3', title: 'Project 3' },
  { id: 4, image: 'https://source.unsplash.com/random/600x600?sig=4', title: 'Project 4' },
  { id: 5, image: 'https://source.unsplash.com/random/800x1000?sig=5', title: 'Project 5' },
  { id: 6, image: 'https://source.unsplash.com/random/700x500?sig=6', title: 'Project 6' },
  { id: 7, image: 'https://source.unsplash.com/random/700x900?sig=7', title: 'Project 7' },
  { id: 8, image: 'https://source.unsplash.com/random/900x700?sig=8', title: 'Project 8' },
];

const breakpointColumns = {
  default: 3,
  1100: 2,
  700: 1
};

const GallerySection = () => {
  return (
    <section className="min-h-screen bg-black py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="container mx-auto"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-12">My Work</h2>
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {portfolioItems.map(item => (
            <motion.div
              key={item.id}
              className="mb-8 rounded-lg overflow-hidden shadow-lg bg-gray-800"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={item.image} alt={item.title} className="w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </motion.div>
    </section>
  );
};

export default GallerySection;
