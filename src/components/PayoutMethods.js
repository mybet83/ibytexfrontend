import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = process.env.REACT_APP_API_URL;

const PayoutMethods = () => {
  const [methods, setMethods] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [type, setType] = useState("BANK");

  const [form, setForm] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
    upiId: "",
  });

  const token = localStorage.getItem("token");

  const fetchMethods = async () => {
    try {
      const res = await axios.get(`${API}/api/payout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMethods(res.data);
    } catch {
      toast.error("Failed to load payout methods");
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const resetForm = () => {
    setForm({
      accountHolderName: "",
      accountNumber: "",
      ifsc: "",
      bankName: "",
      upiId: "",
    });
    setEditId(null);
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`${API}/api/payout/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Updated successfully ✅");
      } else {
        await axios.post(
          `${API}/api/payout`,
          { ...form, type },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Added successfully ✅");
      }

      setOpen(false);
      resetForm();
      fetchMethods();
    } catch {
      toast.error("Something went wrong ❌");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/api/payout/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Deleted 🗑");
    fetchMethods();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setType(item.type);
    setForm(item);
    setOpen(true);
  };

  const maskAccount = (number) => {
    if (!number) return "";
    return "XXXXXX" + number.slice(-4);
  };

return (
  <div className="space-y-10 max-md:space-y-5">

    {/* ================= HEADER ================= */}
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-[#0f172a] to-[#111827] p-8 flex justify-between items-center shadow-xl max-md:p-3">

      <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-white tracking-tight max-md:text-2xl">
          Payout Methods
        </h1>
        <p className="text-gray-400 text-sm mt-2 max-md:text-[12px] max-md:w-[80%]">
          Securely manage your bank accounts & UPI IDs
        </p>
      </div>

      <button
        onClick={() => {
          resetForm();
          setOpen(true);
        }}
        className="relative z-10 px-6 py-3 rounded-xl 
       bg-gold-gradient text-black
        hover:scale-105 transition-all duration-300
        shadow-lg font-semibold max-md:text-[12px] max-md:px-3 max-md:py-2"
      >
        + Add New Account
      </button>
    </div>

    {/* ================= EMPTY STATE ================= */}
    {methods.length === 0 && (
      <div className="bg-[#111827]/70 backdrop-blur-xl border border-gray-800 rounded-3xl p-16 text-center relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>

        <div className="relative z-10">
          <div className="text-5xl mb-6">🏦</div>
          <p className="text-gray-400 mb-6 text-lg max-md:text-[14px]">
            No payout methods added yet
          </p>
          <button
            onClick={() => setOpen(true)}
            className="px-8 py-3 rounded-xl bg-gold-gradient text-black  font-semibold hover:scale-105 transition-all duration-300"
          >
            Add First Method
          </button>
        </div>
      </div>
    )}

    {/* ================= LIST ================= */}
    <div className="grid md:grid-cols-2 gap-8 max-md:gap-5">
      {methods.map((item) => (
        <div
          key={item._id}
          className="group relative overflow-hidden rounded-xl 
          border border-white/10 
          bg-gradient-to-br from-[#111827]/90 to-[#0f172a]/90
          backdrop-blur-xl p-8
          transition-all duration-500
          hover:-translate-y-2
          hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] max-md:p-3"
        >

          {/* Glow Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition duration-500"></div>

          <div className="relative z-10 flex justify-between items-start">

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">
                {item.type === "BANK" ? "Bank Account" : "UPI ID"}
              </p>

              {item.type === "BANK" ? (
                <>
                  <p className="text-lg font-semibold mt-2 text-white max-md:text-[14px]">
                    {item.bankName}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {maskAccount(item.accountNumber)}
                  </p>
                </>
              ) : (
                <p className="text-lg font-semibold mt-2 text-white max-md:text-[14px]">
                  {item.upiId}
                </p>
              )}
            </div>

            <div className="flex gap-4 text-sm">
              <button
                onClick={() => handleEdit(item)}
                className="text-yellow-400 hover:text-yellow-300 transition"
              >
                ✏ Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:text-red-400 transition"
              >
                🗑 Delete
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>

    {/* ================= MODAL ================= */}
    {open && (
      <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50">

        <div className="relative bg-gradient-to-br from-[#0f172a] to-[#111827]
        w-[450px] p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6">

          <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editId ? "Edit" : "Add"} Payout Method
              </h2>

              <button
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            {/* TYPE SWITCH */}
            <div className="flex gap-4 mb-6">
              {["BANK", "UPI"].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300
                  ${
                    type === t
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "bg-[#111827] border border-gray-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* FORM */}
            {type === "BANK" && (
              <div className="space-y-4">
                <Input placeholder="Account Holder Name" value={form.accountHolderName} onChange={(v)=>setForm({...form,accountHolderName:v})}/>
                <Input placeholder="Account Number" value={form.accountNumber} onChange={(v)=>setForm({...form,accountNumber:v})}/>
                <Input placeholder="IFSC Code" value={form.ifsc} onChange={(v)=>setForm({...form,ifsc:v})}/>
                <Input placeholder="Bank Name" value={form.bankName} onChange={(v)=>setForm({...form,bankName:v})}/>
              </div>
            )}

            {type === "UPI" && (
              <Input placeholder="UPI ID" value={form.upiId} onChange={(v)=>setForm({...form,upiId:v})}/>
            )}

            <button
              onClick={handleSubmit}
              className="w-full mt-6 py-3 rounded-xl 
              bg-gradient-to-r from-cyan-500 to-blue-500
              hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
            >
              {editId ? "Update Method" : "Add Method"}
            </button>

          </div>
        </div>
      </div>
    )}

  </div>
);
};

const Input = ({ placeholder, value, onChange }) => (
  <input
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-gray-700 focus:border-cyan-500 outline-none transition"
  />
);

export default PayoutMethods;
