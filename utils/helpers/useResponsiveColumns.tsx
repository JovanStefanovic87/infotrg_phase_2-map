import { useState, useEffect } from 'react';

const useResponsiveColumns = (initialColumns: number = 1) => {
  const [columns, setColumns] = useState<number>(initialColumns);

  const updateColumns = () => {
    const width = window.innerWidth;
    let newColumns;
    if (width >= 1280) {
      newColumns = 3;
    } else if (width >= 1024) {
      newColumns = 2;
    } else if (width >= 768) {
      newColumns = 2;
    } else {
      newColumns = 1;
    }

    setColumns((prevColumns) => (prevColumns !== newColumns ? newColumns : prevColumns));
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return columns;
};

export default useResponsiveColumns;
