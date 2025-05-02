import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { customerContacs } from "../atoms";

type Contact = {
  name: string;
  address: string;
  phone: string;
};

function Contacts() {
  const contacts = useRecoilValue(customerContacs);
  const setContacts = useSetRecoilState(customerContacs);
  const navigate = useNavigate();

  const defaultForm = { name: "", address: "", phone: "" };
  const [form, setForm] = useState<Contact>(defaultForm);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...contacts];
      updated[editIndex] = form;
      setContacts(updated);
    } else {
      setContacts([...contacts, form]);
    }

    setForm(defaultForm);
    setEditIndex(null);
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    setForm(contacts[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Contacts</h2>
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Search"
          className="border rounded p-2 flex-grow"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setShowForm(true);
            setForm(defaultForm);
            setEditIndex(null);
          }}
        >
          + New Contact
        </button>
      </div>

      {showForm && (
        <div className="mb-6 border rounded p-4 bg-gray-50">
          <h3 className="text-md font-medium mb-2">
            {editIndex !== null ? "Edit Contact" : "New Contact"}
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input
              className="border p-2 rounded"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => {
                setForm(defaultForm);
                setEditIndex(null);
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="w-full border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Edit</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, i) => (
            <tr key={i}>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.address}</td>
              <td className="p-2 border">{c.phone}</td>
              <td
                className="p-2 border text-blue-600 cursor-pointer"
                onClick={() => handleEdit(i)}
              >
                Edit
              </td>
              <td
                className="p-2 border text-blue-600 cursor-pointer"
                onClick={() =>
                  navigate(`/documents/${encodeURIComponent(c.name)}`)
                }
              >
                View
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Contacts;
