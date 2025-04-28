
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  rating: number;
  reviews: number;
  variants?: {
    color?: string[];
    size?: string[];
  };
  createdAt: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life. Experience crystal clear audio and deep bass with these comfortable, over-ear headphones.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
    category: "Electronics",
    stock: 50,
    featured: true,
    rating: 4.8,
    reviews: 342,
    variants: {
      color: ["Black", "White", "Blue"],
    },
    createdAt: "2023-12-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    description: "Track your fitness goals with this water-resistant smart tracker. Features heart rate monitoring, sleep tracking, and smartphone notifications.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b4?w=400&auto=format&fit=crop&q=80",
    category: "Fitness",
    stock: 75,
    featured: true,
    rating: 4.6,
    reviews: 218,
    variants: {
      color: ["Black", "Red", "Teal"],
    },
    createdAt: "2023-11-20T14:45:00Z"
  },
  {
    id: "3",
    name: "Vintage Denim Jacket",
    description: "Classic vintage denim jacket with a modern fit. Perfect for layering in all seasons.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&auto=format&fit=crop&q=80",
    category: "Clothing",
    stock: 30,
    featured: false,
    rating: 4.5,
    reviews: 156,
    variants: {
      size: ["S", "M", "L", "XL"],
    },
    createdAt: "2024-01-05T09:15:00Z"
  },
  {
    id: "4",
    name: "Professional Chef's Knife",
    description: "High-carbon stainless steel chef's knife with ergonomic handle. Perfect balance for precise cutting and chopping.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&auto=format&fit=crop&q=80",
    category: "Kitchen",
    stock: 45,
    featured: false,
    rating: 4.9,
    reviews: 201,
    createdAt: "2024-02-12T15:20:00Z"
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    description: "Waterproof portable speaker with 24-hour battery life and impressive sound quality. Perfect for outdoor adventures.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop&q=80",
    category: "Electronics",
    stock: 60,
    featured: true,
    rating: 4.7,
    reviews: 289,
    variants: {
      color: ["Black", "Blue", "Orange"],
    },
    createdAt: "2023-10-30T11:10:00Z"
  },
  {
    id: "6",
    name: "Organic Cotton T-Shirt",
    description: "Soft, breathable t-shirt made from 100% organic cotton. Sustainably produced and ethically sourced.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&auto=format&fit=crop&q=80",
    category: "Clothing",
    stock: 100,
    featured: false,
    rating: 4.5,
    reviews: 175,
    variants: {
      color: ["White", "Black", "Gray", "Navy"],
      size: ["XS", "S", "M", "L", "XL"],
    },
    createdAt: "2024-01-25T08:30:00Z"
  },
  {
    id: "7",
    name: "Handcrafted Ceramic Mug",
    description: "Artisan-made ceramic mug with unique glazing. Each piece is slightly different, making it a one-of-a-kind addition to your kitchen.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&auto=format&fit=crop&q=80",
    category: "Kitchen",
    stock: 35,
    featured: false,
    rating: 4.8,
    reviews: 124,
    variants: {
      color: ["Blue", "Green", "Terracotta"],
    },
    createdAt: "2023-12-05T16:40:00Z"
  },
  {
    id: "8",
    name: "Yoga Mat",
    description: "Premium non-slip yoga mat made from eco-friendly materials. Provides excellent cushioning and support for all types of yoga.",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=400&auto=format&fit=crop&q=80",
    category: "Fitness",
    stock: 55,
    featured: false,
    rating: 4.6,
    reviews: 198,
    variants: {
      color: ["Purple", "Blue", "Green", "Black"],
    },
    createdAt: "2024-02-03T13:25:00Z"
  },
  {
    id: "9",
    name: "Leather Wallet",
    description: "Genuine leather bifold wallet with RFID protection. Slim design with multiple card slots and bill compartments.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&auto=format&fit=crop&q=80",
    category: "Accessories",
    stock: 70,
    featured: true,
    rating: 4.7,
    reviews: 245,
    variants: {
      color: ["Brown", "Black"],
    },
    createdAt: "2023-11-12T10:55:00Z"
  },
  {
    id: "10",
    name: "Smart LED Desk Lamp",
    description: "Adjustable desk lamp with multiple brightness levels and color temperatures. Includes USB charging port and touch controls.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1611784601826-d64b3a249ae9?w=400&auto=format&fit=crop&q=80",
    category: "Home",
    stock: 40,
    featured: false,
    rating: 4.5,
    reviews: 167,
    variants: {
      color: ["White", "Black"],
    },
    createdAt: "2024-01-18T14:15:00Z"
  },
  {
    id: "11",
    name: "Stainless Steel Water Bottle",
    description: "Double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof and BPA-free.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop&q=80",
    category: "Home",
    stock: 90,
    featured: true,
    rating: 4.8,
    reviews: 276,
    variants: {
      color: ["Silver", "Black", "Blue", "Red"],
    },
    createdAt: "2023-10-22T09:45:00Z"
  },
  {
    id: "12",
    name: "Indoor Plant Set",
    description: "Set of 3 low-maintenance indoor plants in decorative ceramic pots. Perfect for adding a touch of nature to your home or office.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&auto=format&fit=crop&q=80",
    category: "Home",
    stock: 25,
    featured: false,
    rating: 4.6,
    reviews: 132,
    createdAt: "2024-02-08T11:30:00Z"
  },
];

export const getProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};
