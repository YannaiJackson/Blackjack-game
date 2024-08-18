// Exporter.js
const cardImages = import.meta.glob('/src/assets/cards/*.png', { eager: true });

// Transform the imported modules to extract images directly
const cardImagesPaths = Object.fromEntries(
  Object.entries(cardImages).map(([path, module]) => [path.replace('/src/assets/cards/', ''), module.default])
);

export default cardImagesPaths;
