export const products = [
  {
    id: "pudina-makhana",
    name: "Ganga Makhana — Pudina Makhana",
    flavor: "Pudina",
    tagline: "Earthy and tangy with a refreshing mint twist.",
    description: "Experience a refreshing pudina-flavored makhana snack that feels light, crunchy, cooling, and perfect for everyday snacking. Each bite delivers the earthy tang of traditional Indian pudina, carefully balanced with Himalayan salt and mild spices, making it an irresistible, guilt-free treat.",
    colorTheme: {
      primary: "var(--color-flavor-pudina)",
      secondary: "var(--color-flavor-pudina-alt)",
      bg: "#F2F7F4"
    },
    badges: ["Traditional", "Refreshing", "Light Snack"],
    price: 350,
    weight: "250g",
    ingredients: [
      "Roasted Makhana (Fox Nuts)",
      "Mint Seasoning",
      "Himalayan Salt",
      "Mild Spices",
      "Edible Vegetable Oil",
      "Natural Mint Flavor"
    ],
    nutrition: {
      calories: "350 kcal",
      protein: "9.5g",
      fiber: "14.2g",
      carbs: "75.0g",
      sodium: "320mg",
      fat: "1.6g",
      sugar: "0.0g"
    },
    howToEat: [
      "Perfect evening snack",
      "Pair with a hot cup of chai",
      "Convenient travel companion",
      "Healthy office munching",
      "Use as a crunchy salad topping"
    ],
    recipe: {
      title: "Pudina Makhana Chaat",
      time: "5 mins",
      serves: "2",
      ingredients: ["1 cup Pudina Makhana", "1/2 cup chopped onions", "1/2 cup chopped tomatoes", "Fresh coriander", "Squeeze of lemon juice"],
      instructions: "In a large bowl, toss the Pudina Makhana with chopped onions, tomatoes, and fresh coriander. Drizzle fresh lemon juice right before serving to maintain the crunch. Serve immediately as a refreshing chaat!"
    },
    qualityAssurance: [
      "Freshly packed in Bihar",
      "Rigorous quality checks",
      "Sealed for ultimate freshness"
    ],
    images: [
      "/images/products/pudina-front.png",
      "/images/products/pudina-back.png",
      "/images/products/pudina-texture.png",
      "/images/products/pudina-lifestyle.png"
    ],
    reviews: {
      rating: 4.8,
      count: 124,
      breakdown: { taste: 5, packaging: 4.5, freshness: 5, repeat: 4.8 },
      comments: [
        { name: "Sneha R.", date: "May 12, 2026", rating: 5, text: "Such a refreshing flavor! The crunch is incredibly addictive, and it feels like a very light snack. Highly recommended." },
        { name: "Kunal M.", date: "May 05, 2026", rating: 5, text: "Perfect balance of tanginess and mint. I eat these every evening with my tea." }
      ]
    }
  },
  {
    id: "classic-roasted-makhana",
    name: "Ganga Makhana — Classic Roasted Makhana",
    flavor: "Normal / Classic",
    tagline: "Pure, wholesome, and timeless roasted goodness.",
    description: "Enjoy the pure, wholesome taste of our Classic Roasted Makhana. With a minimalist approach to seasoning, we let the natural, earthy flavor of premium lotus seeds shine through. It's a timeless, clean snack perfect for health-conscious individuals.",
    colorTheme: {
      primary: "var(--color-primary)",
      secondary: "var(--color-flavor-normal-alt)",
      bg: "#F9F8F5"
    },
    badges: ["Best Seller", "100% Natural", "Authentic Taste"],
    price: 350,
    weight: "250g",
    ingredients: [
      "Roasted Makhana (Fox Nuts)",
      "Rock Salt",
      "Mild Seasoning",
      "Edible Vegetable Oil"
    ],
    nutrition: {
      calories: "347 kcal",
      protein: "9.7g",
      fiber: "14.5g",
      carbs: "76.9g",
      sodium: "210mg",
      fat: "0.1g",
      sugar: "0.0g"
    },
    howToEat: [
      "Everyday daily snack",
      "Fasting (vrat) friendly snack",
      "Classic tea-time snack",
      "Pre or post-workout munch"
    ],
    recipe: {
      title: "Roasted Makhana Trail Mix",
      time: "2 mins",
      serves: "4",
      ingredients: ["1 cup Classic Makhana", "1/4 cup almonds", "1/4 cup pumpkin seeds", "Pinch of black pepper"],
      instructions: "Mix the Classic Makhana with roasted almonds and pumpkin seeds. Add a pinch of black pepper and toss well. Store in an airtight container for a quick, nutritious snack."
    },
    qualityAssurance: [
      "Premium-grade makhana selection",
      "Hygienic export-quality packaging",
      "Carefully and evenly roasted"
    ],
    images: [
      "/images/products/normal-front.png",
      "/images/products/normal-back.png",
      "/images/products/normal-texture.png",
      "/images/products/normal-lifestyle.png"
    ],
    reviews: {
      rating: 4.9,
      count: 312,
      breakdown: { taste: 5, packaging: 5, freshness: 5, repeat: 4.9 },
      comments: [
        { name: "Priya Menon", date: "May 20, 2026", rating: 5, text: "Export quality indeed! The crunch is unbelievable. I appreciate the transparent sourcing from Bihar farms. Highly recommend the Classic flavor for diet-conscious folks." },
        { name: "Arjun S.", date: "April 18, 2026", rating: 5, text: "The natural taste is preserved perfectly. My everyday go-to snack." }
      ]
    }
  },
  {
    id: "peri-peri-makhana",
    name: "Ganga Makhana — Peri Peri Makhana",
    flavor: "Peri Peri",
    tagline: "A fiery burst of flavor in every crunchy bite.",
    description: "Ignite your taste buds with our Peri Peri Makhana. This high-energy snack delivers a vibrant, spicy kick combined with our signature crunch. It's the ultimate bold flavor experience for those who crave a little heat in their healthy snacking.",
    colorTheme: {
      primary: "var(--color-flavor-peri)",
      secondary: "var(--color-flavor-peri-alt)",
      bg: "#FFF3F1"
    },
    badges: ["Spicy", "Hot Favorite", "Bold Flavor"],
    price: 350,
    weight: "250g",
    ingredients: [
      "Roasted Makhana (Fox Nuts)",
      "Peri Peri Seasoning",
      "Chili Powder",
      "Mixed Herbs",
      "Salt",
      "Edible Vegetable Oil"
    ],
    nutrition: {
      calories: "355 kcal",
      protein: "9.2g",
      fiber: "13.8g",
      carbs: "74.5g",
      sodium: "450mg",
      fat: "2.1g",
      sugar: "0.5g"
    },
    howToEat: [
      "The ultimate party snack",
      "Movie night companion",
      "Late-night gaming snack",
      "Satisfy midnight spicy cravings"
    ],
    recipe: {
      title: "Peri Peri Makhana Bhel",
      time: "5 mins",
      serves: "2",
      ingredients: ["1 cup Peri Peri Makhana", "Finely chopped onion & tomato", "Fresh coriander", "Squeeze of lemon"],
      instructions: "Combine the spicy Peri Peri Makhana with fresh onions and tomatoes. Add coriander and a generous squeeze of lemon to balance the heat. Serve immediately for a fiery bhel experience!"
    },
    qualityAssurance: [
      "Generous bold flavor coating",
      "Freshly ground spice blend",
      "Premium crunch retention technology"
    ],
    images: [
      "/images/products/peri-front.png",
      "/images/products/peri-back.png",
      "/images/products/peri-texture.png",
      "/images/products/peri-lifestyle.png"
    ],
    reviews: {
      rating: 4.7,
      count: 245,
      breakdown: { taste: 4.8, packaging: 4.5, freshness: 4.9, repeat: 4.7 },
      comments: [
        { name: "Aarti Sharma", date: "May 22, 2026", rating: 5, text: "The best makhana I've ever tasted. You can really feel the quality and freshness. The Peri Peri flavor is my absolute favorite for evening snacking!" },
        { name: "Vikram K.", date: "April 30, 2026", rating: 4, text: "Great spicy kick! Extremely addictive flavor. Could be a bit less salty, but overall fantastic." }
      ]
    }
  },
  {
    id: "mint-flavoured-makhana",
    name: "Ganga Makhana — Mint Flavoured Makhana",
    flavor: "Mint",
    tagline: "Fresh, cool, and perfectly crisp.",
    description: "Enjoy a smooth, refreshing experience with our Mint Flavoured Makhana. The cooling mint flavor notes paired with our perfectly roasted lotus seeds create a uniquely light and zesty snack that rejuvenates your palate with every bite.",
    colorTheme: {
      primary: "var(--color-flavor-mint)",
      secondary: "var(--color-flavor-mint-alt)",
      bg: "#F0F9F4"
    },
    badges: ["Refreshing", "Cool Flavor", "Light Bite"],
    price: 350,
    weight: "250g",
    ingredients: [
      "Roasted Makhana (Fox Nuts)",
      "Mint Herbs",
      "Mild Seasoning",
      "Salt",
      "Edible Vegetable Oil"
    ],
    nutrition: {
      calories: "350 kcal",
      protein: "9.5g",
      fiber: "14.0g",
      carbs: "75.5g",
      sodium: "310mg",
      fat: "1.5g",
      sugar: "0.0g"
    },
    howToEat: [
      "Perfect summer snack",
      "Refreshing mid-day bite",
      "Crunchy curd/yogurt topping",
      "Ideal picnic snack"
    ],
    recipe: {
      title: "Mint Yogurt Makhana Bowl",
      time: "3 mins",
      serves: "1",
      ingredients: ["1/2 cup Mint Makhana", "1 cup fresh thick curd", "Fresh mint leaves", "Dash of roasted cumin powder"],
      instructions: "Whisk the curd until smooth. Top generously with Mint Makhana and fresh mint leaves. Sprinkle roasted cumin powder for an incredibly refreshing summer snack bowl."
    },
    qualityAssurance: [
      "Sealed for maximum freshness",
      "Carefully and evenly seasoned",
      "Made with premium natural ingredients"
    ],
    images: [
      "/images/products/mint-front.png",
      "/images/products/mint-back.png",
      "/images/products/mint-texture.png",
      "/images/products/mint-lifestyle.png"
    ],
    reviews: {
      rating: 4.6,
      count: 98,
      breakdown: { taste: 4.5, packaging: 4.8, freshness: 5, repeat: 4.5 },
      comments: [
        { name: "Neha G.", date: "May 15, 2026", rating: 5, text: "Such a cool flavor! Very refreshing taste and the seasoning is perfectly balanced." },
        { name: "Rohan P.", date: "March 12, 2026", rating: 4, text: "A great light snack. I love taking this to work." }
      ]
    }
  },
  {
    id: "chocolate-makhana",
    name: "Ganga Makhana — Chocolate Makhana",
    flavor: "Chocolate",
    tagline: "Rich chocolate goodness with a crunchy surprise.",
    description: "Indulge in a premium dessert-style snack with our Chocolate Makhana. We've coated our crunchy roasted makhana in a rich, luscious cocoa blend, creating a modern, sweet treat that feels decadent yet remains remarkably light and wholesome.",
    colorTheme: {
      primary: "var(--color-flavor-choco)",
      secondary: "var(--color-flavor-choco-alt)",
      bg: "#F9F6F5"
    },
    badges: ["Sweet", "Kids Love It", "Dessert Snack"],
    price: 350,
    weight: "250g",
    ingredients: [
      "Roasted Makhana (Fox Nuts)",
      "Cocoa Powder",
      "Chocolate Coating",
      "Sugar",
      "Milk Solids",
      "Natural Flavors"
    ],
    nutrition: {
      calories: "385 kcal",
      protein: "8.0g",
      fiber: "10.5g",
      carbs: "80.2g",
      sodium: "45mg",
      fat: "4.5g",
      sugar: "18.0g"
    },
    howToEat: [
      "Guilt-free dessert snack",
      "Healthy kids lunchbox treat",
      "Perfect coffee companion",
      "Cures midnight sweet cravings"
    ],
    recipe: {
      title: "Chocolate Makhana Dessert Bowl",
      time: "5 mins",
      serves: "2",
      ingredients: ["1 cup Chocolate Makhana", "Sliced strawberries or bananas", "Handful of walnuts", "Extra chocolate drizzle (optional)"],
      instructions: "In a serving bowl, layer the Chocolate Makhana with fresh fruit slices and walnuts. Serve cold for an extra crunchy, dessert-like experience. Add a light chocolate drizzle if feeling extra indulgent!"
    },
    qualityAssurance: [
      "Rich, premium cocoa blend",
      "High-quality uniform coating",
      "Fresh batch packaging to prevent melting"
    ],
    images: [
      "/images/products/choco-front.png",
      "/images/products/choco-back.png",
      "/images/products/choco-texture.png",
      "/images/products/choco-lifestyle.png"
    ],
    reviews: {
      rating: 4.9,
      count: 410,
      breakdown: { taste: 5, packaging: 4.8, freshness: 4.9, repeat: 5 },
      comments: [
        { name: "Rahul Desai", date: "May 24, 2026", rating: 5, text: "I love that these are naturally sourced and don't have that artificial oily taste. Perfect guilt-free snack for my kids. The Chocolate flavor is a huge hit." },
        { name: "Simran A.", date: "April 02, 2026", rating: 5, text: "Such a premium chocolate flavor. It tastes like a high-end dessert but it's just makhana!" }
      ]
    }
  },
  {
    id: "onion-makhana",
    name: "Ganga Makhana — Onion Makhana",
    flavor: "Onion",
    tagline: "Savory onion flavor with deep roasted crunch.",
    description: "Savor the comforting, aromatic taste of our Onion Makhana. This rich, savory snack features deep roasted crunch paired with earthy onion flavor notes. It is the quintessential comfort food designed perfectly to accompany your daily tea routine.",
    colorTheme: {
      primary: "var(--color-flavor-onion)",
      secondary: "var(--color-flavor-onion-alt)",
      bg: "#F8F5F8"
    },
    badges: ["Savory", "Tea-Time Favorite", "Aromatic Flavor"],
    price: 350,
    weight: "250g",
    ingredients: [
      "Roasted Makhana (Fox Nuts)",
      "Onion Seasoning",
      "Salt",
      "Mild Spices",
      "Mixed Herbs",
      "Edible Vegetable Oil"
    ],
    nutrition: {
      calories: "352 kcal",
      protein: "9.4g",
      fiber: "14.1g",
      carbs: "75.2g",
      sodium: "380mg",
      fat: "1.8g",
      sugar: "1.0g"
    },
    howToEat: [
      "The perfect tea-time snack",
      "Relaxing evening munch",
      "Savory office desk snack",
      "Crunchy road trip companion"
    ],
    recipe: {
      title: "Onion Masala Makhana Mix",
      time: "2 mins",
      serves: "2",
      ingredients: ["1 cup Onion Makhana", "Finely chopped raw onion", "Fresh herbs", "Dash of lemon juice"],
      instructions: "Toss the Onion Makhana with finely chopped raw onion and fresh herbs for double the onion flavor. Squeeze a dash of lemon juice right before eating for a zesty, flavorful crunch."
    },
    qualityAssurance: [
      "Freshly and aromatically seasoned",
      "Hygienically packed in sterile environments",
      "Special crunch-preserving foil packaging"
    ],
    images: [
      "/images/products/onion-front.png",
      "/images/products/onion-back.png",
      "/images/products/onion-texture.png",
      "/images/products/onion-lifestyle.png"
    ],
    reviews: {
      rating: 4.8,
      count: 180,
      breakdown: { taste: 4.9, packaging: 4.8, freshness: 5, repeat: 4.6 },
      comments: [
        { name: "Deepak S.", date: "May 10, 2026", rating: 5, text: "Such a savory flavor! It is absolutely perfect with my evening masala chai. Flavorful crunch." },
        { name: "Anita K.", date: "March 28, 2026", rating: 5, text: "The aroma when you open the packet is amazing. Very high quality seasoning." }
      ]
    }
  }
];
