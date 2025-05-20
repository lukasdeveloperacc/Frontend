import { IContact } from "../atoms";
import { env } from "../config";

export async function getContacts(managerId: string): Promise<IContact[]> {
  return await fetch(`${env.backendUrl}/api/contacts/${managerId}`).then(
    async (res) => {
      const data: { contacts: IContact[] } = await res.json();
      console.log(data);
      return data.contacts;
    }
  );
}

export async function postContact({
  managerId,
  new_contact,
}: {
  managerId: string;
  new_contact: IContact;
}) {
  return await fetch(`${env.backendUrl}/api/contacts/${managerId}`, {
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

export async function patchContact({
  managerId,
  data,
}: {
  managerId: string;
  data: IContact;
}) {
  return await fetch(`${env.backendUrl}/api/contacts/${managerId}`, {
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

export async function deleteContact({
  managerId,
  id,
}: {
  managerId: string;
  id: string;
}) {
  return await fetch(`${env.backendUrl}/api/contacts/${managerId}}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      throw new Error("Failed to delete contact");
    });
}
