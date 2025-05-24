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
  managerId: string = "",
  contactId: string = ""
): Promise<{ documents: Document[]; owner?: string }> {
  let url = "";
  if (contactId) {
    url = `${env.backendUrl}/api/documents/${contactId}`;
  } else {
    url = `${env.backendUrl}/api/documents/?managerId=${managerId}`;
  }

  return await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    const data = res.json();
    console.log(data);
    return data;
  });
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
