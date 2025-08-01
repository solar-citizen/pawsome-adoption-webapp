import type { IHorseDetails } from '#src/lib';

export function getGridDetails(details: IHorseDetails) {
  return [
    { label: 'Height', value: details.height_hands },
    { label: 'Weight', value: details.weight_lbs },
    { label: 'Riding Level', value: details.riding_level },
    { label: 'Discipline', value: details.discipline },
    { label: 'Temperament', value: details.temperament },
  ];
}
