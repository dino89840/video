import { useState } from 'react';

export default function Admin() {
  const [form, setForm] = useState({ title: '', poster: '', cover: '', download: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/movies', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form) 
      });
      if (res.ok) {
        alert("အောင်မြင်စွာ တင်ပြီးပါပြီ!");
        setForm({ title: '', poster: '', cover: '', download: '', description: '' });
      } else {
        alert("အမှားအယွင်းရှိနေပါသည်!");
      }
    } catch (err) {
      alert("Network Error!");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-md h-fit">
        <h1 className="text-xl font-bold mb-4 text-blue-600">ဇာတ်ကားအသစ်တင်ရန်</h1>
        <input className="border w-full p-2 mb-3" placeholder="ရုပ်ရှင်အမည်" onChange={e => setForm({...form, title: e.target.value})} value={form.title} required />
        <input className="border w-full p-2 mb-3" placeholder="Poster Link (မတ်တတ်ပုံ)" onChange={e => setForm({...form, poster: e.target.value})} value={form.poster} required />
        <input className="border w-full p-2 mb-3" placeholder="Cover Link (အလျားလိုက်ပုံ)" onChange={e => setForm({...form, cover: e.target.value})} value={form.cover} required />
        <input className="border w-full p-2 mb-3" placeholder="Stream/Download Link" onChange={e => setForm({...form, download: e.target.value})} value={form.download} required />
        <textarea className="border w-full p-2 mb-3 h-24" placeholder="ရုပ်ရှင်အညွှန်း" onChange={e => setForm({...form, description: e.target.value})} value={form.description} required></textarea>
        <button disabled={loading} className="bg-blue-600 text-white w-full py-2 rounded font-bold uppercase">
          {loading ? "တင်နေပါသည်..." : "တင်မည်"}
        </button>
      </form>
    </div>
  );
}
