import Private from '../../layout/Private';
import ProductsService from '../../services/ProductsService';

function Dashboard() {
  const loadProducts = async () => {
    const productsList = await ProductsService.listProducts();
    console.log(productsList);
  };
  loadProducts();
  return (
    <Private>
      <h1>Dashboard</h1>
    </Private>
  );
}

export default Dashboard;
