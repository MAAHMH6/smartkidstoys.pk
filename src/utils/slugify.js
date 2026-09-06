/**
 * Utility functions for URL slug generation and Category SEO metadata
 */

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export const CATEGORIES_DATA = [
  {
    id: 'baby-toddler',
    name: 'Baby & Toddler',
    slug: 'baby-toddler',
    icon: 'Baby',
    description: 'Safe, sensory-rich, and soft educational toys designed specifically for newborns, infants, and toddlers (Ages 0-3).',
    seoTitle: 'Baby & Toddler Toys Online in Pakistan | Smart Kids Toys',
    seoDescription: 'Shop safe, non-toxic baby toys and toddler learning sets in Pakistan. Fast delivery in Karachi, Lahore, Islamabad, and nationwide.',
    keywords: 'baby toys pakistan, toddler learning toys, rattle toys, infant sensory toys, smart kids toys',
    content: `Welcome to our curated Baby & Toddler collection. Every toy in this collection is crafted from child-safe, non-toxic BPA-free materials with smooth edges. From soothing teethers and tactile musical rattles to stackable building cups and Montessori busy boards, our toys stimulate cognitive growth, motor skill refinement, and auditory recognition during the crucial first 1,000 days of childhood development. Explore our top-rated baby toys with express cash-on-delivery across Pakistan.`
  },
  {
    id: 'educational',
    name: 'Educational',
    slug: 'educational',
    icon: 'GraduationCap',
    description: 'STEM kits, Montessori toys, interactive learning games, and brain teasers for young thinkers and innovators.',
    seoTitle: 'Educational & STEM Toys for Kids in Pakistan | Smart Kids Toys',
    seoDescription: 'Discover STEM building sets, science experiment kits, and Montessori learning toys in Pakistan. Boost creativity and problem-solving skills.',
    keywords: 'educational toys pakistan, STEM kits kids, montessori toys, science toys for kids, brain games',
    content: `Fuel curiosity with Pakistan's premier selection of educational and STEM toys. Our interactive learning range blends entertainment with fundamental learning pillars—Science, Technology, Engineering, and Mathematics. Whether your child is mastering phonics, learning arithmetic with counting blocks, or assembling solar-powered robots, our educational toys turn screen-free playtime into joyful discovery.`
  },
  {
    id: 'action-figures',
    name: 'Action Figures',
    slug: 'action-figures',
    icon: 'Shield',
    description: 'Superheroes, dynamic articulated characters, collectible figurines, and epic action battle accessories.',
    seoTitle: 'Action Figures & Superheroes Toys Pakistan | Smart Kids Toys',
    seoDescription: 'Buy high-quality superhero action figures, anime collectibles, and articulated toy sets in Pakistan. Cash on delivery available.',
    keywords: 'action figures pakistan, superhero toys, avengers toys, transformer action figures, collectible toys',
    content: `Bring mythical battles and heroic quests to life! Our action figures collection includes beloved superheroes, transforming robots, legendary anime champions, and poseable warriors. Built with durable, impact-resistant materials and intricate character details, these figures inspire imaginative storytelling, social play, and heroic adventures for kids and hobby collectors alike.`
  },
  {
    id: 'dolls-playsets',
    name: 'Dolls & Playsets',
    slug: 'dolls-playsets',
    icon: 'Heart',
    description: 'Fashion dolls, dollhouses, pretend play kitchen sets, doctor kits, and role-playing accessories.',
    seoTitle: 'Dolls, Dollhouses & Pretend Playsets in Pakistan | Smart Kids Toys',
    seoDescription: 'Shop fashion dolls, doll accessories, kitchen sets, and doctor playsets in Pakistan. Encourage empathy and imaginative role play.',
    keywords: 'dolls pakistan, dollhouse toys, kitchen set for kids, pretend play toys, barbie dolls',
    content: `Inspire empathy, storytelling, and social creativity with our enchanting dolls and playsets. From realistic baby dolls and miniature dream houses to deluxe pretend kitchen cooktops and medical doctor kits, our collection provides everything your child needs to act out heartwarming stories and everyday family moments.`
  },
  {
    id: 'vehicles-track-sets',
    name: 'Vehicles & Track Sets',
    slug: 'vehicles-track-sets',
    icon: 'Truck',
    description: 'Die-cast cars, high-speed looping racing tracks, monster trucks, locomotives, and construction vehicles.',
    seoTitle: 'Toy Cars, Racing Tracks & Monster Trucks Pakistan | Smart Kids Toys',
    seoDescription: 'Order high-speed racing track sets, die-cast toy cars, and construction vehicles in Pakistan. Premium quality and exciting races guaranteed.',
    keywords: 'toy cars pakistan, hot wheels track sets, monster trucks, diecast cars, construction toy vehicles',
    content: `Start your engines for heart-pounding racing excitement! Our vehicles and track sets category features precision die-cast model cars, gravitational loop-the-loop racetracks, electric train circuits, and rugged construction cranes. Engineered for thrilling speed and durable stunts, these toys develop spatial awareness and hand-eye coordination.`
  },
  {
    id: 'remote-control',
    name: 'Remote Control',
    slug: 'remote-control',
    icon: 'Radio',
    description: 'High-speed RC drift cars, stunt drones, rechargeable off-road 4x4 rock crawlers, and RC boats.',
    seoTitle: 'Remote Control RC Cars, Drones & Helicopters Pakistan | Smart Kids Toys',
    seoDescription: 'Buy rechargeable high-speed RC cars, 4x4 rock crawlers, and stunt drones in Pakistan. Responsive controls with rechargeable battery packs.',
    keywords: 'rc cars pakistan, remote control car, toy drones pakistan, 4x4 rc crawler, stunt car toy',
    content: `Experience extreme radio-controlled thrills! Discover our powerful 2.4GHz remote control vehicles, designed for zero-interference multi-car racing, high-traction 4WD rock climbing, and 360-degree stunt flips. Equipped with long-lasting rechargeable batteries and durable shock absorbers, our RC collection delivers uninterrupted adrenaline outdoors and indoors.`
  },
  {
    id: 'puzzles-games',
    name: 'Puzzles & Games',
    slug: 'puzzles-games',
    icon: 'Puzzle',
    description: 'Wooden jigsaw puzzles, family board games, memory cards, strategy games, and 3D brainteasers.',
    seoTitle: 'Kids Puzzles & Family Board Games Pakistan | Smart Kids Toys',
    seoDescription: 'Shop jigsaw puzzles, 3D brain teasers, and fun family board games in Pakistan. Enhance memory, focus, and logic for all ages.',
    keywords: 'puzzles for kids pakistan, board games pakistan, 3d wooden puzzles, chess for kids, brain teaser toys',
    content: `Gather the family for brain-boosting game nights! From colorful wooden jigsaw puzzles for preschoolers to intricate 3D architectural models and classic strategy board games, our puzzles and games nurture patience, logic, critical thinking, and quality family bonding time.`
  },
  {
    id: 'outdoor-sports',
    name: 'Outdoor & Sports',
    slug: 'outdoor-sports',
    icon: 'Compass',
    description: 'Kids scooters, pop-up play tents, archery sets, sports balls, and active outdoor gear.',
    seoTitle: 'Outdoor Toys, Scooters & Sports Gear Pakistan | Smart Kids Toys',
    seoDescription: 'Explore active outdoor toys, 3-wheel kick scooters, soccer goals, and play tents for kids in Pakistan. Keep children healthy and active.',
    keywords: 'outdoor toys pakistan, kids scooter, play tent kids, sports toys, active outdoor games',
    content: `Encourage healthy, active outdoor play with our premium outdoor and sports toys. Featuring adjustable LED-wheel kick scooters, foldable garden play tents, safe suction archery targets, and lightweight sports balls, this collection ensures your children stay physically active, energetic, and socially engaged in open spaces.`
  }
];

export function getCategoryBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  return CATEGORIES_DATA.find(c => c.slug === cleanSlug || slugify(c.name) === cleanSlug) || null;
}

export function getCategoryByName(name) {
  if (!name) return null;
  const cleanName = name.toLowerCase().trim();
  return CATEGORIES_DATA.find(c => c.name.toLowerCase() === cleanName || c.slug === slugify(name)) || null;
}
