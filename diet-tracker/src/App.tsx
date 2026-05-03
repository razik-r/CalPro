import { motion } from 'framer-motion'
import { Calculator, Plus, Sun, Trash2 } from 'lucide-react'

const meals = [
  { icon: '🥪', food: 'dosa', quantity: 3, unit: 'piece', calories: 390, protein: 7.5 },
  { icon: '🥚', food: 'egg', quantity: 2, unit: 'piece', calories: 140, protein: 12 },
  { icon: '🥛', food: 'milk', quantity: 250, unit: 'ml', calories: 150, protein: 8 },
]

const quickFoods = [
  { name: 'dosa', kcal: '130 kcal', protein: '2.5g P', emoji: '🥪' },
  { name: 'egg', kcal: '70 kcal', protein: '6g P', emoji: '🥚' },
  { name: 'milk', kcal: '0.6 kcal/ml', protein: '0.032g P/ml', emoji: '🥛' },
  { name: 'fish', kcal: '2 kcal/g', protein: '0.22g P/g', emoji: '🍣' },
]

export function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-2xl bg-white p-5 shadow-soft border border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-600">Smart Diet Tracker</h1>
            <p className="text-slate-500">Track Calories. Hit Protein. Build the Best You.</p>
          </div>
          <nav className="flex items-center gap-2 rounded-xl border border-slate-200 p-1">
            {['Tracker', 'History', 'Foods'].map((tab, i) => (
              <button key={tab} className={`px-5 py-2 rounded-lg font-medium ${i===0?'bg-emerald-100 text-emerald-700':'text-slate-600'}`}>{tab}</button>
            ))}
          </nav>
          <div className="flex gap-2"><button className='p-2 rounded-full bg-slate-100'><Sun size={18}/></button><button className='w-9 h-9 bg-emerald-600 rounded-full text-white font-semibold'>A</button></div>
        </motion.header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 rounded-2xl bg-white p-5 shadow-soft border border-slate-100 space-y-5">
            <h2 className="text-3xl font-semibold">Add Your Meals</h2>
            <div className='grid grid-cols-4 rounded-xl border overflow-hidden'>
              {['Breakfast','Lunch','Dinner','Snacks'].map((m, idx)=><button key={m} className={`p-4 font-medium ${idx===0?'bg-emerald-50 text-emerald-700':'bg-white text-slate-600'} border-r last:border-r-0`}>{m}</button>)}
            </div>
            <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead className='text-slate-500'><tr><th className='p-3'>Food</th><th>Qty</th><th>Unit</th><th>Calories</th><th>Protein</th><th/></tr></thead>
              <tbody>
                {meals.map(row=> <tr key={row.food} className='border-t'><td className='p-3'><span className='mr-2'>{row.icon}</span>{row.food}</td><td>{row.quantity}</td><td>{row.unit}</td><td>{row.calories}</td><td>{row.protein}</td><td><Trash2 size={16} className='text-rose-500'/></td></tr>)}
              </tbody>
            </table></div>
            <button className='w-full border-2 border-dashed rounded-xl p-3 font-semibold text-emerald-600 flex items-center justify-center gap-2'><Plus size={18}/>Add Food Item</button>
            <button className='w-full rounded-xl bg-emerald-600 p-4 font-semibold text-white flex items-center justify-center gap-2'><Calculator size={18}/>Calculate Total</button>

            <div className='rounded-2xl border p-4'>
              <h3 className='font-semibold text-2xl mb-4'>Quick Add (Common Foods)</h3>
              <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-3'>
                {quickFoods.map(f=><motion.button whileHover={{y:-2}} key={f.name} className='text-left rounded-xl border p-3'><div className='text-xl'>{f.emoji}</div><p className='font-medium'>{f.name}</p><p className='text-sm text-slate-500'>{f.kcal}</p><p className='text-sm text-slate-500'>{f.protein}</p></motion.button>)}
              </div>
            </div>
          </section>

          <aside className='space-y-5'>
            <div className='rounded-2xl bg-white p-5 shadow-soft border space-y-4'>
              <h3 className='text-2xl font-semibold'>Today&apos;s Summary</h3>
              <div className='rounded-full w-56 h-56 border-[10px] border-emerald-600 mx-auto grid place-items-center'>
                <div className='text-center'><p className='text-5xl text-emerald-600 font-bold'>1,810</p><p className='text-2xl'>kcal</p></div>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div className='rounded-xl border p-3'><p className='text-blue-600 font-semibold'>Protein</p><p className='text-2xl font-bold'>118.5 g</p></div>
                <div className='rounded-xl border p-3'><p className='text-orange-500 font-semibold'>Calories</p><p className='text-2xl font-bold'>1,810 kcal</p></div>
              </div>
              {[['Carbohydrates', 43, 'bg-emerald-500'], ['Protein', 26, 'bg-blue-500'], ['Fats', 27, 'bg-amber-500']].map(([name, percent, colorClass]) => (
                <div key={name as string}>
                  <div className='flex justify-between text-sm'><span>{name as string}</span><span>{percent}%</span></div>
                  <div className='h-2 rounded bg-slate-200 mt-1'><div className={`h-2 rounded ${colorClass as string}`} style={{ width: `${percent}%` }} /></div>
                </div>
              ))}
              <div className='rounded-xl bg-emerald-50 p-3 text-emerald-700 font-medium'>Great job! You hit your protein target.</div>
            </div>
            <div className='rounded-2xl bg-white p-5 shadow-soft border'>
              <h3 className='text-2xl font-semibold mb-3'>Recent History</h3>
              {['May 27, 2024 - 1,845 kcal','May 26, 2024 - 1,720 kcal','May 25, 2024 - 1,905 kcal'].map(item=><p key={item} className='py-2 border-b last:border-b-0 text-slate-600'>{item}</p>)}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
