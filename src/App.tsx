import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import productsData from "./data/products.json";

type Product = {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  price: string;
  badge: string;
  image: string;
  alt: string;
  secondaryImage?: string;
  secondaryAlt?: string;
  points: string[];
};

const instagramUrl =
  "https://www.instagram.com/fromnaniwithlove?igsh=cHMxbGRjYmk1cA==";

const products: Product[] = productsData;

const parseInrPrice = (price: string) => Number(price.replace(/[^0-9]/g, "")) || 0;

function CartButton({ cartCount }: { cartCount: number }) {
  return (
    <Link
      to="/checkout"
      aria-label="Open cart"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d8c4ad] text-[#3f2a1f] transition-colors hover:bg-[#f0e4d3] focus-visible:ring-2 focus-visible:ring-[#c15c4e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f4ed]"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="20" r="1" />
        <circle cx="17" cy="20" r="1" />
        <path d="M3 4h2l2.6 10.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 7H7" />
      </svg>
      {cartCount > 0 ? (
        <span className="absolute -top-1 -right-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#c15c4e] px-1.5 text-[10px] font-semibold leading-none text-white">
          {cartCount}
        </span>
      ) : null}
    </Link>
  );
}

function ProductCardSlideshow({ product }: { product: Product }) {
  const imageSet = product.secondaryImage
    ? [
        { src: product.image, alt: product.alt },
        { src: product.secondaryImage, alt: product.secondaryAlt ?? product.alt },
      ]
    : [{ src: product.image, alt: product.alt }];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    if (imageSet.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % imageSet.length);
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [product.slug, imageSet.length]);

  const currentImage = imageSet[activeIndex];

  return (
    <div className="relative h-64 bg-[#f0e4d3] sm:h-72 lg:h-80">
      <img
        src={currentImage.src}
        alt={currentImage.alt}
        className={`h-full w-full ${product.slug === "asmaan-sa-bunting" ? "object-contain bg-[#f5efe4]" : "object-cover"}`}
      />
      {imageSet.length > 1 ? (
        <div className="absolute right-3 bottom-3 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold text-white">
          {activeIndex + 1}/{imageSet.length}
        </div>
      ) : null}
      <span className="absolute top-4 left-4 rounded-full bg-[#c15c4e] px-4 py-1 text-xs font-semibold tracking-wide text-white">
        {product.badge}
      </span>
    </div>
  );
}

function HomePage({
  onAddToCart,
  cartCount,
  cartStatusMessage,
  cartStatusType,
}: {
  onAddToCart: (slug: string) => void;
  cartCount: number;
  cartStatusMessage: string;
  cartStatusType: "success" | "error" | "";
}) {
  const productNames = useMemo(() => products.map((item) => item.name), []);
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [customizationNotes, setCustomizationNotes] = useState("");
  const [customizationError, setCustomizationError] = useState("");

  const handleCustomizationInstagram = () => {
    if (!customerName.trim() || !selectedProduct.trim() || !customizationNotes.trim()) {
      setCustomizationError("Please fill out the details");
      return;
    }
    setCustomizationError("");
    window.open(instagramUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="scroll-smooth bg-[#f9f4ed] pb-24 text-[#3f2a1f] sm:pb-0">
      <a
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-50 inline-flex items-center justify-center rounded-full bg-[#c15c4e] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_28px_rgba(193,92,78,0.38)] transition-transform hover:scale-105 sm:right-6 sm:px-5 sm:py-3 sm:text-sm"
      >
        Order on Instagram
      </a>

      <header className="sticky top-0 z-40 border-b border-[#e8d9c9] bg-[#f9f4ed]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-8">
          <Link to="/" className="font-serif text-base leading-tight font-semibold tracking-wide sm:text-xl">
            From Nani With Love
          </Link>
          <nav className="hidden gap-8 text-sm text-[#5c4635] md:flex">
            <a href="#why-moms" className="hover:text-[#c15c4e]">
              Why Moms Choose Us
            </a>
            <a href="#customize" className="hover:text-[#c15c4e]">
              Customize
            </a>
            <a href="#story" className="hover:text-[#c15c4e]">
              Our Story
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-[#c15c4e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a44a3d] sm:inline-flex"
            >
              Order on Instagram
            </a>
            <CartButton cartCount={cartCount} />
          </div>
        </div>
      </header>

      <section className="relative flex min-h-[78svh] items-center justify-center overflow-hidden sm:min-h-[88svh]">
        <img
          src="/hero-brand-image.jpg"
          alt="From Nani With Love brand background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/8" />
      </section>

      <section className="bg-[#3f2a1f] px-4 py-4 text-center text-[10px] tracking-[0.08em] text-[#c8a96e] uppercase sm:px-6 sm:text-xs sm:tracking-[0.12em] md:text-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <span>Starting at INR 999</span>
          <span>Safe for 0+</span>
          <span>100% Handmade</span>
          <span>Ships Across India</span>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
        <p className="text-base leading-8 text-[#5c4635] md:text-xl md:leading-9">
          We grew up around things stitched by hand. Pieces that stayed in the family, came out every year, and felt like home. From Nani With Love brings that feeling back to modern celebrations.
        </p>
      </section>

      <section id="why-moms" className="bg-[#f0e4d3] px-4 py-14 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl"
        >
          <h2 className="text-center font-serif text-3xl md:text-4xl">Why Moms Choose Us</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[#5c4635]">
            Beautiful keepsakes, soft fabrics, and easy customization for your celebrations.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              "Soft fabric details",
              "Designed for milestone memories",
              "Gentle baby-friendly materials",
              "Reusable every year",
              "Custom colors and text",
              "Direct support on Instagram",
            ].map((item) => (
              <div key={item} className="bg-white p-5 text-center sm:p-6">
                <p className="font-serif text-lg sm:text-xl">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="collection" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-center font-serif text-3xl md:text-4xl">Our Collection</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center leading-8 text-[#5c4635]">
          Click any product to open its full page with details and ordering options.
        </p>
        {cartStatusMessage ? (
          <p className={`mt-3 text-center text-xs ${cartStatusType === "error" ? "text-red-600" : "text-emerald-700"}`}>
            {cartStatusMessage}
          </p>
        ) : null}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product, i) => (
            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
                className="cursor-pointer overflow-hidden bg-white shadow-[0_10px_36px_rgba(63,42,31,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
              onClick={() => navigate(`/product/${product.slug}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(`/product/${product.slug}`);
                }
              }}
            >
              <ProductCardSlideshow product={product} />
              <div className="space-y-4 p-5 sm:p-7">
                <h3 className="font-serif text-xl leading-tight sm:text-2xl">{product.name}</h3>
                <p className="text-[#c15c4e] italic">{product.subtitle}</p>
                <div className="flex flex-col items-start gap-3 border-t border-[#eee2d5] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-serif text-2xl sm:text-3xl">{product.price}</span>
                  <div className="flex w-full gap-2 sm:w-auto">
                    <a
                      href="#"
                      className="inline-flex w-full items-center justify-center rounded-full border border-[#3f2a1f] px-4 py-2.5 text-xs font-semibold hover:bg-[#3f2a1f] hover:text-white sm:w-auto"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onAddToCart(product.slug);
                      }}
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="customize" className="bg-[#f0e4d3] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl bg-white p-6 shadow-[0_10px_30px_rgba(63,42,31,0.08)] sm:p-8 md:p-10">
          <h2 className="text-center font-serif text-3xl md:text-4xl">Customization</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[#5c4635]">
            Share your idea and we will help you personalize the product.
          </p>
          <div className="mt-8 grid gap-4">
            <input
              name="name"
              required
              value={customerName}
              onChange={(event) => {
                const onlyLetters = event.target.value.replace(/[^A-Za-z\s]/g, "");
                setCustomerName(onlyLetters);
                if (customizationError) setCustomizationError("");
              }}
              pattern="[A-Za-z\s]+"
              title="Please use letters only"
              placeholder="Your name"
              className="border border-[#e5d4c2] px-4 py-3 text-base outline-none focus:border-[#c15c4e]"
            />
            <select
              name="product"
              required
              value={selectedProduct}
              onChange={(event) => {
                setSelectedProduct(event.target.value);
                if (customizationError) setCustomizationError("");
              }}
              className="border border-[#e5d4c2] bg-white px-4 py-3 text-base outline-none focus:border-[#c15c4e]"
            >
              <option value="" disabled>
                Select product
              </option>
              {productNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <textarea
              name="notes"
              required
              rows={4}
              value={customizationNotes}
              onChange={(event) => {
                setCustomizationNotes(event.target.value);
                if (customizationError) setCustomizationError("");
              }}
              placeholder="Tell us colors, name text, age, theme"
              className="border border-[#e5d4c2] px-4 py-3 text-base outline-none focus:border-[#c15c4e]"
            />
            {customizationError ? (
              <p className="text-xs text-red-600">{customizationError}</p>
            ) : null}
            <button
              type="button"
              onClick={handleCustomizationInstagram}
              className="mt-2 block rounded-full bg-[#c15c4e] px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-[#a44a3d]"
            >
              Submit on Instagram
            </button>
          </div>
        </div>
      </section>

      <section id="story" className="bg-[#3f2a1f] px-4 py-14 text-center text-white sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="font-serif text-3xl text-[#c8a96e] md:text-4xl">Why This Brand Exists</h2>
          <p className="mt-6 leading-8 text-white/90 md:leading-9">
            From Nani With Love was born from a simple belief: the most meaningful things are made with love, patience, and a personal touch. What started as creating special pieces for little ones and celebrations has grown into a space where every bunting, banner, and keepsake is handcrafted just for the family receiving it. We do not believe in mass production or one-size-fits-all designs. Each order is thoughtfully made, customized to your vision, and crafted with the same care a nani would pour into something for her own grandchildren. At From Nani With Love, we celebrate childhood, family traditions, birthdays, milestones, and the little moments that become cherished memories. Every stitch, cut, and detail is created by hand, turning simple decorations into keepsakes that tell a story. Because some things are too special to come off an assembly line - they should come from nani, with love. ❤️
          </p>
        </motion.div>
      </section>

      <section className="bg-gradient-to-br from-[#3f2a1f] to-[#5c3d2e] px-4 py-14 text-center text-white sm:px-6 sm:py-20">
        <h2 className="font-serif text-3xl text-[#c8a96e] md:text-4xl">Ready to Create Something Beautiful?</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/90">
          Connect directly and we will help you choose the right piece for your celebration.
        </p>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-[#3f2a1f]"
        >
          Chat with Neha
        </a>
      </section>

      <footer className="bg-[#1a0f0a] px-4 py-12 text-center text-sm text-[#c8a96eb5] sm:px-6">
        <p className="font-serif text-2xl text-[#c8a96e]">From Nani With Love</p>
        <p className="mt-2">By Neha, for families across India.</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
          <a href="#why-moms" className="hover:text-[#c8a96e]">
            Why Moms Choose Us
          </a>
          <a href="#customize" className="hover:text-[#c8a96e]">
            Customize
          </a>
          <a href="#story" className="hover:text-[#c8a96e]">
            Our Story
          </a>
        </div>
      </footer>
    </div>
  );
}

function ProductPage({ cartCount }: { cartCount: number }) {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [slug]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f9f4ed] px-6 text-center">
        <div>
          <h1 className="font-serif text-4xl">Product Not Found</h1>
          <Link to="/" className="mt-5 inline-block rounded-full bg-[#3f2a1f] px-6 py-3 text-white">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const imageSet = product.secondaryImage
    ? [
        { src: product.image, alt: product.alt },
        { src: product.secondaryImage, alt: product.secondaryAlt ?? product.alt },
      ]
    : [{ src: product.image, alt: product.alt }];

  const goToPrevImage = () => {
    setActiveImageIndex((current) => (current - 1 + imageSet.length) % imageSet.length);
  };

  const goToNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % imageSet.length);
  };

  return (
    <div className="min-h-screen bg-[#f9f4ed] px-4 py-8 pb-24 text-[#3f2a1f] sm:px-6 sm:py-12 sm:pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="inline-block rounded-full border border-[#d8c4ad] px-4 py-2 text-sm">
            Back to Home
          </Link>
          <CartButton cartCount={cartCount} />
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden bg-white p-2">
            <img
              src={imageSet[activeImageIndex].src}
              alt={imageSet[activeImageIndex].alt}
              className={`h-full min-h-[240px] w-full sm:min-h-[340px] lg:min-h-[420px] ${product.slug === "asmaan-sa-bunting" ? "object-contain bg-[#f5efe4]" : "object-cover"}`}
            />
            {imageSet.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goToPrevImage}
                  className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-white"
                  aria-label="View previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goToNextImage}
                  className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-white"
                  aria-label="View next image"
                >
                  ›
                </button>
                <div className="absolute right-4 bottom-4 rounded-full bg-black/55 px-2 py-1 text-xs font-semibold text-white">
                  {activeImageIndex + 1}/{imageSet.length}
                </div>
              </>
            ) : null}
          </div>
          <div className="space-y-5">
            <p className="inline-block rounded-full bg-[#c15c4e] px-4 py-1 text-xs font-semibold tracking-wide text-white">
              {product.badge}
            </p>
            <h1 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">{product.name}</h1>
            <p className="text-lg italic text-[#c15c4e]">{product.subtitle}</p>
            <p className="border-l-2 border-[#c8a96e] bg-[#f0e4d3] px-4 py-3 italic text-[#5c4635]">{product.tagline}</p>
            <p className="leading-8 text-[#5c4635]">{product.description}</p>
            <ul className="space-y-2 text-[#5c4635]">
              {product.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
            <p className="font-serif text-3xl sm:text-4xl">{product.price}</p>
            <div className="pt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full bg-[#c15c4e] px-6 py-3 font-semibold text-white"
              >
                Order on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutPage({
  cartItems,
  onDecreaseItem,
  onIncreaseItem,
  cartStatusMessage,
  cartStatusType,
}: {
  cartItems: Array<{ product: Product; quantity: number }>;
  onDecreaseItem: (slug: string) => void;
  onIncreaseItem: (slug: string) => void;
  cartStatusMessage: string;
  cartStatusType: "success" | "error" | "";
}) {
  const totalCost = cartItems.reduce((sum, item) => sum + parseInrPrice(item.product.price) * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f9f4ed] px-4 py-8 pb-24 text-[#3f2a1f] sm:px-6 sm:py-12 sm:pb-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="inline-block rounded-full border border-[#d8c4ad] px-4 py-2 text-sm">
            Back to Home
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl">Checkout</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-8 bg-white p-8 text-center shadow-[0_10px_30px_rgba(63,42,31,0.08)]">
            <p className="text-lg">Your cart is empty.</p>
            <Link to="/#collection" className="mt-4 inline-block rounded-full border border-[#3f2a1f] px-5 py-2 text-sm font-semibold hover:bg-[#3f2a1f] hover:text-white">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {cartStatusMessage ? (
              <p className={`text-xs ${cartStatusType === "error" ? "text-red-600" : "text-emerald-700"}`}>{cartStatusMessage}</p>
            ) : null}
            {cartItems.map((item) => {
              const itemTotal = parseInrPrice(item.product.price) * item.quantity;
              return (
                <div
                  key={item.product.slug}
                  className="flex flex-col items-start gap-3 bg-white p-4 shadow-[0_8px_24px_rgba(63,42,31,0.08)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
                >
                  <div>
                    <p className="font-serif text-xl">{item.product.name}</p>
                    <p className="text-sm text-[#5c4635]">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-3">
                    <p className="font-semibold">INR {itemTotal.toLocaleString("en-IN")}</p>
                    <button
                      type="button"
                      onClick={() => onDecreaseItem(item.product.slug)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#3f2a1f] text-sm font-semibold hover:bg-[#3f2a1f] hover:text-white"
                      aria-label={`Decrease ${item.product.name} quantity`}
                    >
                      -
                    </button>
                    <span className="min-w-5 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onIncreaseItem(item.product.slug)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#3f2a1f] text-sm font-semibold hover:bg-[#3f2a1f] hover:text-white"
                      aria-label={`Increase ${item.product.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="mt-2 flex items-center justify-between border-t border-[#d8c4ad] pt-5 text-xl font-semibold">
              <span>Total</span>
              <span>INR {totalCost.toLocaleString("en-IN")}</span>
            </div>

            <div className="mt-6 bg-white p-5 text-center shadow-[0_10px_30px_rgba(63,42,31,0.08)] sm:p-6">
              <h2 className="font-serif text-2xl">UPI Payment</h2>
              <img
                src="/payment/upi-qr-placeholder.jpg"
                alt="UPI QR code for payment"
                className="mx-auto mt-4 w-full max-w-[340px] rounded-md border border-[#e5d4c2]"
              />
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#5c4635] sm:text-base">
                After making the payment, share the payment screenshot on our Instagram account.
              </p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-full bg-[#c15c4e] px-6 py-3 text-sm font-semibold text-white sm:text-base"
              >
                Share Screenshot on Instagram
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f4ed] px-4 text-center">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl">Page Not Found</h1>
        <p className="mt-2 text-[#5c4635]">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-5 inline-block rounded-full bg-[#3f2a1f] px-6 py-3 text-white">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartStatusMessage, setCartStatusMessage] = useState("");
  const [cartStatusType, setCartStatusType] = useState<"success" | "error" | "">("");

  const addToCart = (slug: string) => {
    setCart((current) => {
      const currentQty = current[slug] || 0;
      if (currentQty >= 6) {
        setCartStatusType("error");
        setCartStatusMessage("Maximum quantity per product is six. For larger orders, please contact the owner.");
        return current;
      }
      setCartStatusType("success");
      setCartStatusMessage("Product added to cart.");
      return {
        ...current,
        [slug]: currentQty + 1,
      };
    });
  };

  const decreaseCartItem = (slug: string) => {
    setCart((current) => {
      const currentQty = current[slug] || 0;
      setCartStatusMessage("");
      setCartStatusType("");
      if (currentQty <= 1) {
        const next = { ...current };
        delete next[slug];
        return next;
      }
      return {
        ...current,
        [slug]: currentQty - 1,
      };
    });
  };

  const increaseCartItem = (slug: string) => {
    setCart((current) => {
      const currentQty = current[slug] || 0;
      if (currentQty >= 6) {
        setCartStatusType("error");
        setCartStatusMessage("Maximum quantity per product is six. For larger orders, please contact the owner.");
        return current;
      }
      setCartStatusType("success");
      setCartStatusMessage("Cart quantity updated.");
      return {
        ...current,
        [slug]: currentQty + 1,
      };
    });
  };

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartItems = Object.entries(cart)
    .map(([slug, quantity]) => {
      const product = products.find((item) => item.slug === slug);
      return product ? { product, quantity } : null;
    })
    .filter((item): item is { product: Product; quantity: number } => item !== null);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            onAddToCart={addToCart}
            cartCount={cartCount}
            cartStatusMessage={cartStatusMessage}
            cartStatusType={cartStatusType}
          />
        }
      />
      <Route path="/product/:slug" element={<ProductPage cartCount={cartCount} />} />
      <Route
        path="/checkout"
        element={
          <CheckoutPage
            cartItems={cartItems}
            onDecreaseItem={decreaseCartItem}
            onIncreaseItem={increaseCartItem}
            cartStatusMessage={cartStatusMessage}
            cartStatusType={cartStatusType}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}