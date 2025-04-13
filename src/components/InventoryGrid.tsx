import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

interface InventoryItem {
  id: string
  product_name: string
  sku: string
  quantity: number
  retail_price: number
  wholesale_price: number
  cogs: number
  business_unit: string
}

export default function InventoryGrid() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInventory = async () => {
      const { data, error } = await supabase.from('inventory').select('*')
      if (error) console.error('Error fetching inventory:', error)
      else setItems(data)
      setLoading(false)
    }

    fetchInventory()
  }, [])

  if (loading) return <p className="text-sm text-gray-500">Loading inventory...</p>

  return (
    <div className="overflow-x-auto border rounded-md bg-white shadow-md">
      <table className="table-auto w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Product</th>
            <th className="p-2">SKU</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Retail</th>
            <th className="p-2">Wholesale</th>
            <th className="p-2">COGS</th>
            <th className="p-2">Unit</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="hover:bg-gray-50 border-t">
              <td className="p-2">{item.product_name}</td>
              <td className="p-2">{item.sku}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">${item.retail_price.toFixed(2)}</td>
              <td className="p-2">${item.wholesale_price.toFixed(2)}</td>
              <td className="p-2">${item.cogs.toFixed(2)}</td>
              <td className="p-2">{item.business_unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
