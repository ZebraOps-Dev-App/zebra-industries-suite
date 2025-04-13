import { useEffect, useState } from 'react'

const exampleData = [
  { service: 'OpenAI', cost: 3.21 },
  { service: 'PhotoRoom', cost: 1.05 },
  { service: 'Supabase', cost: 0.00 },
  { service: 'Shopify API', cost: 6.90 },
  { service: 'Vercel Bandwidth', cost: 2.45 },
]

export default function TickerTape() {
  const [data, setData] = useState(exampleData)

  useEffect(() => {
    const interval = setInterval(() => {
      // future: fetch real-time cost data from Supabase or analytics endpoint
      setData([...exampleData])
    }, 3600000) // every hour
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black text-white text-xs overflow-hidden whitespace-nowrap py-1 px-3 font-mono tracking-tight animate-scroll-ticker">
      {data.map((item, index) => (
        <span key={index} className="inline-block mr-6">
          💸 {item.service}: ${item.cost.toFixed(2)}
        </span>
      ))}
    </div>
  )
}