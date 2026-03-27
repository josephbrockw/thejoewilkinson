"use client";

import { useState } from "react";
import { AppButton } from "@/components/AppButton";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <AppButton href="/" variant="ghost-dark" size="md">
              ← Back to Home
            </AppButton>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-forest mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Have an idea that needs to ship? I&apos;d love to hear about it.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 px-4">
        <div className="max-w-xl mx-auto">
          {status === "success" ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl font-bold text-forest mb-3">Message sent!</h2>
              <p className="text-gray-500 mb-8">Thanks for reaching out — I&apos;ll get back to you soon.</p>
              <AppButton href="/" variant="ghost-dark" size="md">← Back to Home</AppButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-forest mb-1.5" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-forest mb-1.5" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-forest mb-1.5" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project or idea..."
                  value={form.message}
                  onChange={handleChange}
                  className={inputCls + " resize-none"}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">{errorMsg}</p>
              )}

              <AppButton
                type="submit"
                variant="primary"
                disabled={status === "loading"}
                className="w-full justify-center"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </AppButton>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
