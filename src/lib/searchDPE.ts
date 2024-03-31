
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
        surface: response.results[0]['Surface_habitable_logement'],
        conso_annuelle_m2: response.results[0]['Conso_5_usages/m²_é_finale'],
        dpe: response.results[0]['Etiquette_DPE'],
        ges: response.results[0]['Etiquette_GES'],
        annee_construction: response.results[0]['Année_construction'],
        num_addresse: response.results[0]['N°_voie_(BAN)'],
        nom_rue: response.results[0]['Nom__rue_(BAN)'],
        commune: response.results[0]['Nom__commune_(BAN)'],
    }
}
