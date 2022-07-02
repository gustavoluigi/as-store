import React from 'react';
import Input from '../Form/Input';

function SearchBox() {
  return (
  // <div className="block">
    <Input
      label="Pesquisar"
      id="searchTerm"
      name="searchTerm"
      type="text"
      className="h-10"
    />
  // </div>
  );
}

export default SearchBox;
