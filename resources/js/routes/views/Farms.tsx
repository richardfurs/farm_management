import { useState, useEffect } from 'react';
import { useLoaderData, useRevalidator, useNavigate } from "react-router";
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import ModalForm from '@/components/ModalForm';
import { PaginationData, Method, Field } from '@/Types';
import AsyncFetch from '@/utils/AsyncFetch';

interface Farm {
  id: number;
  email: string | null;
  name: string;
  website: string | null;
}

const Farms = () => {
  const { farms } = useLoaderData();
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  const [records, setRecords] = useState(farms.data as Farm[]);

  const [paginationData, setPaginationData] = useState({
    current_page: farms.current_page,
    last_page: farms.last_page
  } as PaginationData);

  const [isVisible, setIsVisible] = useState(false);

  const columns = ['Id', 'Name', 'Email', 'Website'];
  const [modalTitle, setModalTitle] = useState('');

  const [formData, setFormData] = useState<Farm | null>(null);

  const [modalMethod, setModalMethod] = useState<Method>('post');
  const [apiUrl, setApiUrl] = useState('');
  const [isDestroy, setIsDestroy] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const updatePagination = async (page: number, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (page <= paginationData.last_page && page >= 1) {
      const response = await AsyncFetch(`${import.meta.env.VITE_DEV_BASE_URL}/api/farms?page=${page}`);

      if (response.ok) {
        const newFarms = await response.json();
        setRecords(newFarms.data)
        setPaginationData({
          current_page: newFarms.current_page,
          last_page: newFarms.last_page
        })
        navigate(`?page=${page}`, { replace: true });
      } else {
        console.error('Get pagination data failed')
      }
    }
  };

  useEffect(() => {
    setRecords(farms.data);
    setPaginationData({
      current_page: farms.current_page,
      last_page: farms.last_page,
    });
  }, [farms]);

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

  const revalidate = () => {
    toggleModal();
    revalidator.revalidate();
    if (isCreate) navigate(`?page=${paginationData.last_page}`, { replace: true });
  }

  const createRecord = () => {
    setModalMethod('post');
    setModalTitle('Create Farm');
    setIsDestroy(false);
    setFormData(null);
    toggleModal();
    setApiUrl('api/farms/store');
    setIsCreate(true);
  }

  const editRecord = (record: Farm) => {
    setModalTitle('Edit Farm');
    setModalMethod('patch');
    setFormData(record);
    setIsDestroy(false);
    setApiUrl(`api/farms/update/${record.id}`);
    toggleModal();
  }

  const deleteRecord = (record: Farm) => {
    setModalTitle('Delete Farm?');
    setModalMethod('delete');
    setIsDestroy(true);
    setApiUrl(`api/farms/delete/${record.id}`);
    toggleModal();
  }

  const fields: Field[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'website', label: 'Website', type: 'text' },
  ];

  return (
    <>
      <div className="mt-4 flex justify-end text-xs lg:text-sm">
        <button onClick={createRecord} className="cursor-pointer bg-black text-white max-w-fit px-4 py-2 rounded-full self-center">Create farm</button>
      </div>

      <Table columns={columns} records={records} editRecord={editRecord} deleteRecord={deleteRecord}/>

      <Pagination pagination={paginationData} onPageChange={updatePagination}/>

      {isVisible && <ModalForm 
        values={formData} 
        afterSubmit={revalidate}
        fields={fields}
        apiUrl={apiUrl}
        method={modalMethod}
        url='/farms'
        title={modalTitle}
        isDestroy={isDestroy}
        hideModal={toggleModal}/>}
    </>
  );
};

export default Farms;