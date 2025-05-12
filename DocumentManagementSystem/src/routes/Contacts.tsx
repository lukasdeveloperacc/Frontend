import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getContacts,
  postContacts,
  patchContact,
  deleteContact,
} from "../apis/Contacts";

type Contact = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

function Contacts() {
  const queryClient = useQueryClient();
  const { isLoading, data: contacts } = useQuery("allContacts", getContacts);
  const { mutate: saveContacts, isLoading: isSaving } = useMutation(
    postContacts,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("allContacts");
      },
      onError: async (err) => {
        alert("Failed to add contact");
        console.error(err);
      },
    }
  );
  const { mutate: editContact, isLoading: isPatching } = useMutation(
    patchContact,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("allContacts");
      },
      onError: async (err) => {
        alert("Failed to update contact");
        console.error(err);
      },
    }
  );

  const { mutate: removeContact } = useMutation(deleteContact, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("allContacts");
    },
    onError: (err) => {
      alert("Failed to delete contact");
      console.error(err);
    },
  });

  const navigate = useNavigate();

  const defaultForm = { id: "", name: "", address: "", phone: "" };
  const [form, setForm] = useState(defaultForm);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (editIndex !== null) {
      const contactToUpdate = contacts?.[editIndex];
      if (!contactToUpdate) return;
      editContact(form);
    } else {
      saveContacts(form);
    }

    setShowForm(false);
    setForm(defaultForm);
  };

  const handleEdit = (index: number) => {
    const contact = contacts?.[index];
    if (!contact) return;

    setForm(contact);
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
              disabled={isSaving}
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              {isSaving ? "Saving..." : "Save"}
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
          {isLoading ? (
            <td colSpan={4} className="text-center py-4">
              Loading...
            </td>
          ) : (
            contacts?.map((c, i) => (
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
                <td
                  className="p-2 border text-red-600 cursor-pointer"
                  onClick={() => {
                    if (confirm(`정말 삭제하시겠습니까?`)) {
                      removeContact(c.id);
                    }
                  }}
                >
                  Delete
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export default Contacts;
