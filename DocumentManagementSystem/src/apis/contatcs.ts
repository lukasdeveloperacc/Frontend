import { IContact } from "../atoms";

const backend_url = "http://localhost:1234";

export async function getContacts(): Promise<IContact[]> {
  return await fetch(`${backend_url}/api/contacts`).then((res) => res.json());
}

export async function postContact(new_contact: IContact) {
  return await fetch(`${backend_url}/api/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(new_contact),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      throw new Error(e);
    });
}

export async function patchContact(data: IContact) {
  return await fetch(`${backend_url}/api/contacts/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      throw new Error("Failed to update contact");
    });
}

export async function deleteContact(id: string) {
  return await fetch(`${backend_url}/api/contacts/${encodeURI(id)}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      throw new Error("Failed to delete contact");
    });
}
