"use client"
import { useState } from "react"
import Link from "next/link"
import { useI18n } from "@/i18n/LanguageProvider"

// Store contact links
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Mohamadia+Mall+Algiers"
const INSTAGRAM_URL = "https://www.instagram.com/kznutrition/"

export default function ContactPage() {
  const { t, d } = useI18n()
  const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" })
  const [done, setDone] = useState(false)
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr("")
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) { setErr(t("contact.err")); setLoading(false); return }
      setDone(true)
      setForm({ name: "", phone: "", subject: "", message: "" })
    } catch {
      setErr(t("contact.err"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <p className="text-sm text-zinc-500">
        <Link href="/" className="hover:underline">{t("breadcrumb.home")}</Link>
        <span className="mx-1">›</span>
        <span className="text-black font-bold">{t("contact.title")}</span>
      </p>
      <h1 className="text-3xl font-black mt-2">{t("contact.title")}</h1>
      <p className="text-sm text-zinc-600 mt-1">{t("contact.sub")}</p>

      {/* Store info cards */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-[#E8CF4D]/30 bg-white p-4 text-sm font-bold hover:border-[#FFD700]">
          {d.location.address}
        </a>
        <div className="rounded-2xl border border-[#E8CF4D]/30 bg-white p-4 text-sm font-bold">
          <p dir="ltr">0796 85 18 07</p>
          <p dir="ltr" className="mt-1">0797 79 85 54</p>
        </div>
        <div className="rounded-2xl border border-[#E8CF4D]/30 bg-white p-4 text-sm font-bold">
          {d.location.hours}
        </div>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-[#E8CF4D]/30 bg-white p-4 text-sm font-bold hover:border-[#FFD700]">
          Instagram: @kznutrition
        </a>
      </div>

      {done ? (
        <div className="bg-[#E6F4EA] border border-[#137333]/30 rounded-2xl p-6 mt-6 text-center">
          <p className="font-black text-[#137333]">{t("contact.sentOk")}</p>
          <Link href="/products" className="inline-block mt-4 bg-[#0B0B0C] text-white px-6 py-2 rounded-full text-sm font-black">{t("actions.shopNow")}</Link>
        </div>
      ) : (
        <form onSubmit={send} className="bg-white border border-[#E8CF4D]/20 rounded-2xl p-6 mt-6 space-y-4">
          <input placeholder={t("contact.namePh")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80} className="w-full border border-[#E8CF4D]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FFD700]" required />
          <input placeholder={t("contact.phonePh")} dir="ltr" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9+\s]/g, "") })} maxLength={20} className="w-full border border-[#E8CF4D]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FFD700] text-start" required />
          <input placeholder={t("contact.subjectPh")} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={120} className="w-full border border-[#E8CF4D]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FFD700]" />
          <textarea placeholder={t("contact.msgPh")} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} rows={5} className="w-full border border-[#E8CF4D]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FFD700]" required />
          {err && <p className="text-sm text-red-600 font-bold">{err}</p>}
          <button type="submit" disabled={loading} className="w-full bg-[#FFD700] text-black py-3.5 rounded-full font-black disabled:opacity-60">
            {loading ? "..." : t("contact.send")}
          </button>
        </form>
      )}
    </div>
  )
}
