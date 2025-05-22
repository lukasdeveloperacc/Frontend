import { env } from "../config";
type Document = {
  id: string;
  file_name: string;
  drive_url: string;
  uploaded_at: string;
  contact_id: string;
};

export async function getDocuments(
  token: string,
  clientId: string
): Promise<{ documents: Document[] }> {
  if (clientId) {
    return await fetch(`${env.backendUrl}/api/documents/${clientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const data = res.json();
      console.log(data);
      return data;
    });
  } else {
    return await fetch(`${env.backendUrl}/api/documents`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const data = res.json();
      console.log(data);
      return data;
    });
  }
}

export async function uploadDocuments(
  token: string,
  formData: FormData,
  contactId: string
) {
  const res = await fetch(
    `${env.backendUrl}/api/documents/upload-multiple/${contactId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return await res.json();
}
