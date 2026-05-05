export type DietaryTag = "v" | "vg" | "gf" | "s";

export interface MenuItem {
  name: string;
  ingredients: string;
  dietary: DietaryTag[];
  isSignature?: boolean;
}

export interface MenuCategory {
  category: string;
  id: string;
  items: MenuItem[];
}

export const MENU: MenuCategory[] = [
  {
    category: "Appetizers",
    id: "appetizers",
    items: [
      { name: "Pueblo Nachos", ingredients: "Yellow corn chips, whole pinto beans, jack & cheddar cheese, sour cream, guacamole and pico de gallo. Vegetarian, chicken or steak.", dietary: ["v", "gf"] },
      { name: "Cheese Quesadilla", ingredients: "With sour cream and guacamole. Vegetarian, chicken or steak.", dietary: ["v"] },
      { name: "Heirloom Tomato Quesadilla", ingredients: "Local heirloom tomatoes, fresh basil, Monterey Jack on a parmesan-crusted tortilla with sundried tomato allioli.", dietary: ["v"] },
      { name: "Quesadilla Poblano", ingredients: "Monterey Jack, roasted poblano peppers with salsa romesco.", dietary: ["v"] },
      { name: "Quesadilla Hongos", ingredients: "Wild mushrooms, Monterey Jack on a parmesan-crusted tortilla with caesar dressing.", dietary: ["v"] },
      { name: "Guacamole & Chips", ingredients: "Hand-smashed avocados & fresh tortilla chips.", dietary: ["v", "vg", "gf"] },
    ],
  },
  {
    category: "Burritos",
    id: "burritos",
    items: [
      { name: "The R&B Burrito", ingredients: "Whole pinto beans, rice, cheese, guacamole, red sauce, pico de gallo.", dietary: ["v", "vg"] },
      { name: "Adobe Chicken Burrito", ingredients: "Marinated char-grilled chicken, pinto beans, rice, cheese, guacamole, sour cream, pico de gallo.", isSignature: true, dietary: [] },
      { name: "Adobe Steak Burrito", ingredients: "Marinated char-grilled steak, pinto beans, rice, cheese, guacamole, sour cream, pico de gallo.", isSignature: true, dietary: [] },
      { name: "Burrito Mojado", ingredients: "Chicken or steak, pinto beans, rice, guacamole, pico de gallo and topped with baked cheese.", dietary: [] },
      { name: "Del Mar Mahi-Mahi Burrito", ingredients: "Citrus-marinated mahi-mahi, rice, cheese, guacamole, salsa blanca, pico de gallo.", dietary: ["gf"] },
      { name: "Mariscos Shrimp Burrito", ingredients: "Citrus-marinated shrimp, rice, cheese, guacamole, salsa blanca, pico de gallo.", dietary: ["gf"] },
      { name: "Carne Adobada Burrito", ingredients: "Pork slow-cooked with New Mexico chiles and spices, rice, and cheese with cilantro & onions. SPICY.", dietary: ["s"] },
    ],
  },
  {
    category: "Tacos",
    id: "tacos",
    items: [
      { name: "Al Carbon Tacos", ingredients: "Marinated char-grilled chicken or steak, onions & cilantro on a soft corn tortilla.", dietary: ["gf"] },
      { name: "Taco Adobada", ingredients: "Spicy slow-cooked pork, onions & cilantro on a soft corn tortilla.", dietary: ["gf", "s"] },
      { name: "Del Mar Mahi-Mahi Taco", ingredients: "Marinated char-grilled mahi-mahi, southwest slaw on a soft corn tortilla.", dietary: ["gf"] },
      { name: "Mariscos Shrimp Taco", ingredients: "Citrus-marinated grilled shrimp with southwest slaw on a soft corn tortilla.", dietary: ["gf"] },
      { name: "The R&B Taco", ingredients: "Rice & beans, grilled fajita vegetables, lettuce and cheese on a soft corn tortilla.", dietary: ["v", "vg", "gf"] },
      { name: "RioTaco Plate", ingredients: "Mix and match tacos with rice and beans.", dietary: ["gf"] },
      { name: "Fresh Salmon Tacos", ingredients: "Sustainably caught grilled salmon with Thai ginger slaw.", dietary: ["gf"] },
      { name: "Blue Corn Crab Tacos", ingredients: "Crispy blue corn crab tacos with cabbage & red pepper slaw.", dietary: ["gf"] },
    ],
  },
  {
    category: "Enchiladas",
    id: "enchiladas",
    items: [
      { name: "Enchilada Traditional", ingredients: "Cheese, chicken or steak topped with red or green sauce (Christmas is both) and baked cheese, served with rice & beans.", dietary: ["gf"] },
      { name: "Carne Adobada Enchilada", ingredients: "Pork slow-cooked with New Mexico chiles, red or green sauce, baked cheese. SPICY.", dietary: ["gf", "s"] },
      { name: "Hopi Blue Corn Enchilada", ingredients: "Blue corn tortillas layered with fire-roasted corn and green sauce, baked cheese. New Mexican style.", isSignature: true, dietary: ["v", "gf"] },
    ],
  },
  {
    category: "Salads",
    id: "salads",
    items: [
      { name: "Taos Toss House Salad", ingredients: "Mixed greens, carrots, corn, onions, jicama, bell peppers tossed in southwest vinaigrette with queso seco.", dietary: ["v", "gf"] },
      { name: "Tijuana Caesar Salad", ingredients: "Romaine, corn and black bean salsa, shaved parmesan in caesar dressing on a soft flour tortilla.", dietary: ["v"] },
      { name: "Havasu Salad", ingredients: "Mixed greens, jicama, bell peppers in southwest vinaigrette on a soft flour tortilla with black beans, queso seco, sour cream and guacamole.", dietary: ["v", "gf"] },
    ],
  },
  {
    category: "Soups & Stews",
    id: "soups",
    items: [
      { name: "Tortilla Soup", ingredients: "House-made chicken stock, fire-roasted tomatoes, pulled chicken, tri-colored chips, queso seco, pico de gallo, avocado.", dietary: ["gf"] },
      { name: "Green Chile Stew", ingredients: "Slow-braised pork in a fire-roasted green chile stock with potatoes.", dietary: ["gf", "s"] },
      { name: "Posole", ingredients: "Slow-braised pork in green chile and roasted tomato stock with white corn hominy and fresh cabbage.", dietary: ["gf", "s"] },
      { name: "Fire-Roasted Corn Chowder", ingredients: "Fire-roasted corn and green chiles in a creamy chowder with a hint of Spanish sherry.", dietary: ["v"] },
      { name: "Gazpacho", ingredients: "Andalusian-style cold tomato soup, garden vegetables, avocado and queso seco.", dietary: ["v", "vg", "gf"] },
    ],
  },
  {
    category: "Beverages",
    id: "beverages",
    items: [
      { name: "Margaritas", ingredients: "House-made by the glass or carafe. Blue agave, cane nectar & fresh lime juice.", dietary: ["v", "vg", "gf"] },
      { name: "Sangria", ingredients: "House-made by the glass or carafe. Fresh fruit splashed with red wine and fruit juices.", dietary: ["v", "vg", "gf"] },
      { name: "Beverages & Libations", ingredients: "Fountain sodas & iced tea, bottled Mexican sodas and juices, Mexican and domestic beers, wine by glass or bottle.", dietary: ["v", "vg", "gf"] },
    ],
  },
  {
    category: "Postres",
    id: "postres",
    items: [
      { name: "Sopapillas", ingredients: "Little pillows. House-made and hand-rolled to order, topped with powdered sugar. Available à la mode.", isSignature: true, dietary: ["v"] },
      { name: "Chocolate Cinnamon Empanadas", ingredients: "Dark chocolate with Mexican cinnamon. Available à la mode.", dietary: ["v"] },
      { name: "Mexican Cinnamon Rice Pudding", ingredients: "Creamy rice pudding with a hint of Mexican cinnamon.", dietary: ["v", "gf"] },
      { name: "Lemon Lime Pound Cake", ingredients: "Zesty lemon and lime pound cake.", dietary: ["v"] },
    ],
  },
];
