import type { DpeId } from "./dpe";

const dpeEndpoint = "https://data.ademe.fr/data-fair/api/v1/datasets/dpe-v2-logements-existants/lines?select=N%C2%B0DPE%2CEtiquette_GES%2CEtiquette_DPE%2CAnn%C3%A9e_construction%2CNom__commune_(BAN)%2CN%C2%B0_voie_(BAN)%2CNom__rue_(BAN)%2CConso_5_usages%2Fm%C2%B2_%C3%A9_finale%2CSurface_habitable_logement%2CCompl%C3%A9ment_d%27adresse_logement"
const adressEnpoint = "https://api-adresse.data.gouv.fr/search/";

type EnrichedAddress = { lon: number, lat: number, street: string, houseNumber: string };

export async function searchDPE(address: string) {
    try {
        const enrichedAddress = await searchAddress(address);
        return await getDPE(enrichedAddress);
    } catch (error) {
        console.log("error", error);
        return [];
    }
}

async function searchAddress(address: string): Promise<EnrichedAddress> {
    const searchParams = new URLSearchParams({
        q: address
    });
    const url = `${adressEnpoint}?${searchParams.toString()}`;
    const response = await (await fetch(url)).json();
    const firstMatch = response.features[0];
    return {
        lon: firstMatch.geometry.coordinates[0],
        lat: firstMatch.geometry.coordinates[1],
        street: firstMatch.properties.street,
        houseNumber: firstMatch.properties.housenumber
    }
}

export type EstimatedResults = {
    id: string;
    surface: number;
    conso_annuelle_m2: number;
    dpe: DpeId;
    ges: string;
    annee_construction: string;
    num_address: string;
    nom_rue: string;
    commune: string;
    complement_address: string;
};

async function getDPE({ lon, lat, street, houseNumber }: EnrichedAddress): Promise<EstimatedResults[] | null> {
    const coord = `${lon}:${lat}`;
    const url = `${dpeEndpoint}&geo_distance=${encodeURIComponent(coord)},50`;
    const response = await (await fetch(url)).json();
    const matchedAddresses = response.results.filter(r => r['Nom__rue_(BAN)'] === street && r['N°_voie_(BAN)'] === houseNumber);
    if (!matchedAddresses.length) return Promise.reject(`DPE not found`);
    return matchedAddresses.map(address => ({
        id: address['N°DPE'],
        surface: address['Surface_habitable_logement'],
        conso_annuelle_m2: address['Conso_5_usages/m²_é_finale'],
        dpe: address['Etiquette_DPE'],
        ges: address['Etiquette_GES'],
        annee_construction: address['Année_construction'],
        num_address: address['N°_voie_(BAN)'],
        nom_rue: address['Nom__rue_(BAN)'],
        commune: address['Nom__commune_(BAN)'],
        complement_address: address[`Complément_d'adresse_logement`]
    }))
}
