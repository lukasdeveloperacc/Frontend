import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { clientContacts, token } from "../atoms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDocuments, uploadDocuments } from "../apis/documents";
import { useRef } from "react";

function Documents() {
  const { contactId } = useParams();
  const contacts = useRecoilValue(clientContacts);
  const authToken = useRecoilValue(token);
  let resolvedClient = null;
  if (contactId) {
    const newContactId = decodeURI(contactId);
    resolvedClient =
      contacts[contacts.findIndex((contact) => contact.id === newContactId)];
  }

  const { isLoading, data: documents } = useQuery({
    queryKey: ["allDocuments"],
    queryFn: () => getDocuments(authToken, resolvedClient?.id),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { mutate: uploadMutate, isPending: uploading } = useMutation({
    mutationFn: async (formData: FormData) =>
      await uploadDocuments(authToken, formData, resolvedClient?.id),
    onSuccess: async () => {
      console.log("upload mut");
      await queryClient.invalidateQueries({ queryKey: ["allDocuments"] });
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: () => {
      alert("Upload failed.");
    },
  });

  const handleFileupload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !resolvedClient) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    uploadMutate(formData);
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
                <td className="p-2 border">{resolvedClient?.name}</td>
                <td className="p-2 border text-red-600 cursor-pointer">✕</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Documents;
