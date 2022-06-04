/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {
  TableStyled, Tr, TdWithImage, Th, WrapperTable, Pagination,
} from './styles';

import formatPrice from '../../utils/formatPrice';

function Table({
  tableHeads, tableRows, handleClick, hasSearch, hasSelection, handleSelect, qtEditable, updateQt,
}) {
  return (
    <>
      {hasSearch && (
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
              </svg>
            </span>
            <input
              placeholder="Search"
              className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
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
              {tableRows
                && tableRows.map((item) => (
                  <Tr key={item.id ? item.id : item} onClick={() => handleClick(item.id)}>
                    {hasSelection && (
                      <td className="w-4 p-4">
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
                      </td>
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
                              <p>{key === 'price' || key === 'total' || key === 'subtotal' ? formatPrice(value) : value}</p>
                            </td>
                          );
                        }
                      })}
                  </Tr>
                ))}
            </tbody>
          </TableStyled>
          {tableRows && tableRows.length > 10 && (
            <Pagination>
              <span>
                Mostrando 1 a 4 de
                {' '}
                {tableRows && tableRows.length}
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
  hasSelection: PropTypes.bool,
  qtEditable: PropTypes.bool,
  updateQt: PropTypes.func,
};

Table.defaultProps = {
  tableRows: null,
  handleClick: () => {},
  handleSelect: () => {},
  hasSearch: false,
  hasSelection: false,
  qtEditable: false,
  updateQt: () => {},
};
