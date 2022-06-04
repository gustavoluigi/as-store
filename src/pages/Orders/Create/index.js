/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import PageTitle from '../../../components/PageTitle';
import Private from '../../../layout/Private';

function CreateOrder() {
  return (
    <Private>
      <PageTitle>Create order</PageTitle>
      <div className="relative">
        <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">First Name</label>
        <input type="text" className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black" placeholder="John" />
      </div>
    </Private>
  );
}

export default CreateOrder;
