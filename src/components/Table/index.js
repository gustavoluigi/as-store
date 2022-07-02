/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  TableStyled,
  Tr,
  TdWithImage,
  Th,
  WrapperTable,
  Pagination,
  Checkbox,
} from './styles';
import Input from '../Form/Input';
import { formatPrice } from '../../utils';
import SearchBox from '../SerachBox';

function Table({
  tableHeads,
  tableRows,
  handleClick,
  hasSearch,
  searchField,
  hasSelection,
  handleSelect,
  qtEditable,
  updateQt,
}) {
  const [filteredTableRows, setFilteredTableRows] = useState(tableRows);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredTableRows(tableRows);
    } else {
      setFilteredTableRows(tableRows.filter((item) => item[searchField]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())));
    }
  };

  useEffect(() => {
    setFilteredTableRows(tableRows);
  }, [tableRows]);
  return (
    <>
      <SearchBox />
      {hasSearch && (

        <div className="my-2 flex sm:flex-row flex-col">
          <div className="block relative">
            <Input
              label="Pesquisar"
              className="h-10"
              onChange={(event) => handleSearch(event.target.value)}
            />
          </div>
        </div>
      )}

      <WrapperTable>
        <div>
          <TableStyled>
            <thead>
              <tr>
                {hasSelection && (
                  <Th className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </Th>
                )}
                {tableHeads && tableHeads.map((item) => <Th key={item}>{item}</Th>)}
              </tr>
            </thead>
            <tbody>
              {/* <TdWithImage>
                  <div>
                    <div className="box-img">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                        alt=""
                      />
                    </div>
                    <div className="box-text">
                      <p>Vera Carpenter</p>
                    </div>
                  </div>
                </TdWithImage> */}
              {filteredTableRows
                && filteredTableRows.map((item) => (
                  <Tr
                    key={item.id ? item.id : item}
                    hide={!!item.id}
                    onClick={() => handleClick(item.id)}
                  >
                    {hasSelection && (
                      <Checkbox>
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            checked={item.checked}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(event) => handleSelect(item.id, event.target.checked)}
                          />
                          <label htmlFor="checkbox-table-search-1" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </Checkbox>
                    )}
                    {item
                      && Object.entries(item).map(([key, value]) => {
                        if (key !== 'checked') {
                          if (qtEditable && key === 'quantity') {
                            return (
                              <td key={`${key}-${value}`}>
                                <input
                                  min="1"
                                  type="number"
                                  className="form-control
                                  block
                                  px-3
                                  w-24
                                  py-1.5
                                  text-base
                                  text-gray-700
                                  bg-white bg-clip-padding
                                  border border-solid border-gray-300
                                  rounded
                                  transition
                                  ease-in-out
                                  m-0
                                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  value={value}
                                  onChange={(event) => updateQt(item.id, event.target.value)}
                                />
                              </td>
                            );
                          }
                          return (
                            <td key={`${key}-${value}`}>
                              <p>
                                {key === 'price' || key === 'total' || key === 'subtotal' ? formatPrice(value) : value}
                              </p>
                            </td>
                          );
                        }
                      })}
                  </Tr>
                ))}
            </tbody>
          </TableStyled>
          {filteredTableRows && filteredTableRows.length > 10 && (
            <Pagination>
              <span>
                Mostrando 1 a 4 de
                {' '}
                {filteredTableRows && filteredTableRows.length}
                {' '}
                registros
              </span>
              <div>
                <button type="button">Anterior</button>
                <button type="button">Próxima</button>
              </div>
            </Pagination>
          )}
        </div>
      </WrapperTable>
    </>
  );
}

export default Table;

Table.propTypes = {
  tableHeads: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableRows: PropTypes.arrayOf(PropTypes.any),
  handleClick: PropTypes.func,
  handleSelect: PropTypes.func,
  hasSearch: PropTypes.bool,
  searchField: PropTypes.string,
  hasSelection: PropTypes.bool,
  qtEditable: PropTypes.bool,
  updateQt: PropTypes.func,
};

Table.defaultProps = {
  tableRows: null,
  handleClick: () => {},
  handleSelect: () => {},
  hasSearch: false,
  searchField: 'name',
  hasSelection: false,
  qtEditable: false,
  updateQt: () => {},
};
