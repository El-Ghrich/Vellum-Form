import { CategoryTemplate, CollectionItem } from '@/components/templates/CategoryTemplate'

const mockItems: CollectionItem[] = [
  {
    id: 'arc-lamp',
    title: 'The Arc Floor Lamp',
    brand: 'SALTER HOUSE',
    price: '$680',
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    type: 'product',
    affiliateUrl: 'https://salterhouse.com',
  },
  {
    id: 'amber-pendant',
    title: 'Amber Glass Pendant',
    brand: 'NORTHLIGHT & CO',
    price: '$340',
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
    type: 'product',
    affiliateUrl: 'https://northlight.co',
  },
  {
    id: 'stoneware-vessel',
    title: 'Asymmetric Stoneware Vessel',
    brand: 'ATELIER NORD',
    price: '$165',
    category: 'Ceramics',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    type: 'product',
    affiliateUrl: 'https://ateliernord.com',
  },
  {
    id: 'ceramic-edit',
    title: 'The 7 Best Sculptural Espresso Machines for Elevated Living',
    brand: 'EDITORIAL DESK',
    price: 'Story',
    category: 'Tabletop',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=1200&q=85',
    type: 'article',
    slug: 'sculptural-espresso-machines',
  },
  {
    id: 'bowl-set',
    title: 'Matte Glazed Bowl Set',
    brand: 'QUIET METAL',
    price: '$120',
    category: 'Ceramics',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
    type: 'product',
    affiliateUrl: 'https://quietmetal.com',
  },
  {
    id: 'boucle-chair',
    title: 'The Boucle Lounge Chair',
    brand: 'MAISON VELUM',
    price: '$1,240',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    type: 'product',
    affiliateUrl: 'https://maisonvelum.com',
  },
  {
    id: 'travertine-table',
    title: 'Travertine Side Table',
    brand: 'STUDIO ARCHIVE',
    price: '$890',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    type: 'product',
    affiliateUrl: 'https://studioarchive.com',
  },
  {
    id: 'linen-tabletop',
    title: 'Natural Linen Table Set',
    brand: 'FORME / 01',
    price: '$210',
    category: 'Tabletop',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    type: 'product',
    affiliateUrl: 'https://forme.studio',
  },
]

const tabs = ['All', 'Lighting', 'Ceramics', 'Furniture', 'Tabletop']

export default function CategoryPage() {
  return (
    <CategoryTemplate
      categoryBadge="The Collection Archive"
      title="LIVING SPACES"
      description="An intentional collection of sculptural objects, tactile textiles, and refined interior decor."
      entriesCountText={`Showing ${mockItems.length} Curated Entries`}
      tabs={tabs}
      items={mockItems}
      curatorsNote={{
        badge: "Curator's Note",
        quote: "We believe objects in the home should age with grace, celebrating form as much as function.",
      }}
    />
  )
}
