import { writeFile, PDFDocument } from 'react-native-pdf-lib';  // Correct PDF handling

const downloadReport = async () => {
  const reportData = {
    graphData: selectedGraphData,
    date: new Date().toISOString(),
  };

  try {
    const pdf = await PDFDocument.create();  // Create a new PDF document
    const page = pdf.addPage();  // Add a page to the document

    // Add content to the PDF page (text, graphics, etc.)
    page.drawText('Report', { x: 20, y: 800, fontSize: 24 });
    page.drawText(`Date: ${reportData.date}`, { x: 20, y: 760, fontSize: 16 });
    page.drawText('Graph Data:', { x: 20, y: 720, fontSize: 16 });
    page.drawText(JSON.stringify(reportData.graphData, null, 2), { x: 20, y: 680, fontSize: 14 });

    // Save the document as a PDF
    const pdfPath = `${FileSystem.documentDirectory}report.pdf`;  // Use a .pdf extension
    await pdf.writeToFile(pdfPath);

    Alert.alert('Success', `Report downloaded successfully as PDF at ${pdfPath}`, [{ text: 'OK' }]);
    console.log('PDF saved at:', pdfPath);
  } catch (error) {
    Alert.alert('Error', 'Failed to download report as PDF. Please try again.', [{ text: 'OK' }]);
    console.error('Download failed:', error);
  }
};
