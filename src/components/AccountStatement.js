import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const AccountStatement = ({ user }) => {

  const downloadStatement = async () => {
    const token = localStorage.getItem("token");

    try {
      const [ordersRes, withdrawRes] = await Promise.all([
        axios.get(`${API}/api/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API}/api/withdrawal/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      let orders = ordersRes.data || [];
      let withdrawals = withdrawRes.data || [];

      // ===== MONTH FILTER (Current Month) =====
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      orders = orders.filter(o => {
        const d = new Date(o.createdAt);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });

      withdrawals = withdrawals.filter(w => {
        const d = new Date(w.createdAt);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });

      const doc = new jsPDF();

      // ===== HEADER BACKGROUND =====
      doc.setFillColor(15, 20, 40);
      doc.rect(0, 0, 210, 30, "F");

      // ===== LOGO =====
      const logo = "/logot.png";
      doc.addImage(logo, "PNG", 14, 8, 25, 15);

      doc.setTextColor(255, 215, 0);
      doc.setFontSize(18);
      doc.text("IBYTEX PAY", 45, 18);

      doc.setFontSize(11);
      doc.text("Official Monthly Account Statement", 140, 18);

      doc.setTextColor(0);

      // ===== USER INFO =====
      doc.setFontSize(10);
      doc.text(`Name: ${user?.name}`, 14, 40);
      doc.text(`Email: ${user?.email}`, 14, 46);
      doc.text(`Account ID: ${user?.accountId}`, 14, 52);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 58);

      // ===== CALCULATIONS =====
      let totalSell = 0;
      let totalWithdraw = 0;

      orders.forEach(o => totalSell += Number(o.totalINR || 0));
      withdrawals.forEach(w => totalWithdraw += Number(w.amount || 0));

      const netBalance = totalSell - totalWithdraw;

      // ===== SUMMARY BOX =====
      doc.setFillColor(240, 240, 240);
      doc.rect(14, 65, 182, 25, "F");

      doc.text(`Total Sell: ₹ ${totalSell}`, 20, 75);
      doc.text(`Total Withdraw: ₹ ${totalWithdraw}`, 20, 82);
      doc.text(`Net Balance: ₹ ${netBalance}`, 120, 78);

      // ===== TABLE DATA =====
      const tableData = [];

      orders.forEach(o => {
        tableData.push([
          o._id || "TXN-" + Math.random().toString(36).substr(2, 6),
          "SELL",
          o.usdtAmount,
          o.rate,
          o.totalINR,
          o.status,
          new Date(o.createdAt).toLocaleString(),
          o.adminNotes || "-"
        ]);
      });

      withdrawals.forEach(w => {
        tableData.push([
          w._id || "TXN-" + Math.random().toString(36).substr(2, 6),
          "WITHDRAW",
          "-",
          "-",
          w.amount,
          w.status,
          new Date(w.createdAt).toLocaleString(),
          w.adminUtrNumber || "-"
        ]);
      });

      autoTable(doc, {
        startY: 95,
        head: [[
          "Transaction ID",
          "Type",
          "USDT",
          "Rate",
          "Amount (₹)",
          "Status",
          "Date",
          "Note / UTR"
        ]],
        body: tableData,
        theme: "grid",
        styles: {
          fontSize: 8,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [15, 20, 40],
          textColor: 255,
        },
        didParseCell: function (data) {
          if (data.column.index === 5) {
            if (data.cell.raw === "COMPLETED") {
              data.cell.styles.textColor = [0, 128, 0];
            }
            if (data.cell.raw === "PENDING") {
              data.cell.styles.textColor = [255, 140, 0];
            }
            if (data.cell.raw === "REJECTED") {
              data.cell.styles.textColor = [255, 0, 0];
            }
          }
        },
        didDrawPage: function (data) {

          // ===== WATERMARK =====
        

          // ===== PAGE NUMBER =====
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(9);
          doc.setTextColor(100);
          doc.text(
            `Page ${data.pageNumber} of ${pageCount}`,
            170,
            290
          );

          // ===== DIGITAL STAMP =====
          doc.setFontSize(10);
          doc.setTextColor(150);
          doc.text(
            "Digitally Verified by IBYTEX PAY Exchange System",
            14,
            285
          );
        }
      });

      doc.save(`IBYTEX_Monthly_Statement_${user?.accountId}.pdf`);

    } catch (err) {
      alert("Failed to generate statement");
    }
  };

  return (
    <button
      onClick={downloadStatement}
      className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:scale-105 transition-all"
    >
      Download Account Statement
    </button>
  );
};

export default AccountStatement;
