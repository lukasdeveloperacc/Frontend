import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { clientContacts, token, userId } from "../atoms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteDocument,
  getDocuments,
  uploadDocuments,
} from "../apis/documents";
import { useRef, useState } from "react";

function Documents() {
  const { contactId } = useParams();
  const currentUserId = useRecoilValue(userId);
  const contacts = useRecoilValue(clientContacts);
  const authToken = useRecoilValue(token);
  let resolvedClient = null;
  if (contactId) {
    resolvedClient =
      contacts[contacts.findIndex((contact) => contact.id === contactId)];
  }

  const { isLoading, data: documents } = useQuery({
    queryKey: ["allDocuments"],
    queryFn: () => getDocuments(authToken, currentUserId, contactId),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { mutate: uploadMutate, isPending: uploading } = useMutation({
    mutationFn: async (formData: FormData) =>
      await uploadDocuments(authToken, formData, resolvedClient?.id as string),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allDocuments"] });
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: () => {
      alert("Upload failed.");
    },
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: async (documentId: string) => {
      setDeletingId(documentId);
      await deleteDocument(authToken, documentId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allDocuments"] });
      setDeletingId(null);
    },
    onError: () => {
      alert("Failed to delete document");
      setDeletingId(null);
    },
  });

  const handleFileupload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !resolvedClient) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    uploadMutate(formData);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLTableCellElement>) => {
    const documentId = e.currentTarget.getAttribute("data-document-id");
    if (!documentId) return;
    deleteMutate(documentId);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        Documents{resolvedClient ? ` for ${resolvedClient.name}` : ""}
      </h2>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="file"
          accept=".pdf"
          multiple
          ref={fileInputRef}
          onChange={handleFileupload}
          className="hidden"
          id="fileUpload"
          disabled={!resolvedClient}
        />
        <label
          htmlFor="fileUpload"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload PDFs"}
        </label>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <table className="w-full border border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">File Name</th>
              <th className="p-2 border">Uploaded</th>
              <th className="p-2 border">Owner</th>
              <th className="p-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {documents?.documents?.map((d, i) => (
              <tr key={i}>
                <td className="p-2 border text-blue-600 cursor-pointer">
                  <a
                    href={d.drive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {d.file_name}
                  </a>
                </td>
                <td className="p-2 border">{d.uploaded_at}</td>
                <td className="p-2 border">
                  {resolvedClient
                    ? resolvedClient.name
                    : contacts[
                        contacts.findIndex(
                          (contact) => contact.id === d.contact_id
                        )
                      ].name}
                </td>
                <td
                  className="p-2 border text-red-600 cursor-pointer"
                  onClick={handleDelete}
                  data-document-id={d.id}
                >
                  {deletingId === d.id ? "Deleting..." : "✕"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Documents;
