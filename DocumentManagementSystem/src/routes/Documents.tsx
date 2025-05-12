import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { customerContacs } from "../atoms";

type Contact = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

type Document = {
  id: string;
  file: File;
  fileName: string;
  uploaded: string;
  owner: string;
};

function Documents() {
  const { contactId } = useParams();
  const contacts = useRecoilValue(customerContacs);
  const [documents, setDocuments] = useState<Document[]>([
    {
      file: new File(["dummy"], "Invoice.pdf", { type: "application/pdf" }),
      fileName: "Invoice.pdf",
      uploaded: "2024-04-24",
      owner: "John Doe",
    },
    {
      file: new File(["dummy"], "Receipt.pdf", { type: "application/pdf" }),
      fileName: "Receipt.pdf",
      uploaded: "2024-04-25",
      owner: "Jane Smith",
    },
  ]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedOwner, setSelectedOwner] = useState("");
  const resolvedOwner = contactId
    ? decodeURIComponent(contactId)
    : selectedOwner;
  const [visibleDocs, setVisibleDocs] = useState(
    contactId ? documents.filter((d) => d.owner === resolvedOwner) : documents
  );
  useEffect(() => {
    console.log("Use Effect : ", selectedOwner);
    setVisibleDocs(
      selectedOwner
        ? documents.filter((d) => d.owner === selectedOwner)
        : documents
    );
  }, [selectedOwner, documents]);

  const handleUpload = () => {
    if (!resolvedOwner) {
      alert("고객을 선택하거나 URL을 통해 접근하세요.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const newDocs: Document[] = selectedFiles.map((file) => ({
      file,
      fileName: file.name,
      uploaded: today,
      owner: resolvedOwner,
    }));

    setDocuments((prev) => [...prev, ...newDocs]);
    setSelectedFiles([]);
  };

  const handleDelete = (index: number) => {
    const updated = [...documents];
    updated.splice(index, 1);
    setDocuments(updated);
  };

  const downloadFile = (doc: Document) => {
    const url = URL.createObjectURL(doc.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        Documents{resolvedOwner ? ` for ${resolvedOwner}` : ""}
      </h2>

      <div className="flex items-center gap-4 mb-4">
        {!contactId && (
          <select
            value={selectedOwner}
            onChange={(e) => {
              setSelectedOwner(e.target.value);
            }}
            className="border rounded p-2"
          >
            <option value="">-- Select Contact --</option>
            {contacts.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        )}

        <input
          type="file"
          accept=".pdf,image/*"
          multiple
          onChange={(e) => setSelectedFiles(Array.from(e.target.files ?? []))}
          className="border p-2 rounded"
        />

        <button
          onClick={handleUpload}
          disabled={!selectedFiles.length || !resolvedOwner || !selectedOwner}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Upload
        </button>
      </div>

      <table className="w-full border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">File Name</th>
            <th className="p-2 border">Uploaded</th>
            <th className="p-2 border">Owner</th>
            <th className="p-2 border">Download</th>
            <th className="p-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {visibleDocs.map((d, i) => (
            <tr key={i}>
              <td className="p-2 border">{d.fileName}</td>
              <td className="p-2 border">{d.uploaded}</td>
              <td className="p-2 border">{d.owner}</td>
              <td
                className="p-2 border text-blue-600 cursor-pointer"
                onClick={() => downloadFile(d)}
              >
                ⬇
              </td>
              <td
                className="p-2 border text-red-600 cursor-pointer"
                onClick={() => handleDelete(i)}
              >
                ✕
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Documents;
