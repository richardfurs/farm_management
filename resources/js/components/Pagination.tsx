import { PaginationData } from '@/Types';

interface PaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number, event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const {
    current_page,
    last_page,
  } = pagination;

  const pages = [];
  const diff = last_page - current_page;
  const pageOffset = 6;
  let startPage = (diff < pageOffset) ? last_page - pageOffset : Math.max(current_page - 3, 1);
  let endPage = startPage + pageOffset;
  
  if (startPage < 1) {
    startPage = 1;
    endPage = last_page;
  }

  for(let i = startPage; i <= endPage; i++) {
    if (i === current_page) {
      pages.push(
        <li key={i}>
          <a href="javascript:void(0)" className="flex items-center justify-center px-3 h-8 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white">{i}</a>
        </li>
      )
    } else {
      pages.push(
        <li key={i}>
          <a onClick={(event: React.MouseEvent<HTMLAnchorElement>) => onPageChange(i, event)} href="javascript:void(0)" className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-black dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i}</a>
        </li>
      )
    };
  }

  return (
    <nav className="flex justify-center mt-12">
      <ul className="inline-flex -space-x-px text-sm lg:text-base">
        <li>
          <a onClick={(event: React.MouseEvent<HTMLAnchorElement>) => onPageChange(current_page - 1, event)} href="javascript:void(0)" className="flex items-center justify-center px-3 h-8 ms-0 text-gray-500 bg-white rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-black dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Prev</a>
        </li>

        {pages}

        <li>
          <a onClick={(event: React.MouseEvent<HTMLAnchorElement>) => onPageChange(current_page + 1, event)} href="javascript:void(0)" className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-black dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;