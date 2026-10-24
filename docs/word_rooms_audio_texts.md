# Kelime Odaları: ses metinleri

Her oda için **iki ses** üretilecek: kelimeler ve örnek cümleler. Satır sırası kodla birebir aynıdır, **sırayı değiştirme**; ben sesi bu sıraya göre bölüp parçaları `kelime_id.wav` ve `kelime_id_ex.wav` olarak adlandıracağım.

## Nasıl üretilir (Google AI Studio → Generate speech)

1. Single-speaker seç, **bütün odalarda aynı sesi** kullan (mutfakta hangisini seçtiysen o).
2. Her kod bloğunu **olduğu gibi** yapıştır (ilk paragraf talimat, metnin parçası değil, Gemini onu okumaz).
3. WAV olarak indir. Dosya adları: `<oda>_words.wav` ve `<oda>_sentences.wav`.
4. Dosyaları `mobile/assets/audio/rooms/` klasörüne koy.

Her bölümde satır sayısı yazıyor. Üretilen sesi dinleyip kelime/cümle sayısının tuttuğundan emin ol; ben de bölerken sayıyı kontrol ederim.

**Not:** Kodda kelimeler küçük harfli; "TV" tek istisna, okunuşu "tee-vee" olur ve bu doğru.


---

# Başlangıç

## 1. Mutfak (`kitchen`): 22 eşya

### `kitchen_words.wav`: 22 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

fridge.
microwave.
oven.
toaster.
kettle.
frying pan.
pot.
stove.
sink.
tap.
dishwasher.
cupboard.
window.
clock.
table.
chair.
bowl.
glass.
cup.
spoon.
bread.
apple.
```

### `kitchen_sentences.wav`: 22 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

The milk is in the fridge.
I heat my soup in the microwave.
The cake is in the oven.
Put the bread in the toaster.
The kettle is boiling.
I cook eggs in a frying pan.
The soup is in the pot.
Don't touch the stove, it's hot!
Wash your hands at the sink.
Turn off the tap, please.
Put the plates in the dishwasher.
The glasses are in the cupboard.
Open the window, please.
Look at the clock. We're late!
Dinner is on the table.
Sit on the chair, please.
I eat cereal from a bowl.
Can I have a glass of water?
I drink a cup of coffee every morning.
I eat soup with a spoon.
Fresh bread smells great.
An apple a day keeps the doctor away.
```

## 2. Yatak Odası (`bedroom`): 14 eşya

### `bedroom_words.wav`: 14 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

bed.
pillow.
blanket.
wardrobe.
clothes.
hanger.
mirror.
curtains.
nightstand.
alarm clock.
bookshelf.
drawer.
rug.
slippers.
```

### `bedroom_sentences.wav`: 14 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

I go to bed at eleven.
This pillow is very soft.
It's cold. I need a blanket.
My clothes are in the wardrobe.
I put my clothes away.
Hang your shirt on a hanger.
She looks in the mirror.
Close the curtains, please.
My phone is on the nightstand.
My alarm clock rings at seven.
There are many books on the bookshelf.
My socks are in the drawer.
The cat sleeps on the rug.
Where are my slippers?
```

## 3. Banyo (`bathroom`): 13 eşya

### `bathroom_words.wav`: 13 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

shower.
bathtub.
toilet.
toilet paper.
washbasin.
hairdryer.
towel.
toothbrush.
shampoo.
comb.
laundry basket.
washing machine.
bath mat.
```

### `bathroom_sentences.wav`: 13 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

I take a shower every morning.
The bathtub is full of water.
Where is the toilet, please?
We need more toilet paper.
Wash your face at the washbasin.
Can I use your hairdryer?
Can I have a clean towel?
I need a new toothbrush.
This shampoo smells nice.
Where is my comb?
Put your dirty clothes in the laundry basket.
The washing machine is on.
The bath mat is wet.
```

## 4. Oturma Odası (`living_room`): 15 eşya

### `living_room_words.wav`: 15 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

TV.
speaker.
armchair.
sofa.
cushion.
coffee table.
remote control.
flowers.
magazine.
plant.
floor lamp.
stairs.
fireplace.
picture frame.
carpet.
```

### `living_room_sentences.wav`: 15 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

We watch TV in the evening.
The music comes from the speaker.
Grandpa sits in his armchair.
Let's sit on the sofa.
Put the cushion on the armchair.
Put your cup on the coffee table.
Where is the remote control?
These flowers are for you.
I'm reading a magazine.
Water the plant, please.
The floor lamp is next to the plant.
Go up the stairs.
It's warm by the fireplace.
There is a photo in the picture frame.
The carpet is soft and warm.
```

## 5. Market (`grocery`): 16 eşya

### `grocery_words.wav`: 16 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

banana.
orange.
tomato.
carrot.
onion.
potato.
lemon.
grapes.
milk.
eggs.
cheese.
scale.
cash register.
counter.
shopping basket.
trolley.
```

### `grocery_sentences.wav`: 16 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

I eat a banana for breakfast.
This orange is very sweet.
I need two tomatoes for the salad.
Rabbits like carrots.
Onions make me cry.
We need a kilo of potatoes.
Lemons are sour.
These grapes are sweet.
Can I have a bottle of milk?
I need six eggs.
I like cheese on my toast.
Put the apples on the scale.
Pay at the cash register.
The scale is on the counter.
Take a shopping basket.
The trolley is full.
```

## 6. Sınıf (`classroom`): 14 eşya

### `classroom_words.wav`: 14 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

whiteboard.
map.
globe.
cabinet.
noticeboard.
ceiling.
desk.
backpack.
pencil.
notebook.
scissors.
pencil case.
teacher's desk.
floor.
```

### `classroom_sentences.wav`: 14 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

The teacher writes on the whiteboard.
Find Turkey on the map.
The globe is on the cabinet.
The books are in the cabinet.
Read the noticeboard, please.
The ceiling is white.
This is my desk.
My backpack is heavy.
Can I borrow a pencil?
Write it in your notebook.
Be careful with the scissors.
My pencils are in my pencil case.
The teacher's desk is at the front.
Don't sit on the floor.
```


---

# Orta

## 7. Kafe (`cafe`): 15 eşya

### `cafe_words.wav`: 15 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

coffee machine.
tip jar.
display case.
croissant.
muffin.
stool.
shelf.
latte.
teapot.
straws.
sugar bowl.
napkin holder.
sandwich.
tray.
receipt.
```

### `cafe_sentences.wav`: 15 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

The coffee machine is very loud.
Leave some coins in the tip jar.
The cakes are in the display case.
A croissant and a coffee, please.
This chocolate muffin is delicious.
Sit on the stool by the counter.
The coffee bags are on the shelf.
I'd like a latte, please.
The teapot is hot.
Paper straws are better for nature.
Pass me the sugar bowl, please.
Take a napkin from the napkin holder.
I'll have a cheese sandwich.
Put the cups on the tray.
Can I have the receipt, please?
```

## 8. Havalimanı (`airport`): 14 eşya

### `airport_words.wav`: 14 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

departure board.
escalator.
seats.
metal detector.
airplane.
luggage trolley.
check-in desk.
conveyor belt.
screen.
pillar.
passport.
boarding pass.
sunglasses.
suitcase.
```

### `airport_sentences.wav`: 14 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

Check your flight on the departure board.
Take the escalator to the first floor.
The seats are near the window.
Walk through the metal detector.
Our airplane is ready.
Put your bags on the luggage trolley.
Go to the check-in desk first.
Put your suitcase on the conveyor belt.
Look at the screen for your gate.
Meet me by the pillar.
Can I see your passport, please?
Here is your boarding pass.
Don't forget your sunglasses.
My suitcase is too heavy.
```

## 9. Otel Lobisi (`hotel`): 12 eşya

### `hotel_words.wav`: 12 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

chandelier.
revolving door.
luggage cart.
umbrella stand.
newspaper rack.
lift.
bell.
key card.
room key.
brochures.
reception desk.
palm tree.
```

### `hotel_sentences.wav`: 12 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

What a beautiful chandelier!
Push the revolving door slowly.
The bellboy pushes the luggage cart.
Leave your umbrella in the umbrella stand.
Take a newspaper from the newspaper rack.
Let's take the lift to the third floor.
Ring the bell for service.
Your key card opens the door.
Here is your room key.
Take a brochure about the city.
Please check in at the reception desk.
There is a palm tree in the lobby.
```

## 10. Sokak (`street`): 17 eşya

### `street_words.wav`: 17 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

tree.
pharmacy.
balcony.
building.
streetlight.
traffic light.
road sign.
bus.
bus stop.
taxi.
zebra crossing.
bench.
bicycle.
fire hydrant.
post box.
bin.
pavement.
```

### `street_sentences.wav`: 17 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

The bird is in the tree.
Is there a pharmacy near here?
She is on the balcony.
That building is very old.
The streetlight turns on at night.
Stop! The traffic light is red.
Look at the road sign.
The bus is late again.
Wait at the bus stop.
Let's take a taxi.
Cross at the zebra crossing.
Let's sit on the bench.
I ride my bicycle to work.
Don't park near the fire hydrant.
Put the letter in the post box.
Throw it in the bin.
Walk on the pavement.
```

## 11. Ofis (`office`): 13 eşya

### `office_words.wav`: 13 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

markers.
calendar.
printer.
office chair.
desk lamp.
monitor.
mug.
keyboard.
laptop.
stapler.
headphones.
water cooler.
socket.
```

### `office_sentences.wav`: 13 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

The markers are under the whiteboard.
Write the meeting on the calendar.
The printer is out of paper.
This office chair is comfortable.
Turn on the desk lamp.
My monitor is too small.
I drink tea from my mug.
This keyboard is very quiet.
I work on my laptop.
Can I borrow your stapler?
I wear headphones in meetings.
Let's chat at the water cooler.
Plug the laptop into the socket.
```

## 12. Muayenehane (`doctor`): 13 eşya

### `doctor_words.wav`: 13 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

examination bed.
paper roll.
step stool.
skeleton.
blinds.
first aid kit.
soap dispenser.
prescription.
blood pressure monitor.
stethoscope.
thermometer.
pills.
gloves.
```

### `doctor_sentences.wav`: 13 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

Please lie down on the examination bed.
The paper roll keeps the bed clean.
Use the step stool to get up.
The skeleton has 206 bones.
Close the blinds, please.
The first aid kit is on the wall.
The soap dispenser is empty.
Take this prescription to the pharmacy.
Let's check your blood pressure.
The doctor listens with a stethoscope.
The thermometer says thirty-eight degrees.
Take two pills after dinner.
The nurse puts on gloves.
```


---

# İleri

## 13. Garaj (`garage`): 17 eşya

### `garage_words.wav`: 17 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

saw.
pegboard.
ladder.
light.
hammer.
screwdriver.
wrench.
pliers.
tape measure.
nails.
drill.
workbench.
toolbox.
paint can.
paintbrush.
tyre.
extension cord.
```

### `garage_sentences.wav`: 17 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

I cut the wood with a saw.
Hang the tools on the pegboard.
Hold the ladder, please.
Turn on the light.
Hit the nail with the hammer.
I need a screwdriver.
Pass me the wrench.
Hold it with the pliers.
Measure it with the tape measure.
The nails are in the jar.
The drill is very loud.
The tools are on the workbench.
My tools are in the toolbox.
Open the paint can carefully.
Clean the paintbrush after use.
The car needs a new tyre.
We need an extension cord.
```

## 14. Bahçe (`garden`): 16 eşya

### `garden_words.wav`: 16 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

swing.
rope.
roses.
fence.
hedge.
bird house.
lawnmower.
wheelbarrow.
shed.
shovel.
hose.
watering can.
flowerpot.
grass.
path.
sky.
```

### `garden_sentences.wav`: 16 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

The kids love the swing.
The swing hangs on a rope.
Roses smell lovely.
The fence is made of wood.
The hedge is very tall.
A bird lives in the bird house.
Dad cuts the grass with the lawnmower.
Carry the soil in the wheelbarrow.
The tools are in the shed.
Dig a hole with the shovel.
Water the flowers with the hose.
Fill the watering can, please.
Put the plant in a bigger flowerpot.
Don't walk on the grass.
Follow the stone path.
The sky is blue today.
```

## 15. Spor Salonu (`gym`): 14 eşya

### `gym_words.wav`: 14 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

locker.
punching bag.
treadmill.
exercise bike.
weight bench.
weights.
dumbbells.
air conditioner.
pipe.
kettlebell.
jump rope.
water bottle.
medicine ball.
yoga mat.
```

### `gym_sentences.wav`: 14 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

Put your bag in the locker.
Hit the punching bag!
I run on the treadmill for twenty minutes.
The exercise bike is free.
Lie down on the weight bench.
These weights are too heavy for me.
Lift the dumbbells slowly.
Turn on the air conditioner, it's hot!
There are pipes on the ceiling.
Swing the kettlebell with both hands.
Jump rope is great exercise.
Don't forget your water bottle.
Throw the medicine ball to me.
Roll out your yoga mat.
```

## 16. Kamp Alanı (`camping`): 19 eşya

### `camping_words.wav`: 19 satır

```
Read this list slowly and clearly for English learners, in a warm, neutral voice. Say each word once, then pause for one full second before the next word. Do not add anything else.

mountain.
lake.
pine tree.
lantern.
tent.
camping chair.
cooler.
campfire.
firewood.
stones.
axe.
log.
boots.
picnic blanket.
sleeping bag.
torch.
compass.
binoculars.
pocket knife.
```

### `camping_sentences.wav`: 19 satır

```
Read these sentences slowly and clearly for English learners, in a warm, natural voice. Read each sentence once, then pause for one and a half seconds before the next sentence. Do not add anything else.

We climbed the mountain.
Let's swim in the lake.
Pine trees stay green in winter.
Hang the lantern on the tree.
We sleep in a tent.
Sit on the camping chair.
The drinks are in the cooler.
Let's sit by the campfire.
Put more firewood on the fire.
There are stones around the fire.
Be careful with the axe.
The axe is in the log.
My boots are wet.
Let's sit on the picnic blanket.
My sleeping bag is warm.
Turn on your torch, it's dark.
Use the compass to find north.
Look at the birds with binoculars.
A pocket knife is very useful.
```
