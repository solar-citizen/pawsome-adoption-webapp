import type { ICatDetails } from '#src/lib';

export function getGridDetails(details: ICatDetails) {
  return [
    {
      label: 'Indoor/Outdoor',
      value: details.is_indoor_only ? 'Indoor Only' : 'Indoor and Outdoor',
    },
  ];
}
