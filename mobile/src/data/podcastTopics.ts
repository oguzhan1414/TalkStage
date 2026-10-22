/**
 * Hangi podcast bölümü hangi yeni konunun yanında bonus olarak gelir (konu kodu -> "<seviye>_ep<no>").
 * Bölümler seviye başına 10 tane (A1-B2); İleri aşamada podcast yok. Eşleme konunun sahnesine ve işlediği yapıya göre
 * yapıldı; haritada olmayan konu, seviyenin kullanılmamış bir bölümünü alır (bkz. curriculumTasks.ts).
 */
export const PODCAST_FOR_TOPIC: Record<string, string> = {
  // A1
  A1_N01: 'a1_ep01', // The Morning Cafe: kafede tanışma ve sipariş
  A1_N03: 'a1_ep08', // My Family & Hobbies
  A1_N04: 'a1_ep06', // Meeting a New Colleague: soru sorma
  A1_N05: 'a1_ep02', // Morning Alarm & Daily Routines
  A1_N07: 'a1_ep03', // Lost in the City: yol tarifi
  A1_N09: 'a1_ep10', // A Simple Phone Call
  A1_N10: 'a1_ep04', // Dinner at the Bistro: kibar rica ve sipariş
  A1_N11: 'a1_ep07', // Grocery Shopping & Prices
  A1_N13: 'a1_ep05', // Weekend Memories & Plans
  // A2
  A2_N14: 'a2_ep05', // Cinema Night & Weekend Plans
  A2_N15: 'a2_ep01', // Boarding Pass & Departure Gate
  A2_N16: 'a2_ep09', // Planning a Summer Vacation: karşılaştırma
  A2_N17: 'a2_ep04', // A Doctor's Visit
  A2_N18: 'a2_ep07', // Tech Support & Device Issues
  A2_N19: 'a2_ep02', // Hotel Check-in & Special Requests
  A2_N20: 'a2_ep03', // Shopping Spree & Fitting Rooms
  A2_N21: 'a2_ep08', // Inviting a Friend to Dinner
  A2_N22: 'a2_ep06', // Renting a Car for a Road Trip
  A2_N23: 'a2_ep10', // A Job Fair & Basic Skills
  // B1
  B1_N24: 'b1_ep01', // The Job Interview & Career Growth
  B1_N25: 'b1_ep07', // Freelancing vs. Office Job
  B1_N26: 'b1_ep05', // Eco-Friendly Living & Recycling
  B1_N27: 'b1_ep03', // Delayed Flights & Lost Luggage
  B1_N28: 'b1_ep04', // Smart Technology in Daily Life
  B1_N29: 'b1_ep10', // A University Project Review
  B1_N30: 'b1_ep02', // Apartment Hunting & Leases
  B1_N32: 'b1_ep09', // Handling a Client Complaint
  B1_N33: 'b1_ep06', // Opening a Bank Account Abroad
  B1_N34: 'b1_ep08', // Organizing a Tech Meetup
  // B2
  B2_N35: 'b2_ep04', // Crisis Management & Data Breach Response
  B2_N36: 'b2_ep10', // Cybersecurity Law & Digital Privacy Rights
  B2_N37: 'b2_ep03', // Startup Venture Capital Pitch
  B2_N38: 'b2_ep06', // Negotiating a Corporate Contract
  B2_N39: 'b2_ep01', // AI Ethics, Copyright & The Future of Work
  B2_N40: 'b2_ep02', // Green Infrastructure & Net-Zero Urban Design
  B2_N41: 'b2_ep09', // The Philosophy of Remote Work & Global Teams
  B2_N42: 'b2_ep05', // Autonomous Vehicles & Ethical Algorithms
};
