import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import * as searchServices from '~/services/searchService';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import AccountItem from '../../../components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setsearchResult] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  const handleClear = () => {
    setSearchValue('');
    setsearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setshowResult(false);
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setsearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchServices.search(debouncedValue);
      setsearchResult(result);

      setLoading(false);
    };

    fetchApi();
  }, [debouncedValue]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  return (
    // using <div> wrapper to prevent Tippy warning
    <div>
      <HeadlessTippy
        interactive={true}
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {searchResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search accounts and videos"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setshowResult(true)}
          />
          {loading ? (
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
          ) : (
            !!searchValue && (
              <button className={cx('clear')} onClick={handleClear}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )
          )}

          <button
            className={cx('search-btn')}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
