import { useState, useEffect } from 'react';
import { useLoaderData, useRevalidator, useNavigate } from "react-router";
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import ModalForm from '@/components/ModalForm';
import { PaginationData, Method, Field } from '@/Types';
import AsyncFetch from '@/utils/AsyncFetch';

interface Farm {
  id: number;
  name: string;
}

interface Animal {
  id: number;
  number: number;
  species: string;
  age: string | null;
  farm: Farm;
}

const Animals = () => {
  const { response } = useLoaderData();
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  const [records, setRecords] = useState(response.animals.data as Animal[]);

  const [paginationData, setPaginationData] = useState({
    current_page: response.animals.meta.current_page,
    last_page: response.animals.meta.last_page
  } as PaginationData);

  const [isVisible, setIsVisible] = useState(false);

  const columns = ['Id', 'Animal number', 'Species', 'Age', 'Farm'];
  const [modalTitle, setModalTitle] = useState('');

  const [formData, setFormData] = useState<Animal | null>(null);

  const [modalMethod, setModalMethod] = useState<Method>('post');
  const [apiUrl, setApiUrl] = useState('');
  const [isDestroy, setIsDestroy] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [farms, setFarms] = useState(response.farms);

  const updatePagination = async (page: number, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (page <= paginationData.last_page && page >= 1) {
      const response = await AsyncFetch(`${import.meta.env.VITE_DEV_BASE_URL}/api/animals?page=${page}`);

      if (response.ok) {
        const newAnimals = await response.json();
        setRecords(newAnimals.animals.data)
        setPaginationData({
          current_page: newAnimals.animals.meta.current_page,
          last_page: newAnimals.animals.meta.last_page
        })
        navigate(`?page=${page}`, { replace: true });
      } else {
        console.error('Get pagination data failed')
      }
    }
  };

  useEffect(() => {
    setRecords(response.animals.data);
    setPaginationData({
      current_page: response.animals.meta.current_page,
      last_page: response.animals.meta.last_page,
    });
  }, [response]);

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
    setModalTitle('Create Animal');
    setIsDestroy(false);
    setFormData(null);
    toggleModal();
    setApiUrl('api/animals/store');
    setIsCreate(true);
  }

  const editRecord = (record: Animal) => {
    console.log('record', record)
    setModalTitle('Edit Animal');
    setModalMethod('patch');
    setFormData(record);
    setIsDestroy(false);
    setApiUrl(`api/animals/update/${record.id}`);
    toggleModal();
  }

  const deleteRecord = (record: Animal) => {
    setModalTitle('Delete Animal?');
    setModalMethod('delete');
    setIsDestroy(true);
    setApiUrl(`api/animals/delete/${record.id}`);
    toggleModal();
  }

  const fields: Field[] = [
    { name: 'number', label: 'Animal number', type: 'text' },
    { name: 'species', label: 'Species', type: 'text' },
    { name: 'age', label: 'Age', type: 'text' },
    { name: 'farm', label: 'Farm', options: farms, type: 'select' },
  ];

  return (
    <>
      <div className="mt-4 flex justify-end text-xs lg:text-sm">
        <button onClick={createRecord} className="cursor-pointer bg-black text-white max-w-fit px-4 py-2 rounded-full self-center">Create animal</button>
      </div>

      <Table 
        columns={columns} 
        records={records} 
        editRecord={editRecord} 
        deleteRecord={deleteRecord} 
        renderCell={(_record, key, value) => {
          if (key === 'farm' && value && typeof value === 'object') {
            return (value as { name?: string }).name ?? 'N/A';
          }
          return value;
        }}
        
      />

      <Pagination pagination={paginationData} onPageChange={updatePagination}/>

      {isVisible && <ModalForm 
        values={formData} 
        afterSubmit={revalidate}
        fields={fields}
        apiUrl={apiUrl}
        method={modalMethod}
        url='/animals'
        title={modalTitle}
        isDestroy={isDestroy}
        hideModal={toggleModal}/>}
    </>
  );
};

export default Animals;