
const dpeEndpoint = "https://data.ademe.fr/data-fair/api/v1/datasets/dpe-france/lines/?select=classe_consommation_energie%2Cannee_construction%2Cgeo_adresse"
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
