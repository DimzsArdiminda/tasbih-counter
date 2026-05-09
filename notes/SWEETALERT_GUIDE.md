# SweetAlert2 Reusable Hook - Usage Guide

This project uses a reusable `useAlert` hook to manage all alert notifications with SweetAlert2.

## Installation

SweetAlert2 is already installed. You can verify with:

```bash
pnpm list sweetalert2
```

## Hook Location

The hook is located at: `@/hooks/useAlert.ts`

## Available Methods

### 1. **success(title, message?)**

Shows a green success alert

```tsx
const { success } = useAlert();

success("Berhasil", "Data telah disimpan");
```

### 2. **error(title, message?)**

Shows a red error alert

```tsx
const { error } = useAlert();

error("Gagal", "Terjadi kesalahan saat memproses");
```

### 3. **warning(title, message?)**

Shows a yellow warning alert

```tsx
const { warning } = useAlert();

warning("Perhatian", "Tindakan ini tidak dapat dibatalkan");
```

### 4. **info(title, message?)**

Shows a blue info alert

```tsx
const { info } = useAlert();

info("Informasi", "Fitur ini sedang dalam pengembangan");
```

### 5. **confirm(title, message?)**

Shows a confirmation dialog with Yes/No buttons

```tsx
const { confirm } = useAlert();

confirm("Hapus?", "Yakin ingin menghapus item ini?").then((result) => {
  if (result.isConfirmed) {
    // User clicked Yes
    console.log("Confirmed");
  } else if (result.isDismissed) {
    // User clicked No or closed the dialog
    console.log("Cancelled");
  }
});
```

### 6. **showAlert(config)**

Custom alert with full configuration

```tsx
const { showAlert } = useAlert();

showAlert({
  title: "Custom Alert",
  message: "This is a custom alert",
  type: "info",
  showConfirmButton: true,
  confirmButtonText: "OK",
  showCancelButton: true,
  cancelButtonText: "Cancel",
});
```

## Usage in Components

### In Client Components

```tsx
"use client";

import { useAlert } from "@/hooks/useAlert";

export default function MyComponent() {
  const { success, error, confirm } = useAlert();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/item/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        success("Berhasil", "Item telah dihapus");
        // Refresh data, etc.
      } else {
        error("Gagal", "Tidak dapat menghapus item");
      }
    } catch (err) {
      error("Error", "Terjadi kesalahan");
    }
  };

  const handleConfirmDelete = () => {
    confirm("Hapus?", "Yakin ingin menghapus?").then((result) => {
      if (result.isConfirmed) {
        handleDelete("item-id");
      }
    });
  };

  return <button onClick={handleConfirmDelete}>Delete</button>;
}
```

## Styling

The alert hook comes with predefined styling:

- **Button Colors**: Emerald green (✓) and Red (✗)
- **Border Radius**: 12px
- **Theme**: Automatically matches your app's dark/light mode (when using with TailwindCSS)

## Examples from This Project

### Tasbih Page - Completion Alert

```tsx
const { success } = useAlert();

if (count + 1 === target) {
  setTimeout(() => {
    success(
      "Alhamdulillah!",
      `Anda telah menyelesaikan ${target}x ${selectedDhikr.name}`,
    );
  }, 100);
}
```

### Custom Dzikir Modal - Success on Add

```tsx
const { success, error } = useAlert();

const handleSubmit = async (e: React.FormEvent) => {
  try {
    await onSave(name, arabic, meaning, parseInt(target));
    success("Berhasil", "Dzikir custom berhasil ditambahkan");
    setName("");
    // Reset form...
  } catch (err) {
    error("Gagal Menambahkan", err.message);
  }
};
```

### Delete Operation - Confirmation

```tsx
const { confirm, success, error } = useAlert();

const deleteDzikir = async (id: string) => {
  confirm("Hapus Dzikir?", "Tindakan ini tidak dapat dibatalkan").then(
    (result) => {
      if (result.isConfirmed) {
        // Perform delete operation
        fetch(`/api/dzikir/${id}`, { method: "DELETE" })
          .then(() => success("Berhasil", "Dzikir dihapus"))
          .catch(() => error("Gagal", "Tidak dapat menghapus"));
      }
    },
  );
};
```

## Tips

1. **Always use `then()` for confirm dialogs** - The confirm method returns a Promise
2. **Keep messages short** - Better UX with concise notifications
3. **Use proper types** - `success | error | warning | info | question`
4. **Import at the top** - Makes code cleaner and more organized
5. **Destructure only what you need** - Reduces unnecessary re-renders

## Customization

To customize colors or styling, edit `/hooks/useAlert.ts`:

```tsx
confirmButtonColor: '#10b981', // Change to your preferred color
cancelButtonColor: '#ef4444',  // Change to your preferred color
```

## Browser Support

SweetAlert2 supports all modern browsers:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari 9+
- Android Browser 4.4+
