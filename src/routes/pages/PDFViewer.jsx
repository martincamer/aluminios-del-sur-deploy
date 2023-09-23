import { PdfPerfil } from '../../components/PdfPerfil';
import { PDFViewer } from '@react-pdf/renderer';

export const PDFViewerT = ({ perfilId }) => {
	return (
		<PDFViewer style={{ width: '100%', height: '100vh' }}>
			<PdfPerfil perfil={perfilId} />
		</PDFViewer>
	);
};
