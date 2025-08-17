import React, { useEffect, useMemo, useRef, useState } from 'react';

// ---- i18n --------------------------------------------------------------
const I18N = {
  en: {
    brand: 'LuxeGems Boutique',
    navShop: 'Shop',
    navAbout: 'About',
    navContact: 'Contact',
    heroTitle: 'Handcrafted gemstone jewelry that tells your story.',
    heroBody:
      'Discover limited-run sets in jade, agate and more—finished with modern sparkle.',
    heroShop: 'Shop the collection',
    heroLearn: 'Learn more',
    featured: 'Featured Pieces',
    searchPh: 'Search by name, color, style…',
    or: 'or',
    add: 'Add to cart',
    view: 'View',
    crafted: 'Crafted with care',
    craftedBody:
      'Each piece is hand-assembled using carefully selected stones and inspected before shipping.',
    contactTitle: 'Questions or custom requests?',
    contactBody:
      'We can resize bracelets, adjust necklace lengths, or create matching pieces.',
    cart: 'Cart',
    yourCart: 'Your Cart',
    empty: 'Your cart is empty.',
    subtotal: 'Subtotal',
    viaPaypal: 'Pay with PayPal',
    viaStripe: 'Pay with Stripe',
    stripeNote:
      'Stripe uses Payment Links per product. With multiple items, please use PayPal or checkout each item separately.',
    close: 'Close',
  },
  km: {
    brand: 'LuxeGems Boutique',
    navShop: 'ហាង',
    navAbout: 'អំពី',
    navContact: 'ទំនាក់ទំនង',
    heroTitle: 'គ្រឿងអលង្ការថ្មធម្មជាតិ ផលិតដោយដៃ ដើម្បីប្រាប់រឿងរបស់អ្នក',
    heroBody:
      'សំណុំកម្រ បង្កប់ពន្លឺទំនើប ជាមួយជេដ អាគាត និងថ្មជ្រើសរើសផ្សេងៗ។',
    heroShop: 'ជ្រើសរើសទំនិញ',
    heroLearn: 'ស្វែងយល់បន្ថែម',
    featured: 'ផលិតផលពិសេស',
    searchPh: 'ស្វែងរកតាមឈ្មោះ ពណ៌ ស្ទីល…',
    or: 'ឬ',
    add: 'បន្ថែមទៅរទេះ',
    view: 'មើល',
    crafted: 'ផលិតដោយការយកចិត្តទុកដាក់',
    craftedBody:
      'គ្រប់ផលិតផលត្រូវបានរចនាដោយជ្រើសរើសថ្មយ៉ាងម៉ត់ចត់ ហើយពិនិត្យមើលមុនដាក់បញ្ជូន។',
    contactTitle: 'មានសំណួរ ឬចង់ប្ដូរតាមបំណង?',
    contactBody: 'យើងអាចកែទំហំ កែប្រវែង ខ្សែក ឬបង្កើតសំណុំតាមបំណងបាន។',
    cart: 'រទេះ',
    yourCart: 'រទេះទំនិញ',
    empty: 'មិនទាន់មានទំនិញទេ។',
    subtotal: 'សរុបមុន',
    viaPaypal: 'ទូទាត់តាម PayPal',
    viaStripe: 'ទូទាត់តាម Stripe',
    stripeNote:
      'Stripe ប្រើ Payment Link តាមមួយផលិតផល។ បើមានច្រើនមុខ សូមប្រើ PayPal ឬទូទាត់រៀងរាល់មុខ។',
    close: 'បិទ',
  },
};

// ---- Catalog ------------------------------------------------------------
const PRODUCTS = [
  { id: 'set-green-jade', price: 189, image: '/assets/hero1.jpg', name: { en: 'Emerald Jade Blossom Set', km: 'សំណុំផ្កាជេដពណ៌បៃតង' }, subtitle: { en: 'Necklace • Bracelet • Earrings', km: 'ខ្សែក • កងដៃ • ត្រចៀក' }, description: { en: 'Elegant green jade bead set with a floral pendant and matching pieces.', km: 'សំណុំជេដពណ៌បៃតង បន្ថែមប៉Pendant ផ្កា និងគ្រឿងផ្គូផ្គង។' } },
  { id: 'set-golden-jade', price: 219, image: '/assets/hero2.jpg', name: { en: 'Golden Honey Set', km: 'សំណុំពណ៌ទឹកឃ្មុំមាស់' }, subtitle: { en: 'Necklace • Bracelet • Earrings', km: 'ខ្សែក • កងដៃ • ត្រចៀក' }, description: { en: 'Warm golden-bead lariat necklace with crystal accents.', km: 'ខ្សែកបែប lariat ពណ៌ទឹកឃ្មុំ បន្ថែមភ្លឺប្រ៉ាឆូស្តាល់។' } },
  { id: 'bracelet-teal', price: 28, image: '/assets/hero3.jpg', name: { en: 'Teal Dream Bracelet', km: 'កងដៃពណ៌មានជ្រៅ' }, subtitle: { en: 'Bracelet', km: 'កងដៃ' }, description: { en: 'Smooth teal beads—everyday luxury.', km: 'គ្រាប់ក្រាល់ពណ៌មានជ្រៅ សម្រាប់រាល់ថ្ងៃ។' } },
  { id: 'set-ruby-agate', price: 209, image: '/assets/hero4.jpg', name: { en: 'Crimson Bloom Set', km: 'សំណុំផ្កាក្រហម' }, subtitle: { en: 'Necklace • Earrings', km: 'ខ្សែក • ត្រចៀក' }, description: { en: 'Red bead Y‑necklace with a sparkling floral centerpiece and tassels.', km: 'ខ្សែក Y ពណ៌ក្រហម កណ្តាលផ្កាភ្លឺ និងខ្សែព្រួញ។' } },
  { id: 'set-ice-jade', price: 259, image: '/assets/hero5.jpg', name: { en: 'Icy Jade Radiance Set', km: 'សំណុំជេដពណ៌ប្រផេះភ្លឺ' }, subtitle: { en: 'Necklace • Bracelet • Earrings', km: 'ខ្សែក • កងដៃ • ត្រចៀក' }, description: { en: 'Double‑strand ice‑jade with lattice crystal detailing.', km: 'ខ្សែកពីរជួរ ជេដពណ៌ប្រផេះ មានលំនាំគ្រីស្តាល់។' } },
];

// ---- Stripe Links (EMPTY) -----------------------------------------------
// Later add: { id: 'set-green-jade', url: 'https://buy.stripe.com/...' }
const STRIPE_PRODUCTS = [];

const currency = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });

export default function App() {
  const [lang, setLang] = useState('en');
  const t = (k) => I18N[lang][k] ?? k;
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]); // { id, qty }
  const [viewer, setViewer] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const paypalRef = useRef(null);
  const [paypalReady, setPaypalReady] = useState(false);

  const results = useMemo(
    () => PRODUCTS.filter((p) => (p.name[lang] + ' ' + p.description[lang]).toLowerCase().includes(query.toLowerCase())),
    [query, lang]
  );

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + (PRODUCTS.find((p) => p.id === i.id)?.price ?? 0) * i.qty, 0),
    [cart]
  );

  // Detect PayPal SDK
  useEffect(() => {
    const id = setInterval(() => {
      if (window.paypal) { setPaypalReady(true); clearInterval(id); }
    }, 300);
    return () => clearInterval(id);
  }, []);

  // Render PayPal when drawer opens
  useEffect(() => {
    if (!drawer || !paypalReady || !paypalRef.current) return;
    paypalRef.current.innerHTML = '';
    window.paypal.Buttons({
      style: { layout: 'vertical' },
      createOrder: (data, actions) => actions.order.create({ purchase_units: [{ amount: { value: total.toFixed(2) } }] }),
      onApprove: async (data, actions) => {
        try {
          await actions.order.capture();
          alert("Payment successful! We'll email you a confirmation.");
          setCart([]);
          setDrawer(false);
        } catch (e) {
          alert('Payment error: ' + e.message);
        }
      },
    }).render(paypalRef.current);
  }, [drawer, paypalReady, total]);

  const addToCart = (id) =>
    setCart((c) => {
      const f = c.find((x) => x.id === id);
      return f ? c.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)) : [...c, { id, qty: 1 }];
    });

  const stripeCheckout = () => {
    if (cart.length !== 1) {
      alert(I18N[lang].stripeNote);
      return;
    }
    const rec = STRIPE_PRODUCTS.find((x) => x.id === cart[0].id);
    if (rec?.url) {
      window.open(rec.url, '_blank');
    } else {
      alert('Stripe product array is empty. Add your Payment Link later in STRIPE_PRODUCTS.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold tracking-wide text-lg">{t('brand')}</div>
          <nav className="hidden md:flex gap-6 text-sm ml-6">
            <a className="hover:underline" href="#shop">{t('navShop')}</a>
            <a className="hover:underline" href="#about">{t('navAbout')}</a>
            <a className="hover:underline" href="#contact">{t('navContact')}</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setLang((l) => (l === 'en' ? 'km' : 'en'))} className="px-3 py-1 rounded-full border text-sm">
              {lang === 'en' ? 'ខ្មែរ' : 'EN'}
            </button>
            <button onClick={() => setDrawer(true)} className="px-3 py-2 rounded-full bg-black text-white flex items-center gap-2">
              <span>👜</span>
              <span className="hidden sm:inline">{t('cart')}</span>
              {cart.length > 0 && (
                <span className="ml-1 text-xs bg-rose-600 text-white rounded-full px-1.5">{cart.reduce((a, b) => a + b.qty, 0)}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-white to-emerald-100" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 items-center gap-8">
          <div>
            <h1 className="text-4xl font-bold leading-tight">{t('heroTitle')}</h1>
            <p className="mt-4 text-neutral-600 max-w-prose">{t('heroBody')}</p>
            <div className="mt-6 flex gap-3">
              <a href="#shop" className="px-5 py-3 rounded-xl bg-emerald-600 text-white">{t('heroShop')}</a>
              <a href="#about" className="px-5 py-3 rounded-xl border">{t('heroLearn')}</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {PRODUCTS.slice(0, 4).map((p) => (
              <button key={p.id} onClick={() => setViewer(p)} className="aspect-square rounded-2xl overflow-hidden ring-1 ring-black/10">
                <img src={p.image} alt={p.name[lang]} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
          <div className="flex-1"><h2 className="text-2xl font-semibold">{t('featured')}</h2></div>
          <div className="flex-1 flex items-center gap-3">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('searchPh')} className="w-full md:max-w-sm px-3 py-2 rounded-xl border" />
            <div className="hidden md:block text-sm text-neutral-500">{t('or')}</div>
          </div>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((p) => (
            <article key={p.id} className="rounded-2xl overflow-hidden ring-1 ring-black/10 bg-white">
              <button onClick={() => setViewer(p)} className="block w-full aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.name[lang]} className="w-full h-full object-cover" />
              </button>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.name[lang]}</h3>
                <div className="text-sm text-neutral-500">{p.subtitle[lang]}</div>
                <p className="mt-2 text-sm text-neutral-600">{p.description[lang]}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold">{currency.format(p.price)}</span>
                  <div className="flex gap-2">
                    <button onClick={() => addToCart(p.id)} className="px-4 py-2 rounded-xl bg-black text-white">{t('add')}</button>
                    <button onClick={() => setViewer(p)} className="px-4 py-2 rounded-xl border">{t('view')}</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold">{t('crafted')}</h2>
          <p className="mt-3 text-neutral-700">{t('craftedBody')}</p>
        </div>
        <img src="/assets/hero5.jpg" alt="studio" className="rounded-2xl ring-1 ring-black/10" />
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-4 pb-24">
        <div className="rounded-2xl ring-1 ring-black/10 bg-white p-6 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold">{t('contactTitle')}</h2>
            <p className="mt-3 text-neutral-700">{t('contactBody')}</p>
          </div>
          <div className="text-sm text-neutral-600">
            <p>Email: hello@luxegems.example</p>
            <p>WhatsApp: +855 00 000 000</p>
          </div>
        </div>
      </section>

      {drawer && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t('yourCart')}</h3>
              <button onClick={() => setDrawer(false)} className="px-3 py-2 rounded-md border">{t('close')}</button>
            </div>
            <div className="mt-4 space-y-4 flex-1 overflow-auto">
              {cart.length === 0 && <div className="text-neutral-500">{t('empty')}</div>}
              {cart.map((i) => {
                const p = PRODUCTS.find((x) => x.id === i.id);
                return (
                  <div key={i.id} className="flex gap-3 items-center">
                    <img src={p.image} alt="" className="w-16 h-16 rounded-lg object-cover ring-1 ring-black/10" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{p.name[lang]}</div>
                      <div className="text-sm text-neutral-500">{currency.format(p.price)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 rounded-md border" onClick={() => setCart((c) => c.map((x) => (x.id === i.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)))}>-</button>
                      <div className="w-6 text-center">{i.qty}</div>
                      <button className="px-2 py-1 rounded-md border" onClick={() => setCart((c) => c.map((x) => (x.id === i.id ? { ...x, qty: x.qty + 1 } : x)))}>+</button>
                    </div>
                    <button className="ml-2 text-sm text-rose-600" onClick={() => setCart((c) => c.filter((x) => x.id !== i.id))}>Remove</button>
                  </div>
                );
              })}
            </div>
            <div className="pt-4 border-t border-black/5">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>{t('subtotal')}</span>
                <span>{currency.format(total)}</span>
              </div>
              <div className="mt-4 grid gap-2">
                <button onClick={stripeCheckout} className="px-5 py-3 rounded-xl border">{t('viaStripe')}</button>
                <div className="px-0 py-0" ref={paypalRef} />
              </div>
              <p className="text-xs text-neutral-500 mt-2">{I18N[lang].stripeNote}</p>
            </div>
          </aside>
        </div>
      )}

      {viewer && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setViewer(null)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden ring-1 ring-black/10">
              <img src={viewer.image} alt={viewer.name[lang]} className="w-full h-[60vh] object-contain bg-black/5" />
              <div className="p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-semibold">{viewer.name[lang]}</div>
                  <div className="text-sm text-neutral-500">{viewer.subtitle[lang]}</div>
                  <p className="mt-1 text-neutral-700">{viewer.description[lang]}</p>
                </div>
                <div className="grid gap-2 w-full md:w-auto">
                  <div className="text-lg font-semibold text-right md:text-left">{currency.format(viewer.price)}</div>
                  <button className="px-5 py-3 rounded-xl bg-black text-white" onClick={() => { addToCart(viewer.id); setViewer(null); }}>{t('add')}</button>
                  <button className="px-5 py-3 rounded-xl border" onClick={() => setViewer(null)}>{t('close')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
