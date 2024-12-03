import React from 'react';

interface ArrayRendererProps {
  items: any[];
  onItemClick: (item: any) => void;
  renderItem?: (item: any) => React.ReactNode;
}

export const ArrayRenderer: React.FC<ArrayRendererProps> = ({
  items,
  onItemClick,
  renderItem,
}) => {
  if (!Array.isArray(items) || items.length === 0) {
    return <span>-</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={index}
          onClick={() => onItemClick(item)}
          className="inline-flex items-center px-8 py-1 rounded-xl text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:text-gray-600 hover:bg-gray-300"
        >
          {renderItem ? renderItem(item) : item}
        </span>
      ))}
    </div>
  );
};
