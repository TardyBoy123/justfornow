// Original site content, retained from the supplied repository.
const menuData = {
            mcdonalds: {
                "Big Mac": { protein: 25, calories: 524 },
                "Quarter Pounder with Cheese": { protein: 30, calories: 544 },
                "McChicken": { protein: 14, calories: 420 },
                "Spicy McChicken": { protein: 15, calories: 477 },
                "Fillet-O-Fish": { protein: 14, calories: 346 },
                "Chicken McNuggets (6 pieces)": { protein: 12, calories: 253 },
                "Chicken McNuggets (10 pieces)": { protein: 23, calories: 440 },
                "Medium Fries": { protein: 7, calories: 340 },
                "Large Fries": { protein: 10, calories: 510 },
                "Small Fries": { protein: 3, calories: 230 },
                "Coca Cola (Medium)": { protein: 0, calories: 210 },
                "Sprite (Medium)": { protein: 0, calories: 210 },
                "Fanta (Medium)": { protein: 0, calories: 220 },
                "McFlurry Oreo": { protein: 8, calories: 510 },
                "Apple Pie": { protein: 2, calories: 230 },
                "Hot Fudge Sundae": { protein: 7, calories: 330 },
                "Strawberry Sundae": { protein: 7, calories: 330 },
                "Egg McMuffin": { protein: 17, calories: 300 },
                "Sausage McMuffin with Egg": { protein: 21, calories: 450 },
                "Hash Browns": { protein: 2, calories: 150 },
                "Pancakes with Syrup": { protein: 8, calories: 350 },
                "Chicken McGriddle": { protein: 14, calories: 390 },
            },
            popeyes: {
                "Chicken Sandwich (Classic)": { protein: 28, calories: 699 },
                "Chicken Sandwich (Spicy)": { protein: 28, calories: 700 },
                "Cajun Fries (Regular)": { protein: 4, calories: 260 },
                "Cajun Fries (Large)": { protein: 8, calories: 490 },
                "Red Beans and Rice (Regular)": { protein: 6, calories: 230 },
                "Red Beans and Rice (Large)": { protein: 10, calories: 440 },
                "Mashed Potatoes with Gravy (Regular)": { protein: 2, calories: 110 },
                "Mashed Potatoes with Gravy (Large)": { protein: 4, calories: 240 },
                "Biscuits": { protein: 3, calories: 210 },
                "Coleslaw (Regular)": { protein: 1, calories: 140 },
                "Coleslaw (Large)": { protein: 2, calories: 260 },
                "Coke (22 oz)": { protein: 0, calories: 270 },
                "Sprite (22 oz)": { protein: 0, calories: 260 },
                "Iced Tea (22 oz)": { protein: 0, calories: 150 },
                "Cinnamon Apple Pie": { protein: 3, calories: 240 },
                "Homestyle Mac and Cheese": { protein: 10, calories: 210 },
                "Popcorn Shrimp": { protein: 11, calories: 390 },
                "Jambalaya (Regular)": { protein: 9, calories: 210 },
                "Naked Chicken Tenders (3 pieces)": { protein: 43, calories: 170 },
                "Naked Chicken Tenders (5 pieces)": { protein: 72, calories: 280 },
                "Blackened Chicken Sandwich": { protein: 25, calories: 560 },
            },
            marybrowns: {
                "Big Mary on a Bun": { protein: 28.7, calories: 530 },
                "Spicy Big Mary on a Bun": { protein: 28.7, calories: 521 },
                "Big Mary Deluxe on a Bun": { protein: 41.2, calories: 721 },
                "Nashville Mary": { protein: 34.0, calories: 660 },
                "Buffalo Mary on a Bun": { protein: 35.0, calories: 690 },
                "Grilled Chicken Sandwich": { protein: 36.0, calories: 570 },
                "Wrap - No Sauce": { protein: 26.8, calories: 439 },
                "Wrap - With Sauce": { protein: 27.3, calories: 590 },
                "Chicken Tenders - 3 pc": { protein: 32.4, calories: 370 },
                "Chicken Tenders - 5 pc": { protein: 54.1, calories: 616 },
                "Buffalo Chicken Tenders - 3 pc": { protein: 32.8, calories: 444 },
                "Buffalo Chicken Tenders - 5 pc": { protein: 54.7, calories: 745 },
                "Chicken Pop-ins - Regular": { protein: 30.8, calories: 301 },
                "Chicken Pop-ins - Large": { protein: 46.2, calories: 452 },
                "Taters - Small": { protein: 3.9, calories: 263 },
                "Taters - Medium": { protein: 9.5, calories: 636 },
                "Taters - Large": { protein: 14.4, calories: 965 },
                "Taters Poutine - Small": { protein: 20.5, calories: 653 },
                "Taters Poutine - Large": { protein: 36.6, calories: 1023 },
                "Coleslaw - Small": { protein: 1.1, calories: 131 },
                "Coleslaw - Medium": { protein: 2.0, calories: 240 },
                "Coleslaw - Large": { protein: 3.3, calories: 391 },
                "Macaroni Salad - Small": { protein: 2.8, calories: 204 },
                "Macaroni Salad - Medium": { protein: 7.4, calories: 544 },
                "Macaroni Salad - Large": { protein: 9.3, calories: 680 },
                "Gravy - Small": { protein: 0.8, calories: 33 },
                "Gravy - Medium": { protein: 2.1, calories: 82 },
                "Gravy - Large": { protein: 2.9, calories: 115 },
                "Apple Pies": { protein: 1.7, calories: 297 },
                "Strawberry Pie": { protein: 3, calories: 320 },
                "Caramilk Chocolate Cake Cup": { protein: 3.0, calories: 300 },
                "Side Breast with Skin, Small Fries": { protein: 34.0, calories: 583 },
                "Drum Side Breast with Skin, Small Taters": { protein: 47.9, calories: 666 },
                "Crispy Chicken Wrap": { protein: 26.8, calories: 439 },
                "Nashville Taters": { protein: 10, calories: 570 },
            },
            chickfila: {
                "Chick-fil-A Chicken Sandwich": { protein: 29, calories: 440 },
                "Chick-fil-A Spicy Chicken Sandwich": { protein: 28, calories: 490 },
                "Waffle Fries (Small)": { protein: 2, calories: 220 },
                "Waffle Fries (Medium)": { protein: 4, calories: 360 },
                "Waffle Fries (Large)": { protein: 6, calories: 520 },
                "Grilled Chicken Sandwich": { protein: 28, calories: 320 },
                "Chicken Nuggets (8 pieces)": { protein: 27, calories: 260 },
                "Diet Lemonade (Medium)": { protein: 0, calories: 50 },
                "Sweet Tea (Medium)": { protein: 0, calories: 100 },
                "Chocolate Milkshake (Medium)": { protein: 13, calories: 590 },
                "Chicken Biscuit": { protein: 17, calories: 460 },
                "Hash Browns": { protein: 3, calories: 240 },
                "Chick-fil-A Deluxe Sandwich": { protein: 28, calories: 500 },
                "Grilled Chicken Club Sandwich": { protein: 36, calories: 430 },
                "Market Salad with Grilled Chicken": { protein: 27, calories: 330 },
                "Spicy Southwest Salad with Grilled Chicken": { protein: 34, calories: 340 },
                "Cobb Salad with Grilled Chicken Nuggets": { protein: 37, calories: 400 },
                "Side Salad": { protein: 5, calories: 160 },
                "Chicken Noodle Soup (Medium)": { protein: 13, calories: 140 },
                "Fruit Cup (Small)": { protein: 1, calories: 50 },
                "Icedream Cone": { protein: 4, calories: 170 },
                "Chocolate Chunk Cookie": { protein: 4, calories: 330 },
                "Chicken Minis (4 pcs)": { protein: 19, calories: 370 },
            },
        };
const sports = {
  basketball: {
    title: "🏀 Basketball",
    text: "Basketball players need to warm up their legs, shoulders, and heart before playing.",
    exercises: ["Jog in place for 1 minute", "Arm circles", "High knees", "Side shuffles"]
  },

  bocce: {
    title: "⚪ Bocce",
    text: "Bocce players should warm up slowly and focus on balance and arm movement.",
    exercises: ["Shoulder rolls", "Gentle walking", "Wrist circles", "Light stretches"]
  },

  bowling: {
    title: "🎳 Bowling",
    text: "Bowling warm ups help protect the shoulders and wrists.",
    exercises: ["Arm swings", "Wrist stretches", "Shoulder circles", "Walking lunges"]
  },

  figureSkating: {
    title: "⛸️ Figure Skating",
    text: "Figure skaters should warm up balance, legs, and flexibility.",
    exercises: ["Leg swings", "Toe touches", "Balance on one foot", "Light jogging"]
  },

  floorBall: {
    title: "🏑 Floor Ball",
    text: "Floor ball players should prepare for quick movement and stick handling.",
    exercises: ["Side shuffles", "Quick feet", "Arm swings", "Light jogging"]
  },

  floorHockey: {
    title: "🏒 Floor Hockey",
    text: "Floor hockey warm ups help prepare the legs and upper body.",
    exercises: ["Jogging", "Stick handling practice", "Arm circles", "Squats"]
  },

  gymnastics: {
    title: "🤸 Gymnastics",
    text: "Gymnasts should focus on flexibility and body control.",
    exercises: ["Toe touches", "Arm stretches", "Jumping jacks", "Balance practice"]
  },

  indoorSoccer: {
    title: "⚽ Indoor Soccer",
    text: "Soccer players should warm up their legs and get their heart rate up.",
    exercises: ["Jogging", "High knees", "Leg swings", "Side shuffles"]
  },

  powerLifting: {
    title: "🏋️ Power Lifting",
    text: "Power lifters should warm up muscles slowly before lifting heavy weights.",
    exercises: ["Bodyweight squats", "Arm circles", "Light stretching", "Practice lifts with low weight"]
  },

  skiing: {
    title: "⛷️ Skiing",
    text: "Skiers should prepare their legs and improve balance before skiing.",
    exercises: ["Squats", "Balance practice", "Leg swings", "Light jogging"]
  },

  speedSkating: {
    title: "⛸️ Speed Skating",
    text: "Speed skaters need strong legs and balance for skating.",
    exercises: ["Side lunges", "Leg swings", "Jogging", "Balance drills"]
  },

  swimming: {
    title: "🏊 Swimming",
    text: "Swimmers should warm up their shoulders and body before entering the pool.",
    exercises: ["Arm circles", "Shoulder stretches", "Light jumping jacks", "Walking"]
  },

  volleyball: {
    title: "🏐 Volleyball",
    text: "Volleyball players should warm up their arms and legs before jumping and hitting.",
    exercises: ["Arm swings", "Jumping jacks", "Side shuffles", "Light jogging"]
  },

  pickleball: {
    title: "🏓 Pickleball",
    text: "Pickleball warm ups help with quick movement and arm control.",
    exercises: ["Wrist circles", "Side shuffles", "Walking lunges", "Shoulder rolls"]
  },

  golf: {
    title: "⛳ Golf",
    text: "Golf players should warm up their shoulders, back, and hips.",
    exercises: ["Torso twists", "Shoulder circles", "Hip stretches", "Light walking"]
  },

  softball: {
    title: "🥎 Softball",
    text: "Softball players should prepare their throwing arm and legs.",
    exercises: ["Arm circles", "Jogging", "High knees", "Practice throws"]
  },

  tball: {
    title: "⚾ T Ball",
    text: "T Ball players should warm up gently before playing.",
    exercises: ["Walking", "Arm circles", "Light jogging", "Practice swings"]
  },

  trackField: {
    title: "🏃 Track and Field",
    text: "Track athletes should prepare for running and movement.",
    exercises: ["High knees", "Butt kicks", "Leg swings", "Jogging"]
  }
};
