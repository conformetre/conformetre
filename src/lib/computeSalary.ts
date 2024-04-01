import { EstimatedResults } from "../lib/";

const elecPrice: number = 0.25

const consommations_m2: { [key: string]: number } = {};
consommations_m2['A'] = 50
consommations_m2['B'] = 75
consommations_m2['C'] = 150
consommations_m2['D'] = 200
consommations_m2['E'] = 250
consommations_m2['F'] = 350
consommations_m2['G'] = 421

const threshold_tee: number = 0.08

export type EconmicResults = {
    minRevenue: number;
    yearlyCost: number;
}

export function computeSalary(result: EstimatedResults): EconmicResults {
    const yearlyCost: number = consommations_m2[result.dpe] * result.surface * elecPrice
    return {
        minRevenue: result.surface / threshold_tee,
        yearlyCost: yearlyCost
    }
}

