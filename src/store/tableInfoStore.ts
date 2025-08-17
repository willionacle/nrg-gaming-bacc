import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TableData } from '@/types';

type TableInfoState = {
  tableInfo: TableData | null;
  setTableInfo: (info: TableData) => void;
  clearTableInfo: () => void;
};

const tableInfoStore = create<TableInfoState>()(
  persist(
    (set) => ({
      tableInfo: null,
      setTableInfo: (info) => set({ tableInfo: info }),
      clearTableInfo: () => set({ tableInfo: null }),
    }),
    {
      name: 'table-info-store',
    }
  )
);

export default tableInfoStore;
