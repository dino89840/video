import { useState } from 'react';

export default function Admin() {
  const [form, setForm] = useState({ title: '', poster: '', cover: '', download: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/movies', { method: 'POST', body: JSON.stringify(form) });
    alert("တင်ပြီးပါပြီ!");
    setForm({ title: '', poster: '', cover: '', download: '', description: '' });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-blue-600">Add New Movie</h1>
        <input className="border w-full p-2 mb-3" placeholder="Movie Title" onChange={e => setForm({...form, title: e.target.value})} value={form.title} required />
        <input className="border w-full p-2 mb-3" placeholder="Profile (Poster) Link - Vertical" onChange={e => setForm({...form, poster: e.target.value})} value={form.poster} required />
        <input className="border w-full p-2 mb-3" placeholder="Cover (Backdrop) Link - Horizontal" onChange={e => setForm({...form, cover: e.target.value})} value={form.cover} required />
        <input className="border w-full p-2 mb-3" placeholder="R2 Link (Video)" onChange={e => setForm({...form, download: e.target.value})} value={form.download} required />
        <textarea className="border w-full p-2 mb-3 h-24" placeholder="Movie Description" onChange={e => setForm({...form, description: e.target.value})} value={form.description} required></textarea>
        <button className="bg-blue-600 text-white w-full py-2 rounded font-bold">SAVE TO DATABASE</button>
      </form>
    </div>
  );
}
