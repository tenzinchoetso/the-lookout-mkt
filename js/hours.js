/* ==========================================================================
   The Lookout — hours & contact (one file feeds every page)
   --------------------------------------------------------------------------
   Sources, checked 5 Oct 2026:
   • Phone +91 62308 57875: Google Business Profile and Zomato agree.
   • Address & map pin: Google Business Profile; the map link in the
     Instagram bio (@thelookout.mkt) opens the same Google place.
   • Hours: Google lists 12 noon – 11 pm, every day. Zomato shows
     11:30 am – 11 pm. Not yet confirmed by the owner (see brief §4).
   • WhatsApp: we use the Google number. The owner still has to confirm
     that this number is on WhatsApp (brief §10, Q2).

   To change hours: edit the open/close times below (24-hour "HH:MM").
   ========================================================================== */

window.LOOKOUT = {
  name: "The Lookout",
  descriptor: "Rooftop Café & Bistro",
  phone: "+916230857875",
  phoneDisplay: "+91 62308 57875",
  whatsapp: "916230857875",
  address: [
    "H. no. 20 A, Block 11, New Camp",
    "Tibetan Colony, New Aruna Nagar",
    "Majnu-ka-Tilla, Delhi 110054"
  ],
  mapsUrl: "https://maps.app.goo.gl/vb3S7s3e2ycXCE1V9",
  mapsEmbed: "https://maps.google.com/maps?q=The%20lookout%20cafe%2C%20Block%2011%2C%20New%20Camp%2C%20Majnu%20ka%20Tilla%2C%20Delhi%20110054&z=17&output=embed",
  googleReviews: "https://www.google.com/maps?cid=7250532931953718865",
  instagram: "https://www.instagram.com/thelookout.mkt/",
  zomato: "https://www.zomato.com/ncr/the-lookout-majnu-ka-tila-new-delhi",
  rating: { value: "4.1", count: 428, seen: "5 Oct 2026" }
};

window.LOOKOUT_HOURS = {
  timezone: "Asia/Kolkata",
  days: [
    { day: "Monday",    open: "12:00", close: "23:00" },
    { day: "Tuesday",   open: "12:00", close: "23:00" },
    { day: "Wednesday", open: "12:00", close: "23:00" },
    { day: "Thursday",  open: "12:00", close: "23:00" },
    { day: "Friday",    open: "12:00", close: "23:00" },
    { day: "Saturday",  open: "12:00", close: "23:00" },
    { day: "Sunday",    open: "12:00", close: "23:00" }
  ]
};
