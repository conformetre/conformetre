import { consommations_m2_by_dpe } from "./dpe";
import type { EstimatedResults } from "../lib/";


const elecPrice = 0.25;
const threshold_tee = 0.08;


export type EconmicResults = {
    minRevenue: number;
    yearlyCost: number;
};


// we should return Math.min(yearlyCost / threshold_tee, thirdDecileRevenue)
// But revenu are by person and here we're looking at the home revenue
// We don't know how many occupants there are
export function computeSalary(result: Pick<EstimatedResults, "dpe" | "surface">): EconmicResults {
    const yearlyCost = consommations_m2_by_dpe[result.dpe] * result.surface * elecPrice;
    return {
        minRevenue: yearlyCost / threshold_tee,
        yearlyCost: yearlyCost
    };
}