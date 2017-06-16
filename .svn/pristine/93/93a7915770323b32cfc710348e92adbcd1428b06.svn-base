package com.ut.scf.core.util;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.itextpdf.text.BadElementException;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfImportedPage;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * pdf相关操作类，填pdf模板
 * 
 * @author liwd
 *
 */
public class PDFUtil {

	/**
	 * 填pdf 模板
	 * 
	 * @param templetPath
	 *            模板路径 包含文件名
	 * 
	 * @param toPath
	 *            输出的pdf文件 包含文件名
	 * 
	 * 
	 * 
	 * @param param
	 *            填入的key 和 value key表示pdf的文本域名 value表示要填入的值
	 *
	 *            融资承诺函：
	 * 
	 *            financeNo:编号 agencyName:经销商名称 money:融资金额 year：年 month：月 day：日
	 * 
	 *            付款承诺函：
	 * 
	 *            payNo：付款承诺函编号 agencyName：经销商名称 yearPay monthPay dayPay 付款年月日
	 *            money:付款金额 BLContractNo：保理合同编号 carFileNo：车辆信息文件编号 year month
	 *            day ：年月日
	 * 
	 *            订单合同： NO：编号 money1:融资金额 money2：保证金 date：日期
	 * @return
	 * @throws Exception
	 */

	public static void exportToPDF(String templetPath, String toPath,
			Map<String, String> param) throws Exception {

		PdfReader reader = new PdfReader(templetPath); // 模版文件目录
		PdfStamper ps = new PdfStamper(reader, new FileOutputStream(toPath)); // 生成的输出流
		AcroFields s = ps.getAcroFields();
		for (String str : param.keySet()) {
			s.setField(str, param.get(str));
		}
		ps.setFormFlattening(true);
		ps.close();
		reader.close();
	}

	// 写入表格
	public static void exportTableToPDF(String toPath, String path,
			PdfPTable table) throws Exception {
		PdfReader reader = new PdfReader(toPath); // 模版文件目录
		int n = reader.getNumberOfPages();
		// PdfStamper ps = new PdfStamper(reader, new FileOutputStream(path));
		// // 生成的输出流
		BaseFont baseFont = BaseFont.createFont("STSong-Light",
				BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		Font font = new Font(baseFont, 30);

		Document document = new Document(PageSize.A3);
		PdfWriter writer = PdfWriter.getInstance(document,
				new FileOutputStream(path));
		document.open();
		for (int i = 0; i < n; i++) {
			PdfImportedPage page = writer.getImportedPage(reader, n);
			Image image = Image.getInstance(page);
			document.add(image);
		}
		// PdfPTable table = setTable(title, cellNames, map);

		document.add(table);

		document.close();

	}

	/***
	 * 生成表格
	 * 
	 * @param title
	 *            标题
	 * @param cellNames
	 *            列名
	 * @param fieldName
	 *            绑定的字段
	 * @param map
	 *            数据
	 * 
	 * 
	 * @param rowSpan
	 *            需要合并的列 根据第一个列来合并
	 * ****/

	public static PdfPTable setTable(String title, List<String> cellNames,
			List<String> fieldName, List<Map<String, Object>> map,
			List<String> rowSpan) throws BadElementException {
		PdfPTable table = new PdfPTable(cellNames.size());
		PdfPCell cell = new PdfPCell(new Phrase(title, setFont(Font.BOLD)));
		cell.setColspan(cellNames.size());
		cell.setBorder(0);
		cell.setVerticalAlignment(Element.ALIGN_CENTER);// 居中
		table.addCell(cell);
		for (String cellName : cellNames) {
			table.addCell(new Paragraph(cellName, setFont(Font.NORMAL)));
		}
		Map<String, List<PdfPCell>> parentMap = new LinkedHashMap<String, List<PdfPCell>>();
		for (Map<String, Object> tempMap : map) {
			List<PdfPCell> list = new ArrayList<PdfPCell>();
			for (int i = 0; i < fieldName.size(); i++) {
				PdfPCell tempCell = new PdfPCell(new Paragraph(
						tempMap.get(fieldName.get(i)) + "",
						setFont(Font.NORMAL)));
				if (rowSpan != null && rowSpan.size() > 0) {
					// rowspan 不为空时根据 第一个 字段合并需要合并的单元格
					String key = tempMap.get(rowSpan.get(0)) + "";
					if (rowSpan.contains(fieldName.get(i))
							&& parentMap.containsKey(key)) {
						List<PdfPCell> cells = parentMap.get(key);
						PdfPCell cell2 = cells.get(i);
						cell2.setRowspan(cell2.getRowspan() + 1);
						continue;
					}
				}
				list.add(tempCell);
			}
			// 合并单元格标识
			String str = tempMap.get(fieldName.get(0)) + "";
			if (parentMap.containsKey(str)) {
				str = ScfUUID.getCount() + "";
			}
			parentMap.put(str, list);
		}
		for (String key : parentMap.keySet()) {
			for (PdfPCell tempCell : parentMap.get(key)) {
				table.addCell(tempCell);
			}
		}
		return table;

	}

	/**
	 * 设置字体编码格式
	 * 
	 * @return
	 */
	public static Font setFont(int weight) {
		BaseFont baseFont = null;
		try {
			baseFont = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H",
					BaseFont.NOT_EMBEDDED);
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		Font font = new Font(baseFont, 16, weight);
		return font;
	}
}
