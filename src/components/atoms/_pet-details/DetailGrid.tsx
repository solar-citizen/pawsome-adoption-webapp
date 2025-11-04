import { startCase } from 'lodash-es';

type DetailGridProps = {
  items: Array<{
    label: string;
    value: string | number;
    fullWidth?: boolean;
  }>;
  className?: string;
};

function DetailGrid({ items, className = '' }: DetailGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {items.map(item => (
        <div key={`${item.label}-${item.value}`} className={item.fullWidth ? 'md:col-span-2' : ''}>
          <label className='text-gray-600 font-medium'>{startCase(item.label)}</label>
          <p className='text-gray-700'>{startCase(item.value.toString())}</p>
        </div>
      ))}
    </div>
  );
}

export default DetailGrid;
