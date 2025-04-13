import TickerTape from './components/TickerTape'
// ...
<TickerTape />

import { useAuth } from './AuthContext'
import PhotoUploadTrigger from './PhotoUploadTrigger'
import InventoryGrid from './components/InventoryGrid'
// ...
<InventoryGrid />

export default function Dashboard() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">🔐 Please log in to access the dashboard.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">🧠 ZebraOps Dashboard</h1>
        <p className="text-gray-600">Welcome, {user.email}</p>
      </header>

      {/* Photo upload and AI trigger */}
      <PhotoUploadTrigger />

      {/* Placeholder for future widgets */}
      <div className="mt-10">
        <p className="text-sm text-gray-400">📦 Inventory Grid & Cost Ticker widgets coming next...</p>
      </div>
    </div>
  )
}