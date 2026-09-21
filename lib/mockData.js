export const PLATFORM_FEE = 0.07;

export const currentUser = {
  id: "user1",
  name: "João Silva",
  email: "joao@email.com",
  avatarUrl: "https://i.pravatar.cc/150?img=12",
  bio: "Apaixonado por ferramentas e jardinagem",
  rating: 4.8,
  totalRentals: 15,
  joinDate: "2024-01-15",
  level: "Ouro",
  stats: {
    totalRentals: 15,
    totalEarned: 1250,
    activeRentals: 2,
    completedRentals: 13
  }
};

export const listings = [
  {
    id: "1",
    title: "Furadeira Bosch",
    description: "Furadeira profissional 12V, ótima para pequenos reparos",
    price: 25,
    priceType: "day",
    location: "Vila Madalena, SP",
    image: "https://images.unsplash.com/photo-1504142692947-13559f4932d7?w=400",
    owner: "Maria Santos",
    ownerId: "user2",
    category: "ferramentas",
    rating: 4.9,
    available: true
  },
  {
    id: "2",
    title: "Serviço de Jardinagem",
    description: "Poda, plantio e manutenção de jardins residenciais",
    price: 80,
    priceType: "hour",
    location: "Pinheiros, SP",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    owner: "Carlos Lima",
    ownerId: "user3",
    category: "servicos",
    rating: 4.7,
    available: true
  },
  {
    id: "3",
    title: "Churrasqueira Completa",
    description: "Churrasqueira + freezer + mesa para 10 pessoas",
    price: 150,
    priceType: "day",
    location: "Moema, SP",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    owner: "Ana Souza",
    ownerId: "user4",
    category: "espacos",
    rating: 4.8,
    available: true
  },
  {
    id: "4",
    title: "Pet Care - Cães Pequenos",
    description: "Hospedagem para cães pequenos com quintal",
    price: 50,
    priceType: "day",
    location: "Perdizes, SP",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    owner: "Pedro Alves",
    ownerId: "user5",
    category: "pets",
    rating: 4.9,
    available: true
  }
];

export const exploreCategories = [
  { id: "ferramentas", name: "Ferramentas", icon: "", href: "/explorar/ferramentas" },
  { id: "servicos", name: "Serviços", icon: "️", href: "/explorar/servicos" },
  { id: "espacos", name: "Espaços", icon: "🏠", href: "/explorar/espacos" },
  { id: "pets", name: "Pet Care", icon: "", href: "/explorar/pets" }
];

export const itemsByCategory = {
  ferramentas: listings.filter(function (l) { return l.category === "ferramentas"; }),
  servicos: listings.filter(function (l) { return l.category === "servicos"; }),
  espacos: listings.filter(function (l) { return l.category === "espacos"; }),
  pets: listings.filter(function (l) { return l.category === "pets"; })
};

export const mockRentals = [
  {
    id: "r1",
    listingId: "1",
    listing: listings[0],
    status: "active",
    startDate: "2026-08-25",
    endDate: "2026-08-27",
    totalPrice: 80.25
  }
];

export const mockConversations = [
  {
    id: "c1",
    user: { id: "user2", name: "Maria Santos", avatarUrl: "https://i.pravatar.cc/150?img=5" },
    lastMessage: "Tudo certo para amanhã!",
    timestamp: "14:32",
    unread: 0
  }
];

export const rentals = mockRentals;
export const messages = mockConversations;

export function getListings() { return listings; }
export function getListingById(id) { return listings.find(function (l) { return l.id === id; }); }
export function createListing(data) { var newL = Object.assign({ id: String(listings.length + 1) }, data); listings.push(newL); return newL; }
export function getNegotiations() { return []; }
export function createNegotiation(data) { return data; }