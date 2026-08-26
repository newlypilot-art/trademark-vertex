'use client';

import { useState } from 'react';
import { services } from '@/lib/services';
import { IconCheck } from './Icons';

type Errors = Partial<Record<'name' | 'email' | 'message' | 'form', string>>;

/**
 * QA #8 / #10 / #32: name, email and message are required; subject is not.
 * Every field has a persistent visible label, placeholders are hints only, and
 * option values are clean with an empty placeholder value so a blank selection
 * cannot pass validation (QA #7).
 * QA #9: a honeypot field plus a minimum time-on-form check stop naive bots.
 */
export default function LeadForm({
  email,
  compact = false,
  defaultService = '',
}: {
  email: string;
  compact?: boolean;
  defaultService?: string;
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = 'Please tell us your name.';
    if (!data.email?.trim()) next.email = 'We need an email address to reply to.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim()))
      next.email = 'That does not look like a valid email address.';
    if (!data.message?.trim()) next.message = 'Tell us a little about your brand.';
    else if (data.message.trim().length < 10)
      next.message = 'A sentence or two helps us give you a useful answer.';

    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, elapsed: Date.now() - startedAt }),
      });
      if (!res.ok) throw new Error('request failed');
      setState('sent');
      form.reset();
    } catch {
      setState('idle');
      setErrors({
        form: `Something went wrong sending that. Please email us directly at ${email}.`,
      });
    }
  }

  if (state === 'sent') {
    return (
      <div
        className="rounded-2xl border p-8 text-center"
        style={{ borderColor: 'var(--c-line)', background: 'var(--c-page)' }}
      >
        <span
          className="mx-auto grid h-14 w-14 place-items-center rounded-full"
          style={{ background: 'var(--c-accent-soft)', color: 'var(--c-primary)' }}
        >
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl">Thanks — that has reached us</h3>
        <p className="mt-2.5 text-[0.9375rem]">
          We reply to every enquiry within one business day. If it is urgent, email{' '}
          <a href={`mailto:${email}`} className="font-semibold link-underline" style={{ color: 'var(--c-primary)' }}>
            {email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="btn btn-outline mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={compact ? 'space-y-4' : 'grid gap-4 sm:grid-cols-2'}>
        <Field
          id="name"
          label="Your name"
          required
          placeholder="Jane Alvarez"
          autoComplete="name"
          error={errors.name}
        />
        <Field
          id="email"
          label="Email address"
          type="email"
          required
          placeholder="jane@yourbrand.com"
          autoComplete="email"
          error={errors.email}
        />
      </div>

      <div className={compact ? 'space-y-4' : 'grid gap-4 sm:grid-cols-2'}>
        <Field
          id="phone"
          label="Phone"
          hint="Optional"
          type="tel"
          placeholder="+1 555 000 0000"
          autoComplete="tel"
        />
        <div>
          <label className="label" htmlFor="service">
            What do you need?{' '}
            <span className="font-normal" style={{ color: 'var(--c-muted)' }}>
              Optional
            </span>
          </label>
          <select id="service" name="service" className="field" defaultValue={defaultService}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <Field
        id="mark"
        label="The name or mark"
        hint="Optional"
        placeholder="The exact wording you want to protect"
      />

      <div>
        <label className="label" htmlFor="message">
          How can we help? <span style={{ color: 'var(--c-primary)' }}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 4 : 5}
          required
          className="field resize-y"
          placeholder="Tell us what you sell under the name and where you are in the process."
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message ? <FieldError id="message-error">{errors.message}</FieldError> : null}
      </div>

      {errors.form ? (
        <p role="alert" className="text-sm font-medium" style={{ color: '#b42318' }}>
          {errors.form}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary w-full" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send my enquiry'}
      </button>

      <p className="text-[0.8rem] leading-relaxed" style={{ color: 'var(--c-muted)' }}>
        We use what you send only to answer your enquiry. No newsletters, no selling your details on.
        See our{' '}
        <a href="/privacy-policy" className="link-underline font-medium" style={{ color: 'var(--c-primary)' }}>
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  required,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}{' '}
        {required ? (
          <span style={{ color: 'var(--c-primary)' }}>*</span>
        ) : hint ? (
          <span className="font-normal" style={{ color: 'var(--c-muted)' }}>
            {hint}
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={id}
        className="field"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-[0.8125rem] font-medium" style={{ color: '#b42318' }}>
      {children}
    </p>
  );
}
