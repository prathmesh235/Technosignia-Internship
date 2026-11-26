// Picks the best image for a destination from src/assets/images.
// Real photos (any case: Goa.JPG, goa.jpeg, goa.jpg.jpg ...) win over the SVG placeholder.
const files = import.meta.glob("../assets/images/*", { eager: true, import: "default" });

const images = {};
for (const [path, url] of Object.entries(files)) {
  const file = path.split("/").pop();
  const isSvg = /\.svg$/i.test(file);
  const name = file.replace(/(\.(jpe?g|png|webp|avif|gif|svg))+$/i, "").toLowerCase();
  if (!images[name] || !isSvg) images[name] = url;
}

export const getImage = (name) => images[String(name).toLowerCase()];

export const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");