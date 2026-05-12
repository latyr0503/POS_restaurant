import type { Menu } from "@/types/produits"

export const slideImages: string[] = [
  "/images/patrimoine-culinaire.jpeg",
  "/images/bg-1.jpeg",
  "/images/bg-2.jpeg",
]

export const menus: Menu[] = [
  {
    id: 1,
    nom: "Classic Burger",
    prix: 1500,
    note: 4.5,
    description: "Steak haché, cheddar, salade, tomate",
    image: "/images/Classic Burger.jpeg",
  },
  {
    id: 2,
    nom: "Chicken Burger",
    prix: 1800,
    note: 4.2,
    description: "Poulet croustillant, mayo, cornichons",
    image: "/images/Chicken Burger.jpeg",
  },
  {
    id: 3,
    nom: "Double Smash",
    prix: 2500,
    note: 5.0,
    description: "Double steak, double cheddar, sauce spéciale",
    image: "/images/Double Smash.jpeg",
  },
  {
    id: 4,
    nom: "Hot Dog",
    prix: 2000,
    note: 4.0,
    description: "Saucisse grillée, moutarde, ketchup",
    image: "/images/Hot Dog.jpeg",
  },
  {
    id: 5,
    nom: "Pizza Margherita",
    prix: 4000,
    note: 4.7,
    description: "Mozzarella, tomate, basilic frais",
    image: "/images/Pizza Margherita.jpeg",
  },
  {
    id: 6,
    nom: "Tacos Poulet",
    prix: 2500,
    note: 4.3,
    description: "Poulet grillé, fromage fondu, frites",
    image: "/images/Tacos Poulet.jpeg",
  },
  {
    id: 7,
    nom: "Nuggets x8",
    prix: 2500,
    note: 4.1,
    description: "Nuggets croustillants, sauce BBQ",
    image: "/images/Nuggets x8.jpeg",
  },
  {
    id: 8,
    nom: "French Fries",
    prix: 1500,
    note: 4.6,
    description: "Frites dorées, sel, ketchup",
    image: "/images/French Fries.jpeg",
  },
  {
    id: 9,
    nom: "Cheese Sandwich",
    prix: 2000,
    note: 3.8,
    description: "Pain grillé, cheddar fondu, jambon",
    image: "/images/Cheese Sandwich.jpeg",
  },
]