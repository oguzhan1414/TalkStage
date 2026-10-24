import { t } from '../i18n';
import type { StageId } from '../lib/stages';

/**
 * "Kelime Odaları": a realistic photo of a room with every object pinned, played as a small word game
 * (explore, find, spell, recall). The positions are percentages of the image (x of the width, y of the height);
 * `r` is the object's rough radius in percent of the width, used for tapping. Objects are kept far enough
 * apart that their pins never overlap on a phone; small clustered things are simply left out.
 */
export type RoomItem = {
  id: string;
  /** The English word (what the learner learns). */
  en: string;
  /** The word in the app language (Turkish source, translated by the catalog). */
  native: () => string;
  x: number;
  y: number;
  r: number;
  /** A short, everyday English sentence with the word. */
  example: string;
};

export type WordRoom = {
  id: string;
  title: () => string;
  stage: StageId;
  image: number;
  thumb: number;
  /** Height / width of the photo. */
  aspect: number;
  items: RoomItem[];
};

const KITCHEN: WordRoom = {
  id: 'kitchen',
  title: () => t("Mutfak"),
  stage: 'baslangic',
  image: require('../../assets/images/rooms/kitchen.webp'),
  thumb: require('../../assets/images/rooms/kitchen_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'fridge', en: 'fridge', native: () => t("buzdolabı"), x: 8, y: 42, r: 9, example: 'The milk is in the fridge.' },
    { id: 'microwave', en: 'microwave', native: () => t("mikrodalga"), x: 24, y: 23, r: 6, example: 'I heat my soup in the microwave.' },
    { id: 'oven', en: 'oven', native: () => t("fırın"), x: 25, y: 38.5, r: 6, example: 'The cake is in the oven.' },
    { id: 'toaster', en: 'toaster', native: () => t("ekmek kızartma makinesi"), x: 38, y: 31, r: 3.5, example: 'Put the bread in the toaster.' },
    { id: 'kettle', en: 'kettle', native: () => t("su ısıtıcısı"), x: 48, y: 30, r: 3.5, example: 'The kettle is boiling.' },
    { id: 'frying_pan', en: 'frying pan', native: () => t("tava"), x: 60, y: 33.5, r: 3.5, example: 'I cook eggs in a frying pan.' },
    { id: 'pot', en: 'pot', native: () => t("tencere"), x: 72, y: 34.5, r: 3.5, example: 'The soup is in the pot.' },
    { id: 'stove', en: 'stove', native: () => t("ocak"), x: 53, y: 37.3, r: 3, example: "Don't touch the stove, it's hot!" },
    { id: 'sink', en: 'sink', native: () => t("evye"), x: 85, y: 39.8, r: 4.5, example: 'Wash your hands at the sink.' },
    { id: 'tap', en: 'tap', native: () => t("musluk"), x: 93.5, y: 32, r: 3, example: 'Turn off the tap, please.' },
    { id: 'dishwasher', en: 'dishwasher', native: () => t("bulaşık makinesi"), x: 59, y: 42.3, r: 5, example: 'Put the plates in the dishwasher.' },
    { id: 'cupboard', en: 'cupboard', native: () => t("dolap"), x: 30, y: 8, r: 7, example: 'The glasses are in the cupboard.' },
    { id: 'window', en: 'window', native: () => t("pencere"), x: 87, y: 15, r: 7, example: 'Open the window, please.' },
    { id: 'clock', en: 'clock', native: () => t("duvar saati"), x: 61, y: 11.5, r: 4, example: "Look at the clock. We're late!" },
    { id: 'table', en: 'table', native: () => t("masa"), x: 84, y: 75, r: 6, example: 'Dinner is on the table.' },
    { id: 'chair', en: 'chair', native: () => t("sandalye"), x: 49, y: 56, r: 4.5, example: 'Sit on the chair, please.' },
    { id: 'bowl', en: 'bowl', native: () => t("kâse"), x: 67, y: 58.4, r: 3, example: 'I eat cereal from a bowl.' },
    { id: 'glass', en: 'glass', native: () => t("bardak"), x: 73, y: 64, r: 2.5, example: 'Can I have a glass of water?' },
    { id: 'cup', en: 'cup', native: () => t("fincan"), x: 79, y: 69.3, r: 3, example: 'I drink a cup of coffee every morning.' },
    { id: 'spoon', en: 'spoon', native: () => t("kaşık"), x: 57.5, y: 64.6, r: 2, example: 'I eat soup with a spoon.' },
    { id: 'bread', en: 'bread', native: () => t("ekmek"), x: 89, y: 62.5, r: 5, example: 'Fresh bread smells great.' },
    { id: 'apple', en: 'apple', native: () => t("elma"), x: 91, y: 69.5, r: 3, example: 'An apple a day keeps the doctor away.' },
  ],
};

const BEDROOM: WordRoom = {
  id: 'bedroom',
  title: () => t("Yatak Odası"),
  stage: 'baslangic',
  image: require('../../assets/images/rooms/bedroom.webp'),
  thumb: require('../../assets/images/rooms/bedroom_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'bed', en: "bed", native: () => t("yatak"), x: 32, y: 71, r: 5, example: "I go to bed at eleven." },
    { id: 'pillow', en: "pillow", native: () => t("yastık"), x: 52, y: 54, r: 4, example: "This pillow is very soft." },
    { id: 'blanket', en: "blanket", native: () => t("battaniye"), x: 62, y: 64, r: 3.5, example: "It's cold. I need a blanket." },
    { id: 'wardrobe', en: "wardrobe", native: () => t("gardırop"), x: 7, y: 50, r: 6, example: "My clothes are in the wardrobe." },
    { id: 'clothes', en: "clothes", native: () => t("kıyafetler"), x: 16, y: 40, r: 3, example: "I put my clothes away." },
    { id: 'hanger', en: "hanger", native: () => t("askı"), x: 17, y: 53, r: 2.5, example: "Hang your shirt on a hanger." },
    { id: 'mirror', en: "mirror", native: () => t("ayna"), x: 35, y: 47, r: 4, example: "She looks in the mirror." },
    { id: 'curtains', en: "curtains", native: () => t("perdeler"), x: 51, y: 35, r: 4, example: "Close the curtains, please." },
    { id: 'nightstand', en: "nightstand", native: () => t("komodin"), x: 84, y: 64, r: 4, example: "My phone is on the nightstand." },
    { id: 'alarm_clock', en: "alarm clock", native: () => t("çalar saat"), x: 82, y: 58, r: 2, example: "My alarm clock rings at seven." },
    { id: 'bookshelf', en: "bookshelf", native: () => t("kitaplık"), x: 91, y: 49, r: 4, example: "There are many books on the bookshelf." },
    { id: 'drawer', en: "drawer", native: () => t("çekmece"), x: 90, y: 76, r: 4, example: "My socks are in the drawer." },
    { id: 'rug', en: "rug", native: () => t("kilim"), x: 25, y: 88, r: 7, example: "The cat sleeps on the rug." },
    { id: 'slippers', en: "slippers", native: () => t("terlik"), x: 41, y: 84, r: 3.5, example: "Where are my slippers?" },
  ],
};

const BATHROOM: WordRoom = {
  id: 'bathroom',
  title: () => t("Banyo"),
  stage: 'baslangic',
  image: require('../../assets/images/rooms/bathroom.webp'),
  thumb: require('../../assets/images/rooms/bathroom_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'shower', en: "shower", native: () => t("duş"), x: 31, y: 32, r: 6, example: "I take a shower every morning." },
    { id: 'bathtub', en: "bathtub", native: () => t("küvet"), x: 25, y: 74, r: 8, example: "The bathtub is full of water." },
    { id: 'toilet', en: "toilet", native: () => t("tuvalet"), x: 57, y: 52, r: 4, example: "Where is the toilet, please?" },
    { id: 'toilet_paper', en: "toilet paper", native: () => t("tuvalet kağıdı"), x: 48, y: 48, r: 2, example: "We need more toilet paper." },
    { id: 'washbasin', en: "washbasin", native: () => t("lavabo"), x: 73, y: 54, r: 4, example: "Wash your face at the washbasin." },
    { id: 'hairdryer', en: "hairdryer", native: () => t("saç kurutma makinesi"), x: 74, y: 37, r: 3, example: "Can I use your hairdryer?" },
    { id: 'towel', en: "towel", native: () => t("havlu"), x: 16, y: 42, r: 3.5, example: "Can I have a clean towel?" },
    { id: 'toothbrush', en: "toothbrush", native: () => t("diş fırçası"), x: 85.4, y: 49, r: 2, example: "I need a new toothbrush." },
    { id: 'shampoo', en: "shampoo", native: () => t("şampuan"), x: 93, y: 54, r: 2, example: "This shampoo smells nice." },
    { id: 'comb', en: "comb", native: () => t("tarak"), x: 91, y: 60, r: 2, example: "Where is my comb?" },
    { id: 'laundry_basket', en: "laundry basket", native: () => t("çamaşır sepeti"), x: 78, y: 79, r: 5, example: "Put your dirty clothes in the laundry basket." },
    { id: 'washing_machine', en: "washing machine", native: () => t("çamaşır makinesi"), x: 88, y: 90, r: 6, example: "The washing machine is on." },
    { id: 'bath_mat', en: "bath mat", native: () => t("banyo paspası"), x: 53, y: 77, r: 5, example: "The bath mat is wet." },
  ],
};

const LIVING_ROOM: WordRoom = {
  id: 'living_room',
  title: () => t("Oturma Odası"),
  stage: 'baslangic',
  image: require('../../assets/images/rooms/living_room.webp'),
  thumb: require('../../assets/images/rooms/living_room_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'tv', en: "TV", native: () => t("televizyon"), x: 17, y: 45, r: 6, example: "We watch TV in the evening." },
    { id: 'speaker', en: "speaker", native: () => t("hoparlör"), x: 35.5, y: 47, r: 2.5, example: "The music comes from the speaker." },
    { id: 'armchair', en: "armchair", native: () => t("tekli koltuk"), x: 33, y: 58, r: 5, example: "Grandpa sits in his armchair." },
    { id: 'sofa', en: "sofa", native: () => t("kanepe"), x: 20, y: 87, r: 8, example: "Let's sit on the sofa." },
    { id: 'cushion', en: "cushion", native: () => t("minder"), x: 16, y: 77, r: 4, example: "Put the cushion on the armchair." },
    { id: 'coffee_table', en: "coffee table", native: () => t("sehpa"), x: 70, y: 76, r: 4, example: "Put your cup on the coffee table." },
    { id: 'remote', en: "remote control", native: () => t("kumanda"), x: 47, y: 63, r: 2, example: "Where is the remote control?" },
    { id: 'flowers', en: "flowers", native: () => t("çiçekler"), x: 54, y: 58, r: 3, example: "These flowers are for you." },
    { id: 'magazine', en: "magazine", native: () => t("dergi"), x: 61, y: 70, r: 3, example: "I'm reading a magazine." },
    { id: 'plant', en: "plant", native: () => t("bitki"), x: 62, y: 46, r: 4, example: "Water the plant, please." },
    { id: 'floor_lamp', en: "floor lamp", native: () => t("ayaklı lamba"), x: 72, y: 40, r: 3, example: "The floor lamp is next to the plant." },
    { id: 'stairs', en: "stairs", native: () => t("merdiven"), x: 70, y: 27, r: 6, example: "Go up the stairs." },
    { id: 'fireplace', en: "fireplace", native: () => t("şömine"), x: 91, y: 58, r: 6, example: "It's warm by the fireplace." },
    { id: 'picture_frame', en: "picture frame", native: () => t("çerçeve"), x: 86, y: 40, r: 3, example: "There is a photo in the picture frame." },
    { id: 'carpet', en: "carpet", native: () => t("halı"), x: 78, y: 92, r: 6, example: "The carpet is soft and warm." },
  ],
};

const GROCERY: WordRoom = {
  id: 'grocery',
  title: () => t("Market"),
  stage: 'baslangic',
  image: require('../../assets/images/rooms/grocery.webp'),
  thumb: require('../../assets/images/rooms/grocery_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'banana', en: "banana", native: () => t("muz"), x: 88, y: 27, r: 5, example: "I eat a banana for breakfast." },
    { id: 'orange', en: "orange", native: () => t("portakal"), x: 75, y: 42, r: 4, example: "This orange is very sweet." },
    { id: 'tomato', en: "tomato", native: () => t("domates"), x: 85, y: 46, r: 4, example: "I need two tomatoes for the salad." },
    { id: 'carrot', en: "carrot", native: () => t("havuç"), x: 93, y: 51, r: 4, example: "Rabbits like carrots." },
    { id: 'onion', en: "onion", native: () => t("soğan"), x: 82, y: 67, r: 5, example: "Onions make me cry." },
    { id: 'potato', en: "potato", native: () => t("patates"), x: 93, y: 75, r: 5, example: "We need a kilo of potatoes." },
    { id: 'lemon', en: "lemon", native: () => t("limon"), x: 71, y: 76, r: 4, example: "Lemons are sour." },
    { id: 'grapes', en: "grapes", native: () => t("üzüm"), x: 79, y: 87, r: 4, example: "These grapes are sweet." },
    { id: 'milk', en: "milk", native: () => t("süt"), x: 44, y: 34, r: 3, example: "Can I have a bottle of milk?" },
    { id: 'eggs', en: "eggs", native: () => t("yumurta"), x: 46, y: 40, r: 3, example: "I need six eggs." },
    { id: 'cheese', en: "cheese", native: () => t("peynir"), x: 52, y: 45, r: 3, example: "I like cheese on my toast." },
    { id: 'scale', en: "scale", native: () => t("terazi"), x: 9, y: 46, r: 4, example: "Put the apples on the scale." },
    { id: 'cash_register', en: "cash register", native: () => t("yazar kasa"), x: 24, y: 46, r: 4, example: "Pay at the cash register." },
    { id: 'counter', en: "counter", native: () => t("tezgâh"), x: 28, y: 58, r: 4, example: "The scale is on the counter." },
    { id: 'shopping_basket', en: "shopping basket", native: () => t("alışveriş sepeti"), x: 39, y: 65, r: 4, example: "Take a shopping basket." },
    { id: 'trolley', en: "trolley", native: () => t("alışveriş arabası"), x: 14, y: 77, r: 6, example: "The trolley is full." },
  ],
};

const CLASSROOM: WordRoom = {
  id: 'classroom',
  title: () => t("Sınıf"),
  stage: 'baslangic',
  image: require('../../assets/images/rooms/classroom.webp'),
  thumb: require('../../assets/images/rooms/classroom_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'whiteboard', en: "whiteboard", native: () => t("yazı tahtası"), x: 63, y: 37, r: 6, example: "The teacher writes on the whiteboard." },
    { id: 'map', en: "map", native: () => t("harita"), x: 95, y: 37, r: 4, example: "Find Turkey on the map." },
    { id: 'globe', en: "globe", native: () => t("küre"), x: 83, y: 38, r: 2.5, example: "The globe is on the cabinet." },
    { id: 'cabinet', en: "cabinet", native: () => t("dolap"), x: 83, y: 47, r: 3, example: "The books are in the cabinet." },
    { id: 'noticeboard', en: "noticeboard", native: () => t("duyuru panosu"), x: 33.5, y: 38, r: 3, example: "Read the noticeboard, please." },
    { id: 'ceiling', en: "ceiling", native: () => t("tavan"), x: 50, y: 10, r: 6, example: "The ceiling is white." },
    { id: 'desk', en: "desk", native: () => t("sıra"), x: 40, y: 52, r: 4, example: "This is my desk." },
    { id: 'backpack', en: "backpack", native: () => t("sırt çantası"), x: 32, y: 62, r: 4, example: "My backpack is heavy." },
    { id: 'pencil', en: "pencil", native: () => t("kurşun kalem"), x: 53, y: 66.5, r: 2, example: "Can I borrow a pencil?" },
    { id: 'notebook', en: "notebook", native: () => t("defter"), x: 68.6, y: 67, r: 3, example: "Write it in your notebook." },
    { id: 'scissors', en: "scissors", native: () => t("makas"), x: 78.7, y: 70, r: 2, example: "Be careful with the scissors." },
    { id: 'pencil_case', en: "pencil case", native: () => t("kalem kutusu"), x: 94, y: 69.6, r: 2.5, example: "My pencils are in my pencil case." },
    { id: 'teachers_desk', en: "teacher's desk", native: () => t("öğretmen masası"), x: 48, y: 82, r: 4, example: "The teacher's desk is at the front." },
    { id: 'floor', en: "floor", native: () => t("zemin"), x: 25, y: 85, r: 6, example: "Don't sit on the floor." },
  ],
};

const CAFE: WordRoom = {
  id: 'cafe',
  title: () => t("Kafe"),
  stage: 'orta',
  image: require('../../assets/images/rooms/cafe.webp'),
  thumb: require('../../assets/images/rooms/cafe_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'coffee_machine', en: "coffee machine", native: () => t("kahve makinesi"), x: 14.5, y: 30, r: 5, example: "The coffee machine is very loud." },
    { id: 'tip_jar', en: "tip jar", native: () => t("bahşiş kavanozu"), x: 21, y: 45, r: 3, example: "Leave some coins in the tip jar." },
    { id: 'display_case', en: "display case", native: () => t("vitrin"), x: 64, y: 38, r: 5, example: "The cakes are in the display case." },
    { id: 'croissant', en: "croissant", native: () => t("kruvasan"), x: 40.7, y: 29, r: 2.5, example: "A croissant and a coffee, please." },
    { id: 'muffin', en: "muffin", native: () => t("muffin"), x: 44, y: 36, r: 2.5, example: "This chocolate muffin is delicious." },
    { id: 'stool', en: "stool", native: () => t("tabure"), x: 59, y: 56, r: 4, example: "Sit on the stool by the counter." },
    { id: 'shelf', en: "shelf", native: () => t("raf"), x: 73.7, y: 20.4, r: 4, example: "The coffee bags are on the shelf." },
    { id: 'latte', en: "latte", native: () => t("latte"), x: 29, y: 75, r: 3.5, example: "I'd like a latte, please." },
    { id: 'teapot', en: "teapot", native: () => t("demlik"), x: 42, y: 71.7, r: 3.5, example: "The teapot is hot." },
    { id: 'straws', en: "straws", native: () => t("pipetler"), x: 60, y: 66.7, r: 3, example: "Paper straws are better for nature." },
    { id: 'sugar_bowl', en: "sugar bowl", native: () => t("şekerlik"), x: 58, y: 76, r: 3, example: "Pass me the sugar bowl, please." },
    { id: 'napkin_holder', en: "napkin holder", native: () => t("peçetelik"), x: 71.4, y: 73.3, r: 3.5, example: "Take a napkin from the napkin holder." },
    { id: 'sandwich', en: "sandwich", native: () => t("sandviç"), x: 51, y: 82, r: 4, example: "I'll have a cheese sandwich." },
    { id: 'tray', en: "tray", native: () => t("tepsi"), x: 60, y: 86.3, r: 3, example: "Put the cups on the tray." },
    { id: 'receipt', en: "receipt", native: () => t("fiş"), x: 75, y: 83.3, r: 3, example: "Can I have the receipt, please?" },
  ],
};

const AIRPORT: WordRoom = {
  id: 'airport',
  title: () => t("Havalimanı"),
  stage: 'orta',
  image: require('../../assets/images/rooms/airport.webp'),
  thumb: require('../../assets/images/rooms/airport_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'departure_board', en: "departure board", native: () => t("kalkış panosu"), x: 30, y: 20, r: 7, example: "Check your flight on the departure board." },
    { id: 'escalator', en: "escalator", native: () => t("yürüyen merdiven"), x: 24.5, y: 42, r: 5, example: "Take the escalator to the first floor." },
    { id: 'seats', en: "seats", native: () => t("bekleme koltukları"), x: 25.7, y: 54, r: 4, example: "The seats are near the window." },
    { id: 'metal_detector', en: "metal detector", native: () => t("metal dedektörü"), x: 8, y: 52.5, r: 4, example: "Walk through the metal detector." },
    { id: 'airplane', en: "airplane", native: () => t("uçak"), x: 64, y: 49, r: 4, example: "Our airplane is ready." },
    { id: 'luggage_trolley', en: "luggage trolley", native: () => t("bagaj arabası"), x: 55, y: 57, r: 4, example: "Put your bags on the luggage trolley." },
    { id: 'check_in_desk', en: "check-in desk", native: () => t("check-in bankosu"), x: 69, y: 58, r: 5, example: "Go to the check-in desk first." },
    { id: 'conveyor_belt', en: "conveyor belt", native: () => t("yürüyen bant"), x: 90, y: 66, r: 4, example: "Put your suitcase on the conveyor belt." },
    { id: 'screen', en: "screen", native: () => t("ekran"), x: 78, y: 39, r: 3, example: "Look at the screen for your gate." },
    { id: 'pillar', en: "pillar", native: () => t("sütun"), x: 85.5, y: 25, r: 3, example: "Meet me by the pillar." },
    { id: 'passport', en: "passport", native: () => t("pasaport"), x: 27, y: 82, r: 3, example: "Can I see your passport, please?" },
    { id: 'boarding_pass', en: "boarding pass", native: () => t("biniş kartı"), x: 35, y: 83, r: 2.5, example: "Here is your boarding pass." },
    { id: 'sunglasses', en: "sunglasses", native: () => t("güneş gözlüğü"), x: 44.6, y: 81.7, r: 3, example: "Don't forget your sunglasses." },
    { id: 'suitcase', en: "suitcase", native: () => t("bavul"), x: 67, y: 85, r: 5, example: "My suitcase is too heavy." },
  ],
};

const HOTEL: WordRoom = {
  id: 'hotel',
  title: () => t("Otel Lobisi"),
  stage: 'orta',
  image: require('../../assets/images/rooms/hotel.webp'),
  thumb: require('../../assets/images/rooms/hotel_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'chandelier', en: "chandelier", native: () => t("avize"), x: 50, y: 22, r: 6, example: "What a beautiful chandelier!" },
    { id: 'revolving_door', en: "revolving door", native: () => t("döner kapı"), x: 37, y: 50, r: 6, example: "Push the revolving door slowly." },
    { id: 'luggage_cart', en: "luggage cart", native: () => t("bagaj arabası"), x: 18, y: 54, r: 5, example: "The bellboy pushes the luggage cart." },
    { id: 'umbrella_stand', en: "umbrella stand", native: () => t("şemsiyelik"), x: 51, y: 56, r: 2.5, example: "Leave your umbrella in the umbrella stand." },
    { id: 'newspaper_rack', en: "newspaper rack", native: () => t("gazetelik"), x: 62, y: 54, r: 3, example: "Take a newspaper from the newspaper rack." },
    { id: 'lift', en: "lift", native: () => t("asansör"), x: 72.5, y: 52, r: 4, example: "Let's take the lift to the third floor." },
    { id: 'bell', en: "bell", native: () => t("zil"), x: 51, y: 71, r: 3, example: "Ring the bell for service." },
    { id: 'key_card', en: "key card", native: () => t("kart anahtar"), x: 69, y: 71, r: 2, example: "Your key card opens the door." },
    { id: 'room_key', en: "room key", native: () => t("oda anahtarı"), x: 77, y: 71, r: 2.5, example: "Here is your room key." },
    { id: 'brochures', en: "brochures", native: () => t("broşürler"), x: 87, y: 67, r: 3, example: "Take a brochure about the city." },
    { id: 'reception_desk', en: "reception desk", native: () => t("resepsiyon"), x: 30, y: 88, r: 7, example: "Please check in at the reception desk." },
    { id: 'palm_tree', en: "palm tree", native: () => t("palmiye"), x: 6, y: 45, r: 4, example: "There is a palm tree in the lobby." },
  ],
};

const STREET: WordRoom = {
  id: 'street',
  title: () => t("Sokak"),
  stage: 'orta',
  image: require('../../assets/images/rooms/street.webp'),
  thumb: require('../../assets/images/rooms/street_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'tree', en: "tree", native: () => t("ağaç"), x: 12, y: 30, r: 7, example: "The bird is in the tree." },
    { id: 'pharmacy', en: "pharmacy", native: () => t("eczane"), x: 35.7, y: 40, r: 3.5, example: "Is there a pharmacy near here?" },
    { id: 'balcony', en: "balcony", native: () => t("balkon"), x: 29.5, y: 27.5, r: 3, example: "She is on the balcony." },
    { id: 'building', en: "building", native: () => t("bina"), x: 91, y: 25, r: 5, example: "That building is very old." },
    { id: 'streetlight', en: "streetlight", native: () => t("sokak lambası"), x: 75.5, y: 13, r: 3, example: "The streetlight turns on at night." },
    { id: 'traffic_light', en: "traffic light", native: () => t("trafik ışığı"), x: 75, y: 34, r: 3, example: "Stop! The traffic light is red." },
    { id: 'road_sign', en: "road sign", native: () => t("trafik levhası"), x: 88.7, y: 36, r: 4, example: "Look at the road sign." },
    { id: 'bus', en: "bus", native: () => t("otobüs"), x: 65, y: 54, r: 4, example: "The bus is late again." },
    { id: 'bus_stop', en: "bus stop", native: () => t("otobüs durağı"), x: 53, y: 55, r: 3, example: "Wait at the bus stop." },
    { id: 'taxi', en: "taxi", native: () => t("taksi"), x: 83.7, y: 56, r: 3.5, example: "Let's take a taxi." },
    { id: 'zebra_crossing', en: "zebra crossing", native: () => t("yaya geçidi"), x: 49, y: 63, r: 4, example: "Cross at the zebra crossing." },
    { id: 'bench', en: "bench", native: () => t("bank"), x: 30.7, y: 65, r: 3.5, example: "Let's sit on the bench." },
    { id: 'bicycle', en: "bicycle", native: () => t("bisiklet"), x: 17, y: 71, r: 5, example: "I ride my bicycle to work." },
    { id: 'fire_hydrant', en: "fire hydrant", native: () => t("yangın musluğu"), x: 67.7, y: 71, r: 2.5, example: "Don't park near the fire hydrant." },
    { id: 'post_box', en: "post box", native: () => t("posta kutusu"), x: 77, y: 73, r: 3, example: "Put the letter in the post box." },
    { id: 'bin', en: "bin", native: () => t("çöp kutusu"), x: 84, y: 85, r: 4, example: "Throw it in the bin." },
    { id: 'pavement', en: "pavement", native: () => t("kaldırım"), x: 40, y: 88, r: 6, example: "Walk on the pavement." },
  ],
};

const OFFICE: WordRoom = {
  id: 'office',
  title: () => t("Ofis"),
  stage: 'orta',
  image: require('../../assets/images/rooms/office.webp'),
  thumb: require('../../assets/images/rooms/office_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'markers', en: "markers", native: () => t("tahta kalemleri"), x: 21, y: 41, r: 3, example: "The markers are under the whiteboard." },
    { id: 'calendar', en: "calendar", native: () => t("takvim"), x: 58.6, y: 28.7, r: 4, example: "Write the meeting on the calendar." },
    { id: 'printer', en: "printer", native: () => t("yazıcı"), x: 50, y: 43, r: 3.5, example: "The printer is out of paper." },
    { id: 'office_chair', en: "office chair", native: () => t("ofis sandalyesi"), x: 32, y: 49, r: 5, example: "This office chair is comfortable." },
    { id: 'desk_lamp', en: "desk lamp", native: () => t("masa lambası"), x: 68, y: 36, r: 3, example: "Turn on the desk lamp." },
    { id: 'monitor', en: "monitor", native: () => t("monitör"), x: 74, y: 47, r: 3, example: "My monitor is too small." },
    { id: 'mug', en: "mug", native: () => t("kupa"), x: 66, y: 50.4, r: 2, example: "I drink tea from my mug." },
    { id: 'keyboard', en: "keyboard", native: () => t("klavye"), x: 55, y: 52, r: 3, example: "This keyboard is very quiet." },
    { id: 'laptop', en: "laptop", native: () => t("dizüstü bilgisayar"), x: 60, y: 57, r: 4, example: "I work on my laptop." },
    { id: 'stapler', en: "stapler", native: () => t("zımba"), x: 36, y: 61, r: 2.5, example: "Can I borrow your stapler?" },
    { id: 'headphones', en: "headphones", native: () => t("kulaklık"), x: 52, y: 63, r: 3, example: "I wear headphones in meetings." },
    { id: 'water_cooler', en: "water cooler", native: () => t("su sebili"), x: 95, y: 50, r: 4, example: "Let's chat at the water cooler." },
    { id: 'socket', en: "socket", native: () => t("priz"), x: 22.5, y: 52.5, r: 1.5, example: "Plug the laptop into the socket." },
  ],
};

const DOCTOR: WordRoom = {
  id: 'doctor',
  title: () => t("Muayenehane"),
  stage: 'orta',
  image: require('../../assets/images/rooms/doctor.webp'),
  thumb: require('../../assets/images/rooms/doctor_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'examination_bed', en: "examination bed", native: () => t("muayene yatağı"), x: 22, y: 55, r: 6, example: "Please lie down on the examination bed." },
    { id: 'paper_roll', en: "paper roll", native: () => t("kağıt rulo"), x: 13, y: 63, r: 3, example: "The paper roll keeps the bed clean." },
    { id: 'step_stool', en: "step stool", native: () => t("basamak"), x: 33, y: 61, r: 3, example: "Use the step stool to get up." },
    { id: 'skeleton', en: "skeleton", native: () => t("iskelet"), x: 43, y: 40, r: 4, example: "The skeleton has 206 bones." },
    { id: 'blinds', en: "blinds", native: () => t("jaluzi"), x: 40, y: 22, r: 4, example: "Close the blinds, please." },
    { id: 'first_aid_kit', en: "first aid kit", native: () => t("ilk yardım çantası"), x: 89, y: 33, r: 3.5, example: "The first aid kit is on the wall." },
    { id: 'soap_dispenser', en: "soap dispenser", native: () => t("sabunluk"), x: 80, y: 39, r: 2.5, example: "The soap dispenser is empty." },
    { id: 'prescription', en: "prescription", native: () => t("reçete"), x: 78, y: 56, r: 2.5, example: "Take this prescription to the pharmacy." },
    { id: 'blood_pressure_monitor', en: "blood pressure monitor", native: () => t("tansiyon aleti"), x: 85, y: 60.4, r: 3, example: "Let's check your blood pressure." },
    { id: 'stethoscope', en: "stethoscope", native: () => t("steteskop"), x: 39, y: 75, r: 3.5, example: "The doctor listens with a stethoscope." },
    { id: 'thermometer', en: "thermometer", native: () => t("termometre"), x: 49, y: 76.7, r: 1.5, example: "The thermometer says thirty-eight degrees." },
    { id: 'pills', en: "pills", native: () => t("haplar"), x: 63, y: 70, r: 2, example: "Take two pills after dinner." },
    { id: 'gloves', en: "gloves", native: () => t("eldiven"), x: 65, y: 76, r: 3, example: "The nurse puts on gloves." },
  ],
};

const GARAGE: WordRoom = {
  id: 'garage',
  title: () => t("Garaj"),
  stage: 'ileri',
  image: require('../../assets/images/rooms/garage.webp'),
  thumb: require('../../assets/images/rooms/garage_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'saw', en: "saw", native: () => t("testere"), x: 26.8, y: 24, r: 3, example: "I cut the wood with a saw." },
    { id: 'pegboard', en: "pegboard", native: () => t("alet panosu"), x: 10, y: 20, r: 5, example: "Hang the tools on the pegboard." },
    { id: 'ladder', en: "ladder", native: () => t("seyyar merdiven"), x: 63, y: 28, r: 4, example: "Hold the ladder, please." },
    { id: 'light', en: "light", native: () => t("ışık"), x: 31, y: 6, r: 4, example: "Turn on the light." },
    { id: 'hammer', en: "hammer", native: () => t("çekiç"), x: 24, y: 48, r: 3, example: "Hit the nail with the hammer." },
    { id: 'screwdriver', en: "screwdriver", native: () => t("tornavida"), x: 32.6, y: 49.4, r: 2, example: "I need a screwdriver." },
    { id: 'wrench', en: "wrench", native: () => t("İngiliz anahtarı"), x: 40.7, y: 49.4, r: 2.5, example: "Pass me the wrench." },
    { id: 'pliers', en: "pliers", native: () => t("pense"), x: 49.4, y: 49.6, r: 2.5, example: "Hold it with the pliers." },
    { id: 'tape_measure', en: "tape measure", native: () => t("şerit metre"), x: 58, y: 49.3, r: 2, example: "Measure it with the tape measure." },
    { id: 'nails', en: "nails", native: () => t("çiviler"), x: 65.3, y: 46.7, r: 2.5, example: "The nails are in the jar." },
    { id: 'drill', en: "drill", native: () => t("matkap"), x: 77, y: 44, r: 3.5, example: "The drill is very loud." },
    { id: 'workbench', en: "workbench", native: () => t("çalışma tezgâhı"), x: 50, y: 57, r: 5, example: "The tools are on the workbench." },
    { id: 'toolbox', en: "toolbox", native: () => t("alet çantası"), x: 36, y: 79, r: 5, example: "My tools are in the toolbox." },
    { id: 'paint_can', en: "paint can", native: () => t("boya kutusu"), x: 58, y: 82.5, r: 3, example: "Open the paint can carefully." },
    { id: 'paintbrush', en: "paintbrush", native: () => t("fırça"), x: 58.6, y: 76, r: 2, example: "Clean the paintbrush after use." },
    { id: 'tyre', en: "tyre", native: () => t("lastik"), x: 72, y: 68, r: 5, example: "The car needs a new tyre." },
    { id: 'extension_cord', en: "extension cord", native: () => t("uzatma kablosu"), x: 71, y: 87.5, r: 4, example: "We need an extension cord." },
  ],
};

const GARDEN: WordRoom = {
  id: 'garden',
  title: () => t("Bahçe"),
  stage: 'ileri',
  image: require('../../assets/images/rooms/garden.webp'),
  thumb: require('../../assets/images/rooms/garden_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'swing', en: "swing", native: () => t("salıncak"), x: 19, y: 62.5, r: 3.5, example: "The kids love the swing." },
    { id: 'rope', en: "rope", native: () => t("ip"), x: 13, y: 40, r: 2, example: "The swing hangs on a rope." },
    { id: 'roses', en: "roses", native: () => t("güller"), x: 16.7, y: 47, r: 4, example: "Roses smell lovely." },
    { id: 'fence', en: "fence", native: () => t("çit"), x: 32, y: 42.5, r: 4, example: "The fence is made of wood." },
    { id: 'hedge', en: "hedge", native: () => t("çalılık"), x: 44.6, y: 27.5, r: 5, example: "The hedge is very tall." },
    { id: 'bird_house', en: "bird house", native: () => t("kuş evi"), x: 43.7, y: 39.6, r: 2.5, example: "A bird lives in the bird house." },
    { id: 'lawnmower', en: "lawnmower", native: () => t("çim biçme makinesi"), x: 36.8, y: 62.5, r: 4, example: "Dad cuts the grass with the lawnmower." },
    { id: 'wheelbarrow', en: "wheelbarrow", native: () => t("el arabası"), x: 58, y: 61, r: 4, example: "Carry the soil in the wheelbarrow." },
    { id: 'shed', en: "shed", native: () => t("kulübe"), x: 74, y: 40, r: 5, example: "The tools are in the shed." },
    { id: 'shovel', en: "shovel", native: () => t("kürek"), x: 79, y: 59, r: 2, example: "Dig a hole with the shovel." },
    { id: 'hose', en: "hose", native: () => t("hortum"), x: 93, y: 53, r: 3, example: "Water the flowers with the hose." },
    { id: 'watering_can', en: "watering can", native: () => t("sulama kabı"), x: 92.4, y: 62.5, r: 3, example: "Fill the watering can, please." },
    { id: 'flowerpot', en: "flowerpot", native: () => t("saksı"), x: 27, y: 88, r: 4, example: "Put the plant in a bigger flowerpot." },
    { id: 'grass', en: "grass", native: () => t("çim"), x: 53.6, y: 77.5, r: 6, example: "Don't walk on the grass." },
    { id: 'path', en: "path", native: () => t("patika"), x: 65, y: 91.7, r: 6, example: "Follow the stone path." },
    { id: 'sky', en: "sky", native: () => t("gökyüzü"), x: 75, y: 12, r: 6, example: "The sky is blue today." },
  ],
};

const GYM: WordRoom = {
  id: 'gym',
  title: () => t("Spor Salonu"),
  stage: 'ileri',
  image: require('../../assets/images/rooms/gym.webp'),
  thumb: require('../../assets/images/rooms/gym_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'locker', en: "locker", native: () => t("soyunma dolabı"), x: 5.6, y: 46, r: 4, example: "Put your bag in the locker." },
    { id: 'punching_bag', en: "punching bag", native: () => t("kum torbası"), x: 24.5, y: 41, r: 3, example: "Hit the punching bag!" },
    { id: 'treadmill', en: "treadmill", native: () => t("koşu bandı"), x: 34.6, y: 47.5, r: 4, example: "I run on the treadmill for twenty minutes." },
    { id: 'exercise_bike', en: "exercise bike", native: () => t("kondisyon bisikleti"), x: 50, y: 45, r: 3, example: "The exercise bike is free." },
    { id: 'weight_bench', en: "weight bench", native: () => t("ağırlık sehpası"), x: 63.6, y: 51, r: 3.5, example: "Lie down on the weight bench." },
    { id: 'weights', en: "weights", native: () => t("ağırlıklar"), x: 78, y: 45, r: 3, example: "These weights are too heavy for me." },
    { id: 'dumbbells', en: "dumbbells", native: () => t("dambıllar"), x: 91.5, y: 51.7, r: 4, example: "Lift the dumbbells slowly." },
    { id: 'air_conditioner', en: "air conditioner", native: () => t("klima"), x: 50.8, y: 13, r: 4, example: "Turn on the air conditioner, it's hot!" },
    { id: 'pipe', en: "pipe", native: () => t("boru"), x: 14.5, y: 14, r: 3, example: "There are pipes on the ceiling." },
    { id: 'kettlebell', en: "kettlebell", native: () => t("kettlebell"), x: 24.8, y: 77, r: 3.5, example: "Swing the kettlebell with both hands." },
    { id: 'jump_rope', en: "jump rope", native: () => t("atlama ipi"), x: 44.6, y: 80, r: 4, example: "Jump rope is great exercise." },
    { id: 'water_bottle', en: "water bottle", native: () => t("su şişesi"), x: 60.6, y: 77.5, r: 2.5, example: "Don't forget your water bottle." },
    { id: 'medicine_ball', en: "medicine ball", native: () => t("sağlık topu"), x: 77, y: 78, r: 4, example: "Throw the medicine ball to me." },
    { id: 'yoga_mat', en: "yoga mat", native: () => t("yoga matı"), x: 14, y: 84, r: 3, example: "Roll out your yoga mat." },
  ],
};

const CAMPING: WordRoom = {
  id: 'camping',
  title: () => t("Kamp Alanı"),
  stage: 'ileri',
  image: require('../../assets/images/rooms/camping.webp'),
  thumb: require('../../assets/images/rooms/camping_thumb.webp'),
  aspect: 1200 / 896,
  items: [
    { id: 'mountain', en: "mountain", native: () => t("dağ"), x: 33.5, y: 12.5, r: 5, example: "We climbed the mountain." },
    { id: 'lake', en: "lake", native: () => t("göl"), x: 55.8, y: 35, r: 6, example: "Let's swim in the lake." },
    { id: 'pine_tree', en: "pine tree", native: () => t("çam ağacı"), x: 30, y: 22, r: 4, example: "Pine trees stay green in winter." },
    { id: 'lantern', en: "lantern", native: () => t("fener"), x: 81.5, y: 32, r: 2.5, example: "Hang the lantern on the tree." },
    { id: 'tent', en: "tent", native: () => t("çadır"), x: 17.8, y: 45, r: 7, example: "We sleep in a tent." },
    { id: 'camping_chair', en: "camping chair", native: () => t("kamp sandalyesi"), x: 68, y: 45, r: 3.5, example: "Sit on the camping chair." },
    { id: 'cooler', en: "cooler", native: () => t("soğutucu çanta"), x: 57.5, y: 50, r: 3.5, example: "The drinks are in the cooler." },
    { id: 'campfire', en: "campfire", native: () => t("kamp ateşi"), x: 59, y: 56, r: 3.5, example: "Let's sit by the campfire." },
    { id: 'firewood', en: "firewood", native: () => t("odun"), x: 40, y: 57, r: 3.5, example: "Put more firewood on the fire." },
    { id: 'stones', en: "stones", native: () => t("taşlar"), x: 67, y: 58, r: 3, example: "There are stones around the fire." },
    { id: 'axe', en: "axe", native: () => t("balta"), x: 85, y: 52.5, r: 3, example: "Be careful with the axe." },
    { id: 'log', en: "log", native: () => t("kütük"), x: 85.4, y: 61, r: 3, example: "The axe is in the log." },
    { id: 'boots', en: "boots", native: () => t("botlar"), x: 22, y: 62, r: 3.5, example: "My boots are wet." },
    { id: 'picnic_blanket', en: "picnic blanket", native: () => t("piknik örtüsü"), x: 44.6, y: 88.8, r: 4, example: "Let's sit on the picnic blanket." },
    { id: 'sleeping_bag', en: "sleeping bag", native: () => t("uyku tulumu"), x: 25, y: 78, r: 5, example: "My sleeping bag is warm." },
    { id: 'torch', en: "torch", native: () => t("el feneri"), x: 40, y: 81, r: 2.5, example: "Turn on your torch, it's dark." },
    { id: 'compass', en: "compass", native: () => t("pusula"), x: 50.8, y: 81, r: 2.5, example: "Use the compass to find north." },
    { id: 'binoculars', en: "binoculars", native: () => t("dürbün"), x: 65, y: 81, r: 3, example: "Look at the birds with binoculars." },
    { id: 'pocket_knife', en: "pocket knife", native: () => t("çakı"), x: 78.5, y: 82, r: 2, example: "A pocket knife is very useful." },
  ],
};

export const WORD_ROOMS: WordRoom[] = [
  KITCHEN,
  BEDROOM,
  BATHROOM,
  LIVING_ROOM,
  GROCERY,
  CLASSROOM,
  CAFE,
  AIRPORT,
  HOTEL,
  STREET,
  OFFICE,
  DOCTOR,
  GARAGE,
  GARDEN,
  GYM,
  CAMPING,
];

export function findWordRoom(id: string): WordRoom | undefined {
  return WORD_ROOMS.find((room) => room.id === id);
}

