import type { IFarmAnimalsDetails } from '#src/lib';

export function getGridDetails(details: IFarmAnimalsDetails) {
  return [
    { label: 'Primary Purpose', value: details.primary_purpose },
    { label: 'Housing Requirements', value: details.housing_requirements },
    { label: 'Pasture Size Needed', value: details.pasture_size_needed },
    { label: 'Special Care Needs', value: details.special_care_needs },
  ];
}
