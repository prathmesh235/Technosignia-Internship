const files = import.meta.glob("../assets/images/*.svg", { eager: true, import: "default" });

export function getImage(name) {
  return files[`../assets/images/${name}.svg`];
}

export const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");