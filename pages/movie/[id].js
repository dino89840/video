import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/movies?id=${id}`).then(res => res.json()).then(data => setMovie(data));
    }
  }, [id]);

  if (!movie) return <div className="bg-black min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="bg-black min-h-screen text-white pb-10">
      {/* Cover Image Header */}
      <div className="relative w-full h-60">
        <img src={movie.cover} alt="Cover" className="w-full h-full object-cover opacity-60" />
        <Link href="/" className="absolute top-4 left-4 bg-black/50 p-2 rounded-full text-white font-bold">← BACK</Link>
      </div>

      <div className="px-4 -mt-16 relative">
        <div className="flex items-end space-x-4 mb-6">
          {/* Profile Poster overlapping the cover */}
          <img src={movie.poster} alt="Profile" className="w-32 h-48 rounded-lg shadow-2xl border-2 border-gray-800" />
          <div className="flex-1 pb-2">
            <h1 className="text-2xl font-bold leading-tight">{movie.title}</h1>
            <p className="text-yellow-500 text-sm">Full HD | 2026</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 mb-8">
          <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Movie Summary</h3>
          <p className="text-sm text-gray-300 leading-relaxed">{movie.description}</p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <a href={movie.download} className="bg-yellow-500 text-black text-center py-3 rounded-lg font-extrabold uppercase tracking-wider">STREAM</a>
          <a href={movie.download} download className="bg-gray-800 text-white text-center py-3 rounded-lg font-extrabold uppercase tracking-wider border border-gray-700">DOWNLOAD</a>
        </div>
      </div>
    </div>
  );
}
