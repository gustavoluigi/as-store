/* eslint-disable no-sequences */
import {
  Document, Page, Text, View, StyleSheet, PDFViewer,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import OrdersService from '../../services/OrdersService';
import formatDate from '../../utils/formatDate';
import formatPrice from '../../utils/formatPrice';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  pageTitle: {
    fontSize: 16,
    fontWeight: 100,
    marginBottom: '20px',
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  tableHead: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },
  tableRows: {
    display: 'flex',
    flexDirection: 'row',
    // height: 30,
    // alignItems: 'center',
  },
  th: {
    fontSize: '9px',
    flex: '1',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    height: '100%',
    backgroundColor: 'rgb(243, 244, 246)',
  },
  thId: {
    fontSize: '9px',
    flex: '0 0 20px',
    padding: 5,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgb(243, 244, 246)',
  },
  td: {
    fontSize: '9px',
    flex: '1',
    padding: 5,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tdId: {
    flex: '0 0 20px',
    fontSize: '9px',
    padding: 5,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

function CreatePDF() {
  const [orders, setOrders] = useState();
  const tableHeads = ['ID', 'Data', 'Qt. Produtos', 'Subtotal', 'Desconto', 'Total', 'Pagamento', 'Cliente'];

  const loadOrders = async () => {
    const ordersList = await OrdersService.listOrdersWithCustomer();

    const filteredOrdersList = ordersList.map((i) => ({
      id: i.id,
      date: formatDate(i.date),
      qt_products: i.qt_products,
      subtotal: formatPrice(i.subtotal),
      discount: `${i.discount}%`,
      total: formatPrice(i.total),
      transaction: i.transaction,
      name: i.customer.name,
    }));
    setOrders(filteredOrdersList);
  };

  useEffect(() => {
    loadOrders();
  }, []);
  return (
    <PDFViewer style={{ width: '100vw', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={[styles.pageTitle, { fontWeight: 'bolder' }]}>Vendas</Text>
            <View style={styles.tableHead}>
              {tableHeads
                && tableHeads.map((item) => (
                  <Text style={item === 'ID' ? styles.thId : styles.th} key={item}>
                    {item}
                  </Text>
                ))}
            </View>

            {orders
                && orders.map((item) => (
                  <View key={item.id} style={styles.tableRows}>
                    {Object.entries(item).map(([key, value]) => (
                      <Text key={`${key}-${value}`} style={key === 'id' ? styles.tdId : styles.td}>
                        {value}
                      </Text>
                    ))}
                  </View>
                ))}

          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default CreatePDF;
