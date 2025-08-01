import { Badge } from '#src/components/atoms';
import { PetDetailsData } from '#src/lib';

type FeatureTagsProps<T extends PetDetailsData> = {
  features: readonly {
    key: keyof T;
    label: string;
  }[];
  data: T;
  title?: string;
  representation?: 'badges' | 'text';
  className?: string;
};

function FeatureTags<T extends PetDetailsData>({
  features,
  data,
  title = 'Features',
  representation = 'badges',
  className = '',
}: FeatureTagsProps<T>) {
  const activeTags = features.filter(feature => data[feature.key]).map(feature => feature.label);

  if (activeTags.length === 0) return null;

  return (
    <div className={className}>
      <label className='text-gray-600 font-medium block mb-2'>{title}</label>

      {representation === 'badges' ? (
        <div className='flex flex-wrap gap-2'>
          {activeTags.map((tag, index) => (
            <Badge key={index} variant='random'>
              {tag}
            </Badge>
          ))}
        </div>
      ) : (
        <p className='text-gray-700'>{activeTags.join(', ')}</p>
      )}
    </div>
  );
}

export default FeatureTags;
