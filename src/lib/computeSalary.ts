import { consommations_m2_by_dpe } from "./dpe";
import type { EstimatedResults } from "../lib/";


const elecPrice: number = 0.25
const threshold_tee: number = 0.08


export type EconmicResults = {
    minRevenue: number;
    yearlyCost: number;
}

export function computeSalary(result: EstimatedResults): EconmicResults {
    const yearlyCost: number = consommations_m2_by_dpe[result.dpe] * result.surface * elecPrice
    return {
        minRevenue: result.surface / threshold_tee,
        yearlyCost: yearlyCost
    }
}