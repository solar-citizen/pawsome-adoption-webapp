import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DetailGrid,
  FeatureTags,
} from '#src/components/atoms';
import type { IDogDetails } from '#src/lib';

import { features } from './features';
import { getGridDetails } from './gridDetails';

function DogDetails({ details }: { details: IDogDetails }) {
  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle />
      </CardHeader>
      <CardContent>
        <DetailGrid items={getGridDetails(details)} className='mb-4' />
        <FeatureTags features={features} data={details} title='Features' />
      </CardContent>
    </Card>
  );
}

export default DogDetails;
