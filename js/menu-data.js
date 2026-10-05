/* ==========================================================================
   The Lookout — menu
   --------------------------------------------------------------------------
   Source: The Lookout's own menu, posted in its Instagram highlights
   "Food menu" (8 pages) and "Drink Menu" (2 pages) on 24 Jan 2026.
   The same 10 pages are on Zomato. Every price below is copied from those
   pages, in ₹. Nothing is estimated.

   Spellings were tidied for the website (e.g. "Agioloe" → "Aglio Olio",
   "Maxican" → "Mexican", "Expresso" → "Espresso"). The owner should check
   them; the full list is in brief/BRIEF.md.

   Format
     price: 300                        → one price
     prices: [["Veg", 180], ...]       → one price per option, as printed
     prices: [["", 320], ["", 480]]    → two prices printed without labels
     price: null                       → no price on the menu ("Ask us")
     spl: true                         → marked "The Lookout Spl." on the menu
   ========================================================================== */

window.LOOKOUT_MENU = [
  {
    id: "food",
    label: "Food",
    groups: [
      {
        id: "starters",
        label: "Starters",
        image: "images/dish-cigar-roll.webp",
        note: "Continental bites come with a dip: ranch, mint mayo or masala.",
        sub: [
          {
            label: "Continental · veg",
            items: [
              { name: "Cheese & Cigar Roll", price: 300 },
              { name: "French Fries, plain salted", price: 200 },
              { name: "Peri Peri French Fries", price: 210 },
              { name: "Crispy Potato Veggies with Hummus", price: 220 },
              { name: "Mushroom Alfredo BBQ Bruschetta", price: 250 },
              { name: "Nachos", prices: [["Cheesy", 280], ["Veg", 210], ["Non-veg", 250]] },
              { name: "Molten Fries", prices: [["Normal", 200], ["Cheesy", 240]] }
            ]
          },
          {
            label: "Continental · non-veg",
            items: [
              { name: "Chicken Shawarma Roll", price: 300 },
              { name: "Fish and Chips", price: 510 },
              { name: "Lemon Chicken Wings, red hot sauce", price: 390 },
              { name: "BBQ Chicken Wings", price: 360 }
            ]
          },
          {
            label: "Chinese · veg",
            items: [
              { name: "Veg Spring Roll", price: 240 },
              { name: "Crispy Chilli Potato", price: 250 },
              { name: "Crispy Honey Chilli Potato", price: 260 }
            ]
          },
          {
            label: "Chinese · non-veg",
            items: [
              { name: "Fish Chilli Dry", price: 460 },
              { name: "Chilli Prawns, Hunan style", price: 560 },
              { name: "Mutton Ribs Dry", price: 550 },
              { name: "Double Fried Lamb Buff", price: 370 },
              { name: "Chicken Spring Roll", price: 350 },
              { name: "Spicy Salt & Pepper Chicken", price: 360 },
              { name: "Chicken Wings", price: 370 },
              { name: "Chicken Lollipop", price: 370 },
              { name: "Crispy Honey Chilli Chicken", price: 370 },
              { name: "Deep Fried Chicken Wings", price: 370 },
              { name: "Drums of Heaven, salt & pepper", price: 380 },
              { name: "Chicken Hunan Style", price: 390 },
              { name: "Golden Fried Prawn", price: 640 },
              { name: "Sliced Chicken, garlic pepper dry", price: 370 },
              { name: "Salt & Pepper Prawn", price: 640 },
              { name: "Sliced Fish, garlic pepper dry", price: 460 }
            ]
          },
          {
            label: "From the tandoor",
            items: [
              { name: "Tandoori Stuffed Potato", price: 260 },
              { name: "Paneer Tikka", price: 310 },
              { name: "Paneer Malai Tikka", price: 340 },
              { name: "Tandoori Chicken", prices: [["", 320], ["", 480]] },
              { name: "Afghani Chicken", prices: [["", 350], ["", 500]] },
              { name: "Mutton Tikka", price: 400 },
              { name: "Fish Tikka", price: 400 },
              { name: "Chicken Tikka", price: 400 },
              { name: "Chicken Malai Tikka", price: 380 },
              { name: "Bhatti Chicken", price: 400 },
              { name: "Chicken Seekh Kebab", price: 400 },
              { name: "Mutton Seekh Kebab", price: 500 }
            ]
          }
        ]
      },
      {
        id: "momo",
        label: "Momo",
        image: "images/dish-jhol-momo.webp",
        sub: [
          {
            label: "Tibetan momo",
            items: [
              { name: "Paneer Momo", price: 240 },
              { name: "Spinach Cheese Momo", price: 250 },
              { name: "Steam Momo", prices: [["Veg", 180], ["Chicken", 230], ["Mutton", 280], ["Buff", 230]] },
              { name: "Jhol Momo", prices: [["Veg", 260], ["Chicken", 270], ["Mutton", 320], ["Buff", 270]] },
              { name: "Kothey Momo", prices: [["Veg", 240], ["Chicken", 260], ["Mutton", 310], ["Buff", 260]] },
              { name: "Chilli Momo", prices: [["Veg", 230], ["Chicken", 260], ["Mutton", 310], ["Buff", 260]] },
              { name: "Shabhaley", prices: [["Mutton", 400], ["Chicken", 270], ["Buff", 270]] }
            ]
          },
          {
            label: "Tandoori momo",
            items: [
              { name: "Afghani Chicken Momo", price: 320 },
              { name: "Tandoori Chicken Momo", price: 300 },
              { name: "Paneer Tandoori Momo", price: 240 }
            ]
          }
        ]
      },
      {
        id: "himalayan",
        label: "Tibetan & Bhutanese",
        image: "images/space-lamps.webp",
        sub: [
          {
            label: "Tibetan",
            items: [
              { name: "Thenthuk", prices: [["Veg", 220], ["Chicken", 240], ["Mutton", 270], ["Buff", 240]] },
              { name: "Thukpa", prices: [["Veg", 230], ["Chicken", 250], ["Mutton", 290], ["Buff", 250]] },
              { name: "Cheese Thukpa", prices: [["Veg", 260], ["Chicken", 280]] },
              { name: "Keema Thukpa", prices: [["Chicken", 260], ["Mutton", 300], ["Buff", 260]] },
              { name: "Shaptak Dry", prices: [["Chicken", 320], ["Mutton", 370], ["Buff", 320]] },
              { name: "Shaptak Gravy", prices: [["Chicken", 330], ["Mutton", 380], ["Buff", 330]] },
              { name: "Phing Thang", prices: [["Veg", 250], ["Chicken", 270], ["Mutton", 290], ["Buff", 270]] }
            ]
          },
          {
            label: "Bhutanese",
            items: [
              { name: "Ema Datshi", price: 280 },
              { name: "Shakam Datshi", prices: [["Chicken", 290], ["Mutton", 330], ["Buff", 290]] },
              { name: "Kewa Datshi", price: 290 }
            ]
          }
        ]
      },
      {
        id: "chinese",
        label: "Chinese",
        image: "images/dish-chilli-chicken.webp",
        sub: [
          {
            label: "Veg",
            items: [
              { name: "Veg Manchurian, dry / gravy", price: 260 },
              { name: "Mix Veg in Hot Garlic / Schezwan", price: 260 },
              { name: "Spinach, Baby Corn & Salted Mushroom", price: 280 },
              { name: "Paneer in Hot Garlic Sauce", price: 290 },
              { name: "Stir-fried Chinese Pok Choy", price: 260 },
              { name: "Broccoli Pok Choy with Fungus, stir-fried", price: 290 },
              { name: "Paneer Chilli, dry / gravy", price: 290 },
              { name: "Mix Veg with Almond", price: 270 }
            ]
          },
          {
            label: "Non-veg",
            items: [
              { name: "Chilli Chicken, dry / gravy", price: 380 },
              { name: "Chicken Manchurian, dry / gravy", price: 380 },
              { name: "Kung Pao Chicken, dry / gravy", price: 380 },
              { name: "Chicken in Schezwan Sauce", price: 380 },
              { name: "Chicken in Hot Garlic Sauce", price: 380 },
              { name: "Crispy Chicken in Black Bean Sauce", price: 380 },
              { name: "Chicken Almond", price: 380 },
              { name: "Lemon Ginger Chicken", price: 380 },
              { name: "Chicken in Butter Cream Garlic Sauce", price: 380 }
            ]
          },
          {
            label: "Noodles",
            items: [
              { name: "Chilli Garlic Noodles", prices: [["Veg", 260], ["Chicken", 290]] },
              { name: "Hakka Noodles", prices: [["Veg", 240], ["Chicken", 270]] },
              { name: "Meat Mixed Noodles", price: 320 },
              { name: "Shanghai Rice Noodles", prices: [["Veg", 250], ["Chicken", 270]] }
            ]
          },
          {
            label: "Rice",
            items: [
              { name: "Egg Fried Rice", price: 250 },
              { name: "Veg Black Mushroom Fried Rice", price: 250 },
              { name: "Fried Rice", prices: [["Veg", 240], ["Chicken", 280], ["Mutton", 290]] },
              { name: "Fried Rice with Hot Basil Leaves", price: 290 },
              { name: "American Chopsuey", prices: [["Veg", 340], ["Chicken", 350]] }
            ]
          },
          {
            label: "Soups",
            items: [
              { name: "Hot & Sour Soup", prices: [["Veg", 220], ["Chicken", 230], ["Prawns", 300]] },
              { name: "Clear Soup", prices: [["Veg", 220], ["Chicken", 230]] },
              { name: "Sweet Corn Soup", prices: [["Veg", 220], ["Chicken", 230]] },
              { name: "Chinese Mushroom Soup", prices: [["Veg", 220], ["Chicken", 230]] },
              { name: "Manchow Soup", prices: [["Veg", 220], ["Chicken", 230], ["Prawns", 300]] },
              { name: "Lemon Coriander Soup", prices: [["Veg", 220], ["Chicken", 230], ["Prawns", 300]] },
              { name: "Tom Yum Soup", prices: [["Veg", 220], ["Chicken", 230], ["Prawns", 300]] }
            ]
          }
        ]
      },
      {
        id: "indian",
        label: "Indian",
        image: "images/space-interior.webp",
        sub: [
          {
            label: "Veg mains",
            items: [
              { name: "Dal Makhani", price: 240 },
              { name: "Shahi Paneer", price: 280 },
              { name: "Yellow Dal", price: 220 },
              { name: "Kadhai Paneer", price: 300 },
              { name: "Chana Masala", price: 250 },
              { name: "Malai Kofta", price: 250 },
              { name: "Mix Vegetable", price: 290 },
              { name: "Paneer Lababdar", price: 250 },
              { name: "Paneer Tikka Masala", price: 250 }
            ]
          },
          {
            label: "Chicken mains · half / full",
            items: [
              { name: "Butter Chicken (boneless)", prices: [["Half", 480], ["Full", 590]] },
              { name: "Butter Chicken", prices: [["Half", 450], ["Full", 550]] },
              { name: "Handi Chicken", prices: [["Half", 420], ["Full", 540]] },
              { name: "Tawa Chicken", prices: [["Half", 330], ["Full", 520]] },
              { name: "Chicken Curry", prices: [["Half", 350], ["Full", 500]] },
              { name: "Kadhai Chicken", prices: [["Half", 350], ["Full", 540]] },
              { name: "Chicken Tikka Masala", prices: [["Full", 540]] },
              { name: "Chicken Shahi Korma", prices: [["Half", 480], ["Full", 590]] }
            ]
          },
          {
            label: "Mutton mains",
            items: [
              { name: "Jungli Mutton", price: 450, spl: true },
              { name: "Mutton Curry", price: 360 },
              { name: "Rogan Josh", price: 400 },
              { name: "Mutton Do Pyaza", price: 420 },
              { name: "Handi Mutton", price: 400 },
              { name: "Mutton Shahi Korma", price: 420 },
              { name: "Mutton Rara", price: 420 },
              { name: "Mutton Seekh Masala", price: 450 }
            ]
          }
        ]
      },
      {
        id: "continental",
        label: "Continental",
        image: "images/dish-alfredo.webp",
        sub: [
          {
            label: "Pasta · penne or spaghetti",
            items: [
              { name: "Butter Chicken Pasta", price: 410, spl: true },
              { name: "Aglio Olio Pasta", prices: [["Veg", 320], ["Non-veg", 360]] },
              { name: "Arrabbiata Pasta", prices: [["Veg", 320], ["Non-veg", 360]] },
              { name: "Pesto Pasta", prices: [["Veg", 320], ["Non-veg", 360]] },
              { name: "Alfredo Pasta", prices: [["Veg", 320], ["Non-veg", 360]] },
              { name: "Pink Sauce Pasta", prices: [["Veg", 320], ["Non-veg", 360]] }
            ]
          },
          {
            label: "Mains",
            items: [
              { name: "Grilled Paneer Steak", desc: "Herb brown sauce, mash potato, sautéed vegetables", price: 440 },
              { name: "Veg Platter", desc: "Grilled stuffed paneer, Mexican rice, sautéed vegetables, corn salad", price: 410 },
              { name: "Roast Chicken, half", desc: "Herb brown sauce, mash potato, sautéed vegetables", price: 620 },
              { name: "Chicken à la Kiev", desc: "Herb garlic butter sauce, mash potato, sautéed vegetables", price: 540 },
              { name: "Grilled Fish, lemon butter sauce", desc: "Mushy peas, sautéed vegetables", price: 470 },
              { name: "Grilled Chicken Breast", desc: "Sautéed vegetables, mash potato, Dijon mustard sauce", price: 480 },
              { name: "Fish Roulade", desc: "Lemon thyme herb sauce, mash potato, sautéed vegetables", price: 520 },
              { name: "Grilled Chicken Thigh", desc: "Tuscan sauce, mash potato, sautéed vegetables", price: 540 },
              { name: "Mediterranean Prawns", desc: "Herb garlic butter sauce, mash potato, sautéed vegetables", price: 620 }
            ]
          },
          {
            label: "Salads",
            items: [
              { name: "Caesar Salad", prices: [["Veg", 200], ["Non-veg", 260]] },
              { name: "Greek Salad", prices: [["Veg", 200], ["Non-veg", 260]] },
              { name: "Chicken Tikka Salad", price: 310 },
              { name: "Mexican Chicken Salad", price: 280 }
            ]
          }
        ]
      },
      {
        id: "pizza",
        label: "Pizza, Burgers & Sandwiches",
        image: "images/dish-burger.webp",
        sub: [
          {
            label: "Pizza",
            items: [
              { name: "Tandoori Paneer Tikka Pizza", price: 370, spl: true },
              { name: "Kebab Pizza", prices: [["Chicken", 420], ["Mutton", 560]], spl: true },
              { name: "Margherita Pizza", price: 310 },
              { name: "Chicken Tikka Pizza", price: 420 },
              { name: "Four Cheese Pizza", price: 380 },
              { name: "Pesto Funghi Pizza", price: 340 },
              { name: "Meat Lover's Pizza", desc: "Four kinds of chicken", price: 440 },
              { name: "Himalaya Delight Pizza", price: 360 }
            ]
          },
          {
            label: "Burgers",
            items: [
              { name: "Juicy Chicken Burger", price: 300 },
              { name: "Mexican Chicken Burger", price: 270 },
              { name: "Potato Cheese Burger", price: 260 },
              { name: "Cheese Overloaded Burger", price: 300 },
              { name: "Cottage Cheese Burger", price: 300 }
            ]
          },
          {
            label: "Sandwiches",
            items: [
              { name: "BBQ Alfredo Chicken Sandwich", price: 360, spl: true },
              { name: "Pesto Alfredo Mushroom Sandwich", price: 340, spl: true },
              { name: "Grilled Paneer Zucchini Sandwich", price: 310 },
              { name: "Club Sandwich", prices: [["Veg", 280], ["Non-veg", 340]] },
              { name: "Vegetable Grilled Sandwich", price: 250 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "drinks",
    label: "Drinks",
    groups: [
      {
        id: "coffee",
        label: "Coffee",
        image: "images/drink-mango-matcha.webp",
        sub: [
          {
            label: "Hot",
            items: [
              { name: "Cappuccino", price: 140 },
              { name: "Café Latte", price: 160 },
              { name: "Americano", price: 140 },
              { name: "Espresso", price: 90 },
              { name: "Espresso Mocha", price: 120 },
              { name: "Café Mocha", prices: [["", 160], ["", 180]] },
              { name: "Flavoured Latte", desc: "Caramel, vanilla or hazelnut", price: null }
            ]
          },
          {
            label: "Iced",
            items: [
              { name: "Iced Latte", price: 140 },
              { name: "Iced Cappuccino", price: 140 },
              { name: "Iced Americano", price: 140 },
              { name: "Flavoured Cold Coffee", desc: "Caramel, vanilla or hazelnut", price: 180 },
              { name: "Orange Americano", price: 210 },
              { name: "Mango Americano", price: 210 },
              { name: "Iced Cranberry Americano", price: 210 },
              { name: "Iced Matcha Latte", price: 210 },
              { name: "Iced Mango Matcha Latte", price: 170 },
              { name: "Iced Strawberry Mocha Latte", price: 170 }
            ]
          }
        ]
      },
      {
        id: "tea",
        label: "Tea & Hot Chocolate",
        image: "images/drink-hot-chocolate.webp",
        sub: [
          {
            label: "Hot",
            items: [
              { name: "Black Tea", price: 80 },
              { name: "Masala Tea", price: 80 },
              { name: "Green Tea", price: 100 },
              { name: "Ginger Honey Lemon Tea", price: 160 },
              { name: "Tibetan Butter Tea", price: 140 },
              { name: "Lemon Tea", price: 110 },
              { name: "Hot Chocolate", price: 170 }
            ]
          }
        ]
      },
      {
        id: "coolers",
        label: "Smoothies, Shakes & Coolers",
        image: "images/drink-cooler.webp",
        sub: [
          {
            label: "Smoothies",
            items: [
              { name: "Blueberry Chia Seed Smoothie", price: 240 },
              { name: "Mixed Berry Smoothie", price: 250 },
              { name: "Papaya Smoothie", price: 250 },
              { name: "Banana Smoothie", price: 250 },
              { name: "Banana Chia Seed Smoothie", price: 270 },
              { name: "Mango Smoothie", price: 250 },
              { name: "Strawberry Smoothie", price: 250 },
              { name: "Pineapple Smoothie", price: 250 }
            ]
          },
          {
            label: "Milkshakes · ₹220 each",
            items: [
              { name: "Oreo Shake", price: 220 },
              { name: "Chocolate Shake", price: 220 },
              { name: "Strawberry Shake", price: 220 },
              { name: "Mango Milkshake", price: 220 },
              { name: "Kiwi Shake", price: 220 },
              { name: "Vanilla Shake", price: 220 },
              { name: "Peanut Butter Shake", price: 220 },
              { name: "Blueberry Shake", price: 220 }
            ]
          },
          {
            label: "Bubble tea",
            items: [
              { name: "Mocha Bubble Tea", price: 180 },
              { name: "Strawberry Bubble Tea", price: 220 },
              { name: "Kiwi Bubble Tea", price: 220 },
              { name: "Banana Bubble Tea", price: 230 },
              { name: "Taro Bubble Tea", price: 180 }
            ]
          },
          {
            label: "Slush · ₹220 each",
            items: [
              { name: "Orange Slush", price: 220 },
              { name: "Watermelon Slush", price: 220 },
              { name: "Kiwi Mint Slush", price: 220 },
              { name: "Blackcurrant Apple Slush", price: 220 },
              { name: "Blue Lagoon Slush", price: 220 }
            ]
          }
        ]
      }
    ]
  }
];
