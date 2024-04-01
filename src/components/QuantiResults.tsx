import * as React from "react"
import Card from 'react-bootstrap/Card';
import Stack from "react-bootstrap/Stack";

type Option = {
  label: string;
  value: string;
}

type Props = {
  conso_annuelle_m2: number;
  dpe: string;
  minRevenue: number;
  surface: number;
  yearlyCost: number;
}


export default function QuantiResults({ conso_annuelle_m2, dpe, minRevenue, surface, yearlyCost }: Props) {

  const formattedMinRevenue = new Intl.NumberFormat(
    'fr-FR',
    { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }
  ).format(minRevenue);
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
      <Stack direction="horizontal" gap={2}>
        <Card border="warning" style={{ width: '18rem' }}>
          <Card.Header>Les revenus de votre foyer sont inférieurs à {formattedMinRevenue}</Card.Header>
          <Card.Body>
            <Card.Title>Vous êtes probablement en précarité énergétique</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card border="info" style={{ width: '18rem' }}>
          <Card.Header>Les revenus de votre foyer sont supérieurs à {formattedMinRevenue}</Card.Header>
          <Card.Body>
            <Card.Title>Vous n'êtes probablement pas en précarité énergétique</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Stack>
    </Stack>
  )
}

