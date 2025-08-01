import type { IDogDetails } from '#src/lib';

export function getGridDetails(details: IDogDetails) {
  return [
    { label: 'Energy Level', value: details.energy_level },
    { label: 'Training Level', value: details.training_level },
    ...(details.exercise_needs_minutes
      ? [
          {
            label: 'Exercise Needs',
            value: `${details.exercise_needs_minutes} minutes`,
            fullWidth: true,
          },
        ]
      : []),
  ];
}
