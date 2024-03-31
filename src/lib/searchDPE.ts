
const dpeEndpoint = "https://data.ademe.fr/data-fair/api/v1/datasets/dpe-v2-logements-existants/lines?select=N%C2%B0DPE%2CEtiquette_GES%2CEtiquette_DPE%2CAnn%C3%A9e_construction%2CNom__commune_(BAN)%2CN%C2%B0_voie_(BAN)%2CNom__rue_(BAN)%2CConso_5_usages%2Fm%C2%B2_%C3%A9_finale%2CSurface_habitable_logement"
const adressEnpoint = "https://api-adresse.data.gouv.fr/search/";

type Coord = { lon: number, lat: number };

export async function searchDPE(address: string) {
    const coord = await getCoord(address)
    getDPE(coord)
}

async function getCoord(address: string): Promise<Coord> {
    const url = `${adressEnpoint}?q=${encodeURIComponent(address)}`;
    const response = await (await fetch(url)).json();
    return {
        lon: response.features[0].geometry.coordinates[0],
        lat: response.features[0].geometry.coordinates[1]
    }
}

async function getDPE({ lon, lat }: Coord) {
    const coord = `${lon}:${lat}`;
    const url = `${dpeEndpoint}&geo_distance=${encodeURIComponent(coord)},50`;
    console.log(url)
    const response = await (await fetch(url)).json();
    return {
        classe_consommation_energie: response.results[0].classe_consommation_energie,
        geo_adresse: response.results[0].geo_adresse,
        annee_construction: response.results[0].annee_construction
    }
}
