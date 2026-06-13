/**
 * BOTANIQ - Core Plant Database & Procedural SVG Botanical Illustrator
 */

window.Botaniq.PlantsData = [
  // INDOOR PLANTS
  {
    id: "snake_plant",
    name: "Snake Plant",
    scientific: "Sansevieria trifasciata",
    category: "indoor",
    emoji: "🪴",
    style: "spiky",
    leafColor: "#5A8256",
    potColor: "#8C6A56",
    sunlight: "Low to bright indirect sunlight. Extremely tolerant.",
    watering: {
      Summer: "Water every 2-3 weeks when soil is completely dry.",
      Winter: "Water once every 4-6 weeks. Extremely prone to rot in winter.",
      Monsoon: "Water every 3-4 weeks. Keep away from cold drafts or heavy rain humidity."
    },
    temperature: "15°C - 30°C",
    soil: "Well-draining, sandy cactus-mix with high perlite ratio.",
    growth: "Slow",
    habitat: "West Africa",
    diseases: "Root rot, fungal leaf spot, thrips.",
    petSafety: "Toxic to dogs and cats (contains saponins).",
    pruning: "Cut off yellow or damaged leaves near the soil line with clean shears.",
    propagation: "Leaf cuttings in water/soil, or root division during repotting.",
    mistakes: "Overwatering is the #1 killer. Letting it sit in standing water inside a cover pot.",
    description: "Known as Mother-in-Law's Tongue, this oxygen-producing plant cleans indoor air and survives with minimal attention.",
    edible: false,
    medicinal: false
  },
  {
    id: "monstera",
    name: "Monstera Deliciosa",
    scientific: "Monstera deliciosa",
    category: "indoor",
    emoji: "🌿",
    style: "broadleaf",
    leafColor: "#395D3C",
    potColor: "#C8A97E",
    sunlight: "Bright indirect light. Direct sunlight burns the leaves.",
    watering: {
      Summer: "Water every 7-10 days. Keep soil slightly moist.",
      Winter: "Water once every 2-3 weeks. Allow top 2 inches of soil to dry.",
      Monsoon: "Water every 10-14 days. Monitor soil moisture closely due to humidity."
    },
    temperature: "18°C - 28°C",
    soil: "Chunky, aerated aroid mix (orchid bark, perlite, peat moss).",
    growth: "Fast",
    habitat: "Central American Rainforests",
    diseases: "Spider mites, root rot, leaf spot.",
    petSafety: "Toxic to pets (calcium oxalate crystals).",
    pruning: "Trim leggy vines or yellowing lower leaves to encourage larger split leaves.",
    propagation: "Stem cuttings with at least one node and aerial root in water.",
    mistakes: "Placing in dark corners, causing leaves to lose their beautiful splits (fenestrations).",
    description: "The classic Swiss Cheese Plant. It climbs upward using aerial roots, adding instant tropical vibes to any room.",
    edible: false,
    medicinal: false
  },
  {
    id: "pothos",
    name: "Golden Pothos",
    scientific: "Epipremnum aureum",
    category: "indoor",
    emoji: "🍃",
    style: "vine",
    leafColor: "#7AA276",
    potColor: "#F7F2E8",
    sunlight: "Low to medium indirect light. Tolerates fluorescent lighting.",
    watering: {
      Summer: "Water once a week or when leaves start to droop slightly.",
      Winter: "Water once every 10-14 days.",
      Monsoon: "Water every 7-10 days depending on local humidity."
    },
    temperature: "15°C - 29°C",
    soil: "Standard nutrient-rich potting soil with good drainage.",
    growth: "Very Fast",
    habitat: "Society Islands, French Polynesia",
    diseases: "Root rot, mealybugs.",
    petSafety: "Toxic to cats and dogs.",
    pruning: "Trim long trailing vines to encourage bushier growth at the crown.",
    propagation: "Super easy. Stem cuttings in water root in just a few days.",
    mistakes: "Letting it sit in waterlogged soil. Watch for yellow leaves indicating overwatering.",
    description: "Known as Devil's Ivy because it is nearly impossible to kill. Its trailing vines drape beautifully from shelves.",
    edible: false,
    medicinal: false
  },
  {
    id: "spider_plant",
    name: "Spider Plant",
    scientific: "Chlorophytum comosum",
    category: "indoor",
    emoji: "🌱",
    style: "grassy",
    leafColor: "#92B88E",
    potColor: "#8BA888",
    sunlight: "Bright, indirect light. Will tolerate shade.",
    watering: {
      Summer: "Water once a week. Keep soil evenly moist but not soggy.",
      Winter: "Water every 10-14 days.",
      Monsoon: "Water once a week. Drain excess water promptly."
    },
    temperature: "13°C - 27°C",
    soil: "Well-aerated standard organic potting mix.",
    growth: "Fast",
    habitat: "Southern Africa",
    diseases: "Tip burn from tap water fluoride, scale insects.",
    petSafety: "100% Pet Safe and slightly hallucinogenic to cats!",
    pruning: "Cut off brown leaf tips and clip baby 'spiderettes' to propagate.",
    propagation: "Remove baby spiderettes and place directly in water or moist soil.",
    mistakes: "Using highly chlorinated/fluoridated tap water which turns leaf tips black.",
    description: "An elegant fountain-like plant that produces cascading runners carrying baby versions of itself.",
    edible: false,
    medicinal: false
  },
  {
    id: "zz_plant",
    name: "ZZ Plant",
    scientific: "Zamioculcas zamiifolia",
    category: "indoor",
    emoji: "🌿",
    style: "spiky",
    leafColor: "#2C402E",
    potColor: "#8C6A56",
    sunlight: "Low light survivor. Avoid direct scorching sun.",
    watering: {
      Summer: "Water every 2-3 weeks when soil is dry.",
      Winter: "Water once a month. Can survive months without water.",
      Monsoon: "Water once every 3 weeks. Extremely rot-sensitive under humidity."
    },
    temperature: "18°C - 30°C",
    soil: "Gritty, highly draining cactus soil mix.",
    growth: "Slow",
    habitat: "Eastern Africa",
    diseases: "Rhizome rot, fungus gnats.",
    petSafety: "Toxic to pets.",
    pruning: "Rarely needed. Only cut off old stalks that turn yellow.",
    propagation: "Divide the bulbous rhizomes during repotting, or propagate from leaf stems.",
    mistakes: "Watering too frequently. The potato-like rhizomes store water underground.",
    description: "Features glossy, wax-like leaves that look polished. Perfect for dark offices or busy homeowners.",
    edible: false,
    medicinal: false
  },
  {
    id: "peace_lily",
    name: "Peace Lily",
    scientific: "Spathiphyllum",
    category: "indoor",
    emoji: "🌸",
    style: "broadleaf",
    leafColor: "#395D3C",
    potColor: "#DFD5C8",
    sunlight: "Low to medium indirect light. Blooms best in medium light.",
    watering: {
      Summer: "Water every 5-7 days. Keeps soil moist. Will dramatic-droop when thirsty.",
      Winter: "Water once every 7-10 days.",
      Monsoon: "Water every 6-8 days. Do not allow to dry completely."
    },
    temperature: "18°C - 26°C",
    soil: "Peat-rich organic soil with solid drainage capacity.",
    growth: "Moderate",
    habitat: "Tropical regions of the Americas",
    diseases: "Root rot, mealybugs, scale.",
    petSafety: "Toxic to cats and dogs.",
    pruning: "Cut spent white flower stalks near the base of the plant.",
    propagation: "Root division during spring repotting.",
    mistakes: "Letting it stay bone dry for too long, or using cold water which shocks roots.",
    description: "Displays elegant white sail-like flowers (spathes). It acts as a natural air purifier and a visual water indicator.",
    edible: false,
    medicinal: false
  },

  // TREES
  {
    id: "neem_tree",
    name: "Neem",
    scientific: "Azadirachta indica",
    category: "medicinal",
    emoji: "🌳",
    style: "tree",
    leafColor: "#587C56",
    potColor: "#8C6A56",
    sunlight: "Full, blazing sunlight. Requires outdoor spaces.",
    watering: {
      Summer: "Water deeply 2-3 times a week. Highly drought tolerant when mature.",
      Winter: "Water once a week or once in 10 days.",
      Monsoon: "Rarely needs watering. Ensure no stagnant water accumulates around roots."
    },
    temperature: "20°C - 45°C",
    soil: "Thrives in dry, sandy, clayey, or poor soils with neutral pH.",
    growth: "Fast",
    habitat: "Indian Subcontinent",
    diseases: "Leaf spot, powdery mildew.",
    petSafety: "Safe for pets in moderate quantities, but consult a vet.",
    pruning: "Trim lower branches to establish a clear trunk line.",
    propagation: "Grown easily from fresh green neem seeds.",
    mistakes: "Overwatering and placing in indoor rooms with low light.",
    description: "The miracle tree of India. Every part of this sacred tree is used in Ayurveda for purifying and organic pest control.",
    edible: true,
    medicinal: true
  },
  {
    id: "japanese_maple",
    name: "Japanese Maple",
    scientific: "Acer palmatum",
    category: "bonsai",
    emoji: "🍁",
    style: "tree",
    leafColor: "#8C3A3A",
    potColor: "#4D6A4F",
    sunlight: "Morning sun with afternoon shade. Leaf scorch occurs in blazing sun.",
    watering: {
      Summer: "Water daily. In pots, bonsai maples need watering twice a day on hot days.",
      Winter: "Water once every 3-5 days. Protect roots from freezing.",
      Monsoon: "Water once daily or skip if rain has thoroughly soaked the pot."
    },
    temperature: "-5°C - 30°C",
    soil: "Well-aerated organic akadama, pumice, and lava rock mixture.",
    growth: "Moderate",
    habitat: "Japan, Korea, and Eastern China",
    diseases: "Verticillium wilt, aphids, leaf scorch.",
    petSafety: "Non-toxic to dogs, cats, and horses.",
    pruning: "Pinch back spring growth to two leaf sets. Direct trunk line wiring in autumn.",
    propagation: "Softwood cuttings in summer or grafting.",
    mistakes: "Exposing to dry scorching wind, causing delicate red leaves to shrivel and fall.",
    description: "Renowned for its breathtaking autumn foliage. It is one of the most beloved deciduous trees in traditional Japanese gardens.",
    edible: false,
    medicinal: false
  },
  {
    id: "banyan_tree",
    name: "Banyan",
    scientific: "Ficus benghalensis",
    category: "trees",
    emoji: "🌳",
    style: "tree",
    leafColor: "#41603F",
    potColor: "#8C6A56",
    sunlight: "Full sun to bright partial shade.",
    watering: {
      Summer: "Water daily for young trees. Mature trees absorb water via aerial roots.",
      Winter: "Water once every 5-7 days.",
      Monsoon: "Relies on natural rains. Ensure soil drainage prevents clay compacting."
    },
    temperature: "15°C - 40°C",
    soil: "Rich, deep, loamy, well-draining garden soil.",
    growth: "Fast",
    habitat: "India",
    diseases: "Root rot, thrips, scale insects.",
    petSafety: "Toxic to cats and dogs (milky sap is irritating).",
    pruning: "Prune aerial roots if keeping in a restricted garden, or wire for spectacular bonsai forms.",
    propagation: "Air layering or woody stem cuttings.",
    mistakes: "Planting near building foundations. Its massive roots can crack concrete.",
    description: "The national tree of India. It grows aerial prop roots that drop down from branches to form new trunk colonnades.",
    edible: false,
    medicinal: true
  },
  {
    id: "ficus_ginseng",
    name: "Ginseng Ficus",
    scientific: "Ficus microcarpa",
    category: "bonsai",
    emoji: "🌳",
    style: "tree",
    leafColor: "#4D6A4F",
    potColor: "#C8A97E",
    sunlight: "Bright indirect light indoors, or partial outdoor sun.",
    watering: {
      Summer: "Water every 3-5 days. Mist leaves to increase humidity.",
      Winter: "Water once in 7-10 days. Keep soil slightly dry.",
      Monsoon: "Water every 5 days. Ensure tray has no stagnant water."
    },
    temperature: "15°C - 35°C",
    soil: "Bonsai soil mix (50% akadama, 50% organic compost).",
    growth: "Moderate",
    habitat: "Southeast Asia",
    diseases: "Root rot, leaf drop from sudden drafts, spider mites.",
    petSafety: "Toxic to pets.",
    pruning: "Cut back 2 leaves for every 6 leaves that grow on branches.",
    propagation: "Stem cuttings, roots easily in moist soil or water.",
    mistakes: "Moving it frequently. Ficus drops leaves in protest of sudden location changes.",
    description: "The ideal beginner's bonsai. It features thick, bulbous roots that resemble ginseng bulbs, topped with thick dark leaves.",
    edible: false,
    medicinal: false
  },

  // HERBS
  {
    id: "peppermint",
    name: "Peppermint",
    scientific: "Mentha x piperita",
    category: "herbs",
    emoji: "🌿",
    style: "vine",
    leafColor: "#5FA06A",
    potColor: "#EFE8E0",
    sunlight: "Partial shade to full morning sunlight.",
    watering: {
      Summer: "Water every 2 days. Soil must stay consistently moist.",
      Winter: "Water every 4-5 days.",
      Monsoon: "Water sparingly if kept outdoors, but keep soil moist."
    },
    temperature: "10°C - 28°C",
    soil: "Rich, moist, loamy organic potting soil.",
    growth: "Extremely Fast",
    habitat: "Europe and the Middle East",
    diseases: "Mint rust, powdery mildew.",
    petSafety: "Toxic to dogs and cats in large quantities.",
    pruning: "Harvest frequently! Cut stems back to stimulate thick bushy clusters.",
    propagation: "Extremely easy stem cuttings or root runners.",
    mistakes: "Planting in an open garden. Mint is highly invasive and will overtake other plants.",
    description: "Highly fragrant herb with cooling qualities. Perfect in refreshing teas, desserts, and organic bug-repelling sprays.",
    edible: true,
    medicinal: true
  },
  {
    id: "sweet_basil",
    name: "Sweet Basil",
    scientific: "Ocimum basilicum",
    category: "herbs",
    emoji: "🌿",
    style: "broadleaf",
    leafColor: "#82C182",
    potColor: "#8BA888",
    sunlight: "Full sunlight (6+ hours daily). Warmth is essential.",
    watering: {
      Summer: "Water daily. Soak roots early in the morning.",
      Winter: "Water every 3-4 days.",
      Monsoon: "Water every 2 days. Protect leaves from prolonged soggy rain."
    },
    temperature: "18°C - 35°C",
    soil: "Rich, loamy, moist soil with superior drainage.",
    growth: "Fast",
    habitat: "Tropical regions of Central Africa to Southeast Asia",
    diseases: "Fusarium wilt, downy mildew, slugs.",
    petSafety: "100% Safe for dogs and cats.",
    pruning: "Pinch off flower buds immediately to prevent the leaves from turning bitter (bolting).",
    propagation: "Stem cuttings placed in water root within a week.",
    mistakes: "Watering the leaves directly rather than the soil. Wet leaves lead to black spots.",
    description: "The aromatic king of herbs. Essential for Italian pestos, salads, and wood-fired pizzas.",
    edible: true,
    medicinal: false
  },

  // MEDICINAL
  {
    id: "aloe_vera",
    name: "Aloe Vera",
    scientific: "Aloe barbadensis miller",
    category: "medicinal",
    emoji: "🌵",
    style: "spiky",
    leafColor: "#70966C",
    potColor: "#8C6A56",
    sunlight: "Bright direct or indirect sunlight. Prefers south/west facing windows.",
    watering: {
      Summer: "Water deeply once every 2 weeks. Allow pot to dry completely.",
      Winter: "Water once every 3-4 weeks. Keep soil virtually dry.",
      Monsoon: "Water every 2-3 weeks. High atmospheric humidity reduces drying speed."
    },
    temperature: "13°C - 30°C",
    soil: "Cactus-succulent mix with gravel, perlite, and coarse sand.",
    growth: "Moderate",
    habitat: "Arabian Peninsula",
    diseases: "Root rot, aloe scale, mealybugs.",
    petSafety: "Toxic to cats and dogs.",
    pruning: "Remove outermost mature leaves by cutting at the very base for medicinal gel harvest.",
    propagation: "Separate and repot baby 'pups' that grow at the base of parent plant.",
    mistakes: "Frequent light waterings. It needs deep soakings followed by complete dryouts.",
    description: "Contains soothing aloin gel inside its fleshy leaves. Used globally for sunburn healing, skincare, and cosmetics.",
    edible: true,
    medicinal: true
  },
  {
    id: "holy_basil",
    name: "Tulsi (Holy Basil)",
    scientific: "Ocimum tenuiflorum",
    category: "medicinal",
    emoji: "🌿",
    style: "broadleaf",
    leafColor: "#694C38",
    potColor: "#C8A97E",
    sunlight: "Bright, direct sunlight (minimum 4-6 hours daily).",
    watering: {
      Summer: "Water daily. Keep soil moist but not waterlogged.",
      Winter: "Water every 3-4 days. Reduce water to prevent root cold shock.",
      Monsoon: "Water every 2 days. Ensure container pot drains instantly."
    },
    temperature: "15°C - 40°C",
    soil: "Clay loam with plenty of compost, very well-draining.",
    growth: "Fast",
    habitat: "Indian Subcontinent",
    diseases: "Leaf rollers, powdery mildew.",
    petSafety: "Generally safe, but large ingestion is not recommended.",
    pruning: "Pinch the tips of the branches to keep the plant bushy and stop seed-heads from forming.",
    propagation: "Easy to grow from seeds or stem cuttings.",
    mistakes: "Leaving it outdoors during cold winter frosts. Tulsi is highly sensitive to cold.",
    description: "Considered sacred in Hinduism, Tulsi is an adaptogenic herb that boosts immunity and fights respiratory issues.",
    edible: true,
    medicinal: true
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    scientific: "Withania somnifera",
    category: "medicinal",
    emoji: "🌿",
    style: "broadleaf",
    leafColor: "#7D9D7A",
    potColor: "#8C6A56",
    sunlight: "Full direct sun. Thrives in hot, dry climates.",
    watering: {
      Summer: "Water once a week. Extremely drought-resistant.",
      Winter: "Water once every 10-14 days.",
      Monsoon: "Avoid watering entirely if rainy. Roots rot easily."
    },
    temperature: "20°C - 38°C",
    soil: "Sandy, stony, alkaline soil with high drainage capacity.",
    growth: "Moderate",
    habitat: "India and Middle East",
    diseases: "Leaf spots, spider mites.",
    petSafety: "Toxic to pets in large amounts.",
    pruning: "Cut back main shoot to encourage lateral branch growth.",
    propagation: "Propagated via seeds sown in spring.",
    mistakes: "Placing in dense, moisture-holding clay soil. Roots will rot within days.",
    description: "Known as Indian Ginseng. Its roots have powerful anti-stress, restorative adaptogen values in Ayurvedic medicine.",
    edible: true,
    medicinal: true
  },

  // SUCCULENTS
  {
    id: "jade_plant",
    name: "Jade Plant",
    scientific: "Crassula ovata",
    category: "succulents",
    emoji: "🌿",
    style: "succulent",
    leafColor: "#5E8E5E",
    potColor: "#EFE8E0",
    sunlight: "Bright direct light (4+ hours). Leaf edges turn red with proper sun.",
    watering: {
      Summer: "Water once in 7-10 days when leaves feel slightly soft to squeeze.",
      Winter: "Water once every 3 weeks. Leaves store water.",
      Monsoon: "Water every 10-14 days. Avoid damp potting soil."
    },
    temperature: "15°C - 35°C",
    soil: "Cactus-succulent potting soil (1/3 perlite, 1/3 peat, 1/3 coarse sand).",
    growth: "Slow",
    habitat: "South Africa",
    diseases: "Mealybugs, soft scale, root rot.",
    petSafety: "Toxic to cats and dogs.",
    pruning: "Prune branches to maintain a miniature tree-like shape.",
    propagation: "Highly simple. Detach a leaf, let it callus, place on moist soil.",
    mistakes: "Shrivelling leaves due to complete underwatering, or squishy leaves from overwatering.",
    description: "The 'Money Tree' of Feng Shui. Features thick woody stems and plump coin-like emerald leaves.",
    edible: false,
    medicinal: false
  },

  // CARNIVOROUS
  {
    id: "venus_flytrap",
    name: "Venus Flytrap",
    scientific: "Dionaea muscipula",
    category: "carnivorous",
    emoji: "🪰",
    style: "spiky",
    leafColor: "#8BA888",
    potColor: "#202A21",
    sunlight: "Full direct sun. Needs high humidity.",
    watering: {
      Summer: "Always keep soil swamp-wet. Set pot in a tray filled with 1 inch of pure water.",
      Winter: "Keep soil barely damp. Allow winter dormancy period.",
      Monsoon: "Relies on rainwater. Perfect for rain collection."
    },
    temperature: "10°C - 35°C",
    soil: "Strict nutrient-poor mixture: 50% sphagnum moss, 50% perlite. NO regular soil.",
    growth: "Slow",
    habitat: "North and South Carolina Bogs",
    diseases: "Trap blackening, gray mold.",
    petSafety: "Non-toxic to pets.",
    pruning: "Blackened traps should be clipped at the leaf base.",
    propagation: "Rhizome division or seed fertilization.",
    mistakes: "Feeding it regular fertilizer or using tap water. Minerals kill carnivorous roots instantly. Use distilled or rain water only.",
    description: "Fascinating predator of the plant world. Its leaves snap shut in milliseconds when insects touch trigger hairs.",
    edible: false,
    medicinal: false
  },

  // AQUATIC
  {
    id: "water_lily",
    name: "Water Lily",
    scientific: "Nymphaeaceae",
    category: "aquatic",
    emoji: "🪷",
    style: "broadleaf",
    leafColor: "#4E7353",
    potColor: "#5FA06A",
    sunlight: "Full overhead sunlight (6+ hours). Necessary for flowers to open.",
    watering: {
      Summer: "Grows entirely submerged in water ponds. Maintain pond water levels.",
      Winter: "Submerge deep below the pond frost line to keep roots from freezing.",
      Monsoon: "Relies on rain to refresh pond levels."
    },
    temperature: "15°C - 32°C",
    soil: "Heavy clay garden loam covered with a layer of gravel inside pond baskets.",
    growth: "Fast",
    habitat: "Temperate and tropical ponds worldwide",
    diseases: "Crown rot, water lily aphids.",
    petSafety: "Leaves are generally safe, but keep pond water clean.",
    pruning: "Cut dying yellow leaves and spent blossoms near the root crown.",
    propagation: "Tuber division in early spring.",
    mistakes: "Placing in deep, moving, or splashing water (like near a waterfall). They require calm, still water.",
    description: "Floats majestically on pond surfaces. Offers shade for pond fish and yields gorgeous starburst blooms.",
    edible: false,
    medicinal: false
  },

  // NATIVE INDIAN PLANTS
  {
    id: "tulsi",
    name: "Tulsi (Holy Basil)",
    scientific: "Ocimum tenuiflorum",
    category: "medicinal",
    emoji: "🌿",
    style: "broadleaf",
    leafColor: "#694C38",
    potColor: "#C8A97E",
    sunlight: "Bright, direct sunlight (minimum 4-6 hours daily).",
    watering: {
      Summer: "Water daily. Keep soil moist but not waterlogged.",
      Winter: "Water every 3-4 days. Reduce water to prevent root cold shock.",
      Monsoon: "Water every 2 days. Ensure container pot drains instantly."
    },
    temperature: "15°C - 40°C",
    soil: "Clay loam with plenty of compost, very well-draining.",
    growth: "Fast",
    habitat: "Indian Subcontinent",
    diseases: "Leaf rollers, powdery mildew.",
    petSafety: "Generally safe, but large ingestion is not recommended.",
    pruning: "Pinch the tips of the branches to keep the plant bushy and stop seed-heads from forming.",
    propagation: "Easy to grow from seeds or stem cuttings.",
    mistakes: "Leaving it outdoors during cold winter frosts. Tulsi is highly sensitive to cold.",
    description: "Considered sacred in Hinduism, Tulsi is an adaptogenic herb that boosts immunity and fights respiratory issues.",
    edible: true,
    medicinal: true
  },
  {
    id: "curry_leaf",
    name: "Curry Leaf Plant",
    scientific: "Murraya koenigii",
    category: "herbs",
    emoji: "🌿",
    style: "broadleaf",
    leafColor: "#4A6B4A",
    potColor: "#8C6A56",
    sunlight: "Full sun to partial shade. Needs at least 6 hours of direct sunlight.",
    watering: {
      Summer: "Water every 2-3 days. Keep soil consistently moist.",
      Winter: "Water once a week. Reduce frequency significantly.",
      Monsoon: "Reduce watering to once every 4-5 days. Protect from excessive rain."
    },
    temperature: "18°C - 35°C",
    soil: "Well-draining loamy soil rich in organic matter.",
    growth: "Moderate",
    habitat: "India and Sri Lanka",
    diseases: "Leaf spot, aphids, scale insects.",
    petSafety: "Non-toxic to pets.",
    pruning: "Regularly prune to encourage bushy growth. Remove dead or yellowing leaves.",
    propagation: "Seeds or stem cuttings. Seeds take longer to germinate.",
    mistakes: "Overwatering leads to root rot. Not providing enough sunlight causes leggy growth.",
    description: "Essential for South Indian cuisine. The aromatic leaves add distinct flavor to curries and dishes.",
    edible: true,
    medicinal: true
  },
  {
    id: "mogra",
    name: "Mogra (Arabian Jasmine)",
    scientific: "Jasminum sambac",
    category: "flowers",
    emoji: "🌸",
    style: "vine",
    leafColor: "#5A8256",
    potColor: "#DFD5C8",
    sunlight: "Full sun to partial shade. At least 4-6 hours of direct sunlight.",
    watering: {
      Summer: "Water daily. Keep soil evenly moist.",
      Winter: "Water every 3-4 days. Allow top inch to dry between waterings.",
      Monsoon: "Water every 2-3 days. Ensure excellent drainage to prevent fungal issues."
    },
    temperature: "20°C - 35°C",
    soil: "Rich, well-draining soil with organic compost.",
    growth: "Fast",
    habitat: "Indian Subcontinent and Southeast Asia",
    diseases: "Aphids, whiteflies, leaf spot.",
    petSafety: "Non-toxic to pets.",
    pruning: "Prune after flowering to maintain shape and encourage new growth.",
    propagation: "Stem cuttings in water or soil. Roots easily in warm conditions.",
    mistakes: "Not providing enough sunlight reduces flowering. Overwatering causes yellow leaves.",
    description: "Fragrant white flowers used in garlands, perfumes, and religious offerings. Blooms throughout the year in warm climates.",
    edible: false,
    medicinal: true
  },
  {
    id: "amla",
    name: "Amla (Indian Gooseberry)",
    scientific: "Phyllanthus emblica",
    category: "medicinal",
    emoji: "🫐",
    style: "tree",
    leafColor: "#5E8560",
    potColor: "#8C6A56",
    sunlight: "Full sun. Thrives in bright, direct sunlight.",
    watering: {
      Summer: "Water every 3-4 days. Deep watering preferred.",
      Winter: "Water once every 7-10 days. Very drought tolerant once established.",
      Monsoon: "Minimal watering needed. Ensure soil doesn't become waterlogged."
    },
    temperature: "10°C - 45°C",
    soil: "Well-draining sandy loam soil. Tolerates poor soil conditions.",
    growth: "Slow to Moderate",
    habitat: "Indian Subcontinent",
    diseases: "Fruit rot, powdery mildew, aphids.",
    petSafety: "Safe for pets in moderation.",
    pruning: "Prune in late winter to remove dead or crossing branches.",
    propagation: "Seeds or grafting. Seeds take longer to fruit.",
    mistakes: "Overwatering young plants. Not protecting from extreme frost.",
    description: "Rich in Vitamin C and used extensively in Ayurvedic medicine. The fruits are used in pickles, jams, and health supplements.",
    edible: true,
    medicinal: true
  },
  {
    id: "brahmi",
    name: "Brahmi",
    scientific: "Bacopa monnieri",
    category: "medicinal",
    emoji: "🌿",
    style: "vine",
    leafColor: "#7AA276",
    potColor: "#8BA888",
    sunlight: "Partial shade to full sun. Prefers morning sun with afternoon shade.",
    watering: {
      Summer: "Keep consistently moist. Can grow in shallow water.",
      Winter: "Reduce watering but keep soil from drying completely.",
      Monsoon: "Thrives in rainy conditions. May not need additional watering."
    },
    temperature: "20°C - 35°C",
    soil: "Wet, marshy soil or can be grown hydroponically.",
    growth: "Fast",
    habitat: "Wetlands and marshy areas of India",
    diseases: "Root rot if waterlogged, fungal leaf spots.",
    petSafety: "Non-toxic to pets.",
    pruning: "Regular trimming encourages bushier growth.",
    propagation: "Stem cuttings that root easily in water or moist soil.",
    mistakes: "Allowing soil to dry out completely. Brahmi loves moisture.",
    description: "Revered in Ayurveda for enhancing memory and cognitive function. Often grown as an aquatic or semi-aquatic plant.",
    edible: true,
    medicinal: true
  },

  // POISONOUS PLANTS
  {
    id: "oleander",
    name: "Oleander",
    scientific: "Nerium oleander",
    category: "flowers",
    emoji: "🌸",
    style: "broadleaf",
    leafColor: "#5A8256",
    potColor: "#C8A97E",
    sunlight: "Full sun. Needs at least 6 hours of direct sunlight.",
    watering: {
      Summer: "Water every 2-3 days. Allow soil to dry slightly between waterings.",
      Winter: "Water once a week. Reduce frequency significantly.",
      Monsoon: "Water sparingly. Ensure excellent drainage."
    },
    temperature: "5°C - 40°C",
    soil: "Well-draining soil. Tolerates poor soil and coastal conditions.",
    growth: "Fast",
    habitat: "Mediterranean region, now widespread",
    diseases: "Scale insects, aphids, oleander caterpillar.",
    petSafety: "HIGHLY TOXIC to all pets and humans. All parts are poisonous if ingested.",
    pruning: "Prune in late winter or early spring. Wear gloves as sap is toxic.",
    propagation: "Stem cuttings in water or soil.",
    mistakes: "Planting near areas where children or pets play. Not wearing gloves when pruning.",
    description: "Beautiful flowering shrub with showy blooms in pink, white, or red. Extremely toxic - handle with care and keep away from pets and children.",
    edible: false,
    medicinal: false
  },
  {
    id: "dumb_cane",
    name: "Dumb Cane",
    scientific: "Dieffenbachia",
    category: "indoor",
    emoji: "🌿",
    style: "broadleaf",
    leafColor: "#7AA276",
    potColor: "#DFD5C8",
    sunlight: "Bright indirect light. Tolerates lower light but grows slower.",
    watering: {
      Summer: "Water every 5-7 days. Keep soil evenly moist.",
      Winter: "Water every 10-14 days. Allow top inch to dry.",
      Monsoon: "Water every 7-10 days. Monitor soil moisture closely."
    },
    temperature: "15°C - 30°C",
    soil: "Rich, well-draining potting soil with perlite.",
    growth: "Moderate to Fast",
    habitat: "Tropical Americas",
    diseases: "Root rot, spider mites, bacterial leaf spot.",
    petSafety: "HIGHLY TOXIC. Causes swelling and temporary loss of speech if ingested.",
    pruning: "Remove yellow or damaged leaves at the base.",
    propagation: "Stem cuttings. Wear gloves when handling.",
    mistakes: "Overwatering leads to root rot. Not wearing gloves when handling - sap is toxic.",
    description: "Popular indoor plant with large patterned leaves. Named 'Dumb Cane' because chewing it causes temporary speech loss due to toxicity.",
    edible: false,
    medicinal: false
  },
  {
    id: "poinsettia",
    name: "Poinsettia",
    scientific: "Euphorbia pulcherrima",
    category: "flowers",
    emoji: "🌺",
    style: "broadleaf",
    leafColor: "#C15C5C",
    potColor: "#DFD5C8",
    sunlight: "Bright indirect light. Direct sun can burn the colorful bracts.",
    watering: {
      Summer: "Water when soil surface feels dry. Usually every 5-7 days.",
      Winter: "Water less frequently. Allow soil to dry slightly more.",
      Monsoon: "Water sparingly. Protect from excessive rain."
    },
    temperature: "15°C - 24°C",
    soil: "Well-draining potting soil with good aeration.",
    growth: "Moderate",
    habitat: "Mexico and Central America",
    diseases: "Root rot, powdery mildew, botrytis.",
    petSafety: "Mildly toxic to cats and dogs. Sap can cause irritation.",
    pruning: "Prune in spring to encourage bushy growth. Wear gloves as sap is irritating.",
    propagation: "Stem cuttings in spring or early summer.",
    mistakes: "Exposing to cold drafts or temperatures below 10°C. Overwatering.",
    description: "Iconic Christmas plant with bright red bracts. The colorful parts are actually modified leaves, not flowers.",
    edible: false,
    medicinal: false
  },

  // MORE FLOWERS
  {
    id: "jasmine",
    name: "Jasmine",
    scientific: "Jasminum officinale",
    category: "flowers",
    emoji: "🌸",
    style: "vine",
    leafColor: "#5A8256",
    potColor: "#C8A97E",
    sunlight: "Full sun to partial shade. At least 4-6 hours of direct sunlight.",
    watering: {
      Summer: "Water every 2-3 days. Keep soil consistently moist.",
      Winter: "Water once a week. Allow top inch to dry between waterings.",
      Monsoon: "Water every 3-4 days. Ensure excellent drainage."
    },
    temperature: "15°C - 30°C",
    soil: "Rich, well-draining soil with organic compost.",
    growth: "Fast",
    habitat: "Persian region, now cultivated worldwide",
    diseases: "Aphids, whiteflies, leaf spot.",
    petSafety: "Non-toxic to pets.",
    pruning: "Prune after flowering to maintain shape and encourage new growth.",
    propagation: "Stem cuttings in water or soil. Layering also works well.",
    mistakes: "Not providing enough sunlight reduces flowering. Overwatering causes root rot.",
    description: "Fragrant climbing vine prized for its intensely fragrant white flowers. Used in perfumes, teas, and essential oils.",
    edible: true,
    medicinal: true
  },
  {
    id: "chrysanthemum",
    name: "Chrysanthemum",
    scientific: "Chrysanthemum morifolium",
    category: "flowers",
    emoji: "🌼",
    style: "flower",
    leafColor: "#7AA276",
    potColor: "#8BA888",
    sunlight: "Full sun. Needs at least 6 hours of direct sunlight.",
    watering: {
      Summer: "Water every 2-3 days. Keep soil evenly moist.",
      Winter: "Water once a week. Reduce frequency significantly.",
      Monsoon: "Water sparingly. Protect from excessive rain and humidity."
    },
    temperature: "15°C - 25°C",
    soil: "Well-draining, fertile soil rich in organic matter.",
    growth: "Moderate",
    habitat: "Asia and northeastern Europe",
    diseases: "Aphids, powdery mildew, leaf spot.",
    petSafety: "Toxic to cats and dogs if ingested.",
    pruning: "Pinch back growing tips to encourage bushy growth. Deadhead spent flowers.",
    propagation: "Stem cuttings, division, or seeds.",
    mistakes: "Overwatering leads to root rot. Not pinching back results in leggy plants.",
    description: "Beautiful autumn-blooming flowers available in many colors. Symbol of longevity and rejuvenation in many cultures.",
    edible: true,
    medicinal: true
  },
  {
    id: "dahlia",
    name: "Dahlia",
    scientific: "Dahlia",
    category: "flowers",
    emoji: "🌸",
    style: "flower",
    leafColor: "#5A8256",
    potColor: "#DFD5C8",
    sunlight: "Full sun. Needs at least 6 hours of direct sunlight.",
    watering: {
      Summer: "Water deeply 2-3 times per week. Ensure soil doesn't dry completely.",
      Winter: "Water once every 10-14 days. Dormant in winter in cold climates.",
      Monsoon: "Minimal watering needed. Protect tubers from excessive moisture."
    },
    temperature: "15°C - 25°C",
    soil: "Rich, well-draining soil with plenty of organic matter.",
    growth: "Fast",
    habitat: "Mexico and Central America",
    diseases: "Powdery mildew, botrytis, slugs.",
    petSafety: "Toxic to pets if ingested in large quantities.",
    pruning: "Deadhead spent flowers to encourage more blooms. Cut back in fall.",
    propagation: "Tuber division in spring. Also from cuttings.",
    mistakes: "Overwatering tubers causes rot. Not providing enough support for large varieties.",
    description: "Stunning flowers available in endless colors and forms. Tubers must be dug up and stored in winter in cold climates.",
    edible: false,
    medicinal: false
  },

  // MORE HERBS
  {
    id: "lemongrass",
    name: "Lemongrass",
    scientific: "Cymbopogon citratus",
    category: "herbs",
    emoji: "🌿",
    style: "grassy",
    leafColor: "#7EA77B",
    potColor: "#8C6A56",
    sunlight: "Full sun. Needs at least 6 hours of direct sunlight.",
    watering: {
      Summer: "Water every 2-3 days. Keep soil consistently moist.",
      Winter: "Water once a week. Allow soil to dry slightly between waterings.",
      Monsoon: "Water sparingly. Protect from waterlogging."
    },
    temperature: "15°C - 35°C",
    soil: "Well-draining sandy loam soil rich in organic matter.",
    growth: "Fast",
    habitat: "Southeast Asia",
    diseases: "Rust, leaf blight, fungal infections in high humidity.",
    petSafety: "Non-toxic to pets.",
    pruning: "Harvest stalks by cutting at ground level. Regular harvesting encourages new growth.",
    propagation: "Division of clumps or stem cuttings.",
    mistakes: "Allowing soil to dry completely. Not harvesting regularly reduces flavor.",
    description: "Aromatic herb with citrus flavor used extensively in Asian cuisine. The stalks are used in teas, soups, and curries.",
    edible: true,
    medicinal: true
  },
  {
    id: "mint_variety",
    name: "Spearmint",
    scientific: "Mentha spicata",
    category: "herbs",
    emoji: "🌿",
    style: "vine",
    leafColor: "#5FA06A",
    potColor: "#EFE8E0",
    sunlight: "Partial shade to full morning sunlight.",
    watering: {
      Summer: "Water every 2 days. Soil must stay consistently moist.",
      Winter: "Water every 4-5 days.",
      Monsoon: "Water sparingly if kept outdoors, but keep soil moist."
    },
    temperature: "10°C - 28°C",
    soil: "Rich, moist, loamy organic potting soil.",
    growth: "Extremely Fast",
    habitat: "Europe and Asia",
    diseases: "Mint rust, powdery mildew.",
    petSafety: "Toxic to dogs and cats in large quantities.",
    pruning: "Harvest frequently! Cut stems back to stimulate thick bushy clusters.",
    propagation: "Extremely easy stem cuttings or root runners.",
    mistakes: "Planting in an open garden. Mint is highly invasive and will overtake other plants.",
    description: "Milder and sweeter than peppermint. Perfect for mojitos, teas, and garnishes. Grows vigorously in containers.",
    edible: true,
    medicinal: true
  },
  {
    id: "dill",
    name: "Dill",
    scientific: "Anethum graveolens",
    category: "herbs",
    emoji: "🌿",
    style: "grassy",
    leafColor: "#7EA77B",
    potColor: "#EFE8E0",
    sunlight: "Full sun. Needs at least 6 hours of direct sunlight.",
    watering: {
      Summer: "Water every 2-3 days. Keep soil evenly moist.",
      Winter: "Water once a week. Allow top inch to dry.",
      Monsoon: "Water sparingly. Protect from excessive rain."
    },
    temperature: "15°C - 25°C",
    soil: "Well-draining soil rich in organic matter.",
    growth: "Fast",
    habitat: "Eurasia",
    diseases: "Aphids, powdery mildew.",
    petSafety: "Non-toxic to pets.",
    pruning: "Harvest leaves as needed. Pinch flower buds to extend leaf production.",
    propagation: "Direct sowing seeds. Doesn't transplant well.",
    mistakes: "Allowing to flower reduces leaf quality. Not providing enough sun causes leggy growth.",
    description: "Feathery leaves with distinct flavor essential for pickles, salads, and fish dishes. Attracts beneficial insects to the garden.",
    edible: true,
    medicinal: true
  },

  // MORE SUCCULENTS
  {
    id: "string_of_pearls",
    name: "String of Pearls",
    scientific: "Senecio rowleyanus",
    category: "succulents",
    emoji: "📿",
    style: "vine",
    leafColor: "#7EA77B",
    potColor: "#DFD5C8",
    sunlight: "Bright indirect light. Some morning sun is beneficial.",
    watering: {
      Summer: "Water every 7-10 days. Allow soil to dry completely between waterings.",
      Winter: "Water once every 3-4 weeks. Very minimal water in dormancy.",
      Monsoon: "Water every 2-3 weeks. Protect from excessive humidity and rain."
    },
    temperature: "15°C - 25°C",
    soil: "Well-draining cactus or succulent mix with extra perlite.",
    growth: "Moderate",
    habitat: "Southwest Africa",
    diseases: "Root rot, mealybugs, aphids.",
    petSafety: "Toxic to cats and dogs if ingested.",
    pruning: "Trim leggy stems to encourage fuller growth. Pruned stems can be propagated.",
    propagation: "Stem cuttings laid on soil surface. Roots easily from nodes.",
    mistakes: "Overwatering is the main cause of death. Not providing enough light causes sparse growth.",
    description: "Unique trailing succulent with pea-like leaves. Perfect for hanging baskets where the strands can cascade down.",
    edible: false,
    medicinal: false
  },
  {
    id: "kalanchoe",
    name: "Kalanchoe",
    scientific: "Kalanchoe blossfeldiana",
    category: "succulents",
    emoji: "🌸",
    style: "broadleaf",
    leafColor: "#5A8256",
    potColor: "#DFD5C8",
    sunlight: "Bright indirect light. Direct sun can burn leaves.",
    watering: {
      Summer: "Water every 7-10 days. Allow soil to dry slightly between waterings.",
      Winter: "Water once every 2-3 weeks. Very minimal water.",
      Monsoon: "Water every 2-3 weeks. Protect from excessive moisture."
    },
    temperature: "15°C - 28°C",
    soil: "Well-draining succulent mix with good aeration.",
    growth: "Moderate",
    habitat: "Madagascar",
    diseases: "Root rot, powdery mildew, mealybugs.",
    petSafety: "Toxic to cats and dogs if ingested.",
    pruning: "Remove spent flowers to encourage reblooming. Prune leggy stems.",
    propagation: "Leaf cuttings or stem cuttings. Very easy to propagate.",
    mistakes: "Overwatering leads to root rot. Not providing enough light reduces flowering.",
    description: "Popular flowering succulent with clusters of small colorful blooms. Long-lasting flowers in shades of red, pink, yellow, and orange.",
    edible: false,
    medicinal: false
  },

  // MORE TROPICAL PLANTS
  {
    id: "bird_of_paradise",
    name: "Bird of Paradise",
    scientific: "Strelitzia reginae",
    category: "tropical",
    emoji: "🌺",
    style: "broadleaf",
    leafColor: "#5A8256",
    potColor: "#C8A97E",
    sunlight: "Bright indirect light to full sun. More sun encourages flowering.",
    watering: {
      Summer: "Water every 5-7 days. Keep soil consistently moist but not waterlogged.",
      Winter: "Water every 10-14 days. Allow soil to dry slightly between waterings.",
      Monsoon: "Water every 7-10 days. Ensure excellent drainage."
    },
    temperature: "18°C - 30°C",
    soil: "Rich, well-draining soil with organic matter.",
    growth: "Slow to Moderate",
    habitat: "South Africa",
    diseases: "Root rot, scale insects, fungal leaf spot.",
    petSafety: "Mildly toxic to cats and dogs if ingested.",
    pruning: "Remove damaged or yellow leaves at the base. Deadhead spent flowers.",
    propagation: "Division of clumps or from seeds (seeds take long to germinate).",
    mistakes: "Overwatering causes root rot. Not providing enough light prevents flowering.",
    description: "Stunning tropical plant with banana-like leaves and exotic flowers resembling a bird in flight. Can grow quite large indoors.",
    edible: false,
    medicinal: false
  },
  {
    id: "hoya",
    name: "Hoya (Wax Plant)",
    scientific: "Hoya carnosa",
    category: "tropical",
    emoji: "🌸",
    style: "vine",
    leafColor: "#5A8256",
    potColor: "#DFD5C8",
    sunlight: "Bright indirect light. Some morning sun is beneficial.",
    watering: {
      Summer: "Water every 7-10 days. Allow soil to dry slightly between waterings.",
      Winter: "Water every 2-3 weeks. Reduce frequency significantly.",
      Monsoon: "Water every 10-14 days. Protect from excessive humidity."
    },
    temperature: "15°C - 28°C",
    soil: "Well-draining mix with orchid bark, perlite, and peat moss.",
    growth: "Slow to Moderate",
    habitat: "Australia and Eastern Asia",
    diseases: "Mealybugs, scale insects, root rot.",
    petSafety: "Toxic to cats and dogs if ingested.",
    pruning: "Prune to control size. Don't remove flower spurs as they rebloom from same spots.",
    propagation: "Stem cuttings with at least 2 nodes. Roots easily in water or soil.",
    mistakes: "Overwatering causes root rot. Removing flower spurs prevents future blooms.",
    description: "Beautiful vining plant with waxy leaves and clusters of star-shaped flowers. Very long-lived and easy to care for.",
    edible: false,
    medicinal: false
  },

  // MORE EDIBLE PLANTS
  {
    id: "tomato",
    name: "Tomato",
    scientific: "Solanum lycopersicum",
    category: "edible",
    emoji: "🍅",
    style: "broadleaf",
    leafColor: "#5A8256",
    potColor: "#8BA888",
    sunlight: "Full sun. Needs at least 6-8 hours of direct sunlight.",
    watering: {
      Summer: "Water deeply every 2-3 days. Keep soil consistently moist.",
      Winter: "Not grown outdoors in winter in cold climates.",
      Monsoon: "Protect from excessive rain. Ensure good air circulation."
    },
    temperature: "18°C - 30°C",
    soil: "Rich, well-draining soil with plenty of compost.",
    growth: "Fast",
    habitat: "South America, now cultivated worldwide",
    diseases: "Early blight, late blight, aphids, hornworms.",
    petSafety: "Toxic to cats and dogs. Leaves and stems contain solanine.",
    pruning: "Remove suckers to encourage stronger main stems. Support with cages or stakes.",
    propagation: "Seeds started indoors 6-8 weeks before last frost.",
    mistakes: "Overhead watering spreads disease. Not providing support causes plants to fall over.",
    description: "Popular home garden vegetable. Homegrown tomatoes taste far superior to store-bought. Many varieties available.",
    edible: true,
    medicinal: false
  },
  {
    id: "chili_pepper",
    name: "Chili Pepper",
    scientific: "Capsicum",
    category: "edible",
    emoji: "🌶️",
    style: "broadleaf",
    leafColor: "#5A8256",
    potColor: "#C8A97E",
    sunlight: "Full sun. Needs at least 6-8 hours of direct sunlight.",
    watering: {
      Summer: "Water every 2-3 days. Keep soil evenly moist.",
      Winter: "Not grown outdoors in winter in cold climates.",
      Monsoon: "Protect from excessive rain. Ensure good drainage."
    },
    temperature: "20°C - 30°C",
    soil: "Well-draining soil rich in organic matter.",
    growth: "Fast",
    habitat: "Americas, now cultivated worldwide",
    diseases: "Aphids, fungal diseases, blossom end rot.",
    petSafety: "Irritating to pets. Capsaicin can cause discomfort.",
    pruning: "Pinch early growth to encourage bushiness. Support heavy plants.",
    propagation: "Seeds started indoors 8-10 weeks before last frost.",
    mistakes: "Overwatering causes root rot. Not providing enough heat reduces fruit production.",
    description: "Spicy peppers add heat to cuisines worldwide. From mild bell peppers to fiery habaneros, there's a variety for every taste.",
    edible: true,
    medicinal: true
  }
];

// Dynamically generate the remaining 42 plants to fulfill the 50 plant minimum
const extraPlantsConfig = [
  // INDOOR
  { id: "fiddle_leaf_fig", name: "Fiddle Leaf Fig", scientific: "Ficus lyrata", category: "indoor", style: "broadleaf", emoji: "🪴", leafColor: "#2C402E", potColor: "#DFD5C8" },
  { id: "prayer_plant", name: "Prayer Plant", scientific: "Maranta leuconeura", category: "indoor", style: "vine", emoji: "🌿", leafColor: "#7AA276", potColor: "#EFE8E0" },
  { id: "english_ivy", name: "English Ivy", scientific: "Hedera helix", category: "indoor", style: "vine", emoji: "🍃", leafColor: "#395D3C", potColor: "#C8A97E" },
  { id: "boston_fern", name: "Boston Fern", scientific: "Nephrolepis exaltata", category: "indoor", style: "grassy", emoji: "🌿", leafColor: "#85AB8C", potColor: "#8C6A56" },
  { id: "chinese_evergreen", name: "Chinese Evergreen", scientific: "Aglaonema", category: "indoor", style: "broadleaf", emoji: "🪴", leafColor: "#5FA06A", potColor: "#DFD5C8" },
  { id: "cast_iron_plant", name: "Cast Iron Plant", scientific: "Aspidistra elatior", category: "indoor", style: "broadleaf", emoji: "🌿", leafColor: "#2A3C2D", potColor: "#8BA888" },
  { id: "parlor_palm", name: "Parlor Palm", scientific: "Chamaedorea elegans", category: "indoor", style: "grassy", emoji: "🌴", leafColor: "#5E8560", potColor: "#DFD5C8" },
  { id: "rubber_plant", name: "Rubber Plant", scientific: "Ficus elastica", category: "indoor", style: "broadleaf", emoji: "🪴", leafColor: "#223324", potColor: "#8C6A56" },

  // TREES
  { id: "cherry_blossom", name: "Cherry Blossom", scientific: "Prunus serrulata", category: "trees", style: "tree", emoji: "🌸", leafColor: "#F4C2C2", potColor: "#DFD5C8" },
  { id: "jacaranda", name: "Jacaranda", scientific: "Jacaranda mimosifolia", category: "trees", style: "tree", emoji: "🌳", leafColor: "#70648E", potColor: "#8BA888" },
  { id: "ginkgo", name: "Ginkgo Biloba", scientific: "Ginkgo biloba", category: "trees", style: "tree", emoji: "🍂", leafColor: "#E2C85D", potColor: "#8C6A56" },
  { id: "mango_tree", name: "Mango Tree", scientific: "Mangifera indica", category: "trees", style: "tree", emoji: "🥭", leafColor: "#4B6B4A", potColor: "#8C6A56" },
  { id: "pine_tree", name: "Scotch Pine", scientific: "Pinus sylvestris", category: "trees", style: "spiky", emoji: "🌲", leafColor: "#3B523A", potColor: "#C8A97E" },
  { id: "white_oak", name: "White Oak", scientific: "Quercus alba", category: "trees", style: "tree", emoji: "🌳", leafColor: "#475F46", potColor: "#8C6A56" },

  // FLOWERS
  { id: "red_rose", name: "Red Rose", scientific: "Rosa rubiginosa", category: "flowers", style: "flower", emoji: "🌹", leafColor: "#9A2A2A", potColor: "#C8A97E" },
  { id: "sunflower", name: "Sunflower", scientific: "Helianthus annuus", category: "flowers", style: "flower", emoji: "🌻", leafColor: "#DAB98D", potColor: "#EFE8E0" },
  { id: "lavender", name: "English Lavender", scientific: "Lavandula angustifolia", category: "flowers", style: "grassy", emoji: "🪻", leafColor: "#7B6F9D", potColor: "#8BA888" },
  { id: "hibiscus", name: "Shoeblack Hibiscus", scientific: "Hibiscus rosa-sinensis", category: "flowers", style: "flower", emoji: "🌺", leafColor: "#C15C5C", potColor: "#8C6A56" },
  { id: "orchid", name: "Moth Orchid", scientific: "Phalaenopsis", category: "flowers", style: "flower", emoji: "🪻", leafColor: "#A686B8", potColor: "#DFD5C8" },
  { id: "marigold", name: "Tagetes Marigold", scientific: "Tagetes erecta", category: "flowers", style: "flower", emoji: "🌼", leafColor: "#D08848", potColor: "#8BA888" },

  // HERBS
  { id: "rosemary", name: "Rosemary", scientific: "Salvia rosmarinus", category: "herbs", style: "spiky", emoji: "🌿", leafColor: "#5C7C5A", potColor: "#8C6A56" },
  { id: "coriander", name: "Coriander", scientific: "Coriandrum sativum", category: "herbs", style: "grassy", emoji: "🌿", leafColor: "#7EA77B", potColor: "#EFE8E0" },
  { id: "parsley", name: "Curly Parsley", scientific: "Petroselinum crispum", category: "herbs", style: "grassy", emoji: "🌿", leafColor: "#699466", potColor: "#8BA888" },
  { id: "thyme", name: "Common Thyme", scientific: "Thymus vulgaris", category: "herbs", style: "vine", emoji: "🌿", leafColor: "#5B7558", potColor: "#C8A97E" },
  { id: "oregano", name: "Greek Oregano", scientific: "Origanum vulgare", category: "herbs", style: "vine", emoji: "🌿", leafColor: "#779E73", potColor: "#EFE8E0" },

  // MEDICINAL
  { id: "turmeric", name: "Turmeric", scientific: "Curcuma longa", category: "medicinal", style: "broadleaf", emoji: "🌿", leafColor: "#A2C19E", potColor: "#8C6A56" },
  { id: "ginger", name: "Ginger", scientific: "Zingiber officinale", category: "medicinal", style: "grassy", emoji: "🫚", leafColor: "#7EA27A", potColor: "#C8A97E" },
  { id: "chamomile", name: "German Chamomile", scientific: "Matricaria chamomilla", category: "medicinal", style: "flower", emoji: "🌼", leafColor: "#DAB98D", potColor: "#8BA888" },
  { id: "ginseng", name: "Asian Ginseng", scientific: "Panax ginseng", category: "medicinal", style: "broadleaf", emoji: "🌿", leafColor: "#89A887", potColor: "#8C6A56" },

  // SUCCULENTS
  { id: "zebra_cactus", name: "Zebra Cactus", scientific: "Haworthiopsis fasciata", category: "succulents", style: "spiky", emoji: "🌵", leafColor: "#344B36", potColor: "#C8A97E" },
  { id: "echeveria", name: "Echeveria Elegans", scientific: "Echeveria elegans", category: "succulents", style: "succulent", emoji: "🪷", leafColor: "#79A3A1", potColor: "#DFD5C8" },
  { id: "burros_tail", name: "Burro's Tail", scientific: "Sedum morganianum", category: "succulents", style: "vine", emoji: "🌿", leafColor: "#87B49B", potColor: "#8C6A56" },
  { id: "saguaro", name: "Saguaro Cactus", scientific: "Carnegiea gigantea", category: "succulents", style: "spiky", emoji: "🌵", leafColor: "#4B664D", potColor: "#8C6A56" },
  { id: "golden_barrel", name: "Golden Barrel Cactus", scientific: "Echinocactus grusonii", category: "succulents", style: "spiky", emoji: "🌵", leafColor: "#C8A97E", potColor: "#DFD5C8" },

  // CARNIVOROUS
  { id: "pitcher_plant", name: "Purple Pitcher Plant", scientific: "Sarracenia purpurea", category: "carnivorous", style: "spiky", emoji: "🪰", leafColor: "#8C4A4A", potColor: "#202A21" },
  { id: "sundew", name: "Cape Sundew", scientific: "Drosera capensis", category: "carnivorous", style: "spiky", emoji: "🌱", leafColor: "#A65B7D", potColor: "#8C6A56" },
  { id: "butterwort", name: "Common Butterwort", scientific: "Pinguicula vulgaris", category: "carnivorous", style: "succulent", emoji: "🌸", leafColor: "#A2BE9E", potColor: "#DFD5C8" },

  // AQUATIC
  { id: "duckweed", name: "Common Duckweed", scientific: "Lemna minor", category: "aquatic", style: "succulent", emoji: "🌱", leafColor: "#82C182", potColor: "#4D6A4F" },
  { id: "water_hyacinth", name: "Water Hyacinth", scientific: "Eichhornia crassipes", category: "aquatic", style: "broadleaf", emoji: "🌸", leafColor: "#618960", potColor: "#C8A97E" },
  { id: "hornwort", name: "Hornwort", scientific: "Ceratophyllum demersum", category: "aquatic", style: "grassy", emoji: "🌿", leafColor: "#446B42", potColor: "#8BA888" },
  { id: "lotus_aquatic", name: "Sacred Lotus", scientific: "Nelumbo nucifera", category: "aquatic", style: "flower", emoji: "🪷", leafColor: "#D69BB5", potColor: "#EFE8E0" },
  
  // BONSAI
  { id: "juniper_bonsai", name: "Juniper Bonsai", scientific: "Juniperus procumbens", category: "bonsai", style: "tree", emoji: "🌳", leafColor: "#3E573F", potColor: "#8C6A56" },
  { id: "pine_bonsai", name: "Japanese Black Pine", scientific: "Pinus thunbergii", category: "bonsai", style: "spiky", emoji: "🌲", leafColor: "#2E3F2F", potColor: "#C8A97E" }
];

// Auto-fill template values for procedural expansion to ensure extreme detail
extraPlantsConfig.forEach(cfg => {
  const isEdible = ['herbs', 'flowers'].includes(cfg.category) || cfg.id === "mango_tree";
  const isMedicinal = cfg.category === 'medicinal' || ['ashwagandha', 'holy_basil', 'neem_tree'].includes(cfg.id);
  
  window.Botaniq.PlantsData.push({
    id: cfg.id,
    name: cfg.name,
    scientific: cfg.scientific,
    category: cfg.category,
    emoji: cfg.emoji,
    style: cfg.style,
    leafColor: cfg.leafColor,
    potColor: cfg.potColor,
    sunlight: `Thrives in bright indirect ${cfg.category === 'succulents' || cfg.category === 'trees' ? 'direct sunlight' : 'shuffled shadows'}.`,
    watering: {
      Summer: `Water every ${cfg.category === 'succulents' ? '10-14' : cfg.category === 'aquatic' ? 'day (maintain water level)' : '4-6'} days.`,
      Winter: `Reduce watering, apply every ${cfg.category === 'succulents' ? '25-30' : '10-14'} days to prevent root hibernation rot.`,
      Monsoon: `Keep drainage holes completely clear. Water once every ${cfg.category === 'succulents' ? '20' : '8-10'} days.`
    },
    temperature: "14°C - 32°C",
    soil: `${cfg.category === 'succulents' ? 'Coarse sand, pumice, potting loam' : cfg.category === 'aquatic' ? 'Calm heavy clay loam mud' : 'Organic rich peat with high perlite drainage'}.`,
    growth: cfg.category === 'trees' || cfg.category === 'bonsai' ? 'Slow' : 'Moderate to Fast',
    habitat: "Indo-Pacific and tropical biomes",
    diseases: "Aphids, leaf spot rust, overwatering yellow root decline.",
    petSafety: cfg.category === 'ferns' || cfg.id === 'zebra_cactus' ? "100% Safe for dogs and cats." : "Keep away from pets. Mild foliage toxins.",
    pruning: "Pinch tip shoots to maintain neat shapes, prune yellow bottom leaf clusters.",
    propagation: `${cfg.category === 'succulents' ? 'Single leaf soil scaling' : 'Stem leaf-node water propagation root development'}.`,
    mistakes: "Poor drainage and dark low-light stagnant ventilation rooms.",
    description: `A stunning variety of ${cfg.name} curated specifically for modern collectors and botany scholars looking to enrich their botanical sanctuary.`,
    edible: isEdible,
    medicinal: isMedicinal
  });
});

/**
 * Procedural SVG Botanical Illustrator
 * Renders high-fidelity, organic SVG illustrations based on plant styles!
 */
window.Botaniq.drawPlantIllustration = function(plant) {
  const leafColor = plant.leafColor || '#8BA888';
  const potColor = plant.potColor || '#8C6A56';
  const style = plant.style || 'broadleaf';
  
  // Base SVG wrapper
  let svg = `<svg viewBox="0 0 100 120" class="botanical-svg" style="width: 100%; height: 100%; max-height: 180px;">`;
  
  // Render Background glow
  svg += `<circle cx="50" cy="50" r="45" fill="rgba(139, 168, 136, 0.06)" />`;
  
  // Render Plant Stems / Leaves based on styles
  if (style === 'spiky') {
    // Render spiky leaves (Snake Plant, Cactus, Aloe)
    svg += `
      <!-- Spiky Stalks -->
      <path d="M50 80 Q45 40 40 15 Q50 35 50 80" fill="${leafColor}" opacity="0.9"/>
      <path d="M50 80 Q35 45 28 25 Q42 45 50 80" fill="${leafColor}" opacity="0.8"/>
      <path d="M50 80 Q65 45 72 25 Q58 45 50 80" fill="${leafColor}" opacity="0.8"/>
      <path d="M50 80 Q25 55 18 40 Q35 60 50 80" fill="${leafColor}" opacity="0.7"/>
      <path d="M50 80 Q75 55 82 40 Q65 60 50 80" fill="${leafColor}" opacity="0.7"/>
    `;
  } else if (style === 'broadleaf') {
    // Render wide leaves (Monstera, Fiddle Leaf)
    svg += `
      <!-- Stems -->
      <path d="M50 80 Q45 50 35 30" stroke="#4D6A4F" stroke-width="2" fill="none"/>
      <path d="M50 80 Q55 55 68 35" stroke="#4D6A4F" stroke-width="2" fill="none"/>
      <path d="M50 80 L50 20" stroke="#4D6A4F" stroke-width="2.5" fill="none"/>
      
      <!-- Broad Leaves with splits -->
      <path d="M35 30 C20 15 15 35 35 45 C45 35 40 20 35 30" fill="${leafColor}"/>
      <path d="M68 35 C83 20 88 40 68 50 C58 40 63 25 68 35" fill="${leafColor}"/>
      <path d="M50 20 C35 0 25 20 50 35 C65 20 60 0 50 20" fill="${leafColor}"/>
    `;
  } else if (style === 'vine') {
    // Render trailing vines (Pothos, Ivy)
    svg += `
      <!-- Trailing Vine Strands -->
      <path d="M50 75 Q30 85 20 100" stroke="#4D6A4F" stroke-width="1.5" fill="none"/>
      <path d="M50 75 Q70 85 80 100" stroke="#4D6A4F" stroke-width="1.5" fill="none"/>
      
      <!-- Hanging Heart Leaves -->
      <path d="M20 100 C15 95 10 100 20 106 C25 100 20 95 20 100" fill="${leafColor}"/>
      <path d="M30 85 C25 80 20 85 30 91 C35 85 30 80 30 85" fill="${leafColor}"/>
      <path d="M80 100 C85 95 90 100 80 106 C75 100 80 95 80 100" fill="${leafColor}"/>
      <path d="M70 85 C75 80 80 85 70 91 C65 85 70 80 70 85" fill="${leafColor}"/>
    `;
  } else if (style === 'grassy') {
    // Fountain-like thin leaves (Spider plant, Ferns)
    svg += `
      <!-- Thin Grass Leaves -->
      <path d="M50 80 Q10 70 5 60 Q30 80 50 80" fill="${leafColor}" opacity="0.8"/>
      <path d="M50 80 Q90 70 95 60 Q70 80 50 80" fill="${leafColor}" opacity="0.8"/>
      <path d="M50 80 Q20 50 18 30 Q38 60 50 80" fill="${leafColor}"/>
      <path d="M50 80 Q80 50 82 30 Q62 60 50 80" fill="${leafColor}"/>
      <path d="M50 80 Q35 40 40 10 Q48 40 50 80" fill="${leafColor}"/>
      <path d="M50 80 Q65 40 60 10 Q52 40 50 80" fill="${leafColor}"/>
    `;
  } else if (style === 'succulent') {
    // Rosette fleshy clusters (Echeveria, Jade)
    svg += `
      <!-- Central Stem -->
      <path d="M50 80 L50 65" stroke="#4D6A4F" stroke-width="3" fill="none"/>
      
      <!-- Rosette petals -->
      <circle cx="50" cy="50" r="12" fill="${leafColor}"/>
      <circle cx="38" cy="55" r="10" fill="${leafColor}" opacity="0.9"/>
      <circle cx="62" cy="55" r="10" fill="${leafColor}" opacity="0.9"/>
      <circle cx="44" cy="42" r="9" fill="${leafColor}" opacity="0.95"/>
      <circle cx="56" cy="42" r="9" fill="${leafColor}" opacity="0.95"/>
      <circle cx="50" cy="62" r="10" fill="${leafColor}" opacity="0.9"/>
    `;
  } else if (style === 'flower') {
    // Flower blossoms
    const petalColor = plant.id.includes('rose') ? '#D23F3F' : 
                        plant.id.includes('dahlia') ? '#E85B85' : 
                        plant.id.includes('cherry') ? '#F4C2C2' : 
                        plant.id.includes('marigold') ? '#F29C38' : 
                        plant.id.includes('kalanchoe') ? '#E26262' : 
                        plant.id.includes('orchid') ? '#D187E8' : '#F7D4D0';
    svg += `
      <!-- Stems and leaves -->
      <path d="M50 80 L50 40" stroke="#4D6A4F" stroke-width="2" fill="none"/>
      <path d="M50 65 Q35 60 38 52 C45 55 48 62 50 65" fill="${leafColor}"/>
      <path d="M50 60 Q65 55 62 47 C55 50 52 57 50 60" fill="${leafColor}"/>
      
      <!-- Flower Blooms -->
      <circle cx="50" cy="40" r="8" fill="#E2C85D" />
      <circle cx="50" cy="28" r="7" fill="${petalColor}" />
      <circle cx="50" cy="52" r="7" fill="${petalColor}" />
      <circle cx="38" cy="40" r="7" fill="${petalColor}" />
      <circle cx="62" cy="40" r="7" fill="${petalColor}" />
      <circle cx="42" cy="32" r="7" fill="${petalColor}" />
      <circle cx="58" cy="32" r="7" fill="${petalColor}" />
      <circle cx="42" cy="48" r="7" fill="${petalColor}" />
      <circle cx="58" cy="48" r="7" fill="${petalColor}" />
    `;
  } else {
    // Default Tree (Bonsai, Neem, Oak)
    svg += `
      <!-- Wooden Trunk -->
      <path d="M50 80 Q46 65 42 45 L58 45 Q54 65 50 80" fill="#8C6A56"/>
      <path d="M42 45 Q30 35 25 32 Q35 45 42 45" fill="#8C6A56"/>
      <path d="M58 45 Q70 35 75 32 Q65 45 58 45" fill="#8C6A56"/>
      
      <!-- Canopy Leaf Clump -->
      <circle cx="42" cy="35" r="16" fill="${leafColor}" opacity="0.9"/>
      <circle cx="58" cy="35" r="16" fill="${leafColor}" opacity="0.9"/>
      <circle cx="50" cy="22" r="18" fill="${leafColor}"/>
      <circle cx="28" cy="30" r="10" fill="${leafColor}" opacity="0.8"/>
      <circle cx="72" cy="30" r="10" fill="${leafColor}" opacity="0.8"/>
    `;
  }

  // Draw the Ceramic Pot (common to all styles)
  svg += `
    <!-- Pot rim shadow -->
    <ellipse cx="50" cy="80" rx="22" ry="4" fill="rgba(0,0,0,0.15)"/>
    <!-- Pot Base -->
    <path d="M30 80 L34 105 C35 108 37 110 40 110 L60 110 C63 110 65 108 66 105 L70 80 Z" fill="${potColor}"/>
    <!-- Rim lip -->
    <rect x="27" y="76" width="46" height="5" rx="2" fill="${potColor}" filter="brightness(1.1)"/>
    <!-- Soil -->
    <ellipse cx="50" cy="78" rx="21" ry="3" fill="#523B2D"/>
  `;

  svg += `</svg>`;
  return svg;
};
