import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Map from './Map';
import * as S from './Styles';

function Maps() {
  const [value, setValue] = useState('');
  const [keyword, setKeyword] = useState('');

  // * 검색 입력값 onChange 이벤트핸들러
  const onChange = (e) => {
    setValue(e.target.value);
  };

  // * 지도검색버튼 클릭시 이벤트핸들러
  const handleSearchInput = (e) => {
    e.preventDefault();
    if (value === '') return alert('검색할 장소를 입력하세요');
    setKeyword(value);
    return setValue('');
    // 재사용하는 컴포넌트임으로 함수가 조건에 따라 다르게 동작해야 함.
    // method === 'alert'일 경우 가까운 보호소 찾기 오청 실행
    // method === 'adopt'일 경우 입양 가능한 센터 찾기 요청 실행
  };
  return (
    <S.NearCenterLayout>
      <S.SectionTitle>드라이브 코스 찾기</S.SectionTitle>
      <S.SearchInputWrapper>
        <S.InputDescBox>
          <FaMapMarkerAlt />
        </S.InputDescBox>
        <S.SearchForm>
          <S.SearchInput
            type="text"
            onChange={onChange}
            name="place"
            placeholder="OO시"
            required
          />
          <S.SearchBtn type="button" onClick={handleSearchInput} value="검색">
            찾기
          </S.SearchBtn>
        </S.SearchForm>
      </S.SearchInputWrapper>
      <Map keyword={keyword} />
    </S.NearCenterLayout>
  );
}

export default Maps;
