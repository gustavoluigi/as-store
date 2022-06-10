import { PDFDownloadLink } from '@react-pdf/renderer';
import { Wrapper } from '../../components/Layout/Wrapper';
import PageTitle from '../../components/PageTitle';
import Private from '../../layout/Private';
import CreatePDF from './CreatePDF';

function Reports() {
  return (
    <Private>
      <PageTitle>Relatórios</PageTitle>
      <Wrapper>
        <PDFDownloadLink document={<CreatePDF />} fileName="FileName">
          <button type="button"> Download </button>
        </PDFDownloadLink>
      </Wrapper>
    </Private>
  );
}

export default Reports;
