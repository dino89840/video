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

  if (!movie) return <div className="bg-black min-h-screen flex items-center justify-center text-white italic">ခေတ္တစောင့်ပါ...</div>;

  return (
    <div className="bg-black min-h-screen text-white pb-10">
      <div className="relative w-full h-64">
        <img src={movie.cover} alt="Cover" className="w-full h-full object-cover opacity-50" />
        <Link href="/" className="absolute top-4 left-4 bg-black/60 p-2 px-4 rounded-full text-white font-bold text-xs uppercase">← BACK</Link>
      </div>

      <div className="px-4 -mt-20 relative">
        <div className="flex items-end space-x-4 mb-6">
          <img src={movie.poster} alt="Profile" className="w-32 h-48 rounded shadow-2xl border border-gray-700" />
          <div className="flex-1 pb-2">
            <h1 className="text-xl font-extrabold uppercase leading-tight">{movie.title}</h1>
            <p className="text-yellow-500 text-xs mt-1">HD QUALITY | 2026</p>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 mb-8">
          <h3 className="text-gray-500 text-[10px] font-bold uppercase mb-2 tracking-widest italic">Description</h3>
          <p className="text-sm text-gray-300 leading-relaxed text-justify">{movie.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <a href={movie.download} className="bg-yellow-500 text-black text-center py-3 rounded font-black uppercase text-sm">Stream</a>
          <a href={movie.download} download className="bg-gray-800 text-white text-center py-3 rounded font-black uppercase text-sm border border-gray-700">Download</a>
        </div>
      </div>
    </div>
  );
}
