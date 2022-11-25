import React from 'react';
import * as S from './PaginationStyles';

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <S.Nav>
      <S.Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </S.Button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <S.Button
            // eslint-disable-next-line react/no-array-index-key
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : null}
          >
            {i + 1}
          </S.Button>
        ))}
      <S.Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </S.Button>
    </S.Nav>
  );
}

export default Pagination;
