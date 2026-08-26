'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconShield } from './Icons';

export default function DashboardLogin({ brand }: { brand: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Login failed');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Login failed');
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-5" style={{ background: 'var(--c-surface)' }}>
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border p-8"
        style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
      >
        <span
          className="grid h-12 w-12 place-items-center rounded-xl text-white"
          style={{ background: 'var(--c-primary)' }}
        >
          <IconShield className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold">Site dashboard</h1>
        <p className="mt-2 text-[0.9rem]">
          Enter the dashboard password to edit {brand}&rsquo;s branding, colours and content.
        </p>

        <div className="mt-6">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
        </div>

        {error ? (
          <p role="alert" className="mt-3 text-[0.8125rem] font-medium" style={{ color: '#b42318' }}>
            {error}
          </p>
        ) : null}

        <button type="submit" className="btn btn-primary mt-5 w-full" disabled={busy}>
          {busy ? 'Checking…' : 'Log in'}
        </button>

        <p className="mt-5 text-[0.75rem] leading-relaxed" style={{ color: 'var(--c-muted)' }}>
          The password is set as DASHBOARD_PASSWORD in your .env.local file. Change it from the
          default before this site goes live.
        </p>
      </form>
    </div>
  );
}
