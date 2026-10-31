import { editor } from "@silverbulletmd/silverbullet/syscalls";

export async function exportPDF() {
  await editor.flashNotification("Hello world!");
}
