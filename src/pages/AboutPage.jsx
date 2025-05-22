export default function AboutPage() {
  return (
    <div className="container mx-auto p-8 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
        <p className="mb-4 text-lg">
          Welcome to my personal music corner! I'm [Your Name/Artist Name], a musician/producer based in [Your Location]. 
          I create music that [describe your music style, e.g., blends electronic beats with soulful melodies, explores ambient soundscapes, etc.].
        </p>
        <p className="mb-4 text-lg">
          Music has been my passion for [number] years. I started [briefly describe your musical journey]. 
          My biggest influences include [mention a few influences].
        </p>
        <p className="text-lg">
          This website is my platform to share my creations with you. You can listen to my tracks, learn more about my upcoming projects, and even purchase my music to support my work.
        </p>
        <p className="mt-6 text-lg">
          Thanks for stopping by and I hope you enjoy the music!
        </p>
      </div>
    </div>
  );
}