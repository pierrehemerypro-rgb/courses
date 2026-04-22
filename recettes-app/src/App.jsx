import { useState, useEffect } from "react";

const pool = [
  // ── TOUTE L'ANNÉE ──
  { nom: "Wrap falafels, houmous & coleslaw", type: "rapide", temps: "5 min", saison: "Toute l'année", cal: 620, prot: 24, ingredients: ["2 wraps complets", "4 falafels Herta (2 par wrap)", "2 c.à.s. houmous", "Coleslaw", "Salade verte", "Tomates séchées"], etapes: ["Réchauffer les falafels à la poêle ou micro-ondes 2 min.", "Étaler le houmous sur chaque wrap.", "Répartir la salade, 2 falafels, le coleslaw et les tomates séchées.", "Rouler serrés et couper en deux."] },
  { nom: "Salade césar végé (escalope milanaise)", type: "rapide", temps: "10 min", saison: "Toute l'année", cal: 460, prot: 26, ingredients: ["2 escalopes milanaises végé (Like Meat / Garden Gourmet)", "1 laitue", "Parmesan en copeaux", "Croûtons maison", "Sauce césar", "Jus de citron", "Poivre"], etapes: ["Réchauffer escalopes 2-3 min de chaque côté. Couper en tranches.", "Laver et essorer la laitue.", "Dorer les croûtons à la poêle 3 min.", "Assembler laitue + escalopes + croûtons + parmesan. Napper de sauce césar."] },
  { nom: "Riz sauté wok, œufs & sauce soja", type: "rapide", temps: "10 min", saison: "Toute l'année", cal: 430, prot: 20, ingredients: ["150g riz cuit (de la veille)", "2 œufs", "2-3 c.à.s. sauce soja", "Huile de sésame", "Poivre", "Ciboulette"], etapes: ["Chauffer le wok à feu très vif — il doit fumer légèrement.", "Ajouter le riz froid, sauter 2-3 min.", "Pousser sur les bords, casser les œufs au centre, brouiller puis mélanger.", "Verser la sauce soja, 30 sec à feu vif. Poivrer."] },
  { nom: "Shakshuka classique & pain de campagne", type: "élaboré", temps: "30 min", saison: "Toute l'année", portions: 2, cal: 460, prot: 24, ingredients: ["4 œufs", "400g tomates concassées", "80g feta", "1 oignon", "2 gousses d'ail", "Paprika fumé", "Cumin", "Piment doux", "2 tranches pain de campagne", "Huile d'olive"], etapes: ["Faire revenir oignon + ail 5 min.", "Ajouter tomates + épices. Mijoter 12 min.", "Creuser 4 puits, casser les œufs. Couvrir 5-7 min.", "Émietter la feta. Servir avec pain grillé."] },
  { nom: "Poêlée steak haché végé, riz & sauce soja", type: "rapide", temps: "15 min", saison: "Toute l'année", portions: 2, cal: 490, prot: 28, ingredients: ["2 steaks hachés végé", "150g riz basmati cuit", "2 c.à.s. sauce soja", "1 c.à.c. gingembre râpé", "1 c.à.c. miel", "1 gousse d'ail", "Oignons nouveaux", "Huile de sésame"], etapes: ["Émietter les steaks végé, dorer 5 min à la poêle.", "Mélanger soja + gingembre + ail + miel + sésame.", "Verser la sauce, mélanger 1 min.", "Servir sur riz avec oignons nouveaux."] },
  { nom: "Poulet tikka masala & riz", type: "élaboré", temps: "35 min", saison: "Toute l'année", cal: 510, prot: 44, ingredients: ["2 blancs de poulet", "400g tomates concassées", "100ml crème légère", "1 oignon", "2 gousses d'ail", "Gingembre frais", "Garam masala", "Cumin", "Paprika doux", "Curcuma", "Riz basmati", "Coriandre fraîche"], etapes: ["Dorer le poulet en cubes 5 min. Réserver.", "Revenir oignon + ail + gingembre + épices 3 min.", "Ajouter tomates, mijoter 10 min.", "Remettre poulet + crème, mijoter 8 min. Servir sur riz."] },
  { nom: "Blanc de poulet citron-herbes & légumes", type: "rapide", temps: "25 min", saison: "Toute l'année", cal: 480, prot: 42, ingredients: ["2 blancs de poulet", "Jus de 1 citron", "Thym, romarin", "2 gousses d'ail", "Brocoli ou haricots verts", "Huile d'olive"], etapes: ["Mariner le poulet 10 min : citron + ail + herbes + huile.", "Cuire à la poêle 6-7 min de chaque côté.", "Légumes vapeur 8 min en parallèle.", "Servir avec vinaigrette moutarde."] },
  { nom: "Pâtes arrabiata maison", type: "rapide", temps: "20 min", saison: "Toute l'année", cal: 520, prot: 16, ingredients: ["200g spaghetti ou penne", "400g tomates concassées", "3 gousses d'ail", "Piment rouge en flocons", "Huile d'olive", "Basilic", "Parmesan"], etapes: ["Cuire les pâtes al dente, garder une louche d'eau.", "Revenir ail + piment 2 min. Ajouter tomates, mijoter 10 min.", "Mélanger pâtes + sauce + eau de cuisson 1 min.", "Finir parmesan + basilic. Idéal avant le basket."] },
  { nom: "Pâtes pesto, épinards & parmesan", type: "rapide", temps: "15 min", saison: "Toute l'année", cal: 560, prot: 18, ingredients: ["200g penne", "3 c.à.s. pesto (pot)", "100g épinards frais", "Parmesan râpé", "Poivre", "Huile d'olive"], etapes: ["Cuire les pâtes al dente.", "Épinards 1 min dans la casserole vide.", "Ajouter pâtes + pesto + eau de cuisson. Mélanger.", "Finir parmesan + poivre."] },
  { nom: "Pâtes carbonara végé", type: "rapide", temps: "20 min", saison: "Toute l'année", cal: 580, prot: 26, ingredients: ["200g spaghetti", "3 œufs + 1 jaune", "50g parmesan râpé", "1 gousse d'ail", "Poivre noir généreux", "Huile d'olive"], etapes: ["Cuire les pâtes, garder une grande louche d'eau.", "Battre œufs + parmesan + poivre.", "Revenir l'ail, retirer. Hors du feu : pâtes + mélange œufs.", "Eau de cuisson cuillère par cuillère en remuant vite."] },
  { nom: "Tofu teriyaki, riz & brocoli", type: "rapide", temps: "20 min", saison: "Toute l'année", cal: 490, prot: 24, ingredients: ["200g tofu ferme", "150g riz basmati cuit", "200g brocoli", "3 c.à.s. sauce soja", "1 c.à.s. miel", "Vinaigre de riz", "Ail", "Gingembre frais", "Graines de sésame"], etapes: ["Éponger le tofu, dorer à feu vif 8 min.", "Sauce : soja + miel + vinaigre + ail + gingembre.", "Verser sur tofu, caraméliser 2 min.", "Brocoli vapeur 5 min. Servir sur riz, sésame."] },
  { nom: "Poulet teriyaki & riz", type: "rapide", temps: "25 min", saison: "Toute l'année", portions: 2, cal: 520, prot: 44, ingredients: ["2 blancs de poulet", "150g riz basmati cuit", "3 c.à.s. sauce soja", "1 c.à.s. miel", "Vinaigre de riz", "Ail", "Gingembre frais", "Graines de sésame", "Oignons nouveaux"], etapes: ["Couper poulet en tranches.", "Sauce : soja + miel + vinaigre + ail + gingembre.", "Dorer poulet 5-6 min, verser sauce, caraméliser 2 min.", "Servir sur riz, sésame + oignons nouveaux."] },
  { nom: "Wok légumes, tofu & sauce hoisin", type: "rapide", temps: "20 min", saison: "Toute l'année", cal: 470, prot: 22, ingredients: ["200g tofu ferme", "2 carottes", "1 poireau", "100g champignons", "2 c.à.s. sauce hoisin", "1 c.à.s. sauce soja", "Ail", "Gingembre frais", "Huile de sésame", "Riz ou nouilles"], etapes: ["Dorer tofu 8 min, réserver.", "Wok très chaud : ail + gingembre 30 sec.", "Légumes 4-5 min en remuant.", "Remettre tofu + hoisin + soja. Huile sésame hors du feu."] },
  { nom: "Nasi goreng végé", type: "rapide", temps: "15 min", saison: "Toute l'année", cal: 480, prot: 18, ingredients: ["150g riz cuit (de la veille)", "2 œufs", "1 c.à.s. kecap manis", "1 c.à.s. sauce soja", "Sambal oelek (piment)", "1 oignon", "2 gousses d'ail", "Concombre frais", "Oignons frits (sachet)"], etapes: ["Revenir oignon + ail 3 min à feu vif.", "Ajouter riz froid, sauter 3 min.", "Œufs brouillés au centre, mélanger.", "Kecap manis + soja + sambal 1 min. Servir avec concombre + oignons frits."] },
  { nom: "Soupe miso, tofu & champignons", type: "rapide", temps: "15 min", saison: "Toute l'année", cal: 280, prot: 18, ingredients: ["150g tofu soyeux", "100g champignons (shiitake ou Paris)", "2 c.à.s. pâte miso blanche", "600ml eau", "Nori (optionnel)", "Oignons nouveaux", "Sauce soja"], etapes: ["Porter l'eau à frémissement.", "Ajouter champignons 5 min.", "Hors du feu, dissoudre miso — ne jamais faire bouillir.", "Ajouter tofu en cubes. Servir avec oignons nouveaux + nori."] },
  { nom: "Omelette aux œufs & fromage", type: "rapide", temps: "10 min", saison: "Toute l'année", cal: 380, prot: 24, ingredients: ["4 œufs", "40g comté ou gruyère râpé", "1 c.à.s. beurre", "Ciboulette", "Sel, poivre"], etapes: ["Battre les œufs avec sel + poivre.", "Faire fondre le beurre à feu moyen-vif.", "Verser les œufs, remuer doucement, ajouter fromage.", "Plier l'omelette, servir avec ciboulette."] },

  // ── HIVER / PRINTEMPS ──
  { nom: "Bowl lentilles corail & carottes rôties", type: "rapide", temps: "25 min", saison: "Hiver/Printemps", cal: 560, prot: 26, ingredients: ["200g lentilles corail", "3 carottes", "60g feta", "Graines mélangées (courge, tournesol, sésame)", "Cumin", "Curcuma", "Coriandre fraîche", "Huile d'olive", "2 c.à.s. tahini", "Jus de citron", "1 gousse d'ail"], etapes: ["Carottes en rondelles, rôtir 20 min à 200°C avec huile + cumin.", "Cuire lentilles 12 min. Assaisonner curcuma + sel.", "Griller les graines 2-3 min à sec.", "Sauce tahini : tahini + citron + ail + eau chaude.", "Assembler : lentilles + carottes + feta + graines + coriandre + sauce."] },
  { nom: "Omelette poireaux & chèvre", type: "rapide", temps: "15 min", saison: "Hiver/Printemps", cal: 420, prot: 28, ingredients: ["4 œufs", "1 poireau", "60g chèvre frais", "Ciboulette", "Sel, poivre", "Huile d'olive"], etapes: ["Émincer et revenir le poireau 5 min.", "Battre œufs, saler, poivrer. Verser sur poireaux.", "Ajouter chèvre, plier l'omelette. Servir avec ciboulette."] },
  { nom: "Dal lentilles coco butternut", type: "élaboré", temps: "45 min", saison: "Hiver/Printemps", portions: 2, cal: 530, prot: 22, ingredients: ["300g lentilles corail", "400ml lait de coco", "1/2 butternut", "1 oignon", "2 gousses d'ail", "Gingembre frais", "Curry", "Curcuma", "Baguette ou riz basmati"], etapes: ["Butternut en petits cubes.", "Revenir oignon + ail + gingembre 3 min.", "Curry + curcuma + butternut 1 min.", "Lentilles + lait de coco + 300ml eau. Mijoter 20-25 min.", "Servir avec baguette fraîche ou riz."] },
  { nom: "Frittata poireaux, champignons & parmesan", type: "élaboré", temps: "40 min", saison: "Hiver/Printemps", portions: 2, cal: 460, prot: 30, ingredients: ["6 œufs", "2 poireaux", "200g champignons", "40g parmesan râpé", "Thym frais", "Sel, poivre", "Huile d'olive"], etapes: ["Préchauffer four 180°C.", "Revenir poireaux + champignons 10 min (poêle allant au four).", "Battre œufs + parmesan + assaisonnement.", "Verser sur légumes. 5 min feu + 15 min four."] },
  { nom: "Curry poireaux & carottes", type: "élaboré", temps: "45 min", saison: "Hiver/Printemps", cal: 470, prot: 18, ingredients: ["3 poireaux", "4 carottes", "400ml lait de coco", "1 oignon", "Curry", "Curcuma", "Gingembre frais", "Riz basmati"], etapes: ["Émincer poireaux, rondelles de carottes.", "Revenir oignon + gingembre + épices.", "Ajouter légumes 2 min. Lait de coco + 100ml eau.", "Mijoter 20-25 min. Servir sur riz."] },

  { nom: "Poêlée lentilles, kale & œuf poché", type: "rapide", temps: "20 min", saison: "Hiver/Printemps", cal: 440, prot: 26, ingredients: ["200g lentilles cuites (boîte)", "100g kale ou épinards", "2 œufs", "1 gousse d'ail", "Vinaigre blanc", "Huile d'olive", "Flocons de piment"], etapes: ["Revenir ail + kale 5 min.", "Ajouter lentilles égouttées, réchauffer 3 min.", "Pocher les œufs 3 min dans eau frémissante + vinaigre.", "Déposer les œufs sur les lentilles, piment + poivre."] },

  // ── ÉTÉ ──
  { nom: "Salade pâtes, thon & tomates cerises", type: "rapide", temps: "15 min", saison: "Été", cal: 490, prot: 30, ingredients: ["200g fusilli", "1 boîte thon en eau", "250g tomates cerises", "Basilic frais", "Câpres", "Huile d'olive", "Jus de citron", "Sel, poivre"], etapes: ["Cuire les pâtes, refroidir sous eau froide.", "Couper tomates, égoutter thon.", "Mélanger tout avec huile + citron + basilic.", "Câpres + sel + poivre. Se mange froid."] },
  { nom: "Bowl poulet grillé & quinoa estival", type: "élaboré", temps: "30 min", saison: "Été", cal: 500, prot: 40, ingredients: ["2 blancs de poulet", "150g quinoa", "2 courgettes", "1 poivron", "Jus de citron", "Herbes de Provence", "60g feta", "Huile d'olive"], etapes: ["Cuire quinoa 15 min.", "Mariner poulet : citron + herbes + huile. Griller 6-7 min/côté.", "Rôtir courgettes + poivron 15 min à 200°C.", "Assembler bowl, émietter feta."] },
  { nom: "Gaspacho & tartines chèvre-tomates", type: "rapide", temps: "15 min", saison: "Été", cal: 380, prot: 14, ingredients: ["4 tomates bien mûres", "1/2 concombre", "1 poivron rouge", "1 gousse d'ail", "Huile d'olive", "Vinaigre de Xérès", "Pain de campagne", "Chèvre frais", "Basilic"], etapes: ["Mixer tomates + concombre + poivron + ail + huile + vinaigre.", "Assaisonner, réfrigérer 30 min minimum.", "Griller le pain, tartiner de chèvre.", "Servir gaspacho froid avec tartines + basilic."] },
  { nom: "Salade niçoise végé", type: "rapide", temps: "15 min", saison: "Été", cal: 420, prot: 22, ingredients: ["3 œufs", "200g haricots verts", "250g tomates cerises", "1 poivron", "Olives noires", "Câpres", "Laitue", "Vinaigrette moutarde-citron"], etapes: ["Cuire œufs durs 9 min. Haricots vapeur 8 min.", "Couper tomates, poivron en lanières.", "Assembler salade + légumes + œufs + olives + câpres.", "Vinaigrette : moutarde + citron + huile d'olive."] },
  { nom: "Curry courgettes & pois chiches", type: "élaboré", temps: "30 min", saison: "Été", cal: 460, prot: 20, ingredients: ["400g pois chiches (boîte)", "3 courgettes", "400ml lait de coco", "1 oignon", "Curry", "Curcuma", "Gingembre frais", "Coriandre fraîche", "Riz basmati"], etapes: ["Revenir oignon + épices 3 min.", "Ajouter courgettes en cubes 3 min.", "Pois chiches + lait de coco. Mijoter 15 min.", "Coriandre fraîche. Servir sur riz."] },
  { nom: "Pâtes légumes rôtis & ricotta", type: "élaboré", temps: "35 min", saison: "Été", cal: 530, prot: 20, ingredients: ["200g penne", "2 courgettes", "1 aubergine", "250g ricotta", "Basilic frais", "Parmesan râpé", "2 gousses d'ail", "Huile d'olive"], etapes: ["Rôtir courgettes + aubergine en cubes 20 min à 200°C.", "Cuire pâtes al dente.", "Mélanger pâtes + légumes + ricotta + eau cuisson.", "Finir parmesan + basilic."] },

  // ── AUTOMNE ──
  { nom: "Risotto champignons & vin blanc", type: "élaboré", temps: "40 min", saison: "Automne", portions: 2, cal: 530, prot: 18, ingredients: ["200g riz arborio", "300g champignons mélangés (Paris, shiitake...)", "1 oignon", "2 gousses d'ail", "150ml vin blanc sec", "800ml bouillon légumes chaud", "50g parmesan râpé", "2 c.à.s. beurre", "Thym frais", "Persil plat", "Huile d'olive", "Sel, poivre"], etapes: ["Émincer champignons + oignon + ail. Faire revenir champignons à feu vif 8 min jusqu'à coloration. Réserver.", "Dans la même casserole, revenir oignon + ail 3 min. Ajouter le riz, nacrer 2 min en remuant.", "Verser le vin blanc, remuer jusqu'à absorption complète.", "Ajouter le bouillon chaud louche par louche en remuant constamment — 18-20 min. Le riz doit être al dente.", "Incorporer les champignons réservés + parmesan + beurre hors du feu. Poivrer généreusement. Persil haché."] },
  { nom: "Soupe potimarron & lait de coco", type: "rapide", temps: "30 min", saison: "Automne", cal: 350, prot: 8, ingredients: ["1 petit potimarron (800g)", "400ml lait de coco", "1 oignon", "Gingembre frais", "Curry", "Bouillon légumes", "Graines de courge"], etapes: ["Couper potimarron (pas besoin d'éplucher), revenir avec oignon.", "Couvrir de bouillon, cuire 20 min.", "Mixer, ajouter lait de coco + gingembre + curry.", "Servir avec graines de courge grillées."] },
  { nom: "Poêlée champignons, châtaignes & œufs", type: "rapide", temps: "20 min", saison: "Automne", cal: 430, prot: 22, ingredients: ["300g champignons mélangés", "150g châtaignes cuites (sachet)", "3 œufs", "1 gousse d'ail", "Thym frais", "Persil plat", "Huile d'olive", "Pain de campagne"], etapes: ["Revenir champignons + ail à feu vif 8 min.", "Ajouter châtaignes, réchauffer 2 min.", "Faire de la place, brouiller les œufs au centre, mélanger.", "Persil + thym, servir avec pain grillé."] },
  { nom: "Tarte fine champignons & gruyère", type: "élaboré", temps: "35 min", saison: "Automne", portions: 2, cal: 480, prot: 18, ingredients: ["1 pâte feuilletée", "300g champignons", "100g gruyère râpé", "2 œufs", "100ml crème légère", "Thym", "Sel, poivre"], etapes: ["Préchauffer four 200°C. Étaler pâte sur plaque.", "Revenir champignons 8 min.", "Battre œufs + crème + sel + thym.", "Étaler champignons sur pâte, verser appareil, fromage. Cuire 20 min."] },
  { nom: "Lentilles beluga, betterave & feta", type: "rapide", temps: "25 min", saison: "Automne", cal: 430, prot: 22, ingredients: ["200g lentilles beluga", "200g betterave cuite", "80g feta", "Roquette", "Noix", "Vinaigre balsamique", "Huile d'olive", "Oignons nouveaux"], etapes: ["Cuire lentilles 20 min dans l'eau salée. Refroidir.", "Couper betterave en cubes.", "Mélanger lentilles + betterave + roquette + noix.", "Émietter feta, vinaigrette balsamique."] },
];

const structureSemaine = [
  { jour: "Lundi",     slots: [{ moment: "Dîner",    resto: false }] },
  { jour: "Mardi",    slots: [{ moment: "Dîner",    resto: false }] },
  { jour: "Mercredi", slots: [{ moment: "Déjeuner", resto: false }, { moment: "Dîner",    resto: false }] },
  { jour: "Jeudi",    slots: [{ moment: "Dîner",    resto: true  }] },
  { jour: "Vendredi", slots: [{ moment: "Déjeuner", resto: false }, { moment: "Dîner",    resto: true  }] },
  { jour: "Samedi",   slots: [{ moment: "Déjeuner", resto: false }, { moment: "Dîner",    resto: true  }] },
  { jour: "Dimanche", slots: [{ moment: "Déjeuner", resto: false }, { moment: "Dîner",    resto: true  }] },
];

const desserts = ["🍎 1 pomme", "🍊 2 clémentines"];

const WRAP = "Wrap falafels, houmous & coleslaw";

function genererPlan() {
  // Tous les slots maison à remplir : liste plate de { jourIdx, slotIdx }
  const slots = [];
  structureSemaine.forEach((j, ji) =>
    j.slots.forEach((s, si) => { if (!s.resto) slots.push({ ji, si }); })
  );

  // Construire le plan vide
  const plan = structureSemaine.map(j => ({
    jour: j.jour,
    repas: j.slots.map(s => s.resto
      ? { moment: s.moment, nom: "🍽 Restaurant", type: "resto", temps: "—", cal: null, prot: null }
      : null
    )
  }));

  const used = new Set();
  let slotIdx = 0;

  // 1. Placer les wraps sur 3 slots (répartis lundi/mercredi/dimanche déjeuner de préférence)
  const wrapSlots = slots.filter(s => structureSemaine[s.ji].slots[s.si].moment === "Déjeuner").slice(0, 2);
  const wrapR = pool.find(r => r.nom === WRAP);
  wrapSlots.forEach(s => {
    plan[s.ji].repas[s.si] = { moment: structureSemaine[s.ji].slots[s.si].moment, nom: wrapR.nom, type: wrapR.type, temps: wrapR.temps, cal: wrapR.cal, prot: wrapR.prot, dessert: desserts[(s.ji + s.si) % 2] };
  });
  used.add(WRAP);

  // 2. Remplir les slots restants, en gérant les recettes multi-portions
  const slotsRestants = slots.filter(s => plan[s.ji].repas[s.si] === null);

  let i = 0;
  while (i < slotsRestants.length) {
    const s = slotsRestants[i];
    let candidates = pool.filter(r => !used.has(r.nom));
    if (candidates.length === 0) { used.clear(); used.add(WRAP); candidates = pool.filter(r => r.nom !== WRAP); }

    const r = candidates[Math.floor(Math.random() * candidates.length)];
    used.add(r.nom);

    const moment1 = structureSemaine[s.ji].slots[s.si].moment;
    plan[s.ji].repas[s.si] = { moment: moment1, nom: r.nom, type: r.type, temps: r.temps, cal: r.cal, prot: r.prot, dessert: desserts[(s.ji + s.si) % 2] };
    i++;

    // Si recette multi-portions ET slot suivant disponible → restes
    if (r.portions === 2 && i < slotsRestants.length) {
      const s2 = slotsRestants[i];
      const moment2 = structureSemaine[s2.ji].slots[s2.si].moment;
      plan[s2.ji].repas[s2.si] = { moment: moment2, nom: `🔁 Restes : ${r.nom}`, type: "rapide", temps: "5 min", cal: r.cal, prot: r.prot, dessert: desserts[(s2.ji + s2.si) % 2], estReste: true, recetteOrigine: r.nom };
      i++;
    }
  }

  return plan;
}

const TC = {
  rapide:  { bg: "#e8f5e9", text: "#2e7d32", label: "⚡ Rapide" },
  élaboré: { bg: "#fff8e1", text: "#f57f17", label: "👨‍🍳 Élaboré" },
  resto:   { bg: "#f3e5f5", text: "#7b1fa2", label: "🍽 Resto" },
};

export default function App() {
  const [view, setView]             = useState("plan");
  const [filter, setFilter]         = useState("tous");
  const [selected, setSelected]     = useState(null);
  const [plan, setPlanState]        = useState(null);
  const [swapping, setSwapping]     = useState(null);
  const [courses, setCoursesState]  = useState(null);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading]       = useState(true);

  // Charger plan + courses depuis le storage au démarrage
  useEffect(() => {
    (async () => {
      try {
        const savedPlan = await window.storage.get("recettes-plan");
        if (savedPlan) {
          setPlanState(JSON.parse(savedPlan.value));
        } else {
          const newPlan = genererPlan();
          setPlanState(newPlan);
          await window.storage.set("recettes-plan", JSON.stringify(newPlan));
        }
      } catch {
        setPlanState(genererPlan());
      }
      try {
        const savedCourses = await window.storage.get("recettes-courses");
        if (savedCourses) setCoursesState(JSON.parse(savedCourses.value));
      } catch {}
      setLoading(false);
    })();
  }, []);

  const setPlan = async (newPlan) => {
    const resolved = typeof newPlan === "function" ? newPlan(plan) : newPlan;
    setPlanState(resolved);
    try { await window.storage.set("recettes-plan", JSON.stringify(resolved)); } catch {}
  };

  const setCourses = async (data) => {
    setCoursesState(data);
    try {
      if (data) await window.storage.set("recettes-courses", JSON.stringify(data));
      else await window.storage.delete("recettes-courses");
    } catch {}
  };

  const filtered = pool.filter(r => filter === "tous" || r.type === filter);

  const handleSwap = (ji, ri, r) => {
    setPlan(p => p.map((j, jj) => ({
      ...j,
      repas: j.repas.map((rep, rr) =>
        jj === ji && rr === ri ? { ...rep, nom: r.nom, cal: r.cal, prot: r.prot, type: r.type, temps: r.temps } : rep
      )
    })));
    setSwapping(null);
  };

  const genererCourses = () => {
    setGenerating(true);
    setCourses(null);

    const nomsUniques = [...new Set(
      plan.flatMap(j => j.repas
        .filter(r => r.type !== "resto" && !r.estReste)
        .map(r => r.nom)
      )
    )];

    const tousIngredients = nomsUniques
      .map(n => pool.find(r => r.nom === n))
      .filter(Boolean)
      .flatMap(r => r.ingredients);

    // Règles de rayon par mots-clés
    const rayonsConfig = [
      { nom: "🥦 Fruits & Légumes", mots: ["carotte","courgette","poireau","épinard","kale","roquette","betterave","champignon","oignon","ail","gingembre","citron","concombre","tomate","butternut","potimarron","brocoli","pomme","clémentine","salade","laitue","herbe","basilic","coriandre","persil","thym","romarin","ciboulette"] },
      { nom: "🧀 Frais / Réfrigéré", mots: ["œuf","feta","chèvre","parmesan","gruyère","comté","ricotta","crème","beurre","tofu","miso","lait","yaourt","coleslaw","houmous"] },
      { nom: "❄️ Surgelés / Végé", mots: ["falafel","escalope végé","steak haché végé","beyond","herta","like meat","garden gourmet"] },
      { nom: "🥫 Épicerie sèche", mots: ["lentille","riz","pâte","quinoa","spaghetti","penne","fusilli","boîte","conserve","lait de coco","bouillon","sauce soja","hoisin","kecap","tahini","pesto","tomate concassée","pois chiche","nori","vinaigre","miel","sésame","noix","graine"] },
      { nom: "🌿 Épices & Condiments", mots: ["cumin","curcuma","curry","paprika","piment","garam","sel","poivre","cannelle","sambal","huile"] },
      { nom: "🍞 Boulangerie & Autres", mots: ["wrap","baguette","pain","vin blanc"] },
    ];

    // Consolidation + packaging
    const packagingRules = {
      "falafel": { quantite: "1 sachet Herta" },
      "wrap": { quantite: "1 paquet (6 wraps)" },
      "escalope": { quantite: "1-2 paquets (2-3 par paquet)" },
      "œuf": { quantite: "1 boîte de 6" },
    };

    // Dédupliquer les ingrédients
    const vus = new Set();
    const ingredientsUniques = tousIngredients.filter(ing => {
      const cle = ing.toLowerCase().replace(/[^a-zàâäéèêëîïôöùûüç]/g, " ").trim().split(" ")[0];
      if (vus.has(cle)) return false;
      vus.add(cle);
      return true;
    });

    // Classer par rayon
    const rayons = rayonsConfig.map(rayon => ({
      nom: rayon.nom,
      items: ingredientsUniques
        .filter(ing => rayon.mots.some(mot => ing.toLowerCase().includes(mot)))
        .map(ing => {
          const motPkg = Object.keys(packagingRules).find(m => ing.toLowerCase().includes(m));
          return {
            nom: ing.split(",")[0].split("(")[0].trim(),
            quantite: motPkg ? packagingRules[motPkg].quantite : ""
          };
        })
    }));

    // Épices : ignorer si déjà en cuisine (juste marquer "au placard")
    const result = { rayons };
    setCourses(result);
    setGenerating(false);
  };

  const navBtn = (v, label) => (
    <button key={v} onClick={() => { setView(v); setSelected(null); setSwapping(null); }} style={{
      padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13,
      background: view === v ? "#f5f0e8" : "transparent",
      color: view === v ? "#1a1a1a" : "#a8a090", transition: "all 0.2s"
    }}>{label}</button>
  );

  if (loading) return (
    <div style={{ fontFamily: "Georgia, serif", minHeight: "100vh", background: "#fafaf7", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "#bbb" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🍽</div>
        <p style={{ fontSize: 13 }}>Chargement…</p>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "Georgia, serif", minHeight: "100vh", background: "#fafaf7", color: "#1a1a1a" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "#1a1a1a", color: "#f5f0e8", padding: "28px 24px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#a8a090", marginBottom: 6 }}>
          {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })} · Toutes saisons
        </div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 400 }}>Mes Recettes Maison</h1>
        <p style={{ margin: "6px 0 0", color: "#a8a090", fontSize: 12 }}>Protéiné · Végétal · Rassasiant · Abdos friendly</p>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
          {navBtn("plan", "Plan semaine")}
          {navBtn("recettes", `Recettes (${pool.length})`)}
          {navBtn("courses", "🛒 Courses")}
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "20px 16px" }}>

        {/* ── PLAN SEMAINE ── */}
        {view === "plan" && !swapping && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <p style={{ color: "#bbb", fontSize: 11, margin: 0 }}>🔄 changer un repas · clique pour la recette</p>
              <button onClick={() => { setPlan(genererPlan()); setCourses(null); }} style={{ background: "#1a1a1a", color: "#f5f0e8", border: "none", borderRadius: 20, padding: "8px 16px", fontSize: 12, cursor: "pointer" }}>
                ✨ Nouveau plan
              </button>
            </div>
            {plan.map(({ jour, repas }, ji) => (
              <div key={jour} style={{ marginBottom: 13, background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ background: "#1a1a1a", color: "#f5f0e8", padding: "9px 18px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>{jour}</div>
                {repas.map((r, ri) => {
                  const tc = r.estReste ? { bg: "#f0f0f0", text: "#888", label: "🔁 Restes" } : (TC[r.type] || TC.rapide);
                  const recette = r.estReste ? pool.find(x => x.nom === r.recetteOrigine) : pool.find(x => x.nom === r.nom);
                  return (
                    <div key={ri} style={{ display: "flex", alignItems: "center", padding: "11px 18px", borderBottom: ri === 0 ? "1px solid #f0ede8" : "none" }}>
                      <div style={{ flex: 1, cursor: recette ? "pointer" : "default" }} onClick={() => recette && setSelected(recette)}>
                        <div style={{ fontSize: 10, color: "#ccc", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{r.moment}</div>
                        <div style={{ fontSize: 14, color: r.estReste ? "#999" : "#1a1a1a" }}>{r.nom}</div>
                        {r.dessert && <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>+ {r.dessert}</div>}
                        {r.cal && <div style={{ fontSize: 10, color: "#ccc", marginTop: 1 }}>{r.cal} kcal · {r.prot}g prot.</div>}
                      </div>
                      <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0, marginLeft: 10 }}>
                        <span style={{ background: tc.bg, color: tc.text, padding: "3px 8px", borderRadius: 20, fontSize: 10, whiteSpace: "nowrap" }}>{tc.label}</span>
                        {r.temps !== "—" && <span style={{ fontSize: 10, color: "#ddd" }}>{r.temps}</span>}
                        {r.type !== "resto" && !r.estReste && (
                          <button onClick={() => setSwapping({ ji, ri })} style={{ background: "none", border: "1px solid #e8e5e0", borderRadius: 20, cursor: "pointer", fontSize: 12, padding: "2px 7px", color: "#ccc" }}>🔄</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* ── SWAP PICKER ── */}
        {view === "plan" && swapping && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <button onClick={() => setSwapping(null)} style={{ background: "none", border: "none", color: "#bbb", cursor: "pointer", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, padding: 0 }}>← Annuler</button>
              <span style={{ fontSize: 13, color: "#666" }}>Choisir un nouveau repas</span>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {["tous", "rapide", "élaboré"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 13px", borderRadius: 20, border: "1px solid #e0ddd8", cursor: "pointer", fontSize: 11, background: filter === f ? "#1a1a1a" : "#fff", color: filter === f ? "#f5f0e8" : "#666" }}>
                  {f === "tous" ? "Toutes" : f === "rapide" ? "⚡ Rapides" : "👨‍🍳 Élaborées"}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {pool.filter(r => filter === "tous" || r.type === filter).map((r, i) => (
                <div key={i} onClick={() => handleSwap(swapping.ji, swapping.ri, r)}
                  style={{ background: "#fff", borderRadius: 10, padding: "12px 16px", cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f5f5f0"}
                  onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13 }}>{r.nom}</div>
                      <div style={{ fontSize: 10, color: "#ccc", marginTop: 2 }}>{r.saison} · {r.cal} kcal · {r.prot}g prot. · {r.temps}</div>
                    </div>
                    <span style={{ background: TC[r.type].bg, color: TC[r.type].text, padding: "2px 8px", borderRadius: 20, fontSize: 10, flexShrink: 0, marginLeft: 8 }}>{TC[r.type].label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TOUTES LES RECETTES ── */}
        {view === "recettes" && !selected && (
          <div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 18 }}>
              {["tous", "rapide", "élaboré"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 16px", borderRadius: 20, border: "1px solid #e0ddd8", cursor: "pointer", fontSize: 12, background: filter === f ? "#1a1a1a" : "#fff", color: filter === f ? "#f5f0e8" : "#666" }}>
                  {f === "tous" ? "Toutes" : f === "rapide" ? "⚡ Rapides" : "👨‍🍳 Élaborées"}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filtered.map((r, i) => (
                <div key={i} onClick={() => setSelected(r)} style={{ background: "#fff", borderRadius: 12, padding: "14px 18px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "transform 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.09)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, marginBottom: 4 }}>{r.nom}</div>
                      <div style={{ fontSize: 10, color: "#ccc" }}>🌿 {r.saison} · {r.cal} kcal · {r.prot}g prot.</div>
                    </div>
                    <div style={{ display: "flex", gap: 5, alignItems: "center", marginLeft: 10, flexShrink: 0 }}>
                      <span style={{ background: TC[r.type].bg, color: TC[r.type].text, padding: "3px 8px", borderRadius: 20, fontSize: 10 }}>{TC[r.type].label}</span>
                      <span style={{ fontSize: 10, color: "#ddd" }}>{r.temps}</span>
                      <span style={{ fontSize: 15, color: "#e0ddd8" }}>›</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DÉTAIL RECETTE ── */}
        {(view === "recettes" || view === "plan") && selected && (
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <div style={{ background: "#1a1a1a", color: "#f5f0e8", padding: "18px 24px" }}>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#a8a090", cursor: "pointer", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", padding: 0, marginBottom: 10 }}>← Retour</button>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 400 }}>{selected.nom}</h2>
              <div style={{ display: "flex", gap: 9, marginTop: 10, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(255,255,255,0.1)", color: "#f5f0e8", padding: "3px 10px", borderRadius: 20, fontSize: 11 }}>{TC[selected.type].label}</span>
                <span style={{ color: "#a8a090", fontSize: 11 }}>⏱ {selected.temps}</span>
                <span style={{ color: "#a8a090", fontSize: 11 }}>🌿 {selected.saison}</span>
                <span style={{ color: "#a8a090", fontSize: 11 }}>🔥 {selected.cal} kcal</span>
                <span style={{ color: "#a8a090", fontSize: 11 }}>💪 {selected.prot}g prot.</span>
              </div>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <h3 style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#ccc", marginTop: 0 }}>Ingrédients</h3>
              <ul style={{ paddingLeft: 18, margin: "0 0 20px" }}>
                {selected.ingredients.map((ing, i) => <li key={i} style={{ fontSize: 14, color: "#444", marginBottom: 5 }}>{ing}</li>)}
              </ul>
              <h3 style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#ccc" }}>Préparation</h3>
              <ol style={{ paddingLeft: 18, margin: 0 }}>
                {selected.etapes.map((e, i) => <li key={i} style={{ fontSize: 14, color: "#333", marginBottom: 9, lineHeight: 1.6 }}>{e}</li>)}
              </ol>
            </div>
          </div>
        )}

        {/* ── COURSES ── */}
        {view === "courses" && (
          <div>
            {!courses && !generating && (
              <div style={{ textAlign: "center", padding: "48px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 14 }}>🛒</div>
                <p style={{ color: "#666", fontSize: 14, marginBottom: 6 }}>Basée sur ton plan actuel</p>
                <p style={{ color: "#bbb", fontSize: 12, marginBottom: 28 }}>
                  {plan.flatMap(j => j.repas.filter(r => r.type !== "resto")).length} repas maison · consolidés par rayon
                </p>
                <button onClick={genererCourses} style={{ background: "#1a1a1a", color: "#f5f0e8", border: "none", borderRadius: 24, padding: "13px 34px", fontSize: 15, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  Générer la liste de courses
                </button>
              </div>
            )}
            {generating && (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>⏳</div>
                <p style={{ color: "#bbb", fontSize: 13 }}>Génération en cours…</p>
              </div>
            )}
            {courses && !courses.error && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 400 }}>Liste de courses</h2>
                  <button onClick={() => setCourses(null)} style={{ background: "none", border: "1px solid #e0ddd8", borderRadius: 20, padding: "5px 13px", fontSize: 11, cursor: "pointer", color: "#aaa" }}>🔄 Régénérer</button>
                </div>
                {courses.rayons.filter(r => r.items && r.items.length > 0).map((rayon, i) => (
                  <div key={i} style={{ marginBottom: 13, background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                    <div style={{ background: "#f5f0e8", padding: "9px 18px", fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>{rayon.nom}</div>
                    {rayon.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "9px 18px", borderBottom: j < rayon.items.length - 1 ? "1px solid #f5f5f0" : "none", fontSize: 13 }}>
                        <span style={{ color: "#333" }}>{item.nom}</span>
                        <span style={{ color: "#bbb", fontSize: 12 }}>{item.quantite}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {courses && courses.error && (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#e74c3c", fontSize: 14 }}>
                Erreur lors de la génération.{" "}
                <button onClick={genererCourses} style={{ background: "none", border: "none", color: "#1a1a1a", cursor: "pointer", textDecoration: "underline" }}>Réessayer</button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
