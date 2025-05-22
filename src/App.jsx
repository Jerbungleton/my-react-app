import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MusicPage from './pages/MusicPage';
import StorePage from './pages/StorePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import musicData from './config/music.json';
import sunsetDreams from './assets/audio/sunset-dreams.mp3';
import midnightDrive from './assets/audio/midnight-drive.mp3';

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Map the imported audio files to the music data
      const tracksWithAudio = musicData.map((track, index) => ({
        ...track,
        audioSrc: index === 0 ? sunsetDreams : midnightDrive
      }));
      setTracks(tracksWithAudio);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading tracks:', error);
      setIsLoading(false);
    }
  }, []);

  const handlePlayTrack = (trackToPlay) => {
    const trackIndex = tracks.findIndex(t => t.id === trackToPlay.id);
    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex);
    }
  };

  const handleAddToCart = (track) => {
    setCart(prevCart => {
      const isItemInCart = prevCart.find(item => item.id === track.id);
      if (isItemInCart) {
        alert(`${track.title} is already in your cart.`);
        return prevCart;
      }
      return [...prevCart, { ...track, quantity: 1 }];
    });
    alert(`${track.title} added to cart!`);
  };
  
  const handleTrackEnd = (nextIndex) => {
    setCurrentTrackIndex(nextIndex);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Layout 
      tracks={tracks} 
      currentTrackIndex={currentTrackIndex}
      onTrackEnd={handleTrackEnd}
      onSetCurrentTrackIndex={setCurrentTrackIndex}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/music" 
          element={<MusicPage onPlayTrack={handlePlayTrack} onAddToCart={handleAddToCart} />} 
        />
        <Route 
          path="/store" 
          element={<StorePage onAddToCart={handleAddToCart} />} 
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
}

export default App;