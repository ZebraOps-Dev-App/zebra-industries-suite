import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function PhotoUploadTrigger() {
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const imageFilename = `${sku}.jpg`
    const photoUrl = `https://www.dropbox.com/s/your-folder/${imageFilename}?raw=1`

    const { error } = await supabase.from('inventory').insert([
      {
        sku,
        title: sku,
        category,
        photo_url: photoUrl,
        brandkit_status: false,
        ai_description_status: false
      }
    ])

    if (error) {
      setStatus('❌ Error saving to inventory')
    } else {
      setStatus('✅ Photo trigger saved. PhotoRoom + AI pending...')
    }

    setLoading(false)
  }

  return (
    <div className="bg-white p-6 rounded shadow mb-6 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4">📸 Add Product from Photo</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="SKU or Filename (e.g. 2401_GoldCashmere_12oz)"
          className="p-2 border"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Product Category (e.g. Candle, Agate)"
          className="p-2 border"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 rounded"
        >
          {loading ? 'Saving...' : 'Submit to Supabase + Trigger AI'}
        </button>
      </form>
      {status && <p className="mt-2">{status}</p>}
    </div>
  )
}