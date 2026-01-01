"use client";

import { motion } from "framer-motion";

export default function InvitationCard() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl p-8 text-center"
      style={{
        background: "linear-gradient(135deg, #1a5c5c 0%, #143c37 100%)",
        border: "3px solid #c9a227",
        boxShadow: "0 12px 40px rgba(20, 60, 55, 0.3), inset 0 0 60px rgba(201, 162, 39, 0.05)",
      }}
      dir="rtl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Corner ornaments */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: "#c9a227" }} />
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: "#c9a227" }} />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: "#c9a227" }} />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: "#c9a227" }} />

      {/* Header */}
      <p className="text-sm mb-6" style={{ color: "#e0cfa0" }}>בעזהשי״ת</p>
      
      {/* Opening verses */}
      <div className="text-sm mb-8 leading-loose" style={{ color: "rgba(248, 245, 240, 0.85)" }}>
        <p>נעלה את ירושלים על ראש שמחתינו</p>
        <p>עוד ישמע בערי יהודה ובחוצות ירושלים</p>
        <p>קול ששון וקול שמחה קול חתן וקול כלה</p>
      </div>

      {/* Decorative line */}
      <div className="mx-auto w-32 h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, #c9a227, transparent)" }} />

      {/* Invitation text */}
      <div className="text-sm mb-8 leading-loose" style={{ color: "rgba(248, 245, 240, 0.9)" }}>
        <p>בשבח והודאה להשי״ת על כל הטוב שנגמלנו</p>
        <p>הננו בזה להזמין את מע״כ קרובינו וידידינו</p>
        <p className="mt-3">להשתתף בשמחת כלולת בנינו היקרים ה״ה</p>
      </div>

      {/* Choson */}
      <div className="mb-6">
        <p className="text-xs" style={{ color: "#e0cfa0" }}>הבחור החתן המופלג בתו״ש</p>
        <p className="text-3xl font-bold my-3" style={{ 
          color: "#c9a227",
          textShadow: "0 0 20px rgba(201, 162, 39, 0.3)"
        }}>כמר אליהו נ״י</p>
        <p style={{ color: "#e0cfa0" }}>עכ״ג</p>
      </div>

      {/* Kallah */}
      <div className="mb-8">
        <p className="text-xs" style={{ color: "#e0cfa0" }}>הכלה הבתולה המהוללה</p>
        <p className="text-3xl font-bold my-3" style={{ 
          color: "#c9a227",
          textShadow: "0 0 20px rgba(201, 162, 39, 0.3)"
        }}>מרת שיינדל תחי׳</p>
      </div>

      {/* Decorative line */}
      <div className="mx-auto w-32 h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, #c9a227, transparent)" }} />

      {/* Date info */}
      <div className="text-sm mb-8 leading-loose" style={{ color: "rgba(248, 245, 240, 0.9)" }}>
        <p>שתתקיים אי״ה למזל טוב ובשעטומ״צ</p>
        <p>ביום ד׳ לסדר ויהי להם בתים (שמות)</p>
        <p className="text-xl font-semibold my-3" style={{ color: "#e0cfa0" }}>ח״י טבת שנת תשפ״ו לפ״ק הבע״ט</p>
        <p style={{ color: "rgba(201, 162, 39, 0.7)" }}>למספרם Jan. 7</p>
      </div>

      {/* Times */}
      <div className="rounded-xl p-5 mb-8" style={{ 
        background: "rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(201, 162, 39, 0.3)"
      }}>
        <p className="text-base font-medium" style={{ color: "#e0cfa0" }}>קבלת פנים בשעה 5:00</p>
        <p className="text-base font-medium mt-1" style={{ color: "#e0cfa0" }}>החופה בשעה 6:00</p>
      </div>

      {/* Venue */}
      <div className="mb-8">
        <p className="font-semibold text-lg" style={{ color: "#e0cfa0" }}>באולם עטרת אברהם</p>
        <p className="text-sm mt-2" dir="ltr" style={{ color: "rgba(248, 245, 240, 0.7)" }}>
          75 Ross Street, Brooklyn, New York 11249
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <a
          href="/wedding.ics"
          download="wedding.ics"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all"
          style={{
            background: "rgba(201, 162, 39, 0.2)",
            border: "1px solid #c9a227",
            color: "#e0cfa0",
          }}
        >
          <span>📅</span>
          <span>Add to Calendar</span>
        </a>
        <a
          href="https://share.google/3zC4ln2YmaLPtiSIX"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all"
          style={{
            background: "rgba(201, 162, 39, 0.2)",
            border: "1px solid #c9a227",
            color: "#e0cfa0",
          }}
        >
          <span>📍</span>
          <span>Open in Maps</span>
        </a>
      </div>

      {/* Closing */}
      <p className="text-sm mb-8" style={{ color: "rgba(248, 245, 240, 0.8)" }}>
        ידידכם המצפים לקבל פניכם בחדוה ושמחה
      </p>

      {/* Decorative line */}
      <div className="mx-auto w-48 h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, #c9a227, transparent)" }} />

      {/* Parents */}
      <div className="flex justify-between text-sm">
        <div className="text-center">
          <p className="text-xs mb-2" style={{ color: "rgba(201, 162, 39, 0.6)" }}>הורי החתן</p>
          <p className="font-medium" style={{ color: "#e0cfa0" }}>יואל לאנדא</p>
          <p style={{ color: "rgba(248, 245, 240, 0.6)" }}>וב״ב</p>
        </div>
        <div className="text-center">
          <p className="text-xs mb-2" style={{ color: "rgba(201, 162, 39, 0.6)" }}>הורי הכלה</p>
          <p className="font-medium" style={{ color: "#e0cfa0" }}>יואל יאקאבאוויטש</p>
          <p style={{ color: "rgba(248, 245, 240, 0.6)" }}>וב״ב</p>
        </div>
      </div>
    </motion.div>
  );
}
