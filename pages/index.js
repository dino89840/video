import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-black min-h-screen text-white p-2">
      <h1 className="text-xl font-bold my-4 text-center text-yellow-500 tracking-widest uppercase">Movie APK</h1>
      
      {loading ? (
        <p className="text-center text-gray-500 mt-10 italic">ခေတ္တစောင့်ပါ...</p>
      ) : movies.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 italic">ဇာတ်ကားများ မရှိသေးပါ။ Admin မှ တင်ပေးပါ။</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {movies.map((movie) => (
            <Link href={`/movie/${movie._id}`} key={movie._id}>
              <div className="bg-gray-900 rounded overflow-hidden shadow-lg border border-gray-800">
                <img src={movie.poster} alt={movie.title} className="w-full h-44 object-cover" />
                <div className="p-1">
                  <h2 className="text-[10px] font-bold truncate text-center uppercase py-1">{movie.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
