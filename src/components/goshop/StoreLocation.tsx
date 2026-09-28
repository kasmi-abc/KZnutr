"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useI18n } from "@/i18n/LanguageProvider"
import { IconMapPin, IconInstagram, IconFacebook, IconPhone } from "@/components/Icons"

// Store links
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Mohamadia+Mall+Algiers"
const MAPS_EMBED = "https://maps.google.com/maps?q=Mohamadia%20Mall%20Algiers&t=&z=17&ie=UTF8&iwloc=&output=embed"
const INSTAGRAM_URL = "https://www.instagram.com/kznutrition/"
const FACEBOOK_URL = "/"
const PHONE_DISPLAY = "0796 85 18 07"
const PHONE_DISPLAY_2 = "0797 79 85 54"
const PHONE_LINK = "tel:+213796851807"
const PHONE_LINK_2 = "tel:+213797798554"

export function StoreLocation() {
  const { t, d } = useI18n()
  const pathname = usePathname()
  // Hide on admin pages
  if (pathname.startsWith("/admin")) return null
  return (
    <section id="location" className="bg-[#0B0B0C] py-14">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#FFD700]">
            {d.location.kicker}
          </p>
          <h2 className="section-title mt-2 text-white">{d.location.title}</h2>
          <p className="body-text mt-2 text-white/60">{d.location.sub}</p>
          <p className="mt-4 flex items-center gap-2 text-sm font-bold text-white">
            <IconMapPin className="h-5 w-5 text-[#FFD700]" />
            {d.location.address}
          </p>
          <p className="mt-2 text-xs font-bold text-white/60">{d.location.hours}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href={PHONE_LINK} className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black">
              <IconPhone className="h-4 w-4" />
              <span dir="ltr">{PHONE_DISPLAY}</span>
            </a>
            <a href={PHONE_LINK_2} className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black">
              <IconPhone className="h-4 w-4" />
              <span dir="ltr">{PHONE_DISPLAY_2}</span>
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#FFD700] px-7 py-3 text-xs font-extrabold tracking-widest text-black transition-all hover:opacity-90 active:scale-95">
              {d.location.directions}
            </a>
            <span className="text-xs font-bold text-white/60">{t("footer.followUs")}</span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-all hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-black">
              <IconInstagram className="h-5 w-5" />
            </a>
            <Link href={FACEBOOK_URL} aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-all hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-black">
              <IconFacebook className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#FFD700]/30">
          <iframe
            title="KZ Nutrition map"
            src={MAPS_EMBED}
            className="h-72 w-full border-0 md:h-80"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
