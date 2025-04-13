import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">🐾 ZebraOps PWA</h1>
        {user ? (
          <p>Welcome, {user.email}</p>
        ) : (
          <button
            className="px-4 py-2 bg-black text-white rounded"
            onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          >
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );
}

export default App;