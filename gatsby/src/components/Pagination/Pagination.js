import { Link } from 'gatsby';
import React from 'react';
import { PaginationStyles } from './Pagination.styles';

const Pagination = ({ pageSize, totalCount, currentPage, skip, base }) => {
   // make some vars
   const totalPages = Math.ceil(totalCount / pageSize);
   const prevPage = currentPage - 1;
   const nextPage = currentPage + 1;
   const hasNextPage = nextPage <= totalPages;
   const hasPrevPage = prevPage >= 1;
   return (
      <PaginationStyles>
         <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
            &#x2190; Prev
         </Link>
         {Array.from({ length: totalPages }).map((_, i) => (
            <Link
               className={currentPage === 1 && i === 0 ? 'current' : ''}
               to={`${base}/${i > 0 ? i + 1 : ''}`}
               key={i}
            >
               {i + 1}
            </Link>
         ))}
         <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
            Next &#x2192;
         </Link>
      </PaginationStyles>
   );
};
export default Pagination;
