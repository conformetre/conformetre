const DPE_IDS = ["A", "B", "C", "D", "E", "F", "G"] as const;
type DpeId = typeof DPE_IDS[number];

export const consommations_m2_by_dpe: Record<DpeId, number> = {
    A: 50,
    B: 75,
    C: 150,
    D: 200,
    E: 250,
    F: 350,
    G: 421
};