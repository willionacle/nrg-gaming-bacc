import Table from './table';
import { socket } from '@/lib/client';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TablePage = () => {
  const { id } = useParams();

  useEffect(() => {
    socket.emit('joinTableAsPlayer', id);
  }, [id]);

  return <Table />;
};

export default TablePage;
