export type WeaponCategory = "simple" | "martial";

export type Weapon = {
    name: string;
    category: WeaponCategory;
    damage: string;
    ability: "strength" | "dexterity";
};

export const weapons: Weapon[] = [
    { name: "None", category: "simple", damage: "-", ability: "strength" },

  // Simple
  { name: "Club", category: "simple", damage: "1d4", ability: "strength" },
  { name: "Dagger", category: "simple", damage: "1d4", ability: "dexterity" },
  { name: "Quarterstaff", category: "simple", damage: "1d6", ability: "strength" },
  { name: "Light Crossbow", category: "simple", damage: "1d8", ability: "dexterity" },

  // Martial
  { name: "Longsword", category: "martial", damage: "1d8", ability: "strength" },
  { name: "Rapier", category: "martial", damage: "1d8", ability: "dexterity" },
  { name: "Greatsword", category: "martial", damage: "2d6", ability: "strength" },
  { name: "Longbow", category: "martial", damage: "1d8", ability: "dexterity" },
];