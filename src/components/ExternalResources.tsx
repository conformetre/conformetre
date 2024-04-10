import * as React from "react"
import Alert from "react-bootstrap/Alert";


export default function ExternalResources() {
    return (
        <Alert variant="info">
            <Alert.Heading>Voici quelques ressources pour agir</Alert.Heading>
            <ul>
                <li>
                    <a href="https://onpe.org/dispositifs_daide/tout_savoir_sur_les_aides_financieres_pour_prevenir_et_traiter_la_precarite">
                        Les différentes aides financières liés à la précarité énergétique
                    </a>
                </li>
                <li>
                    Service dédié de la ville de Grenoble : <a href="tel:04 76 69 46 26">04 76 69 46 26</a> ou <a href="mailto:pf.energie@ccas-grenoble.fr">pf.energie@ccas-grenoble.fr</a>
                </li>
                <li>
                    <a href="https://www.anil.org/lanil-et-les-adil/votre-adil/">
                        Info logement dans votre département
                    </a>
                </li>
                <li>
                    <a href="https://france-renov.gouv.fr/">
                        Site national de la rénovation énergétique
                    </a>
                </li>
                <li>
                    <a href="https://www.adil38.org/sortir-du-mal-logement-en-isere/">
                        Info logement pour l'Isère
                    </a>
                </li>
            </ul>
        </Alert>
  )
}
