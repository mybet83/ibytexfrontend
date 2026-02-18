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
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Payout Methods</h1>
          <p className="text-gray-400 text-sm">
            Manage your bank accounts and UPI IDs
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition"
        >
          + Add New Account
        </button>
      </div>

      {/* EMPTY STATE */}
      {methods.length === 0 && (
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-12 text-center">
          <p className="text-gray-400 mb-4">
            No payout methods added yet
          </p>
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-2 bg-cyan-500 rounded-lg"
          >
            Add First Method
          </button>
        </div>
      )}

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-6">
        {methods.map((item) => (
          <div
            key={item._id}
            className="bg-gradient-to-br from-[#111827] to-[#0f172a] border border-gray-800 rounded-2xl p-6 hover:scale-[1.02] transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">
                  {item.type === "BANK" ? "Bank Account" : "UPI ID"}
                </p>

                {item.type === "BANK" ? (
                  <>
                    <p className="font-semibold mt-1">
                      {item.bankName}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {maskAccount(item.accountNumber)}
                    </p>
                  </>
                ) : (
                  <p className="font-semibold mt-1">
                    {item.upiId}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-400"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0f172a] w-[420px] p-8 rounded-2xl border border-gray-800 space-y-6">

            <div className="flex justify-between">
            <h2 className="text-xl font-bold">
              {editId ? "Edit" : "Add"} Payout Method
            </h2>
                 <button
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="flex-1  rounded-lg"
              >
               X
              </button>
            </div>
            {/* TYPE SWITCH */}
            <div className="flex gap-3">
              <button
                onClick={() => setType("BANK")}
                className={`flex-1 py-2 rounded-lg transition ${
                  type === "BANK"
                    ? "bg-cyan-500"
                    : "bg-[#111827] border border-gray-700"
                }`}
              >
                Bank
              </button>
              <button
                onClick={() => setType("UPI")}
                className={`flex-1 py-2 rounded-lg transition ${
                  type === "UPI"
                    ? "bg-cyan-500"
                    : "bg-[#111827] border border-gray-700"
                }`}
              >
                UPI
              </button>
            </div>

            {/* FORM */}
            {type === "BANK" && (
              <div className="space-y-4">
                <Input
                  placeholder="Account Holder Name"
                  value={form.accountHolderName}
                  onChange={(v) =>
                    setForm({ ...form, accountHolderName: v })
                  }
                />
                <Input
                  placeholder="Account Number"
                  value={form.accountNumber}
                  onChange={(v) =>
                    setForm({ ...form, accountNumber: v })
                  }
                />
                <Input
                  placeholder="IFSC Code"
                  value={form.ifsc}
                  onChange={(v) =>
                    setForm({ ...form, ifsc: v })
                  }
                />
                <Input
                  placeholder="Bank Name"
                  value={form.bankName}
                  onChange={(v) =>
                    setForm({ ...form, bankName: v })
                  }
                />
              </div>
            )}

            {type === "UPI" && (
              <Input
                placeholder="UPI ID"
                value={form.upiId}
                onChange={(v) =>
                  setForm({ ...form, upiId: v })
                }
              />
              
             
            )}

            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition font-semibold"
            >
              {editId ? "Update Method" : "Add Method"}
            </button>
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
