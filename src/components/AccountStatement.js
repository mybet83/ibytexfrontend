// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import axios from "axios";

// const API = process.env.REACT_APP_API_URL;

// const AccountStatement = ({ user }) => {

//   const downloadStatement = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const [ordersRes, withdrawRes] = await Promise.all([
//         axios.get(`${API}/api/orders/my`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         axios.get(`${API}/api/withdrawal/my`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//       ]);

//       let orders = ordersRes.data || [];
//       let withdrawals = withdrawRes.data || [];

//       // ===== MONTH FILTER (Current Month) =====
//       const currentMonth = new Date().getMonth();
//       const currentYear = new Date().getFullYear();

//       orders = orders.filter(o => {
//         const d = new Date(o.createdAt);
//         return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
//       });

//       withdrawals = withdrawals.filter(w => {
//         const d = new Date(w.createdAt);
//         return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
//       });

//       const doc = new jsPDF();

//       // ===== HEADER BACKGROUND =====
//       doc.setFillColor(15, 20, 40);
//       doc.rect(0, 0, 210, 30, "F");

//       // ===== LOGO =====
//       const logo = "/logot.png";
//       doc.addImage(logo, "PNG", 14, 8, 25, 15);

//       doc.setTextColor(255, 215, 0);
//       doc.setFontSize(18);
//       doc.text("IBYTEX PAY", 45, 18);

//       doc.setFontSize(11);
//       doc.text("Official Monthly Account Statement", 140, 18);

//       doc.setTextColor(0);

//       // ===== USER INFO =====
//       doc.setFontSize(10);
//       doc.text(`Name: ${user?.name}`, 14, 40);
//       doc.text(`Email: ${user?.email}`, 14, 46);
//       doc.text(`Account ID: ${user?.accountId}`, 14, 52);
//       doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 58);

//       // ===== CALCULATIONS =====
//       let totalSell = 0;
//       let totalWithdraw = 0;

//       orders.forEach(o => totalSell += Number(o.totalINR || 0));
//       withdrawals.forEach(w => totalWithdraw += Number(w.amount || 0));

//       const netBalance = totalSell - totalWithdraw;

//       // ===== SUMMARY BOX =====
//       doc.setFillColor(240, 240, 240);
//       doc.rect(14, 65, 182, 25, "F");

//       doc.text(`Total Sell: ₹ ${totalSell}`, 20, 75);
//       doc.text(`Total Withdraw: ₹ ${totalWithdraw}`, 20, 82);
//       doc.text(`Net Balance: ₹ ${netBalance}`, 120, 78);

//       // ===== TABLE DATA =====
//       const tableData = [];

//       orders.forEach(o => {
//         tableData.push([
//           o._id || "TXN-" + Math.random().toString(36).substr(2, 6),
//           "SELL",
//           o.usdtAmount,
//           o.rate,
//           o.totalINR,
//           o.status,
//           new Date(o.createdAt).toLocaleString(),
//           o.adminNotes || "-"
//         ]);
//       });

//       withdrawals.forEach(w => {
//         tableData.push([
//           w._id || "TXN-" + Math.random().toString(36).substr(2, 6),
//           "WITHDRAW",
//           "-",
//           "-",
//           w.amount,
//           w.status,
//           new Date(w.createdAt).toLocaleString(),
//           w.adminUtrNumber || "-"
//         ]);
//       });

//       autoTable(doc, {
//         startY: 95,
//         head: [[
//           "Transaction ID",
//           "Type",
//           "USDT",
//           "Rate",
//           "Amount (₹)",
//           "Status",
//           "Date",
//           "Note / UTR"
//         ]],
//         body: tableData,
//         theme: "grid",
//         styles: {
//           fontSize: 8,
//           cellPadding: 3,
//         },
//         headStyles: {
//           fillColor: [15, 20, 40],
//           textColor: 255,
//         },
//         didParseCell: function (data) {
//           if (data.column.index === 5) {
//             if (data.cell.raw === "COMPLETED") {
//               data.cell.styles.textColor = [0, 128, 0];
//             }
//             if (data.cell.raw === "PENDING") {
//               data.cell.styles.textColor = [255, 140, 0];
//             }
//             if (data.cell.raw === "REJECTED") {
//               data.cell.styles.textColor = [255, 0, 0];
//             }
//           }
//         },
//         didDrawPage: function (data) {

//           // ===== WATERMARK =====
        

//           // ===== PAGE NUMBER =====
//           const pageCount = doc.internal.getNumberOfPages();
//           doc.setFontSize(9);
//           doc.setTextColor(100);
//           doc.text(
//             `Page ${data.pageNumber} of ${pageCount}`,
//             170,
//             290
//           );

//           // ===== DIGITAL STAMP =====
//           doc.setFontSize(10);
//           doc.setTextColor(150);
//           doc.text(
//             "Digitally Verified by IBYTEX PAY Exchange System",
//             14,
//             285
//           );
//         }
//       });

//       doc.save(`IBYTEX_Monthly_Statement_${user?.accountId}.pdf`);

//     } catch (err) {
//       alert("Failed to generate statement");
//     }
//   };

//   return (
//     <button
//       onClick={downloadStatement}
//       className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:scale-105 transition-all"
//     >
//       Download Account Statement
//     </button>
//   );
// };

// export default AccountStatement;

























import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API = process.env.REACT_APP_API_URL;

const AccountStatement = ({ user }) => {

  const [showModal, setShowModal] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const today = new Date();

  const registerDate = user?.createdAt
    ? new Date(user.createdAt)
    : new Date("2000-01-01");

  const downloadStatement = async () => {

    if (!fromDate || !toDate) {
      alert("Please select date range");
      return;
    }

    if (fromDate > toDate) {
      alert("Invalid date range");
      return;
    }

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

      // ===== DATE FILTER =====
      orders = orders.filter(o => {
        const d = new Date(o.createdAt);
        return d >= fromDate && d <= toDate;
      });

      withdrawals = withdrawals.filter(w => {
        const d = new Date(w.createdAt);
        return d >= fromDate && d <= toDate;
      });

      const doc = new jsPDF();

      // ================= HEADER =================
      doc.setFillColor(10, 20, 50);
      doc.rect(0, 0, 210, 35, "F");

      doc.addImage("/logot.png", "PNG", 14, 8, 20, 18);

      doc.setTextColor(255, 215, 0);
      doc.setFontSize(18);
      doc.text("IBYTEX EXCHANGE", 45, 20);

      doc.setFontSize(10);
      doc.text("Official Account Statement", 145, 20);

      // ================= USER DETAILS =================
      doc.setTextColor(0);
      doc.setFontSize(10);

      doc.text(`Name: ${user?.name}`, 14, 48);
      doc.text(`Email: ${user?.email}`, 14, 54);
      doc.text(`Account ID: ${user?.accountId}`, 14, 60);
      doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        14,
        66
      );
      doc.text(
        `Statement Period: ${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}`,
        14,
        72
      );

      // ================= CALCULATIONS =================
      let totalSell = 0;
      let totalWithdraw = 0;

      orders.forEach(o => totalSell += Number(o.totalINR || 0));
      withdrawals.forEach(w => totalWithdraw += Number(w.amount || 0));

      const netBalance = totalSell - totalWithdraw;

      // ================= SUMMARY BOX =================
      doc.setFillColor(235, 235, 235);
      doc.rect(14, 80, 182, 25, "F");

      doc.setFontSize(11);
      doc.text(`Total Sell: ₹ ${totalSell}`, 20, 94);
      doc.text(`Total Withdraw: ₹ ${totalWithdraw}`, 20, 101);
      doc.text(`Net Balance: ₹ ${netBalance}`, 130, 97);

      // ================= TABLE =================
      const tableData = [];

      orders.forEach(o => {
        tableData.push([
          o._id,
          "SELL",
          o.usdtAmount || "-",
          o.rate || "-",
          o.totalINR,
          o.status,
          new Date(o.createdAt).toLocaleString(),
          o.adminNotes || "-"
        ]);
      });

      withdrawals.forEach(w => {
        tableData.push([
          w._id,
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
        startY: 115,
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
          fillColor: [10, 20, 50],
          textColor: 255,
        },
        didParseCell: function (data) {
          if (data.column.index === 5) {
            if (data.cell.raw === "COMPLETED") {
              data.cell.styles.textColor = [0, 150, 0];
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
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(9);
          doc.setTextColor(120);

          doc.text(
            `Page ${data.pageNumber} of ${pageCount}`,
            170,
            290
          );

          doc.text(
            "Digitally Generated & Verified by IBYTEX Exchange System",
            14,
            290
          );
        }
      });

      doc.save(
        `IBYTEX_Statement_${fromDate.toISOString().split("T")[0]}_to_${toDate.toISOString().split("T")[0]}.pdf`
      );

      setShowModal(false);

    } catch (err) {
      alert("Failed to generate statement");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:scale-105 transition-all"
      >
        Download Account Statement
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-gradient-to-br from-[#0f172a] to-[#111827] p-8 rounded-2xl w-[420px] shadow-2xl border border-yellow-500/30">

            <h2 className="text-white text-xl font-semibold mb-6 text-center">
              Select Statement Period
            </h2>

            <div className="mb-5">
              <label className="text-gray-400 text-sm block mb-2">
                From Date
              </label>

              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                minDate={registerDate}
                maxDate={today}
                selectsStart
                startDate={fromDate}
                endDate={toDate}
                className="w-full p-3 rounded-lg bg-black text-white border border-gray-600"
                placeholderText="Select start date"
              />
            </div>

            <div className="mb-6">
              <label className="text-gray-400 text-sm block mb-2">
                To Date
              </label>

              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                minDate={fromDate || registerDate}
                maxDate={today}
                selectsEnd
                startDate={fromDate}
                endDate={toDate}
                className="w-full p-3 rounded-lg bg-black text-white border border-gray-600"
                placeholderText="Select end date"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-700 text-white"
              >
                Cancel
              </button>

              <button
                onClick={downloadStatement}
                className="px-5 py-2 rounded bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold"
              >
                Generate PDF
              </button>
            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default AccountStatement;