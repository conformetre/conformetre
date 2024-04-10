import * as React from "react"
import Card from 'react-bootstrap/Card';
import Stack from "react-bootstrap/Stack";
import ExternalResources from "./ExternalResources";

type Option = {
  label: string;
  value: string;
}

type Props = {
  conso_annuelle_m2: number;
  dpe: string;
  surface: number;
  yearlyCost: number;
  yearlyMinRevenue: number;
}


export default function QuantiResults({ conso_annuelle_m2, dpe, surface, yearlyCost, yearlyMinRevenue }: Props) {

  const formattedMinRevenue = new Intl.NumberFormat(
    'fr-FR',
    { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }
  ).format(yearlyMinRevenue/12);
  const formattedYearlyConso = new Intl.NumberFormat(
    'fr-FR',
    { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }
  ).format(yearlyCost);

  return (
    <Stack gap={4}>
      <div>
        Votre DPE ({dpe}) correspond à une consommation estimée de {conso_annuelle_m2} kW/h par an et m².
        Votre logement a une surface de {surface} m².
        Cela correspond à un coût annuel de {formattedYearlyConso}.
      </div>
      <Stack direction="horizontal" gap={2} style={{ justifyContent: "center" }}>
        <Card border="warning" style={{ width: '18rem' }}>
          <Card.Header>Les revenus mensuels de votre foyer sont <b>inférieurs à {formattedMinRevenue}</b></Card.Header>
          <Card.Body>
            <Card.Title>Vous êtes probablement en précarité énergétique</Card.Title>
            <Card.Text>
              Vous êtes dans une situation anormale, vous pouvez être accompagné·e sur ce sujet.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card border="info" style={{ width: '18rem' }}>
          <Card.Header>Les revenus mensuels de votre foyer sont <b>supérieurs à {formattedMinRevenue}</b></Card.Header>
          <Card.Body>
            <Card.Title>Vous n'êtes probablement pas en précarité énergétique</Card.Title>
            <Card.Text>
              Votre situation énergétique est bonne, vous pouvez trouver des conseils pour aller plus loin.
            </Card.Text>
          </Card.Body>
        </Card>
      </Stack>
      <ExternalResources/>
    </Stack>
  )
}

