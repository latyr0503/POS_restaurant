
import type { ProductType } from "@/types/auth"

export const slideImages: string[] = [
  "/images/patrimoine-culinaire.jpeg",
  "/images/bg-1.jpeg",
  "/images/bg-2.jpeg",
]
  
export const products: ProductType[] = [
  {
    
    productid: `ID-${crypto.randomUUID()}`,
    name: "Classic Burger",
    price: 1500,
    note: 4.5,
    status: "In Stock",
    description: "Steak haché, cheddar, salade, tomate",
    image: "/images/Classic Burger.jpg",
  },
  {
    
    productid: `ID-${crypto.randomUUID()}`,
    name: "Chicken Burger",
    price: 1500,
    note: 4.2,
    status: "In Stock",
    description: "Poulet croustillant, mayo, cornichons",
    image: "/images/Chicken Burger.jpg",
  },
  {
    
    productid: `ID-${crypto.randomUUID()}`,
    name: "Double Smash",
    price: 2500,
    note: 5.0,
    status: "In Stock",
    description: "Double steak, double cheddar, sauce spéciale",
    image: "/images/Double Smash.jpg",
  },
  {
    
    productid: `ID-${crypto.randomUUID()}`,
    name: "Hot Dog",
    price: 2000,
    note: 4.0,
    status: "In Stock",
    description: "Saucisse grillée, moutarde, ketchup",
    image: "/images/Hot Dog.jpg",
  },
  {
    
    productid: `ID-${crypto.randomUUID()}`,
    name: "Pizza Margherita",
    price: 4000,
    note: 4.7,
    status: "In Stock",
    description: "Mozzarella, tomate, basilic frais",
    image: "/images/Pizza Margherita.jpg",
  },
  {
    
    productid: `ID-${crypto.randomUUID()}`,
    name: "Tacos Poulet",
    price: 2500,
    note: 4.3,
    status: "In Stock",
    description: "Poulet grillé, fromage fondu, frites",
    image: "/images/Tacos Poulet.jpg",
  },
  {
    
    productid: `ID-${crypto.randomUUID()}`,
    name: "Nuggets x8",
    price: 2500,
    note: 4.1,
    status: "In Stock",
    description: "Nuggets croustillants, sauce BBQ",
    image: "/images/Nuggets x8.jpg",
  },
  {
    
    productid: `ID-${crypto.randomUUID()}`,
    name: "French Fries",
    price: 1500,
    note: 4.6,
    status: "In Stock",
    description: "Frites dorées, sel, ketchup",
    image: "/images/French Fries.jpg",
  },
  {
    
    productid: `ID-${crypto.randomUUID()}`,
    name: "Cheese Sandwich",
    price: 2000,
    note: 3.8,
    status: "In Stock",
    description: "Pain grillé, cheddar fondu, jambon",
    image: "/images/Cheese Sandwich.jpg",
  },
]