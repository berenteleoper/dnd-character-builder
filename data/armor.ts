export type ArmorCategory = "none" | "light" | "medium" | "heavy";

export type Armor = {
  name: string;
  category: ArmorCategory;
  baseAc: number;
  dexModifier: "full" | "max2" | "none";
};

export const armors: Armor[] = [
  {
    name: "None",
    category: "none",
    baseAc: 10,
    dexModifier: "full",
  },
  {
    name: "Leather",
    category: "light",
    baseAc: 11,
    dexModifier: "full",
  },
  {
    name: "Studded Leather",
    category: "light",
    baseAc: 12,
    dexModifier: "full",
  },
  {
    name: "Hide",
    category: "medium",
    baseAc: 12,
    dexModifier: "max2",
  },
  {
    name: "Chain Shirt",
    category: "medium",
    baseAc: 13,
    dexModifier: "max2",
  },
  {
    name: "Scale Mail",
    category: "medium",
    baseAc: 14,
    dexModifier: "max2",
  },
  {
    name: "Breastplate",
    category: "medium",
    baseAc: 14,
    dexModifier: "max2",
  },
  {
    name: "Half Plate",
    category: "medium",
    baseAc: 15,
    dexModifier: "max2",
  },
  {
    name: "Ring Mail",
    category: "heavy",
    baseAc: 14,
    dexModifier: "none",
  },
  {
    name: "Chain Mail",
    category: "heavy",
    baseAc: 16,
    dexModifier: "none",
  },
  {
    name: "Splint",
    category: "heavy",
    baseAc: 17,
    dexModifier: "none",
  },
  {
    name: "Plate",
    category: "heavy",
    baseAc: 18,
    dexModifier: "none",
  },
];