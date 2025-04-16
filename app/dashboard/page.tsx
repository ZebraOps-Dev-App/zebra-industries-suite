import React from 'react';

const DashboardPage = () => {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">🧠 CrewAI Ops Dashboard</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold">Last GitHub Sync</h2>
        <p>Status: ✅ App installed & listening</p>
        <p>Repo: <code>zebra-industries-suite</code></p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold">Latest Config</h2>
        <p>settings_data.json synced. Ready for WebManager render.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Next Actions</h2>
        <ul className="list-disc list-inside">
          <li>Inject product prompts</li>
          <li>Activate scanner logic</li>
          <li>Approve layout tweaks from WebManager</li>
        </ul>
      </section>
    </main>
  );
};

export default DashboardPage;

