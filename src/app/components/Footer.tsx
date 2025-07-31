export function Footer() {
  return (
    <footer className="text-center py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
      © {new Date().getFullYear()} Analytics Dashboard. All rights reserved.
    </footer>
  );
}